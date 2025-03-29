const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

app.use(express.urlencoded({extended: true}));


app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts =[
    {
        username:"Akshay Darekar",
        content :"I love coding "
    },
    {
        username:"apnacollage",
        content :" Hard Work is Important to achive success "
    },
    {
        username:"Milind Sangale",
        content :"I got selected for my 1st internship"
    },
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})

app.post("/posts",(req,res)=>{
    let {username,content} = req.body;
    posts.push({username,content});
    res.redirect("/posts");
});



app.listen(port, ()=>{
    console.log("listening to port :",port);
});