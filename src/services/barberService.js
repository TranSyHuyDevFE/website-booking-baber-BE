import db from "../models/index";
require("dotenv").config();
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
import _, { reject } from "lodash";
import emailService from "../services/emailService";
let getTopBarberHome = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        limit: limitInput,
        where: { roleId: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: users,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getAllBarbers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let barbers = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password", "image"],
        },
      });
      resolve({
        errCode: 0,
        data: barbers,
      });
    } catch (e) {
      reject(e);
    }
  });
};

//check required fields
let checkRequiredFields = (inputData) => {
  let arrFields = [
    "barberId",
    "contentHTML",
    "contentMarkdown",
    "action",
    "selectedPrice",
    "selectedPayment",
    "selectedProvince",
    "nameBranch",
    "addressBranch",
    "note",
    "serviceId",
  ];
  let isValid = true;
  let element = "";
  for (let i = 0; i < arrFields.length; i++) {
    if (!inputData[arrFields[i]]) {
      isValid = false;
      element = arrFields[i];
      break;
    }
  }
  return {
    isValid: isValid,
    element: element,
  };
};

let saveDetailInforBarber = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkObj = checkRequiredFields(inputData);
      if (checkObj.isValid === false) {
        resolve({
          errCode: 1,
          errMessage: `Missing parameter: ${checkObj.element}`,
        });
      } else {
        //upsert to Markdown
        if (inputData.action === "CREATE") {
          await db.Markdown.create({
            contentHTML: inputData.contentHTML,
            contentMarkdown: inputData.contentMarkdown,
            description: inputData.description,
            barberId: inputData.barberId,
          });
        } else if (inputData.action === "EDIT") {
          let barberMarkdown = await db.Markdown.findOne({
            where: { barberId: inputData.barberId },
            raw: false,
          });
          if (barberMarkdown) {
            barberMarkdown.contentHTML = inputData.contentHTML;
            barberMarkdown.contentMarkdown = inputData.contentMarkdown;
            barberMarkdown.description = inputData.description;
            barberMarkdown.barberId = inputData.barberId;
            barberMarkdown.updateAt = new Date();
            await barberMarkdown.save();
          }
        }

        //upsert to Barber_infor table
        let barberInfor = await db.Barber_Infor.findOne({
          where: {
            barberId: inputData.barberId,
          },
          raw: false,
        });
        if (barberInfor) {
          //update
          barberInfor.barberId = inputData.barberId;
          barberInfor.priceId = inputData.selectedPrice;
          barberInfor.provinceId = inputData.selectedProvince;
          barberInfor.paymentId = inputData.selectedPayment;
          barberInfor.addressBranch = inputData.addressBranch;
          barberInfor.nameBranch = inputData.nameBranch;
          barberInfor.note = inputData.note;
          barberInfor.serviceId = inputData.serviceId;
          barberInfor.branchId = inputData.branchId;
          await barberInfor.save();
        } else {
          //create
          await db.Barber_Infor.create({
            barberId: inputData.barberId,
            priceId: inputData.selectedPrice,
            provinceId: inputData.selectedProvince,
            paymentId: inputData.selectedPayment,
            addressBranch: inputData.addressBranch,
            nameBranch: inputData.nameBranch,
            note: inputData.note,
            serviceId: inputData.serviceId,
            branchId: inputData.branchId,
          });
        }
        resolve({
          errCode: 0,
          errMessage: "Save infor barber succeed",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getDetailBarberById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let data = await db.User.findOne({
          where: {
            id: inputId,
          },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Barber_Infor,
              attributes: {
                exclude: ["id", "barberId"],
              },
              include: [
                {
                  model: db.Allcode,
                  as: "priceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "provinceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "paymentTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
          ],
          raw: false,
          nest: true,
        });
        if (data && data.image) {
          data.image = Buffer.from(data.image, "base64").toString("binary");
        }
        if (!data) data = {};
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let bulkCreateSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.arrSchedule || !data.barberId || !data.formatedDate) {
        resolve({
          errCode: 1,
          errMessage: "Missing required param !",
        });
      } else {
        let schedule = data.arrSchedule;
        if (schedule && schedule.length > 0) {
          schedule = schedule.map((item) => {
            item.maxNumber = MAX_NUMBER_SCHEDULE;
            return item;
          });
        }
        //get all existing data
        let existing = await db.Schedule.findAll({
          where: { barberId: data.barberId, date: data.formatedDate },
          attributes: ["timeType", "date", "barberId", "maxNumber"],
          raw: true,
        });
        //compare different
        let toCreate = _.differenceWith(schedule, existing, (a, b) => {
          return a.timeType === b.timeType && +a.date === +b.date;
        });
        //create data
        if (toCreate && toCreate.length > 0) {
          await db.Schedule.bulkCreate(toCreate);
        }
        resolve({
          errCode: 0,
          errMessage: "Ok",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getScheduleByDate = (barberId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!barberId || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let dataSchedule = await db.Schedule.findAll({
          where: {
            barberId: barberId,
            date: date,
          },

          include: [
            {
              model: db.Allcode,
              as: "timeTypeData",
              attributes: ["valueEn", "valueVi"],
            },

            {
              model: db.User,
              as: "barberData",
              attributes: ["firstName", "lastName"],
            },
          ],
          raw: false,
          nest: true,
        });
        if (!dataSchedule) {
          dataSchedule = [];
        }
        resolve({
          errCode: 0,
          data: dataSchedule,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getExtraInforBarberById = (idInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!idInput) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = await db.Barber_Infor.findOne({
          where: {
            barberId: idInput,
          },
          attributes: {
            exclude: ["id", "barberId"],
          },
          include: [
            {
              model: db.Allcode,
              as: "priceTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "provinceTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "paymentTypeData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });
        if (!data) data = {};
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getProfileBarberById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = await db.User.findOne({
          where: {
            id: inputId,
          },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Barber_Infor,
              attributes: {
                exclude: ["id", "barberId"],
              },
              include: [
                {
                  model: db.Allcode,
                  as: "priceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "provinceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "paymentTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
          ],
          raw: false,
          nest: true,
        });
        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }
        if (!data) data = {};
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getListCustomerForBarber = (barberId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!barberId || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = await db.Booking.findAll({
          where: {
            statusId: "S2",
            barberId: barberId,
            date: date,
          },
          include: [
            {
              model: db.User,
              as: "customerData",
              attributes: [
                "email",
                "firstName",
                "address",
                "gender",
                "phonenumber",
              ],
              include: [
                {
                  model: db.Allcode,
                  as: "genderData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
            {
              model: db.Allcode,
              as: "timeTypeDataCustomer",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });

        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getListCustomerHistoryForBarber = (barberId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!barberId || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = await db.Booking.findAll({
          where: {
            statusId: "S3",
            barberId: barberId,
            date: date,
          },
          include: [
            {
              model: db.User,
              as: "customerData",
              attributes: [
                "email",
                "firstName",
                "address",
                "gender",
                "phonenumber",
              ],
              include: [
                {
                  model: db.Allcode,
                  as: "genderData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
            {
              model: db.Allcode,
              as: "timeTypeDataCustomer",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });

        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let sendThanksEmail = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.barberId || !data.email || !data.customerId || !data.timeType) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        //update status customer
        let appointment = await db.Booking.findOne({
          where: {
            barberId: data.barberId,
            customerId: data.customerId,
            timeType: data.timeType,
            statusId: "S2",
          },
          raw: false,
        });
        if (appointment) {
          appointment.statusId = "S3";
          await appointment.save();
        }

        //send email thanks

        await emailService.sendAttachments(data);
        resolve({
          errCode: 0,
          errMessage: "ok",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getTopBarberHome: getTopBarberHome,
  getAllBarbers: getAllBarbers,
  saveDetailInforBarber: saveDetailInforBarber,
  getDetailBarberById: getDetailBarberById,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
  getExtraInforBarberById: getExtraInforBarberById,
  getProfileBarberById: getProfileBarberById,
  getListCustomerForBarber: getListCustomerForBarber,
  getListCustomerHistoryForBarber: getListCustomerHistoryForBarber,
  sendThanksEmail: sendThanksEmail,
};
