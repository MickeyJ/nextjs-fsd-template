'use client';

import * as AccessibleIcon from '@radix-ui/react-accessible-icon';
import {
  Search, X, Menu, ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  Check, Eye, EyeOff, Loader2, AlertCircle, Info, CheckCircle, XCircle,
  AlertTriangle, Home, User, Settings, LogOut, Plus, Minus, Edit, Trash,
  Copy, Save, Download, Upload, RefreshCw, ArrowLeft, ArrowRight,
  ArrowUp, ArrowDown, ExternalLink, Link, Mail, Phone, Calendar, Clock,
  MapPin, Filter, MoreHorizontal, MoreVertical, type LucideIcon,
} from 'lucide-react';
import { type ComponentPropsWithoutRef } from 'react';

type IconProps = ComponentPropsWithoutRef<LucideIcon> & { label?: string };

// Pre-wrapped accessible versions of common icons
export const SearchIcon = ({ label = 'Search', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}><Search {...props} /></AccessibleIcon.Root>
);

export const CloseIcon = ({ label = 'Close', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}><X {...props} /></AccessibleIcon.Root>
);

export const LoadingIcon = ({ label = 'Loading', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}><Loader2 className="animate-spin" {...props} /></AccessibleIcon.Root>
);

// Export the AccessibleIcon Root for custom usage
export { AccessibleIcon };