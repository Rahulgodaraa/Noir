"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function ProductSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const value = searchParams.get("q") || "";

  const onChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    val ? params.set("q", val) : params.delete("q");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search products..."
      className="
        w-full max-w-md mx-auto block mb-12
        bg-black border border-[#333]
        px-4 py-3 text-sm
        focus:outline-none focus:border-[#d4af37]
      "
    />
  );
}
