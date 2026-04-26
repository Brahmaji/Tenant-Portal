import type { RentMonth } from "@/components/ui/Timeline";

export const tenant = {
  firstName: "Aiden",
  lastName: "Reyes",
  initials: "AR",
  email: "aiden.reyes@example.com",
  phone: "+1 (416) 555-0142",
  city: "Toronto, ON",
  verified: true,
  passport: {
    completion: 78,
    score: 86,
    creditDelta: 12,
    sections: [
      { key: "personal", label: "Personal Info", status: "complete" as const },
      { key: "income", label: "Employment & Income", status: "complete" as const },
      { key: "history", label: "Rental History", status: "needs_update" as const },
      { key: "references", label: "References", status: "missing" as const },
      { key: "documents", label: "Documents", status: "needs_update" as const },
    ],
  },
};

export const rentMonths: RentMonth[] = [
  { month: "May", amount: 2150, status: "reported" },
  { month: "Jun", amount: 2150, status: "reported" },
  { month: "Jul", amount: 2150, status: "reported" },
  { month: "Aug", amount: 2150, status: "reported" },
  { month: "Sep", amount: 2150, status: "reported" },
  { month: "Oct", amount: 2150, status: "reported" },
  { month: "Nov", amount: 2150, status: "reported" },
  { month: "Dec", amount: 2150, status: "reported" },
  { month: "Jan", amount: 2200, status: "reported" },
  { month: "Feb", amount: 2200, status: "late" },
  { month: "Mar", amount: 2200, status: "reported" },
  { month: "Apr", amount: 2200, status: "pending" },
];

export const creditTrend = [612, 618, 621, 627, 631, 638, 642, 648, 651, 655, 660, 666];

export const applications = [
  {
    id: "APP-2418",
    property: "King West Loft · 27 Bathurst St.",
    rent: 2450,
    status: "approved" as const,
    submitted: "Apr 12",
    landlord: "Mira Singh",
  },
  {
    id: "APP-2402",
    property: "Annex Studio · 412 Brunswick Ave.",
    rent: 1875,
    status: "in_review" as const,
    submitted: "Apr 18",
    landlord: "Westmount Holdings",
  },
  {
    id: "APP-2396",
    property: "Liberty Village 2BR · 88 Hanna Ave.",
    rent: 2890,
    status: "new" as const,
    submitted: "Apr 22",
    landlord: "Joon Park",
  },
  {
    id: "APP-2381",
    property: "Cabbagetown Garden Suite",
    rent: 1620,
    status: "rejected" as const,
    submitted: "Apr 04",
    landlord: "Helena Cross",
  },
];

export const conversations = [
  {
    id: "c1",
    name: "Mira Singh",
    role: "Landlord · King West Loft",
    last: "Lease draft is ready — let me know your move-in date.",
    time: "2m",
    unread: 2,
  },
  {
    id: "c2",
    name: "Westmount Holdings",
    role: "Property Mgr · Annex Studio",
    last: "We received your application and references.",
    time: "1h",
    unread: 0,
  },
  {
    id: "c3",
    name: "Joon Park",
    role: "Landlord · Liberty Village",
    last: "Are pets considered? She is hypoallergenic.",
    time: "Yesterday",
    unread: 1,
  },
];

export const documents = [
  { id: "d1", name: "Government ID — Driver's License", type: "ID", size: "1.2 MB", uploaded: "Mar 18", status: "verified" as const },
  { id: "d2", name: "Pay Stub — March 2026", type: "Income", size: "240 KB", uploaded: "Apr 02", status: "verified" as const },
  { id: "d3", name: "Pay Stub — February 2026", type: "Income", size: "238 KB", uploaded: "Mar 02", status: "verified" as const },
  { id: "d4", name: "Lease Agreement — 88 Spadina", type: "Lease", size: "3.8 MB", uploaded: "Aug 12", status: "verified" as const },
  { id: "d5", name: "Reference Letter — J. Park", type: "References", size: "180 KB", uploaded: "—", status: "missing" as const },
  { id: "d6", name: "Bank Statement — March 2026", type: "Income", size: "612 KB", uploaded: "Apr 06", status: "pending" as const },
];

/**
 * Rent context (no payment gateway is integrated). Rent is paid by the tenant
 * directly to the landlord via their usual method (e-transfer, bank, etc.) —
 * LeazeSure never moves rent funds. We surface due dates as reminders and
 * collect proof afterwards.
 */
export const rent = {
  amount: 2200,
  due: "May 1, 2026",
  /** "paid" once the tenant marks it (and we'll verify), "due" otherwise */
  status: "due" as "due" | "paid" | "verifying",
  property: "King West Loft · 27 Bathurst St.",
  landlord: "Mira Singh",
  method: "Bank e-transfer to landlord",
};

