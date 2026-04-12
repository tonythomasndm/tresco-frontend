import clsx from "clsx";

type LoaderProps = {
  className?: string;
  fullScreen?: boolean;
  label?: string;
  overlay?: boolean;
  showBrand?: boolean;
  size?: "sm" | "md" | "lg";
};

const ringSizeMap = {
  sm: "h-5 w-5 border-2",
  md: "h-10 w-10 border-[3px]",
  lg: "h-14 w-14 border-4",
} as const;

const Loader = ({
  className,
  fullScreen = false,
  label = "Loading...",
  overlay = false,
  showBrand = true,
  size = "md",
}: LoaderProps) => {
  const wrapperClassName = clsx(
    "flex flex-col items-center justify-center gap-4",
    fullScreen
      ? "min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),_transparent_32%),linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_45%,_#ffffff_100%)] px-6"
      : "py-2",
    overlay &&
      "absolute inset-0 z-20 rounded-[inherit] bg-white/80 backdrop-blur-sm",
    className,
  );

  return (
    <div className={wrapperClassName} role="status" aria-live="polite">
      <div className="relative flex items-center justify-center">
        <div
          className={clsx(
            "rounded-full border-[#0b1e43]/15 border-t-[#0b1e43] animate-spin",
            ringSizeMap[size],
          )}
        />
        <div className="absolute h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_24px_rgba(56,189,248,0.65)]" />
      </div>
      <div className="text-center">
        {showBrand && (
          <p
            className={clsx(
              "font-semibold tracking-[0.24em] text-[#0b1e43] uppercase",
              fullScreen ? "text-xl sm:text-2xl" : "text-sm",
            )}
          >
            Tresco
          </p>
        )}
        <p
          className={clsx(
            "text-slate-500",
            showBrand && "mt-1",
            fullScreen ? "text-lg sm:text-2xl font-medium" : "text-sm",
          )}
        >
          {label}
        </p>
      </div>
    </div>
  );
};

export default Loader;
