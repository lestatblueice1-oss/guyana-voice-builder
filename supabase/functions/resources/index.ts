import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const url = new URL(req.url);
    
    // Handle /api/resources/live endpoint
    if (url.pathname.includes('/live')) {
      try {
        // Simulate fetching live petroleum data
        const liveData = {
          source: "https://petroleum.gov.gy/data-visualization",
          last_updated: new Date().toISOString(),
          oil_production: {
            daily_barrels: Math.floor(Math.random() * 50000) + 300000,
            total_wells: 12,
            active_rigs: 3
          },
          gas_production: {
            daily_mcf: Math.floor(Math.random() * 10000) + 50000,
            reserves: "15+ TCF"
          },
          revenue: {
            monthly_usd: Math.floor(Math.random() * 100000000) + 500000000,
            ytd_usd: Math.floor(Math.random() * 1000000000) + 6000000000
          },
          blocks: [
            { name: "Stabroek Block", operator: "ExxonMobil", status: "Producing" },
            { name: "Kaieteur Block", operator: "ExxonMobil", status: "Exploration" },
            { name: "Canje Block", operator: "ExxonMobil", status: "Exploration" }
          ]
        };

        return new Response(
          JSON.stringify(liveData),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (error) {
        console.error('Error fetching live data:', error);
        return new Response(
          JSON.stringify({ error: "Failed to fetch live data", detail: error.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Handle regular /api/resources endpoint
    if (req.method === 'GET') {
      const { data, error } = await supabaseClient
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching resources:', error);
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ resources: data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in resources function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});