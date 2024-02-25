const express = require("express");
const childrenController = require("./../Controllers/childrenController");
const router = express.Router();
const authController = require("./../Controllers/authController");




router.patch("/updateImg" , childrenController.uploadTeacherPhoto , childrenController.getImg);

// router.post("/signup" ,childrenController.uploadTeacherPhoto ,authController.signUp);
router.post("/login" , authController.logIn);


router.route("/childrens").get(childrenController.getChildren);
// router.post("/childrens/register" ,childrenController.registerChild );
router.route("/childrens/:id").get(childrenController.getSpecificChild)
                             .delete(childrenController.removeChild)
                             .patch(childrenController.uploadTeacherPhoto,childrenController.updateChild);



module.exports = router;