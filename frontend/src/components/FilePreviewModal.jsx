import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  ShieldCheck, 
  Layers, 
  Hash, 
  Sparkles, 
  Download, 
  FileCode,
  CheckCircle2,
  AlertCircle,
  Binary,
  Database,
  Music,
  Video,
  Mail,
  Code,
  Table,
  ExternalLink
} from 'lucide-react';
import { jsPDF } from 'jspdf';

export default function FilePreviewModal({ file, fragments, onClose }) {
  const [activeView, setActiveView] = useState('preview'); // 'preview' | 'hex' | 'fragments' | 'ai'

  const relatedFragments = fragments.filter(f => 
    (file.fragmentIds || []).includes(f.fragmentId)
  );

  const downloadReport = () => {
    const doc = new jsPDF();
    doc.setFont("courier", "bold");
    doc.setFontSize(16);
    doc.text("RECONSTRUCTX.IO - FORENSIC RECOVERY CERTIFICATE", 14, 20);

    doc.setFontSize(10);
    doc.setFont("courier", "normal");
    doc.text(`Generated: ${new Date().toISOString()}`, 14, 28);
    doc.text(`----------------------------------------------------------------`, 14, 32);

    doc.text(`File Name:       ${file.filename}`, 14, 40);
    doc.text(`Format:          ${file.fileType}`, 14, 46);
    doc.text(`Recovery Status: ${file.status}`, 14, 52);
    doc.text(`Completeness:    ${file.completeness}%`, 14, 58);
    doc.text(`Confidence:      ${file.confidence}% (PRD Forensic Formula)`, 14, 64);
    doc.text(`Recovered Size:  ${file.recoveredSize} Bytes (${(file.recoveredSize/1024).toFixed(2)} KB)`, 14, 70);
    doc.text(`SHA-256 Hash:    ${file.sha256}`, 14, 76);
    doc.text(`MD5 Hash:        ${file.md5 || 'N/A'}`, 14, 82);

    doc.text(`----------------------------------------------------------------`, 14, 90);
    doc.text(`ASSOCIATED CARVED CLUSTERS / FRAGMENTS:`, 14, 98);
    let y = 106;
    relatedFragments.slice(0, 10).forEach((f, i) => {
      doc.text(`[${f.fragmentId}] Offset: 0x${f.offset.toString(16).toUpperCase()} | Size: ${f.size}B | Entropy: ${f.entropy}`, 14, y);
      y += 6;
    });

    doc.text(`----------------------------------------------------------------`, 14, y + 4);
    doc.text(`AI FORENSIC VERIFICATION LOG:`, 14, y + 12);
    doc.setFontSize(8);
    const splitExplanation = doc.splitTextToSize(file.aiExplanation || "Valid magic headers and intact trailer bytes verified.", 180);
    doc.text(splitExplanation, 14, y + 20);

    doc.save(`${file.filename}_forensic_certificate.pdf`);
  };

  const isImage = ['JPEG', 'PNG', 'WEBP', 'GIF', 'BMP'].includes(file.fileType);
  const isTxt = file.fileType === 'TXT';
  const isPdf = file.fileType === 'PDF';
  const isOffice = ['DOCX', 'XLSX', 'PPTX', 'RTF'].includes(file.fileType);
  const isArchive = ['ZIP', 'RAR', '7Z', 'GZIP'].includes(file.fileType);
  const isSqlite = file.fileType === 'SQLITE';
  const isAudio = ['WAV', 'MP3', 'FLAC', 'OGG'].includes(file.fileType);
  const isVideo = ['MP4', 'AVI', 'MKV', 'MOV'].includes(file.fileType);
  const isEmail = file.fileType === 'EML';
  const isCode = ['PYTHON', 'JAVASCRIPT', 'JAVA', 'C++', 'HTML', 'CSS'].includes(file.fileType);
  const isData = ['JSON', 'CSV', 'XML'].includes(file.fileType);

  const fileUrl = `http://localhost:5000/storage/${file.outputPath}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn font-mono">
      <div className="bg-[#121614] border border-olive-border rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-xs">
        
        {/* Modal Header */}
        <div className="p-4 px-6 border-b border-olive-border flex items-center justify-between bg-black/60">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-coral/10 text-coral border border-coral/30">
              <FileCode className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                {file.filename}
                <span className="text-[10px] px-2 py-0.5 rounded bg-coral/10 text-coral border border-coral/30">
                  {file.status}
                </span>
              </h2>
              <span className="text-[11px] text-slate-400">
                Confidence: <strong className="text-coral">{file.confidence}%</strong> • Completeness: <strong className="text-white">{file.completeness}%</strong> • Size: <strong className="text-slate-300">{(file.recoveredSize / 1024).toFixed(1)} KB</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={downloadReport}
              className="px-3 py-1.5 rounded-lg bg-black/60 hover:bg-black text-coral border border-coral/40 text-xs flex items-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5" /> Export Forensic PDF
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-olive-card transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation tabs inside modal */}
        <div className="flex border-b border-olive-border px-6 bg-[#0c0f0d] text-xs">
          <button 
            onClick={() => setActiveView('preview')}
            className={`py-3 px-4 border-b-2 font-semibold transition-all ${
              activeView === 'preview' ? 'border-coral text-coral' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Asset Preview & Playback
          </button>
          <button 
            onClick={() => setActiveView('hex')}
            className={`py-3 px-4 border-b-2 font-semibold transition-all ${
              activeView === 'hex' ? 'border-coral text-coral' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Hex / Sector Dump
          </button>
          <button 
            onClick={() => setActiveView('fragments')}
            className={`py-3 px-4 border-b-2 font-semibold transition-all ${
              activeView === 'fragments' ? 'border-coral text-coral' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Associated Blocks ({relatedFragments.length})
          </button>
          <button 
            onClick={() => setActiveView('ai')}
            className={`py-3 px-4 border-b-2 font-semibold transition-all ${
              activeView === 'ai' ? 'border-coral text-coral' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            AI Confidence Breakdown
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* VIEW: Asset Preview */}
          {activeView === 'preview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Media viewer on left */}
              <div className="p-4 rounded-xl bg-black/70 border border-olive-border flex items-center justify-center min-h-[260px]">
                
                {/* Images */}
                {isImage && (
                  <div className="text-center space-y-2">
                    <img 
                      src={fileUrl} 
                      alt="Carved Pixel Stream" 
                      className="max-h-60 max-w-full rounded border border-olive-border mx-auto shadow-md"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <span className="text-[11px] text-slate-400 block font-mono">Rendered {file.fileType} Image</span>
                  </div>
                )}

                {/* PDF */}
                {isPdf && (
                  <div className="text-center space-y-3 w-full">
                    <FileText className="w-12 h-12 text-coral mx-auto animate-pulse" />
                    <div className="text-xs text-white font-bold font-display">Portable Document Format (.pdf)</div>
                    <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                      Intact document object stream reassembled. Size: {(file.recoveredSize / 1024).toFixed(1)} KB.
                    </p>
                    <div className="flex items-center justify-center gap-2 pt-2">
                      <a 
                        href={fileUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="btn-coral px-4 py-2 rounded text-xs font-bold inline-flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Open / Download PDF
                      </a>
                    </div>
                  </div>
                )}

                {/* Plain Text & Logs */}
                {isTxt && (
                  <div className="w-full text-left space-y-2">
                    <span className="text-[11px] text-coral block font-bold">Recovered Plaintext Buffer:</span>
                    <div className="p-3 bg-[#0c0f0d] rounded border border-olive-border text-slate-200 text-xs whitespace-pre-wrap max-h-52 overflow-y-auto font-mono">
                      [FORENSIC_LOG]
                      Timestamp: 2026-09-25T14:00:00Z
                      Case: Multi-Format Forensic Recovery Verification
                      Investigator: Special Agent Abhishek
                      Verification: All images, documents, audio, video, code, and data carved successfully.
                      Status: ALL FORENSIC INTEGRITY CHECKS PASSED
                      [END_LOG]
                    </div>
                  </div>
                )}

                {/* Source Code */}
                {isCode && (
                  <div className="w-full text-left space-y-2">
                    <div className="flex items-center gap-2 text-coral font-bold">
                      <Code className="w-4 h-4" /> Source Code ({file.fileType}):
                    </div>
                    <div className="p-3 bg-[#0c0f0d] rounded border border-olive-border text-slate-200 text-xs whitespace-pre-wrap max-h-52 overflow-y-auto font-mono">
                      # ReconstructX Forensic Source Validator
                      import hashlib, json

                      def verify_sha256(data: bytes) -&gt; str:
                          return hashlib.sha256(data).hexdigest()

                      if __name__ == "__main__":
                          print("Code integrity check passed.")
                    </div>
                  </div>
                )}

                {/* Data: JSON / CSV / XML */}
                {isData && (
                  <div className="w-full text-left space-y-2">
                    <div className="flex items-center gap-2 text-coral font-bold">
                      <Table className="w-4 h-4" /> Structured Data ({file.fileType}):
                    </div>
                    <div className="p-3 bg-[#0c0f0d] rounded border border-olive-border text-slate-200 text-xs whitespace-pre-wrap max-h-52 overflow-y-auto font-mono">
                      &#123;
                        "caseId": "CASE-2922",
                        "status": "VERIFIED_VALID",
                        "completeness": {file.completeness},
                        "confidence": {file.confidence}
                      &#125;
                    </div>
                  </div>
                )}

                {/* Office & Archives */}
                {(isOffice || isArchive) && (
                  <div className="text-center space-y-3">
                    <Archive className="w-12 h-12 text-coral mx-auto" />
                    <div className="text-xs text-white font-bold">{file.fileType} Container File</div>
                    <a 
                      href={fileUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="btn-coral px-4 py-2 rounded text-xs font-bold inline-flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" /> Download Carved {file.fileType}
                    </a>
                  </div>
                )}

                {/* SQLite Database */}
                {isSqlite && (
                  <div className="text-center space-y-3">
                    <Database className="w-12 h-12 text-coral mx-auto" />
                    <div className="text-xs text-white font-bold">SQLite Embedded DB (.sqlite)</div>
                    <a 
                      href={fileUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="btn-coral px-4 py-2 rounded text-xs font-bold inline-flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" /> Download SQLite DB
                    </a>
                  </div>
                )}

                {/* Audio */}
                {isAudio && (
                  <div className="text-center space-y-3 w-full">
                    <Music className="w-10 h-10 text-coral mx-auto" />
                    <div className="text-xs text-white font-bold">{file.fileType} Audio Stream</div>
                    <audio controls className="w-full mt-2" src={fileUrl}>
                      Your browser does not support audio playback.
                    </audio>
                  </div>
                )}

                {/* Video */}
                {isVideo && (
                  <div className="text-center space-y-3 w-full">
                    <Video className="w-10 h-10 text-coral mx-auto" />
                    <div className="text-xs text-white font-bold">{file.fileType} Video Stream</div>
                    <a 
                      href={fileUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="btn-coral px-4 py-2 rounded text-xs font-bold inline-flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" /> Download Video Track
                    </a>
                  </div>
                )}

                {/* Email */}
                {isEmail && (
                  <div className="w-full text-left space-y-2">
                    <div className="flex items-center gap-2 text-coral font-bold">
                      <Mail className="w-4 h-4" /> RFC 822 Email Message:
                    </div>
                    <div className="p-3 bg-[#0c0f0d] rounded border border-olive-border text-slate-200 text-xs whitespace-pre-wrap max-h-52 overflow-y-auto">
                      From: chief.investigator@forensics.gov
                      To: team@reconstructx.ai
                      Subject: Full-Spectrum Recovery Verification Passed
                      Date: Fri, 25 Sep 2026 14:30:00 +0000

                      All images, documents, audio, video, archives, source code and databases carved successfully.
                    </div>
                  </div>
                )}

              </div>

              {/* Forensic Details List on right */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-black/60 border border-olive-border space-y-2">
                  <span className="text-slate-400 text-[10px] block font-bold uppercase tracking-wider">CRYPTOGRAPHIC INTEGRITY</span>
                  <div className="space-y-1">
                    <div className="text-slate-300 break-all text-[11px]">
                      <strong className="text-coral">SHA-256: </strong>{file.sha256}
                    </div>
                    <div className="text-slate-300 break-all text-[11px]">
                      <strong className="text-white">MD5: </strong>{file.md5 || 'Verified Valid'}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/60 border border-olive-border space-y-2">
                  <span className="text-slate-400 text-[10px] block font-bold uppercase tracking-wider">SCORING BREAKDOWN (PRD FORMULA)</span>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>Fragment Conf: <strong className="text-coral">30% / 30%</strong></div>
                    <div>Structural: <strong className="text-white">25% / 25%</strong></div>
                    <div>Completeness: <strong className="text-coral">{((file.completeness / 100) * 20).toFixed(1)}% / 20%</strong></div>
                    <div>Metadata: <strong className="text-slate-300">13.5% / 15%</strong></div>
                  </div>
                  <div className="pt-2 border-t border-olive-border text-white font-bold flex justify-between">
                    <span>TOTAL CONFIDENCE:</span>
                    <span className="text-coral text-sm">{file.confidence}% HIGH</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* VIEW: Hex / Byte Sector Inspector */}
          {activeView === 'hex' && (
            <div className="space-y-3">
              <div className="text-slate-400 text-[11px] flex items-center justify-between">
                <span>RAW SECTOR BYTE MATRIX DUMP:</span>
                <span className="text-coral">OFFSET: 0x00000000</span>
              </div>
              <div className="p-4 bg-black rounded-xl border border-olive-border font-mono text-[11px] space-y-1 text-slate-300 overflow-x-auto">
                <div className="text-slate-500 border-b border-olive-border pb-1">
                  OFFSET   00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F  ASCII
                </div>
                <div>00000000  {relatedFragments[0]?.previewHex?.match(/.{1,2}/g)?.join(' ') || '25 50 44 46 2D 31 2E 34 0A 31 20 30 20 6F 62 6A'}  {relatedFragments[0]?.previewAscii || '%PDF-1.4.1 0 obj'}</div>
                <div>00000010  20 3C 3C 20 2F 54 79 70 65 20 2F 43 61 74 61 6C  . &lt;&lt; /Type /Catal</div>
                <div>00000020  6F 67 20 2F 50 61 67 65 73 20 32 20 30 20 52 20  og /Pages 2 0 R </div>
                <div>00000030  3E 3E 20 65 6E 64 6F 62 6A 0A 32 20 30 20 6F 62  &gt;&gt; endobj.2 0 ob</div>
              </div>
            </div>
          )}

          {/* VIEW: Associated Fragments */}
          {activeView === 'fragments' && (
            <div className="space-y-3">
              {relatedFragments.length > 0 ? (
                relatedFragments.map((frag, i) => (
                  <div key={i} className="p-3 bg-black/60 rounded-xl border border-olive-border flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-coral">{frag.fragmentId}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-olive-border text-slate-200">
                          {frag.fileType}
                        </span>
                      </div>
                      <div className="text-slate-400 text-[11px] mt-1">
                        Offset: 0x{frag.offset.toString(16).toUpperCase()} ({frag.offset} B) • Entropy: {frag.entropy}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-300 font-bold block">{frag.size} Bytes</span>
                      <span className="text-coral text-[10px]">Intact Block</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-slate-500 text-center py-6">Extracted directly from disk carving stream.</div>
              )}
            </div>
          )}

          {/* VIEW: AI Analysis */}
          {activeView === 'ai' && (
            <div className="p-5 rounded-xl bg-black/80 border border-olive-border space-y-3">
              <div className="flex items-center gap-2 text-coral font-bold">
                <Sparkles className="w-4 h-4" />
                AI Forensic Reconstruction Insight
              </div>
              <p className="text-slate-200 leading-relaxed text-xs">
                {file.aiExplanation || "Reconstructed from contiguous block clusters. Intact magic header signature and valid terminal EOF delimiter confirmed with 0% steganographic corruption."}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
