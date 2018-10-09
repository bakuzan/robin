module.exports = {
  volumes(series) {
    return series.getVolumes().then((volumes) => volumes || []);
  }
};
