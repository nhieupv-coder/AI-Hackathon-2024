import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskEdit = ({ taskId, onTaskUpdated, token }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tasks/${taskId}`, {
          headers: { Authorization: token }
        });
        const task = response.data;
        setTitle(task.title);
        setDescription(task.description);
        setPriority(task.priority);
        setDueDate(task.dueDate);
      } catch (err) {
        setError('Failed to fetch task details. Please try again.');
      }
    };

    fetchTask();
  }, [taskId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:5000/tasks/${taskId}`, {
        title,
        description,
        priority,
        dueDate
      }, {
        headers: { Authorization: token }
      });
      if (response.status === 200) {
        setSuccess('Task updated successfully!');
        setError('');
        onTaskUpdated();
      }
    } catch (err) {
      setError('Task update failed. Please try again.');
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6 mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Edit Task</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-500 mb-1">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-lg w-full p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-500 mb-1">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded-lg w-full p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-500 mb-1">Priority:</label>
          <div className="relative">
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="border rounded-lg w-full p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
              required
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <i className="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-500 mb-1">Due Date:</label>
          <div className="relative">
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="border rounded-lg w-full p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <i className="fas fa-calendar-alt absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskEdit;
