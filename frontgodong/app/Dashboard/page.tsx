"use client";

import { useEffect } from 'react';
import { useAuth } from '../../components/Auth/useAuth';

export default function Dashboard() {
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect handled by middleware, but you can add additional logic here if needed
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return (
    <div>
    </div>
  );
}