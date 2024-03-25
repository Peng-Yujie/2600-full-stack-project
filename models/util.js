const { ServerApiVersion } = require("mongodb");

(() => {
  const MongoClient = require("mongodb").MongoClient;
  const connection = require("./config/config");
  //-------------------------------------------------------------------------
  let mongoClient = undefined;

  const getMongoClient = (local = false) => {
    let uri = `mongodb+srv://${connection.USERNAME}:${connection.PASSWORD}@${connection.SERVER}/?retryWrites=true&w=majority&appName=${connection.DATABASE}`;
    if (local) {
      uri = `mongodb://127.0.0.1:27017/${connection.DATABASE}`;
    }
    console.log(`Connection String<<${uri}`);
    if (!mongoClient) {
      mongoClient = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });
    }
    return mongoClient;
  };
  //-------------------------------------------------------------------------
  const find = async (collection, query) => {
    return collection
      .find(query)
      .toArray()
      .catch((err) => {
        console.log("Could not find ", query, err.message);
      });
  };
  const deleteMany = async (collection, query) => {
    return collection.deleteMany(query).catch((err) => {
      console.log("Could not delete many ", query, err.message);
    });
  };
  const deleteOne = async (collection, query) => {
    return collection.deleteOne(query).catch((err) => {
      console.log("Could not delete one ", query, err.message);
    });
  };
  const insertMany = async (collection, documents) => {
    return collection
      .insertMany(documents)
      .then((res) => console.log("Data inserted with IDs", res.insertedIds))
      .catch((err) => {
        console.log("Could not add data ", err.message);
        if (!(err.name === "BulkWriteError" && err.code === 11000)) throw err;
      });
  };
  const insertOne = async (collection, document) => {
    return await collection
      .insertOne(document)
      .then((res) => console.log("Data inserted with ID", res.insertedId))
      .catch((err) => {
        console.log("Could not add data ", err.message);
        if (!(err.name === "BulkWriteError" && err.code === 11000)) throw err;
      });
  };
  //-------------------------------------------------------------------------
  const logRequest = async (req, res, next) => {
    const client = util.getMongoClient();
    client
      .connect()
      .then((connection) => {
        console.log("\t|Inside connect()");
        console.log(
          "\t|Connected successfully to MongoDB!",
          connection.s.url.replace(/:([^:@]{1,})@/, ":****@")
        );
        let collection = connection.db().collection("Requests");
        let log = {
          Timestamp: new Date(),
          Method: req.method,
          Path: req.url,
          Query: req.query,
          "Status Code": res.statusCode,
        };
        util.insertOne(collection, log);
      })
      .catch((err) => {
        console.log(
          `\t|Could not connect to MongoDB Server\n\t|${err.message}`
        );
      })
      .finally(() => {
        // client.close();
        // console.log("\t|Connection closed");
      });
    next();
  };
  //-------------------------------------------------------------------------
  const util = {
    url: "localhost",
    username: connection.USERNAME,
    password: connection.PASSWORD,
    port: 22643,
    database: connection.DATABASE,
    getMongoClient,
    find,
    deleteMany,
    deleteOne,
    insertMany,
    insertOne,
    logRequest,
  };
  const moduleExports = util;
  if (typeof __dirname !== "undefined") {
    module.exports = moduleExports;
  }
})();
