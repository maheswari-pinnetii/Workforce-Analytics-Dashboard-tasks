declare module 'lucide-react' {
  import * as React from 'react';

  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
    className?: string;
  }

  export type Icon = React.FC<LucideProps>;

  export const LayoutDashboard: Icon;
  export const Users: Icon;
  export const UserCheck: Icon;
  export const CalendarClock: Icon;
  export const BriefcaseBusiness: Icon;
  export const ChartNoAxesCombined: Icon;
  export const Building2: Icon;
  export const MapPin: Icon;
  export const UserPlus: Icon;
  export const FileText: Icon;
  export const Settings: Icon;
  export const Menu: Icon;
  export const Search: Icon;
  export const Bell: Icon;
  export const Sun: Icon;
  export const Moon: Icon;
  export const RefreshCw: Icon;
  export const Download: Icon;
  export const Filter: Icon;
  export const X: Icon;
  export const ChevronDown: Icon;
  export const AlertTriangle: Icon;
  export const SearchX: Icon;
  export const CheckCircle2: Icon;
  export const Clock: Icon;
  export const ArrowUpRight: Icon;
  export const ArrowDownRight: Icon;
  export const RotateCcw: Icon;
  export const Percent: Icon;
  export const ChevronRight: Icon;
  export const Home: Icon;
  export const Layers: Icon;
  export const FilterX: Icon;
  export const Calendar: Icon;
}
