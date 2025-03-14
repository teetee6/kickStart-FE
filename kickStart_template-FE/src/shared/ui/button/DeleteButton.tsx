interface DeleteButtonProps {
  onClick?: (e: React.MouseEvent) => void;
}

export function DeleteButton(props: DeleteButtonProps) {
  const { onClick } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
    >
      ×
    </button>
  );
}
