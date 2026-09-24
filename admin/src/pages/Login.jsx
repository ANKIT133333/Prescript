    import React, { useState } from 'react'
    import axios from 'axios'
    import { assets } from '../assets/assets_frontend/assets.js'
    import { toast } from 'react-toastify'

    const Login = () => {
        const [state, setState] = useState('Admin')
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [loading, setLoading] = useState(false)
        const [message, setMessage] = useState('')
        const [error, setError] = useState('')

        const handleSubmit = async (e) => {
            e.preventDefault()
            setLoading(true)
            setError('')
            setMessage('')

            try {
                const { data } = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/api/admin/login`,
                    { email, password }
                )

                if (data.success) {
                    localStorage.setItem('adminToken', data.token)
                    setMessage(data.message || 'Login successful')
                } else {
                    toast.error(data.message)
                    setError(data.message || 'Login failed')
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Unable to connect to the server')
            } finally {
                setLoading(false)
            }
        }

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
                    <div className="mb-6 flex justify-center">
                        <img src={assets.logo} alt="logo" className="h-12" />
                    </div>

                    <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">{state} Login</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@example.com"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                                required
                            />
                        </div>

                        {error ? <p className="text-sm text-red-600">{error}</p> : null}
                        {message ? <p className="text-sm text-green-600">{message}</p> : null}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? 'Signing in...' : 'Login'}

                        </button>
                        {
                            state === 'Admin'
                                ? <p>Doctor Login ? <span className='text-primary underline cursor-pointer' onClick={() => setState('Doctor')}>Click Here</span></p>
                                : <p>Admin Login ? <span className='text-primary underline cursor-pointer' onClick={() => setState('Admin')}>Click Here</span></p>
                        }
                    </form>
                </div>
            </div>
        )
    }

    export default Login
