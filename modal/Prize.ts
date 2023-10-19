import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface PrizeAttributes {
  id: number;
  name: string;
  totalQuota: number;
  dailyQuota?: number;
  probability: number;
}

interface PrizeCreationAttributes extends Optional<PrizeAttributes, 'id'> {}

class Prize
  extends Model<PrizeAttributes, PrizeCreationAttributes>
  implements PrizeAttributes
{
  public id!: number;
  public name!: string;
  public totalQuota!: number;
  public dailyQuota?: number;
  public probability!: number;
}

Prize.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalQuota: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dailyQuota: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    probability: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Prizes',
  },
);

export default Prize;
