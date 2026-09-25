const mongoose = require('mongoose');

// 1. User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['ADMINISTRATOR', 'INVESTIGATOR', 'VIEWER'], default: 'INVESTIGATOR' },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
  status: { type: String, enum: ['ACTIVE', 'SUSPENDED'], default: 'ACTIVE' }
});

// 2. Case Schema
const CaseSchema = new mongoose.Schema({
  caseId: { type: String, required: true, unique: true },
  caseName: { type: String, required: true },
  investigatorId: { type: String, required: true, default: 'usr_vance' },
  investigatorName: { type: String, default: 'Special Agent Vance' },
  description: { type: String, default: '' },
  classification: { type: String, default: 'Corporate Forensics' },
  status: { type: String, enum: ['ACTIVE', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED'], default: 'ACTIVE' },
  createdAt: { type: Date, default: Date.now },
  archivedAt: { type: Date, default: null }
});

// 3. StorageSource Schema
const StorageSourceSchema = new mongoose.Schema({
  caseId: { type: String, required: true },
  filename: { type: String, required: true },
  size: { type: Number, required: true },
  sha256: { type: String, required: true },
  filePath: { type: String, required: true },
  detectedFileSystem: { type: String, default: 'RAW / UNKNOWN' },
  partitions: { type: Array, default: [] },
  sectorCount: { type: Number, default: 0 },
  status: { type: String, enum: ['PENDING', 'READY', 'PROCESSING', 'ANALYZED', 'ERROR'], default: 'READY' },
  createdAt: { type: Date, default: Date.now }
});

// 4. Fragment Schema
const FragmentSchema = new mongoose.Schema({
  fragmentId: { type: String, required: true },
  caseId: { type: String, required: true },
  sourceId: { type: String },
  offset: { type: Number, required: true },
  size: { type: Number, required: true },
  fileType: { type: String, default: 'UNKNOWN' },
  entropy: { type: Number, default: 0.0 },
  md5: { type: String, default: '' },
  sha256: { type: String, default: '' },
  classificationConfidence: { type: Number, default: 0.5 },
  previewHex: { type: String, default: '' },
  previewAscii: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

// 5. FragmentRelationship Schema
const FragmentRelationshipSchema = new mongoose.Schema({
  caseId: { type: String, required: true },
  fragmentA: { type: String, required: true },
  fragmentB: { type: String, required: true },
  byteSimilarity: { type: Number, default: 0.0 },
  sequenceCompatibility: { type: Number, default: 0.0 },
  metadataCompatibility: { type: Number, default: 0.0 },
  overallConfidence: { type: Number, default: 0.0 },
  reason: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

// 6. RecoveredFile Schema
const RecoveredFileSchema = new mongoose.Schema({
  caseId: { type: String, required: true },
  filename: { type: String, required: true },
  fileType: { type: String, required: true },
  fragmentIds: [{ type: String }],
  recoveredSize: { type: Number, default: 0 },
  estimatedOriginalSize: { type: Number, default: 0 },
  completeness: { type: Number, default: 0 }, // 0 to 100
  confidence: { type: Number, default: 0 },   // 0 to 100
  status: { 
    type: String, 
    enum: ['FULLY_RECOVERED', 'PARTIALLY_RECOVERED', 'FRAGMENTS_ONLY', 'UNRECOVERABLE'], 
    default: 'PARTIALLY_RECOVERED' 
  },
  sha256: { type: String, default: '' },
  md5: { type: String, default: '' },
  outputPath: { type: String, default: '' },
  aiExplanation: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

// 7. AnalysisJob Schema
const AnalysisJobSchema = new mongoose.Schema({
  caseId: { type: String, required: true },
  sourceId: { type: String },
  currentStage: { type: String, default: 'Data Acquisition' },
  progress: { type: Number, default: 0 },
  status: { type: String, enum: ['IDLE', 'RUNNING', 'COMPLETED', 'FAILED'], default: 'IDLE' },
  stages: [{
    name: { type: String },
    status: { type: String, enum: ['PENDING', 'ACTIVE', 'DONE', 'ERROR'], default: 'PENDING' },
    details: { type: String, default: '' }
  }],
  startedAt: { type: Date, default: Date.now },
  completedAt: { type: Date }
});

// 8. AuditLog Schema
const AuditLogSchema = new mongoose.Schema({
  caseId: { type: String },
  event: { type: String, required: true },
  user: { type: String, default: 'Special Agent Vance' },
  description: { type: String, required: true },
  ipAddress: { type: String, default: '127.0.0.1' },
  timestamp: { type: Date, default: Date.now }
});

// 9. Notification Schema
const NotificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['INFO', 'SUCCESS', 'WARNING', 'ALERT'], default: 'INFO' },
  caseId: { type: String },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = {
  User: mongoose.model('User', UserSchema),
  Case: mongoose.model('Case', CaseSchema),
  StorageSource: mongoose.model('StorageSource', StorageSourceSchema),
  Fragment: mongoose.model('Fragment', FragmentSchema),
  FragmentRelationship: mongoose.model('FragmentRelationship', FragmentRelationshipSchema),
  RecoveredFile: mongoose.model('RecoveredFile', RecoveredFileSchema),
  AnalysisJob: mongoose.model('AnalysisJob', AnalysisJobSchema),
  AuditLog: mongoose.model('AuditLog', AuditLogSchema),
  Notification: mongoose.model('Notification', NotificationSchema)
};
