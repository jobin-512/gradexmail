const express = require('express')
const nodemailer = require("nodemailer");
const dotenv = require("dotenv")
var cors = require('cors')

const app = express()
const port = 4000

dotenv.config()

const corsOptions = {
    origin: '*', // Allow only requests from this origin
    methods: 'GET,POST', // Allow only these methods
};

app.use(express.json());

app.use(cors(corsOptions));




const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.MAIL,
      pass:process.env.PASS,
    },
  });


  app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
  })


app.post('/',(req, res) => {
    const {email,name,company,address,info, city,service} = req.body;
    main(email,name,company,address,info, city,service);
    res.send("Request Sent Successfully!!"); 
})
  


async function main(email,name,company,address,info, city,service) {
  const info1 = await transporter.sendMail({
    from: '"Enquirey Form"', // sender address
    to: "operations@gradexcommercial.com.au", // list of receivers
    subject: "Enquirey", // Subject line
    html: `
    <p>Enquirey Form Details</p>
    <p><b>Name:</b> ${name}</p>
    <p><b>email:</b> ${email}</p>
    <p><b>company:</b> ${company}</p>
    <p><b>address:</b> ${address}</p>
    <p><b>city:</b> ${city}</p>
    <p><b>service:</b> ${service}</p>
    <p><b>message:</b> ${info}</p>
    `,
  });

}
