import { Loader2, LayoutDashboard } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <LayoutDashboard className="w-10 h-10 text-primary" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-card rounded-full flex items-center justify-center border-2 border-background">
            <Loader2 className="w-5 h-5 text-accent animate-spin" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-1">Loading Dashboard</h3>
        <p className="text-sm text-muted-foreground">Please wait a moment...</p>
      </div>
    </div>
  );
}
