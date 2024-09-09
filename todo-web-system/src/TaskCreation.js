import React, { useState } from 'react';
import axios from 'axios';

const TaskCreation = ({ fetchTasks, token }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/tasks', {
        title,
        description,
        priority,
        dueDate
      }, {
        headers: { Authorization: token }
      });
      if (response.status === 201) {
        setSuccess('Task created successfully!');
        setTitle('');
        setDescription('');
        setPriority('Medium');
        setDueDate('');
        setError('');
        fetchTasks(); // Fetch tasks after creating a new task
      }
    } catch (err) {
      setError('Task creation failed. Please try again.');
    }
  };

  return (
    <section className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Create Task</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            id="title"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            id="description"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority:</label>
          <select
            id="priority"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          Create Task
        </button>
      </form>
    </section>
  );
};

export default TaskCreation;
