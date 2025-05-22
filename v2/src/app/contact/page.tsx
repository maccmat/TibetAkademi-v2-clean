
import AnimatedSection from "@/components/AnimatedSection";
import { Mail, Phone, MapPin } from "lucide-react"; // Icons for contact details

export default function ContactPage() {
  return (
    <div className="bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200 min-h-screen pt-24 md:pt-32">
      <AnimatedSection className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 dark:text-cyan-400 mb-4">
            Bize Ulaşın
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Projelerimiz, işbirlikleri veya herhangi bir sorunuz için bizimle iletişime geçmekten çekinmeyin. Size yardımcı olmaktan mutluluk duyarız.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Contact Form Section */}
          <AnimatedSection delay="delay-150" className="bg-gray-50 dark:bg-gray-800 p-8 md:p-10 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-cyan-300 mb-6">Mesaj Gönderin</h2>
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Adınız Soyadınız</label>
                <input type="text" name="name" id="name" autoComplete="name" required 
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm transition-colors duration-300 transform hover:scale-[1.01] focus:scale-[1.02]" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">E-posta Adresiniz</label>
                <input type="email" name="email" id="email" autoComplete="email" required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm transition-colors duration-300 transform hover:scale-[1.01] focus:scale-[1.02]" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Konu</label>
                <input type="text" name="subject" id="subject" required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm transition-colors duration-300 transform hover:scale-[1.01] focus:scale-[1.02]" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mesajınız</label>
                <textarea id="message" name="message" rows={4} required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm transition-colors duration-300 transform hover:scale-[1.01] focus:scale-[1.02]"></textarea>
              </div>
              <div>
                <button type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-all duration-300 transform hover:scale-105 active:scale-95">
                  Mesajı Gönder
                </button>
              </div>
            </form>
          </AnimatedSection>

          {/* Contact Details Section */}
          <AnimatedSection delay="delay-300" className="space-y-8 md:pt-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-cyan-300 mb-4">İletişim Bilgilerimiz</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Aşağıdaki bilgiler aracılığıyla da bize doğrudan ulaşabilirsiniz. En kısa sürede size geri dönüş yapacağız.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
                <Mail className="h-8 w-8 text-blue-600 dark:text-cyan-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-cyan-300">E-posta</h3>
                  <a href="mailto:info@tibetakademi.com" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">info@tibetakademi.com</a>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
                <Phone className="h-8 w-8 text-blue-600 dark:text-cyan-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-cyan-300">Telefon</h3>
                  <a href="tel:+900000000000" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">+90 (000) 000 00 00 (Örnek)</a>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
                <MapPin className="h-8 w-8 text-blue-600 dark:text-cyan-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-cyan-300">Adres</h3>
                  <p className="text-gray-700 dark:text-gray-300">Örnek Mah. Akademi Sk. No:123, Örnek İlçe/İstanbul (Örnek Adres)</p>
                </div>
              </div>
            </div>
            {/* Optional: Add a map embed here */}
            {/* <div className="mt-8 rounded-lg overflow-hidden shadow-xl h-64 md:h-80">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d..." width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy"></iframe>
            </div> */}
          </AnimatedSection>
        </div>
      </AnimatedSection>
    </div>
  );
}

