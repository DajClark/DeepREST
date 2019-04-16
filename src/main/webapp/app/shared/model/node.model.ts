export interface INode {
  id?: number;
  name?: string;
  description?: string;
  ip?: string;
  user?: string;
  password?: string;
  port?: number;
}

export class Node implements INode {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public ip?: string,
    public user?: string,
    public password?: string,
    public port?: number
  ) {}
}
