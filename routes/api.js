const express = require('express');
const router = express.Router();
const fs = require('fs');
const formidable = require('formidable');

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
})

router.get('/', (req, res) => {
    res.send('From API route')
})

// ACCOUNT

// REGISTER

router.post('/register', (req, res) => {
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

router.post('/login', (req, res) => {
    let userData = req.body;

    User.findOne({
        email: userData.email
    }, (error, user) => {
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

// DELETE

router.delete('/account', (req, res) => {
    let userId = req.get('userId');

    User.deleteOne({
        _id: userId
    }, function (err) {
        if (err) {
            return handleError(err);
        } else {
            res.status(201).json({
                success: true,
                message: 'OK'
            })
        }

    });
})

// EDIT

router.put('/account/:id', (req, res) => {
    console.log(req.body.email);

    let userId = req.params.id;
    let newUser = {
        email: req.body.email,
        password: req.body.password
    }
    User.findOneAndUpdate({
        _id: userId
    }, newUser, function (err, ) {
        if (err) {
            res.send(err);
        } else {
            res.status(201).json({
                success: true,
                message: 'OK'
            })
        }
    })
});

// ARTS

router.get('/arts', (req, res) => {

    Art.find((error, art) => {
        if (error) res.send(error);
        res.json(art);
    })
})

router.get('/myArts', (req, res) => {
    let id = req.get('userId');
    console.log(id);
    Art.find({
        userId: id
    }, (error, arts) => {
        if (error) return (error);
        console.log(arts);
        res.json(arts);
    })
})

// // ARTWORK
// update picture
router.post("/artwork/file/:id", (req, res) => {


    Art.findOne({_id:req.params.id}, (error, art) => {

        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            console.log(files.files.path);
            
            var oldpath = files.files.path;
            console.log(oldpath);
            
            var newpath = "/Users/juliecervera/Desktop/creart/public/" + files.files.name;
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                res.write('File uploaded and moved!');
                res.end();

                art.picture_path = newpath;

                console.log(art);
                art.save(function (error, newArtwork) {
                    if (error) {
                        res.status(400);
                    } else {
                        res.status(201).json({
                            success: true,
                            message: 'OK',
                            artwork: newArtwork
                        })
                    }
                })

            });

        })
     


    })
});


router.post('/artwork', (req, res) => {
    console.log('add new artwork' + req.body)

    let newArtwork = new Art(req.body);

    newArtwork.save(function (error, newArtwork) {
        if (error) {
            res.status(400);
        } else {
            res.status(201).json({
                success: true,
                message: 'OK',
                artwork: newArtwork
            })
        }
    })

})

// ARTWORK DETAILS

router.get('/details', (req, res) => {
    let id = req.get('artId');
    console.log(id);
    Art.findOne({
        _id: id
    }, (error, arts) => {
        if (error) return (error);
        console.log(arts);
        res.json(arts);
    })
})

router.delete('/details', (req, res) => {
    let id = req.get('artId');
    console.log(id);
    Art.deleteOne({
        _id: id
    }, (error, arts) => {
        if (error) return (error);
        console.log(arts);
    })
})






module.exports = router;