/** LeazeSure subscription billing — the only thing we actually charge for. */
export const subscription = {
  plan: "LeazeSure Pro",
  price: 9,
  currency: "CAD",
  cadence: "month" as const,
  status: "active" as const,
  renewsOn: "May 12, 2026",
  startedOn: "Aug 12, 2025",
  features: [
    "Equifax monthly reporting",
    "Backfill up to 24 months of rent history",
    "Tenant Passport verification",
    "Priority document review (< 24h)",
    "Unlimited applications",
  ],
};

export type Invoice = {
  id: string;
  number: string;
  date: string;
  amount: number;
  description: string;
  status: "paid" | "upcoming" | "failed";
  method?: string;
};

export const invoices: Invoice[] = [
  {
    id: "inv-2026-05",
    number: "LS-2026-05",
    date: "May 12, 2026",
    amount: 9,
    description: "LeazeSure Pro · monthly",
    status: "upcoming",
    method: "Visa •• 4421",
  },
  {
    id: "inv-2026-04",
    number: "LS-2026-04",
    date: "Apr 12, 2026",
    amount: 9,
    description: "LeazeSure Pro · monthly",
    status: "paid",
    method: "Visa •• 4421",
  },
  {
    id: "inv-2026-03",
    number: "LS-2026-03",
    date: "Mar 12, 2026",
    amount: 9,
    description: "LeazeSure Pro · monthly",
    status: "paid",
    method: "Visa •• 4421",
  },
  {
    id: "inv-2026-02",
    number: "LS-2026-02",
    date: "Feb 12, 2026",
    amount: 9,
    description: "LeazeSure Pro · monthly",
    status: "paid",
    method: "Visa •• 4421",
  },
  {
    id: "inv-2026-01",
    number: "LS-2026-01",
    date: "Jan 12, 2026",
    amount: 9,
    description: "LeazeSure Pro · monthly",
    status: "paid",
    method: "Visa •• 4421",
  },
  {
    id: "inv-2025-12",
    number: "LS-2025-12",
    date: "Dec 12, 2025",
    amount: 9,
    description: "LeazeSure Pro · monthly",
    status: "paid",
    method: "Visa •• 4421",
  },
];

export type PaymentMethod = {
  id: string;
  brand: "Visa" | "Mastercard" | "Amex";
  last4: string;
  name: string;
  expiry: string;
  primary?: boolean;
};

export const paymentMethods: PaymentMethod[] = [
  {
    id: "pm1",
    brand: "Visa",
    last4: "4421",
    name: "Aiden Reyes",
    expiry: "06 / 28",
    primary: true,
  },
  {
    id: "pm2",
    brand: "Mastercard",
    last4: "0089",
    name: "Aiden Reyes",
    expiry: "11 / 27",
  },
];

/**
 * @deprecated Use `rent` for rent context and `subscription` / `invoices` /
 * `paymentMethods` for billing. Kept for legacy imports during the transition.
 */
export const payment = {
  rent: rent.amount,
  due: rent.due,
  status: "scheduled" as const,
  method: "Visa •• 4421",
  autopay: false,
};

export type NotificationKind =
  | "application"
  | "message"
  | "payment"
  | "passport"
  | "system";

export type Notification = {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  time: string;
  unread: boolean;
  href?: string;
};

export const notifications: Notification[] = [
  {
    id: "n1",
    kind: "application",
    title: "Application approved",
    body: "Mira Singh approved your application for King West Loft.",
    time: "2m ago",
    unread: true,
    href: "/applications",
  },
  {
    id: "n2",
    kind: "message",
    title: "New message from Westmount Holdings",
    body: "“We received your application and references.”",
    time: "1h ago",
    unread: true,
    href: "/messages",
  },
  {
    id: "n3",
    kind: "payment",
    title: "April rent reported to Equifax",
    body: "$2,200 marked as on-time. +3 estimated points.",
    time: "Yesterday",
    unread: true,
    href: "/rent-reporting",
  },
  {
    id: "n4",
    kind: "passport",
    title: "Passport 78% complete",
    body: "Add 2 references and 1 document to reach Verified.",
    time: "2d ago",
    unread: false,
    href: "/passport",
  },
  {
    id: "n5",
    kind: "system",
    title: "Rent reminder — May 1",
    body: "Heads up: $2,200 rent is due to Mira Singh on May 1. We'll ask you to confirm once paid.",
    time: "3d ago",
    unread: false,
    href: "/rent-reporting",
  },
];
