import mongoose from 'mongoose';

const countdownSchema = mongoose.Schema({
    endTime: {
        type: Date,
        required: true
    }
});

const Countdown = mongoose.model('Countdown', countdownSchema);

export default Countdown;
