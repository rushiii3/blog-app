// import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
export const dynamicParams = true; // true | false,
import { formatDistance } from "date-fns";

const posts = [
  {
    id: 1,
    title:
      "The Rising Threat of Ransomware: How Businesses Can Protect Their Digital Assets",
    slug: "rising-threat-of-ransomware-business-protection-strategies",
    content:
      "Ransomware attacks have evolved dramatically over the past decade, transforming from opportunistic nuisances into sophisticated operations that threaten organizations of all sizes. Today's ransomware operators employ advanced tactics, including double and triple extortion techniques, where attackers not only encrypt data but also threaten to leak sensitive information or launch devastating DDoS attacks if ransoms aren't paid. This evolution has made ransomware one of the most pressing cybersecurity threats facing businesses today.\n\nThe financial impact of ransomware continues to escalate at an alarming rate. Recent studies indicate that the average ransomware payment has increased by over 300% in the last two years alone. Beyond direct ransom payments, organizations face significant costs related to system downtime, recovery efforts, reputation damage, and potential regulatory fines. Many businesses find themselves unprepared for both the technical and financial fallout of these attacks, with some never fully recovering from a significant ransomware incident.\nRansomware delivery methods have become increasingly sophisticated and difficult to detect. While phishing emails remain a common vector, attackers now leverage compromised business email accounts, exploit unpatched vulnerabilities in remote access systems, and target managed service providers to gain access to multiple victims through a single compromise. This diversification of attack vectors means organizations can no longer rely on a single security solution or approach to protect themselves adequately against ransomware threats.\nThe human element remains both the greatest vulnerability and the strongest potential defense against ransomware attacks. Social engineering tactics continue to evolve, with attackers conducting thorough research on potential targets and crafting highly convincing lures. While technical safeguards are essential, organizations that invest in comprehensive security awareness training see significantly lower rates of successful ransomware infections. Regular simulated phishing exercises and security culture development have proven particularly effective in reducing an organization's vulnerability profile.\nImplementing a robust backup strategy remains fundamental to ransomware resilience, but many organizations fail to properly test their restoration capabilities until it's too late. Effective backup strategies must follow the 3-2-1 rule: maintain at least three copies of data on two different media types with one copy stored offsite or in an air-gapped environment. Critically, organizations must regularly test their backup restoration processes to ensure they can recover effectively when faced with an actual ransomware incident.\nNetwork segmentation has emerged as a critical strategy for limiting the spread of ransomware within an organization's environment. By dividing networks into isolated segments and implementing strict access controls between them, businesses can contain infections and prevent lateral movement. Organizations that implement effective network segmentation typically see ransomware impacts limited to specific departments or systems rather than suffering enterprise-wide encryption events that can completely halt business operations.\nEndpoint detection and response (EDR) solutions represent a significant advancement over traditional antivirus software in combating ransomware. These systems monitor endpoints for suspicious behaviors rather than relying solely on known malware signatures. Advanced EDR solutions can detect encryption activities in their early stages and automatically isolate affected systems before ransomware can spread throughout the network. This behavior-based approach is particularly effective against new or customized ransomware variants that might evade traditional detection methods.\nThe debate around ransomware payments continues to intensify as both government agencies and cybersecurity experts increasingly advise against paying ransoms. Beyond the obvious concern that payments fund further criminal activities, organizations face several practical issues: payments don't guarantee data recovery, may violate sanctions regulations in some cases, and often mark the organization as a willing payer for future attacks. Instead of budgeting for potential ransom payments, organizations should redirect those resources toward comprehensive prevention and recovery capabilities.\nIncident response planning specifically for ransomware scenarios has become an essential element of organizational resilience. Effective plans must include clear decision-making frameworks, communication protocols, technical response procedures, and business continuity measures. Organizations that conduct regular tabletop exercises specifically simulating ransomware attacks respond more effectively when faced with actual incidents, significantly reducing both recovery time and overall impact on business operations.\nThe cybersecurity insurance landscape is rapidly changing in response to the ransomware epidemic, with premiums increasing and coverage terms becoming more restrictive. Insurers now typically require policyholders to implement specific security controls and undergo detailed security assessments before providing coverage. Organizations seeking effective cyber insurance should view it as just one component of a comprehensive risk management strategy rather than a substitute for robust security practices or incident response capabilities.",
    read_time: "6 min",
    image:
      "https://media.licdn.com/dms/image/v2/D4E12AQE4ihBkX_L1Kg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1710825947065?e=2147483647&v=beta&t=agM7oA65XHsQwrtSxsdh5ALmft1ZxkslcIujMgEO0lA",
    author_name: "Anonymous 1",
    author_avatar: "https://randomuser.me/api/portraits/lego/4.jpg",
    created_at: "2025-03-17T10:00:22.162448+00:00",
    description:
      "This article explores the growing ransomware threat landscape and provides practical strategies for businesses to safeguard their critical digital assets.",
  },
];
// // Add generateStaticParams function to tell Next.js which dynamic routes to pre-render
export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost(props: Params) {
  // const params = useParams();
  const params = await props.params;

  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link href="/" className="inline-block mb-8">
          <Button variant="outline" className="cursor-pointer">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
          <img
            src={post.image}
            alt={post.title}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex items-center gap-4 mb-8">
          <img
            src={post.author_avatar}
            alt={post.author_name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium">{post.author_name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{formatDistance(post.created_at, new Date())}</span>
              <span>•</span>
              <span>{post.read_time} read</span>
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold tracking-tight mb-8">{post.title}</h1>

        <div className="prose prose-lg max-w-none">
          {post.content.split("\n").map((paragraph, index) => (
            <p
              key={index}
              className="mb-6 text-muted-foreground leading-relaxed text-justify"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </main>
  );
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return notFound();
  }

  return {
    title: post.title,
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`${post.image}`],
      creator: post.author_name,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${process.env.NEXT_PUBLIC_URL!}`,
      siteName: "SecureBlog",
      images: [
        {
          url: post.image, // Must be an absolute URL
        },
      ],
      locale: "en_US",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_URL!}/blog/${post.slug}`,
    },
  };
}
