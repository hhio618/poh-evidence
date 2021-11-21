import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { Button } from "@components";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import axios from "axios";

export const VerifyMain: React.FC = () => {
  const [verifyTextAreaValue, setVerifyTextAreaValue] = React.useState("");
  function onClickVerify() {
    let data = {
      verifyText: verifyTextAreaValue,
    };
    axios
      .post(`${process.env.FLASK_HOST!}verify/`, data)
      .then((response) => {
        if (response.status == 200) {
          alert("Your identity have been verified successfully");
          // location.href = "/";
        }
      })
      .catch((error) => {
        alert("Unfortunately we cannot verify your identity try on home page");
      });
  }
  console.log(process.env.FLASK_HOST);
  return (
    <div className="text-center py-4">
      <Container
        style={{ minHeight: "75vh" }}
        className="text-center pt-auto pb-auto"
      >
        <Row className="justify-content-center">
          <Card style={{ width: "80%" }}>
            <Row className="justify-content-center">
              <Card.Img
                variant="top"
                src="/images/meta-mask.png"
                style={{ maxWidth: "50%" }}
              />
            </Row>
            <Card.Body>
              <Card.Title>Verify your humanity</Card.Title>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>
                  Enter the text that you got after verification
                </Form.Label>
                <Form.Control style={{resize: 'none'}} as="textarea" onChange={e => setVerifyTextAreaValue(e.target.value)} rows={3} required={true} />
              </Form.Group>
              <Button onClick={onClickVerify} variant="primary">
                Verify
              </Button>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
};
