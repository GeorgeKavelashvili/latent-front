"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, ArrowRight, Loader } from "lucide-react";

interface Avatar {
  filename: string;
  name: string;
  thumbnail?: string;
}

export default function AvatarsPage() {
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
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

      const avatarFiles: string[] = await response.json();

      // Transform filenames into avatar objects with proper names and thumbnails
      const avatarList: Avatar[] = avatarFiles.map((filename) => ({
        filename,
        name: formatAvatarName(filename),
        thumbnail: `http://robot.nick.ge:8000/avatar/thumbnail?f=${filename}`,
      }));

      setAvatars(avatarList);
    } catch (err) {
      setError("Failed to load avatars. Please try again.");
      console.error("Error fetching avatars:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatAvatarName = (filename: string): string => {
    // Remove .glb extension and format name
    const name = filename.replace(".glb", "");
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleAvatarSelect = (filename: string) => {
    setSelectedAvatar(filename);
  };

  const handleOpenChat = () => {
    if (selectedAvatar) {
      // Store selected avatar in localStorage
      localStorage.setItem("selectedAvatar", selectedAvatar);
      router.push("/chat");
    }
  };

  // Inline styles matching chat page design
  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#000000",
    background:
      "linear-gradient(180deg, #000000 0%, rgba(17, 24, 39, 0.3) 50%, #000000 100%)",
    padding: "2rem",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "3rem",
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
  };

  const subtitleStyle = {
    fontSize: "1.2rem",
    color: "rgba(255, 255, 255, 0.6)",
    margin: 0,
  };

  const avatarGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    flex: 1,
  };

  const avatarCardStyle = (isSelected) => ({
    background: isSelected
      ? "linear-gradient(135deg, rgba(0, 255, 209, 0.15), rgba(34, 211, 238, 0.15))"
      : "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))",
    backdropFilter: "blur(8px)",
    border: isSelected
      ? "2px solid rgba(0, 255, 209, 0.5)"
      : "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "20px",
    padding: "1.5rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
    boxShadow: isSelected
      ? "0 25px 50px -12px rgba(0, 255, 209, 0.25)"
      : "0 10px 30px rgba(0, 0, 0, 0.3)",
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

  const placeholderThumbnailStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
    color: "rgba(255, 255, 255, 0.4)",
  };

  const overlayStyle = (isSelected) => ({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(135deg, rgba(0, 255, 209, 0.8), rgba(34, 211, 238, 0.8))",
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

  const footerStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "3rem",
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
          transform: translateY(-2px);
        }

        button:active {
          transform: translateY(0);
        }
      `}</style>

      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Choose Your Avatar</h1>
          <p style={subtitleStyle}>
            Select an AI companion to start your conversation
          </p>
        </div>

        <div style={avatarGridStyle}>
          {avatars.map((avatar) => {
            const isSelected = selectedAvatar === avatar.filename;
            return (
              <div
                key={avatar.filename}
                style={avatarCardStyle(isSelected)}
                onClick={() => handleAvatarSelect(avatar.filename)}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.target.style.transform = "translateY(-5px)";
                    e.target.style.boxShadow =
                      "0 15px 40px rgba(0, 255, 209, 0.2)";
                    e.target.style.borderColor = "rgba(0, 255, 209, 0.3)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.3)";
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  }
                }}
              >
                <div style={thumbnailContainerStyle}>
                  {avatar.thumbnail ? (
                    <img
                      src={avatar.thumbnail}
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
                  ) : (
                    <div style={placeholderThumbnailStyle}>
                      <User size={72} />
                    </div>
                  )}
                  <div style={overlayStyle(isSelected)}>
                    <div style={selectIconStyle}>✓</div>
                  </div>
                </div>
                <div style={avatarInfoStyle}>
                  <h3 style={avatarNameStyle}>{avatar.name}</h3>
                  <p style={avatarTypeStyle}>AI Assistant</p>
                </div>
              </div>
            );
          })}
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
