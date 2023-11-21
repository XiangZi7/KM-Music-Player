import { GithubOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Modal, Tag } from 'antd';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'react-feather';

import LoginPopup from '@/components/Login'
import { userAPI } from '@/api';
import { items } from "./data"


export default function LeftSide() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [showLogin, setShowLogin] = useState(false);

  function toRouter(idx: number) {
    const path = items[0].children[idx].path;
    navigate(path);
  }

  // init-登录
  useEffect(() => {
    RefreshUserInfo()
  }, []);

  // 模型开启？
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  // 确认logOut
  const handleOk = () => {
    setIsModalOpen(false);
    userAPI.logout()
      .then(() => {
        RefreshUserInfo();
      })
      .catch(err => {
        console.error('error', err);
      })
  }

  function RefreshUserInfo() {
    // 获取用户数据
    userAPI.login()
      .then(({ data }) => {
        console.log('RefreshUserInfo', data);
        setUserProfile(data.data.profile);
      })
      .catch((err) => {
        console.error('login error', err);
      })
  }

  return (
    <>
      <div className='left-side'>
        <div className='side-wrapper'>
          <div className='menu-circle'></div>
        </div>
        <div className="side-wrapper">
          <div className="user">
            <div>
              {
                userProfile ? (
                  <Avatar size={65} src={userProfile.avatarUrl} />
                ) : (
                  <Avatar size={65} icon={<UserOutlined></UserOutlined>} />
                )
              }
            </div>
            <div className='username'>
              {
                userProfile ?
                  <span>{userProfile.nickname}</span>
                  : <span onClick={() => setShowLogin(true)}>LogIn</span>
              }
              <Tag
                icon={<GithubOutlined />}
                color="#000"
                style={{ cursor: "pointer" }}
              >
                <a href="https://github.com/XiangZi7/" target="_blank" rel="noreferrer">
                  Github
                </a>
              </Tag>
            </div>
          </div>
        </div>
        {/* {static Data} */}

        {
          items.map((item, idx) => (
            <div className="side-wrapper" key={idx}>
              <div className="side-title">{item.title}</div>
              {
                item.children.map((item_2, idx_2) => (
                  <div
                    className='side-menu'
                    key={idx_2}
                    onClick={() => toRouter(idx_2)}
                  >
                    <div className='controls'>
                      {item_2.icon}
                      {item_2.title}
                    </div>
                  </div>
                ))
              }
            </div>
          ))
        }
        {/* async Data */}
        {
          userProfile && (
            <div className='side-wrapper'>
              <div className='side-title'>User Setting</div>
              <div className='side-menu' onClick={showModal}>
                <div className="controls">
                  <LogOut></LogOut>
                  <span>Log out</span>
                </div>
              </div>
            </div>
          )
        }
      </div>
      <Modal
        title="log out"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <p>Are you sure you want out?</p>
      </Modal>
      {/* Log in */}
      <LoginPopup modelValue={showLogin} onModelValue={(e: boolean) => setShowLogin(e)} onLogin={RefreshUserInfo} />
    </>
  )
}
