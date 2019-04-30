import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { INode } from '@/shared/model/node.model';
import { IEndpoint } from '@/shared/model/endpoint.model';

export default class EndpointService {
  public find(url, id): Promise<IEndpoint> {
    return new Promise<IEndpoint>(resolve => {
      axios.get(`${url}/${id}`).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public retrieve(url, paginationQuery?: any): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get(url + `?${buildPaginationQueryOpts(paginationQuery)}`).then(function(res) {
        resolve(res);
      });
    });
  }

  public delete(url, id): Promise<any> {
    return new Promise<any>(resolve => {
      axios.delete(`${url}/${id}`).then(function(res) {
        resolve(res);
      });
    });
  }

  public create(url, entity): Promise<IEndpoint> {
    return new Promise<IEndpoint>(resolve => {
      axios.post(`${url}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(url, entity): Promise<IEndpoint> {
    return new Promise<INode>(resolve => {
      axios.put(`${url}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public createEndpointURL(node): string {
    return `http://${node.ip}:${node.port}/api/resources`;
  }

  public createEndpointUpdateURL(node, endpointID): string {
    return `http://${node.ip}:${node.port}/api/resources/${endpointID}`;
  }
}
