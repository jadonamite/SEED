'use client';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

// 🎨 YOUR CUSTOM THEME
const theme = extendTheme({
  colors: {
    brand: {
      500: '#10B981', // Soft Approve Green (Primary)
      600: '#059669', // Darker Green (Hover state)
    },
  },
  styles: {
    global: {
      body: {
        bg: '#F9FAFB', // Light gray background (Clean aesthetic)
        color: '#1A1A1D', // Dark text
      },
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}