
import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
timestamp:{type:Date, required:true, default:Date.now},
level:{type:String, enum:['INFO', 'WARN', 'ERROR', 'DEBUG','CRITICAL'],required:true},
source:{type:String, required:true},
thread:{type:String, required:false},
txnId:{type:String, required:true},
message:{type:String, required:true},
storeId:{type:String, required:false},
transactionType:{type:String, enum:['SALE','REFUND','VOID','CARD_LOAD','CARD_LOOKUP']}
})

export default mongoose.model('Log', logSchema)