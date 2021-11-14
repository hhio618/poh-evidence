import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, ProgressBar } from "react-bootstrap";
import Web3 from "web3";
import { Button } from "@components";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import axios from "axios";

export const Main: React.FC = () => {
  const [accounts, setAccounts] = useState<any>([]);
  const [web3Enabled, setWeb3Enabled] = useState(false);
  const [progressValue, setProgressValue] = useState(10);
  const [hCaptchaVerification, sethCaptchaVerification] = useState(false);
  const [signature, setSignature] = useState("");
  const [address, setAddress] = useState("");
  const signatureText = "poh-core-evidence";

  // Empty web3 instance
  let web3: Web3 = new Web3();

  const ethEnabled: any = async () => {
    if (typeof (window as any).ethereum !== "undefined") {
      // Instance web3 with the provided information from the MetaMask provider information
      web3 = new Web3((window as any).ethereum);
      try {
        // Request account access
        await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });

        return true;
      } catch (e) {
        // User denied access
        return false;
      }
    }

    return false;
  };

  const onClickConnect = async () => {
    if (await !ethEnabled()) {
      alert("Please install MetaMask to use this dApp!");
    }

    var accs = await web3.eth.getAccounts();

    const newAccounts = await Promise.all(
      accs.map(async (address: string) => {
        const balance = await web3.eth.getBalance(address);
        if (address !== null && address !== undefined) {
          setWeb3Enabled(true);
          setAddress(address);
          setProgressValue(50);
        }
        return {
          address,
          balance: web3.utils.fromWei(balance, "ether"),
        };
      })
    );

    setAccounts(newAccounts);
  };

  const onClickSign = async () => {
    if (await !ethEnabled()) {
      alert("Please install MetaMask to use this dApp!");
    }
    if (web3Enabled) {
      // web3 = new Web3((window as any).ethereum);
      await web3.eth.sign(
        web3.eth.accounts.hashMessage(signatureText),
        address,
        function (error, result) {
          if (result) {
            setSignature(result);
            setProgressValue(80);
          } else {
            alert("User does not give permission or some errors happened");
          }
        }
      );
    } else {
      alert("First connect your wallet");
    }
  };

  function onClickDisconnect() {
    setAccounts([]);
    setWeb3Enabled(false);
  }

  function handleVerificationSuccess(token: any) {
    sethCaptchaVerification(true);
    setProgressValue(100);
  }
  function sendDataToServer() {
    let data = {
      address: address,
      signature: signature,
      message: signatureText,
    };
    axios.post(process.env.FLASK_HOST!, data).then((response) => {
      if (response.status == 200) {
        alert("Data has been submitted successfully");
        location.href = "/";
      }
    });
  }
  console.log(process.env.FLASK_HOST)
  return (
    <div className="text-center py-4">
      <Container
        style={{ minHeight: "70vh" }}
        className="text-center pt-auto pb-auto"
      >
        <Row className="w-100 pl-5 pr-5 mb-3 mt-5">
          <ProgressBar now={progressValue} className="w-100" />
        </Row>
        <Row>
          <Col
            sm={4}
            className="d-flex h-100 justify-content-center align-items-center"
          >
            <Card style={{ maxWidth: "100%" }}>
              <Card.Img variant="top" src="/images/meta-mask.png" />
              <Card.Body>
                <Card.Title>Connect your wallet</Card.Title>
                <Card.Text>
                  To start connect your Meta Mask wallet (consider to click on
                  connect again after giving permission)
                </Card.Text>
                {!web3Enabled && (
                  <Button onClick={onClickConnect} variant="primary">
                    Connect
                  </Button>
                )}
                {web3Enabled && (
                  <Row className="mt-2">
                    <p className="alert alert-info">Your wallet is connected</p>
                  </Row>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col
            sm={4}
            className="d-flex h-100 justify-content-center align-items-center"
          >
            <Card style={{ maxWidth: "100%" }}>
              <Card.Img variant="top" src="/images/meta-mask.png" />
              <Card.Body>
                <Card.Title>Set Signature</Card.Title>
                <Card.Text>Mark it and sign</Card.Text>
                {signature === "" && (
                  <Button onClick={onClickSign} variant="primary">
                    Sign
                  </Button>
                )}
                {signature !== "" && (
                  <Row className="mt-2 justify-content-center w-100">
                    <p className="alert alert-info">
                      You have signed successfully
                    </p>
                  </Row>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col
            sm={4}
            className="d-flex h-100 justify-content-center align-items-center"
          >
            <Card style={{ maxWidth: "100%" }}>
              <Card.Img variant="top" src="/images/meta-mask.png" />
              <Card.Body>
                <Card.Title>Proof your humanity</Card.Title>
                <Card.Text>
                  Check the captcha and click on submit button
                </Card.Text>

                {signature !== "" && (
                  <Row className="mt-2">
                    <HCaptcha
                      sitekey="ea3fee38-caf3-4498-b3b9-95c9ac5a23e0"
                      onVerify={(token: string) =>
                        handleVerificationSuccess(token)
                      }
                    />
                  </Row>
                )}
                {hCaptchaVerification && (
                  <Button onClick={sendDataToServer} variant="success">
                    Submit
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
