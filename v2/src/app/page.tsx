import FullscreenHero from "@/components/FullscreenHero";
import Image from 'next/image';
import Link from 'next/link';
import SocialFeed from '@/components/SocialFeed';
import AnimatedSection from '@/components/AnimatedSection';
import LoopingVideoBox from "@/components/LoopingVideoBox";
import FeaturedProjectsCarousel from "@/components/FeaturedProjectsCarousel";
import CountUp from "@/components/CountUp";

// Sample data for featured projects - replace with actual data fetching or props later
const featuredProjectsData = [
  {
    id: "alpha",
    title: "Proje Alfa: Gençlik Köprüsü",
    description: "Avrupa'nın farklı köşelerinden gençleri bir araya getiren bu proje, kültürlerarası diyaloğu ve anlayışı güçlendirmeyi amaçladı.",
    imageUrl: "/placeholder-project-1.jpg", // Ensure these images exist in /public/images or similar
    tags: ["erasmusplus", "gençlikdeğişimi", "kültürlerarası"],
    detailsLink: "/projects/alpha",
    category: "Gençlik Değişimi"
  },
  {
    id: "beta",
    title: "Proje Beta: Dayanışmanın Gücü",
    description: "Toplumsal dayanışmayı ve gönüllülüğü ön plana çıkaran bu proje, yerel toplulukların ihtiyaçlarına yönelik çözümler üretti.",
    imageUrl: "/placeholder-project-2.jpg",
    tags: ["sosyalyardım", "gönüllülük", "toplulukkatılımı"],
    detailsLink: "/projects/beta",
    category: "Sosyal Sorumluluk"
  },
  {
    id: "gamma",
    title: "Proje Gamma: Sanatın Evrensel Dili",
    description: "Sanat ve yaratıcılığı kullanarak farklı kültürlerden katılımcıların ortak bir dil oluşturmasını sağlayan atölye çalışmaları düzenlendi.",
    imageUrl: "/placeholder-project-3.jpg",
    tags: ["sanatveeğitim", "yaratıcıatölyeler", "kültürsanat"],
    detailsLink: "/projects/gamma",
    category: "Kültürlerarası Sanat"
  },
  {
    id: "delta",
    title: "Proje Delta: Dijital Dönüşüm Elçileri",
    description: "Gençlerin dijital becerilerini artırmaya yönelik eğitimler ve uygulamalar içeren bu proje, dijital okuryazarlığı teşvik etti.",
    imageUrl: "/placeholder-project-4.jpg", // Add more placeholder images
    tags: ["dijitalbeceriler", "teknoloji", "eğitimdeyenilik"],
    detailsLink: "/projects/delta",
    category: "Dijital Yetkinlik"
  },
    {
    id: "epsilon",
    title: "Proje Epsilon: Çevre Bilinci Hareketi",
    description: "Sürdürülebilirlik ve çevre koruma konularında farkındalık yaratmayı amaçlayan bu proje, çeşitli atölye ve saha çalışmaları içerdi.",
    imageUrl: "/placeholder-project-5.jpg",
    tags: ["çevrebilinci", "sürdürülebilirlik", "doğakoruma"],
    detailsLink: "/projects/epsilon",
    category: "Çevre ve Sürdürülebilirlik"
  }
];

