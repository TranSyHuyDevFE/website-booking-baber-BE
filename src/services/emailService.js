require("dotenv").config();
const { result } = require("lodash");
const nodemailer = require("nodemailer");
let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Shop Barber 2style 👻" <syhuy0107@gmail.com>', // sender address
    to: dataSend.receiveEmail, // list of receivers
    subject: "Thông tin đặt lịch cắt tóc tại 2Style Barber", // Subject line
    html: getBodyHTMLEmail(dataSend),
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result = ``;
  if (dataSend.language === "vi") {
    result = `<h3>Xin chào ${dataSend.customerName}</h3>
      <h3>Thông tin đặt lịch của bạn:</h3>
      <h4>Thời gian: ${dataSend.time}</h4>
      <h4>Thợ: ${dataSend.barberName}</h4>
     <a href=${dataSend.redirectLink} target="_blank">Ấn vào đây để xác nhận!</a>
      <h4>Bạn đã đặt lịch thành công, Chúc bạn có trải nghiệm thú vị</h4>
      <h5>Mọi thông tin liên hệ : +(84)2827828337 Sỹ Huy</h5>`;
  }
  if (dataSend.language === "en") {
    result = `<h3>Dear ${dataSend.customerName}</h3>
      <h3>Your booking information:</h3>
      <h4>Time: ${dataSend.time}</h4>
      <h4>Barber: ${dataSend.barberName}</h4>
     <a href=${dataSend.redirectLink} target="_blank">Click here to accept!</a>
      <h4>You have successfully booked your appointment, Wish you have a pleasant experience</h4>
      <h5>All contact information : +(84)2827828337 Sy Huy</h5>`;
  }
  return result;
};
let getBodyHTMLEmailThanksEmail = (dataSend) => {
  let result = ``;
  if (dataSend.language === "vi") {
    result = `<h3>Xin chào ${dataSend.customerName} !</h3>
    <h4>Cảm ơn bạn đã đến Shop Barber và đã trải nghiệm dịch vụ bên chúng tôi ! Hẹn gặp lại bạn lần sau.</h4>
 
      <h5>Mọi thông tin liên hệ : +(84)2827828337 Sỹ Huy</h5>`;
  }
  if (dataSend.language === "en") {
    result = `
      <h5>All contact information : +(84)2827828337 Sy Huy</h5>`;
  }
  return result;
};
let sendAttachments = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Shop Barber 2style 👻" <syhuy0107@gmail.com>', // sender address
    to: dataSend.email, // list of receivers
    subject: "Thư cảm ơn.", // Subject line
    html: getBodyHTMLEmailThanksEmail(dataSend),
  });
};
module.exports = {
  sendSimpleEmail: sendSimpleEmail,
  sendAttachments: sendAttachments,
};
