"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ShimmerButton from "@/components/ui/magic-ui/shimmer-button";
import Marquee from "@/components/ui/magic-ui/marquee";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  Code2,
  Sparkles,
  Zap,
  Shield,
  Users,
  TrendingUp,
  BookOpen,
  Download,
  ArrowRight,
  Star,
  Github,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react";

// Animated grid background
const GridBackground = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
  </div>
);

// Floating particles
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-primary/20 rounded-full"
        initial={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        }}
        animate={{
          y: [null, Math.random() * window.innerHeight],
          x: [null, Math.random() * window.innerWidth],
        }}
        transition={{
          duration: Math.random() * 10 + 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    ))}
  </div>
);

// Stats component
const Stats = () => {
  const stats = [
    { value: "10", label: "Expert Skills", suffix: "" },
    { value: "40", label: "Hours Saved", suffix: "+" },
    { value: "500", label: "Architects Trained", suffix: "+" },
    { value: "$300K", label: "Year 1 Value", suffix: "" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="text-center"
        >
          <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            {stat.value}
            {stat.suffix}
          </div>
          <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

// Skill card component
const SkillCard = ({
  title,
  description,
  icon: Icon,
  delay = 0,
}: {
  title: string;
  description: string;
  icon: any;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ scale: 1.02, y: -5 }}
    className="group relative p-6 rounded-2xl bg-gradient-to-br from-background/80 to-background/40 border border-border/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
  >
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  </motion.div>
);

// Testimonial card for marquee
const TestimonialCard = ({
  name,
  role,
  company,
  content,
  avatar,
}: {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}) => (
  <div className="w-[350px] mx-4 p-6 rounded-2xl bg-background/80 border border-border/50 backdrop-blur-sm">
    <div className="flex items-center gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
      "{content}"
    </p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-semibold">
        {avatar}
      </div>
      <div>
        <div className="font-semibold text-sm">{name}</div>
        <div className="text-xs text-muted-foreground">
          {role} at {company}
        </div>
      </div>
    </div>
  </div>
);

// Pricing tier component
const PricingTier = ({
  name,
  price,
  period,
  description,
  features,
  cta,
  highlighted = false,
  delay = 0,
}: {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className={cn(
      "relative p-8 rounded-3xl border backdrop-blur-sm transition-all duration-300",
      highlighted
        ? "bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/50 scale-105"
        : "bg-background/80 border-border/50 hover:border-primary/30"
    )}
  >
    {highlighted && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-purple-500 text-white text-xs font-semibold">
        MOST POPULAR
      </div>
    )}
    <div className="mb-6">
      <h3 className="text-2xl font-bold mb-2">{name}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
    <div className="mb-6">
      <div className="flex items-baseline gap-2">
        <span className="text-5xl font-bold">{price}</span>
        <span className="text-muted-foreground">{period}</span>
      </div>
    </div>
    <ul className="space-y-3 mb-8">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <span className="text-sm text-muted-foreground">{feature}</span>
        </li>
      ))}
    </ul>
    <ShimmerButton
      className="w-full"
      background={highlighted ? "rgba(139, 92, 246, 1)" : "rgba(0, 0, 0, 1)"}
    >
      {cta}
    </ShimmerButton>
  </motion.div>
);

