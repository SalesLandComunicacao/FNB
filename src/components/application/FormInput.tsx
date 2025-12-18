import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="text-sm font-light text-muted-foreground">
          {label}
        </label>
        <input
          ref={ref}
          className={cn(
            "w-full px-4 py-3 bg-transparent border rounded-lg transition-all duration-300",
            "placeholder:text-muted-foreground/50 focus:outline-none",
            "border-border focus:border-foreground",
            error && "border-destructive",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
