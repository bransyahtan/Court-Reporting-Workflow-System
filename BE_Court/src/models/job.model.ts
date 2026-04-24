import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import { JobStatus, JobType } from "../types/enums";

export interface JobAttributes {
  id: number;
  caseName: string;
  duration: number; // IN MINUTES
  cityId: number;
  type: JobType;
  status: JobStatus;
  /**
   * reporterId: nullable, diisi saat job di-assign ke reporter.
   * Ketika diisi, status berubah dari NEW -> ASSIGNED.
   */
  reporterId: number | null;
  /**
   * editorId: nullable, diisi saat job di-assign ke editor.
   * Hanya bisa diisi ketika status sudah TRANSCRIBED.
   */
  editorId: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface JobCreationAttributes extends Optional<
  JobAttributes,
  "id" | "status" | "reporterId" | "editorId"
> {}

class Job
  extends Model<JobAttributes, JobCreationAttributes>
  implements JobAttributes
{
  public id!: number;
  public caseName!: string;
  public duration!: number;
  public cityId!: number;
  public type!: JobType;
  public status!: JobStatus;
  public reporterId!: number | null;
  public editorId!: number | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Job.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    caseName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "case_name",
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Durasi audio dalam menit",
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "city_id",
    },
    type: {
      type: DataTypes.ENUM(...Object.values(JobType)),
      allowNull: false,
      defaultValue: JobType.PHYSICAL,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(JobStatus)),
      allowNull: false,
      defaultValue: JobStatus.NEW,
    },
    reporterId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      field: "reporter_id",
    },
    editorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      field: "editor_id",
    },
  },
  {
    sequelize,
    tableName: "jobs",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ["status"],
        name: "idx_jobs_status",
      },
      {
        fields: ["city_id"],
        name: "idx_jobs_city_id",
      },
      {
        fields: ["reporter_id"],
        name: "idx_jobs_reporter_id",
      },
      {
        fields: ["editor_id"],
        name: "idx_jobs_editor_id",
      },
      {
        fields: ["reporter_id", "status"],
        name: "idx_jobs_reporter_status",
      },
    ],
  },
);

export default Job;
