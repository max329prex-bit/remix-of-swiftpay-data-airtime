import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useWallet } from "@/hooks/useWallet";
import { naira } from "@/lib/networks";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Building2, Copy, RefreshCw } from "lucide-react";

export default function Wallet() {
  const { balance } = useWallet();
  const [account, setAccount] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadAccount(); }, []);

  async function loadAccount() {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("monnify-account", {});
      if (error) throw error;
      setAccount(data?.data);
    } catch (e: any) {
      toast.error(e.message || "Failed to load account details");
    } finally { setLoading(false); }
  }

  function copy(text: string, label: string) {
    navigator.clipboard.writeText(text).then(() => toast.success(`${label} copied!`));
  }

  return (
    <div className="space-y-5 pb-10">
      <div><h1 className="font-display text-2xl font-semibold">Wallet</h1></div>

      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-primary p-6 shadow-glow">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
        <div className="text-xs uppercase tracking-widest text-white/70">Available balance</div>
        <div className="mt-1 font-display text-4xl font-bold text-white">{naira(balance)}</div>
      </motion.div>

      <div className="space-y-3">
        <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Fund via bank transfer</div>
        {loading ? (
          <div className="rounded-2xl glass p-5 space-y-3 animate-pulse">
            <div className="h-4 w-32 bg-white/10 rounded" />
            <div className="h-8 w-48 bg-white/10 rounded" />
            <div className="h-4 w-40 bg-white/10 rounded" />
          </div>
        ) : account ? (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl glass p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Bank</div>
                <div className="font-semibold">{account.bank_name || "Wema Bank"}</div>
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Account Number</div>
              <div className="flex items-center gap-3">
                <span className="font-display text-2xl font-bold tracking-widest">{account.account_number}</span>
                <button onClick={() => copy(account.account_number, "Account number")}
                  className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition">
                  <Copy className="h-4 w-4 text-primary" />
                </button>
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-0.5">Account Name</div>
              <div className="font-medium text-sm">{account.account_name}</div>
            </div>
            <div className="rounded-xl bg-primary/5 border border-primary/20 p-3 text-xs text-muted-foreground leading-relaxed">
              💡 Transfer any amount to this account number. Your SwiftPay wallet balance will be updated <strong>instantly</strong> after the bank confirms the transfer.
            </div>
          </motion.div>
        ) : (
          <div className="rounded-2xl glass p-6 text-center space-y-3">
            <p className="text-sm text-muted-foreground">Could not load your virtual account</p>
            <button onClick={loadAccount}
              className="flex items-center gap-2 mx-auto text-sm text-primary hover:underline">
              <RefreshCw className="h-4 w-4" /> Try again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
