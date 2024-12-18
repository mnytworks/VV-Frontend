import React from "react";
import { useLocation } from "react-router-dom";
import ARViewer from "../components/ARViewer";

const ARViewerPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const apiToken = searchParams.get("apiToken");
  const lensId = searchParams.get("lensId");
  const lensGroupId = searchParams.get("lensGroupId");

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>AR Try-On Viewer</h2>
      <ARViewer apiToken={apiToken} lensId={lensId} lensGroupId={lensGroupId} />
    </div>
  );
};

export default ARViewerPage;
