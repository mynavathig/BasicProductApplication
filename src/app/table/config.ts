export interface ConfigColumn {
  header: string;
  value: string;
  sort: string;
  isCurrent: number;
}

export type Config = ConfigColumn[];