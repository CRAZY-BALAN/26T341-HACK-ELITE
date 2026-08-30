// Each entry describes one dashboard widget: its rendering `type` and the
// content that type needs. Dashboard.jsx picks widgets by key per profile,
// so different user groups see different widgets, in a different order —
// not just different copy inside the same layout.

export const WIDGETS = {
  quickActionsLarge: {
    type: "actions", title: "Quick actions", large: true,
    items: [
      { label: "Ask for help", icon: "MessageCircle", to: "/assistant" },
      { label: "Call someone", icon: "Phone", to: "/emergency" },
      { label: "Find a service", icon: "MapPin", to: "/resources" },
      { label: "Emergency", icon: "AlertTriangle", to: "/emergency" },
    ],
  },
  quickActionsStandard: {
    type: "actions", title: "Quick actions", large: false,
    items: [
      { label: "Ask Inclusa", icon: "MessageCircle", to: "/assistant" },
      { label: "Find support", icon: "MapPin", to: "/resources" },
      { label: "Emergency", icon: "AlertTriangle", to: "/emergency" },
      { label: "Community", icon: "Users2", to: "/community" },
    ],
  },
  medication: {
    type: "list", title: "Today's reminders", icon: "Pill",
    items: [
      { primary: "Blood pressure tablet", secondary: "8:00 AM · with breakfast", tag: "Taken" },
      { primary: "Vitamin D", secondary: "1:00 PM · with lunch", tag: "Due" },
      { primary: "Evening walk reminder", secondary: "6:00 PM · 15 minutes", tag: "Upcoming" },
    ],
  },
  emergencyContacts: {
    type: "list", title: "Emergency contacts", icon: "PhoneCall",
    items: [
      { primary: "Priya (Daughter)", secondary: "Primary contact", tag: "Call" },
      { primary: "Dr. Raman Clinic", secondary: "Family physician", tag: "Call" },
      { primary: "108 Ambulance", secondary: "Government emergency line", tag: "Call" },
    ],
  },
  nearbyHealth: {
    type: "list", title: "Nearby healthcare", icon: "HeartPulse",
    items: [
      { primary: "Sundaram Community PHC", secondary: "0.8 km · Open now", tag: "Free" },
      { primary: "Government General Hospital", secondary: "4.0 km · 24 hours", tag: "Free" },
    ],
  },
  voiceNav: {
    type: "status", title: "Voice navigation", icon: "Mic",
    description: "Navigate Inclusa hands-free. Say a page name or \"read this page\" any time.",
    cta: "Start voice navigation",
  },
  readAloudList: {
    type: "list", title: "Read aloud", icon: "Volume2",
    items: [
      { primary: "Your PMAY application status", secondary: "Updated 2 days ago", tag: "▶ Play" },
      { primary: "How to reach Sundaram PHC", secondary: "Directions, 0.8 km", tag: "▶ Play" },
    ],
  },
  captionStatus: {
    type: "status", title: "Live captions", icon: "Captions",
    description: "Captions are on for calls and the AI assistant across Inclusa.",
    cta: "Manage caption settings",
  },
  visualAlerts: {
    type: "list", title: "Visual alerts", icon: "BellRing",
    items: [
      { primary: "Legal aid cell closed tomorrow", secondary: "Community alert · flashes on screen", tag: "New" },
      { primary: "Appointment reminder: 3:00 PM", secondary: "Vibrates + on-screen banner", tag: "Today" },
    ],
  },
  signLanguageResources: {
    type: "list", title: "Sign language resources", icon: "HandHeart",
    items: [
      { primary: "ISL interpreter request", secondary: "Book for your next appointment", tag: "Request" },
      { primary: "Community ISL classes", secondary: "Saturdays · Anna Nagar centre", tag: "View" },
    ],
  },
  focusMode: {
    type: "status", title: "Focus mode", icon: "Target",
    description: "Hide everything except your current task. One thing, one screen.",
    cta: "Enter focus mode",
  },
  taskBreakdown: {
    type: "list", title: "Today, broken down", icon: "ListChecks",
    items: [
      { primary: "Step 1 — Message the AI assistant about your form", secondary: "Est. 2 minutes", tag: "Next" },
      { primary: "Step 2 — Review the suggested resource", secondary: "Est. 3 minutes", tag: "Then" },
      { primary: "Step 3 — Save it to your support plan", secondary: "Est. 1 minute", tag: "Then" },
    ],
  },
  schemesList: {
    type: "list", title: "Schemes you may qualify for", icon: "HandCoins",
    items: [
      { primary: "PMAY Housing Scheme", secondary: "Affordable housing support", tag: "Apply" },
      { primary: "Free skill development program", secondary: "Coimbatore Skill Dev. Centre", tag: "Apply" },
      { primary: "Subsidised ration kit", secondary: "Anna Nagar Food Bank", tag: "Collect" },
    ],
  },
  recentActivity: {
    type: "list", title: "Recent activity", icon: "History",
    items: [
      { primary: "Saved: Coimbatore Skill Development Centre", secondary: "2 days ago" },
      { primary: "Asked Inclusa about ration card renewal", secondary: "4 days ago" },
    ],
  },
  languageBar: {
    type: "status", title: "Your language", icon: "Languages",
    description: "Inclusa is currently set to English. Switch any time — every page follows.",
    cta: "Change language",
  },
  legalDocs: {
    type: "list", title: "Documents & legal help", icon: "FileText",
    items: [
      { primary: "Nilgiris District Legal Aid Cell", secondary: "Free consultation · 5.4 km", tag: "Book" },
      { primary: "Residency documentation checklist", secondary: "Updated for this month", tag: "View" },
    ],
  },
  nearbyShelters: {
    type: "list", title: "Nearby shelters", icon: "Home",
    items: [
      { primary: "Anna Nagar Transit Shelter", secondary: "1.4 km · beds available", tag: "Contact" },
    ],
  },
  accessibleRoutes: {
    type: "list", title: "Accessible routes", icon: "Route",
    items: [
      { primary: "City Transit — Route 14A", secondary: "Low-floor, wheelchair accessible", tag: "Directions" },
      { primary: "Hospital corridor ramp access", secondary: "Verified accessible path", tag: "Directions" },
    ],
  },
  offlineVault: {
    type: "status", title: "Offline resource vault", icon: "HardDriveDownload",
    description: "12 resources are saved for offline access, including emergency contacts.",
    cta: "Manage offline vault",
  },
  lowDataToggle: {
    type: "status", title: "Low-data mode", icon: "Gauge",
    description: "Images and animations are reduced to keep Inclusa fast on slow connections.",
    cta: "Adjust data usage",
  },
};
