import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { shopifyClient } from '@/lib/graphql-client';
import { GET_CUSTOMER_ORDERS } from '@/features/account/queries/getCustomerOrders';
import { CustomerOrdersResponse, Order } from '@/features/account/types';
import Link from 'next/link';
import Image from 'next/image';

const formatPrice = (amount: string, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(parseFloat(amount));
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default async function OrdersPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('shopify_customer_token')?.value;

  if (!accessToken) {
    redirect('/login?next=/account/orders');
  }

  let orders: Order[] = [];
  
  try {
    const data = await shopifyClient.request<CustomerOrdersResponse>(
      GET_CUSTOMER_ORDERS,
      { customerAccessToken: accessToken }
    );
    orders = data.customer?.orders.edges.map((edge) => edge.node) || [];
  } catch (error) {
    console.error('Failed to fetch orders:', error);
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Order History</h2>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">You haven&apos;t placed any orders yet.</p>
          <Link 
            href="/products" 
            className="inline-block bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link 
              key={order.id} 
              href={`/account/orders/${encodeURIComponent(order.id)}`}
              className="block border rounded-lg p-5 hover:border-black transition-colors"
            >
              <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
                <div>
                  <div className="font-semibold">Order #{order.orderNumber}</div>
                  <div className="text-sm text-gray-500">{formatDate(order.processedAt)}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    {formatPrice(order.totalPrice.amount, order.totalPrice.currencyCode)}
                  </div>
                  <span className="inline-block px-2 py-1 text-xs bg-gray-100 rounded mt-1">
                    {order.financialStatus}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {order.lineItems.edges.map(({ node: item }, index) => (
                    <div key={index} className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded relative overflow-hidden border">
                      {item.variant?.image ? (
                        <Image
                          src={item.variant.image.url} 
                          alt={item.variant.image.altText || item.title}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                          No Img
                        </div>
                      )}
                      <div className="absolute bottom-0 right-0 bg-black text-white text-[10px] px-1 z-10">
                        x{item.quantity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}