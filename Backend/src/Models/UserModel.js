const mongoose=require('mongoose')
const UserSchema = new mongoose.Schema(
    {
    sno:{type:Number,unique:true },
    name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
    }
);
UserSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next();
    }

    try {
        const lastUser = await this.constructor.findOne().sort('-sno');
        this.sno = lastUser ? lastUser.sno + 1 : 1; 
        next();
    } catch (err) {
        next(err);
    }
});
const User=new mongoose.model('user',UserSchema);
module .exports={User};