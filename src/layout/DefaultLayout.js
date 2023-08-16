/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import { Layout } from "antd";
import React from "react";
import AppContent from "../components/AppContent";
import { AppHeader } from "src/components";

const { Footer } = Layout;
const DefaultLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader />
      <Layout>
        <AppContent />
      </Layout>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Bản quyền thuộc về <a href="">TMN</a>
      </Footer>
    </Layout>
  );
};

export default DefaultLayout;
