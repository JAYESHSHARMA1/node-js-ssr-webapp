const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',

  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS
  }
});



module.exports = (to,subject,html)=>{
    return new Promise((resolve,reject) =>{

    try {
        const mailOptions = {
            from: `Crick Stocker <${process.env.NODEMAILER_EMAIL}>`,
            to: to,
            subject: subject,
            html:html
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              resolve(false);
            } else {
              console.log('Email sent: ' + info.response);
              resolve(true);

            }
          });
    } catch (error) {
        console.log('Email sent: ' + info.response);
        resolve(false);        
    }
})

}
