const app = require('./app');

function connctToServer() {
  app.listen(3000, () => console.log('Connect to server'));
}

connctToServer();
