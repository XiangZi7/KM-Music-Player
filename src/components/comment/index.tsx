import "./style.scss";
import { Avatar } from "antd";

export default function comment({ data }) {
  return (
    <>
      <div className="comms-card">
        {data.map((item, idx) => (
          <div className="comm-card" key={idx}>
            <span className="flex items-center">
              <div className="mr-5 ">
                <Avatar shape="square" src={item.user.avatarUrl} />
              </div>
              <span className="text-13">{item.user.nickname}</span>
            </span>
            <div className="comm-card__subtext"> {item.content}</div>
            <div className="comm-card-buttons">
              <span>{item.ipLocation.location}</span>
              <span>{item.timeStr}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
