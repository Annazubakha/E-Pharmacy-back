import { User } from "../models/user.js";
import { Product } from "../models/product.js";
import { Order } from "../models/order.js";

export const getAllCart = async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await User.findById(_id).populate("cart.productId");
    if (!user) return res.status(404).json({ message: "User not found" });

    const formattedProduct = user.cart.map((item) => ({
      _id: item._id,
      productId: item.productId._id,
      photo: item.productId.photo,
      name: item.productId.name,
      suppliers: item.productId.suppliers,
      stock: item.productId.stock,
      price: item.productId.price,
      quantity: item.quantity,
    }));

    res.status(200).json(formattedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const existingProductIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingProductIndex >= 0) {
      if (quantity > 0) {
        user.cart[existingProductIndex].quantity = quantity;
      } else {
        user.cart.splice(existingProductIndex, 1);
      }
    } else {
      if (quantity > 0) {
        user.cart.push({
          productId: product._id,
          photo: product.photo,
          name: product.name,
          suppliers: product.suppliers,
          stock: product.stock,
          price: product.price,
          quantity,
        });
      }
    }

    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkOut = async (req, res) => {
  const { name, email, phone, address, paymentMethod, totalAmount } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.cart.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    const orderProducts = await Promise.all(
      user.cart.map(async (item) => {
        const product = await Product.findById(item.productId);
        return {
          productId: product._id,
          photo: product.photo,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          totalPrice,
        };
      })
    );
    const validOrderProducts = orderProducts.filter((item) => item !== null);

    const order = new Order({
      userId,
      name,
      email,
      phone,
      address,
      paymentMethod,
      products: validOrderProducts,
      totalAmount: parseFloat(totalAmount).toFixed(2),
    });

    await order.save();
    user.cart = [];
    await user.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
