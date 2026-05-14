import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import boltIcon from "@/assets/swiftpay-bolt.png";

export function Logo({ className = "", showWordmark = false, size = 36, spin = true }: { className?: string; showWordmark?: boolean; size?: number; spin?: boolean }) {
  return (
    <Link to="/app" className={`inline-flex items-center gap-2 ${className}`}>
      <motion.img
        src={boltIcon}
        alt="SwiftPay"
        style={{ width: size, height: size }}
        className="object-contain drop-shadow-[0_0_18px_hsl(var(--primary)/0.55)]"
        animate={spin ? { rotate: [0, 360] } : undefined}
        transition={spin ? { duration: 6, repeat: Infinity, ease: "linear" } : undefined}
      />
      {showWordmark && (
        <span className="font-display text-xl font-bold tracking-tight">
          Swift<span className="text-gradient">Pay</span>
        </span>
      )}
    </Link>
  );
}
