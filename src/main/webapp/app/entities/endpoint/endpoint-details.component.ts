import { Component, Vue, Inject } from 'vue-property-decorator';

import { INode } from '@/shared/model/node.model';
import NodeService from '@/entities/node/node.service';
import EndpointService from '@/entities/endpoint/endpoint.service';
import { IEndpoint } from '@/shared/model/endpoint.model';

@Component
export default class EndpointDetails extends Vue {
  @Inject('nodeService')
  private nodeService: () => NodeService;
  @Inject('endpointService')
  private endpointService: () => EndpointService;
  public node: INode = {};
  public endpoint: IEndpoint = {};
  public endpointURL: string = null;
  public endpointID: string = null;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.nodeId) {
        vm.retrieveEndpoint(to.params.nodeId);
      }
    });
  }

  public retrieveEndpoint(nodeId) {
    this.nodeService()
      .find(nodeId)
      .then(res => {
        this.node = res;
        this.endpointURL = this.endpointService().createEndpointURL(this.node);
        this.endpointID = this.$route.params.endpointId;
        this.endpointService()
          .find(this.endpointURL, this.$route.params.endpointId)
          .then(res => {
            this.endpoint = res;
          });
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
