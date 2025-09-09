// Admin authentication utilities

export interface AdminSession {
  username: string;
  loginTime: number;
  expiresAt: number;
}

export class AdminAuth {
  private static readonly TOKEN_KEY = 'admin_token';
  private static readonly SESSION_KEY = 'admin_session';
  private static readonly SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    
    const token = localStorage.getItem(this.TOKEN_KEY);
    const sessionData = localStorage.getItem(this.SESSION_KEY);
    
    if (!token || !sessionData) return false;
    
    try {
      const session: AdminSession = JSON.parse(sessionData);
      const now = Date.now();
      
      // Check if session is expired
      if (now > session.expiresAt) {
        this.logout();
        return false;
      }
      
      return true;
    } catch {
      this.logout();
      return false;
    }
  }

  // Get current session
  static getSession(): AdminSession | null {
    if (typeof window === 'undefined') return null;
    
    const sessionData = localStorage.getItem(this.SESSION_KEY);
    if (!sessionData) return null;
    
    try {
      const session: AdminSession = JSON.parse(sessionData);
      const now = Date.now();
      
      // Check if session is expired
      if (now > session.expiresAt) {
        this.logout();
        return null;
      }
      
      return session;
    } catch {
      this.logout();
      return null;
    }
  }

  // Get auth token
  static getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Set session data
  static setSession(token: string, username: string): void {
    if (typeof window === 'undefined') return;
    
    const now = Date.now();
    const session: AdminSession = {
      username,
      loginTime: now,
      expiresAt: now + this.SESSION_DURATION
    };
    
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    
    // Set cookies for server-side access
    document.cookie = `admin_token=${token}; path=/; max-age=${this.SESSION_DURATION / 1000}; secure; samesite=strict`;
    document.cookie = `admin_session=${JSON.stringify(session)}; path=/; max-age=${this.SESSION_DURATION / 1000}; secure; samesite=strict`;
  }

  // Logout and clear session
  static logout(): void {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.SESSION_KEY);
    
    // Clear cookies
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }

  // Check if session is about to expire (within 1 hour)
  static isSessionExpiringSoon(): boolean {
    const session = this.getSession();
    if (!session) return false;
    
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    
    return (session.expiresAt - now) < oneHour;
  }

  // Extend session
  static extendSession(): boolean {
    const session = this.getSession();
    const token = this.getToken();
    
    if (!session || !token) return false;
    
    const now = Date.now();
    const newSession: AdminSession = {
      ...session,
      expiresAt: now + this.SESSION_DURATION
    };
    
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(newSession));
    document.cookie = `admin_session=${JSON.stringify(newSession)}; path=/; max-age=${this.SESSION_DURATION / 1000}; secure; samesite=strict`;
    
    return true;
  }
}
