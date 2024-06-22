export default class MockTransactionApi {
  async getTransactions() {
    return this.formatResponse([
      {
        id: 2,
        amount: 205,
        recipient: {name: 'Emanuel'},
        status: 'PENDNG',
        date: '2024',
      },
      {
        id: 3,
        amount: 215,
        recipient: {name: 'Jake'},
        status: 'COMPLETED',
        date: '2023',
      },
    ]);
  }

  async addTransaction(transactionData: any) {
    return {
      id: 4,
      amount: transactionData.amount,
      recipient: {name: transactionData.recipient.name},
      status: 'COMPLETED',
      date: '2023',
    };
  }

  formatResponse(response: any) {
    return {
      data: response,
    };
  }
}
