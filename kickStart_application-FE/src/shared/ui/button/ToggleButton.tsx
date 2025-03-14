interface ToggleButtonProps {
  onClick?: (e: React.MouseEvent) => void;
  isRequired?: boolean;
}

export function ToggleButton(props: ToggleButtonProps) {
  const { onClick, isRequired } = props;

  return (
    <button
      onClick={onClick}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none  ${
        isRequired ? 'bg-purple-600' : 'bg-gray-200'
      }`}
      role="switch"
      aria-checked={isRequired}
      aria-label="필수 항목 설정"
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ease-in-out shadow ${
          isRequired ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}
