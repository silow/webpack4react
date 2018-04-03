const serve = require('webpack-serve');
const config = require('./webpack.config.js');

serve({
  config,
  port: 9090,
  clipboard: false,
  http2: false,
  logLevel: 'info',
  logTime: true,
  open: true,
});