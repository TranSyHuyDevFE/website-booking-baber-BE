const db = require("../models");

let createServiceBarber = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkDown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        await db.Service.create({
          name: data.name,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkDown: data.descriptionMarkDown,
        });
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
let getAllServiceBarber = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Service.findAll({});
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errCode: 0,
        errMessage: "Ok",
        data,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getDetailServiceBarberById = (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId || !location) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let data = await db.Service.findOne({
          where: { id: inputId },
          attributes: ["descriptionHTML", "descriptionMarkDown"],
        });
        if (data) {
          let barberService = [];
          if (location === "ALL") {
            barberService = await db.Barber_Infor.findAll({
              where: { serviceId: inputId },
              attributes: ["barberId", "provinceId"],
            });
          } else {
            barberService = await db.Barber_Infor.findAll({
              where: { serviceId: inputId, provinceId: location },
              attributes: ["barberId", "provinceId"],
            });
          }
          data.barberService = barberService;
        } else data = {};
        resolve({
          errCode: 0,
          errMessage: "Ok",
          data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let updateServiceBarberData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.name || !data.descriptionHTML) {
        resolve({
          errCode: 2,
          errMessage: "Missing required",
        });
      }
      let serviceData = await db.Service.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (serviceData) {
        serviceData.name = data.name;
        serviceData.descriptionHTML = data.descriptionHTML;
        serviceData.image = data.imageBase64;
        await serviceData.save();
        resolve({
          errCode: 0,
          message: "Update the user success",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "User not found!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let deleteServiceBarber = (inputId) => {
  return new Promise(async (resolve, reject) => {
    let serviceData = await db.Service.findOne({
      where: { id: inputId },
    });
    if (!serviceData) {
      resolve({ errCode: 2, errMessage: "The Service is not exist" });
    }
    await db.Service.destroy({
      where: { id: inputId },
    });
    resolve({
      errCode: "0",
      message: `The Service is deleted`,
    });
  });
};
module.exports = {
  createServiceBarber: createServiceBarber,
  getAllServiceBarber: getAllServiceBarber,
  getDetailServiceBarberById: getDetailServiceBarberById,
  updateServiceBarberData: updateServiceBarberData,
  deleteServiceBarber: deleteServiceBarber,
};
