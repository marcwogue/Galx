'use client'

import React, { FormEvent, useState } from "react";
import Head from "next/head";
import { entry } from "./Interface";

export default function Landing() {
  const [loading, setLoading] = useState(false); // état du loader
  const [message, setMessage] = useState(""); // message à afficher après la requête

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

    setLoading(true); // afficher le loader
    setMessage("");

    fetch("./API/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        setLoading(false); // masquer le loader
        if (!res.ok) throw new Error(await res.text());
        setTimeout(() => {
          setMessage("") 
        }, 3000);
        setMessage("Votre demande a été envoyée avec succès ! veuillez patienter le temp de vous repondre");
        form.reset();
      })
      .catch((err) => {
        setLoading(false); // masquer le loader
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

      <div className="min-h-screen bg-[#020E1F] text-[#E6F9FF] font-sans">
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center overflow-hidden">
          {/* Background animation */}
          <div className="absolute inset-0 overflow-hidden z-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00CFFF] rounded-full mix-blend-screen opacity-10 blur-3xl animate-float1"></div>
            <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#B23CD8] rounded-full mix-blend-screen opacity-10 blur-3xl animate-float2"></div>
            <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-[#652C90] rounded-full mix-blend-screen opacity-10 blur-3xl animate-float3"></div>
          </div>

          <div className="relative z-10 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#00CFFF] via-[#B23CD8] to-[#652C90]">
              Votre service en 24h max
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-[#E6F9FF]/80 max-w-2xl mx-auto">
              Décrivez votre besoin, notre équipe vous propose une solution personnalisée sous 24 heures
            </p>

            {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-[#020E1F] p-8 rounded-xl flex flex-col items-center shadow-lg">
              <div className="loader border-4 border-t-[#00CFFF] border-gray-200 rounded-full w-12 h-12 animate-spin mb-4"></div>
              <p>Envoi en cours...</p>
            </div>
          </div>
        )}

        {/* Message popup */}
        {message && (
          <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-[#00CFFF] text-[#020E1F] px-6 py-3 rounded-xl shadow-lg z-50">
            {message}
          </div>
        )}

            <form 
            onSubmit={  (e) => {
              handleSubmit(e) 
            } }
            className="max-w-xl mx-auto bg-[#020E1F]/50 backdrop-blur-sm p-8 rounded-2xl border border-[#00CFFF]/20">
              <div className="mb-6">
                <input
                  type="text"
                  name="nom"
                  placeholder="Votre nom s'il vous plait"
                  className="w-full px-6 py-4 bg-[#020E1F] border border-[#652C90] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00CFFF] text-[#E6F9FF]"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="email"
                  name="email"
                  placeholder="Votre email professionnel"
                  className="w-full px-6 py-4 bg-[#020E1F] border border-[#652C90] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00CFFF] text-[#E6F9FF]"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  name="source"
                  placeholder="Quelle est votre source"
                  className="w-full px-6 py-4 bg-[#020E1F] border border-[#652C90] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00CFFF] text-[#E6F9FF]"
                  required
                />
              </div>
              <div className="mb-6">
                <textarea
                  name="besoin"
                  placeholder="Décrivez votre besoin en détail..."
                  rows={4}
                  className="w-full px-6 py-4 bg-[#020E1F] border border-[#652C90] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00CFFF] text-[#E6F9FF]"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-[#00CFFF] to-[#00A3FF] text-[#020E1F] font-bold rounded-xl hover:scale-[1.02] transition-transform duration-300 shadow-lg shadow-[#00CFFF]/30"
              >
                Envoyer ma demande
              </button>
              <p className="mt-4 text-sm text-[#E6F9FF]/60">
                Notre équipe vous contactera par email dans les 24 heures
              </p>
            </form>
          </div>

          {/* Stats */}
          <div className="absolute bottom-10 left-0 right-0">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#00CFFF]">24h</div>
                <div className="text-sm">Délai maximum</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#B23CD8]">98%</div>
                <div className="text-sm">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#652C90]">500+</div>
                <div className="text-sm">Demandes traitées</div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-[#020E1F] to-[#0A1730]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-[#00CFFF]/10 text-[#00CFFF] rounded-full text-sm font-semibold mb-4">
                COMMENT ÇA MARCHE
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Simple, rapide et <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00CFFF] to-[#B23CD8]">efficace</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#0A1730] border border-[#1E2D4D] rounded-2xl p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#00CFFF] to-[#00A3FF] rounded-full flex items-center justify-center text-2xl font-bold">1</div>
                <h3 className="text-2xl font-bold mb-3">Vous décrivez votre besoin</h3>
                <p className="text-[#E6F9FF]/80">
                  Remplissez notre formulaire simple avec les détails de votre demande
                </p>
              </div>

              <div className="bg-[#0A1730] border border-[#1E2D4D] rounded-2xl p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#B23CD8] to-[#652C90] rounded-full flex items-center justify-center text-2xl font-bold">2</div>
                <h3 className="text-2xl font-bold mb-3">Nous analysons votre demande</h3>
                <p className="text-[#E6F9FF]/80">
                  Notre équipe experte étudie votre besoin et prépare une solution
                </p>
              </div>

              <div className="bg-[#0A1730] border border-[#1E2D4D] rounded-2xl p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#652C90] to-[#B23CD8] rounded-full flex items-center justify-center text-2xl font-bold">3</div>
                <h3 className="text-2xl font-bold mb-3">Vous recevez notre proposition</h3>
                <p className="text-[#E6F9FF]/80">
                  Sous 24h maximum, nous vous contactons avec une solution personnalisée
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
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
                  <p className="text-[#E6F9FF]/80 mb-6">{`"${ testimonial.quote}"`}</p>
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

        {/* Final CTA */}
        <section className="py-20 px-4 bg-gradient-to-r from-[#00CFFF] to-[#00A3FF] text-[#020E1F]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Prêt à trouver votre solution ?</h2>
            <p className="text-xl mb-8 text-[#020E1F]/90">
              Notre équipe est prête à répondre à votre demande sous 24 heures maximum
            </p>
            <a
              href="#top"
              className="inline-block px-8 py-4 bg-[#020E1F] text-[#00CFFF] font-bold rounded-xl hover:bg-[#020E1F]/90 transition-all duration-300 shadow-lg"
            >
              Faire une demande maintenant
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 bg-[#020E1F] border-t border-[#1E2D4D]">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-bold mb-4 text-[#00CFFF]">GalaXLytique™</h3>
                <p className="text-[#E6F9FF]/80">
                  Votre service sur demande, réponse sous 24h.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Contact</h4>
                <ul className="space-y-2 text-[#E6F9FF]/80">
                  <li>contact@galaxlytique.com</li>
                  <li>+33 1 23 45 67 89</li>
                  <li className="pt-2">Lundi-Vendredi, 9h-18h</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Légal</h4>
                <ul className="space-y-2 text-[#E6F9FF]/80">
                  <li><a href="#" className="hover:text-[#00CFFF] transition-colors">CGU</a></li>
                  <li><a href="#" className="hover:text-[#00CFFF] transition-colors">Confidentialité</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Suivez-nous</h4>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-[#1E2D4D] flex items-center justify-center hover:bg-[#00CFFF] hover:text-[#020E1F] transition-all">f</a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#1E2D4D] flex items-center justify-center hover:bg-[#00CFFF] hover:text-[#020E1F] transition-all">in</a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#1E2D4D] flex items-center justify-center hover:bg-[#00CFFF] hover:text-[#020E1F] transition-all">t</a>
                </div>
              </div>
            </div>
            <div className="pt-8 border-t border-[#1E2D4D] text-center text-sm text-[#E6F9FF]/60">
              © {new Date().getFullYear()} GalaXLytique™. Tous droits réservés.
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, 20px) rotate(5deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-20px, 20px) rotate(-5deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(0, -20px) rotate(5deg); }
        }
        .animate-float1 { animation: float1 8s ease-in-out infinite; }
        .animate-float2 { animation: float2 10s ease-in-out infinite; }
        .animate-float3 { animation: float3 12s ease-in-out infinite; }
      `}</style>
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
