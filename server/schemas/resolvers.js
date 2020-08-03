const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        Me: async (parent, args, Context) => {
            if (Context.user) {
                const userData = await User.findOne({ _id: Context.user._id })
                    .select('-__v -password')

                return userData;
            }

            throw new AuthenticationError('not logged in');
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, {email, password}) => {

            const user = await User.findOne({ email });

            if (!user) {

                throw new AuthenticationError('Incorrect credentials');

            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {

                throw new AuthenticationError('Incorrect credentials');

            }

            const token = signToken(user);

            return { token, user };

        },
        addBook: async (parent, { input }, Context) => {
            if (Context.user) {
                const updateUser = await User.findByIdAndUpdate(
                    {_id: Context.user._id},
                    {$addToSet: {savedBooks: input} },
                    {new: true}
                )
                return updateUser;
            }
        },
        removeBook: async ( parent, {bookId}, Context ) => {
            if (Context.user._id) {
                const updateUser = await User.findByIdAndUpdate(
                    { _id: Context.user._id },
                    {$pull: {savedBooks: { bookId: bookId } } },
                    {new: true}
                    )
                    return updateUser;
            }            
        },
    }
}

module.exports = resolvers;