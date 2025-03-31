const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');




app.use(express.urlencoded({extended: true}));


app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts =[
    {
        id:uuidv4(),
        username:"Akshay Darekar",
        content :"I love coding "
    },
    {
        id:uuidv4(),
        username:"apnacollage",
        content :" Hard Work is Important to achive success "
    },
    {
        id:uuidv4(),
        username:"Milind Sangale",
        content :"I got selected for my 1st internship"
    },
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
});

app.post("/posts",(req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4()
    posts.push({ id, username, content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    console.log("Requested ID:", id); 
    console.log("Available Post IDs:", posts.map(p => p.id)); 
    let post = posts.find((p) => p.id === id);
    res.render("show.ejs", { post });
});

app.patch("/posts/:id",(req,res)=>{
    let { id } = req.params;
    let newContent = req.body.content
    console.log("Available Post IDs:", posts.map(p => p.id));
    let post = posts.find((p) => p.id === id);
    post.content = newContent;
    console.log(post);
   res.send("patch request is working ") 
});

app.get("/posts/:id/edit",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("edit.ejs"),{post};
});




app.listen(port, ()=>{
    console.log("listening to port :",port);
});