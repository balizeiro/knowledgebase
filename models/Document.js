var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var DocumentSchema = new Schema({
    id        : ObjectId,
    title     : { type: String, required: true },
    body      : { type: String, required: true },
    date      : Date
});

// Date setter
DocumentSchema.path('date')
    .default(function(){
        return new Date()
    })
    .set(function(v){
        return v == 'now' ? new Date() : v;
    });

module.exports = mongoose.model('Documents', DocumentSchema);