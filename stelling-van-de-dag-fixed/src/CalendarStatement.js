import { useEffect, useState } from "react";
import { CalendarIcon } from '@heroicons/react/outline';

const statements = [
  "Licht bestaat niet zonder schaduw. Waar ben jij bang voor te zien?",
  "Vrijheid is pas voelbaar als je grenzen kent. Wat houdt jou binnen?",
  "Zonder chaos geen orde. Wat probeert jouw controle te verbergen?",
  "Het denken wil begrijpen. Het voelen weet al.",
  "Tegenspraak is geen breuk, maar dialoog. Welke paradox draag jij in je mee?",
  // more statements...
];

export default function CalendarStatement() {
  const [todayStatement, setTodayStatement] = useState("");
  const [dateInfo, setDateInfo] = useState({ day: 0, month: "", year: 0 });

  useEffect(() => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('nl-NL', { month: 'long' });
    const year = today.getFullYear();

    setDateInfo({ day, month, year });
    setTodayStatement(statements[(day - 1) % statements.length]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white flex flex-col justify-center items-center px-6 py-16 font-serif">
      <div className="text-center max-w-xl space-y-8">
        <CalendarIcon className="h-12 w-12 text-indigo-300 mx-auto" />
        <h1 className="text-5xl font-semibold mb-8">{dateInfo.day} {dateInfo.month} {dateInfo.year}</h1>
        <h2 className="text-2xl text-gray-200">Stelling van vandaag</h2>
        <p className="text-3xl italic text-center">{todayStatement}</p>
        <textarea
          placeholder="Wat roept dit bij je op?"
          className="w-full p-5 text-black rounded-xl min-h-[150px] shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}

