const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  // get /api/users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // get /api/users/:userId
  async getOneUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });

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
  async updateUser(req, res) {},

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
      const user = await User.findOne({ _id: req.params.userId });
      const friend = await User.findOne({ _id: req.params.friendId });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // delete /api/users/:userId/friends/:friendId
  async removeFriend(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      const friend = await User.findOne({ _id: req.params.friendId });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
