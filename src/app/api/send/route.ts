import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';


export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    console.log(body)
    // const nodemailer = require('nodemailer')

    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.NEXT_PUBLIC_MAIL_USERNAME,
        pass: process.env.NEXT_PUBLIC_MAIL_PASSWORD,
      },
      secure: true,
    })

    const mailData = {
      from: `${body.firstName} ${body.lastName} <${body.email}>`,
      to: 'brunoborges2001@gmail.com',
      subject: `Message From ${body.firstName} ${body.lastName} - ${body.subject}`,
      text: `${body.firstName} ${body.lastName} <${body.email}> said: ${body.content}`,
    }


    transporter.sendMail(mailData, (err, info) => {
      if (err)
        console.log(err)
      else
        console.log(info)
    })

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error });
  }
}