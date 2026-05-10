import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Log from './models/Log.js';

dotenv.config();
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected");

const logs = [];
for (let i = 0; i < 100; i++) {
      logs.push({
        level: ["INFO", "ERROR", "WARN", "DEBUG"][i % 4],
        message: `Test log ${i}`,
        source: ["dataservice", "store-application"][i % 2],
        storeId: `store-${i % 10}`,
        txnId: `txn-${i}`,
        transactionType: ["SALE", "REFUND"][i % 2],
        timestamp: new Date(Date.now() - i * 86400000), // 🔥 key part
      });
    }

    await Log.insertMany(logs);

    console.log("Seed data inserted");
    process.exit();
