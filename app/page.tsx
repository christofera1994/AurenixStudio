import { getSiteContent } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeatureCards } from "@/components/FeatureCards";
import { Philosophy } from "@/components/Philosophy";
import { Protocol } from "@/components/Protocol";
import { Gallery } from "@/components/Gallery";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const content = await getSiteContent();
  const { settings, navLinks, features, protocolSteps, galleryItems, pricingTiers } = content;
  const ctaText = settings?.cta_text ?? "Access the Experience";

  return (
    <>
      <Navbar settings={settings} links={navLinks} ctaText={ctaText} />
      <main>
        <Hero settings={settings} />
        <FeatureCards features={features} />
        <Philosophy settings={settings} />
        <Protocol steps={protocolSteps} />
        <Gallery items={galleryItems} />
        <Pricing tiers={pricingTiers} ctaText={ctaText} />
        <Footer settings={settings} navLinks={navLinks} />
      </main>
    </>
  );
}
