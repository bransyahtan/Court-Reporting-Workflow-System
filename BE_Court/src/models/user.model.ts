import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import { Role } from "../types/enums";

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  cityId: number;
  fee: number;
  availability: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes extends Optional<
  UserAttributes,
  "id" | "fee" | "availability"
> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: Role;
  public cityId!: number;
  public fee!: number;
  public availability!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(Role)),
      allowNull: false,
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "city_id",
    },
    fee: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },
    availability: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ["role"],
        name: "idx_users_role",
      },
      {
        fields: ["city_id"],
        name: "idx_users_city_id",
      },
      {
        fields: ["role", "city_id", "availability"],
        name: "idx_users_role_city_availability",
      },
      {
        unique: true,
        fields: ["email"],
        name: "idx_users_email",
      },
    ],
  },
);

export default User;
