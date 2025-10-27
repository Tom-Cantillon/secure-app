import { Injectable, inject, signal, computed } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, Observable, of } from 'rxjs'
import { tap, catchError, finalize } from 'rxjs'
import { UserDto } from '../types/user-dto'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient)

  // --- état interne (signaux) ---
  private readonly _users = signal<UserDto[]>([])
  private readonly _isLoading = signal(false)
  private readonly _error = signal<string | null>(null)

  // --- état exposé (readonly / computed) ---
  readonly users = this._users.asReadonly()
  readonly usersCount = computed(() => this._users().length)
  readonly isLoading = this._isLoading.asReadonly()
  readonly error = this._error.asReadonly()

  // --- fetch en observable (pour guards ou autres services) ---
  loadAll$(): Observable<UserDto[]> {
    this._isLoading.set(true)
    this._error.set(null)
    return this.http.get<UserDto[]>(`${environment.apiUrl}/users`).pipe(
      tap(users => this._users.set(users ?? [])),
      catchError(err => {
        this._error.set('Impossible de charger les utilisateurs')
        return of([] as UserDto[])
      }),
      finalize(() => this._isLoading.set(false))
    )
  }

  // --- fetch et subscribe (adapté pour composants) ---
  loadAll(): void {
    this.loadAll$().subscribe()
  }

  // --- create user ---
  createUser$(payload: { login: string; password: string; role?: string }): Observable<UserDto | null> {
    this._isLoading.set(true)
    this._error.set(null)
    return this.http.post<UserDto>(`${environment.apiUrl}/users`, payload).pipe(
      tap(user => { if (user) this._users.update(list => [...list, user]) }),
      catchError(err => {
        this._error.set('Erreur lors de la création')
        return of(null)
      }),
      finalize(() => this._isLoading.set(false))
    )
  }

  createUser(payload: { login: string; password: string; role?: string }): void {
    this.createUser$(payload).subscribe()
  }

  // --- update user ---
  updateUser$(id: number, patch: Partial<UserDto>): Observable<UserDto | null> {
    this._isLoading.set(true)
    this._error.set(null)
    return this.http.put<UserDto>(`${environment.apiUrl}/users/${id}`, patch).pipe(
      tap(updated => {
        if (updated) {
          this._users.update(list => list.map(u => u.id === updated.id ? updated : u))
        }
      }),
      catchError(err => {
        this._error.set('Erreur lors de la mise à jour')
        return of(null)
      }),
      finalize(() => this._isLoading.set(false))
    )
  }

  // --- delete user ---
  deleteUser$(id: number): Observable<boolean> {
    this._isLoading.set(true)
    this._error.set(null)
    return this.http.delete<void>(`${environment.apiUrl}/users/${id}`).pipe(
      // side-effect: mettre à jour le signal local
      tap(() => this._users.update(list => list.filter(u => u.id !== id))),
      // transformer la valeur (void -> boolean)
      map(() => true),
      // en cas d'erreur, émettre false et définir le message d'erreur
      catchError(err => {
        this._error.set('Erreur lors de la suppression')
        return of(false)
      }),
      // toujours arrêter le loading
      finalize(() => this._isLoading.set(false))
    )
  }
}