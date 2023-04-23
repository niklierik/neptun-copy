"use client";

import { RequirementTypeToString } from "@/common/models/education-chart";
import { Subject, subjectTypeToString } from "@/common/models/subject";
import { EduChartService } from "@/common/services/edu-charts.service";
import { asyncTask } from "@/common/utils/async-task";

export interface SubjectProps {
    subject: Subject;
}

export function SubjectHeader({ subject }: SubjectProps) {
    const educharts = subject?.educhart;
    const educhart = educharts ? educharts[0] : undefined;
    const educhartStr = educhart
        ? `${RequirementTypeToString(
              educhart.requirementType,
          )} | Ajánlott félév: ${educhart.recommendedSemester}`
        : "";
    return (
        <div className="border_subject flex_container_subject">
            <div className="flex_child_subject main_white_color">
                <p>
                    {subject.name} ({subjectTypeToString(subject.type)})
                </p>
            </div>
            <div className="flex_child_subject main_white_color">
                <p>{educhartStr}</p>
            </div>
            <div className="flex_child_subject main_white_color">
                <p>Kredit: {subject.credit}</p>
            </div>
        </div>
    );
}
