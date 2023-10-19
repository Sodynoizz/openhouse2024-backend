import { Schema, model } from "mongoose";

const lessonplanSchema = new Schema({
    id: {
        type: Number,
        require: true,
        unique: true,
    },
    name: {
        type: String,
        require: true,
        unique: false,
    },
    status: {
        type: String,
        default: "ยังไม่มีการแก้ไข",
        require: true,
        unique: false,
    },
    members: {
        type: Number,
        default: 0,
        require: true,
        unique: false,
    },
    ig: {
        type: String,
        default: "-",
        require: true,
        unique: false
    },
    facebook: {
        type: String,
        default: "-",
        require: true,
        unique: false
    },
    others: {
        type: String,
        default: "-",
        require: true,
        unique: false,
    },
    admission: {
        type: String,
        default: "",
        require: true,
        unique: false,
    },
    subjects: {
        type: String,
        default: "",
        require: false,
        unique: false,
    },
    interests: {
        type: String,
        default: "",
        require: false,
        unique: false,
    },
    counts: {
        type: Number,
        default: 3,
        require: false,
        unique: false,
    },
    review_1: {
        type: Object,
        require: false,
        unique: false,
    },
    review_2: {
        type: Object,
        require: false,
        unique: false,
    },
    review_3: {
        type: Object,
        require: false,
        unique: false,
    }
});

const lessonplanModel = model("Lesson-Plans", lessonplanSchema);
export default lessonplanModel;