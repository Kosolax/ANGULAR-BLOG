import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  //Temporary
  tags: Tag[] = [{ name: "tag1" }, { name: "tag2" }]
  isMenuCollapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

}

//Temporary
export interface Tag {
  name: string;
}
