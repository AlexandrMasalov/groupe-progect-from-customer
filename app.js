const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bcrypt = require('bcrypt');

const app = express();

const sessionConfig = {
  store: new FileStore(),
  name: 'sid', // Имя куки для хранения id сессии. По умолчанию - connect.sid
  secret: `${process.env.SESSION_SECRET}`, // секретное слово для шифрование, может быть любым
  resave: false, // Пересохранять ли куку при каждом запросе
  saveUninitialized: false, // Создавать ли сессию без инициализации ключей в req.session cookie: {
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  },
};

const mainRouter = require('./routes/main');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const ordersRouter = require('./routes/orders');
const newOrderRouter = require('./routes/orders/new');
const clientsRouter = require('./routes/clients');
const newClientRouter = require('./routes/clients/new');
const furnitureRouter = require('./routes/furniture');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sessionConfig));

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.use('/', mainRouter); // ссылка на роуты
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/orders', ordersRouter);
app.use('/orders/new', newOrderRouter);
app.use('/clients', clientsRouter);
app.use('/clients/new', newClientRouter);
app.use('/furniture', furnitureRouter);

module.exports = app;