export default function HomePage() {
  return (
    <>
      <FullscreenHero />
      <main className="w-full m-0 p-0">
        {/* About Section with Smooth Gradient Background */}
        <AnimatedSection 
          className="py-20 section-transition-hero w-full m-0 p-0"
          animation="fadeIn"
        >
          <div className="w-full px-4 sm:px-6 lg:px-8 m-0">
            {/* Centered heading with professional font */}
            <h2 className="section-heading text-4xl md:text-5xl font-bold mb-10 text-center">
              Hakkımızda Kısa Bir Bakış
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left column for text - 5 columns wide */}
              <div className="lg:col-span-5 unified-card p-6 rounded-lg shadow-soft hover:shadow-elevated transition-all duration-300">
                <div className="text-lg text-gray-700 space-y-4">
                  <p className="transform transition-all duration-500 hover:text-primary-700">
                    Biz, sosyal yardım ve dayanışma alanında fark yaratmayı hedefleyen, Avrupa genelinde Erasmus+ projeleri yürüten tutkulu bir ekibiz.
                    Projelerimiz, kültürlerarası anlayışı teşvik ederken, katılımcılarımıza benzersiz deneyimler sunar.
                  </p>
                  <p className="transform transition-all duration-500 hover:text-primary-700">
                    Bu platform, yürüttüğümüz, katıldığımız ve katkıda bulunduğumuz projeleri, elde ettiğimiz başarıları ve katılımcılarımızın değerli deneyimlerini sizlerle paylaşmak için tasarlandı.
                  </p>
                </div>
                <div className="mt-8">
                  <Link href="/about" 
                    className="btn-enhanced">
                    Daha Fazla Bilgi Edinin
                  </Link>
                </div>
              </div>
              
              {/* Right column for stats - 7 columns wide */}
              <div className="lg:col-span-7">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="unified-card p-6 text-center rounded-lg transform transition-all duration-300 hover:scale-105 hover:bg-background-highlight hover-glow">
                    <CountUp 
                      end={7} 
                      suffix="+" 
                      className="text-5xl font-bold text-primary-600"
                      duration={2500}
                    />
                    <p className="text-gray-700 mt-2 font-medium">Tamamlanan Proje</p>
                  </div>
                  <div className="unified-card p-6 text-center rounded-lg transform transition-all duration-300 hover:scale-105 hover:bg-background-highlight hover-glow">
                    <CountUp 
                      end={188} 
                      suffix="+" 
                      className="text-5xl font-bold text-primary-600"
                      duration={3000}
                      delay={200}
                    />
                    <p className="text-gray-700 mt-2 font-medium">Katılımcı</p>
                  </div>
                  <div className="unified-card p-6 text-center rounded-lg transform transition-all duration-300 hover:scale-105 hover:bg-background-highlight hover-glow">
                    <CountUp 
                      end={4} 
                      suffix="+" 
                      className="text-5xl font-bold text-primary-600"
                      duration={2000}
                      delay={400}
                    />
                    <p className="text-gray-700 mt-2 font-medium">Ülke</p>
                  </div>
                  <div className="unified-card p-6 text-center rounded-lg transform transition-all duration-300 hover:scale-105 hover:bg-background-highlight hover-glow">
                    <CountUp 
                      end={2} 
                      suffix="+" 
                      className="text-5xl font-bold text-primary-600"
                      duration={1500}
                      delay={600}
                    />
                    <p className="text-gray-700 mt-2 font-medium">Yıllık Deneyim</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Full-width video section with three videos in a row */}
            <div className="w-full mt-10">
              <div className="unified-card p-6 rounded-lg shadow-soft hover:shadow-elevated transition-all duration-300">
                <div className="video-row">
                  <div className="video-container">
                    <div>
                      <LoopingVideoBox 
                        videoSrc="/sample-video.mp4" 
                        className="w-full aspect-video rounded-lg shadow-soft hover:shadow-elevated transition-all duration-300"
                        title="Erasmus+ Gençlik Değişimi"
                      />
                    </div>
                    <div>
                      <LoopingVideoBox 
                        videoSrc="/sample-video.mp4" 
                        className="w-full aspect-video rounded-lg shadow-soft hover:shadow-elevated transition-all duration-300"
                        title="Kültürlerarası Atölyeler"
                      />
                    </div>
                    <div>
                      <LoopingVideoBox 
                        videoSrc="/sample-video.mp4" 
                        className="w-full aspect-video rounded-lg shadow-soft hover:shadow-elevated transition-all duration-300"
                        title="Proje Etkinlikleri"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-500 mt-3">
                  (Örnek videolar gösterilmektedir. Gerçek proje kesitleri eklenecektir.)
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Projects Section with Smooth Gradient Background */}
        <div className="section-divider"></div>
        <AnimatedSection 
          className="py-16 w-full m-0 p-0 section-transition-about"
          animation="slideInFromLeft"
        >
          <div className="w-full px-4">
            <h2 className="section-heading text-4xl font-bold text-center mb-12">
              Öne Çıkan Projelerimiz
            </h2>
            <FeaturedProjectsCarousel projects={featuredProjectsData} />
            <div className="text-center mt-12">
              <Link href="/projects" 
                className="btn-enhanced">
                Tüm Projeleri Gör
              </Link>
            </div>
          </div>
        </AnimatedSection>

        {/* Social Feed Section with Smooth Gradient Background */}
        <div className="section-divider"></div>
        <AnimatedSection 
          className="py-16 w-full m-0 p-0 section-transition-projects"
          animation="zoomIn"
        >
          <div className="w-full px-4">
            <h2 className="section-heading text-4xl font-bold text-center mb-12">
              Son Gelişmeler ve Paylaşımlar
            </h2>
            <SocialFeed />
          </div>
        </AnimatedSection>
      </main>
    </>
  );
}
