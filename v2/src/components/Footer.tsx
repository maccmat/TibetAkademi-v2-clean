import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="pt-10 pb-4 mt-auto w-full m-0">
      <div className="w-full px-4 m-0">
        {/* Subscribe Section */}
        <div className="bg-primary-color text-white p-8 mb-10 text-center w-full rounded-lg shadow-md">
          <h3 className="text-3xl font-bold mb-4">Bültenimize Abone Olun!</h3>
          <p className="mb-6 text-blue-50">En son güncellemeleri, haberleri ve projelerimizi doğrudan gelen kutunuza alın.</p>
          <form className="flex flex-col sm:flex-row gap-4 w-full max-w-4xl mx-auto">
            <Input
              type="text"
              placeholder="Adınız"
              className="bg-white border-gray-300 focus:ring-primary-color focus:border-primary-color"
            />
            <Input
              type="email"
              placeholder="E-posta Adresiniz"
              className="bg-white border-gray-300 focus:ring-primary-color focus:border-primary-color"
            />
            <Button type="submit" className="bg-white hover:bg-blue-50 text-primary-color font-semibold px-6 py-2.5 border border-primary-color hover:shadow-md transition-all duration-300">
              Gönder
            </Button>
          </form>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-sm text-gray-600 w-full">
          <p>&copy; {new Date().getFullYear()} tibetakademi.com. Tüm hakları saklıdır.</p>
          <p>Next.js ve Tailwind CSS ile oluşturulmuştur.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

