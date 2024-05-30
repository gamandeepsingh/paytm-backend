const mongoose = require("mongoose");
const { Account } = require("../modals/user");


const getBalance = async (req, res) => {
    try {
        const account = await Account.findOne({
            userId: req.userId
        });

        if(!account){
            return res.status(404).json({
                message: "Account not found"
            });
        }
    
        return res.json({
            balance: account
        })
    } catch (error) {
        return res.status(400).json({
            message: "Invalid request"
        });
    }
}

const transferBalance = async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;
    if(amount===0){
        return res.status(400).json({
            message: "Invalid amount"
        });
    }

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
}

module.exports = {
    getBalance,
    transferBalance
}