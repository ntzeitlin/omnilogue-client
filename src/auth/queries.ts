// auth/queries.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { loginUser, registerUser } from '../data/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';




// Custom hook to get and set token from localStorage
export function useAuthToken() {
  const queryClient = useQueryClient();
  
  // Get token from localStorage
  const { data: token, isLoading: isLoading } = useQuery({
    queryKey: ['token'],
    queryFn: () => {
      return localStorage.getItem('token') || null
    },
    staleTime: Infinity, // Token doesn't need refetching
    gcTime: Infinity, // Keep token in cache
  });

  const {data: userId} = useQuery({
    queryKey: ['userId'],
    queryFn: () => {
      return localStorage.getItem('userId') || null
    },
    staleTime: Infinity,
    gcTime: Infinity,
  })
  
  // Update token in both cache and localStorage
  const setToken = (newToken) => {    
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
    queryClient.setQueryData(['token'], newToken);
  };

  const setUserId = (newId) => {
    if (newId) {
      localStorage.setItem('userId', newId)
    } else {
      localStorage.removeItem('userId') 
    }
    queryClient.setQueryData(['userId'], newId)
  }


  return { token, setToken, userId, setUserId, isLoading };
}


// Login mutation
export function useLogin() {
    const { setToken, setUserId } = useAuthToken();
    
    return useMutation({
      mutationFn: (credentials) => loginUser(credentials),
      onSuccess: (data) => {
        setToken(data.token)
        setUserId(data.userId)
      },
    });
  }
  
  // Logout mutation
  export function useLogout() {
    const queryClient = useQueryClient();
    const { setToken, setUserId } = useAuthToken();
    const router = useRouter();
    
    return useMutation({
      mutationFn:  () => {
        setToken(null);
        setUserId(null)
        queryClient.removeQueries({ queryKey: ['token'] });
        queryClient.removeQueries({ queryKey: ['userId'] });
      },
      onSuccess: () => {
        router.push('/login');
      },
    });
  }
  
  // Registration mutation
  export function useRegister() {
    const { setToken } = useAuthToken();
    
    return useMutation({
      mutationFn: (credentials) => registerUser(credentials),
      onSuccess: (data) => {
        setToken(data.token);
      },
    });
  }
  

  export function useAuthStatus() {
    const { token, isLoading } = useAuthToken();
    
    return {
      isAuthenticated: !!token,
      isLoading: isLoading
    };
}