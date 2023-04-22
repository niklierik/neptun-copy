import { Form, Button } from "react-bootstrap";

export function CreateSubjectForm() {
    return (
        <Form className="format">
            <Form.Group className="form_group mb-3" controlId="formBasicText">
                <Form.Label>Tantárgy neve</Form.Label>
                <Form.Control type="text" placeholder="Tantárgy neve" />
            </Form.Group>
            <Form.Group className="form_group mb-3" controlId="formBasicText">
                <Form.Label>Kredit</Form.Label>
                <Form.Control type="text" placeholder="Kredit" />
            </Form.Group>
            <Form.Group className="form_group mb-3" controlId="formBasicText">
                <Form.Label>Heti óraszám</Form.Label>
                <Form.Control type="text" placeholder="Heti óraszám" />
            </Form.Group>
            <Form.Group className="form_group mb-3" controlId="formBasicText">
                <Form.Label>Típus</Form.Label>
                <Form.Control type="text" placeholder="Tantárgy típusa" />
            </Form.Group>
            <div className="to_center">
                <Button className="mybutton" variant="primary" type="submit">
                    Tantárgy felvétele
                </Button>
            </div>
        </Form>
    );
}
