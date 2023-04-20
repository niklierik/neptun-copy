"use client";

import Header from "@/common/header";
import { Subject } from "./subject";

export default function Studies() {
    return (
        <main>
            <Header></Header>
            <div>
                <Subject></Subject>
                <Subject></Subject>
                <Subject></Subject>
                <Subject></Subject>
            </div>
        </main>
    );
}
