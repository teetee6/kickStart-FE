interface RadioBoxProps {
  variant?: 'text' | 'box';
  label?: string;
  name?: string;
  ariaLabel?: string;
  checked?: boolean;
  value?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelClassName?: string;
  inputClassName?: string;
  style?: React.CSSProperties;
  size?: 'sm' | 'md' | 'lg' | number;
}

export const RadioBox: React.FC<RadioBoxProps> = ({
  variant = 'box',
  label,
  name = `radio-${crypto.randomUUID().slice(0, 10)}`,
  ariaLabel,
  checked,
  value,
  onChange,
  labelClassName = '',
  inputClassName = '',
  size = 'md' as const,
}) => {
  if (variant === 'text') {
    return <span className="text-lg">○</span>;
  }

  const getSizeClasses = (size: RadioBoxProps['size']) => {
    if (typeof size === 'number') {
      return {
        wrapper: `w-${size} h-${size}`,
        indicator: `before:w-${Math.floor(size * 0.5)} before:h-${Math.floor(size * 0.5)}`,
      };
    }

    switch (size) {
      case 'sm':
        return {
          wrapper: 'w-4 h-4',
          indicator: 'before:w-2 before:h-2',
        };
      case 'lg':
        return {
          wrapper: 'w-8 h-8',
          indicator: 'before:w-4 before:h-4',
        };
      case 'md':
      default:
        return {
          wrapper: 'w-6 h-6',
          indicator: 'before:w-3 before:h-3',
        };
    }
  };

  const sizeClasses = getSizeClasses(size);

  return (
    <label
      className={`relative flex items-center cursor-pointer ${labelClassName}`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        aria-label={ariaLabel || label || 'Radio option'}
        className={`absolute opacity-0 cursor-pointer h-0 w-0 peer ${inputClassName}`}
      />
      <span
        className={`flex items-center justify-center ${sizeClasses.wrapper} border-2 border-gray-600 rounded-full 
          peer-checked:border-gray-600 
          relative before:absolute ${sizeClasses.indicator} before:bg-transparent 
          before:rounded-full before:transition-all before:duration-300 
          peer-checked:before:bg-gray-600`}
      />
    </label>
  );
};

export default RadioBox;
