export interface ITarget {
  pipe: string;
  sources: Source[];
  createdTime: number;
  updatedTime: number;
}

export interface Source {
  type: string;
  providerType: string;
  providers: Provider;
}

export interface Provider {
  [id:string] : {
    id: string
    username: string;
    name: string;
  };
}
