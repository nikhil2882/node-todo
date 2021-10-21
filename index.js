const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(express.json());

app.get("/gettodo", function (req, res) 
{
  fs.readFile("./data.txt", "utf-8" ,function (err,data) 
  {
    res.send(data);
  })
})

app.post("/save", function (req, res)
{
  fs.readFile("./data.txt", "utf8", function (err, data) 
  {
    if(err)
    {
      res.status(500);
      res.send();

      return;
    }

    let todos = [];

    if(data.length > 0) 
    {
      todos = JSON.parse(data);
    }

    todos.push(req.body);

    fs.writeFile("data.txt", JSON.stringify(todos), function (err)
    {
      res.send("success");
    })
  })
});

app.listen(8000, function (err)
{
  console.log("server is listening on port 8000", err);
})