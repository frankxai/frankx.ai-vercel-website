"use client";

import React from "react"

import { motion, useAnimation, useInView } from "framer-motion";
import {
  Users,
  MessageSquare,
  Globe,
  Zap,
  Twitter,
  Youtube,
  Linkedin,
  Crown,
  Radio,
  Sparkles,
  Calendar,
  TrendingUp,
  ArrowRight,
  Mail,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef, useState } from "react";

// Network visualization component
const NetworkVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes] = useState(() =>
    Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2 + 1,
    }))
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateSize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    let animationId: number;

    const animate = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      ctx.clearRect(0, 0, width, height);

      // Update and draw nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > 100) node.vx *= -1;
        if (node.y < 0 || node.y > 100) node.vy *= -1;

        const x = (node.x / 100) * width;
        const y = (node.y / 100) * height;

        // Draw connections
        nodes.forEach((otherNode) => {
          if (node === otherNode) return;
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 15) {
            const ox = (otherNode.x / 100) * width;
            const oy = (otherNode.y / 100) * height;
            const opacity = (1 - distance / 15) * 0.3;

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(ox, oy);
            ctx.strokeStyle = `rgba(171, 71, 199, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });

        // Draw node
        ctx.beginPath();
        ctx.arc(x, y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(171, 71, 199, 0.8)";
        ctx.fill();

        // Glow effect
        ctx.beginPath();
        ctx.arc(x, y, node.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(171, 71, 199, 0.2)";
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateSize);
      cancelAnimationFrame(animationId);
    };
  }, [nodes]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
};

// Stats counter component
const AnimatedStat = ({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent mb-2">
        {value}
      </div>
      <div className="text-muted-foreground text-sm md:text-base">{label}</div>
    </motion.div>
  );
};

export default function CommunityPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const channels = [
    {
      title: "Inner Circle",
      description: "Exclusive access for premium members with direct mentorship",
      icon: Crown,
      members: "500+",
      color: "from-[#AB47C7] to-[#8B5CF6]",
      badge: "Premium",
    },
    {
      title: "Open Community",
      description: "Join our vibrant Discord & forum for daily discussions",
      icon: MessageSquare,
      members: "12.5K+",
      color: "from-[#43BFE3] to-[#3B82F6]",
      badge: "Free",
    },
    {
      title: "Signal Newsletter",
      description: "Weekly insights, trends, and exclusive content delivered",
      icon: Radio,
      members: "8.2K+",
      color: "from-[#F59E0B] to-[#EF4444]",
      badge: "Weekly",
    },
    {
      title: "Live Labs",
      description: "Real-time build sessions with industry experts",
      icon: Zap,
      members: "3.8K+",
      color: "from-[#10B981] to-[#059669]",
      badge: "Live",
    },
  ];

  const socialChannels = [
    {
      name: "Twitter/X",
      handle: "@frankx_ai",
      icon: Twitter,
      followers: "24.5K",
      color: "hover:text-[#43BFE3]",
    },
    {
      name: "YouTube",
      handle: "FrankX AI",
      icon: Youtube,
      followers: "18.2K",
      color: "hover:text-[#EF4444]",
    },
    {
      name: "LinkedIn",
      handle: "FrankX",
      icon: Linkedin,
      followers: "15.8K",
      color: "hover:text-[#43BFE3]",
    },
  ];

  const activities = [
    {
      type: "lab",
      title: "Building RAG Systems with LangChain",
      author: "Alex Chen",
      time: "2 hours ago",
      icon: Zap,
      color: "text-[#10B981]",
    },
    {
      type: "discussion",
      title: "Best practices for prompt engineering in 2026",
      author: "Sarah Johnson",
      time: "5 hours ago",
      icon: MessageSquare,
      color: "text-[#43BFE3]",
    },
    {
      type: "spotlight",
      title: "Member Spotlight: Creating AI Agents at Scale",
      author: "Michael Roberts",
      time: "1 day ago",
      icon: Sparkles,
      color: "text-[#AB47C7]",
    },
    {
      type: "event",
      title: "Upcoming: Advanced Vector Database Workshop",
      author: "FrankX Team",
      time: "Tomorrow at 2PM EST",
      icon: Calendar,
      color: "text-[#F59E0B]",
    },
  ];

  const members = [
    {
      name: "Elena Rodriguez",
      role: "AI Research Lead",
      avatar: "ER",
      achievement: "Built 50+ AI products",
      color: "from-[#AB47C7] to-[#8B5CF6]",
    },
    {
      name: "Marcus Chen",
      role: "ML Engineer",
      avatar: "MC",
      achievement: "10 years in AI/ML",
      color: "from-[#43BFE3] to-[#3B82F6]",
    },
    {
      name: "Sophia Williams",
      role: "Product Architect",
      avatar: "SW",
      achievement: "Ex-FAANG AI lead",
      color: "from-[#F59E0B] to-[#EF4444]",
    },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-foreground overflow-hidden">
      {/* Hero Section with Network Visualization */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#AB47C7]/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#AB47C7]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#43BFE3]/20 rounded-full blur-[120px]" />

        {/* Network visualization */}
        <div className="absolute inset-0">
          <NetworkVisualization />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge
              variant="outline"
              className="mb-6 border-primary/50 bg-primary/10 text-primary px-4 py-2 text-sm"
            >
              <Sparkles className="w-4 h-4 mr-2 inline" />
              {'Join 15,000+ AI Architects'}
            </Badge>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-balance">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AB47C7] via-[#43BFE3] to-[#F59E0B]">
                {'The Community'}
              </span>
              <br />
              <span className="text-foreground">{'Where AI Builders Thrive'}</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty leading-relaxed">
              {'Connect with elite AI architects, join exclusive build sessions, and level up your skills in the most active AI community.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#AB47C7] to-[#8B5CF6] hover:opacity-90 text-white px-8 py-6 text-lg group"
              >
                {'Join Inner Circle'}
                <Crown className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#43BFE3]/50 hover:bg-[#43BFE3]/10 text-[#43BFE3] px-8 py-6 text-lg group bg-transparent"
              >
                {'Explore Free Community'}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 border-y border-border/50">
        <div className="absolute inset-0 bg-gradient-to-r from-[#AB47C7]/5 via-transparent to-[#43BFE3]/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <AnimatedStat value="15K+" label="Active Members" delay={0} />
            <AnimatedStat value="250K+" label="Messages Exchanged" delay={0.1} />
            <AnimatedStat value="85+" label="Countries Worldwide" delay={0.2} />
            <AnimatedStat value="340+" label="Labs Hosted" delay={0.3} />
          </div>
        </div>
      </section>

      {/* Community Channels */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              {'Choose Your '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AB47C7] to-[#43BFE3]">
                {'Journey'}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              {'Multiple ways to connect, learn, and build with the FrankX community'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {channels.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <motion.div
                  key={channel.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="relative group overflow-hidden border-border/50 bg-card backdrop-blur-xl hover:border-primary/50 transition-all duration-300">
                    {/* Gradient overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${channel.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />

                    <div className="relative p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${channel.color} flex items-center justify-center`}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <Badge
                          variant="outline"
                          className="border-current bg-background/50"
                        >
                          {channel.badge}
                        </Badge>
                      </div>

                      <h3 className="text-2xl font-bold mb-2">{channel.title}</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {channel.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-primary" />
                          <span className="font-semibold">{channel.members}</span>
                          <span className="text-muted-foreground">{'members'}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="group/btn hover:text-primary"
                        >
                          {'Join now'}
                          <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Activity Feed */}
      <section className="relative py-24 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              {'Community '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#43BFE3] to-[#10B981]">
                {'Pulse'}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              {'See what the community is building and discussing right now'}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border-border/50 bg-card/50 backdrop-blur-xl hover:bg-card/80 transition-all duration-300 group cursor-pointer">
                    <div className="p-6 flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center ${activity.color} group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                          {activity.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">
                            {activity.author}
                          </span>
                          <span>{'•'}</span>
                          <span>{activity.time}</span>
                        </div>
                      </div>

                      <TrendingUp className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-8"
          >
            <Button
              variant="outline"
              size="lg"
              className="border-secondary/50 hover:bg-secondary/10 text-secondary bg-transparent"
            >
              {'View All Activity'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Member Spotlights */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              {'Meet the '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] to-[#EF4444]">
                {'Architects'}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              {'Learn from the best minds building the future of AI'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {members.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="relative group overflow-hidden border-border/50 bg-card backdrop-blur-xl hover:border-primary/50 transition-all duration-300">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  <div className="relative p-8 text-center">
                    <div
                      className={`w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300`}
                    >
                      {member.avatar}
                    </div>

                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {member.role}
                    </p>

                    <Badge
                      variant="outline"
                      className="bg-background/50 border-primary/30"
                    >
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      {member.achievement}
                    </Badge>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="relative overflow-hidden border-border/50 bg-card backdrop-blur-xl">
              {/* Background effects */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#AB47C7]/20 rounded-full blur-[120px]" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#43BFE3]/20 rounded-full blur-[120px]" />

              <div className="relative p-8 md:p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#F59E0B] to-[#EF4444] flex items-center justify-center">
                  <Mail className="w-8 h-8 text-white" />
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                  {'Get the Signal Newsletter'}
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
                  {'Weekly insights, AI trends, and exclusive content delivered straight to your inbox. Join 8,200+ architects staying ahead.'}
                </p>

                {!subscribed ? (
                  <form
                    onSubmit={handleSubscribe}
                    className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                  >
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-background/50 border-border/50 h-12"
                      required
                    />
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-gradient-to-r from-[#F59E0B] to-[#EF4444] hover:opacity-90 text-white px-8"
                    >
                      {'Subscribe'}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-center gap-2 text-[#10B981]"
                  >
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="text-lg font-semibold">
                      {'Thanks for subscribing!'}
                    </span>
                  </motion.div>
                )}

                <p className="text-xs text-muted-foreground mt-4">
                  {'No spam. Unsubscribe anytime. Your data is safe with us.'}
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Social Channels */}
      <section className="relative py-24 bg-gradient-to-b from-transparent via-secondary/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              {'Follow the '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#43BFE3] to-[#AB47C7]">
                {'Movement'}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              {'Stay connected across all platforms'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {socialChannels.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <motion.div
                  key={channel.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border-border/50 bg-card backdrop-blur-xl hover:bg-card/80 transition-all duration-300 group cursor-pointer">
                    <div className="p-8 text-center">
                      <Icon
                        className={`w-12 h-12 mx-auto mb-4 text-muted-foreground ${channel.color} transition-colors duration-300`}
                      />
                      <h3 className="text-xl font-bold mb-1">{channel.name}</h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        {channel.handle}
                      </p>
                      <p className="text-lg font-semibold text-primary">
                        {channel.followers}
                        <span className="text-sm text-muted-foreground ml-1">
                          {'followers'}
                        </span>
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#AB47C7]/20 rounded-full blur-[150px]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              variant="outline"
              className="mb-6 border-primary/50 bg-primary/10 text-primary px-4 py-2"
            >
              <Globe className="w-4 h-4 mr-2 inline" />
              {'Global AI Community'}
            </Badge>

            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              {'Ready to '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AB47C7] via-[#43BFE3] to-[#F59E0B]">
                {'Level Up'}
              </span>
              {'?'}
            </h2>

            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto text-pretty leading-relaxed">
              {'Join 15,000+ AI architects building the future. Get access to exclusive content, mentorship, and a network that accelerates your growth.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#AB47C7] to-[#8B5CF6] hover:opacity-90 text-white px-10 py-7 text-xl group"
              >
                {'Start Your Journey'}
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
