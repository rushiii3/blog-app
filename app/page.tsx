import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Lock,
  AlertTriangle,
  Eye,
  Bell,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import ArticleSection from "@/components/ArticleSection";



export default async function LandingPage() {
  // const schemaData = {
  //   "@context": "https://schema.org",
  //   "@type": "BlogPosting",
  //   headline: "Stay Secure in the Digital World",
  //   description: "Expert insights and the latest news on cybersecurity.",
  //   author: {
  //     "@type": "Person",
  //     name: "SecureBlog Team",
  //   },
  //   publisher: {
  //     "@type": "Organization",
  //     name: "SecureBlog",
  //     logo: {
  //       "@type": "ImageObject",
  //       url: "/logo.png",
  //     },
  //   },
  //   datePublished: "2024-03-15",
  //   dateModified: "2024-03-16",
  // };

  const data = await fetch("http://localhost:3000/api")
  const posts = await data.json()  
  return (
    <>
      <div className="flex min-h-screen flex-col bg-background">
        <main className="flex-1">
          <HeroSection />
          <FeaturesSection />
          <ArticleSection data={posts} />
        </main>
        <Footer />
      </div>
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden pt-16 md:pt-24 lg:pt-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.15),transparent_50%)]"></div>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm shadow-sm">
            <Shield className="mr-1 h-4 w-4 text-primary" />
            <span>SecureBlog</span>
          </div>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Stay <span className="text-primary">Secure</span> in the Digital
            World
          </h1>
          <p className="mt-6 max-w-[700px] text-muted-foreground md:text-xl">
            Expert insights, latest news, and practical advice on cybersecurity
            to protect your digital life.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="rounded-full px-8">
              Explore Articles
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8">
              Join Community
            </Button>
          </div>
          <div className="mt-16 w-full max-w-5xl overflow-hidden rounded-3xl border bg-muted/30 shadow-xl">
            <Image
              src="/image1.avif"
              width={1000}
              height={500}
              alt="Cybersecurity dashboard"
              className="w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm shadow-sm">
            <Lock className="mr-1 h-4 w-4 text-primary" />
            <span>Expert Insights</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Why Choose CyberGuard
          </h2>
          <p className="max-w-[85%] text-muted-foreground md:text-xl">
            Stay informed with the latest cybersecurity trends, threats, and
            solutions from industry experts.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-3">
          <FeatureCard
            icon={<AlertTriangle className="h-12 w-12 text-primary" />}
            title="Threat Intelligence"
            description="Real-time updates on emerging cyber threats and vulnerabilities to keep you one step ahead."
          />
          <FeatureCard
            icon={<Eye className="h-12 w-12 text-primary" />}
            title="Privacy Guides"
            description="Practical advice on protecting your privacy online and securing your personal data."
          />
          <FeatureCard
            icon={<Bell className="h-12 w-12 text-primary" />}
            title="Security Alerts"
            description="Timely notifications about critical security patches and urgent threats requiring immediate action."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border bg-background p-6 shadow-sm transition-all hover:shadow-md">
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 transition-all group-hover:scale-150"></div>
      <div className="relative">
        {icon}
        <h3 className="mt-4 text-xl font-bold">{title}</h3>
        <p className="mt-2 text-muted-foreground">{description}</p>
        <div className="mt-6 flex items-center text-sm font-medium text-primary">
          Learn more
          <ArrowRight className="ml-1 h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SecureBlog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
