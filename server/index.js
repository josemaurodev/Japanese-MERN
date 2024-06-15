const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/login-mern");

//recebe por parametro o que o usuario digitar no login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  //procura no banco se existe algum e-mail
  UserModel.findOne({ email: email })
  //se existir
    .then((user) => {
      if (user) {
        //e o usuario digitar a senha correta, da sucesso
        if (user.password == password) {
          //retorna um json com o objeto usuário dentro
          res.json({
            status: "success",
            message: "Login successful",
            user: { id: user._id, name: user.name, email: user.email },
          });
          //se digitar a senha errada, retorna a mensagem que a senha esta errada
        } else {
          res.json({ status: "error", message: "The password is incorrect" });
        }
      } else {
        //se nao achar o email significa que nao tem no banco, retorna mensagem de erro
        res.json({
          status: "error",
          message: "There is no account for this email",
        });
      }
    })
    //caso aconteca um erro nao previsto, ele retorna erro
    .catch((err) =>
      res.json({ status: "error", message: "An error occurred" })
    );
});

//na pagina de registro, recebe o que o usuario digitar
app.post("/register", (req, res) => {
  UserModel.create(req.body)
  //cria o usuario no banco
    .then((user) => res.json({ status: "success", user }))
    .catch((err) => res.json({ status: "error", message: err.message }));
});

//so para escutar se o server eta funcionando
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

app.get("/user", (req, res) => {
  const { userID } = req.query;
  UserModel.findById({ _id: userID })
    .then((user) => {
      if (user) {
        res.json({
          status: "success",
          user: { name: user.name, email: user.email },
        });
      } else {
        res.json({ status: "error", message: "User not found" });
      }
    })
    .catch((err) =>
      res.json({ status: "error", message: "An error occurred" })
    );
});

//para mostrar na tela do usuario as tarefas que ele criou
app.get("/schedule", (req, res) => {
  const { userID } = req.query;
  UserModel.findById({ _id: userID })
    .then((user) => {
      if (user) {
        res.json({ status: "success", user: user.toDoList });
      } else {
        res.json({ status: "error", message: "", user: [] });
      }
    })
    .catch((err) =>
      res.json({ status: "error", message: "An error occurred", user: [] })
    );
});

//para editar o usuario
//pega o que for digitado no body da pagina YourAccount
app.put("/user", (req, res) => {
  const { userID, email, name, password } = req.body;
  //procura o usuario e da o update com as informacoes que forem inseridas
  UserModel.findOneAndUpdate(
    { _id: userID },
    { name: name, password: password, email: email },
    { new: true }
  )
  //se o usuario existir e editar, retorna sucesso e edita o valor no banco
    .then((user) => {
      if (user) {
        res.json({
          status: "success",
          user: { name: user.name, email: user.email },
        });
      } else {
        res.json({ status: "error", message: "User not found" });
      }
    })
    //caso aconteça algum erro ele retorna erro no json 
    .catch((err) =>
      res.json({ status: "error", message: "An error occurred" })
    );
});

//se o usuario apertar confirma no botao confirmar vem para cá
app.delete("/user", (req, res) => {
  //pega o id do usuario
  const { userID } = req.query;
  //procura pelo id no banco e deleta o usuario
  UserModel.findByIdAndDelete(userID)
  //se o usuario existir, retorna sucesso e deleta do banco
    .then((user) => {
      if (user) {
        res.json({ status: "success", message: "User deleted successfully" });
      }//se nao encontrar o usuario retorna erro e usuario nao encontrado 
      else {
        res.json({ status: "error", message: "User not found" });
      }
    })
    //se acontecer um erro inesperado, retorna erro
    .catch((err) =>
      res.json({ status: "error", message: "An error occurred" })
    );
});

//quando o usuario quiser uma schedule pre definida
app.patch("/schedule", async (req, res) => {
  const { userID } = req.query;
  const { preDefinedTasks } = req.body;
  const user = await UserModel.findById(userID);//procura o usuario pelo id
  if (!user) {
    throw new Error(`User not found with id ${userID}`);
  }

  const toDoList = user.toDoList;
  const updatedToDoList = [];

  preDefinedTasks.forEach((item) => { // percorre a lista que veio do cliente (por parametro)
    if (!item._id) item._id = new mongoose.Types.ObjectId(); // se for novo, adiciona um id
    const existingItem = toDoList.find((itemInDB) => { // verifica se existe o id já existe no  banco
      return itemInDB._id.toString() == item._id.toString(); 
    });
    if (existingItem) { //se existe no banco, atualiza o conteudo do item, pois pode ter mudado
      Object.assign(existingItem, item);
    } else {//se nao existe, é novo, ou seja, adiciona no banco
      updatedToDoList.push(item);
    }
  });

  user.toDoList = [...toDoList, ...updatedToDoList]; //junta o que ta no banco com os novos
  await user.save();//salva no usuario
  return res.json({ status: "success" });//retorna sucesso
});

//quando o usuario quiser excluir uma terefa da lista dele
app.delete("/schedule", async (req, res) => {
  //recebe por parametero o usuario e o id da task
  const { userID, taskID } = req.query;
  //procura pelo usuario
  const user = await UserModel.findById(userID);
  //se nao encontrar o usuario da erro
  if (!user) {
    return res.json({ status: "error", message: "User not found" });
  }
  //se nao tiver erro ele pega o todolista, filtra pela task e atualiza o todolist para aquela task sumir
  user.toDoList = user.toDoList.filter((task) => task._id.toString() !== taskID);
  await user.save();//salva o usuario
  return res.json({ status: "success", message: "Task deleted successfully" });//retorna sucesso
});
