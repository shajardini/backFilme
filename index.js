const express = require('express')//importa p Express
const mysql = require('mysql2')//import biblioteca mysql2




//configurações do banco de dados
const dbConfig = {
    host: 'localhost',//host do banco
    user:'root',//usuário do banco
    password:'salomao775', //senha do banco de dados
    database: 'filmes'//nome do banco de dados
}

//Criar uma conexão com o banco de dados

const connection = mysql.createConnection(dbConfig)

//verificar se a conexão com o banco de dados foi estabelecida com sucesso.

connection.connect((err)=>{
    if(err){
        console.error('Erro ao conectar o banco de dados: ', err)
        throw err
    }
    console.log('Conexão estabelecida com sucesso!')
})

const app = express()
const cors = require('cors')

app.use(cors())//Adicionar o middleware cors 

//Rota para obter todos os filmes
app.get('/filme', (req, res) =>{
    connection.query('SELECT * FROM filmes',(err, resultados)=>{
        if(err){
            console.error('Erro ao executar a consulta:', err)
            res.status(500).json({error: 'Erro ao buscar filmes'})
        }else{
            res.json(resultados)
        }
    })

})

app.listen(3001, ()=>{
    console.log('API ESTÁ RODANDO NA PORTA 3001')
})




//pessoa = {nome:'',cpf:'',email: ''}


