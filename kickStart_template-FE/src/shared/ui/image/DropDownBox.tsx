interface DropDownProps {
  variant?: 'text' | 'box';
  isOpen?: boolean;
  className?: string;
}

export const DropDownBox: React.FC<DropDownProps> = ({
  variant = 'box',
  isOpen = false,
  className = '',
}) => {
  if (variant === 'text') {
    return <span className="text-lg">▼</span>;
  }

  return (
    <svg
      className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''} ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
};

// 편의를 위한 기본 export
export default DropDownBox;
