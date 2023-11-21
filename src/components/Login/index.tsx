import { useState, useEffect } from 'react'
import { Avatar, message } from 'antd';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Facebook } from 'react-feather';

import "./index.scss"
import { userAPI } from '@/api';

function Login({ modelValue, onModelValue, onLogin }: LoginProps) {
  // login way
  const [isCurrent, setCurrent] = useState("qrcode");
  const [loginForm, setLoginForm] = useState({
    phone: "",
    captcha: "",
  })

  // qrCode
  const [qrurl, setQrUrl] = useState("");
  const [Tips, setTips] = useState({
    message: "Wait to scan code...",
    avatarUrl: "",
    nickname: "",
  })

  // Verification Code
  const [countdown, setCountdown] = useState(60);
  const [isCounting, setIsCounting] = useState(false);
  // login by qrcode

  // 获取QrCode
  const fetchQrCode = async () => {
    let key = localStorage.getItem("unikey") || "";
    if (!key) {
      const { data } = await userAPI.getQrKey();
      // console.log(data.data);
      key = data.data.unikey;
      localStorage.setItem("unikey", key);
    }
    // console.log(key, 'key');
    userAPI.getQrCode({ key, qrimg: true, })
      .then(({ data }) => {
        // console.log('res', res);
        // console.log('data', data);
        setQrUrl(data.data.qrimg);
      })
  };
  // 检查Qr
  const checkQrCode = async () => {
    const enumeration: Rc<number, string> = {
      800: "Qr code expired",
      801: "Wait ti scan code ...",
      802: "verify",
      803: "Authorized login successful",
    };
    const key = localStorage.getItem("unikey") || "";
    const { code, nickname, avatarUrl } = await userAPI.loginByQrCode({ key }).then(res => res.data);
    // console.log(code);
    const message: string = enumeration[code];
    setTips({ message, nickname, avatarUrl });

    if (code === 800) {
      await userAPI.getQrKey().then(({ data }) => {
        localStorage.setItem("unikey", data.data.unikey);
      });
    } else if (code === 802) {
      console.log("授权中");
    } else if (code === 803) {
      onLogin(true);
      onModelValue(false);
    }
  };

  useEffect(() => {
    if (isCurrent !== "qrcode" || !modelValue) { return; }
    fetchQrCode();
    // 5秒查询一次，是否过期
    const intervalId = setInterval(checkQrCode, 5000);
    return () => {
      clearInterval(intervalId); /* !!! */
    }
  }, [isCurrent, modelValue]);

  // Verification code countdown
  const startCountdown = () => {
    setIsCounting(true);
    setCountdown(60);
  }
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isCounting) {
      intervalId = setInterval(() => {
        setCountdown((pervCountdown) => pervCountdown - 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalId); /* !!! */
    }
  }, [isCounting]);
  useEffect(() => {
    if (countdown === 0) {
      setIsCounting(false);
    }
  }, [countdown]);

  // Verification code login
  const handleSumbit = (event: React.FormEvent<HTMLElement>, type: string) => {
    event.preventDefault();
    if (type === "captcha") {
      // vertify
      userAPI.verifyCode({
        phone: loginForm.phone,
        captcha: loginForm.captcha,
      }).then(({ data }) => {
        if (data) {
          userAPI.loginByVerCode({
            phone: loginForm.phone,
            captcha: loginForm.captcha,
          }).then(() => {
            // 父组件获取新数据
            onLogin(true);
            onModelValue(false);
          });
        } else {
          message.info("验证码错误");
        }
      })
    }
  }

  // 获取验证码验证码
  function sendCaptcha() {
    userAPI.sendCaptcha({
      phone: loginForm.phone
    }).then(({ data }) => {
      if (data) {
        startCountdown();
      }
    })
  }

  const ckBtn = (type: string) => {
    setCurrent(type.toLowerCase());
  }

  return (
    <>
      {modelValue && (
        <div className='login'>
          <div
            className={`popup-container`}
            onClick={() => onModelValue(false)}
          ></div>
          <div className='popup-content'>
            <div
              className={`container 
                ${isCurrent !== "qrcode" ? "right-panel-active" : ""}`
              }
              id="container"
            >
              <div className='form-container sign-up-container'>
                <form onSubmit={(event) => handleSumbit(event, "captcha")}>
                  <h1 style={{ color: '#000' }}>Create Account</h1>
                  <div className="social-container">
                    <a href="#" className='="social'>
                      {/* <FontAwesomeIcon icon="fa-brands fa-facebook-f" /> */}
                      <i className='fab fa-facebook-f'></i>
                      {/* <Facebook size={25}></Facebook> */}
                    </a>
                    <a href="#" className='social'>
                      <i className='fab fa-google-plus-g'></i>
                    </a>
                    <a href="#" className='social'>
                      <i className='fab fa-linkedin-in'></i>
                    </a>
                  </div>
                  <span style={{ color: "#000" }}>
                    or use your email for registration
                  </span>
                  <div className='mx-20'>
                    <input
                      value={loginForm.phone}
                      onChange={(event) => {
                        setLoginForm({
                          ...loginForm,
                          phone: event.target.value,
                        })
                      }}
                      placeholder='phone'
                    />
                    <div className='captcha-box'>
                      <input
                        value={loginForm.captcha}
                        onChange={
                          (event) => setLoginForm({
                            ...loginForm,
                            captcha: event.target.value
                          })
                        }
                        placeholder='captcha'
                      />
                      <button onClick={sendCaptcha} disabled={isCounting}>
                        {isCounting ? `${countdown}` : "Captcha"}
                      </button>
                    </div>
                    <button type="submit">Login</button>
                  </div>
                </form>
              </div>
              <div className='form-container sign-in-container'>
                <form onSubmit={(event) => handleSumbit(event, "qrcode")}>
                  <h1 style={{ color: '#000' }}>Sign in</h1>
                  <div className="social-container">
                    <a href="#" className="social">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="social">
                      <i className="fab fa-google-plus-g"></i>
                    </a>
                    <a href="#" className="social">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                  <span style={{ color: '#000' }}>or use QR Code</span>
                  <div className="mx-20">
                    <img src={qrurl} alt="" width={200} height={200} />
                    <div className='flex flex-col items-center'>
                      <span className="mb-10">{Tips.message}</span>
                      {
                        Tips.avatarUrl &&
                        (<Avatar className='mb-10' src={Tips.avatarUrl}></Avatar>)
                      }
                      <span>{Tips.nickname}</span>
                    </div>
                  </div>
                </form>
              </div>
              <div className='overlay-container'>
                <div className='overlay'>
                  <div className='overlay-panel overlay-left'>
                    <h1>WelCome Back!</h1>
                    <p>
                      Go log in using the QR code
                    </p>
                    <button
                      className='ghost'
                      id='signIn'
                      onClick={() => ckBtn("qrcode")}
                    >
                      QR code login
                    </button>
                  </div>
                  <div className='overlay-panel overlay-right'>
                    <h1>Hello, Friend!</h1>
                    <p>Login with verification code and travel with us</p>
                    <button
                      className='ghost'
                      id="signUp"
                      onClick={() => ckBtn("captcha")}
                    >
                      Verification code login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Login
