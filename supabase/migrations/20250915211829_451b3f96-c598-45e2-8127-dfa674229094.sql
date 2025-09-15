-- Create ministry_data table for admin-editable ministry information
CREATE TABLE public.ministry_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ministry_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  contact TEXT NOT NULL,
  email TEXT NOT NULL,
  categories TEXT[] NOT NULL DEFAULT '{}',
  current_issues TEXT[] NOT NULL DEFAULT '{}',
  implementations TEXT[] NOT NULL DEFAULT '{}',
  minister_name TEXT,
  minister_photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_by UUID
);

-- Create admin_users table for admin authentication
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID
);

-- Create reports table for submitted reports
CREATE TABLE public.reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT,
  evidence_urls TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending',
  submitted_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  reviewed_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.ministry_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('profile-images', 'profile-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('ministry-photos', 'ministry-photos', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('report-evidence', 'report-evidence', false);

-- RLS Policies for ministry_data
CREATE POLICY "Anyone can view ministry data" ON public.ministry_data FOR SELECT USING (true);
CREATE POLICY "Only admins can modify ministry data" ON public.ministry_data FOR ALL USING (
  auth.uid() IN (SELECT user_id FROM public.admin_users)
);

-- RLS Policies for admin_users
CREATE POLICY "Admins can view admin users" ON public.admin_users FOR SELECT USING (
  auth.uid() IN (SELECT user_id FROM public.admin_users)
);
CREATE POLICY "Only existing admins can create admins" ON public.admin_users FOR INSERT WITH CHECK (
  auth.uid() IN (SELECT user_id FROM public.admin_users)
);

-- RLS Policies for reports
CREATE POLICY "Anyone can view approved reports" ON public.reports FOR SELECT USING (
  status = 'approved' OR submitted_by = auth.uid()
);
CREATE POLICY "Authenticated users can create reports" ON public.reports FOR INSERT WITH CHECK (
  auth.uid() = submitted_by
);
CREATE POLICY "Admins can update reports" ON public.reports FOR UPDATE USING (
  auth.uid() IN (SELECT user_id FROM public.admin_users)
);

-- Storage policies for profile images
CREATE POLICY "Users can upload their own profile image" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'profile-images' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);
CREATE POLICY "Users can update their own profile image" ON storage.objects FOR UPDATE USING (
  bucket_id = 'profile-images' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);
CREATE POLICY "Anyone can view profile images" ON storage.objects FOR SELECT USING (
  bucket_id = 'profile-images'
);

-- Storage policies for ministry photos
CREATE POLICY "Admins can upload ministry photos" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'ministry-photos' AND 
  auth.uid() IN (SELECT user_id FROM public.admin_users)
);
CREATE POLICY "Anyone can view ministry photos" ON storage.objects FOR SELECT USING (
  bucket_id = 'ministry-photos'
);

-- Storage policies for report evidence
CREATE POLICY "Users can upload report evidence" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'report-evidence' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);
CREATE POLICY "Users can view their own report evidence" ON storage.objects FOR SELECT USING (
  bucket_id = 'report-evidence' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);
CREATE POLICY "Admins can view all report evidence" ON storage.objects FOR SELECT USING (
  bucket_id = 'report-evidence' AND 
  auth.uid() IN (SELECT user_id FROM public.admin_users)
);

-- Add trigger for updating timestamps
CREATE TRIGGER update_ministry_data_updated_at
  BEFORE UPDATE ON public.ministry_data
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reports_updated_at
  BEFORE UPDATE ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default ministry data
INSERT INTO public.ministry_data (ministry_id, name, address, contact, email, categories, current_issues, implementations) VALUES
('finance', 'Ministry of Finance', '49 Main & Urquhart Streets, Georgetown, Guyana', '592 227 3992, 592 225 6088, 592 227 7935', 'publicrelations@finance.gov.gy', 
 '{"Budget", "Tax Policy", "Economic Development", "Public Debt"}',
 '{"2024 Budget Implementation", "Tax Reform Initiative", "Debt Management Strategy"}',
 '{"Digital Tax Platform", "Budget Transparency Portal", "Economic Recovery Program"}'),
('health', 'Ministry of Health', '1 Brickdam, Georgetown, Guyana', '592 227 7986', 'mophguyanapr@gmail.com',
 '{"Healthcare", "Public Health", "Medical Services", "Health Policy"}',
 '{"Healthcare Access in Rural Areas", "Medical Equipment Shortages", "Staff Training Programs"}',
 '{"Telemedicine Initiative", "Mobile Health Clinics", "Healthcare Worker Training Program"}'),
('education', 'Ministry of Education', '21 Brickdam, Georgetown, Guyana', '592 223 7900', 'educationministrygy@gmail.com',
 '{"Primary Education", "Secondary Education", "Higher Education", "Technical Training"}',
 '{"School Infrastructure", "Teacher Shortage", "Educational Technology"}',
 '{"Digital Learning Platform", "Teacher Training Program", "School Improvement Projects"}'),
('housing', 'Ministry of Housing and Water', '41 Brickdam & United Nations Place, Georgetown, Guyana', '592 223 7521', 'ps.housing.water@gmail.com',
 '{"Housing Development", "Water Supply", "Sanitation", "Urban Planning"}',
 '{"Housing Shortage", "Water Access in Remote Areas", "Sewerage Systems"}',
 '{"Low-Income Housing Program", "Water Infrastructure Expansion", "Smart City Initiative"}'),
('agriculture', 'Ministry of Agriculture', 'Regent Street & Vlissengen Road, Bourda, Georgetown, Guyana', '592 223 7291', 'agri.pr.gy@gmail.com',
 '{"Crop Production", "Livestock", "Food Security", "Agricultural Technology"}',
 '{"Climate Change Impact", "Market Access", "Agricultural Modernization"}',
 '{"Smart Agriculture Program", "Farmer Support Initiative", "Food Security Strategy"}'),
('natural-resources', 'Ministry of Natural Resources', '96 Duke Street, Kingston, Georgetown, Guyana', '592 231 2506, 592 231 2511', 'ministry@nre.gov.gy',
 '{"Mining", "Forestry", "Petroleum", "Environmental Protection"}',
 '{"Environmental Impact", "Resource Management", "Local Content Development"}',
 '{"Sustainable Mining Initiative", "Forest Conservation Program", "Local Content Policy"}');