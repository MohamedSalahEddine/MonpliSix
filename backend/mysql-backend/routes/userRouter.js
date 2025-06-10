import express from "express"
import { db } from "../db.js"
import { register, login, getAllUsers, getSpittingUsers,  getUser } from "../controllers/userController.js"

const  userRouter = express.Router()

userRouter.get("/", getAllUsers)
userRouter.get("/spittingUsers/:id", getSpittingUsers)

userRouter.put('/markPaid/:userId/:itemId', async (req, res) => {
    try {
        const { userId, itemId } = req.params;
        // Update the date_paid for this user-item combination
        const result = await db.query(
            'UPDATE spitting_item_user SET date_paid = NOW() WHERE user_id = ? AND spitting_item_id = ?',
            [userId, itemId]
        );
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

userRouter.put('/markUnpaid/:userId/:itemId', async (req, res) => {
    try {
        const { userId, itemId } = req.params;
        // Set date_paid to NULL for this user-item combination
        const result = await db.query(
            'UPDATE spitting_item_user SET date_paid = NULL WHERE user_id = ? AND spitting_item_id = ?',
            [userId, itemId]
        );
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

userRouter.get("/:id", getUser)
userRouter.post("/", register)



export {userRouter}



// curl -X POST http://localhost:3001/users -H "Content-Type: application/json" -d '{"username":"messiiiazfoeoo","password":"leocom","invited_by
// ":"2"}'