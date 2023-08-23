export interface RateItemData {
  active: RateItem
  inactive: RateItem
}

export interface RateItem {
  icon: string
  color: {
    class: string
    style: string
  }
}
