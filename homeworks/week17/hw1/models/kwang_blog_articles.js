/* eslint-disable */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KWang_blog_articles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      KWang_blog_articles.belongsTo(models.KWang_blog_users)
    }
  };
  KWang_blog_articles.init({
    title: DataTypes.TEXT,
    content: DataTypes.TEXT,
    is_deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'KWang_blog_articles',
  });
  return KWang_blog_articles;
};