import mysql, { RowDataPacket } from 'mysql2/promise';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';

// Create a MySQL connection pool for efficient DB connections reuse
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',  // DB host from env or default to localhost
  port: Number(process.env.MYSQL_PORT) || 3306, // DB port, default MySQL port 3306
  user: process.env.MYSQL_USER || 'root',       // DB user from env or default root
  password: process.env.MYSQL_PASSWORD || '',   // DB password from env or empty string
  database: process.env.MYSQL_DATABASE || 'your_db_name', // DB name
  waitForConnections: true,     // Wait for a free connection if pool is full
  connectionLimit: 10,          // Max 10 concurrent connections
  queueLimit: 0,                // Unlimited queued connection requests
});

// Fetch all revenue records from the 'revenue' table
export async function fetchRevenue() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM revenue');
    // Cast rows to Revenue[] type for type safety
    const revenue: Revenue[] = rows as Revenue[];
    return revenue;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

// Fetch latest 5 invoices along with customer info, ordered by invoice date descending
export async function fetchLatestInvoices() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT invoice.amount, customer.name, customer.image_url, customer.email, invoice.id
       FROM invoice
       JOIN customer ON invoice.customer_id = customer.id
       ORDER BY invoice.date DESC
       LIMIT 5`
    );
    console.log(rows, 'Rows fetched from revenue table');

    // Format amounts as currency using utility function
    const latestInvoices = (rows as LatestInvoiceRaw[]).map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

// Fetch summary card data: number of invoices/customers and totals for paid/pending invoices
export async function fetchCardData() {
  try {
    // Count total invoices
    const [[invoiceCountRow]] = await pool.query<any[]>('SELECT COUNT(*) as count FROM invoices');
    // Count total customers
    const [[customerCountRow]] = await pool.query<any[]>('SELECT COUNT(*) as count FROM customers');
    // Sum paid and pending invoice amounts
    const [[statusRow]] = await pool.query<any[]>(`
      SELECT
        SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS paid,
        SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS pending
      FROM invoices
    `);

    const numberOfInvoices = Number(invoiceCountRow.count ?? '0');
    const numberOfCustomers = Number(customerCountRow.count ?? '0');
    const totalPaidInvoices = formatCurrency(statusRow.paid ?? '0');
    const totalPendingInvoices = formatCurrency(statusRow.pending ?? '0');

    // Return summarized data for dashboard cards
    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6; // Number of invoices per page for pagination

// Fetch invoices filtered by query string with pagination
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE; // Calculate offset for pagination

  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name LIKE ? OR
        customers.email LIKE ? OR
        invoices.amount LIKE ? OR
        invoices.date LIKE ? OR
        invoices.status LIKE ?
      ORDER BY invoices.date DESC
      LIMIT ? OFFSET ?`,
      [
        `%${query}%`, // Search parameters for filtering invoices and customers
        `%${query}%`,
        `%${query}%`,
        `%${query}%`,
        `%${query}%`,
        ITEMS_PER_PAGE,
        offset,
      ]
    );
    return rows as InvoicesTable[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

// Get total number of pages of invoices filtered by query, for pagination UI
export async function fetchInvoicesPages(query: string) {
  try {
    const [[countRow]] = await pool.query<any[]>(
      `SELECT COUNT(*) as count
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name LIKE ? OR
        customers.email LIKE ? OR
        invoices.amount LIKE ? OR
        invoices.date LIKE ? OR
        invoices.status LIKE ?`,
      [
        `%${query}%`,
        `%${query}%`,
        `%${query}%`,
        `%${query}%`,
        `%${query}%`,
      ]
    );
    const totalPages = Math.ceil(Number(countRow.count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

// Fetch a single invoice by its ID and convert amount from cents to dollars
export async function fetchInvoiceById(id: string) {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ?`,
      [id]
    );
    // Convert amount stored as cents to dollars by dividing by 100
    const invoice = (rows as InvoiceForm[]).map((invoice) => ({
      ...invoice,
      amount: invoice.amount / 100,
    }));
    return invoice[0]; // Return the first (and presumably only) invoice
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

// Fetch all customers sorted by name ascending
export async function fetchCustomers() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC`
    );
    return rows as CustomerField[];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

// Fetch filtered customers with aggregated invoice data (total invoices, paid, pending)
export async function fetchFilteredCustomers(query: string) {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT
        customers.id,
        customers.name,
        customers.email,
        customers.image_url,
        COUNT(invoices.id) AS total_invoices,
        SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
        SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
      FROM customers
      LEFT JOIN invoices ON customers.id = invoices.customer_id
      WHERE
        customers.name LIKE ? OR
        customers.email LIKE ?
      GROUP BY customers.id, customers.name, customers.email, customers.image_url
      ORDER BY customers.name ASC`,
      [`%${query}%`, `%${query}%`]
    );

    // Format the amounts as currency strings for display
    const customers = (rows as CustomersTableType[]).map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

// Fetch a user by their email (used for login/authentication)
export async function getUser(email: string) {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return (rows as User[])[0]; // Return the first matching user or undefined
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
