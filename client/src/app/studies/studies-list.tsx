"use client";

import { Studies } from "@/common/models/studies";

export function StudiesList() {
    return (
        <div
            style={{ borderBottom: "1px dashed #f3f3f3" }}
            className="flex_container_studies"
        >
            <div className="flex_child_studies main_white_color">
                <p>Formális nyelvek</p>
            </div>
            <div className="flex_child_studies main_white_color">
                <p>Előadás</p>
            </div>
            <div className="flex_child_studies main_white_color">
                <p>2</p>
            </div>
            <div className="flex_child_studies main_white_color">
                <p>5</p>
            </div>
        </div>
    );
}
