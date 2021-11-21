import React from "react";

import { Header, VerifyMain, Footer } from "@components";

const Verify: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <VerifyMain />
      <Footer />
    </div>
  );
};

export default Verify;