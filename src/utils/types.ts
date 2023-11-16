export interface IIGD {
  title: string;
  string_list_data: { href: string; value: string; timestamp: number }[];
}

export interface IData {
  following?: IIGD[];
  followers?: IIGD[];
}
