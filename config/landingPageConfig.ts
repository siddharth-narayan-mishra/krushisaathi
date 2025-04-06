import {
  Brain,
  Globe2,
  Languages,
  MapPin,
  Microscope,
  VoicemailIcon
} from "lucide-react";

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const STATS = [
  { number: "10,000+", label: "Active Farmers" },
  { number: "15+", label: "Languages Supported" },
  { number: "95%", label: "Accuracy Rate" },
  { number: "24/7", label: "Support Available" }
];

export const FEATURES = [
  {
    icon: VoicemailIcon,
    title: "Voice-Based Interface",
    description: "Natural conversations in regional languages"
  },
  {
    icon: Microscope,
    title: "Smart Soil Analysis",
    description: "Advanced soil testing with AI recommendations"
  },
  {
    icon: Brain,
    title: "AI Insights",
    description: "Intelligent farming decisions and predictions"
  },
  {
    icon: MapPin,
    title: "Precision Mapping",
    description: "Location-specific agricultural guidance"
  },
  {
    icon: Globe2,
    title: "Weather Integration",
    description: "Real-time weather updates and forecasts"
  },
  {
    icon: Languages,
    title: "Multi-Language Support",
    description: "Available in multiple Indian languages"
  }
];

export const WORKFLOW_STEPS = [
  {
    step: "1",
    title: "Voice Input",
    description: "Speak about your farming needs"
  },
  {
    step: "2",
    title: "AI Analysis",
    description: "Process input and analyze farming data"
  },
  {
    step: "3",
    title: "Smart Recommendations",
    description: "Receive personalized farming insights"
  }
];

export const TEAM_MEMBERS = [
  {
    name: "Siddharth Narayan Mishra",
    role: "Full Stack Developer",
    imgUrl:
      "https://res.cloudinary.com/dehegwbs0/image/upload/v1743938410/l4bgkhoumcljzimliytt.jpg"
  },
  {
    name: "Lord Sen",
    role: "AI/ML Engineer",
    imgUrl:
      "https://res.cloudinary.com/dehegwbs0/image/upload/v1743938449/y7xzpv8h483lu80zbrfj.jpg"
  },
  {
    name: "Md. Ayan",
    role: "Full Stack Developer",
    imgUrl:
      "https://res.cloudinary.com/dehegwbs0/image/upload/v1743938475/jn5jkfa2gbeukk2cgy8q.jpg"
  },
  {
    name: "Himanshu",
    role: "Full Stack Developer",
    imgUrl:
      "https://res.cloudinary.com/dehegwbs0/image/upload/v1743938087/rtu9juabdnn5x2qhkcmq.jpg"
  }
];
