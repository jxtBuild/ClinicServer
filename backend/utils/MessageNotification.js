const sendEmail = require('./sendEmail');

const sendMessageNotification = async ({
  name,
  email,
  date,
}) => {
  
  return sendEmail({
    to: email,
    subject: 'Email Confirmation',
    html: `<h4> Hello, ${name}</h4>
     You cancelled your appointment scheduled
     on ${date}
    `,
  });
};

module.exports = sendMessageNotification;