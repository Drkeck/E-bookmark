const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {
        me: async (parent, args, Context) => {
            if (Context.user) {
                const userData = await User.findOne({ _id: Context.user._id })
                    .select('-__v -password')
                    .populate('books')

                return userData
            }
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user}
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

        }
    }
}

module.exports = resolvers;