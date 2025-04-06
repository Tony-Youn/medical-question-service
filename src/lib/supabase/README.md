# Supabase Server Client

This directory contains Supabase client implementations for both server-side and client-side usage.

## Overview

- `server.ts`: Server-side Supabase client with support for App Router and compatibility layer for Pages Router
- `client.ts`: Client-side Supabase client for browser environments

## Usage

### In App Router Components (Server Components)

```typescript
import { createClient } from "@/lib/supabase/server";

export default async function MyServerComponent() {
  const supabase = await createClient();

  // Use supabase client
  const { data } = await supabase.from("my_table").select();

  return <div>{/* Your component */}</div>;
}
```

### In API Routes (Pages Router)

If you need to use the Supabase client in a Pages Router API route:

```typescript
import { createServerClientFromRequest } from "@/lib/supabase/server";

export default async function handler(req, res) {
  const supabase = await createServerClientFromRequest(req, res);

  // Use supabase client
  const { data } = await supabase.from("my_table").select();

  res.status(200).json({ data });
}
```

### In Client Components

```typescript
import { createClient } from "@/lib/supabase/client";

export default function MyClientComponent() {
  const handleSomething = async () => {
    const supabase = createClient();

    // Use supabase client
    const { data } = await supabase.from("my_table").select();
  };

  return <button onClick={handleSomething}>Do Something</button>;
}
```

## Implementation Details

The server-side client uses dynamic imports to detect the environment and provide the appropriate client implementation:

1. For App Router: Uses `next/headers` for cookie management
2. For Pages Router: Uses request/response objects for cookie management

This dual implementation allows for more flexible usage across different parts of a Next.js application.
