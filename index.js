var http = require('http');
http.createServer(function (req, res) {
    console.log(`Just got a request at ${req.url}!`)
    let today = new Date();
    let thisYear = today.getFullYear().toString();
    let thisDay = today.toISOString().split("T")[0].split("-").reverse().join("");
    if (thisDay.charAt(0) == '0') {
        thisDay = thisDay.substr(1);
    }
    console.log("Today: "+ thisDay);
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
                <img src="cid:unique@nodemailer.com"/>
            </body>
        </html>`,
        attachments: [{
                filename: "image.jpg",
                path: "https://www.tamildailycalendar.com/" + thisYear + "/" + thisDay + ".jpg",
                cid: "unique@nodemailer.com"
            }
        ]
    };
    console.log("process.env.SENDER_NAME: "+ process.env.SENDER_NAME);
	console.log("process.env.RECEIVERS: "+ process.env.RECEIVERS);
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
    console.log("process.env.AUTH_USR: "+ process.env.AUTH_USR);
	console.log("process.env.AUTH_PASS: "+ process.env.AUTH_PASS);
    // Send the email
	
try{
	console.log("transporter >>> starting..");
    transporter.sendMail(email, (error, info) => {
	    console.log("transporter >>> inside..");
        if (error) {
            console.log(error);
			res.write('Oh!');
		res.end();
        } else {
            console.log("Email sent: " + info.response);
			res.write('Yo!');
		res.end();
        }
    });
}catch(e){
	console.log("transporter >>> Error: "+ e);
}
	res.write('Yoy!');
    res.end();
}).listen(process.env.PORT || 3000);
