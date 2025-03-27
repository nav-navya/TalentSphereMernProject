import express from "express"
import crypto from "crypto";
import Payment from "../../models/paymentModel.js";
const router = express.Router();

router.post("/verify", async (req, res) => {
    try {
        const { orderId, paymentId, signature, 
          amount, 
          // currency 
        } = req.body;

        const secret = process.env.RAZORPAY_KEY_SECRET;
        const generatedSignature = crypto
            .createHmac("sha256", secret)
            .update(orderId + "|" + paymentId)
            .digest("hex");

        if (generatedSignature === signature) {
            // ✅ Payment is verified, save details in the database
            const payment = new Payment({
                orderId,
                paymentId,
                signature,
                amount,
                // currency,
                status: "Success"
            });
            await payment.save();

            return res.status(200).json({ success: true, message: "Payment verified and stored" });
        } else {
            // ❌ Signature mismatch (possible fraud)
            return res.status(400).json({ success: false, message: "Invalid payment signature" });
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/getPayments', async (req,res) =>{
  try{
    const paymentdetails = await Payment.find()
    res.status(200).json(paymentdetails)
    

  }catch(error){
    res.status(500).json({msg:"error occured"})
  }
})
export default router;


