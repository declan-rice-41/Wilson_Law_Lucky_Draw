import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
interface CustomerAttributes {
  id: number;
  name: string;
  mobile_number: string;
}

interface CustomerCreationAttributes
  extends Optional<CustomerAttributes, 'id'> {}

class Customer
  extends Model<CustomerAttributes, CustomerCreationAttributes>
  implements CustomerAttributes
{
  public id!: number;
  public name!: string;
  public mobile_number!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Customer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    mobile_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Customers',
  },
);

export default Customer;
