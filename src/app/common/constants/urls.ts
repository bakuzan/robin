import { RobinUrls } from './models';

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
  base: 'robin',
  dashboard: 'dashboard',
  seriesList: 'series'
});

export default Urls;
