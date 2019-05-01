export interface IEndpoint {
  name?: string;
  details?: string;
  getResource?: object;
  postResource?: object;
  putResource?: object;
  patchResource?: object;
  deleteResource?: object;
}

export class Endpoint implements IEndpoint {
  constructor(
    public name?: string,
    public details?: string,
    public getResource?: object,
    public postResource?: object,
    public putResource?: object,
    public patchResource?: object,
    public deleteResource?: object
  ) {}
}
