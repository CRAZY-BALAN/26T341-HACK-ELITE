import {
  Users, Eye, Ear, Sparkles, HandCoins, Globe2, Accessibility, SatelliteDish,
  LayoutGrid, MessageCircle, MapPin, AlertTriangle, UserCircle, Mic, Target,
  Users2, Languages, Pill, PhoneCall, Volume2, BellRing, HandHeart, ListChecks,
  History, FileText, Home, Route, HardDriveDownload, Gauge, Phone,
} from "lucide-react";

export const ICONS = {
  Users, Eye, Ear, Sparkles, HandCoins, Globe2, Accessibility, SatelliteDish,
  LayoutGrid, MessageCircle, MapPin, AlertTriangle, UserCircle, Mic, Target,
  Users2, Languages, Pill, PhoneCall, Volume2, BellRing, HandHeart, ListChecks,
  History, FileText, Home, Route, HardDriveDownload, Gauge, Phone,
};

export function Icon({ name, ...props }) {
  const Cmp = ICONS[name] || LayoutGrid;
  return <Cmp {...props} />;
}
