import React from "react";

const AboutProjectPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Om Detta Projekt
      </h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">
          Projektöversikt
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          Detta är en React-baserad applikation som är designad för att visa och
          hantera en boksamling. Projektet tillåter användare att visa
          detaljerad information om varje bok, inklusive titel, författare och
          beskrivningar. Användare kan också skriva och läsa recensioner,
          betygsätta böcker, samt redigera eller ta bort sina egna recensioner.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">
          Huvudfunktioner
        </h2>
        <ul className="list-disc pl-5 text-lg text-gray-600 mt-2">
          <li>Visa detaljerad information om böcker</li>
          <li>Skriva och hantera recensioner för böcker</li>
          <li>Betygsätta böcker på en skala från 1 till 5</li>
          <li>Redigera och ta bort recensioner</li>
          <li>Användarautentisering och profilhantering</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">
          Tekniker Använda
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          Detta projekt är byggt med följande tekniker:
        </p>
        <ul className="list-disc pl-5 text-lg text-gray-600 mt-2">
          <li>React (för frontend)</li>
          <li>Redux (för state management)</li>
          <li>TypeScript (för typ-säkerhet)</li>
          <li>Tailwind CSS (för styling)</li>
          <li>Node.js och Express (för backend)</li>
          <li>MongoDB (för databas hantering)</li>
        </ul>
      </section>
    </div>
  );
};

export default AboutProjectPage;
