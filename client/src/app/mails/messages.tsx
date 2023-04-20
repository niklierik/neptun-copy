"use client";

import { Card } from "react-bootstrap";

export interface MessagesProps {
    sender: boolean;
    message: string;
}

export function Messages({ sender, message }: MessagesProps) {

    if (sender) {
        return <div className="right_mail">
            <Card style={{ width: '18rem' }}
                bg="primary"
                text="white">

                <Card.Body>
                    <Card.Text>
                        {message}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    }
    return <div className="left_mail">
        <Card style={{ width: '18rem' }}>

            <Card.Body>
                <Card.Text>
                    {message}
                </Card.Text>
            </Card.Body>
        </Card>
    </div>


}