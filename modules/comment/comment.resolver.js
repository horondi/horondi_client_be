const commentsService = require('./comment.service');
const RuleError = require('../../errors/rule.error');

const commentsQuery = {
  getAllComments: (parent, args) => commentsService.getAllComments(args),
  getCommentById: async (parent, { id }) => {
    try {
      return await commentsService.getCommentById(id);
    } catch (e) {
      return new RuleError(e.message, e.statusCode);
    }
  },

  getRecentComments: async (_, { limit }) => {
    try {
      return await commentsService.getRecentComments(limit);
    } catch (error) {
      return new RuleError(error.message, error.statusCode);
    }
  },

  getAllCommentsByProduct: async (parent, args) => {
    try {
      return await commentsService.getAllCommentsByProduct(args);
    } catch (error) {
      return [
        {
          message: error.message,
          statusCode: error.statusCode,
        },
      ];
    }
  },

  getAllCommentsByUser: async (parent, args) => {
    try {
      return await commentsService.getAllCommentsByUser(args.userId);
    } catch (error) {
      return [
        {
          message: error.message,
          statusCode: error.statusCode,
        },
      ];
    }
  },
};

const commentsMutation = {
  addComment: async (_, { comment }) => {
    try {
      return await commentsService.addComment(comment);
    } catch (error) {
      return new RuleError(error.message, error.statusCode);
    }
  },
  replyForComment: async (_, { commentId, replyCommentData }) => {
    try {
      return await commentsService.replyForComment(commentId, replyCommentData);
    } catch (error) {
      return new RuleError(error.message, error.statusCode);
    }
  },
  updateReplyForComment: async (_, { replyCommentId, replyCommentData }) => {
    try {
      return await commentsService.updateReplyComment(
        replyCommentId,
        replyCommentData
      );
    } catch (error) {
      return new RuleError(error.message, error.statusCode);
    }
  },
  deleteReplyForComment: async (_, { replyCommentId }) => {
    try {
      return await commentsService.deleteReplyComment(replyCommentId);
    } catch (error) {
      return new RuleError(error.message, error.statusCode);
    }
  },

  deleteComment: async (parent, { id }) => {
    try {
      return await commentsService.deleteComment(id);
    } catch (error) {
      return new RuleError(error.message, error.statusCode);
    }
  },

  updateComment: async (parent, { id, comment }) => {
    try {
      return await commentsService.updateComment(id, comment);
    } catch (error) {
      return new RuleError(error.message, error.statusCode);
    }
  },

  addRate: async (parent, args, context) => {
    try {
      return await commentsService.addRate(
        args.product,
        args.userRate,
        context.user
      );
    } catch (error) {
      return new RuleError(error.message, error.statusCode);
    }
  },
};

module.exports = { commentsQuery, commentsMutation };
