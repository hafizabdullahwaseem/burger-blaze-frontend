import { MenuItem } from '../types';

import classicBlazeImg from '../assets/images/menu_classic_blaze_1790445999748.jpg';
import ghostBurgerImg from '../assets/images/menu_ghost_burger_1790446011399.jpg';
import nashvilleChickenImg from '../assets/images/menu_nashville_chicken_1790446022903.jpg';
import loadedFriesImg from '../assets/images/menu_loaded_fries_1790446033592.jpg';
import smokyShakeImg from '../assets/images/menu_smoky_shake_1790446046885.jpg';
import heroBurgerImg from '../assets/images/hero_burger_blaze_1790445987916.jpg';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'classic-blaze',
    name: 'The Classic Blaze Smash',
    tagline: 'Double Black Angus • Charred Crust',
    description: 'Two seared smashed beef patties, melted 18-month Wisconsin cheddar, secret Blaze sauce, and crispy dill pickles on a butter-toasted brioche bun.',
    price: 14.99,
    category: 'burgers',
    image: classicBlazeImg,
    calories: 780,
    spiciness: 1,
    popular: true,
    badge: 'Chef Signature',
    ingredients: ['Prime Angus Beef', 'Sharp Aged Cheddar', 'House Blaze Sauce', 'Dill Pickles', 'Artisan Brioche']
  },
  {
    id: 'ghost-pepper-inferno',
    name: 'Ghost Pepper Inferno',
    tagline: 'Smoked Ghost Chili • Charred Jalapeño',
    description: 'Thick Angus beef patty infused with fire dust, habanero jack cheese, crispy fried shallots, charred serrano peppers, and smoked chipotle glaze.',
    price: 16.49,
    category: 'burgers',
    image: ghostBurgerImg,
    calories: 840,
    spiciness: 3,
    popular: true,
    badge: 'Extra Fiery',
    ingredients: ['Flame Angus Chuck', 'Ghost Pepper Jack', 'Charred Jalapeños', 'Crispy Shallot Straws', 'Habanero Honey Glaze']
  },
  {
    id: 'nashville-hot-chicken',
    name: 'Nashville Hot Blaze Chicken',
    tagline: '24hr Buttermilk Brined • Cayenne Crust',
    description: 'Jumbo tender chicken thigh fried ultra-crisp, bathed in Nashville cayenne oil, crowned with purple cider slaw and garlic herb pickles.',
    price: 13.99,
    category: 'chicken',
    image: nashvilleChickenImg,
    calories: 720,
    spiciness: 2,
    badge: 'Fan Favorite',
    ingredients: ['Buttermilk Fried Thigh', 'Nashville Chili Bath', 'Creamy Cider Slaw', 'Herb Pickles', 'Toasted Potato Roll']
  },
  {
    id: 'truffle-loaded-fries',
    name: 'Truffle Parmesan Loaded Fries',
    tagline: 'Hand-Cut Russet • Black Truffle Aioli',
    description: 'Double-fried crisp Idaho potatoes tossed in coarse sea salt, smothered in hot aged white cheddar fondue, shaved black truffle, and fresh chives.',
    price: 8.49,
    category: 'sides',
    image: loadedFriesImg,
    calories: 520,
    spiciness: 0,
    popular: true,
    ingredients: ['Idaho Russet Potatoes', 'Black Truffle Puree', 'Aged Cheddar Fondue', 'Parmigiano-Reggiano', 'Garden Chives']
  },
  {
    id: 'smoky-caramel-shake',
    name: 'Toasted Marshmallow Shake',
    tagline: 'Bourbon Smoked Caramel • Sweet Cream',
    description: 'Hand-spun Madagascar vanilla gelato whipped with bourbon sea salt caramel, topped with flame-torched marshmallows and pecan praline dust.',
    price: 7.99,
    category: 'drinks',
    image: smokyShakeImg,
    calories: 590,
    spiciness: 0,
    badge: 'Sweet Treat',
    ingredients: ['Vanilla Bean Gelato', 'Flame-Torched Mallows', 'Bourbon Caramel', 'Roasted Pecan Dust', 'Organic Whole Milk']
  },
  {
    id: 'blaze-bbq-ring-burger',
    name: 'Smoky Bacon BBQ Ring Burger',
    tagline: 'Thick Applewood Bacon • Crispy Onion Ring',
    description: 'Half-pound grilled prime brisket-blend burger, thick-cut applewood smoked bacon, giant crispy beer-battered onion ring, and dark honey BBQ glaze.',
    price: 15.99,
    category: 'burgers',
    image: heroBurgerImg,
    calories: 890,
    spiciness: 1,
    ingredients: ['Prime Brisket Blend', 'Applewood Smoked Bacon', 'Beer Battered Onion Ring', 'Dark Hickory BBQ', 'Toasted Sesame Bun']
  }
];

export const HERO_ASSET = heroBurgerImg;
