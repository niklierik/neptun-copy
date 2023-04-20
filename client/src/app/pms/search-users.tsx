import { Form } from "react-bootstrap";

export function SearchUsers() {
    return (
        <div className="to_center border_3px">
            <Form className="format">
                <Form.Group
                    className="mb-3 form_group"
                    controlId="formBasicText"
                >
                    <Form.Label className="to_center">Email cím</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
                <Form.Group
                    className="mb-3 form_group"
                    controlId="formBasicText"
                >
                    <Form.Label className="to_center">Név</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
            </Form>
        </div>
    );
}
