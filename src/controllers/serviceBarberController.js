import { query } from "express";
import serviceBarberService from "../services/serviceBarberService";
let createServiceBarber = async (req, res) => {
  try {
    let infor = await serviceBarberService.createServiceBarber(req.body);
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the sever",
    });
  }
};
let getAllServiceBarber = async (req, res) => {
  try {
    let infor = await serviceBarberService.getAllServiceBarber();
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the sever",
    });
  }
};
let getDetailServiceBarberById = async (req, res) => {
  try {
    let infor = await serviceBarberService.getDetailServiceBarberById(
      req.query.id,
      req.query.location
    );
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the sever",
    });
  }
};
let handleEditServiceBarber = async (req, res) => {
  let data = req.body;
  let message = await serviceBarberService.updateServiceBarberData(data);
  return res.status(200).json(message);
};
let handleDeleteServiceBarber = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required !",
    });
  }
  let message = await serviceBarberService.deleteServiceBarber(req.body.id);
  return res.status(200).json(message);
};
module.exports = {
  createServiceBarber: createServiceBarber,
  getAllServiceBarber: getAllServiceBarber,
  getDetailServiceBarberById: getDetailServiceBarberById,
  handleEditServiceBarber: handleEditServiceBarber,
  handleDeleteServiceBarber: handleDeleteServiceBarber,
};
