import { useState } from 'react';
import { useRouter } from 'next/router';
import {useRegister } from '../auth/queries';
import { Button, Flex, Text, TextField } from '@radix-ui/themes';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const router = useRouter();
  
  const { mutate: register, isPending, error } = useRegister();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    register(
      { username, password, first_name, last_name }, 
      {
        onSuccess: () => {
          router.push('/');
        }
      }
    );
  };
  
  return (
    <Flex direction="column" gap="4" style={{ maxWidth: '400px', margin: '0 auto', padding: '40px 20px' }}>
      <Text size="5" weight="bold">Register</Text>
      
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="3">
          <TextField.Root
              placeholder="First Name" 
              type="text" 
              value={first_name} 
              onChange={e => setFirstName(e.target.value)} 
              required
            />
          <TextField.Root
              placeholder="Last Name" 
              type="text" 
              value={last_name} 
              onChange={e => setLastName(e.target.value)} 
              required
            />
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
            {isPending ? 'Registering...' : 'Register'}
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}
