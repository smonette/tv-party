module.exports = function (sequelize, DataTypes){

  var Show = sequelize.define('show',{
      id: {
        type: DataTypes.INTEGER,
        unique: true
      },
      name: DataTypes.STRING,
      imdb_id: DataTypes.STRING,
      img_url: DataTypes.STRING,
      twitter_handle: DataTypes.STRING,
      wiki_link: DataTypes.STRING
  })
  return Show;
}