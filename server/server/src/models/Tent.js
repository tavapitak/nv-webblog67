module.exports = (sequelize, DataTypes) => {
    const Tent = sequelize.define('Tent', {
        title: DataTypes.STRING,
        pictures: DataTypes.TEXT,
        content: DataTypes.TEXT,
        category: DataTypes.STRING,     
        status: DataTypes.STRING,
    })
    return Tent
}