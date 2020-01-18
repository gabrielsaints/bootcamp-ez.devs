const Dev = require(`../models/Dev`);
const api = require(`../service/api`);

const index = async (_, res) => {
  try {
    const devs = await Dev.find({});

    res.json(devs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const store = async (req, res) => {
  try {
    const { username: user } = req.body;

    const already = await Dev.findOne({ user });

    if (already) {
      return res.status(200).json(already);
    }

    const found = await api.get(`/users/${user}`);

    const { name, bio, avatar_url: avatar } = found.data;

    const dev = await Dev.create({
      name,
      bio,
      avatar,
      user
    });

    res.status(200).json(dev);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message
    });
  }
};

module.exports = {
  index,
  store
};
