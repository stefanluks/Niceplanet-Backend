<img src="./public/imgs/logo.png" />

## Teste para desenvolvedor Back-end

Projeto desenvolvido para um desafio da niceplanet objetivo de realizar o desafio de simular a criação de uma API que possibilita à indústria cadastrar os produtores e as propriedades de sua carteira de clientes para serem monitoradas pela Niceplanet.

><b>ESPECIFICAÇÕES TÉCNICAS: </b> Node JS, Mysql <br>
> utilizando as bibliotecas node: express, jsonwebtoken, mysql2 e sequelize.

## Executando o projeto

>Para fazer o clone do projeto utilize o comando no terminal: <br>git clone https://github.com/stefanluks/Niceplanet-Backend.git

### 1º `cd Niceplanet-Backend`

Executando o comando para acessar a pasta do projeto.

### 2º `npm install`

Para instalar todas as bibliotecas do JS necessarios para o projeto, e em seguida execute.

### 3º `npm start`

Irá executar o projeto em modo de desenvolvimento.\
Que pode ser testado no navegador no endereço: [http://localhost:8080](http://localhost:8080)

A página recarrega a cada alteração nos arquivos.\
E os erros podem serem visualizados no console.

<br>


## Rotas do sistema

/login **POST**
---------------

http://localhost:8080/login

Para acessar as demais rotas é necessario está autenticado no sistema, e para isso é feito uma requesição do tipo **POST**  
Deve ser enviado um **Json** com os dados do usuario que deseja entrar, por exemplo:


```json
{ 
    "nomeUsuario":"Stefan Lucas",
    "senhaUsuario": "slas@123#" 
} 
```

Com isto o sistema deve retornar a confirmação da efetuação do login, passando um token para o acesso.

```json
{ 
    "error": false, 
    "mensagem": "Login Realizado!!", 
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjg0MTczMTAwLCJleHAiOjE2ODQ0MzIzMDB9.366XFWtNdpoBcBwP18OtePtrUNoYadDqsqEZyVztd00" 
}
```

Este **Token** deve ser passado para a aplicação no cabeçalho no **Bearer** para validar a autenticação no sistema.

----
 
/cadastrar **POST**
-------------------

http://localhost:8080/cadastrar

Para cadastrar um novo usuário no sistema deve ser feito atráves dessa rota executando uma requesição do tipo **POST**  
Deve ser enviado um **Json** com os dados do usuario que deseja cadastrar, por exemplo:

```json
{ 
    "nomeUsuario":"Stefan Silva", 
    "senhaUsuario": "slas@123#" 
}
```

Com isto o sistema deve retornar a confirmação do cadastro no banco de dados.

```json
{ 
    "error": false, 
    "mensagem": "cadastrado com sucesso!" 
}
```

----

/AddProdutorPropriedade **POST**
--------------------------------

http://localhost:8080/AddProdutorPropriedade

Nesta rota é executado uma requesição do tipo **POST** para adicionar nos produtores ou propriedades  
Para isso deve ser enviado um **Json** com os dados que deseja cadastrar, exemplo:

### Cadastrando Os dois Objetos

```json
{ 
    "produtor":{  
        "nomeProdutor":"Stefan Lucas",  
        "cpfProdutor":"03851345177"  
    }, "propiedade":{ 
        "nomePropriedade":"Chacara SL",
        "cadastroRural":"00XX0115322247C65"
    }
}
```

É possivel também cadastrar individualmente os itens, por exemplo o cadastrar apenas do produtor passando seus atributos:

### Cadastrando apenas o Produtor

```json
{ 
    "produtor":{ 
        "nomeProdutor":"Stefan Lucas",
        "cpfProdutor":"03851345177"
    }
}
```

Sendo possivel tambem o cadastro apenas da propriedade passando apenas os dados dela:

### Cadastrando apenas a Propriedade

```json
{
    "propiedade":{
        "nomePropriedade":"Chacara SL",
        "cadastroRural":"00XX0115322247C65"
    }
}
```

----

/Get/idProdutor-idPropriedade **GET**
-------------------------------------

http://localhost:8080/Get/{idProdutor-idPropriedade}