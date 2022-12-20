import branchingService from "../services/branchingService";
let createBranching = async (req, res) => {
  try {
    let infor = await branchingService.createBranching(req.body);
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the sever",
    });
  }
};
let getAllBranching = async (req, res) => {
  try {
    let infor = await branchingService.getAllBranching();
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the sever",
    });
  }
};
let getDetailBranchingById = async (req, res) => {
  try {
    let infor = await branchingService.getDetailBranchingById(req.query.id);
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the sever",
    });
  }
};
let handleEditBranching = async (req, res) => {
  let data = req.body;
  let message = await branchingService.updateBranching(data);
  return res.status(200).json(message);
};
let handleDeleteBranching = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required !",
    });
  }
  let message = await branchingService.deleteBranching(req.body.id);
  return res.status(200).json(message);
};
module.exports = {
  createBranching: createBranching,
  getAllBranching: getAllBranching,
  getDetailBranchingById: getDetailBranchingById,
  handleEditBranching: handleEditBranching,
  handleDeleteBranching: handleDeleteBranching,
};
