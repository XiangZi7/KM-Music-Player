import {ReactNode, useEffect, useState} from 'react';
import './styles.scss'
import {Input, Select, Space} from "antd";
import ReactMarkdown from 'react-markdown'
import axios from 'axios'
// 设置高亮样式
import {Prism as SyntaxHighlighter,SyntaxHighlighterProps } from 'react-syntax-highlighter'
import {xonokai} from 'react-syntax-highlighter/dist/esm/styles/prism'
interface Model {
    data: any;
    id: string;
}

interface ModelOption {
    value: string;
    label: string;
}
interface CodeProps {
    node: ReactNode;
    inline?: boolean;
    className?: string;
    children: ReactNode;
    props?: SyntaxHighlighterProps;
}
// 代码高亮
const Code = {
    code({node, inline, className, children, ...props}: CodeProps) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
            <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={xonokai}
                language={match[1]}
                PreTag="div"
                {...props}
            />
        ) : (
            <code className={className} {...props}>
                {children}
            </code>
        )
    }
}
const ChatApp = () => {
    // 消息数组
    const [messages, setMessages] = useState([
        {
            id: Math.random(),
            text: "hello world",
            timestamp: new Date().getTime(),
            sender: 'robot'
        } // 标记为自己发送的消息}
    ]);
    const [inputValue, setInputValue] = useState('');
    // 返回的消息
    const [result, setResult] = useState("")
    // 模型
    const [modelList, setModelList] = useState<ModelOption[]>([])
    const [currentModel, setCurrentModel] = useState("gpt-3.5-turbo")
    const handleSendMessage = () => {
        if (inputValue.trim() !== '') {
            const newMessage = {
                id: Math.random(),
                text: inputValue,
                timestamp: new Date().getTime(),
                sender: 'me' // 标记为自己发送的消息
            };
            axios.get(import.meta.env.VITE_API_AIURL + "/chat", {
                params: {
                    kw: inputValue,
                    model: currentModel
                }
            }).then(res => {
                setResult(res.data.choices[0].message.content)
            })

            setMessages([...messages, newMessage]);
            setInputValue('');
        }
    };
    useEffect(() => {
        const newMessage = {
            id: Math.random(),
            text: result,
            timestamp: new Date().getTime(),
            sender: 'robot' // 标记为自己发送的消息
        };
        setMessages([...messages, newMessage]);
    }, [result]);
    // 获取chatGPT模型
    useEffect(() => {
        axios.get<Model>(import.meta.env.VITE_API_AIURL + "/models").then(({data}) => {
            const arr: ModelOption[] = data.data.map((item:Model) => {
                return {
                    value: item.id,
                    label: item.id
                }
            })
            setModelList(arr)
        })
    }, []);

    // 发送消息
    const handleKeyPress = () => {
        handleSendMessage()
    };


    return (
        <div className="chat-app">
            <div className="messages">
                {messages.map(message => (
                    <div
                        key={message.id}
                        className={`message ${message.sender === 'me' ? 'my-message' : 'other-message'}`}
                    >
                        {message.sender === 'robot' &&
                            <div className="flex items-center">
                                <img src="src/static/1.png" className="mr-5" alt=""/>
                                <p>robot</p>
                            </div>
                        }
                        <div className="message-bubble">
                            <ReactMarkdown children={message.text} components={Code}/>
                            <div className="timestamp">
                                {new Date(message.timestamp).toLocaleString()}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
            <Space.Compact>
                <Select value={currentModel} onSelect={(e) => setCurrentModel(e)} options={modelList}
                        style={{width: "200px", height: "auto"}}/>
                <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                       placeholder="在这里输入消息..." style={{width: "100%"}}
                       onPressEnter={handleKeyPress}/>
                <button onClick={handleSendMessage}>发送</button>
            </Space.Compact>
        </div>
    );
}

export default ChatApp;
