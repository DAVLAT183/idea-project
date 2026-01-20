"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";
import "./globals.css";
import Link from "next/link";
import { useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  return (
    <html lang="ru">
      <body className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen font-sans">
        <Provider store={store}>
            <main className="flex-1 items-center">
              <div>
                {children}
              </div>
            </main>
        </Provider>
      </body>
    </html>
  );
}
