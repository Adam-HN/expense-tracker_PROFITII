import React, { useState, useContext } from 'react';
import AuthLayouts from '../../components/Layouts/AuthLayouts';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import Input from '../../components/Inputs/Input';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/ApiPaths';
import { UserContext } from '../../context/UserContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const { updateUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Form submitted:", { email, password });

        if (!validateEmail(email)) {
            setError("Invalid email address");
            return;
        }

        if (!password) {
            setError("Password is required");
            return;
        }

        setError("");

        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password });
            console.log("Login response:", response.data);
            const { token, user } = response.data;

            if (token) {
                localStorage.setItem('token', token);
                updateUser(user);
                navigate('/dashboard');
            }
        } catch (error) {
            console.error("Login error:", error);
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again");
            }
        }
    };

    return (
        <AuthLayouts>
            <div className='flex items-center justify-center h-full w-full'>
                <div className="max-w-md w-full bg-white/20 backdrop-blur-xl rounded-xl shadow-xl py-[65px] px-8 border border-white/30">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <Input value={email} onChange={({ target }) => setEmail(target.value)} label="Email Address" placeholder="john@example.com" type="text" />
                        </div>
                        <div>
                            <Input value={password} onChange={({ target }) => setPassword(target.value)} label="Password" placeholder="••••••••" type="password" />
                        </div>
                        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
                            <a href="#" className="text-sm text-primary hover:text-primary">Forgot password?</a>
                        </div>
                        <button type='submit' className="btn-primary">Sign In</button>
                    </form>
                    <div className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account? <Link className="text-primary hover:text-primary font-medium" to="/signup">Sign up</Link>
                    </div>
                </div>
            </div>
        </AuthLayouts>
    );
};

export default Login;