import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import SinglePagePortfolio from "./pages/SinglePagePortfolio";
import NotFound from "./pages/NotFound";
import ScrollProgressBar from "./components/ScrollProgressBar";

function App() {
  return (
    <Router>
      <ScrollProgressBar />
      <Routes>
        <Route path="/" element={<SinglePagePortfolio />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
