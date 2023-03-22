const express = require('express');
const path = require('path');
const app = express();
const sqlite3 = require('sqlite3');


const db_name = path.join(__dirname, "data", "Music.db");

// app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/css', express.static(__dirname + 'public/js'));
app.use('/images', express.static(__dirname + 'public/images'));


app.set('views', './views');
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("homepage");
})
app.get("/login", (req, res) => {
    res.render("login");
})

app.get("/contactus", (req, res) => {
    res.render("contactus");
})

app.get("/aboutus", (req, res) => {
    res.render("aboutus");
})

app.get("/rockcoursedesc", (req, res) => {
    res.render("rockcoursedesc");
})

app.get("/beginnercoursedesc", (req, res) => {
    res.render("beginnercoursedesc");
})

app.get("/description", (req, res) => {
    res.render("description");
})

app.get("/freelessons", (req, res) => {
    res.render("freelessons");
})

app.get("/catalogue", (req, res) => {
    res.render("catalogue");
})


app.get("/footer", (req, res) => {
    res.render("footer");
})

app.get('/register', (req, res) => {
    res.render("Register");
    // res.redirect("/login");

})
app.post('/Create', (req, res) => {
    // res.render("Register");
    // res.redirect("/login");
})
app.get('/forgotPassword', (req, res) => {
    res.render("forgotPassword");
})
app.get('/Privacy', (req, res) => {
    res.render('Privacy');
})

const db = new sqlite3.Database(db_name, err => {
    if (err) {
        return console.log(err.message);
    }
    console.log("FSD Database Connected")
});

const structure = `CREATE TABLE IF NOT EXISTS users(
    uid INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL,
    role  VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT  NULL,
    confirm_password VARCHAR(50) NOT NULL
    )`;
db.run(structure, err => {
    if (err) {
        return console.log(err.message);
    }
    console.log("Table Created")
})

const sinsert = `INSERT INTO users (full_name, username, email, role ,password ,confirm_password ) VALUES
(1, 'Rizwan', 'rizwan321' , 'dgdhjdh@gmail.com' , 'user' , '1234567' , '1234567')`;


// db.run(sinsert, err => {
//     if (err) {
//         return console.log(err.message);
//     }
//     console.log("Data 1 is inserted")
// });



app.post('/submit', (req, res) => {
    const full_name = req.body.full_name;
    const username = req.body.username;
    const email = req.body.email;
    const role = req.body.role;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;

    const sql = 'INSERT INTO users (full_name, username, email, role ,password ,confirm_password) VALUES (?, ?, ? , ? ,? ,?)';
    db.run(sql, [full_name, username, email, role, password, confirm_password], (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Message from ${full_name} ${username} : ${email} ${role}  ${password} ${confirm_password}`);
        res.redirect('login');
    });
});







const PORT = 8000;
app.listen(PORT, (req, res) => {
    console.log(`server is listening on PORT number ${PORT}`);
})
