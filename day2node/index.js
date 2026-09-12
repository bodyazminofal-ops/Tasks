const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

app.post("/todos", (req, res) => {
  fs.readFile("./data.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const todos = JSON.parse(data);

    req.body.id = todos.length + 1;

    if (!req.body.status) {
      req.body.status = "to-do";
    }

    todos.push(req.body);

    fs.writeFile("./data.json", JSON.stringify(todos), (err) => {
      if (err) {
        console.log(err);
      } else {
        res.send(req.body);
      }
    });
  });
});

app.get("/todos", (req, res) => {
  fs.readFile("./data.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const todos = JSON.parse(data);

    const limit = req.query.limit || 10;
    const skip = req.query.skip || 0;

    res.send(todos.slice(skip, +skip + +limit));
  });
});

app.get("/todos/:id", (req, res) => {
  fs.readFile("./data.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const todos = JSON.parse(data);

    const todo = todos.find((todo) => {
      return todo.id == req.params.id;
    });

    res.send(todo);
  });
});

app.patch("/todos/:id", (req, res) => {
  fs.readFile("./data.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const todos = JSON.parse(data);

    const todo = todos.find((todo) => {
      return todo.id == req.params.id;
    });

    todo.title = req.body.title;
    fs.writeFile("./data.json", JSON.stringify(todos), (err) => {
      if (err) {
        console.log(err);
      } else {
        res.send(todo);
      }
    });
  });
});

app.delete("/todos/:id", (req, res) => {
  fs.readFile("./data.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const todos = JSON.parse(data);

    const index = todos.findIndex((todo) => {
      return todo.id == req.params.id;
    });

    todos.splice(index, 1);

    fs.writeFile("./data.json", JSON.stringify(todos), (err) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Todo deleted successfully");
      }
    });
  });
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
