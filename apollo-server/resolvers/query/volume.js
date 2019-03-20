const generateVolumesExport = require('../../utils/generate-volumes-export');

module.exports = {
  async volumes(_, { filters }, context) {
    return await context.getVolumesForDateRange(filters);
  },
  async export(_, { filters }, context) {
    const volumes = await context.getVolumesForDateRange(filters, {
      order: [['boughtDate', 'ASC']],
      raw: true
    });

    if (!volumes.length) {
      const { fromDate, toDate } = filters;

      return {
        success: false,
        messages: [`No volumes found between ${fromDate} and ${toDate}`],
        data: null
      };
    }

    const data = generateVolumesExport(volumes);

    return {
      success: true,
      messages: [],
      data
    };
  }
};
