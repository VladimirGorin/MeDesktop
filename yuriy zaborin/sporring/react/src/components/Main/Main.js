import React from "react";
import RoomsItem from "../Rooms/RoomsItem";
import { newRooms } from "../Rooms/RoomsItem";
import "./Main.css"
import Chat from "../Chat/Chat";

const Main = () => {

    const RoomsList = newRooms.map(room => <RoomsItem rid={room.rid} name={room.name} />)

    return (
            <div className="main">
                <div className="main__body">
                    <div className="main__rooms">
                        {
                            RoomsList
                        }
                    </div>
                    <div className="main__info">
                        <h1>Этот сайт поможет вам найти собеседника</h1>
                        <span>Все что вам нужно это нажать 3-точки на собеседнека с которым вы хотите поговорить, если вы хотите кого то услышать - пожалуйста заходите в комноту.</span>
                    </div>
                    <div className="main__chat">
                        <Chat />
                    </div>
                </div>
            </div>
    );
}

export default Main