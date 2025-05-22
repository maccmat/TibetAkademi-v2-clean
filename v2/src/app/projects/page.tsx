
import AnimatedSection from "@/components/AnimatedSection";
import ProjectCard from "@/components/ProjectCard";
// import { promises as fs } from 'fs'; // Commented out fs and path for hardcoding
// import path from 'path';

// Define the Project interface to match the structure
interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  tags: string[];
  detailsLink: string;
  category?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  partners?: string[];
  fundingSource?: string;
}

// Hardcoded project data as a fallback for build
const hardcodedProjects: Project[] = [
  {
    id: "hc-alpha",
    title: "Örnek Proje Alfa (Sabit Veri)",
    description: "Bu proje, dinamik veri yükleme sorunlarını aşmak için sabit olarak kodlanmıştır. Erasmus+ gençlik değişim programları üzerine odaklanmaktadır.",
    imageUrl: "/placeholder-project-1.jpg",
    tags: ["erasmus", "gençlik", "sabitveri"],
    detailsLink: "/projects/hc-alpha",
    category: "Gençlik Değişimi"
  },
  {
    id: "hc-beta",
    title: "Örnek Proje Beta (Sabit Veri)",
    description: "Sosyal yardım ve dayanışma temalı bu örnek proje, topluluk katılımını ve gönüllülüğü teşvik eder.",
    imageUrl: "/placeholder-project-2.jpg",
    tags: ["sosyalyardım", "dayanışma", "sabitveri"],
    detailsLink: "/projects/hc-beta",
    category: "Sosyal Sorumluluk"
  },
  {
    id: "hc-gamma",
    title: "Örnek Proje Gamma (Sabit Veri)",
    description: "Kültürlerarası sanat atölyelerini içeren bu proje, yaratıcılığı ve sanatsal ifadeyi ön plana çıkarır.",
    imageUrl: "/placeholder-project-3.jpg",
    tags: ["sanat", "kültür", "sabitveri"],
    detailsLink: "/projects/hc-gamma",
    category: "Kültürlerarası Sanat"
  }
];

// Async function getProjects is no longer used for build, but kept for potential future use in client-side fetching or if build issues are resolved
// async function getProjects(): Promise<Project[]> {
//   const filePath = path.join(process.cwd(), 'public', 'data', 'projects.json');
//   ...
// }

export default async function ProjectsPage() {
  // Use hardcodedProjects directly for the build
  const projects = hardcodedProjects; 

  return (
    <div className="bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200 min-h-screen pt-24 md:pt-32">
      <AnimatedSection className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 dark:text-cyan-400 mb-4">
            Tüm Projelerimiz
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Yürüttüğümüz, katıldığımız ve katkıda bulunduğumuz tüm Erasmus+ ve sosyal sorumluluk projelerini burada bulabilirsiniz.
          </p>
        </div>

        {(!projects || projects.length === 0) ? (
          <AnimatedSection className="text-center py-10">
            <p className="text-xl text-gray-500 dark:text-gray-400">Şu anda görüntülenecek proje bulunmamaktadır.</p>
          </AnimatedSection>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {projects.map((project, index) => (
              <AnimatedSection key={project.id || `project-${index}`} delay={`delay-${(index % 3) * 150}`}>
                <ProjectCard 
                  title={project.title}
                  description={project.description}
                  imageUrl={project.imageUrl}
                  tags={project.tags}
                  detailsLink={project.detailsLink || `/projects/${project.id}`}
                  category={project.category}
                />
              </AnimatedSection>
            ))}
          </div>
        )}
        
        {projects && projects.length > 9 && (
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

