import * as nodemailer from 'nodemailer';
import { Request, Response } from 'express';
import * as isemail from 'isemail';
import * as dotenv from 'dotenv';

dotenv.config();

interface resp{
  name: string;
  tell: string;
  email: string;
  name_error: string;
  tell_error: string;
  email_error: string;
  success: boolean;
}

class Emails {
  getData(req: Request, res: Response, resp?: resp) {
    resp = {
      name: String(req.body.name),
      tell: String(req.body.tell),
      email: String(req.body.email),
      name_error: '',
      tell_error: '',
      email_error: '',
      success: false,
    };

    if (!resp.name) resp.name_error = 'Campo nome está vázio!';
    if (resp.name.length < 5 || resp.name.length > 50) resp.name_error = 'Campo nome, so pode conter de 5 a 50 caracteres.';
    if (!resp.name.match(/^[&a-záàâãéèêíïóôõöúçñ0-9 ]+$/gi)) resp.name_error = 'Digite apenas letras e números.';
    if (!resp.tell) resp.tell_error = 'Campo telefone está vázio!';
    if (resp.tell.length < 10 || resp.tell.length > 13) resp.tell_error = 'Campo Telefone, so pode conter no máximo 13 caracteres.';
    if (!Number(resp.tell)) resp.tell_error = 'Digite apenas números.';
    if (!resp.email) resp.email_error = 'Campo telefone está vázio!';
    if (isemail.validate(resp.email) === false) resp.email_error = 'E-mail inválido.';

    if (resp.name_error === '' && resp.tell_error === '' && resp.email_error === '') {
      resp.success = true;
      this.mailsuccess(resp.name, resp.tell, resp.email);
    }

    return res.json(resp);
  }

  async mailsuccess(name: string, tell: string, email: string) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_GMAIL,
        pass: process.env.PASS_EMAIL_APP,
      },
    });

    await transporter.sendMail({
      from: 'no-reply@potiguarsac.com',
      to: process.env.EMAIL_GMAIL,
      subject: 'Nova solicitação de orçamento - potiguarminerais.com.br',
      text: 'Oçamento em espera.',
      html: `<main><h1>Novo pedido de orçamento</h1><p>Nome da Empresa: ${name}</p><p>Telefone da Empresa: ${tell}</p><p>E-mail da Empresa: ${email}</p></main>`,
    }).catch((err) => console.log(err));
  }
}

export default new Emails();
