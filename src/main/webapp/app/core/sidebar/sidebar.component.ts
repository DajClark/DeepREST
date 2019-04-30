import { Component, Inject, Vue } from 'vue-property-decorator';
import $ from 'jquery';

@Component
export default class Sidebar extends Vue {
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

  public refresh(): void {
    setTimeout(() => {
      window.location.reload();
      console.log(this.$route.params.nodeId);
    }, 100);
  }
}
