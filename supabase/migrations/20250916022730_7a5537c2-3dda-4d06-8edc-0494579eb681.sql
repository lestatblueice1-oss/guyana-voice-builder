-- Fix infinite recursion by creating security definer function first
-- Create security definer function to check admin status
CREATE OR REPLACE FUNCTION public.is_admin(user_uuid uuid DEFAULT auth.uid())
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = user_uuid
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Now drop ALL existing policies and recreate them using the function
DO $$
BEGIN
  -- Drop all policies on admin_users
  DROP POLICY IF EXISTS "Admins can view admin users" ON public.admin_users;
  DROP POLICY IF EXISTS "Only existing admins can create admins" ON public.admin_users;
  DROP POLICY IF EXISTS "Users can view admin users if they are admin" ON public.admin_users;
  DROP POLICY IF EXISTS "Admins can create admin users" ON public.admin_users;
  
  -- Drop all policies on ministry_data
  DROP POLICY IF EXISTS "Only admins can modify ministry data" ON public.ministry_data; 
  DROP POLICY IF EXISTS "Only admins can insert ministry data" ON public.ministry_data;
  DROP POLICY IF EXISTS "Only admins can update ministry data" ON public.ministry_data;
  DROP POLICY IF EXISTS "Only admins can delete ministry data" ON public.ministry_data;
END $$;

-- Create new admin_users policies
CREATE POLICY "Admins can view admin users" 
ON public.admin_users 
FOR SELECT 
USING (public.is_admin());

CREATE POLICY "Admins can create admin users" 
ON public.admin_users 
FOR INSERT 
WITH CHECK (public.is_admin());

-- Create new ministry_data policies  
CREATE POLICY "Only admins can insert ministry data" 
ON public.ministry_data 
FOR INSERT
WITH CHECK (public.is_admin());

CREATE POLICY "Only admins can update ministry data" 
ON public.ministry_data 
FOR UPDATE
USING (public.is_admin());

CREATE POLICY "Only admins can delete ministry data" 
ON public.ministry_data 
FOR DELETE
USING (public.is_admin());