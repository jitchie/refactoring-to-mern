const { Book, User } = require('../models');

const resolvers = {
Query: {
    user: async () => {
        return User.find({});
    },

    book: async (_, { bookId}) => {
        return Book.findOne({ _id: bookId });
    },
    
},

Mutation: {
    createUser: async (_, args ) => {
        return User.create( args ), {new:true};
    },
},
};

module.exports = resolvers;
