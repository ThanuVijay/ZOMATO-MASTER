import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcryptjs";

const UserSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: [{ detail: { type: String }, for: { type: String } }],
    phoneNumber: [{ type: Number }],
},
    {
        timestamps: true,
    }
);

UserSchema.methods.generateJwtToken = function () {
    return jwt.sign({ user: this._id.toString() }, "ZomatoApp");
};

UserSchema.statics.findByEmailAndPhone = async ({ email, phoneNumber }) => {
    //check wether email, phone number exit or not 
    const checkUserByEmail = await UserModel.findOne({ email });
    const checkUserByPhone = await UserModel.findOne({ phoneNumber });

    if (checkUserByEmail || checkUserByPhone) {
        throw new Error("User already exists !")
    }
    return false;
};

UserSchema.statics.findByEmailAndPassword = async ({ email, password }) => {
    // check wether email exsits or not 
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("User does nor exist!!!");

    //compare password
    const doespasswordMatch = await bcrypt.compare(password, user.password)

    if (!doespasswordMatch) throw new Error("Invalid password!!!");

    return user;
};

UserSchema.pre("save", function (next) {
    const user = this;

    //pw is not modified
    if (!user.isModified("password")) return next();

    //generate salt
    bcrypt.genSalt(8, (error, salt) => {
        if (error) return next(error);

        //hash the pw
        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) return next(error);

            //assign hashed pw
            user.password = hash;
            return next();
        });
    });
});

export const UserModel = mongoose.model("Users", UserSchema);