import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    paymentId: { type: String, required: true },
    signature: { type: String, required: true },
    amount: { type: Number, required: true },
    // currency: { type: String, required: true },
    status: { type: String, default: "Pending" }, // Success or Failed
    createdAt: { type: Date, default: Date.now }
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
