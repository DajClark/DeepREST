import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { INode } from '@/shared/model/node.model';
import Vue from 'vue';
import * as config from '@/shared/config/config';

const baseApiUrl = 'api/nodes';

export default class NodeService {
  private store = config.initVueXStore(Vue);

  public refreshCurrentNode(currentNodeID): Promise<INode> {
    if (currentNodeID != null) {
      this.store.commit('currentNodeID', currentNodeID);
    }

    let currentID = this.store.getters.currentNodeID;
    return new Promise<INode>(resolve => {
      axios.get(`${baseApiUrl}/${currentID}`).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public find(id): Promise<INode> {
    return new Promise<INode>(resolve => {
      axios.get(`${baseApiUrl}/${id}`).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public retrieve(paginationQuery?: any): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get(baseApiUrl + `?${buildPaginationQueryOpts(paginationQuery)}`).then(function(res) {
        resolve(res);
      });
    });
  }

  public delete(id): Promise<any> {
    return new Promise<any>(resolve => {
      axios.delete(`${baseApiUrl}/${id}`).then(function(res) {
        resolve(res);
      });
    });
  }

  public create(entity): Promise<INode> {
    return new Promise<INode>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity): Promise<INode> {
    return new Promise<INode>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
