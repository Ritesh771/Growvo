import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="flex justify-center">
              <div className="w-full md:w-3/4 lg:w-2/3 text-center">
                <h2 className="text-3xl font-bold mb-4">About Us</h2>
                <p className="text-lg mb-4">
                  Transforming Ideas into Digital Reality
                </p>
                <p className="mb-4">
                  We are a dynamic tech company specializing in cutting-edge web
                  development, mobile applications, and AI/ML solutions. Our
                  passionate team of innovators is dedicated to creating
                  scalable, user-centric digital experiences that drive
                  real-world impact across education, healthcare, and
                  enterprise sectors.
                </p>
                <p className="mb-4">
                  Founded with a vision to bridge the gap between technology
                  and human needs, we combine technical expertise with creative
                  problem-solving to deliver exceptional results for our
                  clients worldwide. Explore our company website at{" "}
                  <a
                    href="http://stalight.tech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    stalight.tech
                  </a>
                  .
                </p>
                <p>
                  This platform serves as a freelancing hub where we connect
                  talented developers with exciting projects, much like a
                  modern freelancing website, enabling seamless collaboration
                  and innovation.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
