export default class MockTransactionApi {
  async getTransactions() {
    return this.formatResponse([
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
    ]);
  }

  formatResponse(response: any) {
    return {
      data: response,
    };
  }
}
