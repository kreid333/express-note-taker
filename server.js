// Defining needed modules
const express = require("express");
const fs = require("fs");
const path = require("path");

// Defining PORT
const PORT = process.env.PORT || 8080;

// Defining app
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API routes
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    const receivedData = JSON.parse(data);
    if(err) throw err;
    receivedData.push(req.body);
    fs.writeFile("./db/db.json", JSON.stringify(receivedData), (err) => {
      if (err) throw err;
    });
    res.send("Done!"); 
  });
});

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
});
