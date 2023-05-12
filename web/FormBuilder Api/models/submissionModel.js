export default (sequelize, DataTypes) => {
    const Submission = sequelize.define("submission", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      fields: {
        type: DataTypes.JSON,
      },
    });
  
    return Submission;
  };