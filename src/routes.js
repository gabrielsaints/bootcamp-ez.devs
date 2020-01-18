const router = require("express").Router();
const DevController = require("./Controller/Dev");

const LikeController = require(`./Controller/Like`);
const DislikeController = require(`./Controller/Dislike`);
const MatchController = require(`./Controller/Match`);

router.get("/devs", DevController.index);
router.get("/devs/matches", MatchController.index);
router.post(`/devs`, DevController.store);

router.post("/devs/:devId/likes", LikeController.store);
router.post("/devs/:devId/dislike", DislikeController.store);

module.exports = router;
