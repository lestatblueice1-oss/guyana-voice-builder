interface GuyanaMapButtonProps {
  onClick: () => void;
}

export const GuyanaMapButton = ({ onClick }: GuyanaMapButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center p-2 hover:bg-primary-foreground/10 rounded-lg transition-all duration-200 hover:scale-105"
      aria-label="Open categories menu"
    >
      {/* Guyana Map Silhouette SVG */}
      <svg
        width="28"
        height="32"
        viewBox="0 0 100 120"
        fill="none"
        className="text-primary-foreground"
      >
        <path
          d="M15 20 L20 15 L35 12 L45 8 L55 10 L65 15 L75 18 L85 25 L88 35 L85 45 L82 55 L78 65 L75 75 L70 85 L65 90 L55 95 L45 98 L35 95 L25 90 L18 85 L12 75 L8 65 L6 55 L8 45 L10 35 L12 25 Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
        />
        {/* Add some internal details to make it more recognizable */}
        <circle cx="30" cy="40" r="2" fill="rgba(255,255,255,0.3)" />
        <circle cx="50" cy="35" r="1.5" fill="rgba(255,255,255,0.3)" />
        <circle cx="65" cy="50" r="1.5" fill="rgba(255,255,255,0.3)" />
      </svg>
    </button>
  );
};