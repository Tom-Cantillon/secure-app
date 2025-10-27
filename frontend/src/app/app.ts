import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
import { AuthService } from './shared/auth/auth.service'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  readonly auth = inject(AuthService)

  ngOnInit(): void {
    // Restaure la session (cookies httpOnly) au démarrage
    this.auth.whoami()
  }
}