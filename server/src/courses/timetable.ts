import { Room } from "src/rooms/room.entity";
import { Subject } from "src/subjects/subject.entity";
import { User } from "src/users/entities/users.entity";
import { DayOfWeek, Course } from "./course.entity";

export type TimeTableOfWeek = Map<DayOfWeek, TimeTableOfDay>;
export type TimeTableOfDay = Map<string, TimeTableOfRoom>;
export type TimeTableOfRoom = Map<number, Slot>;

export class Slot {
  available: boolean;
  subject: Subject;
  course: Course;
  room: Room;
  teacher: User;
  day: DayOfWeek;
  hour: number;

  constructor(data: Partial<Slot>) {
    Object.assign(this, data); // copy data passed by constructor
  }
}

export function getAllSlotsAt(
  timetable: TimeTableOfWeek,
  day: DayOfWeek,
  hour: number,
  rooms?: Room[],
) {
  const slots: Slot[] = [];
  const roomIds = rooms?.map((room) => room.id);
  for (const [key, tables] of timetable.get(day).entries()) {
    if (!rooms?.length || roomIds.includes(key)) {
      slots.push(tables.get(hour));
    }
  }
  return slots;
}

export function getAvailableSlotsAt(
  timetable: TimeTableOfWeek,
  day: DayOfWeek,
  hour: number,
) {
  return getAllSlotsAt(timetable, day, hour).filter((slot) => slot.available);
}

export function getAvailableSlots(
  timetable: TimeTableOfWeek,
  rooms: Room[],
): Slot[] {
  const res = [];
  for (let day = 1; day <= 5; day++) {
    for (let hour = 8; hour < 20; hour += 2) {
      const slots = getAllSlotsAt(timetable, day, hour, rooms);
      for (const slot of slots) {
        if (slot.available) {
          res.push(slot);
        }
      }
    }
  }
  return res;
}

export function createTimetableFor(
  room: Room,
  day: DayOfWeek,
): TimeTableOfRoom {
  const map = new Map<number, Slot>();
  for (let i = 8; i < 20; i++) {
    map.set(
      i,
      new Slot({
        hour: i,
        available: true,
        course: null,
        day,
        room,
        subject: null,
        teacher: null,
      }),
    );
  }
  return map;
}

export function createTimetable(rooms: Room[], day: DayOfWeek): TimeTableOfDay {
  const map = new Map<string, TimeTableOfRoom>();
  for (const room of rooms) {
    map.set(room.id, createTimetableFor(room, day));
  }
  return map;
}

export function createTimetables(rooms: Room[]): TimeTableOfWeek {
  if (rooms.length == 0) {
    return new Map<DayOfWeek, TimeTableOfDay>();
  }
  const map = new Map<DayOfWeek, TimeTableOfDay>();
  for (let day = DayOfWeek.MONDAY; day <= DayOfWeek.FRIDAY; day++) {
    map.set(day, createTimetable(rooms, day));
  }
  return map;
}
