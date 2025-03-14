interface EyeButtonProps {
  onClick?: (e: React.MouseEvent) => void;
}

export function EyeButton(props: EyeButtonProps) {
  const { onClick } = props;

  return (
    <button
      type="button"
      title="preview my formSection page"
      className="mx-auto w-9 h-9 hover:bg-gray-50 flex items-center justify-center"
      onClick={onClick}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="text-gray-600"
        fill="none"
        stroke="currentColor"
      >
        <path
          d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="12"
          r="3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
