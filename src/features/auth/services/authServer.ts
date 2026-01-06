import { shopifyClient } from '@/lib/graphql-client';
import { 
  CUSTOMER_LOGIN_MUTATION, 
  CUSTOMER_LOGOUT_MUTATION 
} from '../queries/authMutations';
import { 
  LoginMutationResponse, 
  LogoutMutationResponse
} from '../types';

export class AuthServerService {
  static async login(email: string, password: string) {
    const data = await shopifyClient.request<LoginMutationResponse>(
      CUSTOMER_LOGIN_MUTATION,
      { email, password }
    );

    const { customerAccessToken, customerUserErrors } = data.customerAccessTokenCreate;

    if (customerUserErrors.length > 0) {
      throw new Error(customerUserErrors[0].message);
    }

    return customerAccessToken;
  }

  static async logout(accessToken: string) {
    const data = await shopifyClient.request<LogoutMutationResponse>(
      CUSTOMER_LOGOUT_MUTATION,
      { customerAccessToken: accessToken }
    );

    const { userErrors } = data.customerAccessTokenDelete;
    
    if (userErrors.length > 0) {
      console.error('Logout failed upstream:', userErrors);
    }
    
    return true;
  }
}