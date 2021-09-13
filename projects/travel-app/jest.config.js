const config = {
  "projects": [
    {
      "displayName": "client tests",
      verbose: true,
      testEnvironment: 'jsdom',
      testMatch: [ '<rootDir>/__test__/client/*.test.js']
    },
    {
      "displayName": "server tests",
      verbose: true,
      testEnvironment: 'node',
      testMatch: [ '<rootDir>/__test__/server/*.test.js']
    }
  ]
};

module.exports = config;
