import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
export function NotFoundPage() {
  return <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1><p className="text-muted-foreground">The page you’re looking for doesn’t exist.</p><Button asChild={true}><Link to="/">Back to dashboard</Link></Button></section>;
}