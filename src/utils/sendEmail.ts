import Handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import fs from 'node:fs';
import path from 'node:path';

type emailTemplateName = 'welcome' | 'passwordChanged' | 'resetPassword';

export async function sendEmail(
  email: string,
  subject: string,
  payload: object,
  templateName: emailTemplateName,
) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  transporter.verify((error, success) => {
    if (error) {
      console.error('Transporter verification failed:', error);
    } else {
      console.log('Server is ready to send emails:', success);
    }
  });
  const source = fs.readFileSync(
    path.resolve(__dirname, '..', '..', 'templates', `${templateName}.hbs`),
    'utf-8',
  );
  const template = Handlebars.compile(source);
  const options = () => ({
    from: `"GSafra" <${process.env.EMAIL_USERNAME}>`,
    to: email,
    subject,
    html: template(payload),
  });

  transporter.sendMail(options(), (error) => {
    if (error) {
      console.log(error)
      console.log('Erro ao enviar o e-mail');
      return error;
    }
  });
}
