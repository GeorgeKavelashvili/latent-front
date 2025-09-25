// "use client";
// import { useState } from "react";
// import { User, Send, Video, Mic, Settings } from "lucide-react";

// export default function AvatarChat() {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   const handleSendMessage = async () => {
//     if (message.trim()) {
//       const userMessage = message.trim();

//       // Add user message to chat
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { text: userMessage, type: "user" },
//       ]);
//       setMessage("");

//       try {
//         // Send message to your API
//         const response = await fetch("http://robot.nick.ge:8000/chat/send", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ message: userMessage }),
//         });

//         const data = await response.json();

//         // Extract response text
//         const modelText = data.parts.map((p) => p.text).join("");

//         // Add AI response to chat
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           { text: modelText, type: "ai" },
//         ]);

//         // Play audio if available
//         if (data.audio) {
//           try {
//             const audioBytes = atob(data.audio);
//             const buffer = new Uint8Array(audioBytes.length);
//             for (let i = 0; i < audioBytes.length; i++) {
//               buffer[i] = audioBytes.charCodeAt(i);
//             }
//             const blob = new Blob([buffer], { type: "audio/mpeg" });
//             const url = URL.createObjectURL(blob);
//             const audio = new Audio(url);

//             // Clean up the URL after audio finishes
//             audio.addEventListener("ended", () => {
//               URL.revokeObjectURL(url);
//             });

