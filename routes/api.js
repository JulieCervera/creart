const express = require('express');
const router = express.Router();
const fs = require('fs');
const formidable = require('formidable');
const fileUpload = require('express-fileupload');

const mongoose = require('mongoose');
const db = 'mongodb://user1:test@ds147459.mlab.com:47459/creartdb';

const User = require('./models/user');
const Art = require('./models/artwork');

mongoose.connect(db, err => {
    if (err) {
        console.error('Error!' + err);
    } else {
        console.log('Connected to mongodb');
    }
});

router.get('/', (req, res) => {
    res.send('From API route');
});


// Insert new user BDD

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((error, registeredUser) => {
        if (error) {
            res.send(error);
        } else {
            res.status(200).send(registeredUser);
        }
    })
})

// login

router.post('/login', (req, res) => {
    let userData = req.body;
    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            res.send(error);
        } else {
            if (!user) {
                res.status(401).send('Invalid email');
            } else {
                if (user.password !== userData.password) {
                    res.status(401).send('Invalid password');

                } else {
                    res.status(200).send(user);
                }
            }
        }
    })
})

// delete user

router.delete('/account', (req, res) => {
    let userId = req.get('userId');
    User.deleteOne({ _id: userId }, function (err) {
        if (err) handleError(err);
        res.status(201);
    });
})

// edit user information

router.put('/account', (req, res) => {
    User.findOneAndUpdate({ _id: req.body._id }, req.body, function (err, ) {
        if (err) res.send(err);
        res.status(201)
    });
});

// return all arts

router.get('/arts', (req, res) => {
    Art.find((error, art) => {
        if (error) res.send(error);
        res.json(art);
    });
});

//returns user collection

router.get('/myArts', (req, res) => {
    let id = req.get('userId');
    Art.find({ userId: id }, (error, arts) => {
        if (error) res.send(error);
        res.json(arts);
    })
})

// upload an image

router.post("/upload", (req, res) => {
    let art = new Art(req.body);
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        let oldpath = files.files.path;
        let newpath = "./ngApp/src/assets/images/" + files.files.name;
        fs.rename(oldpath, newpath, function (err) {
            if (err) res.send(err);
        });
        art.picture_path = files.files.name;
        art.save(function (error, newArtwork) {
            if (error) res.send(error);
            res.status(200).json(newArtwork._id);
        })
    });
});

// Add new art

router.put('/upload', (req, res) => {
    console.log('add new artwork', req.body._id);
    Art.findOneAndUpdate({ _id: req.body._id }, req.body, function (err) {
        if (err) res.send(err);
        res.status(201);
    })
})

// Return art informations

router.get('/details', (req, res) => {
    let id = req.get('artId');
    Art.findOne({ _id: id }, (error, art) => {
        if (error) return (error);
        res.status(200).send(art);
    });
});

// Delete art

router.delete('/details', (req, res) => {
    let id = req.get('artId');
    Art.remove({ _id: id }, function (err) {
        if (err) return err;
        res.status(201);
    });
});

// Edit art

router.put('/details', (req, res) => {
    console.log('edit artwork', req.body._id);
    Art.findOneAndUpdate({ _id: req.body._id }, req.body, function (err) {
        if (err) res.send(err);
        res.status(201);
    });
});

module.exports = router;