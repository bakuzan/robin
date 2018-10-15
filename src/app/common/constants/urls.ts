class RobinUrls {
  build: Function;
  images: ImageUrls;
  graphqlEndpoint: string;
  base: string;
  dashboard: string;
  seriesList: string;
  seriesCreate: string;
  seriesView: string;
  purchaseHistory: string;
}
class ImageUrls {
  deadImage: string;
}

const Urls: RobinUrls = Object.freeze({
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
  purchaseHistory: 'volumes'
});

export default Urls;
