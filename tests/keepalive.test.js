const assert = require('node:assert/strict');
const { afterEach, beforeEach, test } = require('node:test');

const handler = require('../api/keepalive');

const originalEnv = {
  CRON_SECRET: process.env.CRON_SECRET,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
};
const originalFetch = global.fetch;
const originalConsoleError = console.error;

beforeEach(() => {
  process.env.CRON_SECRET = 'test-cron-secret';
  process.env.SUPABASE_URL = 'https://example.supabase.co';
  process.env.SUPABASE_ANON_KEY = 'test-anon-key';
  console.error = () => {};
});

afterEach(() => {
  restoreEnv('CRON_SECRET');
  restoreEnv('SUPABASE_URL');
  restoreEnv('SUPABASE_ANON_KEY');
  global.fetch = originalFetch;
  console.error = originalConsoleError;
});

test('rejects non-GET requests without querying Supabase', async () => {
  let fetchCalled = false;
  global.fetch = async () => {
    fetchCalled = true;
  };

  const res = createResponse();
  await handler(createRequest('POST'), res);

  assert.equal(res.statusCode, 405);
  assert.deepEqual(res.body, { ok: false, error: 'method_not_allowed' });
  assert.equal(res.headers.allow, 'GET');
  assert.equal(fetchCalled, false);
});

test('rejects a missing or incorrect Cron secret without querying Supabase', async () => {
  let fetchCalled = false;
  global.fetch = async () => {
    fetchCalled = true;
  };

  const missing = createResponse();
  await handler(createRequest('GET', ''), missing);
  assert.equal(missing.statusCode, 401);

  const incorrect = createResponse();
  await handler(createRequest('GET', 'Bearer wrong-secret'), incorrect);
  assert.equal(incorrect.statusCode, 401);
  assert.equal(fetchCalled, false);
});

test('fails closed when Supabase configuration is missing', async () => {
  delete process.env.SUPABASE_URL;
  let fetchCalled = false;
  global.fetch = async () => {
    fetchCalled = true;
  };

  const res = createResponse();
  await handler(createRequest(), res);

  assert.equal(res.statusCode, 500);
  assert.deepEqual(res.body, { ok: false, error: 'config_missing' });
  assert.equal(fetchCalled, false);
});

test('performs a read-only aggregate query and returns no database data', async () => {
  let request;
  global.fetch = async (url, options) => {
    request = { url, options };
    return {
      ok: true,
      status: 200,
      headers: { get: () => null },
      json: async () => 42,
    };
  };

  const res = createResponse();
  await handler(createRequest(), res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.ok, true);
  assert.equal('total' in res.body, false);
  assert.equal(res.headers['cache-control'], 'no-store');
  assert.match(res.body.checkedAt, /^\d{4}-\d{2}-\d{2}T/);
  assert.equal(
    request.url,
    'https://example.supabase.co/rest/v1/rpc/get_total_mudome_count',
  );
  assert.equal(request.options.method, 'POST');
  assert.equal(request.options.body, '{}');
  assert.equal(request.options.signal instanceof AbortSignal, true);
  assert.equal(request.options.headers.apikey, 'test-anon-key');
  assert.equal(request.options.headers.Authorization, 'Bearer test-anon-key');
  assert.equal(request.options.headers['Content-Type'], 'application/json');
});

test('rejects an unexpected successful response', async () => {
  global.fetch = async () => ({
    ok: true,
    status: 200,
    headers: { get: () => null },
    json: async () => ({ unexpected: true }),
  });

  const res = createResponse();
  await handler(createRequest(), res);

  assert.equal(res.statusCode, 502);
  assert.deepEqual(res.body, { ok: false, error: 'upstream_failed' });
});

test('returns a sanitized 502 response for an upstream error', async () => {
  global.fetch = async () => ({
    ok: false,
    status: 503,
    headers: { get: () => 'request-id' },
  });

  const res = createResponse();
  await handler(createRequest(), res);

  assert.equal(res.statusCode, 502);
  assert.deepEqual(res.body, { ok: false, error: 'upstream_failed' });
});

test('returns a sanitized 502 response when the request times out', async () => {
  global.fetch = async (_url, options) => {
    assert.equal(options.signal instanceof AbortSignal, true);
    throw new DOMException('The operation timed out', 'TimeoutError');
  };

  const res = createResponse();
  await handler(createRequest(), res);

  assert.equal(res.statusCode, 502);
  assert.deepEqual(res.body, { ok: false, error: 'upstream_unreachable' });
});

function createRequest(method = 'GET', authorization = 'Bearer test-cron-secret') {
  return {
    method,
    headers: { authorization },
  };
}

function createResponse() {
  return {
    statusCode: 200,
    body: undefined,
    headers: {},
    setHeader(name, value) {
      this.headers[name.toLowerCase()] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
}

function restoreEnv(name) {
  const value = originalEnv[name];
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
}
