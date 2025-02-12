const promocodeSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    discountType: { type: String, required: true, enum: ["percentage", "fixed"]},
    

})