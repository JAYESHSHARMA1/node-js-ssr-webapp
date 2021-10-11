const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        name:{type:'string',required:true},
        profileImage:{type:'string'},
        email:{type:'string',required:true,unique:true},
        password:{type:'string',required:true},
        role:{type:'string',required:true,default:'user'},
        resetPasswordOtp:{type:'string'}
    }, { 
        timestamps: true
    });
    
userSchema.pre('save', function (next) {

var user = this;

if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
    });
});
} else {
    next();
}
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const UserModel = mongoose.model('user', userSchema);


// MONGO DB CHANGE STREAMS
UserModel.watch().
    on('change', data => console.log(new Date(), 'Update',data.fullDocument));

module.exports = UserModel;