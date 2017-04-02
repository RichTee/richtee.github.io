exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  directConnect: true,
  specs: ['./tests/e2e/example.js']
};