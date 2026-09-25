const mongoose = require('mongoose');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const models = require('./models');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ReconstructX';
const STORAGE_FILES_DIR = path.resolve(__dirname, '../storage/files');
const STORAGE_REPORTS_DIR = path.resolve(__dirname, '../storage/reports');

fs.mkdirSync(STORAGE_FILES_DIR, { recursive: true });
fs.mkdirSync(STORAGE_REPORTS_DIR, { recursive: true });

// Create realistic dummy sample files in storage for preview/download testing
const createSampleFiles = () => {
  // 1. Python exploit code sample
  const pyCode = `# ==========================================================
# RECONSTRUCTX DECOMPILED EVIDENCE MODULE
# Case Reference: CASE-1001 / Recovered from cluster 0x004A2000
# ==========================================================
import hashlib
import struct

class RecoveredTransactionValidator:
    def __init__(self, key_derivation_salt: bytes):
        self.salt = key_derivation_salt
        self.algorithm = "SHA-256"

    def verify_ledger_block(self, block_bytes: bytes, expected_hash: str) -> bool:
        hasher = hashlib.sha256()
        hasher.update(self.salt)
        hasher.update(block_bytes)
        calculated = hasher.hexdigest()
        return calculated.lower() == expected_hash.lower()

if __name__ == '__main__':
    validator = RecoveredTransactionValidator(b"OBSIDIAN_VAULT_2026")
    print("[+] Evidence Module initialized successfully.")
`;
  fs.writeFileSync(path.join(STORAGE_FILES_DIR, 'decompiled_exploit.py'), pyCode, 'utf8');

  // 2. CSV Transaction Log
  const csvData = `Transaction_ID,Timestamp,Sender_Account,Recipient_Account,Amount_USD,Status,Signature_Verification
TXN-90218,2026-09-24T14:22:10Z,ACCT-8841-NV,ACCT-9002-KY,450000.00,CONFIRMED,VALID_ECDSA
TXN-90219,2026-09-24T14:25:44Z,ACCT-8841-NV,ACCT-1130-CH,128000.50,CONFIRMED,VALID_ECDSA
TXN-90220,2026-09-24T14:31:02Z,ACCT-4091-PA,ACCT-7719-KY,92000.00,PENDING,AUDIT_HOLD
TXN-90221,2026-09-24T14:45:19Z,ACCT-8841-NV,ACCT-5502-SG,850000.00,FLAGGED,SUSPICIOUS_VELOCITY
TXN-90222,2026-09-24T15:01:33Z,ACCT-2290-DE,ACCT-8841-NV,1200000.00,SETTLED,CLEARED_FEDERAL
`;
  fs.writeFileSync(path.join(STORAGE_FILES_DIR, 'raw_transaction_log.csv'), csvData, 'utf8');

  // 3. JSON Vault Dump
  const jsonData = {
    vault_id: "VAULT-OBSIDIAN-09",
    classification: "TOP_SECRET_FORENSICS",
    carved_at: "2026-09-25T11:00:00Z",
    shannon_entropy: 7.914,
    reconstructed_clusters: 18,
    integrity_status: "CRYPTOGRAPHICALLY_VERIFIED",
    ledger_entries: [
      { id: "L-01", routing: "OFFSHORE-SWIFT-891", amount: 450000, currency: "USD", hash: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08" },
      { id: "L-02", routing: "DIRECT-SETTLEMENT-02", amount: 1200000, currency: "EUR", hash: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8" }
    ]
  };
  fs.writeFileSync(path.join(STORAGE_FILES_DIR, 'sqlite_vault_dump.json'), JSON.stringify(jsonData, null, 2), 'utf8');

  // 4. Sample PDF Evidence Document
  const samplePdf = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >>
endobj
4 0 obj
<< /Length 120 >>
stream
BT
/F1 16 Tf
50 700 Td
(RECONSTRUCTX DIGITAL FORENSICS EVIDENCE DOSSIER) Tj
0 -30 Td
/F1 11 Tf
(Case: CASE-1001 - Operation Obsidian Vault) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000196 00000 n 
trailer
<< /Size 5 /Root 1 0 R >>
startxref
368
%%EOF`;
  fs.writeFileSync(path.join(STORAGE_FILES_DIR, 'case_1001_evidence_report.pdf'), samplePdf, 'utf8');
};

const hashPassword = (pwd) => crypto.createHash('sha256').update(pwd).digest('hex');

const seedDatabase = async () => {
  try {
    console.log(`[ReconstructX Seed] Connecting to MongoDB: ${MONGO_URI}`);
    await mongoose.connect(MONGO_URI);
    console.log(`[ReconstructX Seed] Connected successfully.`);

    createSampleFiles();

    // 1. Wipe all collections clean
    console.log(`[ReconstructX Seed] Dropping/Clearing previous collections...`);
    await Promise.all([
      models.User.deleteMany({}),
      models.Case.deleteMany({}),
      models.StorageSource.deleteMany({}),
      models.Fragment.deleteMany({}),
      models.FragmentRelationship.deleteMany({}),
      models.RecoveredFile.deleteMany({}),
      models.AnalysisJob.deleteMany({}),
      models.AuditLog.deleteMany({}),
      models.Notification.deleteMany({})
    ]);
    console.log(`[ReconstructX Seed] All 9 collections cleared cleanly.`);

    // 2. Create Users
    console.log(`[ReconstructX Seed] Seeding official forensic personnel...`);
    const users = await models.User.create([
      {
        name: "Special Agent Vance",
        email: "vance@reconstructx.forensics",
        passwordHash: hashPassword("Forensic2026!"),
        role: "INVESTIGATOR",
        status: "ACTIVE",
        createdAt: new Date(Date.now() - 30 * 86400000),
        lastLogin: new Date()
      },
      {
        name: "Chief Inspector Elena Rostova",
        email: "elena@reconstructx.forensics",
        passwordHash: hashPassword("Forensic2026!"),
        role: "ADMINISTRATOR",
        status: "ACTIVE",
        createdAt: new Date(Date.now() - 60 * 86400000),
        lastLogin: new Date()
      },
      {
        name: "Dr. Marcus Sterling",
        email: "sterling@reconstructx.forensics",
        passwordHash: hashPassword("Forensic2026!"),
        role: "INVESTIGATOR",
        status: "ACTIVE",
        createdAt: new Date(Date.now() - 15 * 86400000),
        lastLogin: new Date()
      },
      {
        name: "Auditor Sarah Jenkins",
        email: "jenkins@reconstructx.forensics",
        passwordHash: hashPassword("Forensic2026!"),
        role: "VIEWER",
        status: "ACTIVE",
        createdAt: new Date(Date.now() - 10 * 86400000),
        lastLogin: new Date()
      }
    ]);

    const vance = users[0];
    const elena = users[1];
    const sterling = users[2];

    // 3. Create Scoped Cases
    console.log(`[ReconstructX Seed] Seeding scoped forensic cases...`);
    const cases = await models.Case.create([
      {
        caseId: "CASE-1001",
        caseName: "Operation Obsidian Vault - Encrypted Financial Ledger",
        investigatorId: vance._id.toString(),
        investigatorName: vance.name,
        description: "Recovery and cryptographic reassembly of fragmented multi-million dollar transaction ledgers, encrypted PDF dossiers, and offshore SQLite records from a physically compromised corporate SSD.",
        classification: "Financial Audit",
        status: "ACTIVE",
        createdAt: new Date(Date.now() - 5 * 86400000)
      },
      {
        caseId: "CASE-1002",
        caseName: "Project Chronos - Industrial Firmware & Embedded Telemetry",
        investigatorId: sterling._id.toString(),
        investigatorName: sterling.name,
        description: "Deconstruction of embedded flash memory sectors extracted from sabotaged SCADA controllers and automated power grid PLC modules.",
        classification: "Industrial Sabotage",
        status: "IN_PROGRESS",
        createdAt: new Date(Date.now() - 3 * 86400000)
      },
      {
        caseId: "CASE-1003",
        caseName: "Operation Cyber Breach - Extracted Ransomware Fragment Clusters",
        investigatorId: vance._id.toString(),
        investigatorName: vance.name,
        description: "Neural carving of wiped workstation storage images to reconstruct wiped ransom notes, Python key exfiltration scripts, and network packet capture streams.",
        classification: "Cybercrime & Intrusion",
        status: "COMPLETED",
        createdAt: new Date(Date.now() - 8 * 86400000)
      },
      {
        caseId: "CASE-1004",
        caseName: "Deep Harbor - Maritime GPS & Vessel Sensor Blackbox",
        investigatorId: elena._id.toString(),
        investigatorName: elena.name,
        description: "Analysis of saltwater-damaged navigational memory blocks, NMEA sensor streams, and radar imagery after container vessel collision.",
        classification: "Maritime Incident",
        status: "ACTIVE",
        createdAt: new Date(Date.now() - 1 * 86400000)
      }
    ]);

    // 4. Create Storage Sources for CASE-1001
    console.log(`[ReconstructX Seed] Seeding storage evidence sources...`);
    const source1001 = await models.StorageSource.create({
      caseId: "CASE-1001",
      filename: "evidence_disk_obsidian_nvme.raw",
      size: 104857600, // 100 MB
      sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      filePath: "storage/disk_images/evidence_disk_obsidian_nvme.raw",
      detectedFileSystem: "RAW / Fragmented NTFS Clusters",
      partitions: [
        { id: "p1", name: "Primary NTFS Partition", startSector: 2048, sectorCount: 150000, type: "NTFS" },
        { id: "p2", name: "Unallocated Damaged Slack Space", startSector: 152048, sectorCount: 54952, type: "RAW_SLACK" }
      ],
      sectorCount: 204800,
      status: "ANALYZED",
      createdAt: new Date(Date.now() - 4 * 86400000)
    });

    // 5. Create Forensic Fragments for CASE-1001
    console.log(`[ReconstructX Seed] Seeding raw forensic fragments...`);
    const fragments = await models.Fragment.create([
      {
        fragmentId: "FRAG-001",
        caseId: "CASE-1001",
        sourceId: source1001._id.toString(),
        offset: 0x00001000,
        size: 8192,
        fileType: "PDF",
        entropy: 7.65,
        md5: "8b1a9953c4611296a827abf8c47804d7",
        sha256: "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
        classificationConfidence: 0.96,
        previewHex: "25 50 44 46 2D 31 2E 34 0A 25 D3 EB E9 E1 0A 31 20 30 20 6F 62 6A 0A 3C 3C 20 2F 54 79 70 65 20",
        previewAscii: "%PDF-1.4.%......1 0 obj.<< /Type "
      },
      {
        fragmentId: "FRAG-002",
        caseId: "CASE-1001",
        sourceId: source1001._id.toString(),
        offset: 0x00004000,
        size: 16384,
        fileType: "PDF",
        entropy: 7.92,
        md5: "c4ca4238a0b923820dcc509a6f75849b",
        sha256: "482c811da5d5b4bc6d497ffa98491e38",
        classificationConfidence: 0.94,
        previewHex: "3C 3C 20 2F 46 69 6C 74 65 72 20 2F 46 6C 61 74 65 44 65 63 6F 64 65 20 2F 4C 65 6E 67 74 68 20",
        previewAscii: "<< /Filter /FlateDecode /Length "
      },
      {
        fragmentId: "FRAG-003",
        caseId: "CASE-1001",
        sourceId: source1001._id.toString(),
        offset: 0x00009000,
        size: 4096,
        fileType: "PDF",
        entropy: 6.41,
        md5: "eccbc87e4b5ce2fe28308fd9f2a7baf3",
        sha256: "1e4e88e3648e20aa79f29177e0492211",
        classificationConfidence: 0.98,
        previewHex: "74 72 61 69 6C 65 72 0A 3C 3C 20 2F 53 69 7A 65 20 35 20 2F 52 6F 6F 74 20 31 20 30 20 52 20 3E",
        previewAscii: "trailer.<< /Size 5 /Root 1 0 R >"
      },
      {
        fragmentId: "FRAG-004",
        caseId: "CASE-1001",
        sourceId: source1001._id.toString(),
        offset: 0x00012000,
        size: 12288,
        fileType: "JPEG",
        entropy: 7.95,
        md5: "a87ff679a2f3e71d9181a67b7542122c",
        sha256: "6706713bb1f4774d4949106e12f21f62",
        classificationConfidence: 0.97,
        previewHex: "FF D8 FF E0 00 10 4A 46 49 46 00 01 01 01 00 60 00 60 00 00 FF DB 00 43 00 08 06 06 07 06 05 08",
        previewAscii: "......JFIF.....`.`.....C........"
      },
      {
        fragmentId: "FRAG-005",
        caseId: "CASE-1001",
        sourceId: source1001._id.toString(),
        offset: 0x00028000,
        size: 8192,
        fileType: "CODE",
        entropy: 4.88,
        md5: "e4da3b7fbbce2345d7772b0674a318d5",
        sha256: "3b0c44298fc1c149afbf4c8996fb9242",
        classificationConfidence: 0.95,
        previewHex: "23 20 3D 3D 3D 3D 3D 3D 3D 3D 3D 3D 3D 3D 3D 3D 0A 23 20 52 45 43 4F 4E 53 54 52 55 43 54 58 20",
        previewAscii: "# ==============..# RECONSTRUCTX "
      },
      {
        fragmentId: "FRAG-006",
        caseId: "CASE-1001",
        sourceId: source1001._id.toString(),
        offset: 0x00035000,
        size: 16384,
        fileType: "DATA",
        entropy: 5.12,
        md5: "1679091c5a880faf6fb5e6087eb1b2dc",
        sha256: "5e884898da28047151d0e56f8dc62927",
        classificationConfidence: 0.93,
        previewHex: "54 72 61 6E 73 61 63 74 69 6F 6E 5F 49 44 2C 54 69 6D 65 73 74 61 6D 70 2C 53 65 6E 64 65 72 5F",
        previewAscii: "Transaction_ID,Timestamp,Sender_"
      }
    ]);

    // 6. Create Topological Fragment Relationships
    console.log(`[ReconstructX Seed] Seeding fragment graph relationships...`);
    await models.FragmentRelationship.create([
      {
        caseId: "CASE-1001",
        fragmentA: "FRAG-001",
        fragmentB: "FRAG-002",
        byteSimilarity: 0.92,
        sequenceCompatibility: 0.96,
        metadataCompatibility: 0.95,
        overallConfidence: 0.94,
        reason: "PDF Header / Catalog stream references FlateDecode compressed object block at offset +0x3000."
      },
      {
        caseId: "CASE-1001",
        fragmentA: "FRAG-002",
        fragmentB: "FRAG-003",
        byteSimilarity: 0.89,
        sequenceCompatibility: 0.94,
        metadataCompatibility: 0.98,
        overallConfidence: 0.93,
        reason: "Object stream terminates cleanly into trailer xref catalog table with valid root cross-reference."
      }
    ]);

    // 7. Create Recovered Files across all major format categories
    console.log(`[ReconstructX Seed] Seeding recovered files across all 6 forensic format categories...`);
    await models.RecoveredFile.create([
      {
        caseId: "CASE-1001",
        filename: "case_1001_evidence_report.pdf",
        fileType: "PDF",
        fragmentIds: ["FRAG-001", "FRAG-002", "FRAG-003"],
        recoveredSize: 28672,
        estimatedOriginalSize: 28672,
        completeness: 100,
        confidence: 96,
        status: "FULLY_RECOVERED",
        sha256: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
        md5: "8b1a9953c4611296a827abf8c47804d7",
        outputPath: "storage/files/case_1001_evidence_report.pdf",
        aiExplanation: "Deconstructed 3 non-contiguous PDF stream clusters. Successfully synthesized catalog dictionary and resolved xref trailer.",
        createdAt: new Date(Date.now() - 3 * 86400000)
      },
      {
        caseId: "CASE-1001",
        filename: "forensic_carved_image.jpg",
        fileType: "JPEG",
        fragmentIds: ["FRAG-004"],
        recoveredSize: 45056,
        estimatedOriginalSize: 45056,
        completeness: 100,
        confidence: 97,
        status: "FULLY_RECOVERED",
        sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        md5: "a87ff679a2f3e71d9181a67b7542122c",
        outputPath: "storage/files/forensic_carved_image.jpg",
        aiExplanation: "Direct neural signature carve from sector offset 0x00012000. Verified JFIF APP0 marker and SOS entropy stream.",
        createdAt: new Date(Date.now() - 3 * 86400000)
      },
      {
        caseId: "CASE-1001",
        filename: "decompiled_exploit.py",
        fileType: "CODE",
        fragmentIds: ["FRAG-005"],
        recoveredSize: 8192,
        estimatedOriginalSize: 8192,
        completeness: 100,
        confidence: 95,
        status: "FULLY_RECOVERED",
        sha256: "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
        md5: "e4da3b7fbbce2345d7772b0674a318d5",
        outputPath: "storage/files/decompiled_exploit.py",
        aiExplanation: "Clean Python source code fragment reassembled from raw block. Zero syntax errors detected during AST compilation test.",
        createdAt: new Date(Date.now() - 2 * 86400000)
      },
      {
        caseId: "CASE-1001",
        filename: "raw_transaction_log.csv",
        fileType: "CSV",
        fragmentIds: ["FRAG-006"],
        recoveredSize: 16384,
        estimatedOriginalSize: 16384,
        completeness: 100,
        confidence: 93,
        status: "FULLY_RECOVERED",
        sha256: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
        md5: "1679091c5a880faf6fb5e6087eb1b2dc",
        outputPath: "storage/files/raw_transaction_log.csv",
        aiExplanation: "Delimited financial ledger table with verified column consistency across 5 complete transaction records.",
        createdAt: new Date(Date.now() - 2 * 86400000)
      },
      {
        caseId: "CASE-1001",
        filename: "sqlite_vault_dump.json",
        fileType: "JSON",
        fragmentIds: ["FRAG-006"],
        recoveredSize: 12400,
        estimatedOriginalSize: 12400,
        completeness: 100,
        confidence: 94,
        status: "FULLY_RECOVERED",
        sha256: "8b1a9953c4611296a827abf8c47804d78b1a9953c4611296a827abf8c47804d7",
        md5: "c4ca4238a0b923820dcc509a6f75849b",
        outputPath: "storage/files/sqlite_vault_dump.json",
        aiExplanation: "Valid JSON structured vault dump extracted from SQLite B-Tree leaf pages.",
        createdAt: new Date(Date.now() - 1 * 86400000)
      }
    ]);

    // 8. Create Analysis Jobs
    console.log(`[ReconstructX Seed] Seeding 8-stage pipeline jobs...`);
    await models.AnalysisJob.create({
      caseId: "CASE-1001",
      sourceId: source1001._id.toString(),
      currentStage: "Forensic Validation",
      progress: 100,
      status: "COMPLETED",
      stages: [
        { name: "Bitstream Acquisition", status: "DONE", details: "Acquired 100MB RAW sector image." },
        { name: "Entropy Profiling", status: "DONE", details: "Shannon entropy mapped across 204,800 sectors." },
        { name: "Signature Carving", status: "DONE", details: "Matched 12 distinct file type headers." },
        { name: "Graph Clustering", status: "DONE", details: "Topological node graph established with 94.2% average edge weight." },
        { name: "Candidate Assembly", status: "DONE", details: "Stitched non-contiguous clusters." },
        { name: "Structural Repair", status: "DONE", details: "Synthesized corrupt/missing PDF xref tables and JFIF markers." },
        { name: "Integrity Verification", status: "DONE", details: "All SHA-256 signatures validated." },
        { name: "Custody Report Generation", status: "DONE", details: "Immutable forensic dossier issued." }
      ],
      startedAt: new Date(Date.now() - 4 * 86400000),
      completedAt: new Date(Date.now() - 4 * 86400000 + 120000)
    });

    // 9. Create Immutable Audit Logs
    console.log(`[ReconstructX Seed] Seeding chain-of-custody audit logs...`);
    await models.AuditLog.create([
      {
        caseId: "CASE-1001",
        event: "Evidence Image Acquired",
        user: vance.name,
        description: "Ingested evidence_disk_obsidian_nvme.raw (100 MB) with SHA-256 verification.",
        ipAddress: "192.168.1.104",
        timestamp: new Date(Date.now() - 5 * 86400000)
      },
      {
        caseId: "CASE-1001",
        event: "Neural Carve Triggered",
        user: vance.name,
        description: "8-stage recovery pipeline executed across all damaged NTFS clusters.",
        ipAddress: "192.168.1.104",
        timestamp: new Date(Date.now() - 4 * 86400000)
      },
      {
        caseId: "CASE-1001",
        event: "Reconstruction Verified",
        user: vance.name,
        description: "5 files cryptographically recovered with average confidence 95.0%.",
        ipAddress: "192.168.1.104",
        timestamp: new Date(Date.now() - 3 * 86400000)
      },
      {
        caseId: "CASE-1004",
        event: "Case Initialized",
        user: elena.name,
        description: "Maritime incident dossier created for container vessel blackbox.",
        ipAddress: "192.168.1.1",
        timestamp: new Date(Date.now() - 1 * 86400000)
      }
    ]);

    // 10. Create System Notifications
    console.log(`[ReconstructX Seed] Seeding forensic notifications...`);
    await models.Notification.create([
      {
        title: "Reconstruction Complete: CASE-1001",
        message: "5 multi-format files successfully reassembled with 95% average confidence.",
        type: "SUCCESS",
        caseId: "CASE-1001",
        read: false,
        createdAt: new Date(Date.now() - 2 * 86400000)
      },
      {
        title: "New Evidence Node Mounted",
        message: "NODE-01 operational at 100% throughput.",
        type: "INFO",
        caseId: "CASE-1001",
        read: true,
        createdAt: new Date(Date.now() - 4 * 86400000)
      }
    ]);

    console.log(`[ReconstructX Seed] SUCCESS: Database re-created and seeded properly with clean, multi-tenant forensic data!`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error(`[ReconstructX Seed] ERROR:`, err);
    process.exit(1);
  }
};

seedDatabase();
