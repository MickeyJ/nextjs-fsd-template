'use client';

import { forwardRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker, type DayPickerProps } from 'react-day-picker';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

export interface CalendarProps {
  className?: string;
  showOutsideDays?: boolean;
}

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(({ className, showOutsideDays = true, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('p-3', className)}
    >
      <DayPicker
        showOutsideDays={showOutsideDays}
        className="w-full"
        classNames={{
          months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
          month: 'space-y-4',
          month_caption: 'flex justify-center pt-1 relative items-center',
          caption_label: 'text-sm font-medium',
          nav: 'space-x-1 flex items-center',
          button_previous: cn('absolute left-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'),
          button_next: cn('absolute right-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'),
          month_grid: 'w-full border-collapse space-y-1',
          weekdays: 'flex',
          weekday: cn('text-neutral-500 rounded-md w-9 font-normal text-[0.8rem]'),
          week: 'flex w-full mt-2',
          day: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-neutral-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
          day_button: cn('h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-neutral-100 '),
          range_start: 'day-range-start',
          range_end: 'day-range-end',
          selected: cn(
            'bg-primary-500 text-primary-50 hover:bg-primary-500 hover:text-primary-50 focus:bg-primary-500 focus:text-primary-50'
          ),
          today: 'bg-neutral-100 text-neutral-900',
          outside: cn(
            'text-neutral-500 opacity-50 ',
            'aria-selected:bg-neutral-100/50 aria-selected:text-neutral-500 aria-selected:opacity-30'
          ),
          disabled: 'text-neutral-500 opacity-50 ',
          range_middle: cn('aria-selected:bg-neutral-100 aria-selected:text-neutral-900'),
          hidden: 'invisible',
        }}
        components={{
          Chevron: ({ orientation }) => {
            const Icon = orientation === 'left' ? ChevronLeft : ChevronRight;
            return <Icon className="h-4 w-4" />;
          },
          Nav: ({ onPreviousClick, onNextClick }) => (
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={onPreviousClick}
                type="button"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={onNextClick}
                type="button"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          ),
        }}
        {...props}
      />
    </div>
  );
});

Calendar.displayName = 'Calendar';

export { Calendar };
