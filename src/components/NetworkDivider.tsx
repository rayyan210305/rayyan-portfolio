"use client";

export default function NetworkDivider() {
  return (
    <div className="w-full flex items-center justify-center py-4 select-none" aria-hidden="true">
      <svg
        width="280"
        height="24"
        viewBox="0 0 280 24"
        fill="none"
        className="opacity-20"
      >
        {/* Connection lines */}
        <line x1="20" y1="12" x2="80" y2="12" stroke="#A78BFA" strokeWidth="0.5" />
        <line x1="80" y1="12" x2="140" y2="12" stroke="#60A5FA" strokeWidth="0.5" />
        <line x1="140" y1="12" x2="200" y2="12" stroke="#A78BFA" strokeWidth="0.5" />
        <line x1="200" y1="12" x2="260" y2="12" stroke="#60A5FA" strokeWidth="0.5" />

        {/* Nodes */}
        <circle cx="20"  cy="12" r="2" fill="#A78BFA" />
        <circle cx="80"  cy="12" r="1.5" fill="#60A5FA" />
        <circle cx="140" cy="12" r="3" fill="#A78BFA" />
        <circle cx="200" cy="12" r="1.5" fill="#60A5FA" />
        <circle cx="260" cy="12" r="2" fill="#A78BFA" />

        {/* Branch lines */}
        <line x1="140" y1="12" x2="110" y2="4"  stroke="#60A5FA" strokeWidth="0.3" />
        <line x1="140" y1="12" x2="170" y2="20" stroke="#A78BFA" strokeWidth="0.3" />
        <circle cx="110" cy="4"  r="1" fill="#60A5FA" opacity="0.6" />
        <circle cx="170" cy="20" r="1" fill="#A78BFA" opacity="0.6" />
      </svg>
    </div>
  );
}
