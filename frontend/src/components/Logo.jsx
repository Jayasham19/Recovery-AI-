import React from 'react';

export default function Logo({ className = "w-6 h-6", textClassName = "text-base", showText = true }) {
  return (
    <div className="flex items-center gap-2.5 font-mono select-none">
      {/* Dynamic ReconstructX Hex/Constellation Node Logo in Coral */}
      <svg 
        className={className} 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer connection links */}
        <path d="M8 12L20 6L32 12L32 28L20 34L8 28Z" stroke="#FF5733" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Core nodes */}
        <circle cx="8" cy="12" r="3" fill="#FF5733" />
        <circle cx="20" cy="6" r="3" fill="#FF5733" />
        <circle cx="32" cy="12" r="3" fill="#FF5733" />
        <circle cx="32" cy="28" r="3" fill="#FF5733" />
        <circle cx="20" cy="34" r="3" fill="#FF5733" />
        <circle cx="8" cy="28" r="3" fill="#FF5733" />

        {/* Central reassembly cross connection */}
        <path d="M20 6V34" stroke="#FF5733" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M8 20H32" stroke="#FF5733" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="4" fill="#FFFFFF" />
      </svg>

      {showText && (
        <span className={`font-bold tracking-tight text-white ${textClassName}`}>
          RECONSTRUCTX<span className="text-coral">.IO</span>
        </span>
      )}
    </div>
  );
}
