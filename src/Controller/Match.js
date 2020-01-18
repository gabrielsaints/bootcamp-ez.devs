/* eslint-disable arrow-parens */
const Dev = require(`../models/Dev`);

const index = async (req, res) => {
  try {
    const { user } = req.headers;

    const logged = await Dev.findById(user);

    if (!logged) {
      throw new Error(`User not found`);
    }

    const likes = await Dev.find({
      $and: [
        {
          _id: {
            $in: logged.likes
          }
        }
      ]
    });

    const matches = likes.filter(element => element.likes.includes(user));

    res.json(matches);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

module.exports = { index };
