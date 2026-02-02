import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 animate-fade-in">
                        Manage Your Tasks
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600"> Efficiently</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto animate-slide-up">
                        A modern task management application with powerful features to help you stay organized and productive.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-up">
                        <Link
                            to="/signup"
                            className="btn btn-primary text-lg px-8 py-3"
                        >
                            Get Started Free
                        </Link>
                        <Link
                            to="/login"
                            className="btn btn-secondary text-lg px-8 py-3"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="card text-center animate-slide-up">
                        <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4">
                            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Task Management</h3>
                        <p className="text-gray-600">Create, update, and organize your tasks with a beautiful and intuitive interface.</p>
                    </div>

                    <div className="card text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <div className="mx-auto h-16 w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Search & Filter</h3>
                        <p className="text-gray-600">Quickly find tasks with powerful search and filter by status and priority.</p>
                    </div>

                    <div className="card text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <div className="mx-auto h-16 w-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mb-4">
                            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
                        <p className="text-gray-600">Your data is protected with industry-standard security and authentication.</p>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-24 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl shadow-2xl p-12 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Ready to boost your productivity?</h2>
                    <p className="text-blue-100 mb-8 text-lg">Join now and start managing your tasks like a pro.</p>
                    <Link
                        to="/signup"
                        className="btn bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3 inline-block"
                    >
                        Create Your Free Account
                    </Link>
                </div>
            </div>
        </div>
    );
}
