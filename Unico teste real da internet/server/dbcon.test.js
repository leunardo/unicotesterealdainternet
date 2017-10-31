
const mysql = require('mysql');
const userService = require('./service/userService');
const quizService = require('./service/quizService');

quizService.getAllQuizzes((result)=>console.log(result));