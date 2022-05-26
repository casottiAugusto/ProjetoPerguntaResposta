const Sequelize=require('sequelize');
const connection =require('./database');

const Resposta =connection.define("resposta",{
  corpo:{
    type: Sequelize.TEXT,
    alLowNull:false
  },
  perguntaId:{
    type:Sequelize.INTEGER,
    alLowNull: false
  }
});
Resposta.sync({force:false});
module.exports=Resposta;