
const mysql = require('mysql');
const userService = require('./service/userService');
const quizService = require('./service/quizService');

userService.getUsuarios(
(usuarios) => {
    console.log(usuarios);});
quizService.buscarQuiz('SURDA', 1, (quiz)=>console.log(quiz));