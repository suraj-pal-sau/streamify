import express from "express"
import "dotenv/config"

const app = express()
const PORT = process.env.PORT

app.get("/api/auth/signup", (req,res) => {
    res.send("signup page")
})
app.get("/api/auth/login", (req,res) => {
    res.send("login page")
})
app.get("/api/auth/logout", (req,res) => {
    res.send("logout page")
})
app.listen(PORT, ()=>{
    console.log(`Server is listing on port ${PORT}`)
})