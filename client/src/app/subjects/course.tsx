"use client";

import { Course as CourseModel } from "@/common/models/course";
import { Room } from "@/common/models/room";
import { Button } from "react-bootstrap";

export interface CourseProps {
    course: CourseModel;
}

export function Course({ course }: CourseProps) {
    return (
        <div className="border_course flex_container_course">
            <div className="flex_child_course main_white_color">
                <p>{course?.teachers?.join(", ")}</p>
            </div>
            <div className="flex_child_course main_white_color">
                <p>Irinyi 217</p>
            </div>
            <div className="flex_child_course main_white_color">
                <p>Hétfő 18:00-20:00</p>
            </div>
            <div className="flex_child_course main_white_color">
                <p>Férőhely: 6/60</p>
            </div>
            <div className="flex_child_course main_white_color">
                <Button variant="primary" type="submit">
                    Felvesz
                </Button>
            </div>
        </div>
    );
}
