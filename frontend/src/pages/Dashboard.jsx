import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { profileAPI, tasksAPI } from '../services/api';

export default function Dashboard() {
    const [profile, setProfile] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [taskLoading, setTaskLoading] = useState(false);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [showProfileEdit, setShowProfileEdit] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');

    const { register: registerTask, handleSubmit: handleTaskSubmit, reset: resetTask, formState: { errors: taskErrors } } = useForm();
    const { register: registerProfile, handleSubmit: handleProfileSubmit, setValue: setProfileValue } = useForm();

    useEffect(() => {
        fetchProfile();
        fetchTasks();
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [searchQuery, statusFilter, priorityFilter]);

    const fetchProfile = async () => {
        try {
            const response = await profileAPI.getProfile();
            setProfile(response.data.user);
            setProfileValue('name', response.data.user.name);
            setProfileValue('email', response.data.user.email);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const fetchTasks = async () => {
        setTaskLoading(true);
        try {
            const params = {};
            if (searchQuery) params.search = searchQuery;
            if (statusFilter) params.status = statusFilter;
            if (priorityFilter) params.priority = priorityFilter;

            const response = await tasksAPI.getTasks(params);
            setTasks(response.data.tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setTaskLoading(false);
            setLoading(false);
        }
    };

    const handleCreateTask = async (data) => {
        try {
            await tasksAPI.createTask(data);
            setShowTaskModal(false);
            resetTask();
            fetchTasks();
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleUpdateTask = async (data) => {
        try {
            await tasksAPI.updateTask(editingTask._id, data);
            setShowTaskModal(false);
            setEditingTask(null);
            resetTask();
            fetchTasks();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDeleteTask = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await tasksAPI.deleteTask(id);
                fetchTasks();
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        }
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setProfileValue('title', task.title);
        setProfileValue('description', task.description);
        setProfileValue('status', task.status);
        setProfileValue('priority', task.priority);
        setShowTaskModal(true);
    };

    const handleUpdateProfile = async (data) => {
        try {
            const response = await profileAPI.updateProfile(data);
            setProfile(response.data.user);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setShowProfileEdit(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const openNewTaskModal = () => {
        setEditingTask(null);
        resetTask();
        setShowTaskModal(true);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="spinner"></div>
            </div>
        );
    }

    const taskStats = {
        total: tasks.length,
        pending: tasks.filter(t => t.status === 'pending').length,
        inProgress: tasks.filter(t => t.status === 'in-progress').length,
        completed: tasks.filter(t => t.status === 'completed').length,
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
            {/* Animated background blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

            {/* Modern Header with Glassmorphism */}
            <div className="relative backdrop-blur-xl bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-pink-600/90 shadow-2xl border-b border-white/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                        <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                                <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-lg flex items-center justify-center transform rotate-3 hover:rotate-6 transition-transform">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-4xl font-black text-white tracking-tight">Dashboard</h1>
                                    <p className="text-blue-100 text-sm font-medium">Manage your tasks efficiently</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 md:mt-0 flex items-center space-x-4">
                            <div className="group flex items-center space-x-3 bg-white/20 backdrop-blur-lg rounded-2xl px-5 py-3 border border-white/30 hover:bg-white/30 transition-all shadow-lg hover:shadow-xl">
                                <div className="relative">
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold shadow-lg ring-4 ring-white/30">
                                        {profile?.name?.[0]?.toUpperCase()}
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white"></div>
                                </div>
                                <div className="text-white">
                                    <p className="font-bold text-lg">{profile?.name}</p>
                                    <p className="text-sm text-blue-100 font-medium">{profile?.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowProfileEdit(!showProfileEdit)}
                                className="bg-white text-purple-600 px-6 py-3 rounded-xl hover:bg-opacity-90 font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
                            >
                                ✏️ Edit
                            </button>
                        </div>
                    </div>

                    {/* Modern Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="group relative bg-white/20 backdrop-blur-xl rounded-2xl p-5 border border-white/30 hover:bg-white/30 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 transform">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white/80 text-sm font-semibold mb-1">Total Tasks</p>
                                    <p className="text-4xl font-black text-white">{taskStats.total}</p>
                                </div>
                                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="group relative bg-white/20 backdrop-blur-xl rounded-2xl p-5 border border-white/30 hover:bg-white/30 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 transform">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white/80 text-sm font-semibold mb-1">Pending</p>
                                    <p className="text-4xl font-black text-white">{taskStats.pending}</p>
                                </div>
                                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="group relative bg-white/20 backdrop-blur-xl rounded-2xl p-5 border border-white/30 hover:bg-white/30 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 transform">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white/80 text-sm font-semibold mb-1">In Progress</p>
                                    <p className="text-4xl font-black text-white">{taskStats.inProgress}</p>
                                </div>
                                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-lg">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="group relative bg-white/20 backdrop-blur-xl rounded-2xl p-5 border border-white/30 hover:bg-white/30 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 transform">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white/80 text-sm font-semibold mb-1">Completed</p>
                                    <p className="text-4xl font-black text-white">{taskStats.completed}</p>
                                </div>
                                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Profile Edit Form */}
                {showProfileEdit && (
                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-8 border border-white/50 animate-slide-up">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-black text-gray-900">Edit Profile</h3>
                        </div>
                        <form onSubmit={handleProfileSubmit(handleUpdateProfile)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all"
                                    {...registerProfile('name', { required: true })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all"
                                    {...registerProfile('email', { required: true })}
                                />
                            </div>
                            <div className="md:col-span-2 flex space-x-4">
                                <button type="submit" className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all">
                                    💾 Update Profile
                                </button>
                                <button type="button" onClick={() => setShowProfileEdit(false)} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-all">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Modern Action Bar */}
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 mb-8 border border-white/50">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
                        <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">My Tasks</h2>
                        </div>
                        <button onClick={openNewTaskModal} className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all overflow-hidden">
                            <span className="relative z-10 flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Create New Task
                            </span>
                        </button>
                    </div>

                    {/* Modern Filters */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <select
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="">All Status</option>
                            <option value="pending">⏳ Pending</option>
                            <option value="in-progress">⚡ In Progress</option>
                            <option value="completed">✅ Completed</option>
                        </select>
                        <select
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium"
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                        >
                            <option value="">All Priority</option>
                            <option value="low">🟢 Low</option>
                            <option value="medium">🟡 Medium</option>
                            <option value="high">🔴 High</option>
                        </select>
                    </div>
                </div>

                {/* Tasks Grid */}
                {taskLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="relative">
                            <div className="h-16 w-16 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin"></div>
                        </div>
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="text-center py-16 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50">
                        <div className="inline-block p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-6">
                            <svg className="mx-auto h-16 w-16 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">No tasks yet!</h3>
                        <p className="text-gray-600 text-lg mb-6">Start creating tasks to boost your productivity</p>
                        <button onClick={openNewTaskModal} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all">
                            ✨ Create Your First Task
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tasks.map((task, index) => (
                            <div key={task._id} className="group relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl p-6 border border-white/50 hover:-translate-y-1 transform transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl -z-10 group-hover:scale-150 transition-transform duration-500"></div>
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-black text-gray-900 flex-1 pr-2">{task.title}</h3>
                                    <span className={`badge badge-${task.priority} px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider shadow-md`}>
                                        {task.priority === 'high' && '🔴'} {task.priority === 'medium' && '🟡'} {task.priority === 'low' && '🟢'} {task.priority}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-5 line-clamp-2 leading-relaxed">{task.description}</p>
                                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                    <span className={`badge badge-${task.status} px-4 py-2 rounded-lg font-bold shadow-md`}>
                                        {task.status === 'completed' && '✅'} {task.status === 'in-progress' && '⚡'} {task.status === 'pending' && '⏳'} {task.status.replace('-', ' ')}
                                    </span>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEditTask(task)}
                                            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all hover:scale-110 transform"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTask(task._id)}
                                            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all hover:scale-110 transform"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Task Modal */}
            {showTaskModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-slide-up">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            {editingTask ? 'Edit Task' : 'Create New Task'}
                        </h2>
                        <form onSubmit={handleTaskSubmit(editingTask ? handleUpdateTask : handleCreateTask)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    className="input"
                                    defaultValue={editingTask?.title}
                                    placeholder="Task title"
                                    {...registerTask('title', { required: 'Title is required' })}
                                />
                                {taskErrors.title && (
                                    <p className="mt-1 text-sm text-red-600">{taskErrors.title.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    className="input"
                                    rows={4}
                                    defaultValue={editingTask?.description}
                                    placeholder="Task description"
                                    {...registerTask('description', { required: 'Description is required' })}
                                />
                                {taskErrors.description && (
                                    <p className="mt-1 text-sm text-red-600">{taskErrors.description.message}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                    <select
                                        className="input"
                                        defaultValue={editingTask?.status || 'pending'}
                                        {...registerTask('status')}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                                    <select
                                        className="input"
                                        defaultValue={editingTask?.priority || 'medium'}
                                        {...registerTask('priority')}
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex space-x-4 pt-4">
                                <button type="submit" className="flex-1 btn btn-primary">
                                    {editingTask ? 'Update' : 'Create'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowTaskModal(false);
                                        setEditingTask(null);
                                        resetTask();
                                    }}
                                    className="flex-1 btn btn-secondary"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
