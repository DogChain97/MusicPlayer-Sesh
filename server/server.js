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
    let x = mail.indexOf("@");
    let y = mail.lastIndexOf(".");
    if(x<1||y<x+2||y+2>=mail.length){
        return false;
    }
    return true;
}

// Password Validation
function ValidatePassword(pass){
    const passRegexp = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[*])");
    if(pass.length == 8 && passRegexp.test(pass)){
            return true;
    }
    return false;
}

// Image Filetype Validation
function ValidateImage(image) {
    let len = image.length;
    let ext = image.substring(len-4)
    if(len>4 && (ext == ".jpg" || ext == ".png")){
        return true;
    }
        return false;
}

// Audio Filetype Validation
function ValidateAudio(audio) {
    let len = audio.length;
    let ext = audio.substring(len-4)
    if(len>4 && (ext == ".mp3" || ext == ".wav")){
        return true;
    }
        return false;
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

        db.query("SELECT u_name,email,password FROM user WHERE u_name = ?;",
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
    
    const images = []
    const songs = []
    const artists = []
    const genres = []
    const urls = []
    const playlists = []
    const ids = []

    if(req.session.user){
        db.query("SELECT s_img,s_name,s_url,a_name,g_name FROM song JOIN artist ON artist_id = a_id JOIN genre ON g_id = genre_id ORDER BY s_name;", (err,result)=>{
            if(err){
                console.log(err);
            }else{
                for(let i = 0; i < result.length; i++){
                    images.push(result[i].s_img)
                    songs.push(result[i].s_name)
                    urls.push(result[i].s_url)
                    artists.push(result[i].a_name)
                    genres.push(result[i].g_name)
                }
                db.query("SELECT pl_id,pl_name from playlists where user_name=?;",[req.session.user[0].u_name],(error, result2)=>{
                    if(error){
                        console.log(err);
                    }else{
                        for(let i = 0; i < result2.length; i++){
                            playlists.push(result2[i].pl_name)
                            ids.push(result2[i].pl_id)
                        }
                        res.send({loggedIn: true, user: req.session.user, images: images, songs: songs, urls:urls, artists: artists, genres: genres, playlists:playlists, ids:ids})
                    }
                })
            }
        })
    }else{
        res.send({loggedIn: false})
    }
})

// Handling Genre Page GET Request
app.get("/genre", function(req, res){
    
    const images = []
    const genres = []
    const playlists = []
    const ids = []
    
    if(req.session.user){
        db.query("SELECT g_img, g_name FROM genre;", (err,result)=>{
            if(err){
                console.log(err);
            }else{
                for(let i = 0; i < result.length; i++){
                    images.push(result[i].g_img)
                    genres.push(result[i].g_name)
                }
                db.query("SELECT pl_id,pl_name from playlists where user_name=?;",[req.session.user[0].u_name],(error, result2)=>{
                    if(error){
                        console.log(err);
                    }else{
                        for(let i = 0; i < result2.length; i++){
                            playlists.push(result2[i].pl_name)
                            ids.push(result2[i].pl_id)
                        }
                        res.send({loggedIn: true, user: req.session.user, images: images, genres: genres, playlists:playlists, ids:ids})
                    }
                })
            }
        })
    }else{
        res.send({loggedIn: false})
    }
})

// Handling CreatePlaylist Page GET Request
app.get("/createPlaylist", function(req, res){
    
    const playlists = []
    const ids = []
    
    if(req.session.user){
        db.query("SELECT pl_id,pl_name from playlists where user_name=?;",[req.session.user[0].u_name],(error, result2)=>{
            if(error){
                console.log(err);
            }else{
                for(let i = 0; i < result2.length; i++){
                    playlists.push(result2[i].pl_name)
                    ids.push(result2[i].pl_id)
                }
                res.send({loggedIn: true, user: req.session.user, playlists:playlists, ids:ids})
            }
        })
    }else{
        res.send({loggedIn: false})
    }
})

