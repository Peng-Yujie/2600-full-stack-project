(() => {
  const MongoClient = require("mongodb").MongoClient;
  const connection = require("./config/config");
  const Log = require("./log");
  //-------------------------------------------------------------------------
  let mongoClient = undefined;

  const getMongoClient = (local = false) => {
    let uri = `mongodb+srv://${connection.USERNAME}:${connection.PASSWORD}@${connection.SERVER}/${connection.DATABASE}`;
    if (local) {
      uri = `mongodb://127.0.0.1:27017/${connection.DATABASE}`;
    }
    console.log(
      `Connection String<<${uri.replace(/:([^:@]{1,})@/, ":****@")}>>`
    );
    if (!mongoClient) {
      mongoClient = new MongoClient(uri);
    }
    return mongoClient;
  };

  // Connect to the database
  const connectDB = async () => {
    try {
      if (!mongoClient) {
        mongoClient = getMongoClient();
        await mongoClient.connect();
      }
      console.log(
        "\t|Connected successfully to MongoDB!",
        mongoClient.s.url.replace(/:([^:@]{1,})@/, ":****@")
      );
    } catch (err) {
      console.log("\t|Could not connect to MongoDB Server", err.message);
      throw err;
    }
  };

  // Access the database
  const getDB = async () => {
    try {
      if (!mongoClient) {
        await connectDB();
      }
      return mongoClient.db(connection.DATABASE);
    } catch (err) {
      console.log("\t|Could not access the database", err.message);
      throw err;
    }
  };

  //-------------------------------------------------------------------------
  const find = async (collection, query) => {
    return collection
      .find(query)
      .toArray()
      .catch((err) => {
        console.log("\t|Could not find ", query, err.message);
      });
  };
  const findOne = async (collection, query) => {
    return collection.findOne(query).catch((err) => {
      console.log("\t|Could not find ", query, err.message);
    });
  };
  const deleteMany = async (collection, query) => {
    return collection.deleteMany(query).catch((err) => {
      console.log("\t|Could not delete many ", query, err.message);
    });
  };
  const deleteOne = async (collection, query) => {
    return collection.deleteOne(query).catch((err) => {
      console.log("\t|Could not delete one ", query, err.message);
    });
  };
  const insertMany = async (collection, documents) => {
    return collection
      .insertMany(documents)
      .then((res) => console.log("\t|Data inserted with IDs", res.insertedIds))
      .catch((err) => {
        console.log("\t|Could not add data ", err.message);
        if (!(err.name === "BulkWriteError" && err.code === 11000)) throw err;
      });
  };
  const insertOne = async (collection, document) => {
    return await collection
      .insertOne(document)
      .then((res) => console.log("\t|Data inserted with ID", res.insertedId))
      .catch((err) => {
        console.log("\t|Could not add data ", err.message);
        if (!(err.name === "BulkWriteError" && err.code === 11000)) throw err;
      });
  };
  //-------------------------------------------------------------------------
  const logRequest = async (req, res, next) => {
    try {
      // Connect to the database
      const db = await getDB();
      const collection = db.collection("Requests");
      const log = Log(req.method, req.url, req.query, res.statusCode);
      await insertOne(collection, log);
    } catch (err) {
      console.log("\t|Could not log the request", err.message);
    } finally {
      if (typeof next === "function") next();
    }
  };
  //-------------------------------------------------------------------------
  // Fetch utility
  const getJSONData = async (url = "") => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  //-------------------------------------------------------------------------
  const util = {
    getMongoClient,
    connectDB,
    getDB,
    find,
    findOne,
    deleteMany,
    deleteOne,
    insertMany,
    insertOne,
    logRequest,
    getJSONData,
  };
  const moduleExports = util;
  if (typeof __dirname !== "undefined") {
    module.exports = moduleExports;
  }
})();
