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

  it('should have button with some text of ("Transaction History") to be visible', async () => {
    await expect(element(by.text('Transaction History'))).toBeVisible();
    await element(by.text('Transaction History')).tap();
    // await expect(element(by.text(/^Date: .*$/))).toBeVisible();
    // await expect(element(by.text(/^Amount: .*$/))).toBeVisible();
    // await expect(element(by.text(/^Recipient: .*$/))).toBeVisible();
    // await expect(element(by.text(/^Status: .*$/))).toBeVisible();
    // await expect(element(by.text(/^Transaction ID: .*$/))).toBeVisible();

    const transactionValues = [
      {
        id: 2,
        amount: 205,
        recipient: 'Emanuel',
        status: 'PENDNG',
        date: '2024',
      },
      {
        id: 3,
        amount: 215,
        recipient: 'Jake',
        status: 'DONE',
        date: '2023',
      },
    ];

    // transactionValues.forEach(function (teransactionValue) {
    await expect(
      element(by.text(`Date: ${transactionValues[0].date}`)),
    ).toBeVisible();
    await expect(
      element(by.text(`Amount: ${transactionValues[0].amount}`)),
    ).toBeVisible();
    await expect(
      element(by.text(`Recipient: ${transactionValues[0].recipient}`)),
    ).toBeVisible();
    await expect(
      element(by.text(`Status: ${transactionValues[0].status}`)),
    ).toBeVisible();
    await expect(
      element(by.text(`Transaction ID: ${transactionValues[0].id}`)),
    ).toBeVisible();

    await expect(
      element(by.text(`Date: ${transactionValues[1].date}`)),
    ).toBeVisible();
    await expect(
      element(by.text(`Amount: ${transactionValues[1].amount}`)),
    ).toBeVisible();
    await expect(
      element(by.text(`Recipient: ${transactionValues[1].recipient}`)),
    ).toBeVisible();
    await expect(
      element(by.text(`Status: ${transactionValues[1].status}`)),
    ).toBeVisible();
    await expect(
      element(by.text(`Transaction ID: ${transactionValues[1].id}`)),
    ).toBeVisible();
  });
  // });
});