//             audio.play().catch(console.error);
//           } catch (audioError) {
//             console.error("Error playing audio:", audioError);
//           }
//         }
//       } catch (error) {
//         console.error("Error sending message:", error);
//         // Add error message to chat
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           {
//             text: "Sorry, there was an error processing your message.",
//             type: "ai",
//           },
//         ]);
//       }
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   // Inline styles
//   const containerStyle = {
//     display: "flex",
//     height: "100vh",
//     backgroundColor: "#000000",
//     overflow: "hidden",
//     fontFamily:
//       '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
//   };

//   const chatPanelStyle = {
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//     background:
//       "linear-gradient(180deg, #000000 0%, rgba(17, 24, 39, 0.3) 50%, #000000 100%)",
//   };

//   const messagesContainerStyle = {
//     flex: 1,
//     overflowY: "auto",
//     padding: "32px",
//   };

//   const welcomeContainerStyle = {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     height: "100%",
//   };

//   const welcomeContentStyle = {
//     textAlign: "center",
//     maxWidth: "384px",
//   };

//   const welcomeAvatarStyle = {
//     width: "96px",
//     height: "96px",
//     margin: "0 auto 32px",
//     borderRadius: "50%",
//     background:
//       "linear-gradient(135deg, rgba(34, 211, 238, 0.2), rgba(16, 185, 129, 0.2))",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     backdropFilter: "blur(4px)",
//     border: "1px solid rgba(255, 255, 255, 0.1)",
//   };

//   const messagesListStyle = {
//     display: "flex",
//     flexDirection: "column",
//     gap: "32px",
//     maxWidth: "896px",
//   };

//   const messageGroupStyle = {
//     display: "flex",
//     flexDirection: "column",
//     gap: "16px",
//   };

//   // User message now on LEFT
//   const userMessageContainerStyle = {
//     display: "flex",
//     justifyContent: "flex-start",
//   };

//   const userMessageStyle = {
//     maxWidth: "448px",
//     background:
//       "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.15))",
//     backdropFilter: "blur(8px)",
//     border: "1px solid rgba(16, 185, 129, 0.25)",
//     borderRadius: "24px",
//     borderTopLeftRadius: "8px",
//     padding: "16px 24px",
//     boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
//   };

//   // AI message now on RIGHT
//   const aiMessageContainerStyle = {
//     display: "flex",
//     justifyContent: "flex-end",
//   };

//   const aiMessageStyle = {
//     maxWidth: "448px",
//     background:
//       "linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(6, 182, 212, 0.15))",
//     backdropFilter: "blur(8px)",
//     border: "1px solid rgba(6, 182, 212, 0.25)",
//     borderRadius: "24px",
//     borderTopRightRadius: "8px",
//     padding: "16px 24px",
//     boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
//   };

//   const aiHeaderStyle = {
//     display: "flex",
//     alignItems: "center",
//     gap: "12px",
//     marginBottom: "12px",
//   };

//   const aiAvatarStyle = {
//     width: "28px",
//     height: "28px",
//     borderRadius: "50%",
//     background:
//       "linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(34, 211, 238, 0.3))",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     border: "1px solid rgba(6, 182, 212, 0.2)",
//   };

//   const aiIndicatorStyle = {
//     width: "10px",
//     height: "10px",
//     backgroundColor: "#06B6D4",
//     borderRadius: "50%",
//   };

//   // Simplified input container
//   const inputContainerStyle = {
//     borderTop: "1px solid rgba(255, 255, 255, 0.1)",
//     backgroundColor: "rgba(0, 0, 0, 0.8)",
//     backdropFilter: "blur(12px)",
//     padding: "24px",
//   };

//   const inputWrapperStyle = {
//     maxWidth: "896px",
//     margin: "0 auto",
//     display: "flex",
//     gap: "12px",
//     alignItems: "flex-end",
//   };

//   // Simple input field
//   const inputFieldStyle = {
//     flex: 1,
//     backgroundColor: "rgba(255, 255, 255, 0.1)",
//     border: "1px solid rgba(255, 255, 255, 0.2)",
//     borderRadius: "12px",
//     padding: "12px 16px",
//     color: "white",
//     fontSize: "16px",
//     outline: "none",
//     resize: "none",
//     minHeight: "20px",
//     maxHeight: "120px",
//     backdropFilter: "blur(8px)",
//     transition: "all 0.2s ease",
//   };

//   // Simple send button
//   const sendButtonStyle = {
//     padding: "12px 16px",
//     borderRadius: "12px",
//     border: "none",
//     cursor: message.trim() ? "pointer" : "not-allowed",
//     transition: "all 0.2s ease",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     minWidth: "50px",
//     ...(message.trim()
//       ? {
//           background:
//             "linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(16, 185, 129, 0.3))",
//           color: "#67E8F9",
//           border: "1px solid rgba(6, 182, 212, 0.4)",
//           boxShadow: "0 4px 16px rgba(6, 182, 212, 0.25)",
//         }
//       : {
//           color: "rgba(255, 255, 255, 0.4)",
//           background: "rgba(255, 255, 255, 0.05)",
//           border: "1px solid rgba(255, 255, 255, 0.1)",
//         }),
//   };

//   const avatarPanelStyle = {
//     width: "650px",
//     backgroundColor: "#000000",
//     borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     position: "relative",
//   };

//   const avatarBackgroundStyle = {
//     position: "absolute",
//     inset: 0,
//     background:
//       "linear-gradient(135deg, rgba(0, 255, 209, 0.05), transparent, rgba(0, 255, 209, 0.03))",
//     pointerEvents: "none",
//   };

//   const glowStyle1 = {
//     position: "absolute",
//     top: "25%",
//     right: "25%",
//     width: "256px",
//     height: "256px",
//     background: "rgba(0, 255, 209, 0.2)",
//     borderRadius: "50%",
//     filter: "blur(100px)",
//     animation: "pulse 2s infinite",
//   };

//   const glowStyle2 = {
//     position: "absolute",
//     bottom: "25%",
//     left: "25%",
//     width: "192px",
//     height: "192px",
//     background: "rgba(111, 210, 192, 0.2)",
//     borderRadius: "50%",
//     filter: "blur(80px)",
//     animation: "pulse 2s infinite",
//     animationDelay: "2s",
//   };

//   const avatarMainStyle = {
//     position: "relative",
//     zIndex: 10,
//     textAlign: "center",
//   };

//   const avatarCircleStyle = {
//     width: "288px",
//     height: "288px",
//     margin: "0 auto 24px",
//     borderRadius: "50%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     position: "relative",
//   };

//   const avatarGlowStyle = {
//     position: "absolute",
//     inset: 0,
//     background:
//       "linear-gradient(135deg, rgba(0, 255, 209, 0.3), rgba(111, 210, 192, 0.3))",
//     borderRadius: "50%",
//     filter: "blur(12px)",
//   };

//   const avatarInnerStyle = {
//     position: "relative",
//     width: "100%",
//     height: "100%",
//     background:
//       "linear-gradient(135deg, rgba(0, 255, 209, 0.1), rgba(111, 210, 192, 0.1))",
//     borderRadius: "50%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     backdropFilter: "blur(8px)",
//     border: "1px solid rgba(0, 255, 209, 0.2)",
//   };

//   const bottomButtonsStyle = {
//     position: "absolute",
//     bottom: "32px",
//     left: "50%",
//     transform: "translateX(-50%)",
//     display: "flex",
//     gap: "16px",
//   };

//   const iconButtonStyle = {
//     padding: "12px",
//     background: "rgba(255, 255, 255, 0.05)",
//     backdropFilter: "blur(8px)",
//     border: "1px solid rgba(255, 255, 255, 0.1)",
//     color: "rgba(255, 255, 255, 0.6)",
//     borderRadius: "12px",
//     cursor: "pointer",
//     transition: "all 0.2s ease",
//   };

//   return (
//     <>
//       <style>{`
//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.5; }
//         }

//         button:hover {
//           transform: scale(1.05);
//         }

//         button:active {
//           transform: scale(0.95);
//         }

//         input:focus, textarea:focus {
//           border-color: rgba(0, 255, 209, 0.4) !important;
//           box-shadow: 0 0 0 2px rgba(0, 255, 209, 0.1) !important;
//         }

//         input::placeholder, textarea::placeholder {
//           color: rgba(255, 255, 255, 0.4) !important;
//         }

//         ::-webkit-scrollbar {
//           width: 6px;
//         }

//         ::-webkit-scrollbar-track {
//           background: rgba(0, 0, 0, 0.2);
//         }

//         ::-webkit-scrollbar-thumb {
//           background: rgba(255, 255, 255, 0.2);
//           border-radius: 3px;
//         }

//         ::-webkit-scrollbar-thumb:hover {
//           background: rgba(255, 255, 255, 0.3);
//         }
//       `}</style>

//       <div style={containerStyle}>
//         {/* Enhanced Chat Panel */}
//         <div style={chatPanelStyle}>
//           {/* Messages */}
//           <div style={messagesContainerStyle}>
//             {messages.length === 0 ? (
//               <div style={welcomeContainerStyle}>
//                 <div style={welcomeContentStyle}>
//                   <div style={welcomeAvatarStyle}>
//                     <User
//                       size={36}
//                       style={{
//                         color: "rgba(34, 211, 238, 0.7)",
//                         strokeWidth: "1.5px",
//                       }}
//                     />
//                   </div>
//                   <h2
//                     style={{
//                       color: "rgba(255, 255, 255, 0.7)",
//                       fontSize: "20px",
//                       fontWeight: "600",
//                       marginBottom: "12px",
//                       margin: "0 0 12px 0",
//                     }}
//                   >
//                     Welcome to AI Chat
//                   </h2>
//                   <p
//                     style={{
//                       color: "rgba(255, 255, 255, 0.4)",
//                       fontSize: "16px",
//                       lineHeight: "1.5",
//                       margin: 0,
//                     }}
//                   >
//                     Start a conversation by typing your message below. I'm here
//                     to help with anything you need.
//                   </p>
//                 </div>
//               </div>
//             ) : (
//               <div style={messagesListStyle}>
//                 {messages.map((msg, idx) => (
//                   <div key={idx} style={messageGroupStyle}>
//                     {msg.type === "user" ? (
//                       // User message on LEFT
//                       <div style={userMessageContainerStyle}>
//                         <div style={{ maxWidth: "448px" }}>
//                           <div style={userMessageStyle}>
//                             <p
//                               style={{
//                                 color: "rgba(255, 255, 255, 0.95)",
//                                 fontSize: "16px",
//                                 lineHeight: "1.5",
//                                 fontWeight: "500",
//                                 margin: 0,
//                               }}
//                             >
//                               {msg.text}
//                             </p>
//                           </div>
//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "flex-start",
//                               marginTop: "8px",
//                               gap: "8px",
//                             }}
//                           >
//                             <span
//                               style={{
//                                 color: "rgba(255, 255, 255, 0.3)",
//                                 fontSize: "12px",
//                               }}
//                             >
//                               Just now
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     ) : (
//                       // AI message on RIGHT
//                       <div style={aiMessageContainerStyle}>
//                         <div style={{ maxWidth: "448px" }}>
//                           <div style={aiMessageStyle}>
//                             <div style={aiHeaderStyle}>
//                               <div style={aiAvatarStyle}>
//                                 <div style={aiIndicatorStyle}></div>
//                               </div>
//                               <span
//                                 style={{
//                                   color: "#06B6D4",
//                                   fontSize: "14px",
//                                   fontWeight: "600",
//                                 }}
//                               >
//                                 AI Assistant
//                               </span>
//                             </div>
//                             <p
//                               style={{
//                                 color: "rgba(255, 255, 255, 0.85)",
//                                 fontSize: "16px",
//                                 lineHeight: "1.5",
//                                 margin: 0,
//                               }}
//                             >
//                               {msg.text}
//                             </p>
//                           </div>
//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "flex-end",
//                               marginTop: "8px",
//                               gap: "8px",
//                             }}
//                           >
//                             <span
//                               style={{
//                                 color: "rgba(255, 255, 255, 0.3)",
//                                 fontSize: "12px",
//                               }}
//                             >
//                               Just now
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Simplified Input Container */}
//           <div style={inputContainerStyle}>
//             <div style={inputWrapperStyle}>
//               <textarea
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Type your message..."
//                 style={inputFieldStyle}
//                 rows={1}
//               />
//               <button
//                 onClick={handleSendMessage}
//                 disabled={!message.trim()}
//                 style={sendButtonStyle}
//                 title="Send message"
//               >
//                 <Send size={20} style={{ strokeWidth: "1.5px" }} />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Avatar Panel */}
//         <div style={avatarPanelStyle}>
//           <div style={avatarBackgroundStyle}></div>

