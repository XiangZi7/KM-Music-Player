export type RegionData = RegionDataItem[]
export type RegionDataItem = {
  code: string
  name: string
  children?: RegionDataItem[]
}
