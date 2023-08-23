export interface FooterNavigatorItem {
  title: string
  url: string
  color: FooterNavigatorColor
}

export interface FooterNavigatorColor {
  class: string
  style: string
}

export type FooterNavigatorData = FooterNavigatorItem[]
