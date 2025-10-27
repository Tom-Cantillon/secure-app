import { Component, OnInit, inject } from '@angular/core'
import { AuthService } from '../shared/auth/auth.service'
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-app.component',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent implements OnInit {
  readonly auth = inject(AuthService)

  ngOnInit(): void {
    // Restaure la session à l'initialisation de l'app (cookie httpOnly)
    this.auth.whoami()
  }
}