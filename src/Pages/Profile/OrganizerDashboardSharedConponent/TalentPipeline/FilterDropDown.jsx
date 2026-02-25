import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const OPTIONS = ["Yesterday", "Last 7 Days", "Last Month", "Last Year", "Lifetime"];

export function FilterDropdown({
  value = "Last 7 Days",
  onChange = () => {},
  options = OPTIONS,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // close on outside click / ESC
  useEffect(() => {
    const onDocClick = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <span
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm hover:bg-slate-50"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {value}
        <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
      </span>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          <ul role="listbox" className="py-2 text-sm">
            {options.map((opt) => {
              const selected = opt === value;
              return (
                <li key={opt}>
                  <span
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      onChange(opt);
                      setOpen(false);
                    }}
                    className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-slate-50"
                  >
                    {/* bullet */}
                    <span
                      className={[
                        "inline-block h-4 w-4 rounded-full",
                        selected ? "bg-[#2800AE]" : "bg-slate-200",
                      ].join(" ")}
                    />
                    <span className="text-slate-800">{opt}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
