import sareesImg from '../assets/collection-sarees.jpg';
import kurtisImg from '../assets/collection-kurtis.jpg';
import westernImg from '../assets/collection-western.jpg';
import accessoriesImg from '../assets/collection-accessories.jpg';
import ethnicImg from '../assets/collection-ethnic.jpg';
import newArrivalsImg from '../assets/collection-newarrivals.jpg';

export const collectionsData = [
  {
    id: 'sarees',
    name: 'SAREES',
    subtitle: 'Traditional & Designer',
    image: sareesImg,
    badge: 'Popular',
    price: 6850,
    originalPrice: 8500,
    rating: 4.9,
    reviewsCount: 128,
    description: 'Exquisite traditional and designer silk sarees with rich golden zari borders and intricate floral weaves. Perfect for weddings, festivals, and cultural celebrations.',
    features: ['Pure Art Silk & Banarasi Weave', 'Rich Golden Zari Border', 'Comes with Matching Blouse Piece', 'Dry Clean Recommended'],
    availableSizes: ['Free Size (6.3m with Blouse)'],
    colors: ['#D81B60', '#C2185B', '#880E4F', '#D4AF37'],
    stock: 12,
  },
  {
    id: 'kurtis',
    name: 'KURTIS',
    subtitle: 'Daily & Party Wear',
    image: kurtisImg,
    badge: 'Bestseller',
    price: 3450,
    originalPrice: 4200,
    rating: 4.8,
    reviewsCount: 215,
    description: 'Vibrant hot pink embroidered straight-cut kurti set with delicate gold resham threadwork, tailored for chic daily wear and elegant party occasions.',
    features: ['Premium Chanderi Silk Blend', 'Intricate Zari Neckline Work', 'Breathable & Lightweight', 'Includes Matching Pants & Dupatta'],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#E91E63', '#9C27B0', '#0B192C', '#F48FB1'],
    stock: 24,
  },
  {
    id: 'western-wear',
    name: 'WESTERN WEAR',
    subtitle: 'Modern Fashion',
    image: westernImg,
    badge: 'Trending',
    price: 5200,
    originalPrice: 6500,
    rating: 4.9,
    reviewsCount: 94,
    description: 'High-fashion double-breasted pastel pink tailored blazer suit. Contemporary modern silhouette with gold crest buttons and slim-fit trousers.',
    features: ['Structured Tailored Fit', 'Embossed Gold Tone Buttons', 'Premium Poly-Viscose Fabric', 'Fully Lined Interior'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#F8BBD0', '#FFFFFF', '#0B192C', '#374151'],
    stock: 15,
  },
  {
    id: 'accessories',
    name: 'ACCESSORIES',
    subtitle: 'Bags & Jewelry',
    image: accessoriesImg,
    badge: 'Luxury',
    price: 4800,
    originalPrice: 5900,
    rating: 5.0,
    reviewsCount: 86,
    description: 'Luxury structured hot pink caviar leather handbag paired with a sparkling pink Austrian crystal drop necklace and earring jewelry set.',
    features: ['Genuine Textured Vegan Leather', 'Gold Chain Crossbody Strap', 'Austrian Crystal Drop Stones', 'Hypoallergenic Plating'],
    availableSizes: ['One Size (Handbag + Set)'],
    colors: ['#E91E63', '#D4AF37', '#000000', '#FCE4EC'],
    stock: 9,
  },
  {
    id: 'ethnic-sets',
    name: 'ETHNIC SETS',
    subtitle: 'Premium Collections',
    image: ethnicImg,
    badge: 'Exclusive',
    price: 7950,
    originalPrice: 9800,
    rating: 4.9,
    reviewsCount: 164,
    description: 'Royal midnight navy blue festive ethnic suit with heavy gold antique zari hand embroidery along the daman, neckline, and dupatta hem.',
    features: ['Royal Navy Raw Silk & Georgette', 'Heavy Antique Zari Embroidery', 'Embroidered Tassel Dupatta', 'Custom Tailoring Available'],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#0B192C', '#1E3A8A', '#880E4F', '#064E3B'],
    stock: 18,
  },
  {
    id: 'new-arrivals',
    name: 'NEW ARRIVALS',
    subtitle: 'Latest Trends',
    image: newArrivalsImg,
    badge: 'New Season',
    price: 4950,
    originalPrice: 6200,
    rating: 4.9,
    reviewsCount: 72,
    description: 'Soft pastel peach-pink floral embroidered Anarkali suit with delicate tonal embroidery, organza dupatta, and matching cigarette pants.',
    features: ['Pastel Peach Pure Chanderi', 'Delicate Hand Floral Motifs', 'Sheer Organza Border Dupatta', 'Comfortable All-Day Fit'],
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#FFD1DC', '#FCE4EC', '#FFF0F5', '#FAD02C'],
    stock: 20,
  }
];

export const customerReviews = [
  {
    id: 1,
    rating: 5,
    quote: 'Beautiful collection and excellent service!',
    author: 'Sushma Thapa',
    location: 'Baneshwor, Kathmandu',
    date: '3 days ago'
  },
  {
    id: 2,
    rating: 5,
    quote: "Best ladies' fashion store in Kathmandu.",
    author: 'Anjali Karki',
    location: 'Lazimpat, Kathmandu',
    date: '1 week ago'
  },
  {
    id: 3,
    rating: 5,
    quote: 'Affordable prices and premium quality.',
    author: 'Prerana Shrestha',
    location: 'Patan, Lalitpur',
    date: '2 weeks ago'
  }
];

export const storeInfo = {
  phone: '+977 9808997824',
  whatsapp: '+977 9808997824',
  email: 'info@nepalfashionktm.com',
  address: 'Kathmandu, Nepal',
  operatingHours: 'Sun - Fri: 10:00 AM - 8:00 PM (Saturday: 11:00 AM - 7:00 PM)'
};
