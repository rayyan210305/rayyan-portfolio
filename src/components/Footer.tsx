export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-foreground/[0.06]">
      <div className="mx-auto max-w-4xl flex items-center justify-between">
        <p className="text-sm text-muted/50 font-mono">
          © 2026 Rayyan Mardhatillah. Built with Next.js
        </p>
        <a
          href="#"
          className="text-sm text-muted/50 hover:text-muted transition-colors"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
