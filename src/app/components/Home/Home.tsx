"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { use, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

function HomeComponent() {
  const [km, setKm] = useState("");
  const [litro, setLitro] = useState("");
  const [preco, setPreco] = useState("");
  const [resultado, setResultado] = useState<number | null>(null);
  const [erro, setErro] = useState("");
  const [volta, setVolta] = useState(false);

  const calcular = () => {
    let kmPercorrido = parseFloat(km.replace(",", "."));
    const litrosGastos = parseFloat(litro.replace(",", "."));
    const precoLitro = parseFloat(preco.replace(",", "."));

    if (isNaN(kmPercorrido) || isNaN(litrosGastos) || isNaN(precoLitro)) {
      setErro("Favor, preencha todos os campos correntamente.");
    }

    if (volta) {
      kmPercorrido *= 2;
    }

    const consumo = (kmPercorrido / litrosGastos) * precoLitro;
    setResultado(Number(consumo.toFixed(2)));
    setErro("");
  };

  const clearAll = () => {
    setKm("");
    setLitro("");
    setPreco("");
    setResultado(null);
    setVolta(false);
  };

  function apenasNumeros(e: React.KeyboardEvent<HTMLInputElement>) {
    const tecla = e.key;
    const permitido = /[0-9]|,|\./;

    if (!permitido.test(tecla) && tecla !== "Backspace" && tecla !== "Tab") {
      e.preventDefault();
    }
  }

  return (
    <Card className="w-full max-w-md p-6 shadow-xl border border-violet-50 rounded-3xl bg-gradient-to-br  ">
      <CardContent className="space-y-10">
        <div className="flex justify-center">
          <h2 className="text-xl  font-bold">Calcule seu consumo 🚗</h2>
        </div>
        <div className="space-y-6 ">
          <div className="flex flex-col space-y-2 ">
            <Label className="text-sm">Distância percorrida</Label>
            <Input
              className="bg-white"
              placeholder="Km"
              value={volta ? +km * 2 : km}
              onChange={(e) => setKm(e.target.value)}
              onKeyDown={apenasNumeros}
            />
            <div className="space-x-2">
              <Checkbox
                className="bg-white"
                checked={volta}
                onCheckedChange={(e) => setVolta(!volta)}
              />
              <span>Adicionar caminho de volta?</span>
            </div>
          </div>
          <div>
            <Label className="text-sm">Consumo médio do veículo</Label>
            <Input
              className="bg-white"
              placeholder="Km/l"
              value={litro}
              onChange={(e) => setLitro(e.target.value)}
              onKeyDown={apenasNumeros}
            />
          </div>
          <div>
            <Label className="text-sm">Preço por litro</Label>
            <Input
              className="bg-white"
              placeholder="R$: 0,00"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              onKeyDown={apenasNumeros}
            />
          </div>
          {erro && <p className="text-red-500 text-sm">{erro}</p>}
          <div className="my-5">
            <Button onClick={calcular}>Calcular</Button>
            <Button onClick={clearAll} variant={"link"}>
              Limpar
            </Button>
          </div>
          {resultado !== null && (
            <div className="text-center font-semibold text-purple-900 text-md ">
              Custo estimado : R${" "}
              {volta
                ? (resultado * 2).toFixed(2).replace(".", ",")
                : resultado.toFixed(2).replace(".", ",")}
              <p>
                {" "}
                ⛽{" "}
                {volta
                  ? ((+km * 2) / +litro).toFixed(2)
                  : (+km / +litro).toFixed(2)}{" "}
                Litros{" "}
              </p>
            </div>
          )}
        </div>
      </CardContent>
      <p className="text-center text-sm text-muted-foreground mt-10">
        Feito com ❤️ por{" "}
        <a
          href="https://portiolio-santiago-ferreiras-projects.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 hover:underline hover:text-red-800 transition-colors"
        >
          Santiago Ferreira
        </a>
      </p>
    </Card>
  );
}

export default HomeComponent;
