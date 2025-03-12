"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

import Loading from "./_loading/page";
import Banner from "./_Banner/page";

export default function Home() {

  useEffect(() => {
    // Inicializa o Lenis para smooth scrolling
    const lenis = new Lenis();

    // Sincroniza o Lenis com o ScrollTrigger do GSAP
    lenis.on("scroll", ScrollTrigger.update);

    // Adiciona o raf do Lenis ao ticker do GSAP
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Converte o tempo de segundos para milissegundos
    });

    // Desativa o lag smoothing do GSAP
    gsap.ticker.lagSmoothing(0);

    // Cria uma timeline do GSAP para controlar as animações
    const timeline = gsap.timeline({ paused: true });

    // Animação de desaparecimento do loading
    timeline.to(".loading-container", {
      maxHeight: 0,
      duration: 2.5, // Duração da animação de desaparecimento
      ease: "circ.out",
      onComplete: () => {
        // setIsLoading(false); // Desativa o loading após o desaparecimento
      },
    });

    // Animação de fade-in do Banner
    timeline.fromTo(
      ".banner-container",
      { opacity: 0, scale: 0.99 }, // Estado inicial (opacidade 0)
      {
        scale: 1,
        opacity: 1, // Estado final (opacidade 1)
        duration: 1, // Duração da animação de fade-in
        ease: "sine.out",
      }, // Inicia 0.5 segundos antes do término da animação anterior
    );

    // Inicia a timeline após 3 segundos
    setTimeout(() => {
      timeline.play(); // Inicia a animação
    }, 3000); // 3000ms = 3 segundos

    // Limpeza ao desmontar o componente
    return () => {
      timeline.kill(); // Mata a timeline para evitar vazamentos de memória
    };
  }, []);

  return (
    <div style={{ width: "100vw" }}>
      {/* Container do loading */}
      <div
        className="loading-container transition-all z-50 absolute w-screen h-full overflow-hidden max-h-[100vh]"
        style={{ transitionProperty: "max-height" }} // Garante que apenas max-height seja animado
      >
        <Loading />
      </div>

      {/* Container do Banner */}
      <div className="banner-container opacity-0">
        <Banner />
      </div>
    </div>
  );
}
