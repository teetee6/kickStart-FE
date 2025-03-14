interface TrashButtonProps {
  onClick?: (e: React.MouseEvent) => void;
}

export function TrashButton(props: TrashButtonProps) {
  const { onClick } = props;

  return (
    <button
      onClick={onClick}
      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
      aria-label="항목 삭제"
    >
      <span className="sr-only">삭제</span>
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M3 6h18"></path>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      </svg>
    </button>
  );
}
