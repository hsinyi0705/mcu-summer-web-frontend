import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router'; // 確保導入 Router 和 NavigationEnd
import { DataService } from './data.service';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // 確保 styleUrls 為 stylesUrls
})
export class AppComponent implements OnInit {
  title = 'temi';

  hintShow: boolean = true;

  message: string | undefined; // 用於存儲從服務獲取的數據

  constructor(private dataService: DataService, private router: Router) {} // 注入 Router

  ngOnInit(): void {
    this.dataService.getData().subscribe(
      (data: { message: string }) => {
        this.message = data.message; // 假設你的 API 返回一個包含 `message` 屬性的對象
      },
      (error: any) => {
        console.error('Error fetching data', error);
      }
    );

    // 監聽路由事件
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url !== '/') {
          this.hintShow = false;
        }
      }
    });
  }

  hideHint(): void {
    this.hintShow = false;
  }
}
