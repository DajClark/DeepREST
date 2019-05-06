import { Component, Inject, Vue } from 'vue-property-decorator';
import $ from 'jquery';
import { INode } from '@/shared/model/node.model';
import NodeService from '@/entities/node/node.service';

@Component
export default class Sidebar extends Vue {
  @Inject('nodeService')
  private nodeService: () => NodeService;
  public currentNode: INode = {};
  public nodes: INode[] = [];
  public propOrder = 'id';
  public reverse = true;

  public refreshCurrentNode(id): void {
    this.nodeService()
      .refreshCurrentNode(id)
      .then(res => {
        this.currentNode = res;
      });
  }

  public mounted(): void {
    this.retrieveAllNodes();
  }

  public retrieveAllNodes(): void {
    const paginationQuery = {
      sort: this.sort()
    };
    this.nodeService()
      .retrieve(paginationQuery)
      .then(res => {
        this.nodes = res.data;
      });
  }

  public sort(): Array<any> {
    const result = [this.propOrder + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.propOrder !== 'id') {
      result.push('id');
    }
    return result;
  }

  public subIsActive(input) {
    const paths = Array.isArray(input) ? input : [input];
    return paths.some(path => {
      return this.$route.path.indexOf(path) === 0; // current path starts with this path string
    });
  }

  public get authenticated(): boolean {
    return this.$store.getters.authenticated;
  }

  public sidebarCollapse(): void {
    $('#sidebar').toggleClass('active');
  }

  public sidebarExpand(): void {
    $('#sidebar.active').removeClass('active');
  }

  // public refresh(): void {
  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 100);
  // }
}
