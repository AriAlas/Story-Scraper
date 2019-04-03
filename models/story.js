var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var StorySchema = new Schema ({
    
    link : {
        type : String,
        required: true
    } ,
    quote : {
        type: String,
        required: false
    },
    comment : [{
        type: Schema.Types.ObjectId,
        ref: "Comment"   
    }]
});

var Story = mongoose.model("Story", StorySchema);

module.exports = Story;