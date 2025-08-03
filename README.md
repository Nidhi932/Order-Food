# 🍕 Food Delivery App with Cart Functionality

A modern React-based food delivery application with a beautiful cart system and enhanced search functionality.

## ✨ Features

### 🛒 Cart System

- **Add to Cart**: Click "Add to Cart" buttons on menu items to add them to your cart
- **Cart Management**:
  - View cart items with images, names, and prices
  - Adjust quantities using +/- buttons
  - Remove items from cart
  - Clear entire cart
- **Real-time Updates**: Cart count and total price update instantly
- **Beautiful UI**: Modern, responsive cart interface with smooth animations

### 🔍 Enhanced Search

- **Beautiful Search Box**: Modern design with gradient styling and hover effects
- **Real-time Search**: Search restaurants by name
- **Responsive Design**: Works perfectly on mobile and desktop

### 🎨 UI/UX Improvements

- **Modern Design**: Clean, professional interface with gradients and shadows
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Responsive Layout**: Optimized for all screen sizes
- **Notification System**: Success notifications when items are added to cart

## 🚀 Getting Started

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Start Development Server**:

   ```bash
   npm start
   ```

3. **Open Browser**: Navigate to `http://localhost:1234`

## 📁 Project Structure

```
src/
├── components/
│   ├── Cart.js              # Cart component with full functionality
│   ├── Cart.css             # Cart styling
│   ├── Header.js            # Header with cart badge
│   ├── RestaurantsMenu.js   # Menu with add to cart buttons
│   ├── RestaurantsMenu.css  # Menu styling
│   ├── Notification.js      # Notification component
│   ├── Notification.css     # Notification styling
│   └── ...                  # Other existing components
├── context/
│   └── CartContext.js       # Global cart state management
└── utils/
    └── constants.js         # App constants
```

## 🛠️ Technologies Used

- **React 19.1.0** - Modern React with hooks
- **React Router 6.22.3** - Client-side routing
- **Context API** - Global state management for cart
- **CSS3** - Modern styling with gradients and animations
- **Parcel** - Fast bundler and development server

## 🎯 Key Features Implementation

### Cart Context

- Global state management using React Context and useReducer
- Handles add, remove, update quantity, and clear cart operations
- Provides cart count and total calculations

### Cart Component

- Fixed position overlay with smooth slide-in animation
- Item list with quantity controls
- Price summary with delivery fee
- Empty cart state with helpful messaging

### Enhanced Search

- Modern input field with search icon
- Focus states and hover effects
- Responsive design for mobile devices

### Restaurant Menu

- Beautiful menu items with images and descriptions
- Add to cart buttons with hover effects
- Success notifications on item addition

## 📄 License

This project is licensed under the ISC License.
