import { ExtensibleEventHandler } from '@shared/types';
import { FC, memo, useEffect, useRef, useState } from 'react';

interface IEditableDiv {
  textValue?: string;
  isEditableMode?: boolean;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
  onInput?: ExtensibleEventHandler;
  onBlur?: ExtensibleEventHandler;
  onFocus?: ExtensibleEventHandler;
  options?: {
    [key: string]: any;
  };
}

const EditableDivComponent: FC<IEditableDiv> = (props) => {
  const {
    textValue = '',
    isEditableMode = true,
    className,
    placeholder,
    multiline = true,
    onInput,
    onBlur,
    onFocus,
    options,
    ...rest
  } = props;
  const isInitialMount = useRef<boolean>(true);
  const [_isFocused, _setIsFocused] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement>(null);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newValue = e.currentTarget.innerText || '';

    onInput?.afterCallback?.(newValue);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const trimmedContent = e.currentTarget.innerText.trim();
    if (!trimmedContent) {
      e.currentTarget.innerHTML = ''; // <br>만 있는 경우 태그 제거
    }
    _setIsFocused(false);
    onBlur?.afterCallback?.();
  };

  const handleFocus = () => {
    _setIsFocused(true);
    onFocus?.afterCallback?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault(); // 엔터키 입력 방지
    }
  };

  useEffect(() => {
    if (isInitialMount.current && divRef.current) {
      if (textValue.length) {
        divRef.current.innerText = textValue;
      } else {
        divRef.current.innerHTML = ''; // 빈 값일 때 innerHTML 초기화
      }
      isInitialMount.current = false;
    }
  }, [textValue]);

  useEffect(() => {
    if (divRef.current && !divRef.current.innerText.trim()) {
      divRef.current.innerHTML = ''; // <br> 태그 제거
    }
  }, []);

  return (
    <div
      ref={divRef}
      contentEditable={isEditableMode}
      role="textbox"
      className={`${className} 
        ${_isFocused ? options?.style?.focused : options?.style?.unfocused}
      `}
      onInput={handleInput}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      suppressContentEditableWarning
      {...rest}
      {...{ placeholder }}
    />
  );
};

// true: 리렌더링 방지
// false: 리렌더링 수행
const propsAreEqual = (prevProps: IEditableDiv, nextProps: IEditableDiv) => {
  if (prevProps.textValue !== nextProps.textValue) {
    return false;
  }
  if (prevProps.className !== nextProps.className) {
    return false;
  }
  return true;
};

export const EditableDiv = memo(EditableDivComponent, propsAreEqual);
