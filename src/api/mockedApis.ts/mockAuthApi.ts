export default class MockAuthApi {
  async login(userData: any) {
    return this.formatResponse([]);
  }
  async logout() {
    return this.formatResponse([]);
  }

  formatResponse(response: any) {
    return {
      data: response,
    };
  }
}
