"use client";

export function ExamListHeader() {
    return (
        <div className="flex_container_exam border_3px_no_margin">
            <div className="flex_child_exam form_group">
                <p>Tárgy neve</p>
            </div>
            <div className="flex_child_exam form_group">
                <p>Kezdés időpontja</p>
            </div>
            <div className="flex_child_exam form_group">
                <p>Fő/Limit</p>
            </div>
            <div className="flex_child_exam form_group">
                <p>Terem</p>
            </div>
            <div className="flex_child_exam form_groupr">
                <p></p>
            </div>
        </div>
    );
}
