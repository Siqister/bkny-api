const mongoose = require('mongoose');

const patternSchema = new mongoose.Schema({
	name: {type: String},
	desc: {type: String},
	id: {type: Number}
});

const PatternModel = mongoose.model('pattern', patternSchema);
module.exports = PatternModel;