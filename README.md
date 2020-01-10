# SKnotetaker

## What is this?
THis is an application that can be used to write, save, and delete notes. This application will use an express backend and save and retrieve note data from a JSON file.

# How does it work?
User will need to click on the "get started" button to begin.
User will have to start creating the note by filling in the note title and note text section
User will have to click on the save icon to save the note
User can view saved notes by clicking on the notes displayed on the left hand side
User can delete the note by clicking on the delete icon

# What is it using?
* CSS
* HTML
* JQUERY
* Express web app framework
* Javascript
* Node.js

# Server-side Routing

* The following HTML routes created:

  * GET `/notes` - Should return the `notes.html` file.

  * GET `*` - Should return the `index.html` file

* The application has a `db.json` file on the backend that will be used to store and retrieve notes using the `fs` module.

* The following API routes created:

  * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.

  * POST `/api/notes` - Should recieve a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

  * DELETE `/api/notes/:id` - Should recieve a query paramter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

# Github Repo

https://github.com/sarkwon89/SKnotetaker

# Access my application

https://sknotetaker.herokuapp.com/ 

# Visual Example
https://drive.google.com/open?id=1QWn1RQzZTq6eQak30N_9ooHg_yzy1fgn 