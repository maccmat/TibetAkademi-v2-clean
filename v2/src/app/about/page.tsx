
import AnimatedSection from "@/components/AnimatedSection";
import Image from "next/image";
import LoopingVideoBox from "@/components/LoopingVideoBox"; // Import the video component

export default function AboutPage() {
  return (
    <div className="text-gray-800 dark:text-gray-200 min-h-screen pt-24 md:pt-32 w-full m-0 p-0">
      <AnimatedSection className="w-full px-4 py-12 md:py-16 m-0">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 dark:text-cyan-400 mb-4">
            Hakkımızda
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Tibet Akademi olarak, Avrupa Birliği Erasmus+ projeleri aracılığıyla bireylerin ve toplulukların gelişimine katkıda bulunuyoruz.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 items-start mb-12 md:mb-16 w-full"> {/* Changed to grid-cols-3 and items-start for better alignment with video */} 
          <AnimatedSection delay="delay-150" className="md:col-span-2"> {/* Text content takes 2 columns */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Image 
                  src="/placeholder-about-team.jpg" // Replace with an actual team or activity photo
                  alt="Tibet Akademi Ekibi"
                  width={600}
                  height={400}
                  className="object-cover w-full h-auto transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-cyan-300">Misyonumuz</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Misyonumuz, sosyal yardım ve dayanışma projeleriyle kültürlerarası anlayışı, aktif vatandaşlığı ve yaşam boyu öğrenmeyi teşvik etmektir. Katılımcılarımıza yeni beceriler kazandırmak, farklı bakış açıları sunmak ve onları küresel vatandaşlar olarak güçlendirmek için çalışıyoruz.
                </p>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-cyan-300 mt-6">Vizyonumuz</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Vizyonumuz, herkes için eşit fırsatlar sunan, daha adil, kapsayıcı ve sürdürülebilir bir dünya için projeler üreten lider bir sivil toplum kuruluşu olmaktır. Avrupa ve ötesindeki ortaklarımızla işbirliği içinde, pozitif sosyal etki yaratan yenilikçi çözümler geliştirmeyi hedefliyoruz.
                </p>
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay="delay-450" className="md:col-span-1"> {/* Video takes 1 column */}
            <LoopingVideoBox videoSrc="/video/sample_video.mp4" className="w-full h-auto max-w-sm mx-auto aspect-video" /> {/* Added video box, adjusted size and aspect ratio */}
          </AnimatedSection>
        </div>

        <AnimatedSection className="p-8 md:p-12 w-full">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-600 dark:text-cyan-400">Değerlerimiz</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[ "Şeffaflık", "İşbirliği", "Yenilikçilik", "Kapsayıcılık", "Sürdürülebilirlik", "Gönüllülük", "Saygı", "Hesap Verebilirlik"].map((value, index) => (
              <AnimatedSection key={value} delay={`delay-${index * 100}`} className="p-6 transform hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-cyan-300 mb-2">{value}</h3>
                {/* Optional: Add a short description for each value */}
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-12 md:mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-cyan-300 mb-6">Ekibimizle Tanışın (Yakında)</h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Projelerimizi hayata geçiren, alanında uzman ve tutkulu ekibimiz hakkında daha fazla bilgiyi yakında burada bulabilirsiniz.
          </p>
          {/* Placeholder for team members or a link to a future team page */}
        </AnimatedSection>

      </AnimatedSection>
    </div>
  );
}

