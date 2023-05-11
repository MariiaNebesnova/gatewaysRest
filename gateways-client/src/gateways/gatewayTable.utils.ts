import { notification } from "antd";
import { fetchDelete, fetchPost, fetchPut } from "../common/fetchHelpers";
import { REMOVE_DEVICE, REMOVE_GATEWAY, RUN_DEVICE, STOP_DEVICE } from "../app/state";

export const runDeviceHandler = (deviceId: string, gatewayId: string, dispatch: (action: any) => void) => () => {
    notification.info({ message: "Running device..." });
    fetchPut("/devices/statusOn", { _id: deviceId })
        .then((response) => {
            if (response.ok) {
                dispatch({ type: RUN_DEVICE, payload: { deviceId, gatewayId }});
                notification.success({ message: "Device runned!" });
            } else {
                notification.error({ message: "Something went wrong..." });
            }
        });
}

export const stopDeviceHandler = (deviceId: string, gatewayId: string, dispatch: (action: any) => void) => () => {
    notification.info({ message: "Stopping device..." });
    fetchPut("/devices/statusOff", { _id: deviceId })
        .then((response) => {
            if (response.ok) {
                dispatch({ type: STOP_DEVICE, payload: { deviceId, gatewayId }});
                notification.success({ message: "Device stopped!" });
            } else {
                notification.error({ message: "Something went wrong..." });
            }
        });
}

export const removeDeviceHandler = (deviceId: string, gatewayId: string, dispatch: (action: any) => void) => () => {
    notification.info({ message: "Removing device..." });
    fetchPost("/devices/remove", { deviceId, gatewayId })
        .then((response) => {
            if (response.ok) {
                dispatch({ type: REMOVE_DEVICE, payload: { deviceId, gatewayId }});
                notification.success({ message: "Device removed!" });
            } else {
                notification.error({ message: "Something went wrong..." });
            }
        });
}

export const removeGatewayHandler = (gatewayId: string, dispatch: (action: any) => void) => () => {
    notification.info({ message: "Removing gateway..." });
    fetchDelete("/gateways/remove", gatewayId)
        .then((response) => {
            if (response.ok) {
                dispatch({ type: REMOVE_GATEWAY, payload: gatewayId });
                notification.success({ message: "Gateway removed!" });
            } else {
                notification.error({ message: "Something went wrong..." });
            }
        });
}
