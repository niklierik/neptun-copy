"use client";

export function SemesterHeader() {
    return (
        <div className="flex_container_studies border_3px_no_margin">
            <div className="flex_child_studies form_group">
                <p>Tárgy neve</p>
            </div>
            <div className="flex_child_studies form_group">
                <p>Kredit</p>
            </div>
            <div className="flex_child_studies form_group">
                <p>Érdemjegy</p>
            </div>
        </div>
    );
}
