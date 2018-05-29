const express = require('express');
const router = express.Router();
const fs = require('fs');

const mongoose = require('mongoose');
const db = 'mongodb://user1:test@ds147459.mlab.com:47459/creartdb';

const User = require('./models/user');
const Art = require('./models/artwork');

mongoose.connect(db, err => {
    if (err) {
        console.error('Error!'+ err);
    } else {
        console.log('Connected to mongodb');
    }
})

router.get('/', (req,res) => {
    res.send('From API route')
})

// REGISTER

router.post('/register', (req,res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error);
        } else {
            res.status(200).send(registeredUser)
        }
    })
})

// LOGIN

router.post('/login', (req,res)=> {
    let userData = req.body;

    User.findOne({email: userData.email}, (error, user) => {
        if (error) {
            console.log(error);
        } else {
            if (!user) {
                res.status(401).send('Invalid email')               
            } else {
                if (user.password !== userData.password) {
                res.status(401).send('Invalid password')               
                    
                } else {
                    res.status(200).send(user)
                }
            }
        }
    })
})


// ARTS

router.get('/arts', (req,res) => {

    Art.find( (error, art) => {
        if(error) res.send(error);
        res.json(art);
    }
    )
}) 

// // ARTWORK

router.post('/artwork', (req,res) => {
    let dateNow = Date.now();
    let img_path = `/public/data/${dateNow}-img.png`;


    let artmodel = new Art(); 
    artmodel.name = req.body.name;
    artmodel.description = req.body.description;
    // artmodel.date = req.body.date;
    artmodel.ville = req.body.ville;
  
    
    // if (!req.files)
    //             return res.status(400).send('No files were uploaded.');
    //         let tmppath = req.files.path;
   
    
    artmodel.save(function (error,artmodel) {        
        if (error) {
            res.status(400);
        } else {
            // tmppath.mv(img_path, err => {
            //     if (err)
            //         return res.status(500).send(err);

            //         res.send('File uploaded!');
            // })
            
            // artmodel.path = img_path;
            // artmodel.save()
            // // recordedes mongoose instance ? 

            // Art.findOneAndUpdate(artmodel);
            res.status(201).json({
                success: true,
                message: 'OK'
            })
        }
    })

})


module.exports = router;