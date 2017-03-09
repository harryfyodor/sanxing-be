let Answer = require('../lib/mongo').Answer;

module.exports = {
  // 回答
  createAnswer: function(opts) {
    return Answer.create(opts)
  },
  likeAnswer: async function(id) {
    await Answer.where({ _id: id }).update({
      $inc: {
        likes: 1
      }
    });
  },
  // 广播问题回答
  getAnswers: function(questionId, page) {
    return Answer.find({
      targetType: 1,
      questionId: questionId
    }).select("likes detail").skip(page * 10);
  },
  // 设置精品回答
  setRecommend: function(answerId, bool) {
    return Answer.where({ _id: answerId }).update({
      $set: {
        recommended: bool
      }
    });
  },
  // 精品回答
  getAnswer: function(id) {
    return Answer.findOne({
      questionId: id,
      recommended: true
    });
  },
  // 获取历史, 每次获取前十条，分页
  getAnswersByUserId: function(userId, num) {
    return Answer.find({
      _id: userId 
    }).sort({
      createDate: -1
    }).skip(10 * num);
  }
}