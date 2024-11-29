import {
  ArrowRight,
  Home,
  Info,
  Layers,
  MapPin,
  User,
  LoaderCircle,
  Bell,
  PieChart,
  UserRound,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  CircleHelp,
  ChevronDown,
  ChevronUp,
  type Icon as LucideIcon,
  ArrowUpDown,
  ArrowDown,
  Trash,
  Edit,
  Pencil,
  Trash2,
  ArrowUp,
  MoreVertical,
  FileCheck,
  Eye,
  EyeOff,
  LogOutIcon,
  Calendar,
  MoreHorizontal,
  Image,
  Plus,
  BookMarked,
  CalendarDays,
  Tag,
  Dna,
  PawPrint,
  Goal,
  Hourglass,
  Weight,
  CircleX,
  Album,
  PlusCircle,
  ContactRound,
  Users,
  Clock,
  Leaf,
  Syringe,
  CircleDollarSign,
  PiggyBank,
  Milk,
  Stethoscope,
  CalendarPlus,
  Grid2x2Check,
  X,
  Menu,
  BookText,
  CopyPlus,
} from "lucide-react";
import { BullIcon } from "./custom/bull";
import { cowIcon } from "./custom/cow";
import { cowLogoIcon } from "./custom/cow-logo";
import { LogoIcon } from "./custom/logo";

export type Icon = typeof LucideIcon;

export type IconAdminPages = keyof typeof adminPages;
export type IconSettings = keyof typeof settings;
export type IconSocial = keyof typeof social;
export type IconUi = keyof typeof ui;
export type IconUiIndicator = keyof typeof uiIndicators;
export type Icons = keyof typeof Icons;

const settings = {
  help: CircleHelp,
  logout: LogOutIcon,
  bell: Bell,
};

const adminPages = {
  dashboard: BookMarked,
  events: Calendar,
  record: BookText,
  operator: ContactRound,
  register: CopyPlus,
  lot: Grid2x2Check,
};

const social = {};

const ui = {
  home: Home,
  img: Image,
  mapPin: MapPin,
  chartPie: PieChart,
  users: UserRound,
  service: Layers,
  user: User,
  bull: BullIcon,
  cow: cowIcon,
  CowLogo: cowLogoIcon,
  calendar: CalendarDays,
  tag: Tag,
  adn: Dna,
  paw: PawPrint,
  flagGoal: Goal,
  hourglass: Hourglass,
  weight: Weight,
  album: Album,
  contactRound: ContactRound,
  clock: Clock,
  leaf: Leaf,
  syringe: Syringe,
  circleDollar: CircleDollarSign,
  piggy: PiggyBank,
  milk: Milk,
  stethoscope: Stethoscope,
  circleHelp: CircleHelp,
  logo: LogoIcon,
};

const uiIndicators = {
  info: Info,
  loader: LoaderCircle,
  trash: Trash2,
  edit: Pencil,
  eye: Eye,
  eyeOff: EyeOff,
  moreVertical: MoreVertical,
  moreHorizontal: MoreHorizontal,
  arrowRight: ArrowRight,
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  fileCheck: FileCheck,
  plus: Plus,
  plusCircle: PlusCircle,
  close: CircleX,
  userRound: UserRound,
  calendarPlus: CalendarPlus,
  gridCheck: Grid2x2Check,
  x: X,
  menu: Menu,
};

export const Icons = {
  ...ui,
  ...uiIndicators,
  ...social,
  ...adminPages,
  ...settings,
};
