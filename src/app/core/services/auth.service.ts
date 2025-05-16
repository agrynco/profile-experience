import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private apiUrl = environment.apiUrl;
  
  // Mock user data for demo purposes
  private mockUsers: User[] = [
    {
      id: '1',
      email: 'candidate@example.com',
      firstName: 'Test',
      lastName: 'Candidate',
      role: 'candidate'
    },
    {
      id: '2',
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin'
    }
  ];

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  register(user: any): Observable<any> {
    // In a real app, we would call the API
    // return this.http.post(`${this.apiUrl}/auth/register`, user);
    
    // For demo, we'll return a mock successful response
    return of({ success: true, message: 'Registration successful' }).pipe(
      tap(() => {
        // Auto-login after registration
        const newUser: User = {
          id: '3',
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: 'candidate'
        };
        
        this.storeUser(newUser);
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    // In a real app, we would call the API
    // return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
    
    // For demo, we'll check against our mock data
    const user = this.mockUsers.find(u => u.email === email);
    
    if (user && password === 'password') {
      this.storeUser(user);
      return of({ success: true, user });
    } else {
      return of({ success: false, message: 'Invalid credentials' }).pipe(
        catchError(error => of({ success: false, message: error.message }))
      );
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return !!user && user.role === 'admin';
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private storeUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}