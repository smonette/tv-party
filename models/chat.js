module.exports = function (sequelize, DataTypes){

  var Chat = sequelize.define('chat',{
      show_id: {
        type: DataTypes.STRING
        // foreignKey: true
      },
      username: DataTypes.STRING,
      text: DataTypes.STRING
  })
  return Chat;
}


