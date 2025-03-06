const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios'); // To call Payment and Email services
const app = express();

app.use(express.json());

// Connect to MongoDB (Order DB)
mongoose.connect('mongodb://localhost:27017/orders', { useNewUrlParser: true, useUnifiedTopology: true });

// Order schema and model
const orderSchema = new mongoose.Schema({
  customerName: String,
  items: Array,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', orderSchema);

// Create an order and trigger payment & email
app.post('/orders', async (req, res) => {
  const { customerName, items } = req.body;
  const order = new Order({ customerName, items });

  try {
    await order.save();
    // Send a request to Payment Service for processing
    const paymentResponse = await axios.post('http://localhost:4000/payment', { orderId: order._id, amount: calculateAmount(items) });
    
    // Send a request to Email Service for sending confirmation
    await axios.post('http://localhost:5000/email', { orderId: order._id, customerEmail: req.body.customerEmail });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order' });
  }
});

// Helper function to calculate total amount
function calculateAmount(items) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

const port = 3000;
app.listen(port, () => {
  console.log(`Order service running on port ${port}`);
});

//For payment Service
const express = require('express');
const app = express();

app.use(express.json());

// Handle payment processing (simplified)
app.post('/payment', async (req, res) => {
  const { orderId, amount } = req.body;
  
  console.log(`Processing payment for Order ID: ${orderId} with amount: $${amount}`);

  // Here you would integrate a real payment gateway like Stripe, PayPal, etc.
  // For simplicity, we'll simulate success:
  res.status(200).json({ message: 'Payment processed successfully', orderId, amount });
});

const port = 4000;
app.listen(port, () => {
  console.log(`Payment service running on port ${port}`);
});

//For Email service
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

// Set up email transporter (for Gmail, you would need to configure your own credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

// Handle email sending
app.post('/email', async (req, res) => {
  const { orderId, customerEmail } = req.body;

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: customerEmail,
    subject: `Order Confirmation for Order ${orderId}`,
    text: `Your order with ID: ${orderId} has been successfully placed and is being processed.`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email' });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Email service running on port ${port}`);
});

