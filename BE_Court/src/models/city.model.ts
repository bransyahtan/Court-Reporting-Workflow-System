import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

export interface CityAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CityCreationAttributes extends Optional<
  CityAttributes,
  "id"
> {}

class City
  extends Model<CityAttributes, CityCreationAttributes>
  implements CityAttributes
{
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

City.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "cities",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["name"],
        name: "idx_cities_name",
      },
    ],
  },
);

export default City;
