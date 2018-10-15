import { VolumeModule } from './volume.module';

describe('VolumeModule', () => {
  let volumeModule: VolumeModule;

  beforeEach(() => {
    volumeModule = new VolumeModule();
  });

  it('should create an instance', () => {
    expect(volumeModule).toBeTruthy();
  });
});
