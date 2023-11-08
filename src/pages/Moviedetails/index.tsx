import "./style.scss";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { httpGet } from "@/utils/http.ts";
import { Button, Col, Row, Skeleton } from "antd";
import {
  PlaySquareOutlined,
  FieldTimeOutlined,
  HomeOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ReactPlayer from "react-player";

export default function moviedetails() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [isPlay, setIsPlay] = useState(false);
  const [url, setUrl] = useState("");
  const [mvobj, setMvobj] = useState({});
  const [chapterList, setChapterList] = useState([]);

  useEffect(() => {
    httpGet("/video/chapter", { id }).then(({ data }) => {
      setMvobj(data);
      setChapterList(data.chapterList);
    });
  }, []);

  function playVidio(url) {
    setUrl(url);
    setIsPlay(true);
  }

  return (
    <>
      {Object.keys(mvobj).length > 0 ? (
        <div className="wrap">
          {/*默认显示 电影的详情*/}
          {!isPlay && (
            <Row>
              <Col span={6}>
                <div className="cover">
                  <img src={mvobj.cover} alt="" />
                  <div className="mt-10">
                    <Button
                      type="primary"
                      block
                      onClick={() => playVidio(chapterList[0].chapterPath)}
                    >
                      Play
                    </Button>
                  </div>
                </div>
              </Col>
              <Col span={18}>
                <div className="details ml-10">
                  <h2>
                    <PlaySquareOutlined /> {mvobj.title}
                    back
                  </h2>
                  <p className="des">
                    <HomeOutlined /> {mvobj.region}
                  </p>
                  <p className="des">
                    <FieldTimeOutlined /> {mvobj.releaseTime}
                  </p>
                  <p className="des">
                    <MessageOutlined /> {mvobj.descs}
                  </p>
                  <p>
                    <UserOutlined /> {mvobj.director}
                  </p>
                </div>
              </Col>
            </Row>
          )}
          {/*点击集数 显示视频*/}
          {isPlay && (
            <ReactPlayer
              width={"100%"}
              height={500}
              url={url}
              playing
              controls
            ></ReactPlayer>
          )}

          <div className="flex mt-20 chapterList">
            {chapterList.map((item, idx) => (
              <div
                className="chapter-items"
                key={idx}
                onClick={() => playVidio(item.chapterPath)}
              >
                <Button type="primary">{item.title}</Button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Skeleton />
      )}
    </>
  );
}
