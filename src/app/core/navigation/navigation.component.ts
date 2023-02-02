import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  //Temporary
  tags: Tag[] = [{ name: "tag1" }, { name: "tag2" }]
  isMenuCollapsed = true;
  public isAdmin: boolean = false;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.authChanged
      .subscribe(() => {
        this.isAdmin = this.authService.isUserAdmin();
      })
  }

}

//Temporary
export interface Tag {
  name: string;
}
