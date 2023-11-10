import MkTable from "@/components/Mk-Table/Mk-Table";
import { CSSProperties } from "react";

interface Song {
  id: number;
  title: string;
  singer: string;
  time: number;
  cover: string;
  mv: number;
}

interface Props {
  data: Song[];
  style?: CSSProperties;
  className?: string;
}

export default function single({ data }: Props) {
  return (
    <>
      {/*歌曲*/}
      {
        <div className="content-section mt-10">
          <div className="content-section-title">Album</div>
          <MkTable data={data} style={{ maxHeight: "55vh" }} />
        </div>
      }
    </>
  );
}
