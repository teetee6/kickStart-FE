interface PlusButtonProps {
  onClick?: (e: React.MouseEvent) => void;
}

export function PlusButton(props: PlusButtonProps) {
  const { onClick } = props;

  return (
    <button
      type="button"
      title="add new section"
      className="mx-auto w-9 h-9 hover:bg-gray-50 flex items-center justify-center"
      onClick={onClick}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" className="text-gray-600">
        <path
          d="M12 6v12M6 12h12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
