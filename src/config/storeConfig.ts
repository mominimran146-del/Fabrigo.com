/**
 * FABRIGO BOUTIQUE CONFIGURATION
 * 
 * You can update your boutique's phone number, Instagram handle,
 * email, physical address, and shipping terms in this single file.
 */

export const storeConfig = {
  // Brand identity
  brandName: 'FABRIGO',
  tagline: 'Everyday Elegance, Beautifully Crafted.',
  subTagline: 'Thoughtfully curated women’s fashion for modern Indian lifestyle',
  
  // WhatsApp Configuration (Enter with country code, e.g., 91 for India, no spaces or special symbols in rawNumber)
  whatsAppNumber: '919876543210',
  formattedWhatsAppNumber: '+91 98765 43210',
  
  // Social Links
  instagramUsername: 'fabrigoboutique',
  instagramURL: 'https://instagram.com/fabrigoboutique',
  facebookURL: 'https://facebook.com/fabrigoboutique',
  
  // Contact details
  email: 'hello@fabrigoboutique.com',
  supportEmail: 'orders@fabrigoboutique.com',
  phone: '+91 98765 43210',
  location: 'FABRIGO Studio, Linking Road, Bandra West, Mumbai, Maharashtra 400050',
  workingHours: 'Mon - Sat: 10:00 AM – 8:00 PM IST',

  // Currency & Commerce settings
  currency: '₹',
  currencyCode: 'INR',
  freeShippingThreshold: 999, // Free shipping on orders above ₹999
  standardShippingFee: 70,    // Standard shipping fee below threshold
  
  // Policies & Timelines
  deliveryTimeline: 'Delivery within 3–5 business days across India. Express delivery available on request via WhatsApp.',
  returnPolicy: 'Easy 7-day size exchange & boutique return assistance. Custom-tailored items are final sale.',
  
  // Size Chart Matrix (in Inches & CM)
  sizeChart: [
    { size: 'S', bustInch: '34-36', bustCm: '86-91', waistInch: '28-30', waistCm: '71-76', hipInch: '36-38', hipCm: '91-96' },
    { size: 'M', bustInch: '36-38', bustCm: '91-96', waistInch: '30-32', waistCm: '76-81', hipInch: '38-40', hipCm: '96-101' },
    { size: 'L', bustInch: '38-40', bustCm: '96-101', waistInch: '32-34', waistCm: '81-86', hipInch: '40-42', hipCm: '101-106' },
    { size: 'XL', bustInch: '40-42', bustCm: '101-106', waistInch: '34-36', waistCm: '86-91', hipInch: '42-44', hipCm: '106-111' },
    { size: 'XXL', bustInch: '42-44', bustCm: '106-111', waistInch: '36-38', waistCm: '91-96', hipInch: '44-46', hipCm: '111-116' },
  ],
};
