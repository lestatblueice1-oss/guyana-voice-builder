import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Struggle {
  id: string;
  headline: string;
  summary: string;
  category: string;
  location: string;
  created_at: string;
  verified: boolean;
  user_id: string;
}

export interface Resource {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  created_at: string;
  resource_data: any;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  district: string;
  member_count: number;
  created_at: string;
  created_by: string;
}

export const useStruggles = () => {
  const [struggles, setStruggles] = useState<Struggle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStruggles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('struggles');
      
      if (error) throw error;
      
      setStruggles(data.struggles || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch struggles');
      console.error('Error fetching struggles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStruggles();
  }, []);

  return { struggles, loading, error, refetch: fetchStruggles };
};

export const useResources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('resources');
      
      if (error) throw error;
      
      setResources(data.resources || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch resources');
      console.error('Error fetching resources:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return { resources, loading, error, refetch: fetchResources };
};

export const useLiveResourceData = () => {
  const [liveData, setLiveData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLiveData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('resources', {
        body: { endpoint: 'live' }
      });
      
      if (error) throw error;
      
      setLiveData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch live data');
      console.error('Error fetching live data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveData();
  }, []);

  return { liveData, loading, error, refetch: fetchLiveData };
};

export const useCommunities = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCommunities = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('communities');
      
      if (error) throw error;
      
      setCommunities(data.communities || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch communities');
      console.error('Error fetching communities:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  return { communities, loading, error, refetch: fetchCommunities };
};