import Log from '../models/Log.js';

export const getLogs = async (req, res) => {
  try {
    const filter = {};

    // date filter
    if (req.query.startDate || req.query.endDate) {
      filter.timestamp = {};

      if (req.query.startDate) {
        filter.timestamp.$gte = new Date(req.query.startDate);
      }

      if (req.query.endDate) {
        filter.timestamp.$lte = new Date(req.query.endDate);
      }
    }

    // other filters
    if (req.query.level && req.query.level !== "ALL")
      filter.level = req.query.level;

    if (req.query.source && req.query.source !== "ALL")
      filter.source = req.query.source;

    if (req.query.txnId) filter.txnId = req.query.txnId;

    if (req.query.storeId) filter.storeId = req.query.storeId;

    if (
      req.query.transactionType &&
      req.query.transactionType !== "ALL"
    )
      filter.transactionType = req.query.transactionType;

    if (req.query.keyword) {
      filter.message = {
        $regex: req.query.keyword,
        $options: "i",
      };
    }

    const logs = await Log.find(filter)
      .sort({ timestamp: -1 })
      .limit(100);

    res.json(logs);
  } catch (err) {
    console.error("BACKEND ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getStats = async (req, res) => {
  try {
    const match = {};

    if (req.query.startDate || req.query.endDate) {
      match.timestamp = {};

      if (req.query.startDate)
        match.timestamp.$gte = new Date(req.query.startDate);

      if (req.query.endDate)
        match.timestamp.$lte = new Date(req.query.endDate);
    }
let format= '%Y-%m-%d %H:00';
if(req.query.groupBy==='hour'){
  format ="%Y-%m-%d %H:00";
}
if(req.query.groupBy==='week')
{
  format="%Y-%U";
}    const stats = await Log.aggregate([
      { $match: match },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d %H:00",
              date: "$timestamp",
              timezone: "Asia/Kolkata"
            },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
export const createLog = async (req, res) => {
    try {
        const logs = await Log.create(req.body)
        res.json(logs);
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}
export const getSpecificLog = async (req, res) => {
    try {
        const logs = await Log.find({
            txnId: req.params.txnId
        });
        res.json(logs);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}
