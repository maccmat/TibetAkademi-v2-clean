
import AnimatedSection from "@/components/AnimatedSection";
import Image from "next/image";
import { promises as fs } from 'fs';
import path from 'path';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  date?: string;
  event?: string; // e.g., "Erasmus+ Youth Exchange in Italy"
}

async function getGalleryImages(): Promise<GalleryImage[]> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'gallery.json');
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const images: GalleryImage[] = JSON.parse(fileContents);
    return images;
  } catch (error) {
    console.error("Failed to load or parse gallery.json:", error);
    // Fallback to an empty array or a sample image if JSON fails
    return [
      {
        id: "fallback-gallery-1",
        src: "/placeholder-gallery-1.jpg", // Ensure this placeholder exists
        alt: "Örnek Galeri Resmi 1 (Veri Yüklenemedi)",
        title: "Yükleme Hatası"
      },
      {
        id: "fallback-gallery-2",
        src: "/placeholder-gallery-2.jpg", // Ensure this placeholder exists
        alt: "Örnek Galeri Resmi 2 (Veri Yüklenemedi)",
        title: "Veri Yok"
      }
    ];
  }
}

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <div className="bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200 min-h-screen pt-24 md:pt-32">
      <AnimatedSection className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 dark:text-cyan-400 mb-4">
            Proje Galerimiz
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Projelerimizden ve etkinliklerimizden en güzel anları burada keşfedin. Her bir kare, unutulmaz bir deneyimin ve başarının yansımasıdır.
          </p>
        </div>

        {images.length === 0 ? (
          <AnimatedSection className="text-center py-10">
            <p className="text-xl text-gray-500 dark:text-gray-400">Galeri için henüz resim eklenmemiştir.</p>
          </AnimatedSection>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {images.map((image, index) => (
              <AnimatedSection 
                key={image.id} 
                delay={`delay-${(index % 4) * 100}`} // Staggered delay for visual appeal
                className="group relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-105 aspect-square"
              >
                <Image 
                  src={image.src} 
                  alt={image.alt}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-110"
                />
                {(image.title || image.event) && (
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity duration-300 flex flex-col justify-end p-4">
                    {image.title && <h3 className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{image.title}</h3>}
                    {image.event && <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">{image.event}</p>}
                  </div>
                )}
              </AnimatedSection>
            ))}
          </div>
        )}
        
        {/* Placeholder for pagination or load more button if many images */}
        {images.length > 16 && (
            <AnimatedSection className="text-center mt-12 md:mt-16">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95">
                    Daha Fazla Yükle
                </button>
            </AnimatedSection>
        )}
      </AnimatedSection>
    </div>
  );
}

