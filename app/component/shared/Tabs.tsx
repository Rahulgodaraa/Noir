import FilterTabs from "./FilterTabs";
import { useRouter, useSearchParams } from "next/navigation";

const TABS = [
  { label: "All", value: "all" },
  { label: "Perfumes", value: "perfume" },
  { label: "Candles", value: "candle" },
];

const router = useRouter();
const searchParams = useSearchParams();

const query = searchParams.get("q") || "";
const category = searchParams.get("category") || "all";

const updateParam = (key: string, value: string) => {
  const params = new URLSearchParams(searchParams.toString());
  value ? params.set(key, value) : params.delete(key);
  router.push(`?${params.toString()}`, { scroll: false });
};
