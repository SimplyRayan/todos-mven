const express = require("express");
const router = express.Router();
const auth = require("./middleware/auth");


router.get("/todos", auth, (req, res) => {
  const todos = req.user.todos;
  res.status(200).send({
    todos: todos,
  });
});

//
//

router.post("/todos", auth, async (req, res) => {
  console.log(req.body);

  const text = req.body.text;
  const addedAt = req.body.addedAt;

  if (!text || !addedAt) {
    console.log("REQUIRED DATA WAS NOT PROVIDED");
    return res.status(400).send({ error: "NO TODO TEXT WAS PROVIDED" });
  }

  try {
    const newTodo = await req.user.addTodo(text, addedAt);
    return res.status(201).send(newTodo);
  } catch (err) {
    console.log("system error");
    return res.status(500).send({ error: "COLUD NOT ADD RESOURCES" });
  }
});

//
//
router.put("/todos", auth, async (req, res) => {
  const id = req.body.id;
  const completed = req.body.completed;
  const updatedAt = req.body.updatedAt;

  if (!id || completed == undefined) {
    return res.status(400).send({ error: "REQUIRED INFO WAS NOT PROVIDED" });
  }
  try {
    const todo = req.user.todos.find((todo) => todo.id === id);
    if (!todo) return res.status(404).send({ error: "INVALID ID" });

    todo.completed = completed;
    //
    if (completed) {
      todo.updatedAt = updatedAt;
    } else {
      todo.updatedAt = null;
    }

    await req.user.save();
    res.status(200).send(todo);
  } catch (err) {
    return res.status(500).send({ error: "COULD NOT UPDATE RESOURCES" });
  }
});

module.exports = router;
