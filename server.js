let express = require("express");
let path = require("path");
let db = require("./db/db.json");
let fs = require("fs");
let util = require("util");


let app = express();

const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);
const readFileAsync = util.promisify(fs.readFile);

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
    // let noteSaved = readFileAsync("./db/db.json", "utf8").then(function(){
    //     noteSaved = JSON.parse(noteSaved)
    //     console.log(noteSaved)
    // }).catch(function(err){
    //     return console.log(err)
    // })
    return res.json(notesData);
});


// Create new note - takes in JSON input
app.post("/api/notes", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newNotes = req.body;
    notesData.push(newNotes)

    // console.log(notesData)

    //push the object of array into db.json by using writefile
    // writeFileAsync("./db/db.json", JSON.stringify(newNotes));

    res.send("Created a new note!")
})


// Create New Characters - takes in JSON input
app.post("/api/clear", function (req, res) {
    // This works because of our body parsing middleware
    notesData = []
    res.send("cleared!")

});

app.listen(PORT, function () {
    console.log("listenin on port" + PORT);
})