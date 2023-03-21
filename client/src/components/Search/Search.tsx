import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { useDebounce } from 'common/hooks/useDebounce';

import './Search.scss';

interface ISearchProps {
  onChange: (query: string) => void;
  className?: string;
  fullwidth?: boolean;
  placeholder?: string;
}

const Search = ({
  className,
  fullwidth,
  placeholder,
  onChange,
}: ISearchProps) => {
  const [inputValue, setInputValue] = useState('');

  const debouncedValue = useDebounce<string>(inputValue, 500);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const handleInputSubmit = useCallback(
    (value: string) => {
      // Leave only letters, digits, and spaces.
      const query = value.replace(/[^a-z\d\s"]+/gi, '');
      onChange(query);
    },
    [onChange]
  );

  useEffect(() => {
    handleInputSubmit(debouncedValue);
  }, [debouncedValue, handleInputSubmit]);

  return (
    <div
      className={classNames('search', className, {
        'search--fullwidth': fullwidth,
      })}
    >
      <input
        className="search__input"
        type="text"
        placeholder={placeholder}
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export { Search };
