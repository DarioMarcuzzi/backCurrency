const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "currency",
    {
      base_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time_last_update_utc: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      conversion_rates: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
