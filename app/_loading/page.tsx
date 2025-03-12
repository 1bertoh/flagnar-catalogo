import { useEffect, useState } from "react";

const Loading = () => {
  const word = "FLAGNAR";
  const [visibleLetters, setVisibleLetters] = useState<string[]>([]);
  const [remainingLetters, setRemainingLetters] = useState<string[]>(
    word.split(""),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingLetters.length > 0) {
        const randomIndex = Math.floor(Math.random() * remainingLetters.length);
        const randomLetter = remainingLetters[randomIndex];

        setVisibleLetters((prev) => [...prev, randomLetter]);
        setRemainingLetters((prev) =>
          prev.filter((letter) => letter !== randomLetter),
        );
      }
    }, 300);

    return () => clearInterval(interval);
  }, [remainingLetters]);

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="flex space-x-2">
        {word.split("").map((letter, index) => (
          <span
            key={index}
            className={`text-6xl font-bold text-white transition-opacity duration-500 ${
              visibleLetters.includes(letter) ? "opacity-100" : "opacity-0"
            }`}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Loading;
