import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import spaHeroBg from "@/assets/spa-hero-bg.jpg";

const EmailTemplate = () => {
  const treatments = [
    { 
      name: "EndosTherapy", 
      price: 33, 
      url: "https://kehastuudio.ee/toode/endostherapy/",
      description: "Patenteeritud mikrovibratsiooni ja mikrosurve tehnoloogia tselluliidi vähendamiseks ja naha pinguldamiseks"
    },
    { 
      name: "LPG Massaaž", 
      price: 29, 
      url: "https://kehastuudio.ee/toode/lpg-massaaz-proovikord/",
      description: "Rullikutega vaakummassaaž vereringi parandamiseks ja tselluliidi vähendamiseks"
    },
    { 
      name: "Krüolipolüüs", 
      price: 59, 
      url: "https://kehastuudio.ee/toode/kruolipoluus/",
      description: "Rasvarakkude külmutamine - jäädav rasvkoe elimineerimine sihtpiirkondades"
    },
    { 
      name: "Kavi + RF vaakummassaaž + inframatt", 
      price: 49, 
      url: "https://kehastuudio.ee/toode/kavitatsioon/",
      description: "Ultrahelilained + raadiosagedustega massaaž + infrapunasoojus efektiivseks rasvapoletuseks"
    },
    { 
      name: "WowShape kehamähis", 
      price: 65, 
      url: "https://kehastuudio.ee/toode/wow-shape-kehamahis/",
      description: "Looduslike toimeainetega salendav kehamähis vööümbermõõdu vähendamiseks"
    },
    { 
      name: "Inframatt + WowShape + EndosTherapy", 
      price: 89, 
      url: "https://kehastuudio.ee/toode/inframatt-wowshape-endostherapy-kombo/",
      description: "Kombineeritud hooldus: infrapunasoojus + salendav mähis + mikrovibratsioon"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-spa-blush via-background to-spa-cream p-4">
      <div className="max-w-2xl mx-auto">
        {/* Email Container */}
        <div className="bg-card rounded-3xl overflow-hidden shadow-[var(--shadow-elegant)] border border-spa-blush/30">
          
          {/* Header with Background Image */}
          <div 
            className="relative h-64 bg-cover bg-center bg-no-repeat flex items-center justify-center"
            style={{ backgroundImage: `url(${spaHeroBg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-spa-rose/80 to-spa-warm/60"></div>
            <div className="relative text-center text-primary-foreground px-6">
              <h1 className="text-4xl font-serif mb-2 tracking-wide">
                Kehastuudio
              </h1>
              <p className="text-lg font-light opacity-95">
                Teie Keha, Meie teha!
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8 space-y-8">
            
            {/* Welcome Message */}
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-serif text-spa-rose mb-4">
                Avasta meie efektiivsed kehahooldused
              </h2>
              <p className="text-foreground leading-relaxed text-lg">
                Kui Sa ei ole veel proovinud mõnda nendest Kehastuudio efektiivsetest 
                kehahooldustest, siis soetades pileti täna läbi meie veebi on kõik 
                proovikorrad soodushindadega.
              </p>
              <p className="text-muted-foreground">
                Küsimuste korral võta meiega julgelt ühendust.
              </p>
            </div>

            {/* Treatment Offers */}
            <div className="space-y-4">
              <h3 className="text-xl font-serif text-spa-rose text-center mb-6">
                Proovikordade eripakkumised
              </h3>
              
              <div className="grid gap-4">
                {treatments.map((treatment, index) => (
                  <Card key={index} className="p-4 bg-spa-cream/30 border-spa-blush/40 hover:shadow-[var(--shadow-soft)] transition-all duration-300">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <a 
                          href={treatment.url}
                          className="font-medium text-foreground text-lg hover:text-spa-rose transition-colors duration-200 cursor-pointer flex-1"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {treatment.name}
                        </a>
                        <span className="text-2xl font-serif text-spa-rose font-bold ml-4">
                          {treatment.price} EUR
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {treatment.description}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center space-y-6 pt-4">
              <div className="bg-gradient-to-r from-spa-blush to-spa-warm p-6 rounded-2xl">
                <p className="text-lg font-medium text-spa-rose mb-4">
                  Oled alati oodatud ka tasuta konsultatsioonile!
                </p>
                <p className="text-foreground">
                  Meie spetsialist leiab Teile prima ja efektiivseima lahenduse.
                </p>
              </div>
              
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-spa-rose to-primary hover:from-spa-rose/90 hover:to-primary/90 text-primary-foreground px-8 py-6 rounded-2xl font-medium text-lg shadow-[var(--shadow-soft)] transition-all duration-300 hover:scale-105"
              >
                Broneeri oma proovikord
              </Button>
            </div>

            {/* Experience Badge */}
            <div className="text-center pt-6 border-t border-spa-blush/30">
              <div className="inline-flex items-center bg-gradient-to-r from-spa-gold/20 to-spa-warm/20 px-6 py-3 rounded-full border border-spa-gold/30">
                <span className="text-spa-rose font-serif text-lg">
                  ✨ Juba 15 aastat kogemusi kehahooldusprotseduuride vallas ✨
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-muted-foreground text-sm space-y-3 pt-6">
              <p className="text-spa-rose font-medium">Kehastuudio</p>
              <p>Teie Keha - Meie teha</p>
              <div className="space-y-1">
                <p>www.kehastuudio.ee</p>
                <p>info@kehastuudio.ee</p>
                <p>Tel: +372 5151566</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplate;