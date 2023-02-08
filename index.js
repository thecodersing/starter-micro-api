var http = require('http');
http.createServer(function (req, res) {

    console.log(`Just got a request at ${req.url}!`)

    let today = new Date();
    let thisYear = today.getFullYear().toString();
    let thisDay = today.toISOString().split("T")[0].split("-").reverse().join("");
    if (thisDay.charAt(0) == '0') {
        thisDay = thisDay.substr(1);
    }

    const nodemailer = require("nodemailer");
    const request = require("request");

    // Define the email details
    const email = {
        from: process.env.SENDER_NAME,
        to: process.env.RECEIVERS,
        subject: "Calander " + today.toString(),
        html: `<html>
            <body>
		<h3>Good Morning!</h3>
            </body>
        </html>`,
        attachments: [
        ]
    };

    // Create a transport object to send emails
    const transporter = nodemailer.createTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.AUTH_USR,
            pass: process.env.AUTH_PASS
        }
    });

    // Send the email
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
                    } else {
                        console.log("Success");
                        console.log("Email sent: " + success.response);
                        res.write('Yo!');
                    }
                });
            }
        });
    } catch (e) {
        console.log("transporter >>> Error: " + e);
    }
    res.write('Yoy!');
    res.end();
}).listen(process.env.PORT || 3000);
