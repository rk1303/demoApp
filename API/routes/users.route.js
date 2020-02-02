const express = require('express');
const app = express();
const userRoutes = express.Router();

// Require Users model in our routes module
let Users = require('../models/Users');
// Defined get data(index or listing) route
userRoutes.route('/').get(function (req, res) {
    Users.find(function (err, user){
        if(err){
            console.log(err);
        }
        else {
            res.json(user);
        }
    });
});

userRoutes.route('/add').post(function (req, res) {
    console.log('Hi');
    let users = new Users(req.body);

    users.save()
        .then(users => {
            res.status(200).json({'users': 'users is added succesfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
    });


    userRoutes.route('/edit/:id').get(function (req, res) {

        //console.log('hi');
        let id = req.params.id;
        Users.findById(id, function (err, user){
            res.json(user);
        });
    });

    userRoutes.route('/update/:id').post(function (req, res) {
        Users.findById(req.params.id, function(err, user) {
            if (!user)
                return next(new Error('Could not laod Document'));
                else {
                    user.first_name = req.body.first_name;
                    user.last_name = req.body.last_name;
                    user.email = req.body.email;
                    user.save().then(user => {
                        res.json('Update complete');
                    })
                    .catch(err => {
                        res.status(400).send("unable to update the database");
                    });
                }
        })
    })
    
    userRoutes.route('/delete/:id').get(function (req, res) {
        console.log(req.params.id)
        Users.findByIdAndRemove({_id: req.params.id}, function(err, user){
            if(err) res.json(err);
            else res.json('Successfully removed');
        });
    });



module.exports = userRoutes;