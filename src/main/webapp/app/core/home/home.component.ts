import Component from 'vue-class-component';
import { Inject } from 'vue-property-decorator';
import LoginService from '@/account/login.service';
import App from '@/app.component';

@Component
export default class Home extends App {
  @Inject('loginService')
  private loginService: () => LoginService;

  public openLogin(): void {
    this.loginService().openLogin((<any>this).$root);
  }

  public get authenticated(): boolean {
    return this.$store.getters.authenticated;
  }

  public get username(): string {
    return this.$store.getters.account ? this.$store.getters.account.login : '';
  }
}
