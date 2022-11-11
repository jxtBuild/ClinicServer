const sendEmail = require('./sendEmail');

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
}) => {
 // const verifyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;
//
  //const message = `<p>Please confirm your email by clicking on the following link : 
  //<a href="${verificationToken}">Verify Email</a> </p>`;
//
  return sendEmail({
    to: email,
    subject: 'Email Confirmation',
    html: `<h4> Hello, ${name}</h4>
    This is your OTP ${verificationToken} 
    `,
  });
};

module.exports = sendVerificationEmail;