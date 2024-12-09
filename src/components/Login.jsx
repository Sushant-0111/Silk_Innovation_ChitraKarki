import React, { useState } from 'react';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState('');

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    if (error) setError(''); // Clear error on input change
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) setError(''); // Clear error on input change
  };

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const validateInput = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nepalesePhoneNumberRegex = /^(977-)?[0-9]{10}$/;

    if (!phoneNumber) return 'Phone number or email is required';
    if (!emailRegex.test(phoneNumber) && !nepalesePhoneNumberRegex.test(phoneNumber)) {
      return 'Invalid phone number or email address';
    }
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters long';
    return '';
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationError = validateInput();

    if (validationError) {
      setError(validationError);
    } else {
      setError('');
     const res = await fetch("https://api.billin.space/api/login",{
        method:"post",
        headers: {
          'Content-Type': 'application/json',
          'App-Authorizer':'647061697361',
        },credentials:"include",
        body: JSON.stringify({ username: phoneNumber, password }),
      });
      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }
      const data = await res.json();
      console.log(data)
     }
      fakeLoginApi(phoneNumber, password)
        .then(() => {
          console.log('Login successful');
        })
        .catch((apiError) => {
          setError(apiError.message);
        });
    }

  const fakeLoginApi = (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'test@example.com' && password === 'password123') {
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
              Phone Number/Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="Enter phone number or email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="flex items-center">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={isPasswordVisible ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter password"
              />
              <button
                className="ml-2 text-gray-700 hover:text-gray-900"
                type="button"
                onClick={handleTogglePasswordVisibility}
              >
                {isPasswordVisible ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
