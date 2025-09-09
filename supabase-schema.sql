-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create registrations table
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    nim VARCHAR(50) NOT NULL UNIQUE,
    no_telepon VARCHAR(20) NOT NULL,
    foto_ktm_url TEXT,
    alamat_domisili TEXT NOT NULL,
    fakultas VARCHAR(10) NOT NULL CHECK (fakultas IN ('FTI', 'FHB')),
    program_studi VARCHAR(10) NOT NULL,
    alasan_bergabung TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_registrations_nim ON public.registrations(nim);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON public.registrations(created_at);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for images bucket
CREATE POLICY "Allow public uploads" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'images');

CREATE POLICY "Allow public downloads" ON storage.objects
FOR SELECT USING (bucket_id = 'images');

-- Enable Row Level Security on registrations table
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for registrations table
CREATE POLICY "Allow public insert" ON public.registrations
FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select" ON public.registrations
FOR SELECT USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_registrations_updated_at 
    BEFORE UPDATE ON public.registrations 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create view for registration statistics
CREATE OR REPLACE VIEW registration_stats AS
SELECT 
    COUNT(*) as total_registrations,
    COUNT(CASE WHEN fakultas = 'FTI' THEN 1 END) as fti_count,
    COUNT(CASE WHEN fakultas = 'FHB' THEN 1 END) as fhb_count
FROM public.registrations;

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.registrations TO anon, authenticated;
GRANT SELECT ON public.registration_stats TO anon, authenticated;
