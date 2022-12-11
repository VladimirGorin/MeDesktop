import {CHAT_ROUTE, LOGIN_ROUTE, ROOM_ROUTE} from "./utils/consts";
import Login from "./components/Login/Login";
import Index from "./components/IndexComplite";
import RoomIndex from "./components/Rooms/RoomIndex";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    }
]

export const privateRoutes = [
    {
        path: CHAT_ROUTE,
        Component: Index
    },
    {
        path: `${ROOM_ROUTE}/:room`,
        Component: RoomIndex
    }
]