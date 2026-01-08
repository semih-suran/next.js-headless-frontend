import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { shopifyClient } from '@/lib/graphql-client';
import { GET_ORDER_BY_ID } from '@/features/account/queries/getOrderById';
import { OrderDetailResponse } from '@/features/account/types';

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
    hour: 'numeric',
    minute: 'numeric',
  });
};

export default async function OrderDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('shopify_customer_token')?.value;

  if (!accessToken) {
    redirect(`/login?next=/account/orders/${id}`);
  }

  let order = null;
  try {
    const data = await shopifyClient.request<OrderDetailResponse>(
      GET_ORDER_BY_ID,
      { id: decodedId }
    );
    order = data.node;
  } catch (error) {
    console.error('Error fetching order details:', error);
  }

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <Link 
          href="/account/orders" 
          className="text-sm text-gray-500 hover:text-black mb-4 inline-block"
        >
          ← Back to Orders
        </Link>
        <h1 className="text-2xl font-bold">Order #{order.orderNumber}</h1>
        <p className="text-gray-500 text-sm mt-1">
          Placed on {formatDate(order.processedAt)}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b text-sm font-medium text-gray-700">
              Items
            </div>
            <div className="divide-y">
              {order.lineItems.edges.map(({ node: item }, index) => (
                <div key={index} className="p-4 flex gap-4">
                  <div className="h-20 w-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden border relative">
                    {item.variant?.image ? (
                      <Image
                        src={item.variant.image.url} 
                        alt={item.variant.image.altText || item.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                        No Img
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.title}</h3>
                    {item.variant?.title && item.variant.title !== 'Default Title' && (
                      <p className="text-sm text-gray-500 mt-1">{item.variant.title}</p>
                    )}
                    <div className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</div>
                  </div>
                  <div className="text-right font-medium text-sm">
                    {item.originalTotalPrice && 
                      formatPrice(item.originalTotalPrice.amount, item.originalTotalPrice.currencyCode)
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b text-sm font-medium text-gray-700">
              Summary
            </div>
            <div className="p-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{order.subtotalPrice && formatPrice(order.subtotalPrice.amount, order.subtotalPrice.currencyCode)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>{order.totalShippingPrice && formatPrice(order.totalShippingPrice.amount, order.totalShippingPrice.currencyCode)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>{order.totalTax && formatPrice(order.totalTax.amount, order.totalTax.currencyCode)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-base">
                <span>Total</span>
                <span>{formatPrice(order.totalPrice.amount, order.totalPrice.currencyCode)}</span>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 border-t flex justify-between text-xs font-medium uppercase tracking-wide">
              <span>Payment: {order.financialStatus}</span>
              <span>Fulfillment: {order.fulfillmentStatus}</span>
            </div>
          </div>

          {order.shippingAddress && (
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b text-sm font-medium text-gray-700">
                Shipping Address
              </div>
              <div className="p-4 text-sm text-gray-600 leading-relaxed">
                <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                <p>{order.shippingAddress.address1}</p>
                {order.shippingAddress.address2 && <p>{order.shippingAddress.address2}</p>}
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.zip}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}