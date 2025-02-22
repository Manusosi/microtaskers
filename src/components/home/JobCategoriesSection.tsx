
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface CategoryCard {
  image: string;
  title: string;
  count: number;
  description: string;
  delay: number;
}

const categories: CategoryCard[] = [
  {
    image: "/lovable-uploads/b461bd74-8623-43b9-b1fb-3d3b5cc027f1.png",
    title: "Pay Per View",
    count: 4,
    description: "Get paid to view articles and content online. Easy tasks with quick payments.",
    delay: 0,
  },
  {
    image: "/lovable-uploads/c1303b64-1aa3-4000-be21-705f91cba43b.png",
    title: "Follow, Subscribe",
    count: 4,
    description: "Earn by following and subscribing to various social media channels and content creators.",
    delay: 100,
  },
  {
    image: "/lovable-uploads/b0bfd66e-cfcf-47b7-9ce9-68dda7d7b542.png",
    title: "Create Account",
    count: 2,
    description: "Make money by creating accounts on various platforms and completing basic setup tasks.",
    delay: 200,
  },
  {
    image: "/lovable-uploads/c52530cf-29b3-46cf-bbdc-2853cd6fb608.png",
    title: "Google Review",
    count: 2,
    description: "Share your honest experience and get paid for writing Google reviews for businesses.",
    delay: 300,
  },
  {
    image: "/lovable-uploads/526eabc7-4308-4d23-814f-b7735205a7b6.png",
    title: "Facebook",
    count: 1,
    description: "Earn by engaging with Facebook content, pages, and communities.",
    delay: 400,
  },
  {
    image: "/lovable-uploads/8787b530-b72e-45ce-a0b1-68bfedd16ec6.png",
    title: "Instagram",
    count: 0,
    description: "Get paid to engage with Instagram posts, stories, and content.",
    delay: 500,
  },
  {
    image: "/lovable-uploads/da7d2f0c-d766-4666-a581-355263ac9092.png",
    title: "Pay Per Lead",
    count: 0,
    description: "Earn commission by referring potential customers to businesses.",
    delay: 600,
  },
  {
    image: "/lovable-uploads/2013a180-d04f-4ed1-9413-dfdc43180709.png",
    title: "Tiktok",
    count: 0,
    description: "Make money by engaging with TikTok content and creating simple videos.",
    delay: 700,
  },
];

const JobCategoriesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_