const http = require('http');
const server = require('./app');

const options = {
  hostname: 'localhost',
  port: process.env.PORT || 3000,
  path: '/',
  method: 'GET'
};

const req = http.request(options, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    if(data === 'Hello, CI/CD Pipeline') {
      console.log('Test passed!');
      process.exit(0);
    } else {
      console.error('Test failed!');
      process.exit(1);
    }
  });
});

req.on('error', err => {
  console.error('Test failed!', err);
  process.exit(1);
});

req.end();
