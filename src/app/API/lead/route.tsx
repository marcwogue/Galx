import { NextRequest, NextResponse } from "next/server";
import { entry } from "../../Interface";

export async function POST(req: NextRequest) {
  try {
    const data: entry = await req.json();

    const makeWebhookUrl = "https://hook.eu2.make.com/2eidijs8vrgqbpn4wgxphx1s553gqff9";

    // Ta clé API Make
    const makeApiKey = "_Maker_zod12340000"; 

    // Envoi des données à Make avec x-make-apikey
    console.log("Data reçue :", data);
    console.log("Clé API :", makeApiKey);

    const response = await fetch(makeWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-make-apikey": makeApiKey || ""
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Erreur Make : ${response.statusText}`);
    }

    return NextResponse.json({ message: "Lead envoyé à Make avec succès" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erreur serveur", error: (error as Error).message }, { status: 500 });
  }
}
