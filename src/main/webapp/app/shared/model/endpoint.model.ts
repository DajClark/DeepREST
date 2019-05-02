export interface IEndpoint {
  name?: string;
  details?: string;
  getResource?: JSON;
  postResource?: JSON;
  putResource?: JSON;
  patchResource?: JSON;
  deleteResource?: JSON;
}

export class Endpoint implements IEndpoint {
  constructor(
    public name?: string,
    public details?: string,
    public getResource?: JSON,
    public postResource?: JSON,
    public putResource?: JSON,
    public patchResource?: JSON,
    public deleteResource?: JSON
  ) {}
}
