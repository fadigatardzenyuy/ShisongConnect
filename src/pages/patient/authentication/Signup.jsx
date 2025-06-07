import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/complete-profile');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full flex rounded-2xl overflow-hidden shadow-2xl h-[95vh]">
        {/* Left side - Image and Welcome Message */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/80 to-green-800/80"></div>
          </div>
          <div className="relative z-10 flex flex-col justify-center p-12 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-4">Join Our Healthcare Community</h2>
              <p className="text-green-100 text-lg mb-8">
                Create your account and start your journey to better healthcare management.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-green-400/20 flex items-center justify-center">
                    <FiUser className="text-green-200" />
                  </div>
                  <span>Personalized healthcare experience</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-green-400/20 flex items-center justify-center">
                    <FiLock className="text-green-200" />
                  </div>
                  <span>Secure and private medical records</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right side - Signup Form */}
        <div className="w-full lg:w-1/2 bg-white p-8 lg:p-12">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-md mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-green-800 mb-2">Create Account</h1>
              <p className="text-green-600">Join our healthcare platform today</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r-lg"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-green-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 pl-10 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                    required
                  />
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-green-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 pl-10 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                    required
                  />
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-green-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 pl-10 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                    placeholder="Create a password"
                    required
                  />
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 hover:text-green-600"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Create Account
                    <FiArrowRight className="ml-2" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-green-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-green-600">Or sign up with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-2 border border-green-200 rounded-lg hover:bg-green-50 transition-colors duration-200"
                >
                  <FcGoogle className="h-5 w-5 mr-2" />
                  Google
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-2 border border-green-200 rounded-lg hover:bg-green-50 transition-colors duration-200"
                >
                  <FaFacebook className="h-5 w-5 mr-2 text-blue-600" />
                  Facebook
                </button>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-green-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-green-600 hover:text-green-800">
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Signup;