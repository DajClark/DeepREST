export interface IPlugin {
  name?: string;
  details?: string;
  script?: string;
  scriptHeader?: string;
  params?: object;
}

export class Plugin implements IPlugin {
  constructor(
    public name?: string,
    public details?: string,
    public script?: string,
    public scriptHeader?: string,
    public params?: object
  ) {}
}
