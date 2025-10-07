# 🛒 E-Commerce Angular Application

A modern, responsive e-commerce web application built with Angular 20 and TypeScript. This application provides a complete online shopping experience with features like product browsing, cart management, wishlist functionality, user authentication, and internationalization support.

##  Features

###  Core E-Commerce Features
- **Flash Sales**: Time-limited sales with countdown timer
- **Shopping Cart**: Add, remove, and manage products with quantity controls
- **Wishlist**: Save favorite products for later purchase
- **Product Search**: Find products with search functionality
- **Product Details**: Comprehensive product information with image gallery
- **Responsive Design**: Mobile-first design that works on all devices

###  User Management
- **User Registration**: Create new user accounts
- **User Authentication**: Secure login/logout functionality
- **User Profiles**: Manage account information
- **Protected Routes**: Authentication guards for secure pages
- **Session Management**: Persistent login state with localStorage

###  Additional Features
- **Internationalization (i18n)**: Multi-language support (English, Bengali)
- **Local Storage**: Client-side data persistence
- **IndexedDB Integration**: Advanced local data storage
- **Loading States**: Skeleton loaders for better UX
- **Error Handling**: Comprehensive error pages and validation
- **SEO Friendly**: Proper routing and meta tags

##  Tech Stack

### Frontend Framework
- **Angular 20.1.0** - Latest Angular framework
- **TypeScript 5.8.2** - Type-safe JavaScript
- **SCSS** - Advanced CSS preprocessing
- **RxJS 7.8.0** - Reactive programming with observables

### Angular Features Used
- **Standalone Components** - Modern component architecture
- **Angular Signals** - Reactive state management
- **Angular Router** - Client-side routing
- **Angular Forms** - Reactive and template-driven forms
- **Angular HTTP Client** - API communication
- **Dependency Injection** - Service management

### Libraries & Tools
- **@ngx-translate/core** - Internationalization
- **ngx-skeleton-loader** - Loading animations
- **IndexedDB (idb)** - Client-side database
- **Angular CLI** - Development tooling
- **Karma & Jasmine** - Testing framework

##  Project Structure

```
src/
├── app/
│   ├── directives/          # Reusable directives
│   │   ├── add-to-cart.ts          # Add to cart functionality
│   │   ├── add-to-wishlist.ts      # Add to wishlist functionality
│   │   └── protected-click.ts      # Authentication protection
│   ├── layout/              # Layout components
│   │   └── home/
│   │       ├── banner/             # Hero banner section
│   │       ├── categories/         # Product categories
│   │       ├── flash-sales/        # Flash sales with countdown
│   │       ├── explore-product/    # Product exploration
│   │       ├── new-arrival/        # New product arrivals
│   │       └── top-rated-products/ # Featured products
│   ├── navbar/              # Navigation components
│   │   ├── header/                 # Main navigation
│   │   └── header2/                # Secondary navigation
│   ├── pages/               # Application pages
│   │   ├── about/                  # About page
│   │   ├── account/                # User account management
│   │   ├── billing-details/        # Checkout billing
│   │   ├── cart/                   # Shopping cart
│   │   ├── contact/                # Contact page
│   │   ├── error/                  # Error pages
│   │   ├── login/                  # User login
│   │   ├── product-details/        # Product detail view
│   │   ├── registration/           # User registration
│   │   └── wishlist/               # User wishlist
│   ├── services/            # Business logic services
│   │   ├── api.ts                  # API communication
│   │   ├── auth.service.ts         # Authentication service
│   │   ├── auth.guard.ts           # Route protection
│   │   ├── cart.ts                 # Shopping cart service
│   │   ├── indexeddb.service.ts    # Local database service
│   │   └── wishlist.service.ts     # Wishlist management
│   ├── footer/              # Footer component
│   ├── toparrow/            # Scroll to top functionality
│   ├── app.config.ts        # Application configuration
│   ├── app.routes.ts        # Routing configuration
│   └── app.ts               # Root component
├── assets/
│   ├── i18n/                # Translation files
│   │   ├── en.json                 # English translations
│   │   └── bn.json                 # Bengali translations
│   ├── icons/               # Application icons
│   └── images/              # Static images
└── styles.scss              # Global styles
```

##  Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Angular CLI** (v20 or higher)

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/Emtiaz01/ecommerce-app.git
cd ecommerce-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Install Angular CLI globally (if not already installed)**
```bash
npm install -g @angular/cli
```

4. **Start the development server**
```bash
npm start
# or
ng serve
```

5. **Open your browser**
Navigate to `http://localhost:4200`

##  Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server on port 4200 |
| `npm run build` | Build the project for production |
| `npm run watch` | Build in watch mode for development |
| `npm test` | Run unit tests with Karma |
| `ng serve` | Start Angular development server |
| `ng build` | Build the application |
| `ng test` | Execute unit tests |
| `ng lint` | Run linting checks |

##  Configuration

### Environment Setup
The application uses Angular's environment configuration. Update environment files for different deployment targets.

### API Configuration
The application connects to DummyJSON API for product data:
- **Base URL**: `https://dummyjson.com`
- **Endpoints**: Products, Categories, Authentication, Users

