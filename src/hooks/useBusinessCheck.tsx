import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useBusinessCheck = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkUserBusiness = async () => {
      if (authLoading) return;
      
      if (!user) {
        setChecking(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('businesses')
          .select('id')
          .eq('owner_id', user.id)
          .limit(1);

        if (error) throw error;

        if (!data || data.length === 0) {
          toast.info('Complete your profile by listing your business!');
          navigate('/add-business');
        }
      } catch (error) {
        console.error('Error checking business:', error);
      } finally {
        setChecking(false);
      }
    };

    checkUserBusiness();
  }, [user, authLoading, navigate]);

  return { checking };
};
