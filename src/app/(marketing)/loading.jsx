import { Loader2, ShoppingBag } from "lucide-react";

export default function MarketingLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <ShoppingBag className="w-12 h-12 text-primary/50" />
          </div>
          <Loader2 className="w-8 h-8 text-primary animate-spin absolute -bottom-2 -right-2" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Loading...</h2>
       
      </div>
    </div>
  );
}
