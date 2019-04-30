export interface IEndpoint {
  name?: string;
  details?: string;
  get?: string;
  // post?: string;
  // put?: string;
  // patch?: string;
  // delete?: string;
}

export class Endpoint implements IEndpoint {
  constructor(public name?: string, public details?: string, public get?: string) // public post?: string,
  // public put?: string,
  // public patch?: string,
  // public delete?: string,
  {}
}
