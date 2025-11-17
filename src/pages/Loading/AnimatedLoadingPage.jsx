import React from "react";
import { motion } from "framer-motion";

const AnimatedLoadingPage = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-base-200">
      <motion.div
        className="w-20 h-20 rounded-full border-4 border-primary border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />

      <motion.p
        className="mt-6 text-xl font-semibold text-primary"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        Loading...
      </motion.p>

      <motion.div
        className="flex gap-2 mt-4"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
      >
        <div className="w-3 h-3 rounded-full bg-primary"></div>
        <div className="w-3 h-3 rounded-full bg-primary"></div>
        <div className="w-3 h-3 rounded-full bg-primary"></div>
      </motion.div>
    </div>
  );
};

export default AnimatedLoadingPage;
