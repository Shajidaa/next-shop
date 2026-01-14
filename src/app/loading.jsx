import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-primary/20 rounded-full animate-pulse mx-auto mb-6"></div>
          <Loader2 className="w-12 h-12 text-primary animate-spin absolute top-4 left-1/2 -translate-x-1/2" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Loading</h2>
        <p className="text-muted-foreground">Please wait while we prepare your content...</p>
      </div>
    </div>
  );
}
