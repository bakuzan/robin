import { SeriesModule } from './series.module';

describe('SeriesModule', () => {
  let seriesModule: SeriesModule;

  beforeEach(() => {
    seriesModule = new SeriesModule();
  });

  it('should create an instance', () => {
    expect(seriesModule).toBeTruthy();
  });
});
