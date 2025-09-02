'use client';

import { forwardRef, useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { SelectMenu, SelectMenuContent, SelectMenuItem, SelectMenuTrigger, SelectMenuValue } from '@/shared/ui/select';
import { cn } from '@/shared/lib/utils';

export interface TimePickerInputProps {
  value?: string;
  onChange?: (time: string) => void;
  placeholder?: string;
  disabled?: boolean;
  format?: '12' | '24';
  className?: string;
}

export const TimePickerInput = forwardRef<HTMLButtonElement, TimePickerInputProps>(
  ({ value, onChange, placeholder = 'Select time', disabled = false, format = '12', className }, ref) => {
    const [open, setOpen] = useState(false);
    const [hour, setHour] = useState<string>('');
    const [minute, setMinute] = useState<string>('');
    const [period, setPeriod] = useState<string>('AM');

    useEffect(() => {
      if (value) {
        const [time, periodFromValue] = value.split(' ');
        const [h, m] = time.split(':');

        if (format === '12') {
          setHour(h);
          setMinute(m);
          setPeriod(periodFromValue || 'AM');
        } else {
          setHour(h);
          setMinute(m);
        }
      }
    }, [value, format]);

    const updateTime = (newHour: string, newMinute: string, newPeriod: string) => {
      if (newHour && newMinute) {
        const timeString = format === '12' ? `${newHour}:${newMinute} ${newPeriod}` : `${newHour}:${newMinute}`;
        onChange?.(timeString);
      }
    };

    const handleHourChange = (newHour: string) => {
      setHour(newHour);
      updateTime(newHour, minute, period);
    };

    const handleMinuteChange = (newMinute: string) => {
      setMinute(newMinute);
      updateTime(hour, newMinute, period);
    };

    const handlePeriodChange = (newPeriod: string) => {
      setPeriod(newPeriod);
      updateTime(hour, minute, newPeriod);
    };

    const hours =
      format === '12'
        ? Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'))
        : Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));

    const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

    const displayValue = value || placeholder;

    return (
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            ref={ref}
            className={cn(
              'w-full justify-start text-left font-normal',
              !value && 'text-neutral-500',
              className
            )}
            disabled={disabled}
          >
            <Clock className="mr-2 h-4 w-4" />
            {displayValue}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align="start"
        >
          <div className="p-4">
            <div className="flex items-center gap-2">
              <SelectMenu
                value={hour}
                onValueChange={handleHourChange}
              >
                <SelectMenuTrigger className="w-20">
                  <SelectMenuValue placeholder="HH" />
                </SelectMenuTrigger>
                <SelectMenuContent>
                  {hours.map((h) => (
                    <SelectMenuItem
                      key={h}
                      value={h}
                    >
                      {h}
                    </SelectMenuItem>
                  ))}
                </SelectMenuContent>
              </SelectMenu>

              <span className="text-neutral-500">:</span>

              <SelectMenu
                value={minute}
                onValueChange={handleMinuteChange}
              >
                <SelectMenuTrigger className="w-20">
                  <SelectMenuValue placeholder="MM" />
                </SelectMenuTrigger>
                <SelectMenuContent>
                  {minutes.map((m) => (
                    <SelectMenuItem
                      key={m}
                      value={m}
                    >
                      {m}
                    </SelectMenuItem>
                  ))}
                </SelectMenuContent>
              </SelectMenu>

              {format === '12' && (
                <SelectMenu
                  value={period}
                  onValueChange={handlePeriodChange}
                >
                  <SelectMenuTrigger className="w-20">
                    <SelectMenuValue />
                  </SelectMenuTrigger>
                  <SelectMenuContent>
                    <SelectMenuItem value="AM">AM</SelectMenuItem>
                    <SelectMenuItem value="PM">PM</SelectMenuItem>
                  </SelectMenuContent>
                </SelectMenu>
              )}
            </div>

            <div className="mt-4 flex justify-end">
              <Button
                size="sm"
                onClick={() => setOpen(false)}
                disabled={!hour || !minute}
              >
                Done
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);

TimePickerInput.displayName = 'TimePickerInput';
