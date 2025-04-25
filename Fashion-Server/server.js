// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const path = require('path');
// const app = express();
// const PORT = 5500;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // In-memory "database" (replace with MongoDB later)
// let products = [
//     { id: 1, name: "Summer Floral Dress", price: 29.99, image: "dress.jpg" },
//     { id: 2, name: "Classic Denim Jacket", price: 49.99, image: "jacket.jpg" },
//     { id: 3, name: "Casual Sneakers", price: 39.99, image: "sneakers.jpg" },
//     { id: 4, name: "High-Waisted Pants", price: 34.99, image: "pants.jpg" },
// ];

// // Routes

// // 1. Get all products
// app.get('/api/products', (req, res) => {
//     res.json(products);
// });

// // 2. Add a product to the cart
// let cart = [];
// app.post('/api/cart', (req, res) => {
//     const { productId } = req.body;
//     const product = products.find(p => p.id === productId);
//     if (product) {
//         cart.push(product);
//         res.status(200).json({ message: "Product added to cart", cart });
//     } else {
//         res.status(404).json({ message: "Product not found" });
//     }
// });

// // 3. View cart
// app.get('/api/cart', (req, res) => {
//     res.json(cart);
// });

// // 4. Remove product from cart
// app.delete('/api/cart/:id', (req, res) => {
//     const productId = parseInt(req.params.id);
//     cart = cart.filter(p => p.id !== productId);
//     res.json({ message: "Product removed from cart", cart });
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log('Server running on http://localhost:3000');
// });


// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');

// const shopRoutes = require('./routes/shopRoutes');
// const userRoutes = require('./routes/userRoutes');

// const app = express();
// const PORT = 5500;

// // Middleware
// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/fashion-store', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

// // Routes
// app.use('/api/shop', shopRoutes);
// app.use('/api/user', userRoutes);

// // Default Route
// app.get('/', (req, res) => res.send('Welcome to the Fashion Store Backend'));

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const shopRoutes = require('./routes/shopRoutes'); // Make sure these exist
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 5500;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // For serving static files

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/fashion-store', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// In-memory "database"
let products = [
  { id: 1, name: "Summer Floral Dress", price: 29.99, image: "dress.jpg" },
  { id: 2, name: "Classic Denim Jacket", price: 49.99, image: "jacket.jpg" },
  { id: 3, name: "Casual Sneakers", price: 39.99, image: "sneakers.jpg" },
  { id: 4, name: "High-Waisted Pants", price: 34.99, image: "pants.jpg" },
];

// Cart storage
let cart = [];

// API Routes
app.get('/api/products', (req, res) => res.json(products));

app.post('/api/cart', (req, res) => {
  const { productId } = req.body;
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    res.status(200).json({ message: "Product added to cart", cart });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.get('/api/cart', (req, res) => res.json(cart));

app.delete('/api/cart/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  cart = cart.filter(p => p.id !== productId);
  res.json({ message: "Product removed from cart", cart });
});

// External routes
app.use('/api/shop', shopRoutes);
app.use('/api/user', userRoutes);

// Home route
app.get('/', (req, res) => res.send('Welcome to the Fashion Store Backend'));

// Start server
app.listen(PORT, () => console.log('Server running at http://localhost:${PORT}'));