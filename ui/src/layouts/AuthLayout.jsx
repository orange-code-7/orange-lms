import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import logo from "@/assets/ORANGECODE LOGO-FULL COLOUR LANDSCAPE.jpg";

const AuthLayout = () => {
  return (
    <div className="relative h-screen overflow-hidden bg-white">
      {/* Top Gradient */}
      <>
        <div
          className="
      absolute
      inset-0
      bg-gradient-to-b
      from-orange-500
      via-orange-200
      to-white
    "
        />

        <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-yellow-300/30 blur-3xl" />

        <div className="absolute top-10 right-0 h-96 w-96 rounded-full bg-orange-300/30 blur-3xl" />

        <div className="absolute left-1/2 top-40 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-200/40 blur-3xl" />
      </>

      {/* Glow */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-yellow-300/20 blur-3xl" />

      <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-orange-300/20 blur-3xl" />

      {/* Content */}
      <div className="relative flex h-full flex-col items-center justify-center px-4">
        {/* Logo */}
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="mb-8"
        >
          <img
            src={logo}
            alt="Orange LMS"
            className="h-24 w-auto rounded-xl bg-white p-2 shadow-lg"
          />
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.15,
          }}
          className="
            w-full
            max-w-md
            rounded-3xl
            border
            border-white/60
            bg-white/95
            p-8
            shadow-[0_20px_60px_rgba(0,0,0,0.12)]
            backdrop-blur-md
          "
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
