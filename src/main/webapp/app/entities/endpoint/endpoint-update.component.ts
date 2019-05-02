import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';
import { INode, Node } from '@/shared/model/node.model';
import EndpointService from '@/entities/endpoint/endpoint.service';
import { IEndpoint, Endpoint } from '@/shared/model/endpoint.model';
import PluginService from '@/entities/endpoint/plugins.service';
import NodeService from '@/entities/node/node.service';
import { IPlugin, Plugin } from '@/shared/model/plugin.model';

const validations: any = {
  endpoint: {
    name: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(30)
    },
    details: {}
  }
};

@Component({
  validations
})
export default class EndpointUpdate extends Vue {
  @Inject('alertService')
  private alertService: () => AlertService;
  @Inject('endpointService')
  private endpointService: () => EndpointService;
  public endpoint: IEndpoint = new Endpoint();
  @Inject('nodeService')
  private nodeService: () => NodeService;
  public node: INode = {};
  @Inject('pluginService')
  private pluginService: () => PluginService;
  public plugins: IPlugin[] = [];
  public currentPlugin: IPlugin = new Plugin();
  public isSaving = false;
  public endpointURL: string = null;
  public pluginsURL: string = null;
  public endpointID: string = null;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.endpointId) {
        vm.retrieveEndpoint(to.params.nodeId);
        vm.retrieveAllPlugins();
      } else {
        vm.retrieveAllPlugins();
      }
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.endpoint.name) {
      this.endpointID = this.$route.params.endpointId;
      this.endpointURL = this.endpointService().createEndpointUpdateURL(this.node, this.endpointID);
      this.endpointService()
        .update(this.endpointURL, this.endpoint)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('deepRestApp.endpoint.updated', { param: this.$route.params.endpointId });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.endpointURL = this.endpointService().createEndpointURL(this.node);
      this.endpointService()
        .create(this.$route.params.nodeId, this.endpoint)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('deepRestApp.endpoint.created', { param: this.$route.params.endpointId });
          this.alertService().showAlert(message, 'success');
        });
    }
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

  public retrieveAllPlugins(): void {
    this.nodeService()
      .find(this.$route.params.nodeId)
      .then(res => {
        this.node = res;
        this.pluginsURL = this.pluginService().createPluginURL(this.node);
        this.pluginService()
          .retrieve(this.pluginsURL)
          .then(res => {
            this.plugins = res.data;
            var index;
            for (index = 0; index < this.plugins.length; ++index) {
              if (this.endpoint.getResource['name'] === this.plugins[index].name) {
                console.log(this.endpoint.getResource['name']);
                this.getPlugin(index);
              }
            }
          });
      });
  }

  public getPlugin(id): void {
    this.nodeService()
      .find(this.node.id)
      .then(res => {
        this.node = res;
        this.pluginsURL = this.pluginService().createPluginURL(this.node);
        this.pluginService()
          .find(this.pluginsURL, id)
          .then(res => {
            this.currentPlugin = res;
          });
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }
}
