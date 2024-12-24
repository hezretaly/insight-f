import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function Login2() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login
        console.log('Login successful!', data);
        // Store the token (e.g., in local storage)
        localStorage.setItem('token', data.access_token);

        // Optionally, store user data
        localStorage.setItem('user', JSON.stringify(data.user));

        // login(data.token, data.user);


        // Redirect to the dashboard or another page
        // (You'll likely want to use a routing library like react-router-dom)
        // window.location.href = '/dashboard';
        navigate('/ch1');
      } else {
        // Handle errors from the API
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!password) {
      setError('Password is required');
      return false;
    }
    // Add more validation as needed (e.g., email format)
    return true;
  };

  return (
    <div className='max-w-xl justify-items-center'>
    <img src="eranatus-high-resolution-logo-grayscale-transparent.svg" alt="logo" className='full pb-4 lg:-mt-10' />
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className='text-3xl font-bold mb-5'>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
            <Button type="submit" disabled={isLoading} className='w-full mt-6'>
                {isLoading ? 'Loading...' : 'Login'}
            </Button>
        </form>
      </CardContent>
    </Card>  
    </div>
    
  );
}