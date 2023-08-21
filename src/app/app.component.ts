import { Component } from "@angular/core";
import { User } from "./_models/user";
import { AccountService } from "./_services/account.service";

@Component({
  selector: 'app-main', 
  templateUrl: 'app.component.html',
})
export class AppComponent {
  user?: User | null;

  constructor(private accountService: AccountService) {
      this.accountService.user.subscribe(x => this.user = x);
  }

  logout() {
      this.accountService.logout();
  }
}
