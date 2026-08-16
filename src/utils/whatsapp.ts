import { storeConfig } from '../config/storeConfig';
import { CartItem, OrderCustomerDetails, Product, ProductSize } from '../types';

/**
 * Creates a clean WhatsApp URL with encoded message text
 */
export function buildWhatsAppLink(message: string, customPhone?: string): string {
  const phone = customPhone || storeConfig.whatsAppNumber;
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

/**
 * Formats a checkout order for WhatsApp
 */
export function generateOrderWhatsAppMessage(
  customer: OrderCustomerDetails,
  items: CartItem[],
  subtotal: number,
  shippingFee: number,
  total: number
): string {
  const itemsText = items
    .map(
      (item, index) =>
        `Item ${index + 1}:\n• Product: ${item.product.name}\n• Quantity: ${item.quantity}\n• Size: ${item.selectedSize}\n• Color: ${item.selectedColor}\n• Price: ${storeConfig.currency}${item.product.price} each`
    )
    .join('\n\n');

  const message = `Hello ${storeConfig.brandName},

I would like to place an order.

Order details:
${itemsText}

----------------------
Subtotal: ${storeConfig.currency}${subtotal.toLocaleString('en-IN')}
Shipping: ${shippingFee === 0 ? 'FREE' : `${storeConfig.currency}${shippingFee}`}
Total: ${storeConfig.currency}${total.toLocaleString('en-IN')}
----------------------

Customer Details:
• Name: ${customer.fullName}
• Mobile: ${customer.mobileNumber}
• Email: ${customer.email || 'N/A'}
• Delivery Address: ${customer.address}, ${customer.city}, ${customer.state} - ${customer.pincode}
${customer.orderNotes ? `• Notes: ${customer.orderNotes}\n` : ''}
Thank you!`;

  return message;
}

/**
 * Formats a single product order/inquiry via WhatsApp
 */
export function generateSingleProductOrderMessage(
  product: Product,
  selectedSize: ProductSize,
  selectedColor: string,
  quantity: number = 1
): string {
  const total = product.price * quantity;
  return `Hello ${storeConfig.brandName},

I would like to order this piece from your collection:

• Product: ${product.name} (ID: ${product.id})
• Category: ${product.category}
• Selected Size: ${selectedSize}
• Selected Color: ${selectedColor}
• Quantity: ${quantity}
• Total: ${storeConfig.currency}${total.toLocaleString('en-IN')}

Please let me know how to proceed with payment and delivery. Thank you!`;
}

/**
 * Formats a general styling or product inquiry via WhatsApp
 */
export function generateProductInquiryMessage(product: Product): string {
  return `Hello ${storeConfig.brandName},

I'm interested in the "${product.name}" (${storeConfig.currency}${product.price}). Could you please share more details regarding fabric, sizing recommendations, and availability?

Product Link / ID: ${product.id}`;
}

/**
 * Formats a general boutique consultation message
 */
export function generateGeneralHelpMessage(): string {
  return `Hello ${storeConfig.brandName} Styling Team,\n\nI need some help choosing an outfit from your boutique collection. Could you please assist me?`;
}