//           <div style={glowStyle1}></div>
//           <div style={glowStyle2}></div>

//           <div style={avatarMainStyle}>
//             <div>
//               <div style={avatarCircleStyle}>
//                 <div style={avatarGlowStyle}></div>
//                 <div style={avatarInnerStyle}>
//                   <User
//                     size={72}
//                     style={{
//                       color: "rgba(0, 255, 209, 0.6)",
//                       strokeWidth: "1px",
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>

//             <p
//               style={{
//                 color: "rgba(255, 255, 255, 0.5)",
//                 fontSize: "16px",
//                 fontWeight: "300",
//                 margin: 0,
//               }}
//             >
//               Avatar will appear here
//             </p>
//             <p
//               style={{
//                 color: "#4d4d4d",
//                 fontSize: "14px",
//                 marginTop: "8px",
//                 fontWeight: "300",
//                 margin: "8px 0 0 0",
//               }}
//             >
//               Ready for 3D model integration
//             </p>
//           </div>

//           <div style={bottomButtonsStyle}>
//             <button
//               style={iconButtonStyle}
//               title="Camera"
//               onMouseEnter={(e) => {
//                 e.target.style.color = "white";
//                 e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
//                 e.target.style.borderColor = "rgba(0, 255, 209, 0.3)";
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.color = "rgba(255, 255, 255, 0.6)";
//                 e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
//                 e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
//               }}
//             >
//               <Video size={22} style={{ strokeWidth: "1.5px" }} />
//             </button>
//             <button
//               style={iconButtonStyle}
//               title="Microphone"
//               onMouseEnter={(e) => {
//                 e.target.style.color = "white";
//                 e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
//                 e.target.style.borderColor = "rgba(0, 255, 209, 0.3)";
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.color = "rgba(255, 255, 255, 0.6)";
//                 e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
//                 e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
//               }}
//             >
//               <Mic size={22} style={{ strokeWidth: "1.5px" }} />
//             </button>
//             <button
//               style={iconButtonStyle}
//               title="Settings"
//               onMouseEnter={(e) => {
//                 e.target.style.color = "white";
//                 e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
//                 e.target.style.borderColor = "rgba(0, 255, 209, 0.3)";
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.color = "rgba(255, 255, 255, 0.6)";
//                 e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
//                 e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
//               }}
//             >
//               <Settings size={22} style={{ strokeWidth: "1.5px" }} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
"use client";
import { useState, useEffect, useRef } from "react";
import { User, Send, Video, Mic, Settings } from "lucide-react";

