const Op = require('sequelize').Op;
const { db, Volume, Series, Retailer } = require('../../connectors');

const { prepString } = require('../../utils');

async function getExistingEntities(entity, { search, transaction }) {
  return await entity.findAll({
    raw: true,
    attributes: ['id', 'name'],
    where: {
      name: db.where(db.fn('LOWER', db.col('name')), { [Op.in]: search })
    },
    transaction
  });
}

async function createNewEntities(entity, { newEntities, transaction }) {
  const createdAt = Date.now();

  await entity.bulkCreate(newEntities, { transaction });
  return await entity.findAll({
    raw: true,
    attributes: ['id', 'name'],
    where: { createdAt: { [Op.gte]: createdAt } },
    transaction
  });
}

function filterDistinctValues(volumes, existing, { attr, importType }) {
  const existingNames = existing.map((x) => x.name.toLowerCase());
  return Array.from(new Set(volumes.map((x) => x[attr].name)))
    .filter((x) => !existingNames.some((en) => en === x || en.includes(x)))
    .map((name) => {
      return importType ? { name, type: importType } : { name };
    });
}

async function processAssociation(
  entity,
  volumes,
  { attr, importType, messages, transaction }
) {
  const names = Array.from(new Set(volumes.map((x) => x[attr].name)));

  const entities = await getExistingEntities(entity, {
    search: names,
    transaction
  });
  const newEntities = await createNewEntities(entity, {
    newEntities: filterDistinctValues(volumes, entities, { attr, importType }),
    transaction
  });

  messages.push(`Created ${newEntities.length} ${attr}`);
  return entities.concat(newEntities);
}

function findAndResolveAssociation(entities, { value, attr, messages }) {
  const loweredValue = value.name;
  const found = entities.find((s) => s.name.toLowerCase() === loweredValue);
  if (found) {
    return { [attr]: found.id };
  } else {
    messages.push(`Nothing found for ${value.name}`);
    return {};
  }
}

module.exports = {
  import(_, { volumes, importType }) {
    return db.transaction(async (transaction) => {
      const messages = [];
      const cleanedVolumes = volumes.map((x) => ({
        ...x,
        retailer: { ...x.retailer, name: prepString(x.retailer.name) },
        series: { ...x.series, name: prepString(x.series.name) }
      }));

      const rbnSeries = await processAssociation(Series, cleanedVolumes, {
        attr: 'series',
        importType,
        messages,
        transaction
      });
      const rbnRetailers = await processAssociation(Retailer, cleanedVolumes, {
        attr: 'retailer',
        messages,
        transaction
      });

      const preppedVolumes = cleanedVolumes.map((x) => {
        const { retailer, series, ...vol } = x;
        const volSeries = findAndResolveAssociation(rbnSeries, {
          value: series,
          attr: 'seriesId',
          messages
        });
        const volRetailer = findAndResolveAssociation(rbnRetailers, {
          value: retailer,
          attr: 'retailerId',
          messages
        });

        return { ...vol, ...volSeries, ...volRetailer };
      });

      await Volume.bulkCreate(preppedVolumes, {
        transaction
      });

      messages.push(`Created ${preppedVolumes.length} volumes`);
      return await Promise.resolve({ success: true, messages });
    });
  }
};
