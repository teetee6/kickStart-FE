interface BackButtonProps {
  onClick?: (e: React.MouseEvent) => void;
}

export function BackButton(props: BackButtonProps) {
  const { onClick } = props;

  return (
    <button
      type="button"
      title="page back"
      onClick={onClick}
      className="p-2 hover:bg-gray-50 rounded-full"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path strokeWidth="2" strokeLinecap="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
}
