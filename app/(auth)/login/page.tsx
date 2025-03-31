'use client';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '@/graphql/mutations';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login({ variables: data });
      router.push('/dashboard');
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('email')}
          placeholder="Email"
          className="border p-2 w-full mb-2"
        />
        <p className="text-red-500">{errors.email?.message}</p>

        <input
          type="password"
          {...register('password')}
          placeholder="Password"
          className="border p-2 w-full mb-2"
        />
        <p className="text-red-500">{errors.password?.message}</p>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && <p className="text-red-500">{error.message}</p>}
      </form>
    </div>
  );
}
