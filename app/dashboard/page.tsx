'use client';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TASKS_QUERY } from '@/graphql/queries';
import { DELETE_TASK_MUTATION } from '@/graphql/mutations';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

export default function Dashboard() {
  const { data, loading, error, refetch } = useQuery(GET_TASKS_QUERY);
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION);
  const router = useRouter();
  const auth = useAuth();
  const logout = auth?.logout;

  const handleDelete = async (id: string) => {
    try {
      const { data } = await deleteTask({ variables: { id } });
      toast.success(data.deleteTask); // Shows "Task deleted successfully"
      refetch(); // Reload tasks after deletion
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      toast.error(`Failed to delete task: ${errorMessage}`);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Loading tasks...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-red-500">Error loading tasks</p>
      </div>
    );

  console.log(data); // Debug: Check if tasks are fetched correctly

  return (
    <ProtectedRoute>
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 mt-6 sm:mt-10">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Manage some tasks today!</h2>

        {/* Action Buttons - Responsive */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mb-6">
          <button
            onClick={() => router.push('/task-management')}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm sm:text-base"
          >
            Create a task
          </button>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm sm:text-base"
          >
            Log out
          </button>
        </div>

        {!data?.getTasks || data.getTasks.length === 0 ? (
          <p className="text-center py-8 bg-gray-50 rounded border border-gray-200">
            No tasks available. Create a new task.
          </p>
        ) : (
          <>
            {/* Desktop Table - Hidden on mobile */}
            <div className="hidden sm:block">
              <table className="w-full border-collapse border border-gray-300 rounded overflow-hidden">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2 text-left">ID</th>
                    <th className="border p-2 text-left">Title</th>
                    <th className="border p-2 text-left">Description</th>
                    <th className="border p-2 text-left">Status</th>
                    <th className="border p-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.getTasks.map((task: Task) => (
                    <tr key={task.id} className="border hover:bg-gray-50">
                      <td className="border p-2">{task.id}</td>
                      <td className="border p-2">{task.title}</td>
                      <td className="border p-2">{task.description}</td>
                      <td className="border p-2">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            task.status === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : task.status === 'In Progress'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>
                      <td className="border p-2 text-center">
                        <button
                          onClick={() => router.push(`/task-management?id=${task.id}`)}
                          className="bg-blue-500 text-white px-3 py-1 rounded mr-2 text-sm"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards - Shown only on mobile */}
            <div className="sm:hidden space-y-4">
              {data.getTasks.map((task: Task) => (
                <div key={task.id} className="border rounded shadow-sm bg-white p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold truncate flex-1">{task.title}</h3>
                    <span
                      className={`ml-2 px-2 py-1 rounded text-xs ${
                        task.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : task.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {task.description}
                  </p>

                  <div className="text-xs text-gray-500 mb-3">ID: {task.id}</div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => router.push(`/task-management?id=${task.id}`)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm flex-1"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm flex-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}
