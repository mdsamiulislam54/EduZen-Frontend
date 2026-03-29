import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AnyFieldApi } from "@tanstack/react-form";

type Option = {
  label: string;
  value: string;
};

type AppSelectProps = {
  field: AnyFieldApi;
  label: string;
  options: Option[];
  className?: string;
};

const AppSelect = ({ field, label, options, className }: AppSelectProps) => {
  const error =
    field.state.meta.isTouched && field.state.meta.errors?.[0];

  return (
    <div className={cn("space-y-1.5", className)}>
      <Label className={cn(error && "text-destructive")}>
        {label}
      </Label>

      <select
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        className={cn(
          "w-full border px-3 py-2 rounded-md",
          error && "border-destructive"
        )}
      >
        <option value="">Select {label}</option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default AppSelect;