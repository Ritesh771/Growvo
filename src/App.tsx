import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SinglePagePortfolio from "./pages/SinglePagePortfolio";
import Advertisement from "./components/Advertisement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Advertisement />
      <SinglePagePortfolio />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
