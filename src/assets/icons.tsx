// Icon components

type IconProps = {
  className?: string;
  style?: React.CSSProperties;
};


export function AddIcon({ className, style }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M11 3h2v8h8v2h-8v8h-2v-8H3v-2h8z" />
    </svg>
  );
}

export function ManageIcon({ className, style }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M4 4h16v2H4zm0 5h16v2H4zm0 5h10v2H4zm0 5h10v2H4z" />
      <circle cx="18" cy="16" r="3" />
      <path d="M18 14.5v3M16.5 16h3" />
    </svg>
  );
}


export function LoadTemplateIcon({ className, style }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M6 2h8l4 4v5h-2V7h-3V4H6v16h5v2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
      <path d="M14 13h6v2h-6v3l-4-4 4-4v3z" />
    </svg>
  );
}