// Genre Songs Page GET Request
app.get("/genre/:param", function(req, res){

    const images = []
    const songs = []
    const artists = []
    const urls = []
    var genreImg = ''
    const playlists = []
    const ids = []

    const genre = req.params.param;
    if(req.session.user){
        db.query("SELECT s_img,s_name,s_url,a_name,g_img FROM song JOIN artist ON artist_id = a_id JOIN genre ON g_id = genre_id WHERE g_name=? ORDER BY s_name;",[genre], (err, result)=>{
            if(err){
                console.log(err);
            }else{
                for(let i = 0; i < result.length; i++){
                    images.push(result[i].s_img)
                    songs.push(result[i].s_name)
                    urls.push(result[i].s_url)
                    artists.push(result[i].a_name)
                }
                genreImg = result[0].g_img
                db.query("SELECT pl_id,pl_name from playlists where user_name=?;",[req.session.user[0].u_name],(error, result2)=>{
                    if(error){
                        console.log(err);
                    }else{
                        for(let i = 0; i < result2.length; i++){
                            playlists.push(result2[i].pl_name)
                            ids.push(result2[i].pl_id)
                        }
                        res.send({loggedIn: true, user: req.session.user, images: images, songs: songs, urls:urls, artists: artists, genreImg: genreImg, playlists:playlists, ids:ids})
                    }
                })
            }
        })
    }else{
        res.send({loggedIn: false})
    }
})

// Artist Songs Page GET Request
app.get("/artist/:param", function(req, res){

    const images = []
    const songs = []
    const genres = []
    const urls = []
    var artistImg = ''
    const playlists = []
    const ids = []

    const artist = req.params.param;
    if(req.session.user){
        db.query("SELECT s_img,s_name,s_url,g_name,a_img FROM song JOIN artist ON artist_id = a_id JOIN genre ON g_id = genre_id WHERE a_name=? ORDER BY s_name;",[artist], (err, result)=>{
            if(err){
                console.log(err);
            }else{
                for(let i = 0; i < result.length; i++){
                    images.push(result[i].s_img)
                    songs.push(result[i].s_name)
                    urls.push(result[i].s_url)
                    genres.push(result[i].g_name)
                }
                artistImg = result[0].a_img
                db.query("SELECT pl_id,pl_name from playlists where user_name=?;",[req.session.user[0].u_name],(error, result2)=>{
                    if(error){
                        console.log(err);
                    }else{
                        for(let i = 0; i < result2.length; i++){
                            playlists.push(result2[i].pl_name)
                            ids.push(result2[i].pl_id)
                        }
                        res.send({loggedIn: true, user: req.session.user, images: images, songs: songs, urls:urls, genres: genres, artistImg: artistImg, playlists:playlists, ids:ids})
                    }
                })
            }
        })
    }else{
        res.send({loggedIn: false})
    }
})

////////////////////////////////////////////////////PLAYLIST/////////////////////////////////////////
// Create Playlist POST Rrequest
app.post("/createplaylist", (req, res)=>{
    const user = req.body.user
    const plname = req.body.plname

    db.query("INSERT into playlists(user_name,pl_name) VALUES (?,?);",[user,plname],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log("Successfully Inserted")
        }
    })

    db.query("SELECT pl_id from playlists WHERE user_name=? AND pl_name=?;",[user,plname],(err, result)=>{
        if(err){
            res.send({message: "No playlist found"})
        }else{
            res.send({id: result[0].pl_id})
        }
    })
})

// UserPlaylist GET Request
app.get("/playlist/:name/:id",(req,res)=>{
    
    const songs = []
    const plimages = []
    const plsongs = []
    const plartists = []
    const plgenres = []
    const plurls = []
    const playlists = []
    const ids = []

    var id = req.params.id
    var name = req.params.name

    if(req.session.user){
        db.query("SELECT s_name FROM song ORDER BY s_name;", (err,result)=>{
            if(err){
                console.log(err)
            }else{
                for(let i = 0; i < result.length; i++){
                    songs.push(result[i].s_name)
                }
                db.query("SELECT pl_id,pl_name from playlists where user_name=?;",[req.session.user[0].u_name],(error, result2)=>{
                    if(error){
                        console.log(err);
                    }else{
                        for(let i = 0; i < result2.length; i++){
                            playlists.push(result2[i].pl_name)
                            ids.push(result2[i].pl_id)
                        }
                        db.query("select s_img,s_name,s_url,a_name,g_name from song JOIN artist ON a_id=artist_id JOIN genre ON g_id=genre_id JOIN userplaylist ON song_name=s_name JOIN playlists ON usp_id=pl_id WHERE song_name=s_name AND pl_id=?;",[id],(err3,result3)=>{
                            if(err3){
                                console.log(err3)
                            }else{
                                for(let i = 0; i < result3.length; i++){
                                    plimages.push(result3[i].s_img)
                                    plsongs.push(result3[i].s_name)
                                    plartists.push(result3[i].a_name)
                                    plgenres.push(result3[i].g_name)
                                    plurls.push(result3[i].s_url)
                                }
                                res.send({loggedIn: true, user: req.session.user, songs: songs, plimages: plimages, plsongs: plsongs, plurls: plurls, plartists: plartists, plgenres: plgenres, playlists: playlists, ids:ids})
                            }
                        })
                    }
                })
            }
        })
        
    }else{
        res.send({loggedIn: false})
    }
    
})

