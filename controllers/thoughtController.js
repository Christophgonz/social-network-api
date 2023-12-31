const { User, Thought } = require("../models");

module.exports = {
  // get /api/thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.status(200).json(thoughts);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // post /api/thoughts
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { username: thought.username },
        { $addToSet: { thoughts: thought._id } }
      );
      if (!user) {
        return res.status(404).json({
          message: "Thought created but no user with that ID was found",
        });
      }
      res.json(thought);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // get /api/thoughts/:thoughtId
  async getOneThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought with that ID was found" });
      }
      res.status(200).json(thought);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // put /api/thoughts/:thoughtId
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      res.status(200).json(thought);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // delete /api/thoughts/:thoughtId
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought with that ID was found" });
      }
      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({
          message: "Thought deleted but no user with that ID was found",
        });
      }
      res.status(200).json(thought);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // post /api/thoughts/:thoughtId/reactions
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought with that ID was found" });
      }
      res.status(200).json(thought);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // delete /api/thoughts/:thoughtId/reactions/:reactionId
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought with that ID was found" });
      }
      res.status(200).json(thought);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
