import { Button } from "@/components/ui/button";
import { useMemo } from "react";

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
    description: "Looduslike toimeainetega salendav kehamähis vööümbermõõdu vähendamiseks",
  },
  {
    name: "Inframatt + WowShape + EndosTherapy",
    price: 89,
    url: "https://kehastuudio.ee/toode/inframatt-wowshape-endostherapy-kombo/",
    description: "Kombineeritud hooldus: infrapunasoojus + salendav mähis + mikrovibratsioon",
  },
];

const ExportEmail = () => {
  const emailHtml = useMemo(() => {
    const offers = treatments
      .map(
        (t) => `
          <tr>
            <td style="padding:12px 0; border-bottom:1px solid #f0d9d6;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; font-size:16px; color:#2c2c2c;">
                    <a href="${t.url}" target="_blank" style="color:#9d4552; text-decoration:none; font-weight:600;">${t.name}</a>
                  </td>
                  <td align="right" style="font-family: Georgia, 'Times New Roman', serif; font-size:20px; color:#9d4552; font-weight:bold; white-space:nowrap;">
                    ${t.price} EUR
                  </td>
                </tr>
              </table>
              <div style="font-family: Arial, Helvetica, sans-serif; font-size:12px; color:#6b6b6b; line-height:1.5; padding-top:6px;">
                ${t.description}
              </div>
            </td>
          </tr>`
      )
      .join("\n");

    return `<!doctype html>
<html lang="et">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Kehastuudio – Proovikordade eripakkumised</title>
<meta name="x-preheader" content="Avasta meie efektiivsed kehahooldused ja broneeri oma proovikord soodushinnaga."/>
</head>
<body style="margin:0; padding:0; background-color:#fbf7f5;">
  <center>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#fbf7f5; padding:16px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:600px; max-width:600px; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.06);">
            <tr>
              <td align="center" style="background:#f7e9e7; padding:32px 24px;">
                <h1 style="margin:0; font-family: Georgia, 'Times New Roman', serif; font-size:28px; color:#4a2a2a; letter-spacing:0.3px;">Kehastuudio</h1>
                <p style="margin:8px 0 0; font-family: Arial, Helvetica, sans-serif; font-size:16px; color:#745e5e;">Teie Keha, Meie teha!</p>
              </td>
            </tr>

            <tr>
              <td style="padding:24px 24px 0 24px;">
                <h2 style="margin:0 0 8px 0; font-family: Georgia, 'Times New Roman', serif; font-size:22px; color:#9d4552; text-align:center;">Avasta meie efektiivsed kehahooldused</h2>
                <p style="margin:0; font-family: Arial, Helvetica, sans-serif; font-size:16px; color:#2c2c2c; line-height:1.6; text-align:center;">
                  Kui Sa ei ole veel proovinud mõnda nendest Kehastuudio efektiivsetest kehahooldustest, siis soetades pileti täna läbi meie veebi on kõik proovikorrad soodushindadega.
                </p>
                <p style="margin:8px 0 0 0; font-family: Arial, Helvetica, sans-serif; font-size:14px; color:#6b6b6b; text-align:center;">Küsimuste korral võta meiega julgelt ühendust.</p>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 24px 0 24px;">
                <h3 style="margin:0 0 10px 0; font-family: Georgia, 'Times New Roman', serif; font-size:18px; color:#9d4552; text-align:center;">Proovikordade eripakkumised</h3>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  ${offers}
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:24px 24px 0 24px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:linear-gradient(90deg,#f4cbd0,#f2d5b8); border:1px solid #e8b9b5; border-radius:14px;">
                  <tr>
                    <td style="padding:18px 20px; text-align:center;">
                      <p style="margin:0 0 8px 0; font-family: Arial, Helvetica, sans-serif; font-size:16px; color:#9d4552; font-weight:600;">Oled alati oodatud ka tasuta konsultatsioonile!</p>
                      <p style="margin:0; font-family: Arial, Helvetica, sans-serif; font-size:14px; color:#2c2c2c;">Meie spetsialist leiab Teile prima ja efektiivseima lahenduse.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- 1 cm spacer -->
            <tr>
              <td style="height:37.8px; line-height:37.8px;">&nbsp;</td>
            </tr>

            <tr>
              <td align="center" style="padding:0 24px 8px 24px;">
                <a href="https://broneerimine.timma.ee/kehastuudio" target="_blank" style="display:inline-block; background:linear-gradient(90deg,#b35a68,#9d4552); color:#ffffff; text-decoration:none; font-family: Arial, Helvetica, sans-serif; font-size:16px; padding:16px 28px; border-radius:14px; font-weight:600;">
                  Broneeri oma proovikord
                </a>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:20px 24px 28px 24px; border-top:1px solid #f0d9d6;">
                <p style="margin:0; font-family: Arial, Helvetica, sans-serif; font-size:14px; color:#9d4552; font-weight:600;">Kehastuudio</p>
                <p style="margin:4px 0 0 0; font-family: Arial, Helvetica, sans-serif; font-size:12px; color:#6b6b6b;">Teie Keha - Meie teha</p>
                <p style="margin:8px 0 0 0; font-family: Arial, Helvetica, sans-serif; font-size:12px; color:#6b6b6b;">www.kehastuudio.ee · info@kehastuudio.ee · Tel: +372 5151566</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>`;
  }, []);

  const handleDownload = () => {
    const blob = new Blob([emailHtml], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kehastuudio-email-template.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(emailHtml);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-spa-blush via-background to-spa-cream p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        <header className="text-center space-y-1">
          <h1 className="text-3xl font-serif text-spa-rose">E-kirja HTML mall</h1>
          <p className="text-sm text-muted-foreground">Laadi alla või kopeeri e-kirja HTML Timma meilitemplatisse.</p>
        </header>
        <div className="flex items-center gap-3 justify-center">
          <Button onClick={handleDownload} className="px-6">Laadi alla HTML</Button>
          <Button onClick={handleCopy} variant="outline">Kopeeri HTML</Button>
        </div>
        <section className="grid md:grid-cols-2 gap-6 items-start">
          <div className="rounded-2xl border border-spa-blush/40 bg-card overflow-hidden">
            <div className="px-4 py-3 border-b border-spa-blush/30 text-sm text-muted-foreground">Eelvaade</div>
            <iframe title="email-preview" srcDoc={emailHtml} className="w-full" style={{ height: 900 }} />
          </div>
          <div className="rounded-2xl border border-spa-blush/40 bg-card overflow-hidden">
            <div className="px-4 py-3 border-b border-spa-blush/30 text-sm text-muted-foreground">HTML</div>
            <textarea readOnly className="w-full h-[900px] p-4 text-xs font-mono bg-transparent outline-none" defaultValue={emailHtml} />
          </div>
        </section>
      </div>
    </main>
  );
};

export default ExportEmail;
