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
    logged.dislikes.push(target._id);
    await logged.save();

    res.json(logged);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

module.exports = { store };
