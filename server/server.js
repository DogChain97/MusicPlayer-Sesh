const express = require('express')
const fs = require('fs')
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

var adm = false;

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

    if(username === 'Admin' && password === '123*adm'){
        res.send({admin: true})
        adm = true;
    }else{

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

    }
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

// Handling Home Page GET Request
app.get("/home", function(req, res){
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user})
    }else{
        res.send({loggedIn: false})
    }
})

// Handling Genre Page GET Request
app.get("/genre", function(req, res){
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user})
    }else{
        res.send({loggedIn: false})
    }
})

// Handling CreatePlaylist Page GET Request
app.get("/createPlaylist", function(req, res){
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user})
    }else{
        res.send({loggedIn: false})
    }
})
// ///////////////////////////////////////////////////ADMIN///////////////////////////////////////////////
// Handling Admin POST Request
app.post("/admin", function(req,res){
    const operation = req.body.operation;
    const table = req.body.table;
    const login = req.body.admin;
    if(login == false){
        adm = false
    }
    /////////////////////////////////////ARTIST///////////////////////////////////////
    if(table === 'artist'){
        if(operation === "add"){
            const artistName = req.body.artistName;
            const artistImage = req.body.artistImage;
    
        
            db.query("INSERT into artist (a_name,a_img) values(?,?);",
            [artistName, artistImage],
            (err, result)=>{
                if(err){
                    res.send({err: err});
                }else{
                    console.log(result)
                    res.send({message: "Artist added"});
                }
                
            })
        }
        else if(operation === "update"){
            const artistName = req.body.artistName;
            const artistImage = req.body.artistImage;
    
        
            db.query("UPDATE artist SET a_img=? WHERE a_name=?;",
            [artistImage,artistName],
            (err, result)=>{
                if(err){
                    res.send({err: err});
                }else{
                    console.log(result)
                    res.send({message: "Artist Updated"});
                }
                
            })
        }
        else if(operation === 'delete'){
            const artistName = req.body.artistName;

            db.query("DELETE FROM artist WHERE a_name=?;",
            artistName,
            (err, result)=>{
                if(err){
                    res.send({err: err});
                }else{
                    console.log(result)
                    res.send({message: "Artist Deleted"});
                }
                
            })
        }
    /////////////////////////////////////GENRE///////////////////////////////////////
    }else if(table === 'genre'){
        if(operation === "add"){
            const genreName = req.body.genreName;
            const genreImage = req.body.genreImage;
    
        
            db.query("INSERT into genre (g_name,g_img) values(?,?);",
            [genreName, genreImage],
            (err, result)=>{
                if(err){
                    res.send({err: err});
                }else{
                    console.log(result)
                    res.send({message: "Genre added"});
                }
                
            })
        }
        else if(operation === "update"){
            const genreName = req.body.genreName;
            const genreImage = req.body.genreImage;
    
        
            db.query("UPDATE genre SET g_img=? WHERE g_name=?;",
            [genreImage,genreName],
            (err, result)=>{
                if(err){
                    res.send({err: err});
                }else{
                    console.log(result)
                    res.send({message: "Genre Updated"});
                }
                
            })
        }
        else if(operation === 'delete'){
            const genreName = req.body.genreName;

            db.query("DELETE FROM genre WHERE g_name=?;",
            genreName,
            (err, result)=>{
                if(err){
                    res.send({err: err});
                }else{
                    console.log(result)
                    res.send({message: "Genre Deleted"});
                }
                
            })
        }
    /////////////////////////////////////SONG///////////////////////////////////////
    }else if(table === 'song'){
        if(operation === "add"){
            const songName = req.body.songName;
            const songImage = req.body.songImage;
            const songUrl = req.body.songUrl;
            const songGenreID = req.body.songGenreID;
            const songArtistID = req.body.songArtistID;
    
        
            db.query("INSERT into song (s_name,s_img,s_url,genre_id,artist_id) values(?,?,?,?,?);",
            [songName, songImage, songUrl, songGenreID, songArtistID],
            (err, result)=>{
                if(err){
                    res.send({err: err});
                }else{
                    console.log(result)
                    res.send({message: "Song added"});
                }
                
            })
        }
        else if(operation === "update"){
            const songName = req.body.songName;
            const songImage = req.body.songImage;
            const songUrl = req.body.songUrl;
    
        
            db.query("UPDATE song SET s_img=?,s_url=? WHERE s_name=?;",
            [songImage,songUrl,songName],
            (err, result)=>{
                if(err){
                    res.send({err: err});
                }else{
                    console.log(result)
                    res.send({message: "Genre Updated"});
                }
                
            })
        }
        else if(operation === 'delete'){
            const songName = req.body.songName;

            db.query("DELETE FROM song WHERE s_name=?;",
            songName,
            (err, result)=>{
                if(err){
                    res.send({err: err});
                }else{
                    console.log(result)
                    res.send({message: "Song Deleted"});
                }
                
            })
        }
    }
    
})

app.get("/admin", function(req, res){
    if(adm){
        res.send({admin: true, user: req.session.user})
    }else{
        res.send({admin: false})
    }
})

console.log(fs.readFileSync("../Songs/Alone.mp3"))

app.listen(7000, function(){
    console.log("Server running on port 7000");
})