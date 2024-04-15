import mongoose from "mongoose";

const counselingSchema = mongoose.Schema ({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    institution: {
        type: String,
        required: true
    },
    projectName: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: true
    },
    criteriaCheck1: {
        type: Boolean
    },
    criteriaCheck2: {
        type: Boolean
    }
}, {timestamps: true}
);

const Counseling = mongoose.model("Counseling", counselingSchema);

export default Counseling;