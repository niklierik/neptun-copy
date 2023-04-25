"use client";

export function StudiesListHeader() {
    return (
        <div
            style={{ marginTop: "20px", borderBottom: "2px solid #f3f3f3" }}
            className="flex_container_studies"
        >
            <div className="flex_child_studies form_group">
                <p>Tárgy neve</p>
            </div>
            <div className="flex_child_studies form_group">
                <p>Tárgy típusa</p>
            </div>
            <div className="flex_child_studies form_group">
                <p>Kredit</p>
            </div>
            <div className="flex_child_studies form_group">
                <p>Jegy</p>
            </div>
        </div>
    );
}
