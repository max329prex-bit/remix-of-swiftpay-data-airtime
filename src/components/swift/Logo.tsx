import { Link } from "react-router-dom";
import boltIcon from "@/assets/swiftpay-bolt.png";

export function Logo({ className = "", showWordmark = true, size = 36 }: { className?: string; showWordmark?: boolean; size?: number }) {
  return (
    <Link to="/app" className={`inline-flex items-center gap-2 ${className}`}>
      <img
        src={boltIcon}
        alt="SwiftPay"
        style={{ width: size, height: size }}
        className="object-contain drop-shadow-[0_0_18px_hsl(var(--primary)/0.55)]"
      />
      {showWordmark && (
        <span className="font-display text-xl font-bold tracking-tight">
          Swift<span className="text-gradient">Pay</span>
        </span>
      )}
    </Link>
  );
}
