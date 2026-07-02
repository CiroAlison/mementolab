// The MementoLab brush-spiral — the hand-painted swirl that forms the "O".
// Used both inside the wordmark and standalone (icon / favicon).

const SPIRAL_PATH =
  "M50 50 L50.4 49.22 L51.03 48.97 L51.82 49.07 L52.6 49.59 L53.18 50.5 L53.38 51.4 L53.31 52.41 L53.1 53.1 L52.52 54.11 L51.63 55 L50.45 55.68 L49.04 56.06 L48.01 56.12 L46.41 55.86 L45.35 55.45 L44.33 54.84 L42.97 53.58 L42.22 52.53 L41.4 50.68 L41.05 48.58 L41.1 47.11 L41.65 44.88 L42.77 42.77 L44.43 40.9 L45.81 39.87 L48.22 38.74 L50 38.31 L52.83 38.2 L54.75 38.52 L57.56 39.59 L59.3 40.7 L61.59 42.9 L62.83 44.69 L64.15 47.76 L64.62 50 L64.72 52.33 L64.18 55.87 L63.33 58.17 L61.37 61.37 L59.62 63.24 L56.43 65.53 L53.99 66.63 L50 67.54 L47.21 67.61 L43.01 66.88 L40.3 65.83 L36.56 63.44 L34.39 61.34 L31.77 57.55 L30.08 53.16 L29.54 50 L29.5 46.75 L30.42 41.89 L31.68 38.77 L34.5 34.5 L36.94 32.03 L41.33 29.07 L44.64 27.69 L50 26.62 L53.7 26.61 L59.23 27.72 L62.75 29.19 L67.57 32.43 L70.34 35.22 L73.63 40.21 L75.15 43.96 L76.31 50 L76.27 54.16 L74.98 60.35 L73.3 64.28 L69.64 69.64 L66.49 72.7 L60.91 76.33 L56.72 78 L50 79.23 L45.38 79.16 L38.53 77.68 L34.19 75.8 L28.3 71.7 L24.93 68.21 L20.97 62.03 L18.53 54.98 L17.85 50 L17.95 44.92 L19.62 37.42 L23.04 30.41 L26.23 26.23 L32.21 20.96 L36.86 18.27 L44.56 15.64 L50 14.92 L55.53 15.07 L63.7 16.92 L68.86 19.22 L75.84 24.16 L79.8 28.35 L84.43 35.74 L86.52 41.23 L88 50";

export function SpiralMark({
  className = "",
  color = "currentColor",
  title,
}: {
  className?: string;
  color?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      <path
        d={SPIRAL_PATH}
        fill="none"
        stroke={color}
        strokeWidth={9}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* piccole gocce di pittura, per il tocco "pennellato" */}
      <circle cx="86" cy="44" r="2.4" fill={color} />
      <circle cx="30" cy="70" r="1.6" fill={color} />
    </svg>
  );
}
