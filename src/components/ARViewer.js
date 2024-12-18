// src/components/ARViewer.js

import React, { useEffect, useRef } from "react";
import { bootstrapCameraKit } from "@snap/camera-kit";

const ARViewer = ({ apiToken, lensId, lensGroupId }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let session;
    (async function initializeAR() {
      try {
        const cameraKit = await bootstrapCameraKit({ apiToken });

        if (canvasRef.current) {
          session = await cameraKit.createSession({ liveRenderTarget: canvasRef.current });

          const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user" }
          });

          await session.setSource(mediaStream);
          await session.play();

          const lens = await cameraKit.lensRepository.loadLens(lensId, lensGroupId);
          await session.applyLens(lens);
        }
      } catch (error) {
        console.error("Error initializing AR session:", error);
      }
    })();

    return () => {
      if (session) {
        session.stop();
      }
    };
  }, [apiToken, lensId, lensGroupId]);

  return (
    <canvas
      ref={canvasRef}
      width="640"  // Increased width for higher resolution
      height="480" // Increased height for higher resolution
      style={{
        border: "2px solid #ccc",
        borderRadius: "10px",
        width: "640px", // CSS width
        height: "480px" // CSS height
      }}
    />
  );
};

export default ARViewer;
