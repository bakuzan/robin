module.exports = {
  volumes(series, { sort }) {
    const order = sort ? sort.split('_') : undefined;
    return series.getVolumes({ order }).then((volumes) => volumes || []);
  }
};
