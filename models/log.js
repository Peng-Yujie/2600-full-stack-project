(() => {
  const Log = (method, path, query, status) => {
    return {
      Timestamp: new Date().toUTCString(),
      Method: method,
      Path: path,
      query: query,
      "Status Code": status,
    };
  };
  module.exports = Log;
})();
