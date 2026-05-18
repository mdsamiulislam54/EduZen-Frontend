import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AnyFieldApi } from "@tanstack/react-form";

type Option = {
  label: string;
  value: string | number;
};

type AppSelectProps = {
  field: AnyFieldApi;
  label: string;
  options: Option[];
  className?: string;
};

const AppSelect = ({ field, label, options, className }: AppSelectProps) => {
  const firstError = field.state.meta.errors?.[0];

const error =
  field.state.meta.isTouched
    ? typeof firstError === "string"
      ? firstError
      : firstError?.message
    : undefined;


  return (
    <div className={cn("space-y-1.5", className)}>
      <Label className={cn(error && "text-destructive")}>
        {label}
      </Label>

      <select
        value={field.state.value ?? ""}
        onChange={(e) => {
          const val = e.target.value;
          const parsedValue = typeof options[0]?.value === "number" ? Number(val) : val;
          field.handleChange(parsedValue);
        }}
        onBlur={field.handleBlur}
        className={cn(
          "w-full rounded-md px-3 py-2 border transition-colors",

          // light mode
          "bg-white text-black border-gray-300",

          // dark mode
          "dark:bg-black dark:text-white dark:border-gray-900",

          // focus
          "focus:outline-none focus:ring-2 focus:ring-primary",

          // error
          error && "border-destructive focus:ring-destructive"
        )}
      >
        {/* <option value="">Select {label}</option> */}

        {options.map((opt) => (
          <option key={opt.value} value={opt.value ?? ""}>
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