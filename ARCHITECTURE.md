# ReconstructX — AI-Powered Data Recovery Intelligence
## Implementation Plan & Roadmap

### System Architecture
1. **Frontend (Vite + React + Tailwind + Lucide Icons + React Flow + Recharts)**
   - Futuristic dark-mode cyber forensic aesthetic (Cyan/Emerald/Violet glows, glassmorphism, crisp telemetry metrics).
   - Authentication (JWT login / register / demo guest access).
   - Case Management (Case listing, creation, classification, status).
   - Storage Source Acquisition (Evidence dropzone, real-time SHA-256 calculation, partition & sector inspection).
   - Live 8-Stage Recovery Pipeline Engine Visualizer.
   - Interactive Recovered Files Gallery & Inspector (Integrity score, hex preview, raw fragment list, side-by-side comparison).
   - Interactive React Flow Fragment Relationship Graph (Edge confidence weights, cluster inspection).
   - Forensic Audit Trail & Real-time Notification System.
   - Forensic PDF & Evidence Export generation.
   - AI Investigator Assistant & Recovery Explanations.

2. **Backend API (Node.js + Express + Mongoose + JWT + Multer + CORS)**
   - MongoDB Schemas: `User`, `Case`, `StorageSource`, `Fragment`, `FragmentRelationship`, `RecoveredFile`, `AnalysisJob`, `AuditLog`, `Notification`.
   - Streaming disk-image uploads with instant SHA-256 calculation.
   - Python Child Process orchestrator & recovery job manager with robust execution and fallback handling.
   - RESTful API endpoints for all case, evidence, recovery, and AI analytics workflows.

3. **Python Recovery Engine (`recovery-engine/`)**
   - High-throughput carving & parsing engine for `JPEG`, `PNG`, `PDF`, `DOCX`, `TXT`, `MP4`, `ZIP`, `SQLite`, etc.
   - Shannon entropy calculation, byte-frequency statistical analysis, block carving.
   - Fragment relationship & sequence compatibility scoring (entropy similarity, contiguous offset heuristics, header/footer matching).
   - Candidate order optimization & integrity analysis (JPEG SOF/SOS validation, PDF xref/trailer parsing, PNG chunk checksums).
   - Forensic confidence scoring formula:
     `30% Fragment + 25% Structure + 20% Completeness + 15% Metadata + 10% Content`.
   - Synthetic disk image generator CLI for instant realistic forensic evidence demo testing.
