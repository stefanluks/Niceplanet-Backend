NicePlanet
==========

Desafio de simular a criação de uma API que possibilita à indústria cadastrar os produtores e as propriedades de sua carteira de clientes para serem monitoradas pela Niceplanet

#### Rotas do sistema

/login **POST**
---------------

http://localhost:8080/login

Para acessar as demais rotas é necessario está autenticado no sistema, e para isso é feito uma requesição do tipo **POST**  
Deve ser enviado um **Json** com os dados do usuario que deseja entrar, por exemplo:

> { <br>   "nomeUsuario":"Stefan Lucas",  <br>   "senhaUsuario": "slas@123#"  <br>}

Com isto o sistema deve retornar a confirmação da efetuação do login, passando um token para o acesso.

> {  <br> "error": false,  <br> "mensagem": "Login Realizado!!",  <br> "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjg0MTczMTAwLCJleHAiOjE2ODQ0MzIzMDB9.366XFWtNdpoBcBwP18OtePtrUNoYadDqsqEZyVztd00"  <br> }

Este **Token** deve ser passado para a aplicação no cabeçalho no **Bearer** para validar a autenticação no sistema.

----
 
/cadastrar **POST**
-------------------

http://localhost:8080/cadastrar

Para cadastrar um novo usuário no sistema deve ser feito atráves dessa rota executando uma requesição do tipo **POST**  
Deve ser enviado um **Json** com os dados do usuario que deseja cadastrar, por exemplo:

> {  <br> "nomeUsuario":"Stefan Silva",  <br> "senhaUsuario": "slas@123#"  <br> }

Com isto o sistema deve retornar a confirmação do cadastro no banco de dados.

> { <br> "error": false,  <br> "mensagem": "cadastrado com sucesso!",  <br> }

----

/AddProdutorPropriedade **POST**
--------------------------------

http://localhost:8080/AddProdutorPropriedade

Nesta rota é executado uma requesição do tipo **POST** para adicionar nos produtores ou propriedades  
Para isso deve ser enviado um **Json** com os dados que deseja cadastrar, exemplo:

### Cadastrando Os dois Objetos

> {  <br> "produtor":{  <br> "nomeProdutor":"Stefan Lucas",  <br> "cpfProdutor":"03851345177"  <br> }, <br> "propiedade":{  <br> "nomePropriedade":"Chacara SL",  <br> "cadastroRural":"00XX0115322247C65"  <br> } <br> }

É possivel também cadastrar individualmente os itens, por exemplo o cadastrar apenas do produtor passando seus atributos:

### Cadastrando apenas o Produtor

> {  <br> "produtor":{  <br> "nomeProdutor":"Stefan Lucas",  <br> "cpfProdutor":"03851345177"  <br> } <br> }

Sendo possivel tambem o cadastro apenas da propriedade passando apenas os dados dela:

### Cadastrando apenas a Propriedade

> {  <br> "propiedade":{  <br> "nomePropriedade":"Chacara SL",  <br> "cadastroRural":"00XX0115322247C65"  <br> } <br> }

----

/Get/idProdutor-idPropriedade **GET**
-------------------------------------

http://localhost:8080/Get/{idProdutor-idPropriedade}