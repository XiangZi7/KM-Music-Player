// import React from 'react'
import { useNavigate } from "react-router-dom"
import { buildPage } from "@/utils/constructdata"

export default function Songlist({ data, idx }: SonglistProps) {
  const Navigate = useNavigate();

  function toPage(item: Song) {
    const path = buildPage(idx);
    Navigate(path + `?id=${item.id || item.videoId}`)
  }

  return (
    <>
      <div className="apps-card">
        {
          data.map((item) => (
            <div className="app-card" key={item.id} onClick={() => toPage(item)}>
              <span>
                <img src={
                  item.picUrl ||
                  item.coverImgUrl ||
                  item.avatarUrl ||
                  item.cover + "?param=430y430"
                } />
              </span>
              <div className="app-card__subtext textoverflow">
                {item.name || item.nickname || item.title}
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}
