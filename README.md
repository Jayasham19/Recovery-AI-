# ReconstructX — AI-Powered Data Recovery Intelligence
### Modern Full-Stack Forensic Data Recovery & Reassembly System

---

## 🎯 Architecture Overview

ReconstructX is built to recover and reconstruct files from damaged, deleted, fragmented, or corrupted storage devices across multiple file types (JPEG, PNG, PDF, DOCX, TXT, MP4, SQLite, etc.).

```
                         USER / INVESTIGATOR
                                 │
                                 ▼
                   ┌───────────────────────────┐
                   │  React + Vite Frontend    │
                   │ (Tailwind + React Flow)   │
                   └─────────────┬─────────────┘
                                 │ REST API
                                 ▼
                   ┌───────────────────────────┐
                   │   Node.js / Express API   │
                   └─────────────┬─────────────┘
                                 │
             ┌───────────────────┴───────────────────┐
             ▼                                       ▼
    ┌─────────────────┐                     ┌─────────────────┐
    │     MongoDB     │                     │  File Storage   │
    │  Cases, Frags,  │                     │  Disk Images,   │
    │  Relationships  │                     │ Reconstructed   │
    └────────┬────────┘                     └─────────────────┘
             │
             ▼
    ┌───────────────────────────┐
    │  Python Recovery Engine   │
    │  (Carving, Entropy,       │
    │   Clustering & Scoring)   │
    └───────────────────────────┘
```

---

## 🚀 Key Implemented Features

1. **MongoDB Data Models**:
   - `User` (Investigators, Roles, Auth)
   - `Case` (Case IDs, Classification, Status)
   - `StorageSource` (Read-only disk images, SHA-256 integrity validation, sector counts)
   - `Fragment` (Offset, block size, entropy, MD5, SHA-256, hex previews)
   - `FragmentRelationship` (Byte similarity, sequence compatibility, metadata compatibility, overall confidence)
   - `RecoveredFile` (Reconstructed outputs, completeness, confidence, status)
   - `AnalysisJob` (Live 8-stage progress tracking)
   - `AuditLog` (Immutable forensic chain of custody)
   - `Notification` (Real-time forensic alerts)

2. **Python Forensic Recovery Engine (`recovery-engine/engine.py`)**:
   - Shannon entropy calculator ($0.0 - 8.0$)
   - Multi-signature magic number file carver (`JPEG`, `PNG`, `PDF`, `TXT`, `DOCX/ZIP`, `MP4`, `SQLite`)
   - Candidate fragment ordering & validation
   - PRD-weighted recovery confidence scoring:
     $$\text{Score} = 30\% \text{ Fragment} + 25\% \text{ Structure} + 20\% \text{ Completeness} + 15\% \text{ Metadata} + 10\% \text{ Content}$$
   - Synthetic disk image generator CLI for live offline test scenarios.

3. **Cyber-Forensic Frontend Experience (`frontend/`)**:
   - **Dashboard**: Telemetry metrics, format distribution donut chart, confidence bracket histograms, active case table.
   - **Case Management**: Create, assign, and audit forensic cases.
   - **Storage Sources**: Upload raw `.dd`/`.raw`/`.img` or generate synthetic forensic media with real-time SHA-256 verification.
   - **8-Stage Execution Visualizer**: Animated pipeline showing Acquisition $\rightarrow$ Carving $\rightarrow$ Relationship Mapping $\rightarrow$ Reconstruction $\rightarrow$ Integrity Validation.
   - **Interactive Fragment Relationship Graph**: Powered by React Flow with weighted edges and cluster inspection.
   - **Deep File Inspector & PDF Export**: Render recovered images/text and download forensic certificate reports.
   - **AI Forensic Assistant**: Queries on fragment clustering, integrity confidence, and steganography.

---

## 🛠️ How to Run

### 1. Start MongoDB (Default: `mongodb://localhost:27017/`)
```bash
mongod
```
*(If MongoDB service is offline, the backend uses its built-in in-memory fallback automatically).*

### 2. Start Backend API Server
```bash
cd backend
npm install
npm run dev
# Running on http://localhost:5000
```

### 3. Start Frontend Client
```bash
cd frontend
npm install
npm run dev
# Running on http://localhost:5173
```
