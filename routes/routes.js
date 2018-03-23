var sendMailFunction = require('../functions/send-mail');
var registerUserFunction = require('../functions/register-user');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var fs = require('fs');
var mongoose = require('mongoose');
var FCM = require('fcm-node');
var serverKey = 'AAAAsWWMVx4:APA91bGCBqW81IfLhBboZ88q7iUW7yWSMP6z2Td_7Qz2AzCotRo-RiLOENTuaf8_YhvVztGwqYWqiexIiG7JKONzuFXItLqM-M-d967lu6MTbxMDld7uilFIQPF9LSGnTXVRBUw-XN-v';
var fcm = new FCM(serverKey);
mongoose.Promise = require('bluebird');

module.exports = function(app){
//home function
app.get('/', function(req, res){
    res.send('Welcome to our server :)');
});

app.get('/gcm', function(req, res){

    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: 'd7or8R7pd9M:APA91bFWCajocXVZbw-d_n9oZrZOiZldUlK-HxWJ3eL_oASwGAfJ8QQEn-FYNezgkhhzPn-_DI2AeoZaFZAURVtlk6QnetSdfhUfB8vkRWxRhL6l0Q1hq9kpmrqJRtJSD6e5f0P2janw',
        data: {  //you can send only notification or only data(or include both)
            title: 'my value',
            body: 'my another value'
        }
    };

        fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!", err);
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });

    res.json(message);
});

app.post('/sendImage' , function(req, res)
{
    console.log("hi");
    var bytes = req.body.bytes;
    var order = req.body.order;

    var bitmap = new Buffer(bytes, 'base64');
    fs.writeFileSync("../eshop/images/tooth.jpg", bitmap);
    var img = require("fs").readFileSync("../eshop/images/tooth.jpg");

    sendMailFunction.sendMail(order, img, function(result){
        res.json(result);
    });
});

//get to send mail
app.post('/sendOrder', function(req, res){
    //getMessage
    var order = req.body.order;
    console.log("eeee");

});

app.post('/registerUser', function(req, res){
    var name = req.body.name;
    var mobile = req.body.mobile;
    var email = req.body.email;
    var address = req.body.address;

    registerUserFunction.addUser(name, mobile, email, address, function(result){
        res.json(result);
    });
});

}