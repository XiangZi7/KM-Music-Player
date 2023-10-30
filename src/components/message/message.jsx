import React, {useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import './message.scss';

class Message {
    static container = null; // 消息容器 DOM 元素
    static root = null; // React 渲染根节点
    static messages = []; // 消息数组

    static createContainer() {
        const container = document.createElement('div'); // 创建一个 div 元素作为消息容器
        container.className = "message-container" //添加class
        document.body.appendChild(container); // 将容器添加到 body 元素中
        this.container = container; // 设置容器引用
        this.root = createRoot(this.container); // 创建 React 渲染根节点
    }

    static show(content, duration = 3) {
        if (!this.container) {
            this.createContainer();
        }

        const message = {
            id: Date.now(), // 消息 ID
            content, // 消息内容
            duration, // 消息显示持续时间（单位：秒）
            show: false, // 控制消息显示/隐藏
            slideIn: false, // 控制消息的滑入动画
            slideOut: false, // 控制消息的滑出动画
        };

        this.messages.push(message); // 将消息添加到消息数组中
        this.renderMessages(); // 渲染消息

        if (duration > 0) {
            message.timer = setTimeout(() => {
                message.slideOut = true; // 播放关闭动画
                this.renderMessages(); // 渲染消息
            }, duration * 1000);
        }

        setTimeout(() => {
            message.show = true; // 显示消息
            message.slideIn = true; // 播放滑入动画
            this.renderMessages(); // 渲染消息
        }, 0);
    }

    static renderMessages() {
        const MessageContent = () => {
            useEffect(() => {
                const handleKeyDown = (event) => {
                    if (event.key === 'Escape') {
                        this.clearMessages(); // 当按下 Escape 键时，清除所有消息
                    }
                };

                document.addEventListener('keydown', handleKeyDown);

                return () => {
                    document.removeEventListener('keydown', handleKeyDown);
                };
            }, []);

            return (
                this.messages.map((message) => (
                    <div
                        key={message.id}
                        className={`message ${message.show ? 'show' : 'hide'} ${message.slideIn ? 'slide-in' : ''} ${message.slideOut ? 'slide-out' : ''}`}
                        onAnimationEnd={() => {
                            if (message.slideOut) {
                                this.closeMessage(message.id); // 当滑出动画结束时，关闭消息
                            } else {
                                message.slideIn = false; // 滑入动画结束后，将 slideIn 置为 false
                                this.renderMessages(); // 重新渲染消息
                            }
                        }}
                    >
                        <div className="message-content">
                            <span>{message.content}</span>
                            {/*<button className="message-close" onClick={() => this.closeMessage(message.id)}>*/}
                            {/*    ×*/}
                            {/*</button>*/}
                        </div>
                    </div>
                ))
            );
        };

        this.root.render(<MessageContent/>); // 使用 React 渲染消息内容

        if (this.messages.length === 0) {
            this.clearContainer(); // 当消息数组为空时，清除容器
        }
    }

    // 关闭动画
    static closeMessage(id) {
        const messageIndex = this.messages.findIndex((message) => message.id === id); // 查找指定 ID 的消息的索引
        if (messageIndex !== -1) {
            const message = this.messages[messageIndex];
            clearTimeout(message.timer); // 清除消息的定时器
            message.slideOut = true; // 播放滑出动画
            this.messages.splice(messageIndex, 1); // 移除指定 ID 的消息
            this.renderMessages(); // 渲染消息
        }
    }

    // 按下ESC 清空全部消息
    static clearMessages() {
        this.messages.forEach((message) => {
            clearTimeout(message.timer); // 清除所有消息的定时器
        });
        this.messages = []; // 清空消息数组
        this.renderMessages(); // 渲染消息
    }

    // 清空根节点
    static clearContainer() {
        if (this.container && this.root) {
            this.root.unmount(); // 卸载 React 渲染根节点
            this.container.remove(); // 移除消息容器
            this.container = null; // 清除容器引用
            this.root = null; //清除渲染根节点引用
        }
    }

    static success(content, duration = 3) {
        this.show(content, duration); // 显示成功消息
    }

    static error(content, duration = 3) {
        this.show(content, duration); // 显示错误消息
    }

    static info(content, duration = 3) {
        this.show(content, duration); // 显示信息消息
    }

    static warning(content, duration = 3) {
        this.show(content, duration); // 显示警告消息
    }
}

export default Message;