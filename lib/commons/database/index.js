const Db = require('./mongodb');
const conf = require('../../conf');

const dbInstance = new Db();
module.exports = {
  async close() {
    try {
      if (dbInstance) {
        console.info('[MongoDB] Database trying to disconnect');
        await dbInstance.close();
      }
    } catch (e) {
      console.error('Error on close DB: %j', e);
      throw e;
    }
  },
  async connect() {
    try {
      await dbInstance.connect(conf.get('MONGODB_URI'));
      console.info('[MongoDB] Database connected');
    } catch (e) {
      console.error('[MongoDB] Database failed to connect - ', e.message);
      throw e;
    }
  },
  getCollection(name) {
    return dbInstance.getCollection(name);
  },
  startSession() {
    return dbInstance.startSession();
  },
  ObjectId(idData) {
    return dbInstance.ObjectId(idData);
  },
  transactionOptionsDefault: dbInstance.transactionOptionsDefault
};
