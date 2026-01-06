import { AuthServerService } from '../authServer';
import { shopifyClient } from '@/lib/graphql-client';

jest.mock('@/lib/graphql-client', () => ({
  shopifyClient: {
    request: jest.fn(),
  },
}));

describe('AuthServerService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('returns token when mutations succeeds', async () => {
      (shopifyClient.request as jest.Mock).mockResolvedValue({
        customerAccessTokenCreate: {
          customerAccessToken: { accessToken: 'abc-123', expiresAt: '2025-01-01' },
          customerUserErrors: [],
        },
      });

      const result = await AuthServerService.login('test@example.com', 'password');
      
      expect(result?.accessToken).toBe('abc-123');
      expect(shopifyClient.request).toHaveBeenCalledTimes(1);
    });

    it('throws error when Shopify returns user errors', async () => {
      (shopifyClient.request as jest.Mock).mockResolvedValue({
        customerAccessTokenCreate: {
          customerAccessToken: null,
          customerUserErrors: [{ message: 'Invalid credentials', code: 'UNIDENTIFIED_CUSTOMER' }],
        },
      });

      await expect(
        AuthServerService.login('wrong', 'pass')
      ).rejects.toThrow('Invalid credentials');
    });
  });
});