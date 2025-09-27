"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, ArrowRight, Loader } from "lucide-react";

interface Avatar {
  gender: string;
  model: string;
  model_path: string;
  model_url: string;
  name: string;
  sysprompt: string;
  thumbnail: string;
  thumbnail_path: string;
  thumbnail_url: string;
  voice_id: string;
}

export default function AvatarsPage() {
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchAvatars();
  }, []);

  const fetchAvatars = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://robot.nick.ge:8000/avatar/list");

      if (!response.ok) {
        throw new Error("Failed to fetch avatars");
      }

      const data = await response.json();

      // The response now has an "avatars" array
      setAvatars(data.avatars);

      // Start from middle avatar without selecting it
      if (data.avatars.length > 0) {
        const middleIndex = Math.floor(data.avatars.length / 2);
        setCurrentIndex(middleIndex);
      }
    } catch (err) {
      setError("Failed to load avatars. Please try again.");
      console.error("Error fetching avatars:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarSelect = (model: string) => {
    setSelectedAvatar(model);
    // Update current index to match selected avatar
    const index = avatars.findIndex((a) => a.model === model);
    setCurrentIndex(index);
  };

  const handleOpenChat = () => {
    if (selectedAvatar) {
      // Store selected avatar model in localStorage
      localStorage.setItem("selectedAvatar", selectedAvatar);
      router.push("/chat");
    }
  };

  const handlePrevious = () => {
    if (!avatars.length) return;
    const prevIndex =
      currentIndex === 0 ? avatars.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    // Don't auto-select, keep previous selection
  };

  const handleNext = () => {
    if (!avatars.length) return;
    const nextIndex =
      currentIndex === avatars.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
    // Don't auto-select, keep previous selection
  };

  // Inline styles
  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#000000",
    background:
      "linear-gradient(180deg, #000000 0%, rgba(17, 24, 39, 0.3) 50%, #000000 100%)",
    padding: "2rem",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "2rem",
    zIndex: 20,
  };

  const titleStyle = {
    fontSize: "3rem",
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: "0.5rem",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
    background:
      "linear-gradient(135deg, rgba(0, 255, 209, 0.8), rgba(34, 211, 238, 0.8))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    margin: 0,
  };

  const subtitleStyle = {
    fontSize: "1.2rem",
    color: "rgba(255, 255, 255, 0.6)",
    margin: 0,
  };

  const avatarContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "70vh",
    position: "relative",
    overflow: "hidden",
    maxWidth: "100vw",
    padding: "0 4rem",
  };

  const avatarCarouselStyle = {
    display: "flex",
    gap: "2rem",
    transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    transform: `translateX(calc(50% - ${currentIndex * 320 + 150}px))`,
  };

  const avatarCardWrapperStyle = (isCenter) => ({
    minWidth: "300px",
    transform: isCenter ? "scale(1.1)" : "scale(0.85)",
    opacity: isCenter ? 1 : 0.6,
    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    zIndex: isCenter ? 10 : 1,
  });

  const avatarCardStyle = (isSelected, isCenter) => ({
    background: isSelected
      ? "linear-gradient(135deg, rgba(0, 255, 209, 0.1), rgba(34, 211, 238, 0.1))"
      : isCenter
      ? "linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.04))"
      : "linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))",
    backdropFilter: "blur(12px)",
    border: isSelected
      ? "2px solid rgba(0, 255, 209, 0.4)"
      : isCenter
      ? "1px solid rgba(255, 255, 255, 0.15)"
      : "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "24px",
    padding: "2rem",
    cursor: "pointer",
    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden",
    boxShadow: isSelected
      ? "0 25px 50px -12px rgba(0, 255, 209, 0.2)"
      : isCenter
      ? "0 20px 40px rgba(0, 0, 0, 0.4)"
      : "0 10px 20px rgba(0, 0, 0, 0.2)",
    height: "400px",
  });

  const thumbnailContainerStyle = {
    position: "relative",
    width: "100%",
    height: "250px",
    borderRadius: "15px",
    overflow: "hidden",
    marginBottom: "1rem",
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  };

  const thumbnailStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  };

  const overlayStyle = (isSelected) => ({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(135deg, rgba(0, 255, 209, 0.6), rgba(34, 211, 238, 0.6))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: isSelected ? 1 : 0,
    transition: "opacity 0.3s ease",
  });

  const selectIconStyle = {
    color: "white",
    fontSize: "3rem",
    fontWeight: "bold",
  };

  const avatarInfoStyle = {
    textAlign: "center",
  };

  const avatarNameStyle = {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.9)",
    margin: "0 0 0.5rem 0",
  };

  const avatarTypeStyle = {
    color: "rgba(255, 255, 255, 0.5)",
    margin: 0,
    fontSize: "0.9rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
  };

  const indicatorContainerStyle = {
    position: "absolute",
    bottom: "2rem",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "0.5rem",
    zIndex: 20,
  };

  const indicatorStyle = (isActive) => ({
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: isActive
      ? "linear-gradient(135deg, rgba(0, 255, 209, 0.8), rgba(34, 211, 238, 0.8))"
      : "rgba(255, 255, 255, 0.3)",
    transition: "all 0.3s ease",
    cursor: "pointer",
    boxShadow: isActive ? "0 0 20px rgba(0, 255, 209, 0.5)" : "none",
  });

  const navButtonStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg, rgba(0, 255, 209, 0.2), rgba(34, 211, 238, 0.2))",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(0, 255, 209, 0.3)",
    color: "rgba(0, 255, 209, 0.8)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    fontSize: "18px",
    fontWeight: "bold",
  };

  const leftNavStyle = {
    ...navButtonStyle,
    left: "1rem",
  };

  const rightNavStyle = {
    ...navButtonStyle,
    right: "1rem",
  };

  const footerStyle = {
    position: "fixed",
    bottom: "2rem",
    right: "2rem",
    zIndex: 1000,
  };

  const openChatButtonStyle = (enabled) => ({
    padding: "1rem 3rem",
    fontSize: "1.2rem",
    fontWeight: "600",
    border: "none",
    borderRadius: "12px",
    cursor: enabled ? "pointer" : "not-allowed",
    transition: "all 0.3s ease",
    minWidth: "200px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: enabled
      ? "linear-gradient(135deg, rgba(0, 255, 209, 0.3), rgba(34, 211, 238, 0.3))"
      : "rgba(255, 255, 255, 0.05)",
    color: enabled ? "#67E8F9" : "rgba(255, 255, 255, 0.4)",
    border: enabled
      ? "1px solid rgba(0, 255, 209, 0.4)"
      : "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: enabled ? "0 4px 16px rgba(0, 255, 209, 0.25)" : "none",
  });

  const loadingSpinnerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "60vh",
    color: "rgba(255, 255, 255, 0.7)",
  };

  const spinnerStyle = {
    marginBottom: "1rem",
  };

  const errorStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "60vh",
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
  };

  const retryButtonStyle = {
    padding: "0.8rem 2rem",
    background:
      "linear-gradient(135deg, rgba(0, 255, 209, 0.3), rgba(34, 211, 238, 0.3))",
    color: "#67E8F9",
    border: "1px solid rgba(0, 255, 209, 0.4)",
    borderRadius: "12px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "1rem",
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={loadingSpinnerStyle}>
          <Loader size={50} style={spinnerStyle} className="animate-spin" />
          <p style={{ fontSize: "1.2rem", margin: 0 }}>Loading avatars...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <div style={errorStyle}>
          <h2
            style={{
              fontSize: "2rem",
              marginBottom: "1rem",
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            Connection Error
          </h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "2rem", opacity: 0.7 }}>
            {error}
          </p>
          <button onClick={fetchAvatars} style={retryButtonStyle}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        button:hover {
          transform: translateY(-2px) !important;
        }

        button:active {
          transform: translateY(0) !important;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .floating {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Choose Your Avatar</h1>
          <p style={subtitleStyle}>
            Select an AI companion to start your conversation
          </p>
        </div>

        <div style={avatarContainerStyle}>
          {/* Left Navigation Button */}
          <button
            style={leftNavStyle}
            onClick={handlePrevious}
            onMouseEnter={(e) => {
              e.target.style.background =
                "linear-gradient(135deg, rgba(0, 255, 209, 0.3), rgba(34, 211, 238, 0.3))";
              e.target.style.transform = "translateY(-50%) scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background =
                "linear-gradient(135deg, rgba(0, 255, 209, 0.2), rgba(34, 211, 238, 0.2))";
              e.target.style.transform = "translateY(-50%) scale(1)";
            }}
          >
            ‹
          </button>

          <div style={avatarCarouselStyle}>
            {avatars.map((avatar, index) => {
              const isSelected = selectedAvatar === avatar.model;
              const isCenter = index === currentIndex;

              return (
                <div
                  key={avatar.model}
                  style={avatarCardWrapperStyle(isCenter)}
                >
                  <div
                    style={avatarCardStyle(isSelected, isCenter)}
                    onClick={() => handleAvatarSelect(avatar.model)}
                  >
                    <div style={thumbnailContainerStyle}>
                      <img
                        src={`http://robot.nick.ge:8000${avatar.thumbnail_url}`}
                        alt={avatar.name}
                        style={thumbnailStyle}
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentNode.innerHTML = `
                            <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05)); color: rgba(255, 255, 255, 0.4);">
                              <svg width="72" height="72" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                              </svg>
                            </div>
                          `;
                        }}
                      />
                      <div style={overlayStyle(isSelected)}>
                        <div style={selectIconStyle}>✓</div>
                      </div>
                    </div>
                    <div style={avatarInfoStyle}>
                      <h3 style={avatarNameStyle}>{avatar.name}</h3>
                      <p style={avatarTypeStyle}>AI Assistant</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Navigation Button */}
          <button
            style={rightNavStyle}
            onClick={handleNext}
            onMouseEnter={(e) => {
              e.target.style.background =
                "linear-gradient(135deg, rgba(0, 255, 209, 0.3), rgba(34, 211, 238, 0.3))";
              e.target.style.transform = "translateY(-50%) scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background =
                "linear-gradient(135deg, rgba(0, 255, 209, 0.2), rgba(34, 211, 238, 0.2))";
              e.target.style.transform = "translateY(-50%) scale(1)";
            }}
          >
            ›
          </button>

          {/* Navigation indicators */}
          <div style={indicatorContainerStyle}>
            {avatars.map((avatar, index) => (
              <div
                key={`indicator-${index}`}
                style={indicatorStyle(selectedAvatar === avatar.model)}
                onClick={() => handleAvatarSelect(avatar.model)}
              />
            ))}
          </div>
        </div>

        <div style={footerStyle}>
          <button
            onClick={handleOpenChat}
            disabled={!selectedAvatar}
            style={openChatButtonStyle(!!selectedAvatar)}
          >
            {selectedAvatar ? "Open Chat" : "Select an Avatar"}
            {selectedAvatar && <ArrowRight size={20} />}
          </button>
        </div>
      </div>
    </>
  );
}
