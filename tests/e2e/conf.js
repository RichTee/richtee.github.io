exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  directConnect: true,
  specs: [
    //'./example.js', 
    './register.js',
    './login.js'
    ]
};