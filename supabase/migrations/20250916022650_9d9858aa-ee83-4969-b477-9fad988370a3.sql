-- Fix infinite recursion in admin_users RLS policies
-- Drop existing problematic policies first
DROP POLICY IF EXISTS "Admins can view admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Only existing admins can create admins" ON public.admin_users;

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

-- Create new policies using the security definer function
CREATE POLICY "Users can view admin users if they are admin" 
ON public.admin_users 
FOR SELECT 
USING (public.is_admin());

CREATE POLICY "Admins can create admin users" 
ON public.admin_users 
FOR INSERT 
WITH CHECK (public.is_admin());

-- Update ministry_data policies to use the security definer function
DROP POLICY IF EXISTS "Only admins can insert ministry data" ON public.ministry_data;
DROP POLICY IF EXISTS "Only admins can update ministry data" ON public.ministry_data;
DROP POLICY IF EXISTS "Only admins can delete ministry data" ON public.ministry_data;

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