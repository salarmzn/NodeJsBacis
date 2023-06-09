
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const express = require('express');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const posts = require('./routes/posts');
const home = require('./routes/home');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/api/posts', posts);
app.use('/', home);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

console.log(`Application Name: ${config.get("name")}`);
console.log(`Mail Server: ${config.get("mail.host")}`);

app.use(logger);

 




const port = process.env.PORT || 8585;

app.listen(port, () => console.log(`Listenning on port ${port}`));