const sgMail = require('@sendgrid/mail');




const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'henrymac16@gmail.com',
    subject: 'Welcome to the app!',
    text: `Welcome to the application, ${name}`
  })
}

//maybe add purchase email
const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'henrymac16@gmail.com',
    subject: 'Account Cancel',
    text: `I am sorry to see you leave ${name}. Is there anything we can do to improve our service?`
  })
}
// sgMail.send({
//   to: 'henrymac16@gmail.com',
//   from: 'henrymac16@gmail.com',
//   subject: 'first email',
//   text: 'some text!'
// });

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail
}
