function isoDate(ds) {
  return new Date(ds).toISOString();
}

const series = [
  {
    name: 'One Piece',
    type: 'Manga',
    volumeCount: null
  },
  {
    name: 'Vagabond',
    type: 'Manga',
    volumeCount: null
  },
  {
    name: 'Prison School',
    type: 'Manga',
    volumeCount: 14
  },
  {
    name: 'Witchcraft Works',
    type: 'Manga',
    volumeCount: null
  },
  {
    name: 'Batman',
    type: 'Comic',
    volumeCount: null
  },
  {
    name: 'Superman',
    type: 'Comic',
    volumeCount: null
  },
  {
    name: 'Nightwing',
    type: 'Comic',
    volumeCount: null
  }
];

const retailer = [
  { name: 'Amazon' },
  { name: 'Bookdepository (Direct)' },
  { name: 'Bookdepository (Amazon)' },
  { name: 'Wordery' },
  { name: 'UKPaperbackShop' }
];

// SeriesIds
const ONE_PIECE = 1;
const VAGABOND = 2;
const BATMAN = 5;

// RetailerIds
const AMAZON = 1;
const BOOK_DEPOSITORY_AZ = 3;
const WORDERY = 4;

const volume = [
  {
    number: 80,
    releaseDate: isoDate('2016-04-05'),
    boughtDate: isoDate('2018-10-16'),
    rrp: 6.99,
    paid: 5.0,
    usedDiscountCode: false,
    seriesId: ONE_PIECE,
    retailerId: AMAZON
  },
  {
    number: 81,
    releaseDate: isoDate('2016-07-15'),
    boughtDate: isoDate('2018-10-16'),
    rrp: 6.99,
    paid: 5.1,
    usedDiscountCode: false,
    seriesId: ONE_PIECE,
    retailerId: AMAZON
  },
  {
    number: 82,
    releaseDate: isoDate('2016-10-25'),
    boughtDate: isoDate('2018-10-16'),
    rrp: 6.99,
    paid: 5.05,
    usedDiscountCode: false,
    seriesId: ONE_PIECE,
    retailerId: AMAZON
  },
  {
    number: 83,
    releaseDate: isoDate('2017-02-01'),
    boughtDate: isoDate('2018-10-16'),
    rrp: 6.99,
    paid: 5.2,
    usedDiscountCode: false,
    seriesId: ONE_PIECE,
    retailerId: AMAZON
  },
  {
    number: 11,
    releaseDate: isoDate('2010-01-01'),
    boughtDate: isoDate('2017-05-16'),
    rrp: 12.99,
    paid: 8.45,
    usedDiscountCode: false,
    seriesId: VAGABOND,
    retailerId: BOOK_DEPOSITORY_AZ
  },
  {
    number: 12,
    releaseDate: isoDate('2010-05-11'),
    boughtDate: isoDate('2017-06-06'),
    rrp: 12.99,
    paid: 9.15,
    usedDiscountCode: false,
    seriesId: VAGABOND,
    retailerId: BOOK_DEPOSITORY_AZ
  },
  {
    number: 1,
    releaseDate: isoDate('2016-03-21'),
    boughtDate: isoDate('2017-04-12'),
    rrp: 14.99,
    paid: 8.6,
    usedDiscountCode: false,
    seriesId: BATMAN,
    retailerId: WORDERY
  },
  {
    number: 2,
    releaseDate: isoDate('2016-07-10'),
    boughtDate: isoDate('2017-07-28'),
    rrp: 12.99,
    paid: 8.1,
    usedDiscountCode: false,
    seriesId: BATMAN,
    retailerId: WORDERY
  },
  {
    number: 3,
    releaseDate: isoDate('2016-11-25'),
    boughtDate: isoDate('2018-07-09'),
    rrp: 12.99,
    paid: 8.12,
    usedDiscountCode: false,
    seriesId: BATMAN,
    retailerId: WORDERY
  }
];

module.exports = {
  series,
  retailer,
  volume
};
