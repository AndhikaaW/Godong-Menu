"use client"
import React, { useEffect } from 'react'
import Admin from './dashboard/page'
import { useAuth } from '@/components/Auth/useAuth';
export default function page() {
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
    <Admin/>
  )
}
