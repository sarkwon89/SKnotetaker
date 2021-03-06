let express = require("express");
let path = require("path");
let db = require("./db/db.json");
let fs = require("fs");
let util = require("util");


let app = express();

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

//In order to make sure your server works on local & heroku you have to make sure the commandline looks like this
//process.env.PORT=heroku's port or local port
const PORT = process.env.PORT || 3000;

//Express middleware
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//how to access your static files which are files you will never modify
app.use(express.static(path.join(__dirname, 'public')));

//ROUTING aka endpoints
//create routing to serve notes html when the user clicks the button
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})

// GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function (req, res) {
    readFileAsync("./db/db.json", "utf8").then(function (data) {
        data = JSON.parse(data)
        // console.log(data)
        return res.json(data);
    })
});

// POST `/api/notes` - Should recieve a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post("/api/notes", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    // create a variable and dump the data you got from the post ajax call in here
    var newNotes = req.body;

    // console.log(newNotes)

    //read the db.json file to grab the arrays of object and return json
    readFileAsync("./db/db.json", "utf8").then(function (data) {
        data = JSON.parse(data)
        // console.log(data);
        //  push the new data into the db.json
        data.push(newNotes);

        // data.push(data[data.length - 1].id=data.length-1) is grabbling the length and appending to the object
        data[data.length - 1].id=data.length-1;

        //once the new note is added to the array from db.json file then write the upated changes
        writeFileAsync("./db/db.json", JSON.stringify(data));
    })
    res.send("created notes!")
})


// DELETE `/api/notes/:id` - Should receive a query paramter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
app.delete("/api/notes/:id", function (req, res) {
    // This works because of our body parsing 
    var idReceived = req.params.id
    console.log(idReceived)
    
    //read the db.json file to grab the arrays of object and return json
    readFileAsync("./db/db.json", "utf8").then(function (data) {
        //turn object into string
        data = JSON.parse(data)
        
        //array splice will remove the position I ask it
        data.splice(idReceived,1);
        
        //the for loop to reset the index of the array
        for (let i = 0; i < data.length; i++) {
            data[i].id=i;
        };

        //once the new note is added to the array from db.json file then write the upated changes
        writeFileAsync("./db/db.json", JSON.stringify(data));
    })
    res.send("cleared!")
});

app.listen(PORT, function () {
    console.log("listenin on port" + PORT);
})