const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  // get /api/thoughts
  async getThought(req, res) {},
  // post /api/thoughts
  async createThought(req, res) {},
  // get /api/thoughts/:thoughtId
  async getOneThought(req, res) {},
  // put /api/thoughts/:thoughtId
  async updateThought(req, res) {},
  // delete /api/thoughts/:thoughtId
  async deleteThought(req, res) {},
  // post /api/thoughts/:thoughtId/reactions
  async createReaction(req, res) {},
  // delete /api/thoughts/:thoughtId/reactions/:reactionId
  async deleteReaction(req, res) {},
};
