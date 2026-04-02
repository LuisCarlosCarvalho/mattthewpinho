"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * Componente interno para gerir a lógica de horário sem causar re-renders infinitos no Provider.
 */
function TimeThemeEngine() {
  const { theme } = useTheme();

  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();
      const isNight = hour >= 18 || hour < 6;
      
      // O valor 'time' é o que definimos para o modo automático
      if (theme === 'time' || theme === 'system') {
        const root = document.documentElement;
        if (isNight) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    };

    checkTime();
    const timer = setInterval(checkTime, 60000);
    return () => clearInterval(timer);
  }, [theme]);

  return null;
}

export function ThemeProvider({ children, ...props }: any) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Lógica imediata após montagem para garantir que o tema de horário seja aplicado
    // antes mesmo do engine disparar, evitando o flicker inicial caso o provider
    // ainda esteja a processar o 'time'.
    const hour = new Date().getHours();
    const isNight = hour >= 18 || hour < 6;
    const savedTheme = localStorage.getItem('theme');
    
    if (!savedTheme || savedTheme === 'system' || savedTheme === 'time') {
      document.documentElement.classList.toggle('dark', isNight);
    }
  }, []);

  // Para resolver o erro "Encountered a script tag", evitamos renderizar o provider 
  // no servidor caso ele cause conflitos, mas para manter a funcionalidade do next-themes
  // e o suppressHydrationWarning do layout.tsx, renderizamos de forma estável.
  
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="time" 
      enableSystem={false}
      themes={['light', 'dark', 'time']}
      disableTransitionOnChange
      {...props}
    >
      <TimeThemeEngine />
      {children}
    </NextThemesProvider>
  );
}
