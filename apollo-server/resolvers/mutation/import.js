const { db, Volume, Series, Retailer } = require('../../connectors');

module.exports = {
  import(_, { volumes }) {
    return db.transaction(async (transaction) => {
      /**
       * Go through each volume, create series/retailers if necessary
       * Save volume, collect messages
       * Return response
       */

      return { success: false, messages: ['Import not yet implemented.'] };
    });
  }
};
