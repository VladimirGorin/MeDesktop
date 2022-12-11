import React from 'react';
import {Route, Switch, Redirect, Link} from 'react-router-dom'
import { ROOM_ROUTE } from '../../utils/consts';
import {useAuthState} from "react-firebase-hooks/auth";
import { roomRoutes } from '../../routes';
import RoomIndex from './RoomIndex';

export const newRooms = [
    {
        rid: 1,
        name: `Комната 1`
    },
    {
        rid: 2,
        name: `Комната 2`
    },
    {
        rid: 3,
        name: `Комната 3`
    },
    {
        rid: 4,
        name: `Комната 4`
    },
    {
        rid: 5,
        name: `Комната 5`
    },
    {
        rid: 6,
        name: `Комната 6`
    },
    {
        rid: 7,
        name: `Комната 7`
    },
    {
        rid: 8,
        name: `Комната 8`
    },
    {
        rid: 9,
        name: `Комната 9`
    },
    {
        rid: 10,
        name: `Комната 10`
    },
    {
        rid: 11,
        name: `Комната 11`
    }
]

const RoomsItem = (props) => {
    
    return(
        <div className="main__roomsItem">
            <Link to={`${ROOM_ROUTE}/${props.rid}`} >{props.name}</Link> 
        </div>
    );
}

export default RoomsItem