app.post("/addsong", (req, res)=>{
    var id = req.body.id
    var name = req.body.song

    db.query("SELECT COUNT(*) as count from userplaylist WHERE usp_id=? and song_name=?;",[id,name],(err, result)=>{
        if(err){
            console.log(err)
        }
        else{
            if((result[0].count === 0)){
                db.query("INSERT INTO userplaylist (usp_id,song_name) VALUES (?,?);",[id,name],(err2, result2)=>{
                    if(err2){
                        console.log(err2)
                    }else{
                        res.send({message: "Song Added"})
                    }
                })
            }else{
                res.send({message: "Song Already Exists"})
            }
        }
    })
})

////////////////////////////////////////////////////LOGOUT//////////////////////////////////////////////////
app.post("/logout", function(req, res){
    req.session.destroy();
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
    
            if(ValidateImage(artistImage)){
                db.query("INSERT into artist (a_name,a_img) values(?,?);",
                [artistName, artistImage],
                (err, result)=>{
                    if(err){
                        res.send({message: "Artist already exists"});
                    }else{
                        console.log(result)
                        res.send({message: "Artist added"});
                    }
                    
                })
            }else{
                res.send({message: "Invalid image"})
            }
        }
        else if(operation === "update"){
            const artistName = req.body.artistName;
            const artistImage = req.body.artistImage;
    
            if(ValidateImage(artistImage)){
                db.query("UPDATE artist SET a_img=? WHERE a_name=?;",
                [artistImage,artistName],
                (err, result)=>{
                    if(err){
                        res.send({message: "Artist doesn't exist"});
                    }else{
                        if(result.affectedRows == 0){
                            res.send({message: "Artist doesn't exist"});
                        }else{
                            res.send({message: "Artist Updated"});
                        }
                    }
                    
                })
            }else{
                res.send({message: "Invalid image"})
            }
            
        }
        else if(operation === 'delete'){
            const artistName = req.body.artistName;
            db.query("DELETE FROM artist WHERE a_name=?;",
            artistName,
            (err, result)=>{
                if(err){
                    res.send({message: "Artist doesn't exist"});
                }else{
                    if(result.affectedRows == 0){
                        res.send({message: "Artist doesn't exist"});
                    }else{
                        res.send({message: "Artist Deleted"});
                    }
                }
                
            })
        }
        // else if(operation === 'show'){
        //     const artistID = []
        //     const artistName = []
        //     const artistImg = []
        //     db.query("SELECT * FROM artist;",(err, result)=>{
        //         if(err){
        //             res.send({message: "Artist table doesn't exist"});
        //         }else{
        //             for(let i=0;i<result.length;i++){
        //                 artistID.push(result[i].a_id);
        //                 artistName.push(result[i].a_name);
        //                 artistImg.push(result[i].a_img);
        //             }
        //         }
        //         res.send({artistID:artistID, artistName:artistName, artistImage:artistImg})
        //     })
        // }
    /////////////////////////////////////GENRE///////////////////////////////////////
    }else if(table === 'genre'){
        if(operation === "add"){
            const genreName = req.body.genreName;
            const genreImage = req.body.genreImage;
    
            if(ValidateImage(genreImage)){
                db.query("INSERT into genre (g_name,g_img) values(?,?);",
                [genreName, genreImage],
                (err, result)=>{
                    if(err){
                        res.send({message: "Genre already exists"});
                    }else{
                        console.log(result)
                        res.send({message: "Genre added"});
                    }
                    
                })
            }else{
                res.send({message: "Invalid image"})
            }
        }
        else if(operation === "update"){
            const genreName = req.body.genreName;
            const genreImage = req.body.genreImage;
    
            if(ValidateImage(genreImage)){
                db.query("UPDATE genre SET g_img=? WHERE g_name=?;",
                [genreImage,genreName],
                (err, result)=>{
                    if(err){
                        res.send({message: "Genre doesn't exist"});
                    }else{
                        if(result.affectedRows == 0){
                            res.send({message: "Genre doesn't exist"});
                        }else{
                            res.send({message: "Genre Updated"});
                        }
                    }
                    
                })
            }else{
                res.send({message: "Invalid image"})
            }
        }
        else if(operation === 'delete'){
            const genreName = req.body.genreName;

            db.query("DELETE FROM genre WHERE g_name=?;",
            genreName,
            (err, result)=>{
                if(err){
                    res.send({message: "Genre doesn't exist"});
                }else{
                    if(result.affectedRows == 0){
                        res.send({message: "Genre doesn't exist"});
                    }else{
                        res.send({message: "Genre Deleted"});
                    }
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
    
            if(ValidateImage(songImage) && ValidateAudio(songUrl)){
                db.query("INSERT into song (s_name,s_img,s_url,genre_id,artist_id) values(?,?,?,?,?);",
                [songName, songImage, songUrl, songGenreID, songArtistID],
                (err, result)=>{
                    if(err){
                        res.send({message: "Genre ID or Artist ID doesnt exist"});
                    }else{
                        console.log(result)
                        res.send({message: "Song added"});
                    }
                    
                })
            }else{
                res.send({message: "Invalid image or song"})
            }
        }
        else if(operation === "update"){
            const songName = req.body.songName;
            const songImage = req.body.songImage;
            const songUrl = req.body.songUrl;
    
            if(ValidateImage(songImage) && ValidateAudio(songUrl)){
                db.query("UPDATE song SET s_img=?,s_url=? WHERE s_name=?;",
                [songImage,songUrl,songName],
                (err, result)=>{
                    if(err){
                        res.send({message: "Song doesn't exist"});
                    }else{
                        if(result.affectedRows == 0){
                            res.send({message: "Song doesn't exist"});
                        }else{
                            res.send({message: "Song Updated"});
                        }
                    }
                    
                })
            }else{
                res.send({message: "Invalid image or song"})
            }
        }
        else if(operation === 'delete'){
            const songName = req.body.songName;

            db.query("DELETE FROM song WHERE s_name=?;",
            songName,
            (err, result)=>{
                if(err){
                    res.send({message: "Song doesn't exist"});
                }else{
                    if(result.affectedRows == 0){
                        res.send({message: "Song doesn't exist"});
                    }else{
                        res.send({message: "Song Deleted"});
                    }
                }
                
            })
        }
    }
    
})

app.post("/showartist", (req,res)=>{
    const artistID = []
    const artistName = []
    const artistImg = []
    db.query("SELECT * FROM artist;",(err, result)=>{
        if(err){
             res.send({message: "Artist table doesn't exist"});
        }else{
            for(let i=0;i<result.length;i++){
                 artistID.push(result[i].a_id);
                 artistName.push(result[i].a_name);
                 artistImg.push(result[i].a_img);
            }
         }
        res.send({artistID:artistID, artistName:artistName, artistImage:artistImg})
    })
})

app.post("/showgenre",(req,res)=>{
    const genreID = []
    const genreName = []
    const genreImg = []
    db.query("SELECT * FROM genre;",(err, result)=>{
         if(err){
             res.send({message: "Song table doesn't exist"});
         }else{
             for(let i=0;i<result.length;i++){
                 genreID.push(result[i].g_id);
                 genreName.push(result[i].g_name);
                 genreImg.push(result[i].g_img);
             }
         }
         res.send({genreID:genreID, genreName:genreName, genreImage:genreImg})
     })
})

app.post("/showsong",(req,res)=>{
    const songID = []
    const songName = []
    const songImg = []
    const songUrl = []
    const songGenreID = []
    const songArtistID = []
    db.query("SELECT * FROM song;",(err, result)=>{
        if(err){
            res.send({message: "Song table doesn't exist"});
        }else{
            for(let i=0;i<result.length;i++){
                songID.push(result[i].s_id);
                songName.push(result[i].s_name);
                songImg.push(result[i].s_img);
                songUrl.push(result[i].s_url);
                songGenreID.push(result[i].genre_id);
                 songArtistID.push(result[i].artist_id);
            }
         }
        res.send({songID:songID, songName:songName, songImage:songImg, songUrl:songUrl, songGenreID:songGenreID, songArtistID:songArtistID})
    })
})

app.get("/admin", function(req, res){
    if(adm){
        res.send({admin: true, user: req.session.user})
    }else{
        res.send({admin: false})
    }
})

app.listen(7000, function(){
    console.log("Server running on port 7000");
})