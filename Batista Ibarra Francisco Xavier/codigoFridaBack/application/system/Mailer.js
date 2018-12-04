import { createTransport } from 'nodemailer';

var transporter = createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: ''
  }
});

/**
 * @function mailer
 * @param {string} destinatario - Los destinatarios del correo
 * @param {string} asunto - El asunto del correo
 * @param {string} cuerpo - El cuerpo del correo, sólo detecta texto plano
 */
function mailer(destinatario, asunto, cuerpo) {
    return new Promise((resolve, reject) => {
        transporter.sendMail({
            from: '',
            to: destinatario, 
            subjetct: asunto, 
            text: cuerpo
        }).then(() => {
            resolve();
        }).catch(err => {
            console.error(err);
            reject(err);
        })
    })
}

export default mailer;