import { cn } from "@/lib/utils";

interface OptionCardProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  delay?: number;
}

export function OptionCard({ label, selected, onClick, delay = 0 }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ animationDelay: `${delay}ms` }}
      className={cn(
        "w-full p-4 text-left rounded-lg border transition-all duration-300 animate-slide-up",
        "hover:border-foreground hover:bg-secondary/50",
        selected
          ? "border-foreground bg-secondary/30"
          : "border-border bg-transparent"
      )}
    >
      <span className="text-sm md:text-base font-light">{label}</span>
    </button>
  );
}
