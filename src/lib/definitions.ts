// This file defines TypeScript types for your app's data structures.
// These types describe the shape and allowed data types of your objects.
// In a real app using an ORM like Prisma, these would often be generated automatically.

// User represents a user account in your system
export type User = {
  id: string;       // Unique identifier (likely UUID or string)
  name: string;     // User's full name
  email: string;    // User's email address (used for login, contact)
  password: string; // Hashed password stored securely
};

// Customer represents a client or customer in your system
export type Customer = {
  id: string;        // Unique customer ID
  name: string;      // Customer's name
  email: string;     // Customer's email address
  image_url: string; // URL to customer's profile picture or avatar
};

// Invoice represents a billing invoice linked to a customer
export type Invoice = {
  id: string;         // Unique invoice ID
  customer_id: string;// Reference to the customer this invoice belongs to
  amount: number;     // Invoice amount (likely in smallest currency unit like cents)
  date: string;       // Date string when the invoice was issued
  // 'status' can only be 'pending' or 'paid', restricting values to these two strings
  status: 'pending' | 'paid';
};

// Revenue tracks revenue figures grouped by month
export type Revenue = {
  month: string;    // Month string (e.g. "2023-06")
  revenue: number;  // Revenue amount for that month
};

// LatestInvoice is a simplified view of invoice joined with customer info for display
export type LatestInvoice = {
  id: string;         // Invoice ID
  name: string;       // Customer name
  image_url: string;  // Customer avatar image URL
  email: string;      // Customer email
  amount: string;     // Formatted amount string (e.g. "$123.45")
};

// LatestInvoiceRaw is the same as LatestInvoice but amount is a number (raw DB value)
// We use this when fetching from DB before formatting the amount as a string
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;    // Raw numeric amount from DB (e.g. cents)
};

// InvoicesTable represents invoice data for a detailed invoices table view
export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;        // Customer name
  email: string;       // Customer email
  image_url: string;   // Customer avatar URL
  date: string;        // Invoice date
  amount: number;      // Amount in number format
  status: 'pending' | 'paid';
};

// CustomersTableType represents customer data with aggregated invoice stats
export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;  // Number of invoices linked to this customer
  total_pending: number;   // Sum of pending invoice amounts (raw number)
  total_paid: number;      // Sum of paid invoice amounts (raw number)
};

// FormattedCustomersTable is similar but total_pending and total_paid are formatted strings
export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;  // e.g. "$123.45"
  total_paid: string;     // e.g. "$456.78"
};

// CustomerField is a minimal customer representation, e.g. for dropdown selectors
export type CustomerField = {
  id: string;
  name: string;
};

// InvoiceForm represents the data needed to create or update an invoice
export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};
