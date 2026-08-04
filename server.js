const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tttt"
});

db.connect((err) => {
    if (err) {
        console.log("Database connection error:", err);
    } else {
        console.log("Connected to MySQL database");
    }
});

// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "web.html"));
});

// Registration
app.post("/register", (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;

    db.query(
        "INSERT INTO login (name, email, password) VALUES (?, ?, ?)",
        [name, email, password],
        (err, result) => {
            if (err) {
                console.error("MySQL Error:", err);
                return res.send("Registration Failed");
            }

            console.log("Data Inserted Successfully");
            res.send("Registration Successful");
        }
    );
});

// Login
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query(
        "SELECT * FROM login WHERE email=? AND password=?",
        [email, password],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.send("Login Failed");
            }

            if (result.length > 0) {
                res.send("Login Successful");
            } else {
                res.send("Invalid Email or Password");
            }
        }
    );
});
const PORT = 5000;
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});


