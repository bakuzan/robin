export default Object.freeze({
  build: (path, params) => {
    for (const k in params) {
      if (params.hasOwnProperty(k)) {
        path = path.replace(`:${k}`, params[k]);
      }
    }
    return path;
  },
  images: {
    deadImage: 'https://i.imgur.com/gKr1YhF.png'
  },
  graphqlEndpoint: '/graphql',
  base: 'robin',
  dashboard: 'dashboard',
  seriesList: 'series',
  seriesCreate: 'series/create',
  seriesView: 'series/view/:id',
  purchaseHistory: 'volumes',
  importer: 'volumes/export-import'
});
