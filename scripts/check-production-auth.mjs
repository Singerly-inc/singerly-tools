const SITE_URL = process.env.SITE_URL || 'https://singerly-tools.vercel.app';
const EXPECTED_SUPABASE_URL =
  process.env.EXPECTED_SUPABASE_URL || 'https://snkoiisiaevhknajirol.supabase.co';
const EXPECTED_REDIRECT_URL =
  process.env.EXPECTED_REDIRECT_URL || 'https://singerly-tools.vercel.app';
const PROJECT_REF = process.env.SUPABASE_PROJECT_REF || 'snkoiisiaevhknajirol';
const ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN || '';
const REQUIRE_ACCESS_TOKEN = process.env.REQUIRE_SUPABASE_ACCESS_TOKEN === 'true';

const failures = [];
const warnings = [];

async function fetchText(url, options = {}) {
  const response = await fetch(url, options);
  const text = await response.text();
  return { response, text };
}

function assert(condition, message) {
  if (!condition) failures.push(message);
}

async function checkSite() {
  const { response, text } = await fetchText(SITE_URL);
  assert(response.ok, `site is not healthy: ${SITE_URL} returned ${response.status}`);
  assert(!text.includes('http://localhost'), 'production HTML contains http://localhost');
  assert(!text.includes('https://localhost'), 'production HTML contains https://localhost');
}

async function checkSupabaseConfig() {
  const configUrl = new URL('/supabase-config.js', SITE_URL).toString();
  const { response, text } = await fetchText(configUrl);
  assert(response.ok, `supabase-config.js is not available: ${response.status}`);
  assert(
    text.includes(`const SUPABASE_URL = '${EXPECTED_SUPABASE_URL}'`),
    `supabase-config.js does not point to ${EXPECTED_SUPABASE_URL}`,
  );
  assert(!text.includes("const SUPABASE_URL = ''"), 'SUPABASE_URL is empty');
  assert(!text.includes("const SUPABASE_ANON_KEY = ''"), 'SUPABASE_ANON_KEY is empty');
}

async function checkSupabaseAuthSettings() {
  const configUrl = new URL('/supabase-config.js', SITE_URL).toString();
  const { text } = await fetchText(configUrl);
  const anonKey = text.match(/SUPABASE_ANON_KEY\s*=\s*'([^']+)'/)?.[1];

  assert(Boolean(anonKey), 'SUPABASE_ANON_KEY is missing from supabase-config.js');
  if (!anonKey) return;

  const { response, text: settingsText } = await fetchText(
    `${EXPECTED_SUPABASE_URL}/auth/v1/settings`,
    { headers: { apikey: anonKey } },
  );
  assert(response.ok, `Supabase Auth settings returned ${response.status}`);

  if (!response.ok) return;

  const settings = JSON.parse(settingsText);
  assert(settings.external?.email === true, 'Supabase email auth is disabled');
}

async function checkSupabaseDashboardConfig() {
  if (!ACCESS_TOKEN) {
    const message =
      'SUPABASE_ACCESS_TOKEN is not set, so Site URL and Redirect URL allow-list were not checked.';
    if (REQUIRE_ACCESS_TOKEN) failures.push(message);
    else warnings.push(message);
    return;
  }

  const { response, text } = await fetchText(
    `https://api.supabase.com/v1/projects/${PROJECT_REF}/config/auth`,
    { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } },
  );
  assert(response.ok, `Supabase Management API returned ${response.status}`);
  if (!response.ok) return;

  const config = JSON.parse(text);
  const values = Object.fromEntries(
    Object.entries(config).map(([key, value]) => [key.toLowerCase(), value]),
  );
  const siteUrl = values.site_url || values.siteurl || values.uri || values.url;
  const redirectList =
    values.uri_allow_list ||
    values.redirect_urls ||
    values.redirecturls ||
    values.additional_redirect_urls ||
    [];
  const redirectText = Array.isArray(redirectList)
    ? redirectList.join('\n')
    : String(redirectList || '');

  assert(siteUrl === EXPECTED_REDIRECT_URL, `Supabase Site URL is ${siteUrl || 'unset'}`);
  assert(!String(siteUrl || '').includes('localhost'), 'Supabase Site URL contains localhost');
  assert(!redirectText.includes('localhost'), 'Supabase Redirect URLs contain localhost');
}

async function main() {
  await checkSite();
  await checkSupabaseConfig();
  await checkSupabaseAuthSettings();
  await checkSupabaseDashboardConfig();

  for (const warning of warnings) {
    console.warn(`warning: ${warning}`);
  }

  if (failures.length > 0) {
    console.error('production auth health check failed:');
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log('production auth health check passed');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
