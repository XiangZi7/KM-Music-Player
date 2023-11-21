import MKTable from '@/components/Mk-Table'

export default function Single({ data }: SingleProps) {
  return (
    <>
      {
        <div className='content-section mt-10'>
          <div className='content-setion-title'>Album</div>
          <MKTable songList={data} style={{ maxHeight: "55vh" }}></MKTable>
        </div>
      }
    </>
  )
}
