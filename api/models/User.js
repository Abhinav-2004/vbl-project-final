const mongoose = require('mongoose');
const {Schema} = mongoose;
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true ,unique:true},
    name: { type: String, required: true },
    password: { type: String, required: true },
    department: { type: String, enum: ['sales', 'marketing'], required: true },
    designation: { type: String, enum: ['junior', 'senior','hod'], required: true },
    employeeID: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    managerData: { type: mongoose.Types.ObjectId, ref: 'ManagerData' }, 
    developerData: { type: mongoose.Types.ObjectId, ref: 'DeveloperData' }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
