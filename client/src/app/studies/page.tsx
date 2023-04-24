"use client";

import { StudiesService } from "@/common/services/studies.service";
import { asyncTask } from "@/common/utils/async-task";

export default function Studies() {
    const { html, data: studies } = asyncTask("get-studies", () =>
        StudiesService.get(),
    );
    if (html) {
        return html;
    }
    return <p>{JSON.stringify(studies)}</p>;
}
