const router = require("express").Router();
const DevController = require("./Controller/Dev");

router.get("/devs", DevController.index);
router.post(`/devs`, DevController.store);

module.exports = router;
