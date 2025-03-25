import { useState, useEffect, useRef } from "react";
import Markdown from 'react-markdown';
import './Chatbot.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

function ChatBot() {
    const [AIresponse, setAIResponse] = useState("");
    const [humanResponse, setHumanResponse] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [minimiseChat, setMinimiseChat] = useState(false); // Track if chat is minimized
    const bottomRef = useRef(null); 
    const hasRun = useRef(false);

    useEffect(() => {
        const initiateChatBot = async () => {
            if (hasRun.current) return;
            hasRun.current = true;

            try {
                const response = await fetch("http://localhost:3000/chat", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        chat: "Hello",
                        history: [],
                    }),
                });

                const data = await response.json();
                setAIResponse(data.text);
            } catch (error) {
                console.error("Error:", error);
                setAIResponse("Error fetching response from the server");
            } finally {
                setLoading(false);
            }
        };

        initiateChatBot();
    }, []);

    useEffect(() => {
        if (AIresponse) {
            setChatHistory((prevHistory) => [
                ...prevHistory,
                {
                    role: "model",
                    parts: [{ text: AIresponse }],
                },
            ]);
        }
    }, [AIresponse]);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chatHistory]);

    const updateMinimiseChat = () => {
        setMinimiseChat(!minimiseChat); // Toggle the minimize state
    };

    const handleHumanResponseChange = (e) => {
        setHumanResponse(e.target.value);
    };

    const handleSubmit = async () => {
        if (!humanResponse) {
            alert("Please enter a response");
            return;
        }
        setLoading(true); 

        const updatedHistory = [
            ...chatHistory,
            {
                role: "user",
                parts: [{ text: humanResponse }],
            },
        ];

        setChatHistory(updatedHistory); 

        try {
            const response = await fetch("http://localhost:3000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chat: humanResponse,
                    history: updatedHistory,
                }),
            });

            const data = await response.json();
            setAIResponse(data.text || "No response received");
        } catch (error) {
            console.error("Error:", error);
            setAIResponse("Error fetching response from the server");
        } finally {
            setLoading(false); 
        }

        setHumanResponse(""); 
    };

    return ( 
        <div className={`pop-up ${minimiseChat && 'minimized'}`}>
            <div className="header">
                <h1 className="title">Tina - Your AI Policy Assistant</h1>
                <h1 className="exit" onClick={updateMinimiseChat}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </h1>
            </div>
            {/* Only render the chat-box and human-response if minimiseChat is false */}
            {!minimiseChat && (
                <>
                    <div className="chat-box">
                        {chatHistory.map((entry, index) => (
                            <div key={index} className={`chat-entry ${entry.role}`} ref={bottomRef}>
                                <strong>{entry.role === "user" ? "Me" : "Tina"}:&nbsp;</strong> 
                                <Markdown>{entry.parts[0].text}</Markdown>
                            </div>
                        ))}
                        {loading && 
                            <div className="loading-on">
                                <span className="loading-ball"></span>
                                <span className="loading-ball"></span>
                                <span className="loading-ball"></span>
                            </div>
                        }
                    </div>

                    <form className="human-response">
                        <input
                            cols="30"
                            className="response"
                            type="text"
                            placeholder="Type your response"
                            value={humanResponse}
                            onChange={handleHumanResponseChange}
                        />
                        <button 
                            type="submit" 
                            onClick={handleSubmit} 
                            className={`submit ${loading && 'loading'}`} 
                            disabled={loading}
                        >
                            Submit
                        </button>
                    </form>
                </>
            )}
        </div>
    );
}

export default ChatBot;
