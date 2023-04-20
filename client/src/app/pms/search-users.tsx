import { Form } from "react-bootstrap";

export function SearchUsers({
    email,
    setEmail,
    name,
    setName,
}: {
    email: string;
    setEmail: (_: string) => void;
    name: string;
    setName: (_: string) => void;
}) {
    return (
        <div className="to_center border_3px">
            <Form className="format">
                <Form.Group
                    className="mb-3 form_group"
                    controlId="formBasicText"
                >
                    <Form.Label className="to_center">Email cím</Form.Label>
                    <Form.Control
                        type="text"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </Form.Group>
                <Form.Group
                    className="mb-3 form_group"
                    controlId="formBasicText"
                >
                    <Form.Label className="to_center">Név</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </Form.Group>
            </Form>
        </div>
    );
}
