export interface CustomerAccessToken {
  accessToken: string;
  expiresAt: string;
}

export interface CustomerUserError {
  code: string;
  field: string[];
  message: string;
}

export interface LoginMutationResponse {
  customerAccessTokenCreate: {
    customerAccessToken: CustomerAccessToken | null;
    customerUserErrors: CustomerUserError[];
  };
}

export interface LogoutMutationResponse {
  customerAccessTokenDelete: {
    deletedAccessToken: string | null;
    deletedCustomerAccessTokenId: string | null;
    userErrors: CustomerUserError[];
  };
}