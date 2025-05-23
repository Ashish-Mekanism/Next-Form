import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "./footer";

const duration = 0.3;

const variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: duration,
      delay: duration,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: duration },
  },
};

const Layout = ({ children, location }) => (
  <>
    <Nav />
    <div>
      <AnimatePresence>
        <motion.main
          key={location.pathname}
          variants={variants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  </>
);

export default Layout;
