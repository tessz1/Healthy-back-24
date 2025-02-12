const promocodeSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    discountType: { type: String, required: true, enum: ["percentage", "fixed"]},
    discountValue: { type: Number, required: true },
    validForm: { type: Number, required: true },
    validUntil: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    maxUses: { type: Number, default: null },
    usedCount: { type: Number, default: 0 },

})

const Promocode = mongoose.model('Promocode', promocodeSchema);