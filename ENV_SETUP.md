# Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# NextAuth Configuration
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

## How to get Supabase credentials:
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to Settings > API
4. Copy the URL and anon key

## Generate NEXTAUTH_SECRET:
Run: `openssl rand -base64 32`