### Translation Setup
Add new languages by creating JSON files in `src/assets/i18n/`:
```json
{
  "Today's": "আজকের",
  "Flash Sales": "ফ্ল্যাশ সেল",
  "Hours": "ঘন্টা",
}
```

##  Key Components

###  Home Layout Components
- **Banner**: Hero section with promotional content
- **Categories**: Product category navigation
- **Flash Sales**: Time-limited offers with countdown timer
- **New Arrivals**: Latest product additions
- **Top Rated**: Highly-rated products showcase

###  E-Commerce Components
- **Product Details**: Comprehensive product information
- **Shopping Cart**: Cart management with quantity controls
- **Wishlist**: Favorite products management
- **Billing Details**: Checkout and payment forms
- **User Account**: Profile and order management

###  Authentication Components
- **Login**: User authentication
- **Registration**: New user signup
- **Auth Guard**: Route protection
- **Profile Management**: User account settings

##  Responsive Design

The application is built with mobile-first approach:
- **Desktop**: Full-featured layout with sidebars and carousels
- **Tablet**: Optimized layout for medium screens
- **Mobile**: Touch-friendly interface with collapsible menus

### Breakpoints
- **Large screens**: 1024px and up
- **Medium screens**: 768px - 1023px
- **Small screens**: 425px - 767px
- **Extra small**: Below 425px

##  State Management

### Angular Signals
Modern reactive state management using Angular Signals:

```typescript
// Service example
export class CartService {
  cartItems = signal<CartItem[]>([]);
  cartCount = computed(() => this.cartItems().length);
  total = computed(() => this.calculateTotal());
}

// Component usage
export class CartComponent {
  cartService = inject(CartService);
  
  get itemCount() {
    return this.cartService.cartCount(); // Reactive
  }
}
```

### Local Storage
- **Cart data**: Persisted across sessions
- **Wishlist**: Saved user preferences
- **Authentication**: User session management
- **Language preference**: Internationalization settings

##  API Integration

### DummyJSON API Endpoints
| Endpoint | Purpose |
|----------|---------|
| `/products` | Get all products |
| `/products/{id}` | Get product by ID |
| `/products/categories` | Get product categories |
| `/products/category/{category}` | Get products by category |
| `/products/search?q={query}` | Search products |
| `/auth/login` | User authentication |
| `/users/add` | User registration |

### Service Architecture
```typescript
@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'https://dummyjson.com';
  
  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`);
  }
  
  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/${id}`);
  }
}
```

##  Testing

### Unit Tests
Run unit tests with Karma and Jasmine:
```bash
npm test
```

### Test Coverage
- **Components**: UI component testing
- **Services**: Business logic testing
- **Directives**: Custom directive testing
- **Guards**: Authentication guard testing

##  Deployment

### Production Build
```bash
npm run build
```

### Build Optimization
- **Tree shaking**: Removes unused code
- **Minification**: Compressed JavaScript and CSS
- **Lazy loading**: Route-based code splitting
- **AOT compilation**: Ahead-of-time compilation

### Deployment Targets
- **Static hosting**: Netlify, Vercel, GitHub Pages
- **Cloud platforms**: AWS S3, Google Cloud, Azure
- **Traditional servers**: Apache, Nginx

##  Security Features

### Authentication & Authorization
- **JWT-based authentication**: Secure user sessions
- **Route guards**: Protected page access
- **Input validation**: Form data sanitization
- **XSS protection**: Content security policies

### Data Protection
- **Local storage encryption**: Sensitive data protection
- **API security**: Secure HTTP communication
- **Input sanitization**: Prevent injection attacks

##  Internationalization (i18n)

### Supported Languages
- **English (en)**: Default language
- **Bengali (bn)**: Additional language support

### Adding New Languages
1. Create translation file: `src/assets/i18n/{language}.json`
2. Add translations for all keys
3. Update language selector in header component

### Usage Example
```html
<h1>{{ 'WELCOME_MESSAGE' | translate }}</h1>
<p>{{ 'PRODUCT_COUNT' | translate: {count: productCount} }}</p>
```

##  Performance Optimizations

### Angular Optimizations
- **OnPush change detection**: Reduced change detection cycles
- **Lazy loading**: Route-based code splitting
- **Standalone components**: Reduced bundle size
- **Tree shaking**: Automatic dead code elimination

### Loading Optimizations
- **Skeleton loaders**: Better perceived performance
- **Image lazy loading**: Improved initial load time
- **Service workers**: Ready for PWA implementation

##  Contributing

### Development Guidelines
1. **Code style**: Follow Angular style guide
2. **Testing**: Write unit tests for new features
3. **Documentation**: Update README for significant changes
4. **TypeScript**: Use strict type checking

### Pull Request Process
1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push branch: `git push origin feature/new-feature`
5. Create Pull Request

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Authors

- **Emtiaz01** - *Initial work* - [GitHub Profile](https://github.com/Emtiaz01)

##  Acknowledgments

- **Angular Team** - For the excellent framework
- **DummyJSON** - For providing free API endpoints
- **Community Contributors** - For various open-source libraries used

##  Support

For support and questions:
- **Issues**: [GitHub Issues](https://github.com/Emtiaz01/ecommerce-app/issues)
- **Email**: Contact the developer through GitHub
- **Documentation**: [Angular Docs](https://angular.io/docs)

---

**Built with using Angular 20**
