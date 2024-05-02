/// <reference types="detox" />

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp({
      launchArgs: {
        REACT_APP_IS_DETOX_TEST_MODE: true,
      },
    });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have button with some text of ("TRANSFER MONEY") to be visible', async () => {
    await expect(element(by.text('New Transaction'))).toBeVisible();
    await element(by.text('New Transaction')).tap();
    await expect(element(by.text('TRANSFER MONEY'))).toBeVisible();
  });
});
