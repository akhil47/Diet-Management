import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthService, private dataService: DataStorageService) { }

  ngOnInit() {
  }

  onStoreData(){
    this.dataService.storeMeals()
  }
  onRetrieveData(){
    this.dataService.getMeals()
  }
  onLogout(){
    this.auth.signOut()
  }

}
