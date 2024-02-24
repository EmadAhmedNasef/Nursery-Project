const express = require("express");
const childrenController = require("./../Controllers/childrenController");
const router = express.Router();



router.route("/childrens").get(childrenController.getChildren);
router.post("/childrens/register" ,childrenController.registerChild );
router.route("/childrens/:id").get(childrenController.getSpecificChild)
                             .delete(childrenController.removeChild)
                             .patch(childrenController.updateChild);

module.exports = router;