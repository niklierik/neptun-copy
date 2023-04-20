export interface ErrorProps {
    errors: string[];
}

export function Errors({ errors }: ErrorProps) {

    if (errors.length == 0) {
        return <></>;
    }

    return <div className="error_div">
        {
            errors.map((error, index) =>
                <p key={index}>
                    {error}
                </p>)
        }
    </div>;
}