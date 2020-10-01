// Defining needed modules
const express = require("express");
const fs = require("fs");
const path = require("path");

// Defining PORT
const PORT = process.env.PORT || 8080;

// Defining app
const app = express();

// HTML routes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Starting server
app.listen(PORT, () => {
    console.log(`Your server is on at PORT ${PORT}...`);
})