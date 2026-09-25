const mongoose = require('mongoose');
const models = require('./models');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ReconstructX';

const clearDatabase = async () => {
  try {
    console.log(`[ReconstructX] Connecting to MongoDB: ${MONGO_URI}`);
    await mongoose.connect(MONGO_URI);
    
    console.log(`[ReconstructX] Clearing all cases, fragments, recovered files, and jobs...`);
    const results = await Promise.all([
      models.Case.deleteMany({}),
      models.StorageSource.deleteMany({}),
      models.Fragment.deleteMany({}),
      models.FragmentRelationship.deleteMany({}),
      models.RecoveredFile.deleteMany({}),
      models.AnalysisJob.deleteMany({}),
      models.AuditLog.deleteMany({}),
      models.Notification.deleteMany({})
    ]);

    console.log(`[ReconstructX] Successfully removed:`);
    console.log(` - Cases removed: ${results[0].deletedCount}`);
    console.log(` - Storage Sources removed: ${results[1].deletedCount}`);
    console.log(` - Fragments removed: ${results[2].deletedCount}`);
    console.log(` - Relationships removed: ${results[3].deletedCount}`);
    console.log(` - Recovered Files removed: ${results[4].deletedCount}`);
    console.log(` - Analysis Jobs removed: ${results[5].deletedCount}`);
    console.log(` - Audit Logs removed: ${results[6].deletedCount}`);
    console.log(` - Notifications removed: ${results[7].deletedCount}`);

    console.log(`[ReconstructX] Database is now completely clean and ready!`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error(`[ReconstructX] Error clearing database:`, err);
    process.exit(1);
  }
};

clearDatabase();
