import { useState, useEffect } from 'react';

// Hydration mismatch'i önlemek için tekrar tekrar yazılan mounted kontrolünü tek bir hook'a çekeriz
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
