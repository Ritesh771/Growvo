import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  );
};

export default Home;