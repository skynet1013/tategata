-- Create profiles table (if not exists)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create benchmark_accounts table
CREATE TABLE IF NOT EXISTS benchmark_accounts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  account_name TEXT NOT NULL,
  platform TEXT NOT NULL DEFAULT 'tiktok',
  followers INTEGER DEFAULT 0,
  engagement_rate DECIMAL(5,2) DEFAULT 0,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE benchmark_accounts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own benchmarks" ON benchmark_accounts;
DROP POLICY IF EXISTS "Users can insert own benchmarks" ON benchmark_accounts;
DROP POLICY IF EXISTS "Users can delete own benchmarks" ON benchmark_accounts;

CREATE POLICY "Users can view own benchmarks" ON benchmark_accounts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own benchmarks" ON benchmark_accounts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own benchmarks" ON benchmark_accounts
  FOR DELETE USING (auth.uid() = user_id);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  benchmark_account_id UUID REFERENCES benchmark_accounts(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  image TEXT,
  views BIGINT DEFAULT 0,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  engagement_rate DECIMAL(5,2) DEFAULT 0,
  posted_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view posts of own benchmarks" ON posts;

CREATE POLICY "Users can view posts of own benchmarks" ON posts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM benchmark_accounts
      WHERE benchmark_accounts.id = posts.benchmark_account_id
      AND benchmark_accounts.user_id = auth.uid()
    )
  );

-- Create music_trends table
CREATE TABLE IF NOT EXISTS music_trends (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  uses BIGINT DEFAULT 0,
  growth_rate DECIMAL(5,2) DEFAULT 0,
  rank INTEGER NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE music_trends ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view music trends" ON music_trends;

CREATE POLICY "Anyone can view music trends" ON music_trends
  FOR SELECT USING (true);

-- Create keywords table
CREATE TABLE IF NOT EXISTS keywords (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  keyword TEXT UNIQUE NOT NULL,
  volume BIGINT DEFAULT 0,
  trend_score DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE keywords ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view keywords" ON keywords;

CREATE POLICY "Anyone can view keywords" ON keywords
  FOR SELECT USING (true);

-- Create or replace function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (new.id, new.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
