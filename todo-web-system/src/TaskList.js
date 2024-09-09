import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TaskEdit from './TaskEdit';
import TaskCreation from './TaskCreation';
import Modal from './Modal';
import './TaskList.css';

const TaskList = ({ token: propToken }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [completionFilter, setCompletionFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const navigate = useNavigate();

  const token = propToken || localStorage.getItem('token');

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks', {
        headers: { Authorization: token }
      });
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again.');
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redirect to login if token is null
    } else {
      fetchTasks();
    }
  }, [token, navigate]);

  const handleComplete = async (taskId) => {
    try {
      const response = await axios.patch(`http://localhost:5000/tasks/${taskId}`, {
        completed: true
      }, {
        headers: { Authorization: token }
      });
      if (response.status === 200) {
        setTasks(tasks.map(task => task._id === taskId ? { ...task, completed: true } : task));
      }
    } catch (err) {
      setError('Failed to mark task as completed. Please try again.');
    }
  };

  const handleTaskUpdated = () => {
    setSelectedTaskId(null);
    fetchTasks();
  };

  const filteredTasks = tasks.filter(task => {
    const priorityMatch = priorityFilter === 'All' || task.priority === priorityFilter;
    const completionMatch = completionFilter === 'All' || (completionFilter === 'Completed' ? task.completed : !task.completed);
    const searchMatch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return priorityMatch && completionMatch && searchMatch;
  });

  return (
    <div className="bg-gradient-to-r from-white to-gray-100 min-h-screen flex items-center justify-center p-4">
      <section className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Task List</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
          <div className="flex space-x-2 mb-4 md:mb-0">
            <select
              className="border rounded-lg p-2"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <select
              className="border rounded-lg p-2"
              value={completionFilter}
              onChange={(e) => setCompletionFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Complete</option>
              <option value="Incomplete">Incomplete</option>
            </select>
          </div>
          <input
            type="text"
            className="border rounded-lg p-2 w-full md:w-1/3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or description"
          />
        </div>

        <TaskCreation fetchTasks={fetchTasks} token={token} />

        <div className="space-y-4">
          {filteredTasks.map(task => (
            <div key={task._id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm">
              <div>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-sm text-gray-600">Priority: {task.priority}</p>
                <p className="text-sm text-gray-600">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md"
                  onClick={() => handleComplete(task._id)}
                  disabled={task.completed}
                >
                  {task.completed ? 'Completed' : 'Mark as Complete'}
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md"
                  onClick={() => setSelectedTaskId(task._id)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Modal isOpen={!!selectedTaskId} onClose={() => setSelectedTaskId(null)}>
        {selectedTaskId && (
          <TaskEdit taskId={selectedTaskId} onTaskUpdated={handleTaskUpdated} token={token} />
        )}
      </Modal>
    </div>
  );
};

export default TaskList;
