const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const caduser = require("../Database/caduser")
const cors = require("cors")
                        
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors())



var DB = {
    users: caduser
}

app.get("/users",(req, res) =>{


    res.statusCode = 200
    res.json({users:DB.users});
    
})

app.get("/user/:id",(req, res) =>{

    if(isNaN(req.params.id)){
        res.sendStatus(400);                //BAD REQUEST
    }else{
        var id = parseInt(req.params.id);
        var user = DB.users.find(u => u.id == id)

        if(user != undefined){
            res.statusCode = 200;           //REQ FEITA COM SUCESSO
            res.json(user)
        }else{
            res.sendStatus(404);            // NOT FOUND
        }
    }

})

app.post("/user",(req, res) =>{
    
    var {nome, age} = req.body;

    DB.users.push({
        id: 2323,
        nome,
        age
    });

    res.sendStatus(200);

})

app.delete("/user/:id",(req, res) =>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);                //BAD REQUEST
    }else{
        var id = parseInt(req.params.id);
        var index = DB.users.findIndex(u => u.id == id)     // PROCURA O INDEX DO ELEMENTO

        if(index == -1){
            res.sendStatus(404)            //NOT FOUND
        }else{
            DB.users.splice(index,1)       // DELETA O ELEMENTO
            res.sendStatus(200)            // OK
        }
    }

})

app.put("/user/:id", (req, res)=> {

    if(isNaN(req.params.id)){
        res.sendStatus(400);                //BAD REQUEST
    }else{
        var id = parseInt(req.params.id);
        var user = DB.users.find(u => u.id == id)

        if(user != undefined){
            var {nome, age} = req.body;
            if(nome != undefined){
                user.nome = nome;
            }
            if(age != undefined){
                user.age = age;
            }

            res.sendStatus(200)             //OK

        }else{
            res.sendStatus(404);            // NOT FOUND
        }
    }
})



app.listen(45678,() => {
    console.log("API RODANDO!")
});