import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';
import { INode, Node } from '@/shared/model/node.model';
import NodeService from './node.service';

const validations: any = {
  node: {
    name: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(20)
    },
    description: {},
    ip: {
      required
    },
    user: {},
    password: {},
    port: {
      required,
      numeric
    }
  }
};

@Component({
  validations
})
export default class NodeUpdate extends Vue {
  @Inject('alertService')
  private alertService: () => AlertService;
  @Inject('nodeService')
  private nodeService: () => NodeService;
  public node: INode = new Node();
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.nodeId) {
        vm.retrieveNode(to.params.nodeId);
      }
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.node.id) {
      this.nodeService()
        .update(this.node)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('deepRestApp.node.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.nodeService()
        .create(this.node)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('deepRestApp.node.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveNode(nodeId): void {
    this.nodeService()
      .find(nodeId)
      .then(res => {
        this.node = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
