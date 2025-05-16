import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { CalendarIcon } from "@heroicons/react/outline";

const supabase = createClient(
  "https://aqgtenvxpzuufavdsgun.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxZ3RlbnZ4cHp1dWZhdmRzZ3VuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczODU2NDUsImV4cCI6MjA2Mjk2MTY0NX0.j3PEDf6T7Jb1fZmmObwEFmFgefL0Nk3T04M6HipwZ78"
);

const statements = [
  "Licht bestaat niet zonder schaduw. Waar ben jij bang voor te zien?",
  "Vrijheid is pas voelbaar als je grenzen kent. Wat houdt jou binnen?",
  "Zonder chaos geen orde. Wat probeert jouw controle te verbergen?",
  "Het denken wil begrijpen. Het voelen weet al.",
  "Tegenspraak is geen breuk, maar dialoog. Welke paradox draag jij in je mee?",
  "Je kunt alleen loslaten wat je eerst hebt vastgehouden.",
  "Als alles mogelijk is, wat kies je dan niet?",
  "De stilte zegt wat woorden niet kunnen raken.",
  "Zijn en worden botsen waar angst regeert.",
  "We willen betekenis vinden, maar vrezen zinloosheid."
];

export default function CalendarStatement() {
  const [todayStatement, setTodayStatement] = useState("");
  const [dateInfo, setDateInfo] = useState({ day: 0, month: "", year: 0 });
  const [reflection, setReflection] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString("nl-NL", { month: "long" });
    const year = today.getFullYear();
    setDateInfo({ day, month, year });
    setTodayStatement(statements[(day - 1) % statements.length]);
  }, []);

  const handleSubmit = async () => {
    if (!reflection) return;
    const { error } = await supabase.from("reflections").insert([
      {
        date: `${dateInfo.day}-${dateInfo.month}-${dateInfo.year}`,
        statement: todayStatement,
        reflection
      }
    ]);
    if (!error) setSubmitted(true);
    else console.error("Supabase error:", error);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-gold-100 flex flex-col justify-center items-center px-6 py-10 font-serif">
      <div className="text-center max-w-xl space-y-6">
        <CalendarIcon className="h-10 w-10 text-yellow-400 mx-auto" />
        <h1 className="text-4xl md:text-5xl font-semibold text-yellow-200">
          {dateInfo.day} {dateInfo.month} {dateInfo.year}
        </h1>
        <h2 className="text-xl text-yellow-400">Stelling van vandaag</h2>
        <p className="text-2xl italic text-white">"{todayStatement}"</p>

        {!submitted ? (
          <>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Wat roept dit bij je op?"
              className="w-full p-4 text-black rounded-xl min-h-[150px] shadow-lg focus:outline-none"
            />
            <button
              onClick={handleSubmit}
              className="mt-4 px-6 py-3 bg-yellow-500 text-black rounded-xl hover:bg-yellow-400"
            >
              Opslaan
            </button>
          </>
        ) : (
          <p className="text-green-400 font-medium mt-6">Bedankt voor je reflectie ✨</p>
        )}
      </div>
    </div>
  );
}
