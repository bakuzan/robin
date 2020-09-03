module.exports = function applyExtraSetup(db) {
  const {
    series: SeriesModel,
    volume: VolumeModel,
    retailer: RetailerModel
  } = db.models;

  SeriesModel.Volume = SeriesModel.hasMany(VolumeModel);
  VolumeModel.Series = VolumeModel.belongsTo(SeriesModel);

  RetailerModel.Volume = RetailerModel.hasMany(VolumeModel);
  VolumeModel.Retailer = VolumeModel.belongsTo(RetailerModel);
};
