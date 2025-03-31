'use client';
import { useMutation } from '@apollo/client';
import { SIGNUP_MUTATION } from '@/graphql/mutations';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const router = useRouter();
  const [signUp, { loading, error }] = useMutation(SIGNUP_MUTATION);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await signUp({ variables: data });
      router.push('/login');
      console.log('Signup success:', data);
    } catch (err) {
      console.error('Sign up failed', err);
    }
  };

  if (error) {
    console.error('GraphQL Error:', error);
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('name')}
          placeholder="Name"
          className="border p-2 w-full mb-2"
        />
        <p className="text-red-500">{errors.name?.message}</p>

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
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>

        {error && <p className="text-red-500">{error.message}</p>}
      </form>
    </div>
  );
}
