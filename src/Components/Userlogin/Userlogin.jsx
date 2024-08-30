import { addDoc, collection } from "firebase/firestore"; // Firestore methods
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from "../Database/database"; // Import Firebase configuration
import "./Userlogin.css";

function Login() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (username) {
            try {
                // Store the user's name in Firestore under the "users" collection
                await addDoc(collection(db, "users"), {
                    name: username,
                    timestamp: new Date(),
                });

                // Navigate to the teacher's page with the username
                navigate('/homepage', { state: { username } });
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        }
    };

    return (
        <div className="login">
            <h2>Enter Your Name</h2>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your name"
            />
            <button onClick={handleLogin}>Go to Homepage</button>
        </div>
    );
}

export default Login;
