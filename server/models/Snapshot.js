const { Schema, model } = require('mongoose');

const snapshotSchema = new Schema({
    userId: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    endDate: {
        type: Date,
        required: true,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    electricityFootprint: {
        type: Number,
    },
    naturalGasFootprint: {
        type: Number,
    },
    gasolineFootprint: {
        type: Number,
    },
    foodFootprint: {
        type: Number,
    },
});

const Snapshot = model('Snapshot', snapshotSchema);

module.exports = Snapshot;
