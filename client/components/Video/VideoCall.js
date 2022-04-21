import { JitsiMeeting } from "@jitsi/react-sdk";

const VideoCall = () => {
  return (
    <JitsiMeeting
      domain={YOUR_DOMAIN}
      roomName="PleaseUseAGoodRoomName"
      configOverwrite={{
        startWithAudioMuted: true,
        disableModeratorIndicator: true,
        startScreenSharing: true,
        enableEmailInStats: false,
      }}
      interfaceConfigOverwrite={{
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
      }}
      userInfo={{
        displayName: "RJ",
      }}
      onApiReady={(externalApi) => {
        // here you can attach custom event listeners to the Jitsi Meet External API
        // you can also store it locally to execute commands
      }}
      getIFrameRef={(iframe) => {
        iframeRef.style.height = 400;
      }}
    />
  );
};

export default VideoCall;
