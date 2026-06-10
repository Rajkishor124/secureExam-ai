import { useEffect, useRef, useState } from "react";

function WebcamMonitor({ isActive = true }) {
  const videoRef = useRef();
  const canvasRef = useRef();
  const streamRef = useRef(null);
  const [cameraError, setCameraError] = useState(false);

  // START / STOP WEBCAM based on isActive prop
  useEffect(() => {
    if (!isActive) {
      // Stop any existing stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      return;
    }

    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        streamRef.current = stream;
        setCameraError(false);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.log("Camera access denied:", error);
        setCameraError(true);
      }
    };

    startWebcam();

    // Cleanup: stop all tracks when component unmounts or isActive becomes false
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [isActive]);

  // CAPTURE SNAPSHOT every 30 seconds
  useEffect(() => {
    if (!isActive) return;

    const captureImage = () => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toDataURL("image/png");
        console.log("Snapshot Captured");
      }
    };

    const interval = setInterval(captureImage, 30000);

    return () => clearInterval(interval);
  }, [isActive]);

  if (cameraError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-red-100 border-b border-red-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-red-700 text-sm font-medium">Camera Error</span>
          </div>
        </div>
        <div className="p-4 text-center">
          <svg className="w-8 h-8 text-red-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
          <p className="text-xs text-red-600 font-medium">Camera access denied</p>
          <p className="text-xs text-red-500 mt-1">Please allow camera access</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isActive ? "bg-emerald-500 animate-pulse" : "bg-gray-400"}`} />
          <span className={`text-sm font-medium ${isActive ? "text-emerald-700" : "text-gray-500"}`}>
            {isActive ? "Live" : "Inactive"}
          </span>
        </div>
        <span className="text-gray-500 text-xs font-medium">AI Proctoring</span>
      </div>

      <video
        ref={videoRef}
        autoPlay
        muted
        className="w-full aspect-video object-cover bg-gray-100"
      />

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}

export default WebcamMonitor;