import db from "../models/index";
require("dotenv").config();
import emailService from "./emailService";
import { v1 as uuidv1 } from "uuid";
import { reject } from "lodash";
let buildUrlEmail = (barberId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&barberId=${barberId}`;
  return result;
};
let postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.barberId ||
        !data.timeType ||
        !data.date ||
        !data.fullName ||
        !data.phoneNumber
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let token = uuidv1();
        await emailService.sendSimpleEmail({
          receiveEmail: data.email,
          customerName: data.fullName,
          time: data.timeString,
          barberName: data.barberName,
          language: data.language,
          redirectLink: buildUrlEmail(data.barberId, token),
        });
        //upsert customer
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            phonenumber: data.phoneNumber,
            address: data.address,
            firstName: data.fullName,
            gender: data.selectedGender,
            roleId: "R3",
            positionId: "P0",
          },
        });
        //create a booking
        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: { customerId: user[0].id },
            defaults: {
              statusId: "S1",
              barberId: data.barberId,
              customerId: user[0].id,
              date: data.date,
              timeType: data.timeType,
              token: token,
            },
          });
        }

        resolve({
          errCode: 0,
          errMessage: "Save information customer succeed",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let postVerifyBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.barberId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            barberId: data.barberId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });

        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();
          resolve({
            errCode: 0,
            errMessage: "Update the appointment succeed",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Appointment has been activated or does not exist",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  postBookAppointment: postBookAppointment,
  postVerifyBookAppointment: postVerifyBookAppointment,
};
