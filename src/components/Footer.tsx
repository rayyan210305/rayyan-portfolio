export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/[0.04]">
      <div className="mx-auto max-w-4xl flex items-center justify-between">
        <p className="text-sm text-white/20 font-mono">
          © 2026 Rayyan Mardhatillah. Built with Next.js
        </p>
        <a
          href="#"
          className="text-sm text-white/20 hover:text-white/60 transition-colors"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
