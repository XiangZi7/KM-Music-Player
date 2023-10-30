import {Avatar, Tag} from "antd";
import {TwitterOutlined, UserOutlined} from "@ant-design/icons";
import {items} from './data.tsx'

export default function leftSide() {

    return (
        <>
            <div className="left-side">
                <div className="side-wrapper">
                    <div className="menu-circle"></div>
                </div>
                <div className="side-wrapper">
                    <div className="user">
                        <div>
                            <Avatar size={65} icon={<UserOutlined/>}/>
                        </div>
                        <div className="username">
                            <span>春荣</span>
                            <Tag icon={<TwitterOutlined/>} color="#55acee">
                                Twitter
                            </Tag>
                        </div>

                    </div>
                </div>
                {/*静态数据*/}
                {items.map((item, idx) => (
                    <div className="side-wrapper" key={idx}>
                        <div className="side-title">{item.title}</div>
                        {item.children.map((item2, idx2) => (
                            <div className="side-menu" key={idx2}>
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
                <div className="side-wrapper">
                    <div className="side-title">User playlist</div>
                    <div className="side-menu">
                        <div className="controls">
                            <span>我是封面</span>
                            <span>我是名字</span>
                            <span className="notification-number updates">3</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}