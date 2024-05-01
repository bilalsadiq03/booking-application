const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken')
const mongoose = require("mongoose")
const express = require("express");
const User = require('./models/user');
const bcrypt = require('bcryptjs')
const cookieParser = require("cookie-parser");
const imageDownloader = require('image-downloader');
const  multer = require("multer");
const fs = require('fs');
const app = express();


const jwtSecret = 'gnljendueofhncffhnfkvmvueknirgu'   //Randomly generated secret key for JWT
 
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection

// db.on("error", ()=>{
//     console.log("Error while connecting to MongoDB")
// })

// db.once("open", ()=>{
//     console.log("Successfully connected to mongodb")
// })

app.use(express.json())
app.use(cookieParser())

app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

app.get('/test', (req, res) => {
    res.json('test ok!');
})

app.post('/register', async (req, res)=>{
    const {name, email, password} = req.body;
    
    try {
        const userData = await User.create({
            name,
            email, 
            password: bcrypt.hashSync(password, 8)
        })
        res.json(userData);
    } catch (err) {
        res.status(422).json(err);
    }
})

app.post('/login', async(req, res)=> {
    const {email, password} = req.body;
    const userData = await User.findOne({email});

    if (userData) {
        const passOK = bcrypt.compareSync(password, userData.password);
        if(passOK){
            jwt.sign({
                email: userData.email,            
                id:userData._id,
                
            }, jwtSecret,{}, (err, token) => {
                if (err) throw err;
                res.cookie('token',token).json(userData)
            })
        } else {
            res.status(422).json('Wrong Password')
        }
    } 
    else {
        res.status(422).json('No user found')
    }
})


app.get('/profile', (req, res)=>{
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, (err, user)=>{
            if (err) throw err;
            res.json(user)

        })
    } else {
        res.json(null)
    }
})

app.post('/logout', (req, res)=>{
    res.cookie('token', '').json(true);
})

app.post('/upload-by-link',async (req, res)=>{
    const {link} = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName
    })
    res.json(newName)
})


const photosMW = multer({dest: 'uploads/'})
app.post('/upload', photosMW.array('photos', 100), (req, res)=>{
    const uploadedFiles = []; 
    for(let i=0; i<req.files.length; i++){
        const {path, originalname} = req.files[i];
        const parts = originalname.split('.');
        const extn = parts[parts.length - 1];
        const newPath = path + '.' + extn;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads\\', ''));
    }
    res.json(uploadedFiles);
})

app.listen(4000);
console.log(`Server is running on http://localhost:4000`);