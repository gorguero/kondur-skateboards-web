import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kondur-web-app';
  // NOS PERMITE QUE AL PASAR DE VISTA EN VISTA NOS LLEVE AL INICIO DE LA PAGINA AUTOMATICAMENTE
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      if (window.pageYOffset > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    }
  }
}
