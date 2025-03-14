interface EtcButtonProps {
  onClick?: (e: React.MouseEvent) => void;
}

export function EtcButton(props: EtcButtonProps) {
  const { onClick } = props;

  return (
    <button
      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
      aria-label="더 많은 옵션"
      onClick={onClick}
    >
      <span className="sr-only">더보기</span>
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="1"></circle>
        <circle cx="19" cy="12" r="1"></circle>
        <circle cx="5" cy="12" r="1"></circle>
      </svg>
    </button>
  );
}
