interface CopyButtonProps {
  onClick?: (e: React.MouseEvent) => void;
}

export function CopyButton(props: CopyButtonProps) {
  const { onClick } = props;

  return (
    <button
      onClick={onClick}
      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
      aria-label="항목 복사"
    >
      <span className="sr-only">복사</span>
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
    </button>
  );
}
