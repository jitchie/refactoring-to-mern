const { AuthenticationError } = require('apollo-server-express');
const {  User } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
  Query: {
    me: async (_, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('savedBooks');
      }
      throw new AuthenticationError('Cannot find a user with this id!');
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect email credentials, please try again');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect password, please try again');
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (_, { authors, description, title, bookId, image, link }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: {authors, description, title, bookId, image, link}} },
          { new: true, runValidators: true }
        );
        return user;
      }
      throw new AuthenticationError('Cannot find a user with this id!');
    },
    removeBook: async (parent, {bookId}, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: bookId } } },
          { new: true }
        )
        return updatedUser;
      }
      throw new AuthenticationError('Cannot find a user with this id!');
    }
  }
};

module.exports = resolvers;
