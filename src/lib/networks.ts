export type NetworkId = "MTN" | "GLO" | "AIRTEL" | "9MOBILE";

export const NETWORKS: { id: NetworkId; name: string; color: string; bg: string; prefixes: string[]; logo: string }[] = [
  { id: "MTN", name: "MTN", color: "text-black", bg: "bg-yellow-400", logo: "MTN",
    prefixes: ["0803","0806","0703","0706","0813","0816","0810","0814","0903","0906","0913","0916"] },
  { id: "AIRTEL", name: "Airtel", color: "text-white", bg: "bg-red-600", logo: "Airtel",
    prefixes: ["0802","0808","0708","0812","0701","0902","0901","0907","0912"] },
  { id: "GLO", name: "Glo", color: "text-white", bg: "bg-green-600", logo: "Glo",
    prefixes: ["0805","0807","0705","0815","0811","0905","0915"] },
  { id: "9MOBILE", name: "9mobile", color: "text-white", bg: "bg-green-500", logo: "9M",
    prefixes: ["0809","0817","0818","0908","0909"] },
];

export function detectNetwork(phone: string): NetworkId | null {
  const p = phone.replace(/\D/g, "").replace(/^234/, "0");
  if (p.length < 4) return null;
  const prefix = p.slice(0, 4);
  return NETWORKS.find(n => n.prefixes.includes(prefix))?.id ?? null;
}

export const naira = (n: number) => new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(n);

export type DataBundle = {
  id: string; name: string; size: string; validity: string;
  price: number; provider_code: string; package_code: string;
};

// Real AidaPay packages (live prices)
export const DATA_BUNDLES: Record<NetworkId, DataBundle[]> = {
  MTN: [
    { id: "mtn-3.5gb-1d", name: "3.5GB (1 Day)", size: "3.5GB", validity: "1 day",   price: 985,  provider_code: "mtn-awuf-data", package_code: "PK-MTN-AWUF-NBVXJU" },
    { id: "mtn-4gb-2d",   name: "4GB (2 Days)",  size: "4GB",   validity: "2 days",  price: 1182, provider_code: "mtn-awuf-data", package_code: "PK-MTN-AWUF-PLKYJTR" },
    { id: "mtn-6gb-7d",   name: "6GB (7 Days)",  size: "6GB",   validity: "7 days",  price: 2460, provider_code: "mtn-awuf-data", package_code: "PK-MTN-AWUF-JNOD" },
    { id: "mtn-11gb-7d",  name: "11GB (7 Days)", size: "11GB",  validity: "7 days",  price: 3447, provider_code: "mtn-awuf-data", package_code: "PK-MTN-AWUF-XSBG" },
    { id: "mtn-20gb-7d",  name: "20GB (Weekly)", size: "20GB",  validity: "7 days",  price: 4925, provider_code: "mtn-awuf-data", package_code: "PK-MTN-AWUF-SB2CF" },
  ],
  AIRTEL: [
    { id: "airtel-2gb-2d", name: "2GB (2 Days)", size: "2GB", validity: "2 days", price: 595, provider_code: "airtel-awuf-data", package_code: "PK-AIRTEL-AWUF-1.5GB-BINGE" },
  ],
  GLO: [
    { id: "glo-750mb-1d", name: "750MB (1 Day)",  size: "750MB",  validity: "1 day",  price: 195,  provider_code: "gloawufdata", package_code: "glo-awuf-data-750mb" },
    { id: "glo-1.5gb-1d", name: "1.5GB (1 Day)",  size: "1.5GB",  validity: "1 day",  price: 290,  provider_code: "gloawufdata", package_code: "glo-awuf-data-1.5gb" },
    { id: "glo-2.5gb-2d", name: "2.5GB (2 Days)", size: "2.5GB",  validity: "2 days", price: 490,  provider_code: "gloawufdata", package_code: "glo-awuf-data-2.5gb" },
    { id: "glo-10gb-7d",  name: "10GB (7 Days)",  size: "10GB",   validity: "7 days", price: 1950, provider_code: "gloawufdata", package_code: "glo-awuf-data-10gb" },
  ],
  "9MOBILE": [],
};

export const ELECTRICITY_PROVIDERS = [
  { id: "ikedc",  name: "Ikeja Electric (IKEDC)",       aidapay_code: "ikedc"  },
  { id: "aedc",   name: "Abuja Electric (AEDC)",         aidapay_code: "aedc"   },
  { id: "eedc",   name: "Enugu Electric (EEDC)",         aidapay_code: "eedc"   },
  { id: "ibedc",  name: "Ibadan Electric (IBEDC)",       aidapay_code: "ibedc"  },
  { id: "bedc",   name: "Benin Electric (BEDC)",         aidapay_code: "bedc"   },
  { id: "phed",   name: "Port Harcourt Electric (PHED)", aidapay_code: "phed"   },
  { id: "jed",    name: "Jos Electric (JED)",            aidapay_code: "jed"    },
  { id: "kedco",  name: "Kano Electric (KEDCO)",         aidapay_code: "kedco"  },
  { id: "enugu",  name: "Enugu Distribution (EEDC)",     aidapay_code: "enugu"  },
  { id: "kaduna", name: "Kaduna Electric",               aidapay_code: "kaduna" },
];

export const CABLE_PROVIDERS = [
  { id: "dstv",      name: "DStv",      aidapay_code: "dstv"      },
  { id: "gotv",      name: "GOtv",      aidapay_code: "gotv"      },
  { id: "startimes", name: "StarTimes", aidapay_code: "startimes" },
];

export const CABLE_PACKAGES: Record<string, { id: string; name: string; price: number; aidapay_code: string }[]> = {
  dstv: [
    { id: "dstv-mobile",   name: "DStv Mobile",     price: 790,  aidapay_code: "ng_dstv_mobmaxi"  },
    { id: "dstv-fta-plus", name: "FTA Plus",         price: 1600, aidapay_code: "ng_dstv_ftaple36" },
    { id: "dstv-access",   name: "Access",           price: 2000, aidapay_code: "ng_dstv_acsse36"  },
  ],
  gotv: [
    { id: "gotv-smallie",   name: "GOtv Smallie",  price: 1900, aidapay_code: "ng_gotv_gohan"    },
    { id: "gotv-jinja",     name: "GOtv Jinja",    price: 3900, aidapay_code: "ng_gotv_gotvnj1"  },
    { id: "gotv-quarterly", name: "Smallie Qtrly", price: 5100, aidapay_code: "ng_gotv_golite"   },
  ],
  startimes: [
    { id: "st-nova-daily",    name: "Nova Daily (Dish)",     price: 150, aidapay_code: "nova-dish-daily" },
    { id: "st-nova-antenna",  name: "Nova Daily (Antenna)",  price: 150, aidapay_code: "nova-daily"      },
    { id: "st-classic-daily", name: "Classic Daily",         price: 320, aidapay_code: "classic-daily"   },
  ],
};
