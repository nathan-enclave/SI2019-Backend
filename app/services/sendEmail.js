const nodemailer = require('nodemailer');
const Boom = require('boom');

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
        //   text: content,
        html: content
      });
      return `Email have send to ${email}`;
    } catch (error) {
      throw Boom.forbidden(error);
    }
  }
}
module.exports = new Email();
