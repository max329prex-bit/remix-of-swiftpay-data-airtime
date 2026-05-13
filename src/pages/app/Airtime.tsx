import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { detectNetwork, naira, NETWORKS, NetworkId } from "@/lib/networks";
import { useWallet } from "@/hooks/useWallet";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle2, X } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const NET_COLORS: Record<NetworkId, string> = { MTN: "bg-yellow-400 text-black", AIRTEL: "bg-red-600 text-white", GLO: "bg-green-600 text-white", "9MOBILE": "bg-green-500 text-white" };
const QUICK = [50, 100, 200, 500, 1000, 2000];
type Step = "form" | "pin";

export default function Airtime() {
  const [phone, setPhone] = useState(""); const [network, setNetwork] = useState<NetworkId>("MTN"); const [phoneOk, setPhoneOk] = useState(false);
  const [amount, setAmount] = useState(0); const [pin, setPin] = useState(""); const [step, setStep] = useState<Step>("form"); const [busy, setBusy] = useState(false);
  const { balance, refresh } = useWallet(); const nav = useNavigate(); const net = NETWORKS.find(n => n.id === network)!;

  useEffect(() => { const d = detectNetwork(phone); if (d) { setNetwork(d); setPhoneOk(phone.replace(/\D/g, "").length === 11); } else setPhoneOk(false); }, [phone]);

  async function pay() {
    if (pin.length < 4) return toast.error("Enter 4-digit PIN");
    if (amount < 50) return toast.error("Min ₦50");
    if (amount > balance) return toast.error("Insufficient balance");
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("vtu-purchase", {
        body: { type: "airtime", network, phone, amount, pin }
      });
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || "Purchase failed");
      refresh();
      nav(`/app/success?ref=${data.reference}&type=airtime&amount=${amount}&network=${network}`);
    } catch (e: any) { toast.error(e.message ?? "Failed"); }
    finally { setBusy(false); }
  }

  return (
    <div className="space-y-4 pb-10">
      <div className="flex items-center gap-3">
        <button onClick={() => nav("/app")} className="grid h-9 w-9 place-items-center rounded-full glass"><ArrowLeft className="h-4 w-4" /></button>
        <h1 className="font-display text-xl font-semibold">Buy Airtime</h1>
        <div className={`ml-auto h-10 w-10 rounded-xl ${NET_COLORS[network]} flex items-center justify-center font-bold text-xs`}>{net.name}</div>
      </div>
      <div className="flex items-center justify-between rounded-2xl glass p-4">
        <div><div className="text-xs text-muted-foreground">Balance</div><div className="font-display text-lg font-bold">{naira(balance)}</div></div>
        <Button size="sm" variant="outline" onClick={() => nav("/app/wallet")} className="text-xs">Top Up</Button>
      </div>
      <AnimatePresence mode="wait">
        {step === "form" ? (
          <motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Phone Number</label>
              <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="080XXXXXXXX" inputMode="tel" className="h-12 rounded-xl bg-secondary/40" maxLength={11} />
              {phoneOk && <p className="text-xs text-primary">Network: {net.name}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Amount</label>
              <Input value={amount || ""} onChange={e => setAmount(Math.max(0, Number(e.target.value.replace(/\D/g, ""))))} placeholder="₦ 0" inputMode="numeric" className="h-14 rounded-2xl bg-secondary/40 text-lg font-semibold" />
              <div className="grid grid-cols-3 gap-2">
                {QUICK.map(v => (<button key={v} onClick={() => setAmount(v)} className={`rounded-xl border p-3 text-sm font-semibold transition ${amount === v ? "border-primary bg-primary/10" : "border-white/10 bg-white/[0.03] hover:bg-white/5"}`}>{naira(v)}</button>))}
              </div>
            </div>
            <Button disabled={!phoneOk || amount < 50 || amount > balance} onClick={() => setStep("pin")} className="w-full h-12 rounded-xl" variant="hero">Continue</Button>
          </motion.div>
        ) : (
          <motion.div key="pin" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            <div className="rounded-2xl glass p-4 space-y-1">
              <div className="text-xs text-muted-foreground">Confirm purchase</div>
              <div className="font-display text-xl font-bold">{naira(amount)} Airtime</div>
              <div className="text-sm text-muted-foreground">{net.name} → {phone}</div>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Transaction PIN</label>
              <InputOTP maxLength={4} value={pin} onChange={setPin}><InputOTPGroup>{[0,1,2,3].map(i => <InputOTPSlot key={i} index={i} />)}</InputOTPGroup></InputOTP>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => { setStep("form"); setPin(""); }} className="flex-1 h-12 rounded-xl"><X className="h-4 w-4 mr-2" />Back</Button>
              <Button disabled={pin.length < 4 || busy} onClick={pay} className="flex-1 h-12 rounded-xl" variant="hero">
                {busy ? <span className="animate-pulse">Processing...</span> : <><CheckCircle2 className="h-4 w-4 mr-2" />Pay {naira(amount)}</>}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
