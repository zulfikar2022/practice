import nodemailer from 'nodemailer';
import config from '../config';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: config.node_env === 'production' ? true : false, // true for port 465, false for other ports
  auth: {
    user: 'sayedzulfikar2019@gmail.com',
    pass: config.app_password,
  },
});

export const sendEmail = async (
  receiver: string | string[],
  subject: string,
  text: string,
  html: string,
) => {
  console.log('inside the sendEmail function');
  try {
    const mailSent = await transporter.sendMail({
      from: '"Sayed Zulfikar Mahmud 👻" <sayedzulfikar2019@gmail.email>', // sender address
      to: receiver, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });
  } catch (error) {
    console.log('Error while sending the email', error);
  }
};
