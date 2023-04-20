
"use client";

import { Spacer } from "@/common/spacer";
import { Form } from "react-bootstrap";


export interface WriteMarkProps {
    name: string;
    email: string;
    mark: number;
}

export default function WriteMark({ name, email, mark }: WriteMarkProps) {
    const marks = [];
    for (let i = 1; i <= 5; i++) {
        marks.push(i);
    }
    return <div className="to_center">
        <div className="flex_container main_white_color bottom_border">
            <div className="flex_child">
                <p>{name} ({email})</p>
            </div>
            <div className="flex_child">
                <p>Érdemjegy:</p>
            </div>
            <div className="flex_child">
                <Form.Select size="sm">
                    <option value="">Jegy</option>
                    {
                        marks.map((m, index) => (
                            <option key={index} value={m} selected={mark === m}>{m}</option>
                        ))
                    }
                </Form.Select>
            </div>
        </div>
    </div>
}