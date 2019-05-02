import { Component, Vue, Inject } from 'vue-property-decorator';

import { INode } from '@/shared/model/node.model';
import NodeService from '@/entities/node/node.service';
import EndpointService from '@/entities/endpoint/endpoint.service';
import { IEndpoint } from '@/shared/model/endpoint.model';
import PluginService from '@/entities/endpoint/plugins.service';
import { IPlugin } from '@/shared/model/plugin.model';
import { HttpMethods } from '@/entities/endpoint/endpoint-update.component';

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
  @Inject('pluginService')
  private pluginService: () => PluginService;
  public plugins: IPlugin[] = [];
  public currentPlugins: HttpMethods = new HttpMethods();
  public pluginsURL: string = null;

  created() {
    if (this.$route.params.endpointId) {
      this.retrieveEndpoint(this.$route.params.nodeId).then(() => {
        this.retrieveAllPlugins();
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

  public previousState() {
    this.$router.go(-1);
  }
}
