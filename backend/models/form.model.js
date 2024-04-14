import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
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
    },
    criteriaCheck3: {
        type: Boolean
    }
}, {timestamps: true}
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;