import { addDoc, collection, onSnapshot, query, where } from "firebase/firestore"; // Firestore methods
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { db } from "../Database/database"; // Import the Firebase configuration
import "./Teacherspage.css";

function Teacherspage() {
    const { name } = useParams();
    const location = useLocation();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const username = location.state?.username || 'Anonymous'; // Get username from location state

    useEffect(() => {
        // Fetch messages from Firestore for this specific teacher
        const q = query(collection(db, "chats"), where("teacherName", "==", name));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map(doc => doc.data()));
        });

        // Cleanup on unmount
        return () => unsubscribe();
    }, [name]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input.trim()) {
            const newMessage = {
                text: input,
                sender: username,  // Store the username as the sender
                teacherName: name,
                timestamp: new Date(),
            };

            try {
                // Store the message in Firestore under a collection named "chats"
                await addDoc(collection(db, "chats"), newMessage);

                // Clear input field
                setInput('');
            } catch (error) {
                console.error("Error adding message: ", error);
            }
        }
    };

    return (
        <div className='chat-room'>
            <h1>Welcome to {name}'s Chat Room</h1>
            <div className='chat-container'>
                <div className='messages'>
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender === username ? 'mine' : 'theirs'}`}>
                            <p><strong>{msg.sender}</strong>: {msg.text}</p>
                            <small>{new Date(msg.timestamp?.seconds * 1000).toLocaleString()}</small>
                        </div>
                    ))}

                </div>
                <form onSubmit={handleSubmit} className='chat-form'>
                    <input
                        type='text'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='Type a message...'
                    />
                    <button type='submit'>Send</button>
                </form>
            </div>
        </div>
    );
}

export default Teacherspage;
