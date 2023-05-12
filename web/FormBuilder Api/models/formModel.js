export default (sequelize, DataTypes) => {
    const Form = sequelize.define("form", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      shortcode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      formtitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      componentJSON: {
        type: DataTypes.JSON,
      },
      headerJSON: {
        type: DataTypes.JSON,
      },
      footerJSON: {
        type: DataTypes.JSON,
      },
      status: {
        type: DataTypes.BOOLEAN,
      },
      formCSS: {
        type: DataTypes.JSON,
      },
    });
  
    return Form;
  };
  