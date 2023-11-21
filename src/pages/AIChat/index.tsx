import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Select, Space, Input } from 'antd'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { xonokai } from 'react-syntax-highlighter/dist/esm/styles/prism'

import './index.scss'
import { Components } from 'node_modules/react-markdown/lib'
import { ChatAPI } from '@/api/modules/chatAI'

const messageDefault: Message = {
  id: Math.random(),
  text: "hello world",
  timestamp: new Date().getTime(),
  sender: "robot",
}
const messageInit = (msg = {}): Message => {
  return Object.assign({ ...messageDefault }, { ...msg }, { id: Math.random() })
}


const Code: Components = {
  code({ inline, className, children, ...props }: { inline?: boolean } & React.HTMLAttributes<HTMLElement>) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        children={String(children).replace(/\n$/, "")}
        style={xonokai as any}
        language={match[1]}
        PreTag="div"
        {...props}
      ></SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  }
}

function ChatApp() {
  const [messages, setMessages] = useState<Message[]>([messageInit()]);
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");
  const [modelList, setModelList] = useState<Model[]>([]);
  const [currentModel, setCurrentModel] = useState("gpt-3.5-turbo");

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      const newMessage = messageInit({ text: inputValue, sender: "me" });
      ChatAPI.chatWithAI({ kw: inputValue, model: currentModel })
        .then(({ data }) => {
          setResult(data.choices[0].message.content);
        })
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };
  useEffect(() => {
    // console.log(messages, result);
    if (result) {
      const newMessage = messageInit({ text: result, sender: "robot" });
      setMessages([...messages, newMessage]);
    }
  }, [result]);
  useEffect(() => {
    ChatAPI.getModelList()
      .then(({ data }) => {
        const arr = data.data.map((item: Rc<any, any>) => {
          return {
            value: item.id,
            label: item.id,
          };
        });
        setModelList(arr);
      });
  }, []);
  // useEffect(() => {
  //   console.log(messages);
  // }, [messages])

  const handleKeyPress = () => {
    handleSendMessage();
  }

  return (
    <>
      <div className='chat-app'>
        <div className='messages'>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.sender === "me" ? "my-message" : "other-message"} `}
            >
              {message.sender === 'robot' && (
                <div className='flex items-center'>
                  <img src="1.png" className='mr-5' alt="" />
                  <p>robot</p>
                </div>
              )}
              <div className='message-bubble'>
                <ReactMarkdown children={message.text} components={Code} />
                <div className='timestamp'>
                  {new Date(message.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Space.Compact>
          <Select
            value={currentModel}
            onSelect={(e) => setCurrentModel(e)}
            options={modelList}
            style={{ width: "200px", height: "auto" }}
          />
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="在这里输入消息..."
            style={{ width: "100%" }}
            onPressEnter={handleKeyPress}
          />
          <button onClick={handleSendMessage}>发送</button>

        </Space.Compact>
      </div>
    </>
  )
}

export default ChatApp
