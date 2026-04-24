import City from "./city.model";
import Job from "./job.model";
import User from "./user.model";

City.hasMany(User, { foreignKey: "city_id", as: "users" });
User.belongsTo(City, { foreignKey: "city_id", as: "city" });

City.hasMany(Job, { foreignKey: "city_id", as: "jobs" });
Job.belongsTo(City, { foreignKey: "city_id", as: "city" });

User.hasMany(Job, { foreignKey: "reporter_id", as: "reportedJobs" });
Job.belongsTo(User, { foreignKey: "reporter_id", as: "reporter" });

User.hasMany(Job, { foreignKey: "editor_id", as: "editedJobs" });
Job.belongsTo(User, { foreignKey: "editor_id", as: "editor" });

export { City, Job, User };
