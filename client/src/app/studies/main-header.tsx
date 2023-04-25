"use client";

export function MainHeader() {
    return (
        <div className="flex_container_studies border_3px_no_margin">
            <div className="flex_child_studies form_group">
                <p>Félév</p>
            </div>
            <div className="flex_child_studies form_group">
                <p>Felvett kredit</p>
            </div>
            <div className="flex_child_studies form_group">
                <p>Megszerzett kredit</p>
            </div>
            <div className="flex_child_studies form_group">
                <p>Súlyozott tanulmányi átlag</p>
            </div>
        </div>
    );
}
