export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-16 border-b flex items-center px-6">
        <span className="font-bold text-lg">GCBlog</span>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        GCBlog &copy; 2026
      </footer>
    </div>
  )
}
