"use client";
import Header from "@/common/header";
import RoomTable from "./roomTable";
import { asyncTask } from "@/common/utils/async-task";
import { RoomsService } from "@/common/services/rooms.service";
import { CreateRoomForum } from "./create-room-form";

export default function Rooms() {
    const { html, data: rooms } = asyncTask("get-rooms", () =>
        RoomsService.getRooms(),
    );
    if (html) {
        return html;
    }
    if (!rooms) {
        return <></>;
    }

    return (
        <main>
            <Header></Header>

            <CreateRoomForum></CreateRoomForum>

            <div>
                <p className="to_center main_white_color">
                    Termek szerkesztése
                </p>
                <RoomTable rooms={rooms}></RoomTable>
            </div>
        </main>
    );
}
