const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true }
})

userSchema.pre('save', function(next) {
    const user = this
    if (!user.isModified('password')) { 
        return next() 
    }
    bcrypt.hash(user.password, 10).then((hashedPassword) => {
        user.password = hashedPassword
        next()
    })
}, (err) => {
    next(err)
})

userSchema.methods.comparePassword = function(candidatePassword, next) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return next(err);
        next(null, isMatch)
    })
}

module.exports = mongoose.model('user', userSchema)