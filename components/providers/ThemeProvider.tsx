"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

function AutoThemeManager() {
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    // If the selected theme is "system" or "auto" (we'll implement the toggle as "system" for auto mode), we intercept it and apply custom time logic
    const applyTimeBasedTheme = () => {
      const hour = new Date().getHours();
      const isDayTime = hour >= 6 && hour < 18; // 06:00 to 17:59
      
      // We manually add or remove the dark class based on time if theme is strictly 'system'.
      // Note: next-themes by default respects the OS preference for 'system'. We overwrite it physically on the document if we need to.
      // Easiest is to force a specific "time-based" mode. We will call our time mode "time".
    };

    if (theme === "time") {
      const interval = setInterval(() => {
        const hour = new Date().getHours();
        const root = document.documentElement;
        if (hour >= 6 && hour < 18) {
          root.classList.remove('dark');
          root.style.colorScheme = 'light';
        } else {
          root.classList.add('dark');
          root.style.colorScheme = 'dark';
        }
      }, 60000); // verify every minute

      // Run once immediately
      const hour = new Date().getHours();
      const root = document.documentElement;
      if (hour >= 6 && hour < 18) {
        root.classList.remove('dark');
        root.style.colorScheme = 'light';
      } else {
        root.classList.add('dark');
        root.style.colorScheme = 'dark';
      }
      return () => clearInterval(interval);
    }
  }, [theme]);

  return null;
}

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="time" 
      enableSystem={false} 
      themes={['light', 'dark', 'time']}
      {...props}
    >
      <AutoThemeManager />
      {children}
    </NextThemesProvider>
  );
}
