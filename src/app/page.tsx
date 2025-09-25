"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// You'll need to install these dependencies:
// npm install @splinetool/react-spline @splinetool/runtime lucide-react
import Spline from "@splinetool/react-spline";
import {
  ChevronRight,
  Zap,
  Brain,
  Heart,
  Clock,
  BookOpen,
  Sparkles,
} from "lucide-react";
import router from "next/router";

const LatentLandingComplete: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const avatars = [
    {
      name: "ARIA",
      gender: "female",
      personality: "Empathetic & Intuitive",
      specialty: "Emotional Intelligence",
      description:
        "ARIA reads between the lines, understanding your emotions and providing supportive guidance.",
      icon: <Heart className="w-6 h-6" />,
    },
    {
      name: "NEXUS",
      gender: "male",
      personality: "Analytical & Precise",
      specialty: "Problem Solving",
      description:
        "NEXUS processes complex information instantly, breaking down challenges into actionable steps.",
      icon: <Brain className="w-6 h-6" />,
    },
    {
      name: "LUNA",
      gender: "female",
      personality: "Creative & Inspiring",
      specialty: "Learning & Growth",
      description:
        "LUNA sparks creativity and curiosity, making learning an engaging journey of discovery.",
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      name: "ATLAS",
      gender: "male",
      personality: "Focused & Disciplined",
      specialty: "Productivity",
      description:
        "ATLAS helps you stay on track with time management and goal achievement strategies.",
      icon: <Zap className="w-6 h-6" />,
    },
  ];
  const router = useRouter();
  const features = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Emotional Intelligence",
      description:
        "AI that understands and responds to your emotional state with genuine empathy",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Smart Timers",
      description:
        "Adaptive time management that learns your productivity patterns and optimizes focus sessions",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Study Mode",
      description:
        "Personalized learning companion that adapts to your learning style and pace",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Advanced Conversations",
      description:
        "Deep, meaningful dialogues that evolve with your needs and preferences",
    },
  ];

  return (
    <>
      {/* Embedded Styles */}

      <div className="latent-container">
        {/* Fixed Navigation */}
        <nav className="dark-header">
          <div className="dark-logo">
            <span className="logo-text">LATENT</span>
          </div>
          <div className="dark-nav">
            <a href="#features" className="dark-nav-link">
              Features
            </a>
            <a href="#avatars" className="dark-nav-link">
              Avatars
            </a>
            <a href="#about" className="dark-nav-link">
              About
            </a>
          </div>
        </nav>

        {/* Hero Section with Spline Integration */}
        <section
          className="hero-section"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <div className="hero-content">
            <div className="hero-left">
              <h1 className="hero-title">
                THE FUTURE OF
                <span className="hero-accent"> AI CONVERSATION</span>
              </h1>
              <p className="hero-description">
                Experience next-generation AI avatars that don't just talk—they
                understand, feel, and evolve with you. Welcome to LATENT, where
                artificial intelligence meets authentic connection.
              </p>
              <div className="hero-buttons">
                <button
                  className="btn-primary"
                  onClick={() => router.push("/avatars")}
                >
                  <span>OPEN CHAT</span>
                  <ChevronRight className="w-6 h-6" />
                </button>
                <button className="btn-secondary">
                  <span>DISCOVER MORE</span>
                </button>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">4</span>
                  <span className="stat-label">Unique Avatars</span>
                </div>
                <div className="stat">
                  <span className="stat-number">∞</span>
                  <span className="stat-label">Conversations</span>
                </div>
                <div className="stat">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Available</span>
                </div>
              </div>
            </div>

            <div className="hero-right">
              <div className="spline-container">
                <Spline
                  scene="https://prod.spline.design/NbVmy6DPLhY-5Lvg/scene.splinecode"
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    overflow: "visible",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="mouse-follower" style={{}} />
      </div>
    </>
  );
};

export default LatentLandingComplete;
