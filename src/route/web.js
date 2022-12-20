import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import barberController from "../controllers/barberController";
import customerController from "../controllers/customerController";
import serviceBarberController from "../controllers/serviceBarberController";
import branchingController from "../controllers/branchingController";
let router = express.Router();
let initWebRoutes = (app) => {
  //res api
  router.get("/", homeController.getHomePage);

  router.get("/about", homeController.getAboutPage);

  router.get("/crud", homeController.getCRUD);
  //create
  router.post("/post-crud", homeController.postCRUD);
  //read
  router.get("/get-crud", homeController.displayGetCRUD);
  //edit
  router.get("/edit-crud", homeController.getEditCRUD);

  router.post("/put-crud", homeController.putCRUD);
  //delete
  router.get("/delete-crud", homeController.deleteCRUD);

  router.post("/api/login", userController.handleLogin);

  router.get("/api/get-all-users", userController.handleGetAllUsers);

  router.post("/api/create-new-user", userController.handleCreateNewUser);

  router.put("/api/edit-user", userController.handleEditUser);

  router.delete("/api/delete-user", userController.handleDeleteNewUser);

  router.get("/api/allcode", userController.getAllCode);

  router.get("/api/top-barber-home", barberController.getTopBarberHome);

  router.get("/api/get-all-barber", barberController.getAllBarbers);

  router.post("/api/save-infor-barber", barberController.postInforBarber);

  router.get(
    "/api/get-detail-barber-by-id",
    barberController.getDetailBarberById
  );
  router.post("/api/bulk-create-schedule", barberController.bulkCreateSchedule);
  router.get(
    "/api/get-schedule-barber-by-date",
    barberController.getScheduleByDate
  );
  router.post("/api/send-thanks", barberController.sendThanksEmail);
  router.get(
    "/api/get-extra-infor-barber-by-id",
    barberController.getExtraInforBarberById
  );
  router.get(
    "/api/get-profile-barber-by-id",
    barberController.getProfileBarberById
  );
  router.post(
    "/api/customer-book-appointment",
    customerController.postBookAppointment
  );
  router.post(
    "/api/verify-book-appointment",
    customerController.postVerifyBookAppointment
  );
  router.post(
    "/api/create-new-serviceBarber",
    serviceBarberController.createServiceBarber
  );
  router.get(
    "/api/get-serviceBarber",
    serviceBarberController.getAllServiceBarber
  );
  router.get(
    "/api/get-detail-service-by-id",
    serviceBarberController.getDetailServiceBarberById
  );
  router.put(
    "/api/edit-detail-service-by-id",
    serviceBarberController.handleEditServiceBarber
  );
  router.delete(
    "/api/delete-detail-service-by-id",
    serviceBarberController.handleDeleteServiceBarber
  );

  router.post("/api/create-new-branching", branchingController.createBranching);
  router.get("/api/get-branching", branchingController.getAllBranching);
  router.get(
    "/api/get-detail-branching-by-id",
    branchingController.getDetailBranchingById
  );
  router.put(
    "/api/edit-detail-branching-by-id",
    branchingController.handleEditBranching
  );
  router.delete(
    "/api/delete-detail-branching-by-id",
    branchingController.handleDeleteBranching
  );

  router.get(
    "/api/get-list-customer-for-barber",
    barberController.getListCustomerForBarber
  );
  router.get(
    "/api/get-list-customer-history-for-barber",
    barberController.getListCustomerHistoryForBarber
  );
  return app.use("/", router);
};
module.exports = initWebRoutes;
