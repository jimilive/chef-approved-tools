import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Best Kitchen Appliances: Chef-Tested Reviews 2025 | Chef Approved Tools",
  description: "Professional kitchen appliances tested in restaurant conditions. Chef-tested reviews of mixers, blenders, food processors, and commercial-grade kitchen appliances for serious home cooks.",
  keywords: [
    "kitchen appliances",
    "best kitchen appliances",
    "professional kitchen appliances",
    "commercial kitchen appliances",
    "affordable kitchen appliances",
    "kitchen appliance reviews",
    "chef tested appliances"
  ],
  openGraph: {
    title: "Best Kitchen Appliances: Chef-Tested Reviews 2025",
    description: "Professional kitchen appliances tested in restaurant conditions. Mixers, blenders, and food processors that survived commercial use.",
    type: "website",
  }
};

export default function AppliancesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
