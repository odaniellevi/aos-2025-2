const getTarefaModel = (sequelize, { DataTypes }) => {
  const Tarefa = sequelize.define("tarefa", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    concluida: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  Tarefa.associate = (models) => {
    Tarefa.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      as: 'user'
    });
  };

  return Tarefa;
};

export default getTarefaModel;