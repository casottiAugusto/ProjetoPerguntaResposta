const Sequeliza =require('sequelize');
const connection = new Sequeliza(
  'perguntas','root','302080',{
    host:'localhost',
    dialect:'mysql'
  });
  module.exports= connection;