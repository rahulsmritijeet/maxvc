import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/context/ThemeContext';
import Navigation from '@/components/Navigation';
import Cursor from '@/components/Cursor';
import "./globals.css";

export const metadata = {
  title: 'CyberSculptors • Digital Bharat',
  description: 'Where innovation meets ambition'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Cursor />
          <Navigation />
          <main className="min-h-screen transition-all duration-700">
            {children}
          </main>
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                borderRadius: '16px',
                padding: '16px',
              }
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}