const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bcrypt = require('bcrypt')
// const tagsRouter = require('./routes/tags') //для роутов

const app = express();

// const sessionConfig = {
//   name: 'sid',                                  // Имя куки для хранения id сессии. По умолчанию - connect.sid
//   secret: `${process.env.SESSION_SECRET}`,      // секретное слово для шифрование, может быть любым
//   resave: false,                                // Пересохранять ли куку при каждом запросе
//   saveUninitialized: false,                     // Создавать ли сессию без инициализации ключей в req.session cookie: {
//     maxAge: 1000 * 60 * 60 * 12,                // Срок истечения годности куки в миллисекундах
//     httpOnly: true,                             // Серверная установка и удаление куки, по умолчанию true },
//   };

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sessionConfig));


// app.get('/', (req, res) => {
//   res.render('index');
// });
// app.use('/tags', tagsRouter); //ссылка на роуты

module.exports = app;
