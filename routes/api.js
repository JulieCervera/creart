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


// LOGIN / REGISTER

// Insert new user in database
router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((error, registeredUser) => {
        if (error) {
            res.send(error);
        } else {
            res.status(200).send(registeredUser);
        }
    });
});

// login, verify if user exist and authentication is correct then log
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

// USER

// remove user from database
router.delete('/account', (req, res) => {
    let userId = req.get('userId');
    User.deleteOne({ _id: userId }, function (err) {
        if (err) handleError(err);
        res.status(201);
        res.end();
    });
})

// update user information in database
router.put('/account', (req, res) => {
    User.findOneAndUpdate({ _id: req.body._id }, req.body, function (err) {
        if (err) res.send(err);
        res.status(201);
        res.end();
    });
});

// ARTS

// return all arts collection of database
router.get('/arts', (req, res) => {
    Art.find((error, art) => {
        if (error) res.send(error);
        res.json(art);
    });
});

//returns user arts from arts collection of database
router.get('/myArts', (req, res) => {
    let id = req.get('userId');
    Art.find({ userId: id }, (error, arts) => {
        if (error) res.send(error);
        res.json(arts);
    })
})

// ARTWORK

// upload an image and add picture_path in database
router.post("/upload", (req, res) => {
    let art = new Art(req.body);
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.files.path;
        console.log(files.files);
        var newpath = "./ngApp/src/assets/images/" + files.files.name;
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
        });
        art.picture_path = files.files.name;

        art.save(function (error, newArtwork) {
            if (error) {
                res.status(400);
            } else {
                res.status(200).send(newArtwork._id)
            }
        })
    });
});

// Add other field of artwork (linked to the image) in database
router.put('/upload', (req, res) => {
    console.log('add new artwork', req.body._id);
    Art.findOneAndUpdate({
        _id: req.body._id
    }, req.body, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.status(201).json({
                success: true,
                message: 'OK'
            })
        }
    })

})

// Return art informations of selected art
router.get('/details', (req, res) => {
    let id = req.get('artId');
    Art.findOne({ _id: id }, (error, art) => {
        if (error) return (error);
        res.status(200).send(art);
    });
});

// Delete art entry in database
router.delete('/details', (req, res) => {
    let id = req.get('artId');
    console.log(id);
    Art.deleteOne({ _id: id }, function (err) {
        if (err) return err;
        res.status(201);
        res.end();
    });
});

// update art entry in database
router.put('/details', (req, res) => {
    Art.findOneAndUpdate({ _id: req.body._id }, req.body, function (err) {
        if (err) res.send(err);
        res.status(201);
        res.end();
    });
});

module.exports = router;
