import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { listImages, deleteImage, MyFile } from "@/lib/my-files";

const MyFiles = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState<MyFile[]>([]);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "My Files – salvestatud pildid";
  }, []);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      const items = await listImages();
      setFiles(items);
      // Loome eelvaate URLid
      const map: Record<string, string> = {};
      for (const f of items) {
        map[f.id] = URL.createObjectURL(f.blob);
      }
      setUrls(map);
      setLoading(false);
    };
    run();

    return () => {
      // Puhastame URLid
      Object.values(urls).forEach((u) => URL.revokeObjectURL(u));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDownload = async (f: MyFile) => {
    const url = urls[f.id] || URL.createObjectURL(f.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = f.name;
    a.click();
    if (!urls[f.id]) URL.revokeObjectURL(url);
  };

  const handleDelete = async (f: MyFile) => {
    await deleteImage(f.id);
    URL.revokeObjectURL(urls[f.id]);
    setFiles((prev) => prev.filter((x) => x.id !== f.id));
    setUrls((prev) => {
      const { [f.id]: _, ...rest } = prev;
      return rest;
    });
    toast({ title: "Kustutatud", description: `${f.name} eemaldatud.` });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-spa-blush via-background to-spa-cream p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-serif text-spa-rose">My Files</h1>
          <p className="text-muted-foreground text-sm">
            Siin näed salvestatud PNG-faile. Saad need alla laadida või kustutada.
          </p>
        </header>

        {loading ? (
          <p className="text-center text-muted-foreground">Laen faile...</p>
        ) : files.length === 0 ? (
          <section className="text-center text-muted-foreground">
            <p>Hetkel pole salvestatud faile.</p>
            <p className="text-sm">Mine lehele “Export Image” ja salvesta pilt nupuga “Salvesta Minu failidesse”.</p>
          </section>
        ) : (
          <section className="grid gap-6 sm:grid-cols-2">
            {files.map((f) => (
              <Card key={f.id} className="p-4 bg-spa-cream/30 border-spa-blush/40">
                <article className="space-y-3">
                  <img
                    src={urls[f.id]}
                    alt={`Salvestatud PNG – ${f.name}`}
                    loading="lazy"
                    className="w-full h-auto rounded-md"
                  />
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <p className="font-medium text-foreground truncate max-w-[12rem]" title={f.name}>
                        {f.name}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {(f.size / 1024).toFixed(1)} KB · {new Date(f.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleDownload(f)}>
                        Laadi alla
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(f)}>
                        Kustuta
                      </Button>
                    </div>
                  </div>
                </article>
              </Card>
            ))}
          </section>
        )}
      </div>
    </main>
  );
};

export default MyFiles;
