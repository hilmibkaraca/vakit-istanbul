async function globalSetup() {
  // Set test environment
  process.env.NODE_ENV = 'test';
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID = 'ca-pub-7529069132633488';
}

export default globalSetup;