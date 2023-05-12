import { GatewayController } from "../../gateway/gateway.controller";
import { GatewayServiceMock } from "../__mocks__/gateway.service";

const routerMock = {
    post: () => null,
    get: () => null,
    delete: () => null,
};

describe("test gateway.controller", () => {
    beforeEach(() => {
        GatewayServiceMock.getGateway.mockClear();
    })

    it("getGateway properly calls service.getGateway", async () => {
        const data = [
            {
            input: { params: { id: "000000" } },
            output: "000000",
        },
        {
            input: { params: {  } },
            output: undefined,
        }
    ];
        // @ts-ignore
        const gatewayController = new GatewayController(routerMock, GatewayServiceMock);
        data.forEach(async (_data) => {
            // @ts-ignore
            await gatewayController.getGateway(_data.input, {}, () => { });
            expect(GatewayServiceMock.getGateway).toBeCalledWith(_data.output);
        })
        
    })
})
