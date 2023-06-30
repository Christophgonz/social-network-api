const { User } = require("../models");

module.exports = {
  // get /api/users
  async getUsers(req, res) {
    try {
      const users = await User.find().populate({
        path: "thoughts",
        select: "-__v",
      });
      res.status(200).json(users);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // get /api/users/:userId
  async getOneUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).populate({
        path: "thoughts",
        select: "-__v",
      });

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user with that ID was found" });
      }

      res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  // put /api/users/:userId
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // post /api/users
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  // delete /api/users/:userId
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user with that ID was found" });
      }
      res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // post /api/users/:userId/friends/:friendId
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      const friend = await User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $addToSet: { friends: req.params.userId } },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res
          .status(404)
          .json({ message: "No user with that ID was found" });
      }
      if (!friend) {
        return res
          .status(404)
          .json({ message: "No friend with that ID was found" });
      }
      res.status(200).json({ message: "Friend Added" });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // delete /api/users/:userId/friends/:friendId
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      const friend = await User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $pull: { friends: req.params.userId } },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res
          .status(404)
          .json({ message: "No user with that ID was found" });
      }
      if (!friend) {
        return res
          .status(404)
          .json({ message: "No friend with that ID was found" });
      }

      res.status(200).json({ message: "Friend Removed :(" });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
