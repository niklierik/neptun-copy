
"use client";

import { Form } from "react-bootstrap";

export default function WriteMark({ name, email }: any) {
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
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </Form.Select>
            </div>
        </div>
    </div>
}