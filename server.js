const app = require('./app');

const PORT = process.env.PORT || 3000;
function connctToServer() {
  app.listen(PORT, () => console.log('Connect to server'));
}

connctToServer();
