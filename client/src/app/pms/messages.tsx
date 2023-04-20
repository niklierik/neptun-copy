import { Form, Button } from "react-bootstrap";
import { Message } from "./message";
import { useEffect } from "react";

export function Messages() {
    useEffect(() => {
        const objDiv = document.getElementById("messages-list");
        if (objDiv) {
            objDiv.scrollTop = objDiv.scrollHeight;
        }
    }, []);
    return (
        <div className="flex_child_mail">
            <div className="mail">
                <p className="main_white_color blue_border">Név (Email)</p>
                <div id="messages-list" className="messages-list">
                    <Message
                        you={false}
                        message="asd"
                        other={""}
                        time={new Date()}
                    ></Message>
                    <Message
                        you={true}
                        message="asd"
                        other={""}
                        time={new Date()}
                    ></Message>
                    <Message
                        you={true}
                        message="asd"
                        other={""}
                        time={new Date()}
                    ></Message>
                    <Message
                        you={false}
                        message="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
                        other={""}
                        time={new Date()}
                    ></Message>
                    <Message
                        you={true}
                        message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                        other={""}
                        time={new Date()}
                    ></Message>
                    <Message
                        you={true}
                        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pulvinar finibus sagittis. Nam id lacus et nisl faucibus blandit non vel erat. Curabitur consequat risus leo. Pellentesque mattis aliquam ligula cursus elementum. Integer pulvinar orci non consequat vestibulum. Aliquam ut ante in enim consectetur elementum sit amet nec eros. Fusce ullamcorper, ex ut tempor luctus, tortor tortor pharetra sem, eu tincidunt ipsum arcu ac massa. Ut vitae nisl hendrerit, maximus nulla eget, porttitor lectus. Integer sagittis metus enim, eu fermentum velit gravida in. Morbi ut mollis eros. Morbi molestie in lacus sit amet fermentum."
                        other={""}
                        time={new Date()}
                    ></Message>
                    <Message
                        you={false}
                        message="asd"
                        other={""}
                        time={new Date()}
                    ></Message>
                </div>
                <div className="send_mail">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Control as="textarea" />
                        </Form.Group>

                        <div className="to_center">
                            <Button
                                className="mail_button"
                                variant="primary"
                                type="submit"
                            >
                                Küldés
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
