import userModel from "../models/userModel.js";

// Add items to user cart 
const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        // Validate input
        if (!userId || !itemId) {
            return res.json({ success: false, message: "User ID and Item ID are required" });
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData || {};

        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added to cart", cart: cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding to cart" });
    }
};

// Remove items from user cart 
const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        // Validate input
        if (!userId || !itemId) {
            return res.json({ success: false, message: "User ID and Item ID are required" });
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData || {};

        if (cartData[itemId]) {
            if (cartData[itemId] === 1) {
                delete cartData[itemId];
            } else {
                cartData[itemId] -= 1;
            }

            await userModel.findByIdAndUpdate(userId, { cartData });
            res.json({ success: true, message: "Removed from cart", cart: cartData });
        } else {
            res.json({ success: false, message: "Item not found in cart" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing from cart" });
    }
};

// Fetch user cart data
const getCart = async (req, res) => {
    try {
        const { userId } = req.body;

        // Validate input
        if (!userId) {
            return res.json({ success: false, message: "User ID is required" });
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData || {};
        res.json({ success: true, cart: cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching cart data" });
    }
};

export { addToCart, removeFromCart, getCart };
