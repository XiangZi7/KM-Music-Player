import { Avatar } from "antd";
import "./index.scss"

function Comment({ data }: CommentProps) {
  useEffect(() => {
    console.log(data)
  });
  return (
    <>
      <div className="comms-card">
        {data.map((item) => (
          <div className="comm-card" key={item.id}>
            <span className="flex items-center">
              <div className="mr-5">
                <Avatar shape="square" src={item.user.avatarUrl}></Avatar>
              </div>
              <span className="text-13">{item.user.nickname}</span>
            </span>
            <div className="comm-card__subtext">{item.content}</div>
            <div className="comm-card-buttons">
              <span>{item.ipLocation.location}</span>
              <span>{item.timeStr}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
export default Comment;
