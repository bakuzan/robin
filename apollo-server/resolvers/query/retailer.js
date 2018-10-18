const { Retailer } = require('../../connectors');

module.exports = {
  retailers() {
    return Retailer.findAll({
      order: [['name', 'DESC']]
    });
  }
};
