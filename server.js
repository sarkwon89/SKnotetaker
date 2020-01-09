let express = require("express");
let path = require("path");
let db = require("./db/db.json");
let fs = require("fs");
let util = require("util");


let app = express();

const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);

//In order to make sure your server works on local & heroku you have to make sure the commandline looks like this
//process.env.PORT=heroku's port or local port
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

//customer DATA
let notesData = [

];


//ROUTING
//create routing to serve notes html when the user clicks the button

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})


// Displays all the notes created
app.get("/api/notes", function (req, res) {
    return res.json(notesData);
});


// Create New Characters - takes in JSON input
app.post("/api/clear", function (req, res) {
    // This works because of our body parsing middleware
    notesData = []
    res.send("cleared!")

});

// Create New Characters - takes in JSON input
app.post("/api/notes", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newNotes = req.body;
    notesData.push(newNotes)
     //write file 
     writeFileAsync("./db/db.json", notesData)

    res.send("Created a new note!")
})


app.listen(PORT, function () {
    console.log("listenin on port" + PORT);
})