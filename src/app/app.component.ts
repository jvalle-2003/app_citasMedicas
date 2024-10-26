import { Component } from '@angular/core';
interface MenuItem {
  label: string;
  icon?: string;
  image?: string;
  subtext?: string;
  items?: MenuItem[]; // Para submenús
  root?: boolean; // Para distinguir los elementos raíz
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app_citasMedicas';
  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      root: true,
    },
    {
      label: 'Products',
      icon: 'pi pi-fw pi-star',
      items: [
        {
          label: 'New Arrivals',
          icon: 'pi pi-fw pi-tags',
        },
        {
          label: 'Best Sellers',
          icon: 'pi pi-fw pi-chart-line',
        },
      ],
    },
    {
      label: 'Services',
      icon: 'pi pi-fw pi-cog',
      items: [
        {
          label: 'Consulting',
          icon: 'pi pi-fw pi-user',
        },
        {
          label: 'Support',
          icon: 'pi pi-fw pi-comments',
        },
      ],
    },
  ];
}
