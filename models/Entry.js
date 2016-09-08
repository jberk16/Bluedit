var mongoose = require('mongoose')

var EntrySchema = new mongoose.Schema({

	title:{type:String, trim:true, default:''},
	content:{type:String, trim:true, default:''},
	url:{type:String, trim:true, default:''},
	userId:{type:String, trim:true, default:''},
	score:{type:Number, default:0},
	timestamp:{type:Date, default:Date.now}


})

module.exports = mongoose.model('EntrySchema', EntrySchema)