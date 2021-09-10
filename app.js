const express = require('express');
const mongoose = require("mongoose");
const { Schema } = mongoose;
const ejs = require("ejs");
const { forEach } = require("lodash");
const _ = require("lodash");

const app = express();
// let projects = [];


app.set('view engine','ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

//connecting mongoose with mongodb
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/portfolioDB');
}

const projectsSchema = new Schema({
    title: String,
    image: String,
    content: String
});

const Project = mongoose.model('Project', projectsSchema);

app.get("/", (req,res) => {
    res.render("home");
});

app.get("/projects", async (req,res) => {
    await Project.find({}, function(err, foundItems) {
        if (err) console.log(err);
        else res.render("projects",{projects:foundItems});
    });
});

app.get("/services", (req,res) => {
    res.render("services");
});

app.get("/about", (req,res) => {
    res.render("about");
});

app.get("/contact", (req,res) => {
    res.render("contact");
});

app.get("/deathcomposer", (req,res) => {
    res.render("deathcomposer");
});

app.post("/deathcomposer", function(req,res) {
const projectTitle = req.body.projectTitle;
const projectImage = req.body.imageUrl;
const projectContent = req.body.projectContent;

    const projectInfo = new Project ({
        title: projectTitle,
        image: projectImage,
        content: projectContent
    });

    // projects.push(project);
    projectInfo.save();
    res.redirect("/projects");
});

app.get("/projects/:projectName", function(req,res){
    const requestedTitle = _.lowerCase(req.params.projectName);
  
    projects.forEach(function(project) {
      const storedTitle = _.lowerCase(project.title);
  
        if (requestedTitle === storedTitle) {
          res.render("project",{projectTitle:project.title,projectContent:project.content});
        }
    });
  });

app.listen(3000,(req,res)=>{
    console.log("server started on port 3000");
});
