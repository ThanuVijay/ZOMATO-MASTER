import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
   menus:[{ name:{type: String, required:true},items:[{type: mongoose.Types.ObjectId, ref:"Foods"}] }],
   recomended:[{type:mongoose.Types.ObjectId, ref:"Foods",unique: true}],
});

export const MenuModel = mongoose.modal("Menu",MenuSchema);