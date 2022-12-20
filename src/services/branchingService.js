const db = require("../models");
import { reject } from "lodash";
let createBranching = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.address ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkDown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        await db.Branch_working.create({
          name: data.name,
          address: data.address,
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
let getAllBranching = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Branch_working.findAll({});
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
      reject(e);
    }
  });
};
let getDetailBranchingById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let data = await db.Branch_working.findOne({
          where: { id: inputId },
          attributes: [
            "name",
            "address",
            "descriptionHTML",
            "descriptionMarkDown",
          ],
        });
        if (data) {
          let barberBranching = [];
          barberBranching = await db.Barber_Infor.findAll({
            where: { branchId: inputId },
            attributes: ["barberId", "provinceId"],
          });
          data.barberBranching = barberBranching;
        } else data = {};
        resolve({
          errCode: 0,
          errMessage: "Ok",
          data,
        });
      }
    } catch (error) {
      reject(e);
    }
  });
};
let updateBranching = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.name || !data.descriptionHTML || !data.address) {
        resolve({
          errCode: 2,
          errMessage: "Missing required",
        });
      }
      let branchingData = await db.Branch_working.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (branchingData) {
        branchingData.name = data.name;
        branchingData.address = data.address;
        branchingData.descriptionHTML = data.descriptionHTML;
        branchingData.image = data.imageBase64;
        await branchingData.save();
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
let deleteBranching = (inputId) => {
  return new Promise(async (resolve, reject) => {
    let branchingData = await db.Branch_working.findOne({
      where: { id: inputId },
    });
    if (!branchingData) {
      resolve({ errCode: 2, errMessage: "The Branch_working is not exist" });
    }
    await db.Branch_working.destroy({
      where: { id: inputId },
    });
    resolve({
      errCode: "0",
      message: `The Branch_working is deleted`,
    });
  });
};
module.exports = {
  createBranching: createBranching,
  getAllBranching: getAllBranching,
  getDetailBranchingById: getDetailBranchingById,
  updateBranching: updateBranching,
  deleteBranching: deleteBranching,
};
