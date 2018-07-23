import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User } from 'oidc-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getClientSettings(): UserManagerSettings {
    return {
      authority: 'https://mycgitraining.auth0.com/authorize',
      client_id: '60QsHOOCB5Wus2gUGKbyifjHjcQpc8rx',
      client_secret: 'tEfUSRCVfsH2Vph1RSvaxtL0e3vgn6D-Z5y81sDT2gAozz051hQ895hh8Fr1Chgo',
      redirect_uri: 'http://localhost:4200/auth-callback',
      post_logout_redirect_uri: 'http://localhost:4200',
      response_type: 'token id_token',
      scope: 'openid',
      filterProtocolClaims: true,
      loadUserInfo: true,
    }
  }

  private manager = new UserManager(this.getClientSettings());

  private user: User;

  /**
   * check if user is logged in
   */
  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }

  /**
   * get user profile
   */
  getClaims(): any {
    return this.user.profile;
  }

  /**
   * get the user access token and type of token
   */
  getAuthorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  /**
   * start authentication process
   */
  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }

  /**
   * 
   */
  completeAuthentication(): Promise<void> {
      return this.manager.signinRedirectCallback().then(user => {
          this.user = user;
      });
  }

  /**
   * logout user
   */
  logout(): void {
    this.manager.removeUser().then(user => {
      this.user = null;
    });
  }

  constructor() {
    this.manager.removeUser().then(user => {
      this.user = null;
    });
    this.manager.getUser().then(user => {
      this.user = user;
    })
   }
}
