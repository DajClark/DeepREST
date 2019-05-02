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
  public currentPlugins: HttpMethods = new HttpMethods();
  public isSaving = false;
  public endpointURL: string = null;
  public pluginsURL: string = null;
  public endpointID: string = null;

  GET = 0;
  POST = 1;
  PUT = 2;
  PATCH = 3;
  DELETE = 4;

  created() {
    if (this.$route.params.endpointId) {
      this.retrieveEndpoint(this.$route.params.nodeId).then(() => {
        this.retrieveAllPlugins();
      });
    } else {
      this.retrieveAllPlugins();
    }
  }

  public save(): void {
    this.isSaving = true;
    this.endpointID = this.$route.params.endpointId;
    if (this.endpointID != undefined) {
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
        .create(this.endpointURL, this.endpoint)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('deepRestApp.endpoint.created', { param: this.$route.params.endpointId });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public async retrieveEndpoint(nodeId) {
    await this.nodeService()
      .find(nodeId)
      .then(async res => {
        this.node = res;
        this.endpointURL = this.endpointService().createEndpointURL(this.node);
        this.endpointID = this.$route.params.endpointId;
        await this.endpointService()
          .find(this.endpointURL, this.$route.params.endpointId)
          .then(res => {
            this.endpoint = res;
          });
      });
  }

  public async retrieveAllPlugins() {
    await this.nodeService()
      .find(this.$route.params.nodeId)
      .then(async res => {
        this.node = res;
        this.pluginsURL = this.pluginService().createPluginURL(this.node);
        await this.pluginService()
          .retrieve(this.pluginsURL)
          .then(async res => {
            this.plugins = res.data;
            var index;
            console.log(this.endpoint);
            for (index = 0; index < this.plugins.length; ++index) {
              if (this.endpoint.getResource['name'] === this.plugins[index].name)
                await this.getPlugin(index).then(res => {
                  this.currentPlugins.getPlugin = res;
                });

              if (this.endpoint.postResource['name'] === this.plugins[index].name)
                this.getPlugin(index).then(res => {
                  this.currentPlugins.postPlugin = res;
                });

              if (this.endpoint.putResource['name'] === this.plugins[index].name)
                this.getPlugin(index).then(res => {
                  this.currentPlugins.putPlugin = res;
                });

              if (this.endpoint.patchResource['name'] === this.plugins[index].name)
                this.getPlugin(index).then(res => {
                  this.currentPlugins.patchPlugin = res;
                });

              if (this.endpoint.deleteResource['name'] === this.plugins[index].name)
                this.getPlugin(index).then(res => {
                  this.currentPlugins.deletePlugin = res;
                });
            }
          });
      });
  }

  public async getPlugin(id) {
    return await this.nodeService()
      .find(this.node.id)
      .then(async res => {
        this.node = res;
        this.pluginsURL = this.pluginService().createPluginURL(this.node);
        return await this.pluginService()
          .find(this.pluginsURL, id)
          .then(res => {
            return res;
          });
      });
  }

  public async setPlugin(method, key) {
    return await this.getPlugin(key).then(res => {
      switch (method) {
        case 0: {
          this.endpoint.getResource['name'] = res.name;
          this.endpoint.getResource['params'] = this.generatePluginJSON(res);
          this.currentPlugins.getPlugin = res;
          break;
        }
        case 1: {
          this.endpoint.postResource['name'] = res.name;
          this.endpoint.postResource['params'] = this.generatePluginJSON(res);
          this.currentPlugins.postPlugin = res;
          break;
        }
        case 2: {
          this.endpoint.putResource['name'] = res.name;
          this.endpoint.putResource['params'] = this.generatePluginJSON(res);
          this.currentPlugins.putPlugin = res;
          break;
        }
        case 3: {
          this.endpoint.patchResource['name'] = res.name;
          this.endpoint.patchResource['params'] = this.generatePluginJSON(res);
          this.currentPlugins.patchPlugin = res;
          break;
        }
        case 4: {
          this.endpoint.deleteResource['name'] = res.name;
          this.endpoint.deleteResource['params'] = this.generatePluginJSON(res);
          this.currentPlugins.deletePlugin = res;
          break;
        }
      }
    });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public generatePluginJSON(plugin: Plugin): JSON {
    let string: String = '';
    Object.keys(plugin.params).forEach(function(key) {
      string += '{\n' + '"first": "' + plugin.params[key]['name'] + '",\n' + '"second": "' + plugin.params[key]['details'] + '"\n' + '},\n';
    });
    return JSON.parse(
      '[\n' +
      string.substring(0, string.length - 2) + // remove comma from last iteration
        ']'
    );
  }
}

export class HttpMethods {
  public getPlugin: IPlugin = new Plugin();
  public postPlugin: IPlugin = new Plugin();
  public putPlugin: IPlugin = new Plugin();
  public patchPlugin: IPlugin = new Plugin();
  public deletePlugin: IPlugin = new Plugin();
}
