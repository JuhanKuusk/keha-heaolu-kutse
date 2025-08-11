import { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import spaHeroBg from "@/assets/spa-hero-bg.jpg";
import { toPng } from "html-to-image";
import { saveImage } from "@/lib/my-files";
import { useToast } from "@/components/ui/use-toast";

interface Treatment {
  name: string;
  price: number;
  url: string;
  description: string;
}

const treatments: Treatment[] = [
  {
    name: "EndosTherapy",
    price: 33,
    url: "https://kehastuudio.ee/toode/endostherapy/",
    description:
      "Patenteeritud mikrovibratsiooni ja mikrosurve tehnoloogia tselluliidi vähendamiseks ja naha pinguldamiseks",
  },
  {
    name: "LPG Massaaž",
    price: 29,
    url: "https://kehastuudio.ee/toode/lpg-massaaz-proovikord/",
    description:
      "Rullikutega vaakummassaaž vereringi parandamiseks ja tselluliidi vähendamiseks",
  },
  {
    name: "Krüolipolüüs",
    price: 59,
    url: "https://kehastuudio.ee/toode/kruolipoluus/",
    description:
      "Rasvarakkude külmutamine - jäädav rasvkoe elimineerimine sihtpiirkondades",
  },
  {
    name: "Kavi + RF vaakummassaaž + inframatt",
    price: 49,
    url: "https://kehastuudio.ee/toode/kavitatsioon/",
    description:
      "Ultrahelilained + raadiosagedustega massaaž + infrapunasoojus efektiivseks rasvapoletuseks",
  },
  {
    name: "WowShape kehamähis",
    price: 65,
    url: "https://kehastuudio.ee/toode/wow-shape-kehamahis/",
    description:
      "Looduslike toimeainetega salendav kehamähis vööümbermõõdu vähendamiseks",
  },
  {
    name: "Inframatt + WowShape + EndosTherapy",
    price: 89,
    url: "https://kehastuudio.ee/toode/inframatt-wowshape-endostherapy-kombo/",
    description:
      "Kombineeritud hooldus: infrapunasoojus + salendav mähis + mikrovibratsioon",
  },
];

const ExportImage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const autoMode = useRef<"html" | "png" | null>(null);
  const queuedSave = useRef<string | null>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);
  const [areas, setAreas] = useState<
    { coords: [number, number, number, number]; href: string; alt: string }[]
  >([]);
  const [generating, setGenerating] = useState(false);
  const [cardImages, setCardImages] = useState<
    { name: string; href: string; dataUrl: string; width: number; height: number }[]
  >([]);

  const { toast } = useToast();

  // Koordinaatide arvutamine kaartide ja CTA järgi
  const computeAreas = () => {
    const container = containerRef.current;
    if (!container)
      return [] as { coords: [number, number, number, number]; href: string; alt: string }[];

    const containerRect = container.getBoundingClientRect();

    const arr = (treatments
      .map((t, i) => {
        const el = cardRefs.current[i];
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const left = Math.max(0, Math.round(r.left - containerRect.left));
        const top = Math.max(0, Math.round(r.top - containerRect.top));
        const right = Math.round(left + r.width);
        const bottom = Math.round(top + r.height);
        return {
          coords: [left, top, right, bottom] as [number, number, number, number],
          href: t.url,
          alt: t.name,
        };
      })
      .filter(Boolean) as { coords: [number, number, number, number]; href: string; alt: string }[]);

    // Lisa CTA (broneerimine) klikatav ala, kui olemas
    const ctaEl = ctaRef.current;
    if (ctaEl) {
      const r = ctaEl.getBoundingClientRect();
      const left = Math.max(0, Math.round(r.left - containerRect.left));
      const top = Math.max(0, Math.round(r.top - containerRect.top));
      const right = Math.round(left + r.width);
      const bottom = Math.round(top + r.height);
      arr.push({
        coords: [left, top, right, bottom],
        href: "https://broneerimine.timma.ee/kehastuudio",
        alt: "Broneeri oma proovikord",
      });
    }

    return arr;
  };

  const handleGenerate = async () => {
    if (!containerRef.current) return;
    try {
      setGenerating(true);
      const el = containerRef.current;
      const width = el.offsetWidth;
      const height = el.offsetHeight;

      // Arvuta area-d ENNE renderdamist pildiks
      const computed = computeAreas();

      const dataUrl = await toPng(el, { pixelRatio: 1, cacheBust: true, width, height });
      setImageUrl(dataUrl);
      setImageSize({ width, height });
      setAreas(computed);
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = "kehastuudio-pakkumised.png";
    a.click();
  };

  const handleDownloadHtml = () => {
    if (!imageUrl || !imageSize) return;
    const mapAreas = areas
      .map(
        (a) => `<area shape="rect" coords="${a.coords.join(',')}" href="${a.href}" alt="${a.alt}" target="_blank" rel="noopener noreferrer" />`
      )
      .join('\n');
    const html = `<!doctype html>\n<html lang=\"et\">\n<head>\n<meta charset=\"UTF-8\"/>\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"/>\n<title>Kehastuudio pakkumised – klikatav pilt</title>\n</head>\n<body style=\"margin:0; padding:20px; background:#fbf7f5;\">\n  <center>\n    <div style=\"max-width:${imageSize.width}px;\">\n      <img src=\"${imageUrl}\" alt=\"Kehastuudio pakkumised\" usemap=\"#offers-map\" width=\"${imageSize.width}\" height=\"${imageSize.height}\" style=\"display:block; width:100%; height:auto;\"/>\n      <map name=\"offers-map\">\n        ${mapAreas}\n      </map>\n    </div>\n  </center>\n</body>\n</html>`;
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kehastuudio-pakkumised-clickable.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleGenerateCards = async () => {
    try {
      setGenerating(true);
      const results: { name: string; href: string; dataUrl: string; width: number; height: number }[] = [];
      for (let i = 0; i < cardRefs.current.length; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const width = el.offsetWidth;
        const height = el.offsetHeight;
        const dataUrl = await toPng(el, { pixelRatio: 1, cacheBust: true, width, height });
        results.push({ name: treatments[i].name, href: treatments[i].url, dataUrl, width, height });
      }
      setCardImages(results);
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  const handleDownloadCard = (img: { name: string; dataUrl: string }) => {
    const a = document.createElement("a");
    a.href = img.dataUrl;
    a.download = `kehastuudio-${img.name.replace(/\s+/g, "-").toLowerCase()}.png`;
    a.click();
  };

  const handleSaveToMyFiles = async () => {
    try {
      const filename = "kehastuudio-pakkumised.png";
      if (imageUrl) {
        const blob = await (await fetch(imageUrl)).blob();
        await saveImage(blob, filename);
        toast({ title: "Salvestatud", description: "Fail on nüüd jaotises \"My Files\"." });
        return;
      }
      // Kui pilti veel pole, genereeri ja salvesta pärast
      queuedSave.current = filename;
      await handleGenerate();
      // edasine salvestamine toimub useEffectis
    } catch (e) {
      console.error(e);
      toast({ title: "Salvestamine ebaõnnestus", description: "Palun proovi uuesti.", variant: "destructive" });
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const auto = params.get("auto");
    if (auto === "html" || auto === "png") {
      autoMode.current = auto as "html" | "png";
      // Genereeri pilt ja alad
      handleGenerate();
    }
  }, []);

  useEffect(() => {
    if (!autoMode.current) return;
    if (imageUrl && imageSize) {
      if (autoMode.current === "html") {
        handleDownloadHtml();
      } else {
        handleDownload();
      }
      autoMode.current = null;
    }
  }, [imageUrl, imageSize]);

  useEffect(() => {
    if (!queuedSave.current) return;
    if (!imageUrl) return;
    (async () => {
      try {
        const blob = await (await fetch(imageUrl)).blob();
        await saveImage(blob, queuedSave.current!);
        toast({ title: "Salvestatud", description: "Fail on nüüd jaotises \"My Files\"." });
      } catch (e) {
        console.error(e);
        toast({ title: "Salvestamine ebaõnnestus", description: "Palun proovi uuesti.", variant: "destructive" });
      } finally {
        queuedSave.current = null;
      }
    })();
  }, [imageUrl]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-spa-blush via-background to-spa-cream p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-serif text-spa-rose">Klikatav pildifail pakkumistega</h1>
          <p className="text-muted-foreground text-sm">
            Loo PNG-pilt olemasolevast mallist ja kasuta image-map’i, et igale teenusele lisada klikitav ala.
          </p>
        </header>

        <div className="flex items-center gap-3 justify-center">
          <Button onClick={handleGenerate} disabled={generating} className="px-6">
            {generating ? "Genereerin..." : "Loo pildifail"}
          </Button>
          <Button onClick={handleDownload} variant="outline" disabled={!imageUrl}>
            Laadi alla PNG
          </Button>
          <Button onClick={handleDownloadHtml} variant="outline" disabled={!imageUrl}>
            Laadi alla HTML (klikitav)
          </Button>
          <Button onClick={handleSaveToMyFiles} variant="secondary" disabled={generating}>
            Salvesta Minu failidesse
          </Button>
          <Button onClick={handleGenerateCards} variant="secondary" disabled={generating} className="px-6">
            Loo eraldi pildid
          </Button>
        </div>

        {/* Mall, millest tehakse pilt (fikseeritud 600px laius) */}
        <section className="mx-auto" style={{ width: 600 }}>
          <div
            ref={containerRef}
            className="bg-card rounded-3xl overflow-hidden shadow-[var(--shadow-elegant)] border border-spa-blush/30"
          >
            {/* Header koos taustapildiga */}
            <div
              className="relative h-64 bg-cover bg-center bg-no-repeat flex items-center justify-center"
              style={{ backgroundImage: `url(${spaHeroBg})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-spa-rose/80 to-spa-warm/60" />
              <div className="relative text-center text-primary-foreground px-6">
                <h2 className="text-4xl font-serif mb-2 tracking-wide">Kehastuudio</h2>
                <p className="text-lg font-light opacity-95">Teie Keha, Meie teha!</p>
              </div>
            </div>

            {/* Sisu */}
            <div className="p-8 space-y-8">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-serif text-spa-rose mb-4">Avasta meie efektiivsed kehahooldused</h3>
                <p className="text-foreground leading-relaxed text-lg">
                  Kui Sa ei ole veel proovinud mõnda nendest Kehastuudio efektiivsetest kehahooldustest, siis soetades
                  pileti täna läbi meie veebi on kõik proovikorrad soodushindadega.
                </p>
                <p className="text-muted-foreground">Küsimuste korral võta meiega julgelt ühendust.</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-serif text-spa-rose text-center mb-6">Proovikordade eripakkumised</h4>
                <div className="grid gap-4">
                  {treatments.map((t, i) => (
                    <Card
                      key={t.name}
                      ref={(el) => (cardRefs.current[i] = el)}
                      className="p-4 bg-spa-cream/30 border-spa-blush/40"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-foreground text-lg flex-1">{t.name}</span>
                          <span className="text-2xl font-serif text-spa-rose font-bold ml-4">{t.price} EUR</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{t.description}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="text-center space-y-6 pt-4">
                <div ref={ctaRef} className="bg-gradient-to-r from-spa-blush to-spa-warm p-6 rounded-2xl">
                  <p className="text-lg font-medium text-spa-rose mb-4">Oled alati oodatud ka tasuta konsultatsioonile!</p>
                  <p className="text-foreground">Meie spetsialist leiab Teile prima ja efektiivseima lahenduse.</p>
                </div>
              </div>

              <div className="text-center pt-6 border-t border-spa-blush/30">
                <div className="inline-flex items-center bg-gradient-to-r from-spa-gold/20 to-spa-warm/20 px-6 py-3 rounded-full border border-spa-gold/30">
                  <span className="text-spa-rose font-serif text-lg">
                    ✨ Juba 15 aastat kogemusi kehahooldusprotseduuride vallas ✨
                  </span>
                </div>
              </div>

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
        </section>

        {/* Tulemuse eelvaade klikatava kaardiga */}
        {imageUrl && imageSize && (
          <section className="space-y-3">
            <h2 className="text-center text-lg font-medium">Klikatav eelvaade</h2>
            <div className="mx-auto" style={{ width: imageSize.width }}>
              <img
                src={imageUrl}
                alt="Kehastuudio pakkumised – klikatav pilt"
                useMap="#offers-map"
                width={imageSize.width}
                height={imageSize.height}
                loading="lazy"
              />
              <map name="offers-map">
                {areas.map((a, idx) => (
                  <area
                    key={idx}
                    shape="rect"
                    coords={a.coords.join(",")}
                    href={a.href}
                    alt={a.alt}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                ))}
              </map>
            </div>
            <p className="text-center text-xs text-muted-foreground">
              Märkus: PNG ise ei sisalda linke. Klikitavus toimib HTML image-map’i abil (sobib veebilehele ja paljudesse
              e-posti kliendidesse).
            </p>
          </section>
        )}
        {cardImages.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-center text-lg font-medium">Eraldi pildid iga pakkumise jaoks</h2>
            <div className="grid gap-6">
              {cardImages.map((img) => (
                <article key={img.name} className="space-y-2">
                  <img
                    src={img.dataUrl}
                    alt={`Pakkumine – ${img.name}`}
                    width={img.width}
                    height={img.height}
                    loading="lazy"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{img.name}</span>
                    <div className="flex gap-2">
                      <a href={img.href} target="_blank" rel="noopener noreferrer" className="underline text-sm">
                        Ava link
                      </a>
                      <Button size="sm" onClick={() => handleDownloadCard(img)}>Laadi alla</Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ExportImage;
