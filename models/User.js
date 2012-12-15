var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    id        : ObjectId,
    username  : { type: String, required: true, trim: true },
    password  : { type: String, required: true },
    email     : { type: String, trim: true, index: { unique: true, sparse: true } },
    date      : Date
});

// Date setter
UserSchema.path('date')
    .default(function(){
        return new Date()
    })
    .set(function(v){
        return v == 'now' ? new Date() : v;
    });

module.exports = mongoose.model('Users', UserSchema);