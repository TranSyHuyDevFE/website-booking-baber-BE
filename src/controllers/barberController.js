import barberService from "../services/barberService";
let getTopBarberHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let response = await barberService.getTopBarberHome(+limit);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from sever...",
    });
  }
};
let getAllBarbers = async (req, res) => {
  try {
    let barbers = await barberService.getAllBarbers();
    return res.status(200).json(barbers);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let postInforBarber = async (req, res) => {
  try {
    let barbersResponse = await barberService.saveDetailInforBarber(req.body);
    return res.status(200).json(barbersResponse);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let getDetailBarberById = async (req, res) => {
  try {
    let infor = await barberService.getDetailBarberById(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the sever",
    });
  }
};
let bulkCreateSchedule = async (req, res) => {
  try {
    let infor = await barberService.bulkCreateSchedule(req.body);
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the sever",
    });
  }
};
let getScheduleByDate = async (req, res) => {
  try {
    let infor = await barberService.getScheduleByDate(
      req.query.barberId,
      req.query.date
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
let getExtraInforBarberById = async (req, res) => {
  try {
    let infor = await barberService.getExtraInforBarberById(req.query.barberId);
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the sever",
    });
  }
};
let getProfileBarberById = async (req, res) => {
  try {
    let infor = await barberService.getProfileBarberById(req.query.barberId);
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the sever",
    });
  }
};
let getListCustomerForBarber = async (req, res) => {
  try {
    let infor = await barberService.getListCustomerForBarber(
      req.query.barberId,
      req.query.date
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
let getListCustomerHistoryForBarber = async (req, res) => {
  try {
    let infor = await barberService.getListCustomerHistoryForBarber(
      req.query.barberId,
      req.query.date
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

let sendThanksEmail = async (req, res) => {
  try {
    let infor = await barberService.sendThanksEmail(req.body);
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the sever",
    });
  }
};
module.exports = {
  getTopBarberHome: getTopBarberHome,
  getAllBarbers: getAllBarbers,
  postInforBarber: postInforBarber,
  getDetailBarberById: getDetailBarberById,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
  getExtraInforBarberById: getExtraInforBarberById,
  getProfileBarberById: getProfileBarberById,
  getListCustomerForBarber: getListCustomerForBarber,
  getListCustomerHistoryForBarber: getListCustomerHistoryForBarber,
  sendThanksEmail: sendThanksEmail,
};
