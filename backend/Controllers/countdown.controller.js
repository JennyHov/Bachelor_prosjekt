import Countdown from '../models/countdown.model.js';

// lage en nedtelling
export const setCountdown = async (req, res) => {
    try {
        const { endTime } = req.body;
        let countdown = await Countdown.findOne({});
        if (countdown) {
            countdown.endTime = endTime;
            await countdown.save();
        } else {
            countdown = await Countdown.create({ endTime });
        }
        res.status(200).json(countdown);
    } catch (error) {
        res.status(500).json({ message: "Failed to set countdown", error });
    }
};

// hente nedtellingen
export const getCountdown = async (req, res) => {
    try {
        const countdown = await Countdown.findOne({});
        res.status(200).json(countdown);
    } catch (error) {
        res.status(500).json({ message: "Failed to get countdown", error });
    }
};
