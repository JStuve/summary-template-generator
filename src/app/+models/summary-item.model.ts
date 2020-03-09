export interface Section {
  type: string,
  items: SummaryItem[];
}

export interface SummaryItem {
  type: string,
  label: string,
  format: string,
  properties: string[]
}