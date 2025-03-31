'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_TASK_MUTATION, UPDATE_TASK_MUTATION } from '@/graphql/mutations';
import { GET_TASKS_QUERY } from '@/graphql/queries';
import toast from 'react-hot-toast';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

export default function TaskManagementPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const taskId = searchParams.get('id');

  const [task, setTask] = useState({ title: '', description: '', status: 'pending' });

  // Fetch tasks only if editing
  const { data, loading } = useQuery(GET_TASKS_QUERY, {
    skip: !taskId,
  });

  useEffect(() => {
    if (taskId && data?.getTasks) {
      const existingTask = data.getTasks.find((t: Task) => t.id === taskId);
      if (existingTask) setTask(existingTask);
    }
  }, [taskId, data]);

  const [createTask] = useMutation(CREATE_TASK_MUTATION, {
    refetchQueries: [{ query: GET_TASKS_QUERY }],
  });

  const [updateTask] = useMutation(UPDATE_TASK_MUTATION, {
    refetchQueries: [{ query: GET_TASKS_QUERY }],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let response;
      if (taskId) {
        response = await updateTask({ variables: { id: taskId, ...task } });
        toast.success('Task updated successfully');
      } else {
        response = await createTask({ variables: { ...task } });
        toast.success('Task created successfully');
      }

      if (response.data) {
        setTimeout(() => router.push('/dashboard'), 500); // Redirect after success
      }
    } catch (err) {
      toast.error(`Something went wrong! ${(err as Error).message}`);
    }
  };

  if (loading) return <p>Loading task...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">
        {taskId ? 'Edit Task' : 'Create Task'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
