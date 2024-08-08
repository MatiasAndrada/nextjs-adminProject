// app/providers.tsx
"use client";

import { NextUIProvider as ProviderPackage } from "@nextui-org/react";

export function NextUIProvider({ children }: { children: React.ReactNode }) {
  return <ProviderPackage>{children}</ProviderPackage>;
}
