/* eslint-disable no-underscore-dangle */
const Dev = require(`../models/Dev`);

const store = async (req, res) => {
  try {
    const { user } = req.headers;
    const { devId: id } = req.params;

    const logged = await Dev.findById(user);
    const target = await Dev.findById(id);

    if (!target) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    if (target.likes.includes(logged._id)) {
      // its a match
      const loggedSocket = req.connectedUsers[user];
      const targetSocket = req.connectedUsers[id];

      if (loggedSocket) {
        req.io.to(loggedSocket).emit("match", target);
      }

      if (targetSocket) {
        req.io.to(targetSocket).emit(`match`, logged);
      }
    }

    logged.likes.push(target._id);
    await logged.save();

    res.json(logged);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

module.exports = { store };
