const express = require("express");
const bcrypt = require("bcryptjs");
const jsw = require("jsonwebtoken");
const path = require("path");

const app = express();

const { eAdmin } = require("./middleweres/auth");

const CHAVE = "2DNK42KCLMOPVO321J6KLNJDKG096";

//Modelos | tabelas do banco de dados
const Usuario = require("./models/Usuario");
const Produtor = require("./models/Produtor");
const Propiedade = require("./models/Propiedade");

app.use(express.json());

app.get("/", (request, response) => {
    return response.sendFile(path.join(__dirname+'/public/index.html'))
});

app.post("/cadastrar", async (request, response) => {
    let dados = request.body;
    dados.senhaUsuario = await bcrypt.hash(dados.senhaUsuario, 8);
    
    const user = await Usuario.findOne({
        attributes: ["idUsuario","nomeUsuario","senhaUsuario"],
        where:{
            nomeUsuario: request.body.nomeUsuario,
        }
    });

    if(!user){
        await Usuario.create(dados).then(()=>{
            return response.json({
                error: false,
                mensagem: "cadastrado com sucesso!",
            })
        }).catch(()=>{
            return response.status(400).json({
                erro: true,
                mensage: "Erro: não foi possivel cadastrar Usuario!",
            })
        });
    }

    return response.status(400).json({
        erro: true,
        mensage: "Erro: Usuario já cadastrado!",
    })
})

app.post("/login", async (request, response) =>{
    const user = await Usuario.findOne({
        attributes: ["idUsuario","nomeUsuario","senhaUsuario"],
        where:{
            nomeUsuario: request.body.nomeUsuario,
        }
    });
    
    if(!user) return response.json({
        error: true,
        mensagem: "Erro: Usuário ou senha Incorretos!!",
    });

    if(!(await bcrypt.compare(request.body.senhaUsuario, user.senhaUsuario))){
        return response.json({
            error: true,
            mensagem: "Erro: Usuário ou senha Incorretos!!",
        });
    }

    var token = jsw.sign({id: user.idUsuario}, CHAVE, {
        expiresIn: "3d", //Experirar em 3 dias
    });

    return response.json({
        error: false,
        mensagem: "Login Realizado!!",
        token,
    });

});

app.post("/AddProdutorPropriedade", eAdmin, async (request, response) => {
    let dados = request.body;
    
    await Produtor.create(dados.produtor).then(()=>{
        Propiedade.create(dados.propiedade).then(()=>{
            return response.json({
                error: false,
                mensagem: "Produtor e Propiedade Cadastrados com sucesso!",
            });
        }).catch((err) => {
            console.log(err);
            return response.status(400).json({
                error: true,
                mensagem: "Erro: não foi possivel cadastrar Propiedade!",
            });
        });
    }).catch(() => {
        return response.status(400).json({
            error: true,
            mensagem: "Erro: não foi possivel cadastrar Produtor!",
        });
    });
});

app.get("/Get/:ids/", eAdmin, async (request, response) => {
    let [idProdutor, idPropriedade] = request.params.ids.split("-");
    
    const resposta = {};

    if(idProdutor){
        const produtor =await Produtor.findOne({
            attributes: ["idProdutor","nomeProdutor","cpfProdutor"],
            where:{
                idProdutor: idProdutor,
            }
        });
        resposta["produtor"] = produtor;
    }

    if(idPropriedade){
        const propriedade = await Propiedade.findOne({
            attributes: ["idPropriedade","nomePropriedade","cadastroRural"],
            where:{
                idPropriedade: idPropriedade,
            }
        });
        resposta["propriedade"] = propriedade;
    }

    return response.json(resposta);
});

app.listen(8080,()=>{
    console.log("----------------------\nServidor Online 🟢\nhttp://localhost:8080/\n----------------------");
});