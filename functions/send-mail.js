var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var fs = require('fs');
exports.sendMail = function(order, img ,callback){

    //authentication process
    var transporter = nodemailer.createTransport(
            {service: 'gmail',
        auth: {
        user: 'drs.dev.team@gmail.com',
        pass: 'TLdev1234'
        }
    });


    //message
    var mailOptions = {
    from: '"noReply" <noReply@gmail.com>',
    to: 'khaled.hesham.126@gmail.com',
    subject: 'New Order',
    text: '',
    html: order,
    attachments:
      [{
        filename: 'tooth.jpg',
        //content: fs.createReadStream("../eshop/images/tooth.jpg"),
        content: new Buffer(img)
      }]
    }

    //function to send email
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            callback({"Status":"Error","Message":error});
            return console.log(error);
        }
        callback({"Status":"Success","Message":"Email sent"});
        return console.log('Message sent: ' + info.response);
    });
}

