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
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    const receivedData = JSON.parse(data);
    if(err) throw err;
    req.body.id = receivedData.length + 1;
    receivedData.push(req.body);
    fs.writeFile("./db/db.json", JSON.stringify(receivedData), (err) => {
      if (err) throw err;
    });
    res.send("Done!"); 
  });
});

app.delete("/api/notes/:id", (req, res) => {
  const paramId = parseInt(req.params.id);
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) throw err;
    const dbArray = JSON.parse(data);
    for (let i = 0; i < dbArray.length; i++) {
      if (paramId === dbArray[i].id) {
        dbArray.splice(dbArray[i], 1);
        fs.writeFile("./db/db.json", JSON.stringify(dbArray, null, 2), (err) => {
          if (err) throw err;
        });
      }
    };
  });
  res.end("Sucess!");
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
