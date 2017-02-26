let config = require('../config');
let mongoose = require('mongoose');
let db = mongoose.connect(`mongodb://localhost/${config.db}`);
let Schema = mongoose.Schema;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//   console.log('Successfully Open!');
// })

// user
let UserSchema = new Schema({
	phone: {
		type: String, // 用户注册名（手机等）
		index: {
			unique: true,
		}
	},
	lastUpdate: Date,
	todayQuestions: {
		type: Array,
		default: []
	},
	createDate: {
		type: Date,
		default: Date.now
	},
	avatar: String,
	password: String,
	name: {
		type: String, // 用户名
		index: {
			unique: true,
		}
	}, 
	gender: String, // 'm','f','x'
	birthday: Date,
	hobbies: {
		type: Array, // 存放的是string类型的数据，用户标签
		tags: []
	},
	score: {
		type: Number, // 积分
		default: 0
	},
	// 存放用户喜欢的问题id
	favoriteQuestions: {
		type: Array, 
		default: []
	},
	favoriteAnswers: {
		type: Array, // 存放用户喜欢的回答的id
		default: []
	},
	background: Schema.Types.ObjectId,
});
UserSchema.index({name:1, unique: true});
let User = mongoose.model('user', UserSchema);

// question
let QuestionSchema = new Schema({
	title: String, // 问题的标题
	detail: String, // 问题的详细内容
	type: String, // “任务型”，“回忆型”等划分
	targetType: String, // 0是个人问题，1是广播问题
	likes: {
		type: Number, // 问题被喜欢的次数
		default: 0
	},
	tags: Array, // 标签，和用户的hobbies配合使用
});
let Question = mongoose.model('question', QuestionSchema); 

// answer
let AnswerSchema = new Schema({
	questionId: Schema.Types.ObjectId,
	userId: Schema.Types.ObjectId,
	likes: {
		type: Number, // 被喜欢的次数
		default: 0
	},
	targetType: Number, // 0是个人问题的回答，1是广播问题的回答
	type: Number,// 0是文字问题，1是图片问题
	detail: String, // 回答的详细内容
	createTime: Date, // 回答该问题的时间
	privacy: Boolean, // 是否允许被查看
	picture: String, // 图片问题
	recommended: Boolean,
});
AnswerSchema.index({ questionId: 1, _id: 1 })
let Answer = mongoose.model('answer', AnswerSchema); 

// Background
let BackgroundSchema = new Schema({
	url: String,
	price: Number
});
let Background = mongoose.model('background', BackgroundSchema); 

module.exports = {
	User,
	Answer,
	Question,
	Background
};