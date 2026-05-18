"use client";

import { useState } from "react";
import { AnyFieldApi } from "@tanstack/react-form";
import { ArrowBigDownIcon, ArrowDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type Option = {
  label: string;
  value: string;
};

type AppMultiSelectProps = {
  field: AnyFieldApi;
  label: string;
  options: Option[];
};

const AppMultiSelect = ({ field, label, options }: AppMultiSelectProps) => {
  const [open, setOpen] = useState(false);

  const value: string[] = field.state.value || [];

  const toggle = (val: string) => {
    if (value.includes(val)) {
      field.handleChange(value.filter((v) => v !== val));
    } else {
      field.handleChange([...value, val]);
    }
  };

  return (
    <div className="space-y-2 relative">
      <label className="text-sm font-medium">{label}</label>

      {/* Selected Box (Dropdown Trigger) */}
      <div
        onClick={() => setOpen(!open)}
        className=" relative border rounded-md px-3 py-2 min-h-[42px] cursor-pointer flex flex-wrap gap-2 z-9999 "
      >
        {value.length === 0 && (
          <span className="text-gray-400 text-sm">{label}</span>
        )}

        {value.map((val) => {
          const opt = options.find((o) => o.value === val);
          return (
            <Badge 
            
              key={val}
              className=" px-2 py-1 rounded text-sm"
            >
              {opt?.label}
            </Badge>
          );
        })}

        <span className="absolute top-2 right-2">
          <ArrowDown size={20}/>
        </span>
      </div>

      {/* Dropdown */}
      {open && (
        <div className=" border rounded-md overflow-y-scroll shadow">
          {options.map((opt) => {
            const isSelected = value.includes(opt.value);

            return (
              <div
                key={opt.value}
                onClick={() => toggle(opt.value)}
                className={cn(
                  "flex items-center justify-between px-3 py-2 cursor-pointer "
                )}
              >
                <span>{opt.label}</span>
                {isSelected && <Check size={16} />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AppMultiSelect;