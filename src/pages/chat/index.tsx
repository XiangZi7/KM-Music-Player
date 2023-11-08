import {useState, FC,ChangeEvent} from "react";
import "./styles.scss";
import {Avatar, Button, Input} from "antd";
import {UserOutlined} from "@ant-design/icons";

interface Message {
    message: string;
    sender: "robot" | "user";
}

const ChatBubble: FC<Message> = ({message, sender}) => {
    return (
        <div className={`chat-bubble ${sender}`}>
            {sender == "robot" && <Avatar className="mr-5" size={45} icon={<UserOutlined/>}/>}
            <div className="chat-content">{message}</div>
            {sender == "user" && <Avatar className="ml-5" size={45} icon={<UserOutlined/>}/>}
        </div>
    );
};

const ChatRoom: FC = () => {
    const [messages, setMessages] = useState([
        {message: "Hello, how can I help you?", sender: "robot"}
    ]);
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSendMessage = () => {
        if (inputValue.trim() !== "") {
            setMessages([
                ...messages,
                {message: inputValue, sender: "user"}
            ]);
            setInputValue("");
        }
    };

    return (
        <div className="chat-room">
            <div className="chat-container">
                <div className="chat-header">AI Chat</div>
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <ChatBubble
                            key={index}
                            message={msg.message}
                            sender={msg.sender as "robot" | "user"}
                        />
                    ))}
                </div>
                <div className="chat-input">
                    <input
                        type="text"
                        placeholder="Type your message here..."
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <Button onClick={handleSendMessage} type="primary">Send</Button>
                </div>
            </div>
        </div>
    );
};

export default ChatRoom;
