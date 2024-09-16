const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    sno: { type: Number, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNo: { type: String, required: true },
    designation: { type: String, required: true },
    gender: { type: String, enum: ['M', 'F'], required: true },
    courses: { type: [String], required: true } ,
    imageUrl:{type:String, required:true},
    createDate:{
        type:Date,
        default:Date.now()
    }
});

EmployeeSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next();
    }

    try {
        const lastEmployee = await this.constructor.findOne().sort('-sno');
        this.sno = lastEmployee ? lastEmployee.sno + 1 : 1; 
        next();
    } catch (err) {
        next(err);
    }
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
