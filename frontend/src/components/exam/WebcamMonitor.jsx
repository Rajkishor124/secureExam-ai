import { useEffect, useRef } from "react";

function WebcamMonitor() {

  const videoRef = useRef();

  const canvasRef = useRef();

  // START WEBCAM
  useEffect(() => {

    const startWebcam = async () => {

      try {

        const stream =
          await navigator.mediaDevices.getUserMedia({
            video: true,
          });

        if (videoRef.current) {

          videoRef.current.srcObject = stream;

        }

      } catch (error) {

        console.log(error);

      }
    };

    startWebcam();

  }, []);


  // CAPTURE SNAPSHOT
  useEffect(() => {

    const captureImage = () => {

      if (
        videoRef.current &&
        canvasRef.current
      ) {

        const video = videoRef.current;

        const canvas = canvasRef.current;

        canvas.width = video.videoWidth;

        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");

        ctx.drawImage(
          video,
          0,
          0,
          canvas.width,
          canvas.height
        );

        canvas.toDataURL("image/png");

        console.log("Snapshot Captured");

        // Future:
        // send image to backend
      }
    };

    const interval = setInterval(
      captureImage,
      30000
    );

    return () => clearInterval(interval);

  }, []);

  return (
    <div className="mb-6">

      <video
        ref={videoRef}
        autoPlay
        muted
        className="w-72 rounded border-4 border-blue-500"
      />

      <canvas
        ref={canvasRef}
        className="hidden"
      />

    </div>
  );
}

export default WebcamMonitor;