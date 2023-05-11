import { Gateway } from "../common/types";

export const initialAppState = {};

// actions
export const ADD_GATEWAY = "ADD_GATEWAY";
export const ADD_GATEWAYS = "ADD_GATEWAYS";
export const REMOVE_GATEWAY = "REMOVE_GATEWAY";

export const ADD_DEVICE = "ADD_DEVICE";
export const STOP_DEVICE = "STOP_DEVICE";
export const RUN_DEVICE = "RUN_DEVICE";
export const REMOVE_DEVICE = "REMOVE_DEVICE";

export const reducer = (state: { gateways?: Gateway[] }, action: any) => {
    switch (action.type) {
        case ADD_GATEWAYS:
            return {
                ...state,
                gateways: [...action.payload],
            };
        case ADD_GATEWAY:
            return {
                ...state,
                gateways: [...(state.gateways ? state.gateways : []), action.payload],
            };
        case REMOVE_GATEWAY:
            return {
                ...state,
                gateways: state.gateways!.filter((gateway: any) => gateway._id !== action.payload),
            };
        case ADD_DEVICE:
            return {
                ...state,
                gateways: state.gateways!.map((gateway: any) => {
                    if (gateway._id === action.payload.gatewayId) {
                        gateway.devices.push(action.payload.device);
                    }
                    return gateway;
                }),
            };
        case STOP_DEVICE: // set device status to false
            return {
                ...state,
                gateways: state.gateways!.map((gateway: any) => {
                    if (gateway._id === action.payload.gatewayId) {
                        gateway.devices = gateway.devices.map((device: any) => {
                            if (device._id === action.payload.deviceId) {
                                device.status = false;
                            }
                            return device;
                        });
                    }
                    return gateway;
                }),
            };
        case RUN_DEVICE: // set device status to true
            return {
                ...state,
                gateways: state.gateways!.map((gateway: any) => {
                    if (gateway._id === action.payload.gatewayId) {
                        gateway.devices = gateway.devices.map((device: any) => {
                            if (device._id === action.payload.deviceId) {
                                device.status = true;
                            }
                            return device;
                        });
                    }
                    return gateway;
                }),
            };
        case REMOVE_DEVICE:
            return {
                ...state,
                gateways: state.gateways!.map((gateway: any) => {
                    if (gateway._id === action.payload.gatewayId) {
                        gateway.devices = gateway.devices.filter((device: any) => device._id !== action.payload.deviceId);
                    }
                    return gateway;
                }),
            };
        default:
            return state;
    }
};

