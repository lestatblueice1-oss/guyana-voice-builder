-- Create profiles table for user information
CREATE TABLE public.profiles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE,
    display_name TEXT,
    date_of_birth DATE,
    district_location TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create struggles/reports table
CREATE TABLE public.struggles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    headline TEXT NOT NULL,
    summary TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Infrastructure', 'Health', 'Housing', 'Education', 'Transportation', 'Victimization')),
    location TEXT NOT NULL,
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create communities table
CREATE TABLE public.communities (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    district TEXT,
    member_count INTEGER DEFAULT 0,
    created_by UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create community_members table
CREATE TABLE public.community_members (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(community_id, user_id)
);

-- Create surveys table
CREATE TABLE public.surveys (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    questions JSONB NOT NULL,
    created_by UUID NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create survey_responses table
CREATE TABLE public.survey_responses (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    survey_id UUID NOT NULL REFERENCES public.surveys(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    responses JSONB NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create resources table for tracking Guyana's resources
CREATE TABLE public.resources (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Oil & Gas', 'Mining', 'Timber', 'Bauxite', 'Agriculture')),
    location TEXT NOT NULL,
    description TEXT,
    resource_data JSONB, -- For storing specific data like BPD, profits, etc.
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.struggles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.surveys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for struggles
CREATE POLICY "Anyone can view struggles" ON public.struggles FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create struggles" ON public.struggles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own struggles" ON public.struggles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own struggles" ON public.struggles FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for communities
CREATE POLICY "Anyone can view communities" ON public.communities FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create communities" ON public.communities FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Community creators can update their communities" ON public.communities FOR UPDATE USING (auth.uid() = created_by);

-- Create RLS policies for community members
CREATE POLICY "Anyone can view community members" ON public.community_members FOR SELECT USING (true);
CREATE POLICY "Users can join communities" ON public.community_members FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can leave communities" ON public.community_members FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for surveys
CREATE POLICY "Anyone can view active surveys" ON public.surveys FOR SELECT USING (is_active = true);
CREATE POLICY "Authenticated users can create surveys" ON public.surveys FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Survey creators can update their surveys" ON public.surveys FOR UPDATE USING (auth.uid() = created_by);

-- Create RLS policies for survey responses
CREATE POLICY "Users can view their own responses" ON public.survey_responses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can submit survey responses" ON public.survey_responses FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for resources
CREATE POLICY "Anyone can view resources" ON public.resources FOR SELECT USING (true);
CREATE POLICY "Only authenticated users can create resources" ON public.resources FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Create update triggers for timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_struggles_updated_at BEFORE UPDATE ON public.struggles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_communities_updated_at BEFORE UPDATE ON public.communities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_surveys_updated_at BEFORE UPDATE ON public.surveys FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON public.resources FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for struggles
INSERT INTO public.struggles (user_id, headline, summary, category, location, verified) VALUES
('00000000-0000-0000-0000-000000000000', 'Georgetown Market Vendors Face Persistent Flooding Issues', 'Local vendors report daily losses due to inadequate drainage system. Water accumulates during rain, damaging goods and deterring customers from accessing the market area.', 'Infrastructure', 'Georgetown, Region 4', true),
('00000000-0000-0000-0000-000000000000', 'Rural Health Clinic Lacks Basic Medical Supplies', 'Residents of Berbice report the local clinic has been without essential medications for weeks. Many are forced to travel long distances for basic healthcare needs.', 'Health', 'Berbice, Region 6', true),
('00000000-0000-0000-0000-000000000000', 'Housing Development Promises Unfulfilled After Two Years', 'Families who paid deposits for affordable housing units report no progress on construction. Developer remains unreachable despite community attempts at contact.', 'Housing', 'Linden, Region 10', false),
('00000000-0000-0000-0000-000000000000', 'School Children Walk Miles on Dangerous Road Daily', 'Parents express concern over children safety on poorly maintained road to school. No street lights and heavy traffic create hazardous conditions for students.', 'Education', 'Anna Regina, Region 2', true);

-- Insert sample resources data
INSERT INTO public.resources (title, category, location, description, resource_data) VALUES
('Stabroek Block Oil Production', 'Oil & Gas', 'Offshore Guyana', 'Major oil discovery producing crude oil for export markets', '{"bpd": 380000, "annual_revenue": "$2.8B", "reserves": "11B barrels"}'),
('Aurora Gold Mine Operations', 'Mining', 'Cuyuni-Mazaruni, Region 7', 'Large-scale gold mining operation contributing to national economy', '{"annual_production": "180,000 oz", "employment": 800, "export_value": "$320M"}'),
('Demerara Sugar Estate', 'Agriculture', 'East Demerara, Region 4', 'Primary sugar production facility processing local cane', '{"annual_production": "45,000 tonnes", "employment": 1200, "export_markets": "Caribbean, EU"}'),
('Berbice Bauxite Mine', 'Bauxite', 'Upper Demerara-Berbice, Region 10', 'Bauxite extraction for aluminum production and export', '{"annual_production": "2.1M tonnes", "employment": 450, "primary_buyer": "RUSAL"}'),
('Iwokrama Forest Timber', 'Timber', 'Region 8', 'Sustainable forestry operations in protected rainforest area', '{"sustainable_yield": "15,000 cubic meters", "species": "Greenheart, Purpleheart", "certification": "FSC Certified"}');

-- Insert sample communities
INSERT INTO public.communities (name, description, district, created_by) VALUES 
('Georgetown Residents Alliance', 'Community group focused on improving infrastructure and services in Georgetown', 'Georgetown, Region 4', '00000000-0000-0000-0000-000000000000'),
('Berbice Health Advocacy', 'Advocating for better healthcare access in rural Berbice communities', 'Berbice, Region 6', '00000000-0000-0000-0000-000000000000'),
('Linden Housing Coalition', 'Working to address housing shortages and development issues in Linden', 'Linden, Region 10', '00000000-0000-0000-0000-000000000000');

-- Insert sample survey
INSERT INTO public.surveys (title, description, questions, created_by) VALUES
('How to Improve The Citizens Voice App', 'Help us make this app better for reporting community issues', 
'[
  {"question": "What feature would you most like to see added?", "type": "text"},
  {"question": "How easy is it to report issues?", "type": "rating", "scale": 5},
  {"question": "Which categories are most important to you?", "type": "multiple_choice", "options": ["Infrastructure", "Health", "Housing", "Education", "Transportation"]}
]', '00000000-0000-0000-0000-000000000000');