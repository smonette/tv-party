module.exports = {
  // what to do to create the migration
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished

    // make sure that the table is pluralized
    migration.createTable('shows',
        {id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        imdb_id: {
          type: DataTypes.STRING,
          allowNull: false
        },
        img_url: {
          type: DataTypes.STRING,
          allowNull: false
        },
        twitter_handle: {
          type: DataTypes.STRING,
          allowNull: false
        },
        wiki_link: {
          type: DataTypes.STRING,
          allowNull: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE

      }).complete(done)
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.dropTable('users')
    .complete(done)
  }
}