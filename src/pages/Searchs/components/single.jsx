import MkTable from "@/components/Mk-Table/Mk-Table.jsx";


export default function single({ data }) {
  return (
    <>
      {/*歌曲*/}
      {
        <div className="content-section mt-10">
          <div className="content-section-title">Album</div>
          <MkTable data={data}
            style={{ maxHeight: "55vh" }} />
        </div>
      }
    </>
  );
}
