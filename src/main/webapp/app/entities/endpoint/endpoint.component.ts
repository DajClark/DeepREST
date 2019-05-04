import { mixins } from 'vue-class-component';
import { Component, Inject, Vue } from 'vue-property-decorator';
import { INode, Node } from '@/shared/model/node.model';
import AlertService from '@/shared/alert/alert.service';
import NodeService from '@/entities/node/node.service';
import EndpointService from '@/entities/endpoint/endpoint.service';
import { IEndpoint } from '@/shared/model/endpoint.model';

@Component
export default class Endpoint extends Vue {
  @Inject('alertService')
  private alertService: () => AlertService;
  @Inject('nodeService')
  private nodeService: () => NodeService;
  @Inject('endpointService')
  private endpointService: () => EndpointService;
  private removeId: string = null;
  public itemsPerPage = 10;
  public queryCount: number = null;
  public page = 1;
  public previousPage: number = null;
  public propOrder = 'id';
  public reverse = true;
  public totalItems = 0;
  public endpoints: IEndpoint[] = [];
  public endpointURL: string = null;
  public node: INode = new Node();

  public dismissCountDown: number = this.$store.getters.dismissCountDown;
  public dismissSecs: number = this.$store.getters.dismissSecs;
  public alertType: string = this.$store.getters.alertType;
  public alertMessage: any = this.$store.getters.alertMessage;

  public getAlertFromStore() {
    this.dismissCountDown = this.$store.getters.dismissCountDown;
    this.dismissSecs = this.$store.getters.dismissSecs;
    this.alertType = this.$store.getters.alertType;
    this.alertMessage = this.$store.getters.alertMessage;
  }

  public countDownChanged(dismissCountDown: number) {
    this.alertService().countDownChanged(dismissCountDown);
    this.getAlertFromStore();
  }

  public mounted(): void {
    this.retrieveAllEndpoints();
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllEndpoints();
  }

  public retrieveAllEndpoints(): void {
    this.nodeService()
      .find(this.$route.params.nodeId)
      .then(res => {
        this.node = res;

        const paginationQuery = {
          page: this.page - 1,
          size: this.itemsPerPage,
          sort: this.sort()
        };

        this.endpointURL = this.endpointService().createEndpointURL(this.node);

        this.endpointService()
          .retrieve(this.endpointURL)
          .then(res => {
            this.endpoints = res.data;
            this.totalItems = Number(res.headers['x-total-count']);
            this.queryCount = this.totalItems;
          });
      });
  }

  public prepareRemove(instance): void {
    this.removeId = instance;
    console.log(instance);
  }

  public removeEndpoint(): void {
    this.endpointService()
      .delete(this.endpointURL, this.removeId)
      .then(() => {
        const message = this.$t('deepRestApp.endpoint.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllEndpoints();
        this.closeDialog();
      });
  }

  public sort(): Array<any> {
    const result = [this.propOrder + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.propOrder !== 'id') {
      result.push('id');
    }
    return result;
  }

  public loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  public transition(): void {
    this.retrieveAllEndpoints();
  }

  public changeOrder(propOrder): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEndpoint).hide();
  }

  public getEndpointIndex(name) {
    return this.endpoints.findIndex(p => p.name == name);
  }
}
