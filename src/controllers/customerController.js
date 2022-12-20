import customerService from "../services/customerService";
let postBookAppointment = async (req, res) => {
  try {
    let infor = await customerService.postBookAppointment(req.body);
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the sever",
    });
  }
};
let postVerifyBookAppointment = async (req, res) => {
  try {
    let infor = await customerService.postVerifyBookAppointment(req.body);
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
  postBookAppointment: postBookAppointment,
  postVerifyBookAppointment: postVerifyBookAppointment,
};
