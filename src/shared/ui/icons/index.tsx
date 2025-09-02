'use client';

import * as AccessibleIcon from '@radix-ui/react-accessible-icon';
import {
  Search,
  X,
  Menu,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Check,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Home,
  User,
  Settings,
  LogOut,
  Plus,
  Minus,
  Edit,
  Trash,
  Copy,
  Save,
  Download,
  Upload,
  RefreshCw,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Link,
  Mail,
  Phone,
  Calendar,
  Clock,
  MapPin,
  Filter,
  MoreHorizontal,
  MoreVertical,
  type LucideIcon,
} from 'lucide-react';
import { type ComponentPropsWithoutRef } from 'react';

type IconProps = ComponentPropsWithoutRef<LucideIcon> & { label?: string };

// Pre-wrapped accessible versions of common icons
export const SearchIcon = ({ label = 'Search', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <Search {...props} />
  </AccessibleIcon.Root>
);

export const CloseIcon = ({ label = 'Close', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <X {...props} />
  </AccessibleIcon.Root>
);

export const MenuIcon = ({ label = 'Menu', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <Menu {...props} />
  </AccessibleIcon.Root>
);

export const ChevronDownIcon = ({ label = 'Chevron Down', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <ChevronDown {...props} />
  </AccessibleIcon.Root>
);

export const ChevronUpIcon = ({ label = 'Chevron Up', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <ChevronUp {...props} />
  </AccessibleIcon.Root>
);

export const ChevronLeftIcon = ({ label = 'Chevron Left', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <ChevronLeft {...props} />
  </AccessibleIcon.Root>
);

export const ChevronRightIcon = ({ label = 'Chevron Right', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <ChevronRight {...props} />
  </AccessibleIcon.Root>
);

export const CheckIcon = ({ label = 'Check', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <Check {...props} />
  </AccessibleIcon.Root>
);

export const EyeIcon = ({ label = 'Show', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <Eye {...props} />
  </AccessibleIcon.Root>
);

export const EyeOffIcon = ({ label = 'Hide', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <EyeOff {...props} />
  </AccessibleIcon.Root>
);

export const LoadingIcon = ({ label = 'Loading', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <Loader2
      className="animate-spin"
      {...props}
    />
  </AccessibleIcon.Root>
);

export const AlertCircleIcon = ({ label = 'Alert', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <AlertCircle {...props} />
  </AccessibleIcon.Root>
);

export const InfoIcon = ({ label = 'Info', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <Info {...props} />
  </AccessibleIcon.Root>
);

export const CheckCircleIcon = ({ label = 'Success', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <CheckCircle {...props} />
  </AccessibleIcon.Root>
);

export const XCircleIcon = ({ label = 'Error', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <XCircle {...props} />
  </AccessibleIcon.Root>
);

export const AlertTriangleIcon = ({ label = 'Warning', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <AlertTriangle {...props} />
  </AccessibleIcon.Root>
);

export const HomeIcon = ({ label = 'Home', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <Home {...props} />
  </AccessibleIcon.Root>
);

export const UserIcon = ({ label = 'User', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <User {...props} />
  </AccessibleIcon.Root>
);

export const SettingsIcon = ({ label = 'Settings', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <Settings {...props} />
  </AccessibleIcon.Root>
);

export const LogOutIcon = ({ label = 'Log Out', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <LogOut {...props} />
  </AccessibleIcon.Root>
);

export const PlusIcon = ({ label = 'Add', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <Plus {...props} />
  </AccessibleIcon.Root>
);

export const MinusIcon = ({ label = 'Remove', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <Minus {...props} />
  </AccessibleIcon.Root>
);

export const EditIcon = ({ label = 'Edit', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <Edit {...props} />
  </AccessibleIcon.Root>
);

export const TrashIcon = ({ label = 'Delete', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <Trash {...props} />
  </AccessibleIcon.Root>
);

export const CopyIcon = ({ label = 'Copy', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <Copy {...props} />
  </AccessibleIcon.Root>
);

export const SaveIcon = ({ label = 'Save', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <Save {...props} />
  </AccessibleIcon.Root>
);

export const DownloadIcon = ({ label = 'Download', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <Download {...props} />
  </AccessibleIcon.Root>
);

export const UploadIcon = ({ label = 'Upload', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <Upload {...props} />
  </AccessibleIcon.Root>
);

export const RefreshIcon = ({ label = 'Refresh', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <RefreshCw {...props} />
  </AccessibleIcon.Root>
);

export const ArrowLeftIcon = ({ label = 'Previous', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <ArrowLeft {...props} />
  </AccessibleIcon.Root>
);

export const ArrowRightIcon = ({ label = 'Next', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <ArrowRight {...props} />
  </AccessibleIcon.Root>
);

export const ArrowUpIcon = ({ label = 'Up', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <ArrowUp {...props} />
  </AccessibleIcon.Root>
);

export const ArrowDownIcon = ({ label = 'Down', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <ArrowDown {...props} />
  </AccessibleIcon.Root>
);

export const ExternalLinkIcon = ({ label = 'External Link', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <ExternalLink {...props} />
  </AccessibleIcon.Root>
);

export const LinkIcon = ({ label = 'Link', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <Link {...props} />
  </AccessibleIcon.Root>
);

export const MailIcon = ({ label = 'Email', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <Mail {...props} />
  </AccessibleIcon.Root>
);

export const PhoneIcon = ({ label = 'Phone', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <Phone {...props} />
  </AccessibleIcon.Root>
);

export const CalendarIcon = ({ label = 'Calendar', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <Calendar {...props} />
  </AccessibleIcon.Root>
);

export const ClockIcon = ({ label = 'Time', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <Clock {...props} />
  </AccessibleIcon.Root>
);

export const MapPinIcon = ({ label = 'Location', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <MapPin {...props} />
  </AccessibleIcon.Root>
);

export const FilterIcon = ({ label = 'Filter', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <Filter {...props} />
  </AccessibleIcon.Root>
);

export const MoreHorizontalIcon = ({ label = 'More Options', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <MoreHorizontal {...props} />
  </AccessibleIcon.Root>
);

export const MoreVerticalIcon = ({ label = 'More Options', ...props }: IconProps) => (
  <AccessibleIcon.Root label={label}>
    <MoreVertical {...props} />
  </AccessibleIcon.Root>
);

// Export the AccessibleIcon Root for custom usage
export { AccessibleIcon };
