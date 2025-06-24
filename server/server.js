const express = require("express")
const cors = require("cors")
const pool = require("./db")
const app = express()

app.use(express.json())
app.use(cors())

app.post("/create-todo", async (req, res) => {
    const { description } = req.body
    const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
    res.json(newTodo.rows[0]);
})

app.get("/get-all-todos", async (req, res) => {
    const allTodos = await pool.query("SELECT * FROM todo")
    res.json(allTodos.rows)
})

app.get("/get-a-todo/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
        res.json(todo.rows[0])
    } catch (err) { 
        console.error(err.message)    
    }
})

app.put("/update-todo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updatedTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *", [description, id])
        res.json(updatedTodo.rows[0])
        // res.json("Todo updated")
    } catch (err) {
        console.error(err.message);
    }
})  

app.delete("/delete-todo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1 RETURNING *", [id])
        res.json({ message: "Todo Deleted", data: deletedTodo.rows[0] })
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/adduser", (req, res) => {
    console.log(req.body)
    res.send("Response Received: " + req.body)
})

app.listen(4000, () => {
    console.log("Server running on port 4000")
})