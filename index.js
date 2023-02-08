var http = require('http');
http.createServer(function (req, res) {

    console.log(`Just got a request at ${req.url}!`)
	
	if(req.url != "/cal"){
		res.write('Tata!');
		res.end();
		return;
	}

    let today = new Date();
    let thisYear = today.getFullYear().toString();
    let thisDay = today.toISOString().split("T")[0].split("-").reverse().join("");
    if (thisDay.charAt(0) == '0') {
        thisDay = thisDay.substr(1);
    }

    const nodemailer = require("nodemailer");
    const request = require("request");


    const email = {
        from: process.env.SENDER_NAME,
        to: process.env.RECEIVERS,
        subject: today.toISOString().split("T")[0].split("-").reverse().join("-"),
        html: `<html>
            <body>
	    	Vanakkam!
            </body>
        </html>`,
        attachments: []
    };


    const transporter = nodemailer.createTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.AUTH_USR,
            pass: process.env.AUTH_PASS
        }
    });


    try {
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log('Server is ready to take our messages');
                transporter.sendMail(email, function (error, success) {
                    if (error) {
                        console.log("Error");
                        console.log(error);
                        res.write('Oh!');
			res.end();
                    } else {
                        console.log("Success");
                        console.log("Email sent: " + success.response);
                        res.write('Yo!');
			res.end();
                    }
                });
            }
        });
    } catch (e) {
        console.log("transporter >>> Error: " + e);
    }	
}).listen(process.env.PORT || 3000);
