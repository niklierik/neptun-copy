"use client";

import { getServerUrl } from "@/common/cfg";
import Header from "@/common/header";
import { asyncTask } from "@/common/utils/async-task";
import { Form } from "react-bootstrap";
import WriteMark from "./write-mark";

export interface MarksProps {
    courseID: string;
}

export default function Marks(props: MarksProps) {
    const {} = asyncTask(getServerUrl("courses"));
    return (
        <main>
            <Header></Header>
            <div className="to_center">
                <div className="flex_container main_white_color border_2px">
                    <div className="flex_child">
                        <p>ABC-567</p>
                    </div>
                    <div className="flex_child">
                        <p>Programozási nyelvek</p>
                    </div>
                    <div className="flex_child">
                        <p>IR-217-3 - Irinyi 217 PC-terem (IR-217-3)</p>
                    </div>
                    <div className="flex_child">
                        <p>Hétfő 18:00-20:00</p>
                    </div>
                    <div className="flex_child">
                        <p>Gyakorlat</p>
                    </div>
                </div>
            </div>
            <WriteMark email="n@n.com" name="Nevem"></WriteMark>
        </main>
    );
}
