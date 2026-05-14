const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    userId: { //
        type: Schema.Types.ObjectId, 
        ref: "user", 
        required: true 
    }, 
    announcementId: { 
        type: Schema.Types.ObjectId, 
        ref: "announcement", 
        default: null,
        required: false 
    },
    stripeCustomerId: {
        type: String,
        required: true
    },
    stripeSubscriptionId: {
        type: String,
        required: true,
        unique: true
    },

    stripePriceId: {
        type: String,
        required: true
    },

    stripeProductId: {
        type: String,
        required: true
    },
    currentPeriodStart: Date,

    currentPeriodEnd: Date,

    cancelAtPeriodEnd: {
        type: Boolean,
        default: false
    },

    canceledAt: {
        type: Date,
        default: null
    },

    endedAt: {
        type: Date,
        default: null
    },

    trialStart: {
        type: Date,
        default: null
    },

    trialEnd: {
        type: Date,
        default: null
    },

    metadata: {
        type: Object,
        default: {}
    }

},{
    timestapms: true
});

module.exports = model('subscription', userSchema);