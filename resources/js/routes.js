import home from './components/HomeComponent';
import restaurant from './components/RestaurantComponent';
import cart from './components/CartComponent';

const routes = [
    {
        path: '/',
        component: home,
        name: 'home'
    },
    {
        path: '/restaurant/:id',
        component: restaurant,
        name: 'restaurant'
    },
    {
        path: '/cart',
        component: cart,
        name: 'cart'
    }
];

export default routes;