import { Component, effect, inject } from '@angular/core'
import { UserService } from '../../users/user'

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
loadError() {
throw new Error('Method not implemented.')
}
  private readonly userService = inject(UserService)
  readonly users = this.userService.users
  readonly isLoading = this.userService.isLoading
  readonly error = this.userService.error

  constructor() {
    effect(() => this.userService.loadAll())
  }
}