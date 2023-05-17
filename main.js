// importando as bibliotecas
const path = require("path");
const express = require("express");
const bcrypt = require("bcryptjs");
const jsw = require("jsonwebtoken");

// iniciando aplicação
const app = express();

// importando função de autenticação nas rotas
const { eAdmin } = require("./middleweres/auth");

const CHAVE = "2DNK42KCLMOPVO321J6KLNJDKG096";

//Modelos | tabelas do banco de dados
//Instâncias do Sequelize criados nos arquivos dentro de "./models/"
const Usuario = require("./models/Usuario");
const Produtor = require("./models/Produtor");
const Propriedade = require("./models/Propriedade");

// definindo que a aplicação trabalhará com dados do tipo json
app.use(express.json());

// configurando rotas do sistema.
// Homepage onde será exibida a documentação das rotas do sistema.
app.get("/", (request, response) => {
    // carregar o arquivo HTML com a documentação do sistema.
    return response.sendFile(path.join(__dirname+'/public/index.html'))
});

// Cadastrar é a rota para um usuário criar uma conta para poder acessar as demais rotas do sistema.
app.post("/cadastrar", async (request, response) => {
    // recebendo dados do usuário recebido atráves de JSON.
    let dados = request.body;
    // criptografando a senha do usuário.
    dados.senhaUsuario = await bcrypt.hash(dados.senhaUsuario, 8);
    
    // Verificando se existe um Usuario com o mesmo nome de usuário salvo no banco de dados.
    // retornando os atributos idUsuario, nomeUsuario e senhaUsuario do objeto.
    const user = await Usuario.findOne({
        attributes: ["idUsuario","nomeUsuario","senhaUsuario"],
        where:{
            nomeUsuario: request.body.nomeUsuario,
        }
    });

    // caso não encontre um usuario com o mesmo nome, o sistema salva no banco.
    if(!user){
        // A instancia Usuario representa a tabela do banco de dados
        // usando o create, salva-se no banco criando um objeto baseado no json passado na request.
        await Usuario.create(dados).then(()=>{
            // Caso não haja erro o sistema retorna o json informando que não houve erro e a mensagem de cadastrado com sucesso.
            return response.json({
                error: false,
                mensagem: "cadastrado com sucesso!",
            })
        }).catch(()=>{
            // Caso haja algum erro o sistema returna o json com erro e a mensafem de que não foi cadastrado.
            return response.status(400).json({
                erro: true,
                mensage: "Erro: não foi possivel cadastrar Usuario!",
            })
        });
    }

    // Caso encontre um usuário de mesmo nome o sistema retorna que o usuario já está cadastrado.
    return response.status(400).json({
        erro: true,
        mensage: "Erro: Usuario já cadastrado!",
    })
});

//Login a rota onde o usuario irá se autenticar no sistema enviando um json com seu nome de usuário e senha para ter acesso as demais rotas.
app.post("/login", async (request, response) =>{
    // request.body recebe um json com nomeUsuario e senhaUsuario
    //Tentando encontrar um usuário registrado no banco de dados com o mesmo nome de usuário que foi passado na request.
    const user = await Usuario.findOne({
        attributes: ["idUsuario","nomeUsuario","senhaUsuario"],
        where:{
            nomeUsuario: request.body.nomeUsuario,
        }
    });
    
    //Caso não encontre retorna o json de erro com a mensagem usuário ou senha incorretos.
    if(!user) return response.json({
        error: true,
        mensagem: "Erro: Usuário ou senha Incorretos!!",
    });

    //Verificando se a senha passada na request é diferente do usuario do banco
    //caso seja diferente o sistema retorna o mesmo json de erro Usuário ou senha incorretos. 
    if(!(await bcrypt.compare(request.body.senhaUsuario, user.senhaUsuario))){
        return response.json({
            error: true,
            mensagem: "Erro: Usuário ou senha Incorretos!!",
        });
    }

    //Caso passe pela verificação de senha, o sistema gera o token de login passando o 'id' do usuário e a chave do sistema
    var token = jsw.sign({id: user.idUsuario}, CHAVE, {
        //definindo em quanto tempo deve expirar o token
        expiresIn: "3d", //Experirar em 3 dias
    });

    //Caso passe por todas as verificações e após a geração do token o sistema retorna o json com a mensagem de login realizado e o token de autenticação.
    return response.json({
        error: false,
        mensagem: "Login Realizado!!",
        token,
    });
});

