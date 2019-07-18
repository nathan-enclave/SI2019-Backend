const nodemailer = require('nodemailer');
// khai báo sử dụng module nodemailer
class Email {
  async sendEmail(email, title, content) {
    try {
      const transporter = await nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: 'adsystemenclave@gmail.com',
          pass: 'chicong99'
        }
      });
      await transporter.sendMail({
        from: 'Software engineer manager system',
        to: email,
        subject: title,
        text: content
      });
      // console.log('Message sent: %s', info.messageId);
      // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
      // console.log(error);
    }
  }
}
module.exports = new Email();
