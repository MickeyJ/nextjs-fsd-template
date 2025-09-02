import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * @method cn
 * @description Combines class names using clsx and tailwind-merge
 * - clsx: Handles conditional classes, arrays, objects, etc.
 * - twMerge: Intelligently merges Tailwind classes, resolving conflicts
 *
 * @example
 * cn('px-2 py-1', 'px-4') // → 'py-1 px-4' (px-4 overrides px-2)
 * cn('text-error-500', condition && 'text-blue-500') // → Conditional classes
 * cn(['btn', { 'btn-active': isActive }]) // → Object syntax
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * @method getPreferredTheme
 * @description Gets the preferred theme from the browser
 * @returns 'dark', 'light', or 'no-preference'
 */
export function getPreferredTheme() {
  if (typeof window === 'undefined') {
    return 'no-preference';
  }
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'no-preference';
}