export default function AIArchitectSkillsLanding() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const coreSkills = [
    {
      title: "MCP Architecture",
      description:
        "Design standardized AI-to-data integrations that work with any agent framework. Build the N+M solution.",
      icon: Zap,
    },
    {
      title: "Claude SDK",
      description:
        "Build autonomous agents with computer use, file operations, and iterative debugging capabilities.",
      icon: Code2,
    },
    {
      title: "LangGraph Patterns",
      description:
        "Production-grade workflows with state machines, checkpointing, and human-in-the-loop patterns.",
      icon: BookOpen,
    },
    {
      title: "OpenAI AgentKit",
      description:
        "Multi-agent systems with visual builder, agent handoffs, and managed platform integration.",
      icon: Users,
    },
    {
      title: "Oracle ADK",
      description:
        "Enterprise agent deployment on Oracle Cloud with compliance and scalability built-in.",
      icon: Shield,
    },
    {
      title: "Framework-Agnostic Design",
      description:
        "Create portable agent definitions using Oracle Agent Spec for maximum flexibility.",
      icon: Sparkles,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Principal AI Architect",
      company: "Fortune 500 Bank",
      content:
        "Reduced our AI architecture design time from 2 weeks to 3 days. The production patterns are worth 10x the price.",
      avatar: "SC",
    },
    {
      name: "Michael Rodriguez",
      role: "VP of Engineering",
      company: "Healthcare Tech",
      content:
        "Finally, a resource that covers all frameworks objectively. Saved our team months of trial and error.",
      avatar: "MR",
    },
    {
      name: "Emily Thompson",
      role: "Senior AI Engineer",
      company: "FinTech Startup",
      content:
        "The MCP architecture patterns alone paid for the entire package. Now deploying agents 50% faster.",
      avatar: "ET",
    },
    {
      name: "David Park",
      role: "CTO",
      company: "AI Consulting Firm",
      content:
        "We use this as our standard training for all new AI architects. Best ROI of any technical resource.",
      avatar: "DP",
    },
    {
      name: "Lisa Wang",
      role: "Lead Developer",
      company: "Enterprise SaaS",
      content:
        "The framework comparison guide saved us from a costly architectural mistake. Incredibly valuable.",
      avatar: "LW",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <GridBackground />
        <FloatingParticles />

        <motion.div
          style={{ opacity }}
          className="max-w-6xl mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary"
          >
            <Sparkles className="inline w-4 h-4 mr-2" />
            Production-Tested AI Architecture Skills for Claude Code
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight"
          >
            Master AI Architecture
            <br />
            in Weeks, Not Years
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            10 production-tested skills covering{" "}
            <span className="text-foreground font-semibold">
              MCP, Claude SDK, LangGraph, AgentKit
            </span>
            , and more. Used by Fortune 500 AI Architects to build
            enterprise-scale agent systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <ShimmerButton
              className="px-8 py-4 text-lg font-semibold"
              background="rgba(139, 92, 246, 1)"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Free Tier
            </ShimmerButton>
            <button className="px-8 py-4 rounded-full text-lg font-semibold bg-background/80 border border-border/50 hover:border-primary/50 transition-all backdrop-blur-sm group">
              Buy Professional $299
              <ArrowRight className="inline w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>14-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>500+ architects trained</span>
            </div>
          </motion.div>

          <Stats />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The AI Architect Learning Curve
              <br />
              <span className="text-muted-foreground">is Crushing Careers</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Documentation is fragmented. Tutorials are outdated. Enterprise
              patterns are tribal knowledge. You're wasting months figuring it
              out.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                problem: "6+ Months to Proficiency",
                solution: "6 Weeks with Our Skills",
                icon: TrendingUp,
              },
              {
                problem: "Trial & Error Mistakes",
                solution: "Production-Tested Patterns",
                icon: Shield,
              },
              {
                problem: "Single-Framework Knowledge",
                solution: "5 Frameworks Mastered",
                icon: Sparkles,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-background/80 border border-border/50 backdrop-blur-sm"
              >
                <item.icon className="w-12 h-12 text-primary mb-4" />
                <div className="text-xl font-semibold mb-2 text-red-400 line-through">
                  {item.problem}
                </div>
                <div className="text-2xl font-bold text-primary">
                  {item.solution}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              10 Expert-Level Skills
              <br />
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                Production-Tested in Fortune 500
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every skill represents hundreds of hours of production learning.
              No fluff, no theory - just patterns that ship to prod.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreSkills.map((skill, i) => (
              <SkillCard key={skill.title} {...skill} delay={i * 0.1} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 text-center"
          >
            <h3 className="text-2xl font-bold mb-4">
              Plus 4 Supporting Technical Skills
            </h3>
            <p className="text-muted-foreground mb-6">
              UI/UX Design • Next.js/React • Oracle Database • OCI Services
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Complete architecture patterns",
                "Real-world examples",
                "Production checklists",
                "Deployment templates",
              ].map((item, i) => (
                <div
                  key={i}
                  className="px-4 py-2 rounded-full bg-background/80 border border-border/50 text-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-500/5 to-background" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16 relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Trusted by 500+ AI Architects
          </h2>
          <p className="text-xl text-muted-foreground">
            See what architects are saying about the skills package
          </p>
        </motion.div>

        <Marquee pauseOnHover className="py-4">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={i} {...testimonial} />
          ))}
        </Marquee>
      </section>

      {/* Pricing Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Choose Your Path to Mastery
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From free learning resources to enterprise-grade training. Pick
              the tier that fits your career stage.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <PricingTier
              name="Free"
              price="$0"
              period="forever"
              description="Perfect for exploring AI architecture"
              features={[
                "Read-only access to all 10 skills",
                "AI Architect career guide",
                "Framework comparison guide",
                "2 beginner examples with code",
                "Community Discord access",
                "MIT license for modification",
              ]}
              cta="Download Free"
              delay={0}
            />

            <PricingTier
              name="Professional"
              price="$299"
              period="one-time"
              description="Everything you need to become an expert"
              features={[
                "Full access to all 10 skills (editable)",
                "Complete documentation suite",
                "All examples (beginner → advanced)",
                "4 production-ready templates",
                "6 months of free updates",
                "Email support (48hr response)",
                "Commercial use license",
              ]}
              cta="Buy Professional"
              highlighted={true}
              delay={0.1}
            />

            <PricingTier
              name="Enterprise"
              price="$2,999"
              period="/year"
              description="For teams and organizations"
              features={[
                "Everything in Professional",
                "Unlimited team members",
                "2 custom skills per year",
                "Quarterly training workshops",
                "Priority Slack support (4hr SLA)",
                "Early access (2 weeks ahead)",
                "Custom integration consulting",
              ]}
              cta="Contact Sales"
              delay={0.2}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-16 text-center text-sm text-muted-foreground"
          >
            <p>
              All purchases include a 14-day money-back guarantee. No questions
              asked.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              $299 Investment.
              <br />
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                $9,000 in Value.
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="p-8 rounded-2xl bg-background/80 border border-border/50 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold mb-6">Traditional Path:</h3>
              <div className="space-y-4">
                {[
                  { item: "Trial & error learning", value: "$6,000" },
                  { item: "Consulting hours", value: "$8,000" },
                  { item: "Multiple courses", value: "$2,000" },
                  { item: "Time wasted on mistakes", value: "$5,000" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center pb-4 border-b border-border/50"
                  >
                    <span className="text-muted-foreground">{item.item}</span>
                    <span className="font-bold text-red-400">{item.value}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4">
                  <span className="text-xl font-bold">Total Cost:</span>
                  <span className="text-3xl font-bold text-red-400">
                    $21,000+
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold mb-6">With This Package:</h3>
              <div className="space-y-4">
                {[
                  { item: "40 hours of research saved", value: "$6,000" },
                  { item: "Production patterns included", value: "$8,000" },
                  { item: "All frameworks covered", value: "$2,000" },
                  { item: "Templates & examples", value: "$1,500" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center pb-4 border-b border-primary/20"
                  >
                    <span className="text-muted-foreground">{item.item}</span>
                    <span className="font-bold text-primary">{item.value}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4">
                  <span className="text-xl font-bold">Your Investment:</span>
                  <span className="text-3xl font-bold text-primary">$299</span>
                </div>
              </div>
              <div className="mt-6 p-4 rounded-xl bg-primary/20 text-center">
                <div className="text-sm text-muted-foreground">ROI:</div>
                <div className="text-4xl font-bold text-primary">30x</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 border border-primary/20 backdrop-blur-sm"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Accelerate Your
              <br />
              AI Architecture Career?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join 500+ architects who've already transformed their careers.
              Start with the free tier today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ShimmerButton
                className="px-8 py-4 text-lg font-semibold"
                background="rgba(139, 92, 246, 1)"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Free Tier
              </ShimmerButton>
              <button className="px-8 py-4 rounded-full text-lg font-semibold bg-background border border-border/50 hover:border-primary/50 transition-all group">
                View All Tiers
                <ArrowRight className="inline w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Instant access</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>No credit card required</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border/50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="font-bold text-lg mb-4">FrankX AI Skills</h3>
              <p className="text-sm text-muted-foreground">
                Production-tested AI architecture training for the next
                generation of AI engineers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Skills Overview
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Examples
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Getting Started
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Career Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Community
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2025 FrankX. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                License
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
