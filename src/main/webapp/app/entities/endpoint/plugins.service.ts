import axios from 'axios';

import { INode } from '@/shared/model/node.model';
import { IEndpoint } from '@/shared/model/endpoint.model';
import { IPlugin } from '@/shared/model/plugin.model';

export default class PluginService {
  public retrieve(url): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get(url).then(function(res) {
        resolve(res);
      });
    });
  }

  public find(url, id): Promise<IPlugin> {
    return new Promise<IPlugin>(resolve => {
      axios.get(`${url}/${id}`).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public createPluginURL(node): string {
    return `http://${node.ip}:${node.port}/api/plugins`;
  }
}
