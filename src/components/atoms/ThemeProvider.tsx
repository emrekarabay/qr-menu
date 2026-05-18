'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

/**
 * ÖĞRENME NOTU: next-themes nasıl çalışır?
 * next-themes, 'dark mode' yönetimini kolaylaştırır. 'attribute="data-theme"'
 * (veya class) kullanarak HTML etiketine ilgili temayı ekler.
 * Ayrıca sistem tercihini otomatik algılar ve sayfa yüklendiğinde oluşabilecek
 * 'hydration mismatch' (tema parlaması) sorunlarını önlemek için özel bir yapı sunar.
 */
export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
