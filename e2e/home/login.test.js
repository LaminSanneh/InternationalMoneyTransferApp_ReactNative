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

  it('should have button with some text of ("LOGIN") to be visible', async () => {
    await expect(element(by.text('Login'))).toBeVisible();
    await element(by.text('Login')).tap();
    await expect(element(by.text('LOGIN'))).toBeVisible();
  });

});
