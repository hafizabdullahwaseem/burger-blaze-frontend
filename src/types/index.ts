export interface MenuItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category: 'all' | 'burgers' | 'chicken' | 'sides' | 'drinks';
  image: string;
  calories: number;
  spiciness: 0 | 1 | 2 | 3;
  popular?: boolean;
  badge?: string;
  ingredients: string[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  avatar: string;
  rating: number;
  comment: string;
  favoriteItem: string;
  date: string;
}

export interface BurgerLayerInfo {
  id: string;
  name: string;
  category: string;
  description: string;
  yOffset: number; // exploded position
  color: string;
  calories: string;
  origin: string;
}
