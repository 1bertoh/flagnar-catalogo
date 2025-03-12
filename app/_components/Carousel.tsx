import { useEffect, useRef, useState } from "react";
import Swiper from "swiper";
import "swiper/css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Importe o ScrollTrigger

// Registre o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface SlideStyles {
  width: string;
  height: string;
  x: number;
  y: number;
}

const Carousel = () => {
  const swiperRef = useRef<Swiper | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const originalStyles = useRef<SlideStyles[]>([]); // Armazena os estilos iniciais
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]); // Referências para os slides

  useEffect(() => {
    swiperRef.current = new Swiper(".swiper-container", {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: false,
    });

    // Salvar os estilos iniciais dos slides
    if (swiperRef.current) {
      originalStyles.current = Array.from(swiperRef.current.slides).map(
        (slide) => {
          const rect = (slide as HTMLElement).getBoundingClientRect();

          return {
            width: rect.width + "px",
            height: rect.height + "px",
            x: rect.left,
            y: rect.top,
          };
        },
      );
    }

    // Configurar animações com ScrollTrigger
    slideRefs.current.forEach((slide, index) => {
      if (slide) {
        gsap.from(slide, {
          opacity: 0,
          y: 50, // Movimentação no eixo Y (vindo de baixo)
          duration: 1,
          delay: index * 0.2, // Delay incremental entre os itens
          ease: "power3.out",
          scrollTrigger: {
            trigger: slide, // Elemento que dispara a animação
            start: "top 80%", // Quando o topo do slide estiver a 80% da viewport
            toggleActions: "play none none none", // Dispara a animação uma vez
          },
        });
      }
    });

    // Limpar ScrollTriggers ao desmontar o componente
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleClick = (index: number) => {
    if (!swiperRef.current || isAnimating) return;

    // Obter o índice real do slide clicado
    const realIndex = swiperRef.current.slides[index].getAttribute(
      "data-swiper-slide-index",
    );
    const slideIndex = realIndex ? parseInt(realIndex, 10) : index;

    const slide = swiperRef.current.slides[slideIndex] as HTMLElement;

    if (expandedIndex === slideIndex) {
      // Reverter a animação (diminuir o item)
      setIsAnimating(true);
      const original = originalStyles.current[slideIndex];

      gsap.to(slide, {
        width: original.width,
        height: original.height,
        borderRadius: "0 999px 0 999px",
        x: 0, // Move de volta para a posição original
        y: 0,
        duration: 1,
        ease: "power3.inOut",
        onComplete: () => {
          // Aplicar as classes CSS corretas para as bordas
          slide.classList.remove("rounded-none");
          slide.classList.add("rounded-tr-full", "rounded-bl-full");
          setExpandedIndex(null);
          setIsAnimating(false);
        },
      });
    } else {
      // Expande o item
      setIsAnimating(true);
      const rect = slide.getBoundingClientRect();

      gsap.to(slide, {
        width: window.innerWidth,
        height: window.innerHeight,
        borderRadius: 0, // Remove o borderRadius durante a expansão
        x: -rect.left, // Move para o top-left da tela
        y: -rect.top,
        duration: 1,
        ease: "power3.inOut",
        onComplete: () => {
          setExpandedIndex(slideIndex);
          setIsAnimating(false);
        },
      });
    }
  };

  return (
    <div className="swiper-container h-96 w-full">
      <div className="swiper-wrapper">
        {[1, 2, 3, 4, 5].map((item, index) => (
          <div
          key={index}
          ref={(el) => {
            if (el) slideRefs.current[index] = el; // Atualiza a referência apenas se o elemento não for nulo
          }}
          className="swiper-slide relative bg-cover bg-center cursor-pointer rounded-tr-full rounded-bl-full overflow-hidden h-64 w-48 bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          data-swiper-slide-index={index} // Adiciona um atributo para identificar o índice real
          style={{ backgroundImage: `url(/path/to/image${item}.jpg)` }}
          onClick={() => handleClick(index)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleClick(index);
            }
          }}
          role="button" // Indica que o elemento é clicável
          aria-label={`Expandir slide ${index + 1}`} // Descrição acessível
          tabIndex={0} // Torna o elemento focável
        >
          <div className="absolute bottom-0 left-0 right-0 bg-black h-full bg-opacity-50 p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
            <h2 className="text-white text-xl font-bold">Título {item}</h2>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
