var user = require('../models/user');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

exports.addUser = function(name, mobile, email, address, callback){

    //make new user
    var newUser = new user({
        name:name,
        mobile:mobile,
        email:email,
        address:address
    });

    // add user to db
    newUser.save(function(err){
        if(err){
            callback({"Status":"Error", "Message":err});
        }else{
            callback({"Status":"Success", "Message":"User Added to Database"});
        }
    });
}