import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponentComponent } from './sidebar-component/sidebar-component.component';
import { faChevronDown, faHome, faRightToBracket, faUser, faUserPen, faFileArchive, faPenToSquare, faList } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  faChevronDown = faChevronDown;
  faHome =faHome;
  faRightToBracket =faRightToBracket;
  faUser = faUser;
  faUserPen = faUserPen;
  faFileArchive = faFileArchive;
  faPenToSquare = faPenToSquare;
  faList = faList;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openNav() {
    const sidebar: any = document.getElementById('mySidebar');
    sidebar.style.width = "250px";
    const main: any = document.getElementById('main');
    main.style.marginLeft = "250px";
  }
  
  closeNav() {
    
    const sidebar: any = document.getElementById('mySidebar');
    sidebar.style.width = "0";
    const main: any = document.getElementById('main');
    main.style.marginLeft = "0";
  }

  myFunction() {
    const x: any = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  logout(){
    localStorage.removeItem('jwt');
    this.router.navigate(['/login'])
  }

}
