export const getGatewayMock = jest.fn().mockImplementation(() => Promise.resolve());
export const getUserByIdMock = jest.fn().mockImplementation(() => Promise.resolve());

export const GatewayServiceMock = { 
  getGateway: getGatewayMock,
 };

const mock = jest.fn().mockImplementation(() => {
  return { GatewayService: GatewayServiceMock };
});

export default mock;