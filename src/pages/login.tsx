// // pages/login.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useLogin } from '../auth/queries';
import { Button, Flex, Text, TextField } from '@radix-ui/themes';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  const { mutate: login, isPending, error } = useLogin();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    login(
      { username, password }, 
      {
        onSuccess: () => {
          router.push('/');
        }
      }
    );
  };
  
  return (
    <Flex direction="column" gap="4" style={{ maxWidth: '400px', margin: '0 auto', padding: '40px 20px' }}>
      <Text size="5" weight="bold">Login</Text>
      
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="3">
          <TextField.Root
              placeholder="Username" 
              type="email" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              required
            />

            <TextField.Root 
              placeholder="Password" 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required
            />
          
          {error && (
            <Text color="red" size="2">{error.message}</Text>
          )}
          
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Logging in...' : 'Login'}
          </Button>
          <Button onClick={()=>{router.push('/register')}}>
            Register
          </Button>
          
        </Flex>
      </form>
    </Flex>
  );
}
