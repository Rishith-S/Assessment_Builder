import mongoose, { Document } from "mongoose";
import { QuesitonType } from "./FIB_Schema";

export interface IMTF extends Document {
    question: QuesitonType[];
    leftOptions:QuesitonType[],
    rightOptions:QuesitonType[],
    answers: {
        leftAnswer: QuesitonType;
        rightAnswer: QuesitonType[];
    }[];
    time:string;
    tag?:string;
    type:string;
}

const mtfSchema = new mongoose.Schema<IMTF>({
    question: {
        type:[{
        contentType:{
            type:String,
            required:true
        },
        key:{
            type:String,
            required:true
        }
        }],
        default:[]
    },
    tag: {
        type: String,
        trim: true,
    },
    type: {
        type: String,
        required:true,
        trim: true,
    },
    time: { type: String,trim:true },
    leftOptions:{
        type:[{
        contentType:{
            type:String,
            required:true
        },
        key:{
            type:String,
            required:true
        }
        }],
        default:[]
    },
    rightOptions:{
        type:[{
        contentType:{
            type:String,
            required:true
        },
        key:{
            type:String,
            required:true
        }
        }],
        default:[]
    },
    answers: [
        {
            leftOption: {
                type:{
                contentType:{
                    type:String,
                    required:true
                },
                key:{
                    type:String,
                    required:true
                }
                },
            },
            rightOptions: {
                type:[{
                contentType:{
                    type:String,
                    required:true
                },
                key:{
                    type:String,
                    required:true
                }
                }],
                default:[]
            },
        },
    ],
});

const MTF = mongoose.model<IMTF>("MTF", mtfSchema);
export default MTF;
