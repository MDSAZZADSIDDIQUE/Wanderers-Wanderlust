import React from "react";
import { motion, MotionConfig } from "framer-motion";

const Hero = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(janko-ferlic-sfL_QOnmy00-unsplash.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-50"></div>
      <div className="hero-content text-center text-neutral-content">
        <div>
          <h1 className="mb-5 text-8xl font-bold font max-md:text-7xl max-sm:text-5xl">
            Welcome to Wanderer's Wanderlust
          </h1>
          <p className="my-10 text-3xl max-sm:text-xl">
            Your passport to daily life's adventures!
          </p>
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="btn glass text-white hover:text-black"
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
