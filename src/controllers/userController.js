import userService from "../services/userService";
let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  //check email exist
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }
  let userData = await userService.handleUserLogin(email, password);
  // compare password
  // return userInfor
  // access_TOKEN: jwt web json
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};
let handleGetAllUsers = async (req, res) => {
  let id = req.query.id; // ALL, id
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      users: [],
    });
  }
  let users = await userService.getAllUsers(id);
  console.log(users);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    users,
  });
};
let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  console.log(message);
  return res.status(200).json(message);
};
let handleDeleteNewUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required !",
    });
  }
  let message = await userService.deleteUser(req.body.id);
  console.log(message);
  return res.status(200).json(message);
};
let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUserData(data);
  return res.status(200).json(message);
};
let getAllCode = async (req, res) => {
  try {
    let data = await userService.getAllCodeService(req.query.type);
    return res.status(200).json(data);
  } catch (e) {
    console.log("Get All Code Error");
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error form sever",
    });
  }
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteNewUser: handleDeleteNewUser,
  getAllCode: getAllCode,
};
