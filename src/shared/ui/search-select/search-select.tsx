'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Check, Loader2, X } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

const searchSelectVariants = cva(
  'flex w-full rounded-md border bg-neutral-50 px-3 py-2 text-sm ring-offset-neutral-50 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-8 text-xs',
        md: 'h-10',
        lg: 'h-12 text-base',
      },
      variant: {
        default: 'border-neutral-300 focus-visible:ring-primary-500',
        error: 'border-error-500 focus-visible:ring-error-500',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

export interface SearchSelectOption<T = any> {
  label: string;
  value: T;
  description?: string;
  displayLabel?: string; // Optional: what to show when selected (defaults to label)
}

export interface SearchSelectProps<T = any>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'value'>,
    VariantProps<typeof searchSelectVariants> {
  value?: T;
  onChange?: (value: T | null) => void;
  onSearchChange?: (query: string) => void;
  options?: SearchSelectOption<T>[];
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  loading?: boolean;
  error?: string | null;
  icon?: React.ReactNode;
  type?: 'classic' | 'compact';
  minSearchLength?: number;
  maxResults?: number;
  onSearch?: (query: string) => Promise<SearchSelectOption<T>[]>;
  clearable?: boolean;
  name?: string;
  required?: boolean;
}

const SearchSelect = React.forwardRef<HTMLDivElement, SearchSelectProps>(
  (
    {
      value,
      onChange,
      onSearchChange,
      options: staticOptions = [],
      placeholder = 'Select an option...',
      searchPlaceholder = 'Search...',
      disabled = false,
      loading = false,
      error,
      icon,
      type = 'compact',
      minSearchLength = 3,
      maxResults = 10,
      onSearch,
      clearable = true,
      className,
      size,
      variant,
      name,
      required,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedOption, setSelectedOption] = React.useState<SearchSelectOption | null>(null);
    const [dynamicOptions, setDynamicOptions] = React.useState<SearchSelectOption[]>([]);
    const [isSearching, setIsSearching] = React.useState(false);
    const [searchError, setSearchError] = React.useState<string | null>(null);

    const inputRef = React.useRef<HTMLInputElement>(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const debounceRef = React.useRef<NodeJS.Timeout | null>(null);

    const options = onSearch ? dynamicOptions : staticOptions;
    const displayOptions = options.slice(0, maxResults);

    React.useEffect(() => {
      if (value !== undefined && value !== null && value !== '') {
        const option = options.find((opt) => opt.value === value);
        if (!onSearch && option) {
          // setSelectedOption(option);
          setSearchQuery(option.label);
        } else if (onSearch) {
          setSearchQuery(value);
        }
      }
    }, []);

    // Find selected option when value changes
    React.useEffect(() => {
      if (value !== undefined && value !== null && value !== '') {
        const option = options.find((opt) => opt.value === value);
        setSelectedOption(option || null);
      } else {
        setSelectedOption(null);
      }
    }, [value, options]);

    // Handle search with debounce
    React.useEffect(() => {
      if (!onSearch || searchQuery.length < minSearchLength) {
        setDynamicOptions([]);
        setIsSearching(false);
        return;
      }

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      setIsSearching(true);
      setSearchError(null);

      debounceRef.current = setTimeout(async () => {
        try {
          const results = await onSearch(searchQuery);
          setDynamicOptions(results);
          setSearchError(null);
        } catch (err) {
          setSearchError(err instanceof Error ? err.message : 'Search failed');
          setDynamicOptions([]);
        } finally {
          setIsSearching(false);
        }
      }, 300);

      return () => {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }
      };
    }, [searchQuery, onSearch, minSearchLength]);

    // Handle click outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          inputRef.current &&
          !inputRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (option: SearchSelectOption) => {
      setSelectedOption(option);
      onChange?.(option.value);
      setIsOpen(false);
      setSearchQuery('');

      if (type === 'compact') {
        setSearchQuery(option.displayLabel || option.label);
      }
    };

    const handleClear = () => {
      setSelectedOption(null);
      onChange?.(null);
      setSearchQuery('');
      setDynamicOptions([]);
      inputRef.current?.focus();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value;
      setSearchQuery(newQuery);
      onSearchChange?.(newQuery);

      if (type === 'compact' && selectedOption) {
        setSelectedOption(null);
        onChange?.(null);
      }
    };

    const handleInputFocus = () => {
      setIsOpen(true);
    };

    const showLoading = loading || isSearching;
    const showError = error || searchError;
    const showClear = clearable && (searchQuery || selectedOption) && !disabled;

    const renderInput = () => (
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">{icon}</div>
        )}
        <input
          ref={inputRef}
          type="text"
          value={
            type === 'classic' && selectedOption ? selectedOption.displayLabel || selectedOption.label : searchQuery
          }
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={
            selectedOption && type === 'classic' ? selectedOption.displayLabel || selectedOption.label : placeholder
          }
          disabled={disabled}
          className={cn(
            searchSelectVariants({ size, variant }),
            icon && 'pl-10',
            (showLoading || showClear) && 'pr-10',
            className
          )}
          name={name}
          required={required}
          autoComplete="off"
          {...(type === 'classic' && selectedOption ? { readOnly: true } : {})}
        />
        {showLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-neutral-500" />
          </div>
        )}
        {showClear && !showLoading && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-900"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );

    const renderDropdown = () => {
      if (!isOpen) return null;

      const hasOptions = displayOptions.length > 0;
      const showSearchInput = type === 'classic';

      return (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 z-50 overflow-hidden rounded-md border border-neutral-200 bg-neutral-50 text-neutral-950shadow-md"
        >
          {showSearchInput && (
            <div className="border-b p-2">
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder={searchPlaceholder}
                className="w-full rounded-md border-0 bg-transparent px-2 py-1 text-sm outline-none placeholder:text-neutral-500 focus:ring-1 focus:ring-primary-500"
                autoFocus
              />
            </div>
          )}

          {showError && <div className="p-3 text-sm text-error-600">{showError}</div>}

          {!showError && !hasOptions && searchQuery.length >= minSearchLength && !showLoading && (
            <div className="p-3 text-sm text-neutral-500">No results found</div>
          )}

          {!showError && !hasOptions && searchQuery.length < minSearchLength && onSearch && (
            <div className="p-3 text-sm text-neutral-500">Type at least {minSearchLength} characters to search</div>
          )}

          {!showError && hasOptions && (
            <div className="max-h-60 overflow-y-auto">
              {displayOptions
                .filter((opt) => selectedOption || opt.label.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((option, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className="group relative flex w-full cursor-default select-none items-center px-3 py-2 text-sm outline-none hover:bg-neutral-100 focus:bg-neutral-100 transition-all duration-100"
                  >
                    {selectedOption?.value === option.value && <Check className="absolute left-2 h-4 w-4" />}
                    <div className={cn(selectedOption?.value === option.value && 'pl-6', 'w-full text-left')}>
                      <div className="font-medium">{option.label}</div>
                      {option.description && <div className="text-xs text-neutral-500">{option.description}</div>}
                    </div>
                  </button>
                ))}
            </div>
          )}
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className="relative"
        {...props}
      >
        {renderInput()}
        {renderDropdown()}
      </div>
    );
  }
);

SearchSelect.displayName = 'SearchSelect';

export { SearchSelect, searchSelectVariants };