// Extend Window interface for TalkingHead
declare global {
  interface Window {
    TalkingHead: any;
    talkingHeadLoaded: boolean;
  }
}

export default function AvatarChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const [avatarError, setAvatarError] = useState(null);
  const avatarRef = useRef(null);
  const headRef = useRef(null);

  // Load scripts and initialize avatar
  useEffect(() => {
    const initAvatar = async () => {
      try {
        // Check if TalkingHead is already loaded globally
        if (window.TalkingHead) {
          await initializeTalkingHead();
          return;
        }

        // Add import map if it doesn't exist
        if (!document.querySelector('script[type="importmap"]')) {
          const importMap = document.createElement("script");
          importMap.type = "importmap";
          importMap.textContent = JSON.stringify({
            imports: {
              three:
                "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js/+esm",
              "three/addons/":
                "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/",
              talkinghead:
                "https://cdn.jsdelivr.net/gh/met4citizen/TalkingHead@1.5/modules/talkinghead.mjs",
            },
          });
          document.head.appendChild(importMap);
        }

        // Load TalkingHead as a module script
        const script = document.createElement("script");
        script.type = "module";
        script.innerHTML = `
          import { TalkingHead } from "talkinghead";
          window.TalkingHead = TalkingHead;
          window.talkingHeadLoaded = true;
        `;

        document.head.appendChild(script);

        // Wait for the script to load
        const checkLoaded = () => {
          return new Promise((resolve) => {
            const interval = setInterval(() => {
              if (window.TalkingHead) {
                clearInterval(interval);
                resolve();
              }
            }, 100);
          });
        };

        await checkLoaded();
        await initializeTalkingHead();
      } catch (error) {
        console.error("Failed to load avatar:", error);
        setAvatarError("Failed to load avatar. Audio will still work.");
      }
    };

    const initializeTalkingHead = async () => {
      if (!avatarRef.current || !window.TalkingHead) return;

      // Create TalkingHead instance
      const head = new window.TalkingHead(avatarRef.current, {
        ttsEndpoint: "/gtts/",
        ttsApikey: "dummy-key-not-used",
        lipsyncModules: ["en"],
        lipsyncLang: "en",
        pcmSampleRate: 22050,
        modelFPS: 120,
        cameraView: "upper",
        avatarMood: "neutral",
      });

      headRef.current = head;

      // Load the avatar
      await head.showAvatar({
        url: `http://robot.nick.ge:8000/avatar/get?f=woman-ginger.glb`,
        body: "M",
        avatarMood: "neutral",
        lipsyncLang: "en",
      });

      setAvatarLoaded(true);
      console.log("Avatar loaded successfully");
    };

    initAvatar();

    // Cleanup function
    return () => {
      if (headRef.current) {
        headRef.current = null;
      }
    };
  }, []);

  // Convert base64 audio to AudioBuffer for lip-sync
  const base64ToAudioBuffer = async (base64Audio) => {
    try {
      const audioBytes = atob(base64Audio);
      const buffer = new Uint8Array(audioBytes.length);
      for (let i = 0; i < audioBytes.length; i++) {
        buffer[i] = audioBytes.charCodeAt(i);
      }

      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const audioBuffer = await audioContext.decodeAudioData(buffer.buffer);
      return audioBuffer;
    } catch (error) {
      console.error("Error converting audio:", error);
      return null;
    }
  };

  // Play audio with avatar lip-sync
  const playAudioWithLipSync = async (base64Audio, lipsyncData, text) => {
    if (!headRef.current) {
      // Fallback to regular audio if avatar not loaded
      const audioBytes = atob(base64Audio);
      const buffer = new Uint8Array(audioBytes.length);
      for (let i = 0; i < audioBytes.length; i++) {
        buffer[i] = audioBytes.charCodeAt(i);
      }
      const blob = new Blob([buffer], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);

      audio.addEventListener("ended", () => {
        URL.revokeObjectURL(url);
      });

      audio.play().catch(console.error);
      return;
    }

    try {
      const audioBuffer = await base64ToAudioBuffer(base64Audio);
      if (!audioBuffer) {
        throw new Error("Failed to decode audio");
      }

      // Use lip-sync data from backend if available
      let words, wtimes, wdurations;

      if (lipsyncData && lipsyncData.words) {
        words = lipsyncData.words;
        wtimes = lipsyncData.wtimes;
        wdurations = lipsyncData.wdurations;
      } else {
        // Fallback to basic estimation
        words = text.split(/\s+/).filter((word) => word.length > 0);
        const duration = audioBuffer.duration * 1000;
        wtimes = [];
        wdurations = [];
        let currentTime = 0;

        words.forEach((word, index) => {
          const wordDuration = Math.max(200, word.length * 50);
          wtimes.push(currentTime);
          wdurations.push(wordDuration);
          currentTime += wordDuration;
        });
      }

      // Use speakAudio method for lip-sync
      headRef.current.speakAudio({
        audio: audioBuffer,
        words: words,
        wtimes: wtimes,
        wdurations: wdurations,
      });
    } catch (error) {
      console.error("Error playing audio with lip-sync:", error);
      // Fallback to regular audio
      const audioBytes = atob(base64Audio);
      const buffer = new Uint8Array(audioBytes.length);
      for (let i = 0; i < audioBytes.length; i++) {
        buffer[i] = audioBytes.charCodeAt(i);
      }
      const blob = new Blob([buffer], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);

      audio.addEventListener("ended", () => {
        URL.revokeObjectURL(url);
      });

      audio.play().catch(console.error);
    }
  };

  const handleSendMessage = async () => {
    if (message.trim() && !isLoading) {
      const userMessage = message.trim();
      setIsLoading(true);

      // Add user message to chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: userMessage, type: "user" },
      ]);
      setMessage("");

      // Add loading message
      const loadingMessage = { text: "AI is typing...", type: "loading" };
      setMessages((prevMessages) => [...prevMessages, loadingMessage]);

      try {
        // Send message to your API
        const response = await fetch("http://robot.nick.ge:8000/chat/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();

        // Extract response text
        const modelText = data.parts.map((p) => p.text).join("");

        // Remove loading message and add AI response
        setMessages((prevMessages) =>
          prevMessages
            .filter((msg) => msg.type !== "loading")
            .concat([{ text: modelText, type: "ai" }])
        );

        // Play audio with lip-sync if available
        if (data.audio && modelText) {
          await playAudioWithLipSync(data.audio, data.lipsync, modelText);
        }
      } catch (error) {
        console.error("Error sending message:", error);
        // Remove loading message and add error message
        setMessages((prevMessages) =>
          prevMessages
            .filter((msg) => msg.type !== "loading")
            .concat([
              {
                text: "Sorry, there was an error processing your message.",
                type: "ai",
              },
            ])
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Inline styles (keeping your existing styles)
  const containerStyle = {
    display: "flex",
    height: "100vh",
    backgroundColor: "#000000",
    overflow: "hidden",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  };

  const chatPanelStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    background:
      "linear-gradient(180deg, #000000 0%, rgba(17, 24, 39, 0.3) 50%, #000000 100%)",
  };

  const messagesContainerStyle = {
    flex: 1,
    overflowY: "auto",
    padding: "32px",
  };

  const welcomeContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  };

  const welcomeContentStyle = {
    textAlign: "center",
    maxWidth: "384px",
  };

  const welcomeAvatarStyle = {
    width: "96px",
    height: "96px",
    margin: "0 auto 32px",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg, rgba(34, 211, 238, 0.2), rgba(16, 185, 129, 0.2))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  };

  const messagesListStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "32px",
    maxWidth: "896px",
  };

  const messageGroupStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  const userMessageContainerStyle = {
    display: "flex",
    justifyContent: "flex-start",
  };

  const userMessageStyle = {
    maxWidth: "448px",
    background:
      "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.15))",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(16, 185, 129, 0.25)",
    borderRadius: "24px",
    borderTopLeftRadius: "8px",
    padding: "16px 24px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  };

  const aiMessageContainerStyle = {
    display: "flex",
    justifyContent: "flex-end",
  };

  const aiMessageStyle = {
    maxWidth: "448px",
    background:
      "linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(6, 182, 212, 0.15))",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(6, 182, 212, 0.25)",
    borderRadius: "24px",
    borderTopRightRadius: "8px",
    padding: "16px 24px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  };

  const loadingMessageStyle = {
    ...aiMessageStyle,
    background:
      "linear-gradient(135deg, rgba(255, 193, 7, 0.2), rgba(255, 193, 7, 0.15))",
    border: "1px solid rgba(255, 193, 7, 0.25)",
  };

  const aiHeaderStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "12px",
  };

  const aiAvatarStyle = {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(34, 211, 238, 0.3))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(6, 182, 212, 0.2)",
  };

  const aiIndicatorStyle = {
    width: "10px",
    height: "10px",
    backgroundColor: "#06B6D4",
    borderRadius: "50%",
  };

  const inputContainerStyle = {
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    backdropFilter: "blur(12px)",
    padding: "24px",
  };

  const inputWrapperStyle = {
    maxWidth: "896px",
    margin: "0 auto",
    display: "flex",
    gap: "12px",
    alignItems: "flex-end",
  };

  const inputFieldStyle = {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "12px",
    padding: "12px 16px",
    color: "white",
    fontSize: "16px",
    outline: "none",
    resize: "none",
    minHeight: "20px",
    maxHeight: "120px",
    backdropFilter: "blur(8px)",
    transition: "all 0.2s ease",
  };

  const sendButtonStyle = {
    padding: "12px 16px",
    borderRadius: "12px",
    border: "none",
    cursor: message.trim() && !isLoading ? "pointer" : "not-allowed",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "50px",
    ...(message.trim() && !isLoading
      ? {
          background:
            "linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(16, 185, 129, 0.3))",
          color: "#67E8F9",
          border: "1px solid rgba(6, 182, 212, 0.4)",
          boxShadow: "0 4px 16px rgba(6, 182, 212, 0.25)",
        }
      : {
          color: "rgba(255, 255, 255, 0.4)",
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }),
  };

  const avatarPanelStyle = {
    width: "650px",
    backgroundColor: "#000000",
    borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  };

  const avatarBackgroundStyle = {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(135deg, rgba(0, 255, 209, 0.05), transparent, rgba(0, 255, 209, 0.03))",
    pointerEvents: "none",
  };

  const avatarContainerStyle = {
    width: "100%",
    height: "600px",
    position: "relative",
    zIndex: 10,
  };

  const statusTextStyle = {
    position: "absolute",
    bottom: "100px",
    left: "50%",
    transform: "translateX(-50%)",
    textAlign: "center",
    color: avatarLoaded
      ? "rgba(0, 255, 209, 0.6)"
      : avatarError
      ? "rgba(255, 0, 0, 0.6)"
      : "rgba(255, 255, 255, 0.5)",
    fontSize: "14px",
    fontWeight: "300",
  };

  const glowStyle1 = {
    position: "absolute",
    top: "25%",
    right: "25%",
    width: "256px",
    height: "256px",
    background: "rgba(0, 255, 209, 0.2)",
    borderRadius: "50%",
    filter: "blur(100px)",
    animation: "pulse 2s infinite",
  };

  const glowStyle2 = {
    position: "absolute",
    bottom: "25%",
    left: "25%",
    width: "192px",
    height: "192px",
    background: "rgba(111, 210, 192, 0.2)",
    borderRadius: "50%",
    filter: "blur(80px)",
    animation: "pulse 2s infinite",
    animationDelay: "2s",
  };

  const bottomButtonsStyle = {
    position: "absolute",
    bottom: "32px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "16px",
  };

  const iconButtonStyle = {
    padding: "12px",
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "rgba(255, 255, 255, 0.6)",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        button:hover {
          transform: scale(1.05);
        }

        button:active {
          transform: scale(0.95);
        }

        input:focus, textarea:focus {
          border-color: rgba(0, 255, 209, 0.4) !important;
          box-shadow: 0 0 0 2px rgba(0, 255, 209, 0.1) !important;
        }

        input::placeholder, textarea::placeholder {
          color: rgba(255, 255, 255, 0.4) !important;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        @keyframes typing {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0.5; }
        }

        .typing-indicator {
          animation: typing 1.5s infinite;
        }
      `}</style>

      <div style={containerStyle}>
        {/* Enhanced Chat Panel */}
        <div style={chatPanelStyle}>
          {/* Messages */}
          <div style={messagesContainerStyle}>
            {messages.length === 0 ? (
              <div style={welcomeContainerStyle}>
                <div style={welcomeContentStyle}>
                  <div style={welcomeAvatarStyle}>
                    <User
                      size={36}
                      style={{
                        color: "rgba(34, 211, 238, 0.7)",
                        strokeWidth: "1.5px",
                      }}
                    />
                  </div>
                  <h2
                    style={{
                      color: "rgba(255, 255, 255, 0.7)",
                      fontSize: "20px",
                      fontWeight: "600",
                      marginBottom: "12px",
                      margin: "0 0 12px 0",
                    }}
                  >
                    Welcome to AI Avatar Chat
                  </h2>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.4)",
                      fontSize: "16px",
                      lineHeight: "1.5",
                      margin: 0,
                    }}
                  >
                    Start a conversation and watch the avatar come to life with
                    lip-synchronized speech!
                  </p>
                </div>
              </div>
            ) : (
              <div style={messagesListStyle}>
                {messages.map((msg, idx) => (
                  <div key={idx} style={messageGroupStyle}>
                    {msg.type === "user" ? (
                      // User message on LEFT
                      <div style={userMessageContainerStyle}>
                        <div style={{ maxWidth: "448px" }}>
                          <div style={userMessageStyle}>
                            <p
                              style={{
                                color: "rgba(255, 255, 255, 0.95)",
                                fontSize: "16px",
                                lineHeight: "1.5",
                                fontWeight: "500",
                                margin: 0,
                              }}
                            >
                              {msg.text}
                            </p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-start",
                              marginTop: "8px",
                              gap: "8px",
                            }}
                          >
                            <span
                              style={{
                                color: "rgba(255, 255, 255, 0.3)",
                                fontSize: "12px",
                              }}
                            >
                              Just now
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : msg.type === "loading" ? (
                      // Loading message
                      <div style={aiMessageContainerStyle}>
                        <div style={{ maxWidth: "448px" }}>
                          <div style={loadingMessageStyle}>
                            <div style={aiHeaderStyle}>
                              <div style={aiAvatarStyle}>
                                <div
                                  style={{
                                    ...aiIndicatorStyle,
                                    backgroundColor: "#FFC107",
                                  }}
                                ></div>
                              </div>
                              <span
                                style={{
                                  color: "#FFC107",
                                  fontSize: "14px",
                                  fontWeight: "600",
                                }}
                              >
                                AI Assistant
                              </span>
                            </div>
                            <p
                              style={{
                                color: "rgba(255, 255, 255, 0.85)",
                                fontSize: "16px",
                                lineHeight: "1.5",
                                margin: 0,
                              }}
                              className="typing-indicator"
                            >
                              {msg.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // AI message on RIGHT
                      <div style={aiMessageContainerStyle}>
                        <div style={{ maxWidth: "448px" }}>
                          <div style={aiMessageStyle}>
                            <div style={aiHeaderStyle}>
                              <div style={aiAvatarStyle}>
                                <div style={aiIndicatorStyle}></div>
                              </div>
                              <span
                                style={{
                                  color: "#06B6D4",
                                  fontSize: "14px",
                                  fontWeight: "600",
                                }}
                              >
                                AI Assistant
                              </span>
                            </div>
                            <p
                              style={{
                                color: "rgba(255, 255, 255, 0.85)",
                                fontSize: "16px",
                                lineHeight: "1.5",
                                margin: 0,
                              }}
                            >
                              {msg.text}
                            </p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                              marginTop: "8px",
                              gap: "8px",
                            }}
                          >
                            <span
                              style={{
                                color: "rgba(255, 255, 255, 0.3)",
                                fontSize: "12px",
                              }}
                            >
                              Just now
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Input Container */}
          <div style={inputContainerStyle}>
            <div style={inputWrapperStyle}>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                style={inputFieldStyle}
                rows={1}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim() || isLoading}
                style={sendButtonStyle}
                title="Send message"
              >
                <Send size={20} style={{ strokeWidth: "1.5px" }} />
              </button>
            </div>
          </div>
        </div>

        {/* Avatar Panel */}
        <div style={avatarPanelStyle}>
          <div style={avatarBackgroundStyle}></div>
          <div style={glowStyle1}></div>
          <div style={glowStyle2}></div>

          {/* 3D Avatar Container */}
          <div ref={avatarRef} style={avatarContainerStyle}></div>

          {/* Status Text */}
          <div style={statusTextStyle}>
            {avatarError
              ? avatarError
              : avatarLoaded
              ? "Avatar ready - speak to see lip sync!"
              : "Loading 3D avatar..."}
          </div>

          <div style={bottomButtonsStyle}>
            <button
              style={iconButtonStyle}
              title="Camera"
              onMouseEnter={(e) => {
                e.target.style.color = "white";
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                e.target.style.borderColor = "rgba(0, 255, 209, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "rgba(255, 255, 255, 0.6)";
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
              }}
            >
              <Video size={22} style={{ strokeWidth: "1.5px" }} />
            </button>
            <button
              style={iconButtonStyle}
              title="Microphone"
              onMouseEnter={(e) => {
                e.target.style.color = "white";
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                e.target.style.borderColor = "rgba(0, 255, 209, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "rgba(255, 255, 255, 0.6)";
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
              }}
            >
              <Mic size={22} style={{ strokeWidth: "1.5px" }} />
            </button>
            <button
              style={iconButtonStyle}
              title="Settings"
              onMouseEnter={(e) => {
                e.target.style.color = "white";
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                e.target.style.borderColor = "rgba(0, 255, 209, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "rgba(255, 255, 255, 0.6)";
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
              }}
            >
              <Settings size={22} style={{ strokeWidth: "1.5px" }} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
