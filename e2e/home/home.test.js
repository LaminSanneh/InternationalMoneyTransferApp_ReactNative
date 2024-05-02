/// <reference types="detox" />

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have button with some text of ("Get Support") to be visible', async () => {
    await expect(element(by.text('GET SUPPORT'))).toBeVisible();
    await expect(element(by.text('PROVIDE FEEDBACK'))).toBeVisible();
  });
});
