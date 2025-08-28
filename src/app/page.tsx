'use client'

import React, { FormEvent, useState } from "react";
import Head from "next/head";
import { entry } from "./Interface";

export default function Landing() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  
    const form = e.currentTarget;
    const formData = new FormData(form);
  
    const data: entry = {
      Nom: formData.get("nom") as string,
      email: formData.get("email") as string,
      Source: formData.get("source") as string,
      message: formData.get("besoin") as string,
    };

    setLoading(true);
    setMessage("");

    fetch("./API/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        setLoading(false);
        if (!res.ok) throw new Error(await res.text());
        setTimeout(() => setMessage(""), 3000);
        setMessage("Votre demande a été envoyée avec succès ! Veuillez patienter le temps de vous répondre.");
        form.reset();
      })
      .catch((err) => {
        setLoading(false);
        console.error("Erreur lors de l'envoi :", err);
        setMessage("Une erreur est survenue, merci de réessayer plus tard.");
      });
  }

  return (
    <>
      <Head>
        <title>GalaXLytique™ - Service sur demande</title>
        <meta
          name="description"
          content="Demandez un service et notre équipe vous recontacte sous 24h maximum"
        />
      </Head>

      {/* ... ton code inchangé ... */}

      <section className="py-20 px-4 bg-[#020E1F]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-[#652C90]/10 text-[#652C90] rounded-full text-sm font-semibold mb-4">
              TÉMOIGNAGES
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ce que nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#652C90] to-[#B23CD8]">clients</span> disent
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-[#0A1730] border border-[#1E2D4D] rounded-2xl p-8 hover:border-[#652C90]/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#652C90] to-[#B23CD8] flex items-center justify-center text-xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-[#E6F9FF]/60">{testimonial.position}</p>
                  </div>
                </div>
                {/* ✅ Correction ici : JSX string safe */}
                <p className="text-[#E6F9FF]/80 mb-6">{`"${testimonial.quote}"`}</p>
                <div className="flex gap-1 text-[#FFD700]">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ... reste du code ... */}
    </>
  );
}

const testimonials = [
  {
    avatar: "A",
    name: "Alice Dupont",
    position: "Freelance UX Designer",
    quote: "J'ai obtenu une réponse en moins de 12h avec une solution parfaitement adaptée à mon besoin. Très professionnel !"
  },
  {
    avatar: "M",
    name: "Marc Lambert",
    position: "CEO Startup",
    quote: "Le délai de 24h est tenu à chaque fois. Nous faisons systématiquement appel à eux pour nos besoins ponctuels."
  },
  {
    avatar: "S",
    name: "Sophie Martin",
    position: "Responsable Marketing",
    quote: "Un gain de temps incroyable. Je décris mon besoin et leur équipe me propose une solution clé en main."
  }
];
