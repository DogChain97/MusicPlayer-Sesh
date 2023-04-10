const express = require('express')
const cors = require('cors')
const mysql = require('mysql')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const bcrypt = require('bcrypt')
const saltRounds = 10;

const app = express()
app.use(express.json())

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ["GET","POST"],
    credentials: true
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
    key: "userID",
    secret: "qwe8f46da5sf1sdv8xc7h98gk6j5b4mvbncb2v13z21v3x8fh7jghk2fb1z0czxfczxfz5b20",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 24
    }
}))

// Email Validation
function ValidateEmail(mail) 
{
    var x = mail.indexOf("@");
    var y = mail.lastIndexOf(".");
    if(x<1||y<x+2||y+2>=mail.length){
        return false;
    }else{
        return true;
    }
}

// Password Validation
function ValidatePassword(pass){
    const passRegexp = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[*])");
    if(pass.length == 8 && passRegexp.test(pass)){
            return true;
    }else{
        return false;
    }
}

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'R*0t123',
    database: 'musicplayer'
});

// Handling User Login GET Request
app.get("/login", function(req,res){
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user})
    }else{
        res.send({loggedIn: false})
    }
})

// Handling User Login POST Request
app.post("/login", function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT * FROM user WHERE u_name = ?;",
    username,
    (err, result)=>{
        if(err){
            res.send({err: err});
        }
        if(result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) =>{
                if(response){
                    req.session.user = result;
                    res.send(result)
                }else{
                    res.send({message: "Wrong Username/Password!"});
                }
            })
        }else{
            res.send({message: "User doesn't exist"});
        }
        
    })
})

// Handling User Registration
app.post("/register", function(req, res){

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if(username!=""&&email!=""&&password!=""){
        if(ValidateEmail(email) && ValidatePassword(password)){
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if(err){
                    console.log(err);
                }
                db.query("INSERT into user (u_name, email, password) values (?,?,?);",[username, email, hash], (err, result)=>{
                    if(err){
                        res.send({message: "Username/Email already exists! Try again"});
                    }else{
                        res.send(result)
                    }
                })
            })
        }else{
            res.send({message: "Invalid Mail/Password!"})
        }
    }else{
        res.send({message: "Do not leave the fields empty!"})
    }
})



app.listen(7000, function(){
    console.log("Server running on port 7000");
})