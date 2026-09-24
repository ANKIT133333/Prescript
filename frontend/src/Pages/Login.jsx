import React, { useState, useContext, useEffect } from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const { backendUrl, token, setToken } = useContext(AppContext)

  const navigate = useNavigate();

  const [state, setState] = useState('Sign Up');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);





  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (state === "Sign Up") {
        // Sign Up
        const { data } = await axios.post(
          backendUrl + "/api/user/register",
          {
            name,
            email,
            password,
          }
        );

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);

          toast.success("Account created successfully");

          // Reset form
          setEmail("");
          setPassword("");
          setName("");
          setRememberMe(false);
        } else {
          toast.error(data.message);
        }
      } else {
        // Login
        const { data } = await axios.post(
          backendUrl + "/api/user/login",
          {
            email,
            password,
          }
        );

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);

          toast.success("Login successful");

          // Reset form
          setEmail("");
          setPassword("");
          setName("");
          setRememberMe(false);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }


  };

  useEffect(() => {

    if (token) {
      navigate("/")
    }
  }, [token, navigate]); ``



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={assets.logo} alt="Prescripto" className="h-12" />
        </div>

        {/* Form Container */}
        <div className="bg-white px-6 py-8 rounded-lg shadow-lg border border-gray-200">
          {/* Title */}
          <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field (Sign Up Only) */}
            {state === 'Sign Up' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  required={state === 'Sign Up'}
                />
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>

            {/* Remember Me & Forgot Password (Login Only) */}
            {state === 'Login' && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                  Forgot Password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold mt-6"
            >
              {state === 'Sign Up' ? 'Create Account' : 'Login'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-sm text-gray-600">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Toggle State */}
          <div className="text-center">
            {state === 'Sign Up' ? (
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setState('Login');
                    setName('');
                    setEmail('');
                    setPassword('');
                  }}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Login here
                </button>
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setState('Sign Up');
                    setEmail('');
                    setPassword('');
                  }}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Sign up
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-xs text-gray-500 mt-6">
          By {state === 'Sign Up' ? 'creating an account' : 'logging in'}, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;
