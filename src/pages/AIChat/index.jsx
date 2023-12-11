import "./styles.scss";
import { Input, Select, Space, Button } from "antd";
import ReactMarkdown from "react-markdown";
import axios from "axios";
// 设置高亮样式
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { xonokai } from "react-syntax-highlighter/dist/esm/styles/prism";

// 代码高亮
const Code = {
  code({ inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        // eslint-disable-next-line react/no-children-prop
        children={String(children).replace(/\n$/, "")}
        style={xonokai}
        language={match[1]}
        PreTag="div"
        {...props}
      />
    ) : (
      <code className={className}
        {...props}>
        {children}
      </code>
    );
  },
};
const ChatApp = () => {
  const messagesContainerRef = useRef(null);
  // 消息数组
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "hello world",
      timestamp: new Date().getTime(),
      role: "assistant",
    }, // 标记为自己发送的消息}
  ]);
  // 按钮状态
  const [loadings, setLoadings] = useState(false);
  // 用户输入的文本
  const [inputValue, setInputValue] = useState("");
  // 模型
  const [modelList, setModelList] = useState([]);
  const [currentModel, setCurrentModel] = useState("gpt-3.5-turbo");
  // 用户发送消息
  async function handleSendMessage() {
    if (inputValue.trim() !== "") {
      // 用户发送的消息
      const UserMessage = {
        id: messages.length + 1,
        content: inputValue,
        timestamp: new Date().getTime(),
        role: "user",
      };
      // 更新消息状态
      setMessages([...messages, UserMessage]);
      // 标记按钮正在请求
      setLoadings(true);

      // 构建请求数据
      const data = JSON.stringify({
        model: currentModel,
        messages: [
            ...messages.map(item=>{
            return {
              role:item.role,
              content:item.content
            }
          }),
          {
            role: "user",
            content: inputValue,
          },
        ],
        temperature: 0.7,
        stream: true,
      });

      try {
        // 发送请求
        const response = await fetch(
          "https://api.chatanywhere.com.cn/v1/chat/completions",
          {
            method: "POST",
            body: data,
            headers: {
              Authorization:
                "Bearer sk-ADjDpi2dQxYS186eDyx0aiIRcpty65qWDvjaKqnmgd67hbsX",
              "Content-Type": "application/json",
            },
          }
        );

        // 清空用户输入的文本
        setInputValue("");
        const reader = response.body.getReader();
        let results = "";
        let currentTime = new Date().getTime()

        // 在每次迭代中创建新的 robotData 对象
        setMessages((prevmsg) => {
          let ids = prevmsg.length + 1;
          // 新的机器人消息
          const newRobotData = {
            id: ids,
            content: "",
            timestamp: new Date().getTime(),
            role: "assistant",
          };
          // 返回更新后的消息数组
          return [...prevmsg, newRobotData];
        });

        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { value } = await reader.read();
          // 获取消息容器的引用
          const container = messagesContainerRef.current;


          // 将每一块数据追加到 lastMessage.text
          let chars = new TextDecoder().decode(value);
          let lines = chars.split("data:");

          for (let i = 0; i < lines.length; i++) {
            chars = lines[i].replace(/\s*/, "").replace(/\s*$/, "");
            // 标记流请求结束
            if (chars == "[DONE]") {
              console.log("Stream ended");
              // 标记按钮结束请求
              setLoadings(false);
              return;
            }
            if (!chars) continue;

            let obj = JSON.parse(chars);
            // 检查是否存在有效的文本内容，然后追加到最后一条消息
            if (
              obj &&
              obj.choices[0].delta &&
              obj.choices[0].delta.content != undefined &&
              obj.choices[0].delta.content != "undefined"
            ) {
              results += obj.choices[0].delta.content;
              // 更新状态
              setMessages((prevMessages) => {
                let prevMsg = prevMessages[prevMessages.length - 1];
                // 更新最后一条机器人消息的文本
                const newRobotData = {
                  id: prevMsg.id,
                  content: results,
                  timestamp: currentTime,
                  role: "assistant",
                };
                // 滚动到底部
                if (container) {
                  container.scrollTop = container.scrollHeight;
                }
                // 返回更新后的消息数组
                return [...prevMessages.slice(0, -1), newRobotData];
              });
            }
          }
        }
      } catch (error) {
        console.error(error);
        // 标记按钮结束请求
        setLoadings(false);
      }
    }
  }



  // 获取chatGPT模型
  useEffect(() => {
    axios.get(import.meta.env.VITE_API_AIURL + "/models").then(({ data }) => {
      const arr = data.data.map((item) => {
        return {
          value: item.id,
          label: item.id,
        };
      });
      setModelList(arr);
    });
  }, []);

  return (
    <>
      <div className="chat-app">
        <div className="messages"
          ref={messagesContainerRef}>
          {messages.map((message, idx) => (
            <div
              key={idx}
              className={`message ${message.role === "user" ? "my-message" : "other-message"
                }`}
            >
              {message.role === "assistant" && (
                <div className="flex items-center">
                  <img src="1.png"
                    className="mr-5"
                    alt="" />
                  <p>robot</p>
                </div>
              )}
              <div className="message-bubble">
                <ReactMarkdown
                  // eslint-disable-next-line react/no-children-prop
                  children={message.content}
                  components={Code} />
                <div className="timestamp">
                  {new Date(message.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
      <div className="it-footer">
        {/* footer */}
        <Space.Compact block>
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
            style={{ width: 'calc(100% - 200px)' }}
            onPressEnter={handleSendMessage}
          />
          <Button type="primary"
            loading={loadings}
            onClick={handleSendMessage}>发送</Button>
        </Space.Compact>
      </div>
    </>
  );
};

export default ChatApp;
