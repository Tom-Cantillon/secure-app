import { Component, inject, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../shared/auth/auth.service'

@Component({
  selector: 'app-home.component',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent implements OnInit {
  readonly auth = inject(AuthService)
  private router = inject(Router)

  ngOnInit(): void {
    // Charge les infos utilisateur au chargement de la home
    this.auth.whoami()
  }

  onLogoutClick(event?: Event) {
    event?.preventDefault()
    this.auth.logout()
    // La navigation peut rester sur Home; on pourrait aussi décider de rediriger:
    // this.router.navigateByUrl('/login')
  }
}
