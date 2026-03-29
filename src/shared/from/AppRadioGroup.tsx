import { AnyFieldApi } from "@tanstack/react-form";

type Option = {
  label: string;
  value: string;
};

type Props = {
  field: AnyFieldApi;
  label: string;
  options: Option[];
};

const AppRadioGroup = ({ field, label, options }: Props) => {
  const error =
    field.state.meta.isTouched && field.state.meta.errors?.[0];

  return (
    <div className="space-y-2">
      <p className="font-medium">{label}</p>

      <div className="flex gap-4">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2">
            <input
              type="radio"
              name={field.name}
              value={opt.value}
              checked={field.state.value === opt.value}
              onChange={() => field.handleChange(opt.value)}
              onBlur={field.handleBlur}
            />
            {opt.label}
          </label>
        ))}
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default AppRadioGroup;