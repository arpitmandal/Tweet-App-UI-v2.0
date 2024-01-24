import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../Services/authentication.service';
import { MainNavService } from '../Services/main-nav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  public activeTab: any;
  public isLoggedIn = false;
  public loggedInUser: any;
  public UserName: any;
  constructor(private menuService: MainNavService,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.getLoggedInUser.subscribe(data => {
      this.isLoggedIn = data;
      const tokenInfoString = localStorage.getItem('TokenInfo');
      // Check if the value is not null
      if (tokenInfoString !== null) {
        // Parse the string if it's not null
        this.loggedInUser = JSON.parse(tokenInfoString);
      } else {
        // Handle the case where the value is null (optional)
        console.error('TokenInfo not found in localStorage');
        // You might want to provide a default value or take appropriate action.
      }      
      this.UserName = this.loggedInUser?.user?.first_Name + ' ' + this.loggedInUser?.user?.last_Name;
    });
  }
  setTab(tabNum: any, activeTab: string) {
    this.menuService.setTabActive(tabNum);
    this.activeTab = activeTab;
  }
  logout() {
    this.authenticationService.logout();
    this.menuService.setTabActive(1);
    this.isLoggedIn = false;
  }

}
