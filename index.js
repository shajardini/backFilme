const express = require('express')//importa p Express
const mysql = require('mysql2')//import biblioteca mysql2
const cors = require('cors')


//configurações do banco de dados
const dbConfig = {
    host: 'localhost',//host do banco
    user:'root',//usuário do banco
    password:'salomao775', //senha do banco de dados
    database: 'filmes'//nome do banco de dados
}

//Criar uma conexão com o banco de dados

const connection = mysql.createConnection(dbConfig)
const app = express()
//verificar se a conexão com o banco de dados foi estabelecida com sucesso.

connection.connect((err)=>{
    if(err){
        console.error('Erro ao conectar o banco de dados: ', err)
        throw err
    }
    console.log('Conexão estabelecida com sucesso!')
})



app.use(cors())//Adicionar o middleware cors 

//Rota para obter todos os filmes
app.get('/filme', (req, res) =>{
    connection.query('SELECT * FROM filme',(err, resultados)=>{
        if(err){
            console.error('Erro ao executar a consulta:', err)
            res.status(500).json({error: 'Erro ao buscar filmes'})
        }else{
            res.json(resultados)
        }
    })

})

//Rota para selecionar 1 filme por identificação

app.get('/filme/:id', (req, res)=>{
      const filmeId = req.params.id
      //Obtem o parâmetro de ID do filme da URL usando req.params.id
      //por exemplo, se a url for '/filme/1' o valor do filmeId será 1

      connection.query('SELECT * FROM filme WHERE id = ?', [filmeId], (err, resultados)=>{
        //executa uma consulta SQL para obter o filme com o id especificado.

        if(err){
          console.error('Erro ao executar a consulta: ', err)
          res.status(500).json({error: 'Erro ao buscar filme.'})
        } else{
          if(resultados.length > 0){
            res.json(resultados[0])
          }else{
            res.status(404).json({error: 'Filme não encontrado.'})
          }
        }

      }
      )
})
  







app.listen(3001, ()=>{
    console.log('API ESTÁ RODANDO NA PORTA 3001')
})




//pessoa = {nome:'',cpf:'',email: ''}


