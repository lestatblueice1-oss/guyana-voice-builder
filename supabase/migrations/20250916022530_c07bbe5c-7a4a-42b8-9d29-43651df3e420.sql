-- Fix infinite recursion in RLS policies for ministry_data
-- Drop the existing problematic policy
DROP POLICY IF EXISTS "Only admins can modify ministry data" ON public.ministry_data;

-- Create separate policies - anyone can view, only admins can modify
CREATE POLICY "Anyone can view ministry data" 
ON public.ministry_data 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can insert ministry data" 
ON public.ministry_data 
FOR INSERT
WITH CHECK (auth.uid() IN ( SELECT admin_users.user_id FROM admin_users ));

CREATE POLICY "Only admins can update ministry data" 
ON public.ministry_data 
FOR UPDATE
USING (auth.uid() IN ( SELECT admin_users.user_id FROM admin_users ));

CREATE POLICY "Only admins can delete ministry data" 
ON public.ministry_data 
FOR DELETE
USING (auth.uid() IN ( SELECT admin_users.user_id FROM admin_users ));