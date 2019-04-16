import { Component, Vue, Inject } from 'vue-property-decorator';

import { INode } from '@/shared/model/node.model';
import NodeService from './node.service';

@Component
export default class NodeDetails extends Vue {
  @Inject('nodeService')
  private nodeService: () => NodeService;
  public node: INode = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.nodeId) {
        vm.retrieveNode(to.params.nodeId);
      }
    });
  }

  public retrieveNode(nodeId) {
    this.nodeService()
      .find(nodeId)
      .then(res => {
        this.node = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
