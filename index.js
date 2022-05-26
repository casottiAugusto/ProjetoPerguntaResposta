const express = require('express');
const  bodyParser=require("body-parser");
const connection =require('./Database/database');
const pergunta =require('./Database/Pergunta');
const Resposta = require("./Database/Resposta");

const app=express();

connection
  .authenticate()
  .then(()=>{
    
  })
  .catch((erro)=>{
    console.log(erro)
  })
 
app.set('view engine','ejs');
app.listen(8080);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/", (req,res)=> {
  pergunta.findAll({
    raw:true,order:[
      ['id','desc']
    ]
  }).then(perguntas=>{
    res.render("home",{perguntas:perguntas}) 
  })

});
app.get("/perguntar",(req,res) =>{
  res.render("perguntas")
});
app.post("/salvarperguntas",(req,res)=>{
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  pergunta.create({
    titulo:titulo,
    descricao:descricao
  }).then(()=>{
    res.redirect("/")

});
});
app.get("/test",(req,res)=>{
  res.render("test");
});
app.get("/question/:id",(req ,res) => {
  var id = req.params.id;
  pergunta.findOne({
      where: {id: id}
      
  }).then(pergunta => {
      if(pergunta != undefined){ // Pergunta encontrada
        Resposta.findAll({
          
          where:{perguntaId:pergunta.id},//PRocurando pergunta com resposta no banco
          order:[['id','desc']]
        }).then(resposta =>{
          res.render("question",{pergunta:pergunta, resposta:resposta})
        });
      }else{ // Não encontrada
          res.redirect("/");
      }
  });
});

app.post("/responder",(req,res)=>{
  var corpo =req.body.corpo;
  var perguntaId=req.body.pergutaIdentifica;
  Resposta.create({
    corpo:corpo,
    perguntaId:perguntaId
  }).then(()=>{
  res.redirect("/question/"+perguntaId) 
  });

});