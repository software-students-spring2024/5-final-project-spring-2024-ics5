import React from "react";
import { motion } from "framer-motion";

const FadeInUpBox = ({ children, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }} // start state
      animate={{ opacity: 1, y: 0 }} // end state
      transition={{
        duration: 1.2,
        delay: delay,
        ease: [0.6, -0.05, 0.01, 0.99],
      }}
      exit={{
        opacity: 0,
        y: -10,
        transition: { duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] },
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInUpBox;
