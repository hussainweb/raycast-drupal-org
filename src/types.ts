export interface DrupalChangeRecord {
  created: Date;
  title: string;
  changeVersion: string;
  id: string;
  url: string;
}

export interface SearchChangeRecordsState{
  searchString?: string;
  records?: DrupalChangeRecord[];
  error?: Error;
}