//AddProdutorPropriedade rota que permite o usuário autenticado adicionar novos produtores e/ou propriedades
app.post("/AddProdutorPropriedade", eAdmin, async (request, response) => {
    //recebendo os dados passados pela request podendo ser os dois objetos
    let dados = request.body;
    
    //sistema deve aguardar a criação dos itens no banco de dados
    //primeiro ele tenta registrar um produtor e ao finalizar ele inicia a construção de propiedade.
    //caso o atributo produtor n exista ele pula para  criação de propriedade.
    await Produtor.create(dados.produtor).then(()=>{
        //tentando criar a propriedade no banco de dados
        Propriedade.create(dados.propiedade).then(()=>{
            // caso tudo ocorra bem o sistema retorna um json com a mensagem de confirmação.
            return response.json({
                error: false,
                mensagem: "Cadastrado com sucesso!",
            });
        }).catch((err) => {
            //Caso ocorra algum problema no registro das informações o sistema retorna o json de erro.
            //informando que não foi possivel cadastrar a propriedade.
            console.log(err);
            return response.status(400).json({
                error: true,
                mensagem: "Erro: não foi possivel cadastrar Propiedade!",
            });
        });
    }).catch(() => {
        //Caso ocorra algum problema no registro das informações o sistema retorna o json de erro.
        //informando que não foi possivel cadastrar o produtor.
        return response.status(400).json({
            error: true,
            mensagem: "Erro: não foi possivel cadastrar Produtor!",
        });
    });
});

//Rota Get onde o usuário autenticado pode fazer busca dos dados no sistema.
//':ids' é o paramentro onde será passado qual item o usuário quer buscar suas informações.
app.get("/Get/:ids/", eAdmin, async (request, response) => {
    //exemplo de link [localhost.com:8080/Get/5-3]
    //guardando os ids passando pela url fazendo uma separação através do simbolo '-'
    //com base no exemplo os ids são guardados nas variaveis da seguinte forma
    //idProdutor = 5 e idPropriedade = 3
    let [idProdutor, idPropriedade] = request.params.ids.split("-");
    
    //constante que receberá os dados dos dos itens que o usuário solicitou
    const resposta = {};

    //caso o usuario tenha passado um 'id' de Produtor.
    if(idProdutor){
        //O sistema realiza a busca de um Produtor com o id passado, retornando o objeto com os dados do banco
        const produtor = await Produtor.findOne({
            attributes: ["idProdutor","nomeProdutor","cpfProdutor"],
            where:{
                idProdutor: idProdutor,
            }
        });
        //caso encontre a variavel resposta recebe um atributo 'produtor' que aponta para o objeto com os dados do banco.
        if(produtor) resposta["produtor"] = produtor;
        //caso não encontre o sistema retorna um json com erro informando que não foi encontrado produtor com o id passado.
        else return response.json({
            erro: true,
            mensagem: "Erro: produtor com id: '"+idProdutor+"' não encontrado!"
        })
    }

    //caso o usuário tenha passado um 'id' de Propriedade.
    if(idPropriedade){
        //O sistema realiza a busca de uma Propriedade com o id passado, retornando o objeto com os dados do banco.
        const propriedade = await Propriedade.findOne({
            attributes: ["idPropriedade","nomePropriedade","cadastroRural"],
            where:{
                idPropriedade: idPropriedade,
            }
        });
        //caso encontre a variavel resposta recebe um atributo 'prorpiedade' que aponta para o objeto com os dados do banco.
        if(propriedade) resposta["propriedade"] = propriedade;
        //caso não encontre o sistema retorna um json com erro informando que não foi encontrado propriedade com o id passado.
        else return response.json({
            erro: true,
            mensagem: "Erro: propriedade com id: '"+idPropriedade+"' não encontrada!"
        })
    }

    //Após receber todos os dados o sistema retorna um json com os dados dos itens solicitados.
    return response.json(resposta);
});

//Aplicação escuta a porta 8080 definindo onde irá rodar o servidor.
app.listen(8080,()=>{
    //com o servidor executando corretamente é exibida a mensagem no console.
    console.log(
        `----------------------\n
        Servidor Online 🟢\n
        http://localhost:8080/\n
        ----------------------`
    );
});