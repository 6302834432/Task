import React, { useState } from 'react';
import './Login.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import axios from 'axios';
const LoginPage = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:8000/user/login', credentials); 
            if (response.data.success) {
                const { token } = response.data.token;
                localStorage.setItem('authToken', token);
                localStorage.setItem('user',JSON.stringify(response.data.user))
                window.location.href = '/'; 
            } else {
                setError(response.data.error);
            }
        } catch (err) {
            console.error('Login failed:', err);
            setError('An error occurred during login.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Sidebar Title='LoginPage' />
            <div className="login-container">
                <form onSubmit={handleSubmit} className="login-form">
                    <h2>Login</h2>
                    {error && <div className="error-message">{error}</div>}
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? 'Logging in...' : 'Submit'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default LoginPage;
