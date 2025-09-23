import './globals.css';
import { UserProvider } from '../context/UserContext';

export const metadata = {
  title: 'Merchify',
  description: 'Login to your Merchify account',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
