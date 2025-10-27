import { inject } from '@angular/core'
import { CanActivateFn, Router, UrlTree } from '@angular/router'
import { of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { AuthService } from '../shared/auth/auth.service'

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService)
  const router = inject(Router)
  const redirect: UrlTree = router.createUrlTree(['/'])

  // Si on sait déjà que l'utilisateur est admin, on autorise directement
  if (auth.isAdmin()) return true

  // Sinon, tenter whoami$() (utile après reload si cookie httpOnly présent)
  return auth.whoami$().pipe(
    map(() => auth.isAdmin() ? true : redirect),
    catchError(() => of(redirect))
  )
}