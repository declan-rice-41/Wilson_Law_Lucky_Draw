import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import Customer from './Customer';
import Prize from './Prize';

interface DrawAttributes {
  id: number;
  draw_date: Date;
  customer_id: number; // Foreign key for the Customer association
  prize_id: number; // Foreign key for the Prize association
  isRedeemed: boolean;
}

interface DrawCreationAttributes extends Optional<DrawAttributes, 'id'> {}

class Draw
  extends Model<DrawAttributes, DrawCreationAttributes>
  implements DrawAttributes
{
  public id!: number;
  public draw_date!: Date;
  public customer_id!: number;
  public prize_id!: number;
  public isRedeemed!: boolean;

  // Timestamps
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Draw.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    draw_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    prize_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isRedeemed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Draws',
  },
);

Draw.belongsTo(Customer, {
  foreignKey: 'customer_id',
  as: 'Customers',
});

Draw.belongsTo(Prize, {
  foreignKey: 'prize_id',
  as: 'Prizes',
});

export default Draw;
