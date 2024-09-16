const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { users } = require('../../data/testdata');
const { User } = require('../Models/UserModel');
const PASSWORD_HASH_SALT_ROUNDS = 10;

const dbconnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log('Connected to MongoDB successfully.');
        
        await seedUsers(); 
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

const seedUsers = async () => {
    try {
        const usersCount = await User.countDocuments();
        if (usersCount > 0) {
            console.log('Users seed is already done!');
            return;
        }

        for (let user of users) {
            user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
            await User.create(user);
        }

        console.log('Users seed is done!');
    } catch (error) {
        console.error('Error seeding users:', error);
    }
};

module.exports = dbconnect;
