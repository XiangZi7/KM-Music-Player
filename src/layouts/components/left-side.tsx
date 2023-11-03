import { Avatar, Modal, Tag } from "antd";
import { GithubOutlined, UserOutlined } from "@ant-design/icons";
import { items, Menu } from './data'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { httpGet } from '@/utils/http'
import { LogOut } from "react-feather";

interface User {
    avatarUrl: string;
    nickname: string;
}


export default function LeftSide() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    function toRouter(idx: number) {
        const path = items[0].children[idx].path
        navigate(path)
    }

    useEffect(() => {
        httpGet<{ profile: User }>("login/status").then(({ data }) => {
            setUser(data.profile)
        })
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="left-side">
                <div className="side-wrapper">
                    <div className="menu-circle"></div>
                </div>
                <div className="side-wrapper">
                    <div className="user">
                        <div>
                            {user ? <Avatar size={65} src={user.avatarUrl} /> :
                                <Avatar size={65} icon={<UserOutlined />} />}
                        </div>
                        <div className="username">
                            <span>{user ? user.nickname : '点击登录'}</span>
                            <Tag icon={<GithubOutlined />} color="#000" style={{ cursor: "pointer" }}>
                                <a href="https://github.com/XiangZi7/" target="_blank">
                                    GitHub
                                </a>
                            </Tag>
                        </div>

                    </div>
                </div>
                {/*静态数据*/}
                {items.map((item: Menu.MenuItem, idx: number) => (
                    <div className="side-wrapper" key={idx}>
                        <div className="side-title">{item.title}</div>
                        {item.children.map((item2:Menu.children, idx2:number) => (
                            <div className="side-menu" key={idx2} onClick={() => toRouter(idx2)}>
                                <div className="controls">
                                    {item2.icon}
                                    {item2.title}
                                    <span className="notification-number updates">3</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
                {/*动态数据 用户歌单*/}
                {user && (<div className="side-wrapper">
                        <div className="side-title">User Settings</div>
                        <div className="side-menu" onClick={showModal}>
                            <div className="controls">
                                <LogOut />
                                <span>Log out</span>
                                {/*<span className="notification-number updates">3</span>*/}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Modal title="Log out" visible={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
                <p>Are you sure you want out？</p>
            </Modal>
        </>
    )
}
