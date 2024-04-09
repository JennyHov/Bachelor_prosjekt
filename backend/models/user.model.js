import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        default: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?w=826&t=st=1710440292~exp=1710440892~hmac=7c8d33035de378572ca3a1d9f73a42e887ea2a14635a45899ed2b93c53823406",
    },
    role: {
        type: String,
        default: "user", // Standardverdi er "user"
        enum: ["user", "admin"] // Tillatte verdier
    },
}, {timestamps: true}
);

const User = mongoose.model("User", userSchema);

export default User;