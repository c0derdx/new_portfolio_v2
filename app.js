const express = require('express');
const mongoose = require("mongoose");
const { Schema } = mongoose;
const ejs = require("ejs");
const { forEach } = require("lodash");
const _ = require("lodash");
const nodemailer = require("nodemailer");

const app = express();


app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//connecting mongoose with mongodb
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/portfolioDB');
}

const projectsSchema = new Schema({
    title: String,
    url: String,
    image: String,
    content: String
});

const Project = mongoose.model('Project', projectsSchema);

const contactSchema = new Schema({
    name: String,
    contact: Number,
    email: String,
    Subject: String,
    message: String
});

const Contact = mongoose.model('Contact', contactSchema);

var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "847b299e7208e3",
        pass: "02bf807e306f17"
    }
});

var emailStatus = "Send message!";

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/projects", async (req, res) => {
    await Project.find({}, function (err, foundItems) {
        if (err) console.log(err);
        else res.render("projects", { projects: foundItems });
    }).catch((err) => {
        console.log("Promise Rejected");
    });
});

app.get("/services", (req, res) => {
    res.render("services");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/contact", (req, res) => {
    res.render("contact",{ emailStatus : emailStatus });
});

app.post("/contact", async (req, res) => {
    const name = req.body.name;
    const contact = req.body.contact;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

    const contactInfo = new Contact({
        name: name,
        contact: contact,
        email: email,
        subject: subject,
        message: message
    });

    const output = `<p>You Have a new Email</p>
    <li>Name: ${name}</li>
    <li>Contact: ${contact}</li>
    <li>Email: ${email}</li>
    <li>Subject: ${subject}</li>
    <li>Message: ${message}</li>`

    var mailOptions = {
        from: "Nodemailer Contact " + email,
        to: 'myfriend@yahoo.com',
        subject: 'Someone sent Contact on your website',
        text: 'View the html part',
        html: output
    };

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            emailStatus = "not sent";
        } else {
            console.log('Email sent: ' + info.response);
            emailStatus = "Email Sent";
        }
    });
    
    contactInfo.save();
    setTimeout(() => {
        res.redirect("/contact");        
    }, 8000);
});

app.get("/deathcomposer", async (req, res) => {
    // res.render("deathcomposer"); old code
    //new code
    await Project.find({}, function (err, foundItems) {
        if (err) console.log(err);
        else res.render("deathcomposer", { projects: foundItems });
    }).catch((err) => {
        console.log("Promise Rejected");
    });
});

app.post("/deathcomposer", function (req, res) {
    const projectTitle = req.body.projectTitle;
    const projectUrl = req.body.projectUrl;
    const projectImage = req.body.imageUrl;
    const projectContent = req.body.projectContent;

    const projectInfo = new Project({
        title: projectTitle,
        url: projectUrl,
        image: projectImage,
        content: projectContent
    });

    projectInfo.save();
    // res.redirect("/projects"); old code 
    res.redirect("/deathcomposer");
});

// app.get("/projects/:projectName", function (req, res) {
//     const requestedTitle = _.lowerCase(req.params.projectName);

//     projects.forEach(function (project) {
//         const storedTitle = _.lowerCase(project.title);

//         if (requestedTitle === storedTitle) {
//             res.render("project", { projectTitle: project.title, projectContent: project.content });
//         }
//     });
// });

app.post("/delete", async (req, res) => {
    const deleteProjectId = req.body.deleteBtn;
    await Project.findByIdAndRemove(deleteProjectId, (err) => {
        if (!err) {
            console.log("successfully deleted");
            res.redirect("/deathcomposer");
        } else {
            console.log(err);
        }
    });
});

app.listen(3000, (req, res) => {
    console.log("server started on port 3000");
});
