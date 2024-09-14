import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to fetch tasks. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (newTask) => {
    try {
      await axios.post(`${API_URL}/tasks`, newTask);
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
      setError('Failed to create task. Please try again.');
    }
  };

  const handleUpdateTask = async (id, updatedTask) => {
    try {
      await axios.put(`${API_URL}/tasks/${id}`, updatedTask);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Failed to update task. Please try again.');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Failed to delete task. Please try again.');
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div className="text-center mt-8">Loading tasks...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <CreateTaskDialog onCreateTask={handleCreateTask} />
      </div>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4">
          <input
            type="text"
            placeholder="Search task..."
            className="w-full border rounded px-3 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input type="checkbox" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TaskRow = ({ task, onUpdateTask, onDeleteTask }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <input type="checkbox" />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{task.title}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{task.description}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <EditTaskDialog task={task} onUpdateTask={onUpdateTask} />
        <DeleteTaskDialog onDeleteTask={() => onDeleteTask(task.id)} />
      </td>
    </tr>
  );
};

const CreateTaskDialog = ({ onCreateTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateTask({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">New task</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black bg-opacity-50 fixed inset-0" />
        <Dialog.Content className="bg-white rounded-lg p-6 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title className="text-xl font-bold mb-4">Create New Task</Dialog.Title>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block mb-2">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded px-2 py-1"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block mb-2">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded px-2 py-1"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Dialog.Close asChild>
                <button type="button" className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
              </Dialog.Close>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const EditTaskDialog = ({ task, onUpdateTask }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateTask(task.id, { title, description });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="text-indigo-600 hover:text-indigo-900">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black bg-opacity-50 fixed inset-0" />
        <Dialog.Content className="bg-white rounded-lg p-6 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title className="text-xl font-bold mb-4">Edit Task</Dialog.Title>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block mb-2">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded px-2 py-1"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block mb-2">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded px-2 py-1"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Dialog.Close asChild>
                <button type="button" className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
              </Dialog.Close>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const DeleteTaskDialog = ({ onDeleteTask }) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="ml-2 text-red-600 hover:text-red-900">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black bg-opacity-50 fixed inset-0" />
        <AlertDialog.Content className="bg-white rounded-lg p-6 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <AlertDialog.Title className="text-xl font-bold mb-4">Are you sure?</AlertDialog.Title>
          <AlertDialog.Description className="mb-4">
            This action cannot be undone. This will permanently delete the task.
          </AlertDialog.Description>
          <div className="flex justify-end space-x-2">
            <AlertDialog.Cancel asChild>
              <button className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={onDeleteTask}
              >
                Delete
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default TaskList;
