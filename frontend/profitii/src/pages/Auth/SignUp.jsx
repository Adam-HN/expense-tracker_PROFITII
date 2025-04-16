import React, { useContext, useState } from 'react';
import AuthLayouts from '../../components/Layouts/AuthLayouts';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from '../../utils/ApiPaths';
import { UserContext } from '../../context/UserContext';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {
    const [profilePic, setProfilePic] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const {updateUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
    
        let profileImageUrl = "";
    
        if (!fullName) {
            setError("Full Name is required");
            return;
        }
    
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
            // Upload image if present
            if (profilePic) {
                const imgUploadRes = await uploadImage(profilePic);
                profileImageUrl = imgUploadRes.imageUrl || ""; 
            }
            
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                fullName,
                email,
                password,
                profileImageUrl, // Add this to the request
            });
    
            const { token, user } = response.data;
    
            if (token) {
                localStorage.setItem('token', token);
                updateUser(user);
                navigate('/dashboard');
            }
        } catch (error) {
            console.error("Signup error:", error); // Debug
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
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign Up</h2>

                    <form onSubmit={handleSignUp} className="space-y-4">

                        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

                        <div>
                            <Input
                                value={fullName}
                                onChange={({ target }) => setFullName(target.value)}
                                label={"Full Name"}
                                placeholder="John Doe"
                                type="text"
                            />
                        </div>

                        <div>
                            <Input
                                value={email}
                                onChange={({ target }) => setEmail(target.value)}
                                label={"Email Address"}
                                placeholder="john@example.com"
                                type="text"
                            />
                        </div>

                        <div>
                            <Input
                                value={password}
                                onChange={({ target }) => setPassword(target.value)}
                                label={"Password"}
                                placeholder="••••••••"
                                type="password"
                            />
                        </div>

                        {error && (
                            <p className='text-red-500 text-xs pb-2.5'>{error}</p>
                        )}

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                                <span className="ml-2 text-sm text-gray-600">Accept Terms</span>
                            </label>
                        </div>

                        <button type='submit' className="btn-primary">
                            Sign Up
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?
                        <Link className="text-primary hover:text-primary font-medium" to="/Login">Sign in</Link>
                    </div>
                </div>
            </div>
        </AuthLayouts>
    );
};

export default SignUp;