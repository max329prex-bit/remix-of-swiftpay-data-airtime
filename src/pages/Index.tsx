import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logoFull from "@/assets/swiftpay-logo-full.png";
import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const nav = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    const t = setTimeout(() => {
      nav(user ? "/app" : "/auth", { replace: true });
    }, 1600);
    return () => clearTimeout(t);
  }, [user, loading, nav]);

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-background">
      {/* Aurora glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-aurora" />
      <motion.div
        className="absolute h-80 w-80 rounded-full bg-primary/30 blur-[120px]"
        animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.img
          src={logoFull}
          alt="SwiftPay"
          className="w-56 drop-shadow-[0_20px_60px_hsl(var(--primary)/0.55)]"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-muted-foreground"
        >
          <span className="h-px w-6 bg-gradient-to-r from-transparent to-primary" />
          Pay at the speed of light
          <span className="h-px w-6 bg-gradient-to-l from-transparent to-primary" />
        </motion.div>
      </motion.div>
    </div>
  );
}
