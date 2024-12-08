'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'app/utils/queryClient';
import { PropsWithChildren } from 'react';

function QueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default QueryProvider;
