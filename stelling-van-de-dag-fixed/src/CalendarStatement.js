import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

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
  "We willen betekenis vinden, maar vrezen zinloosheid.",
  "Verlangen en afwijzing zijn twee gezichten van dezelfde honger.",
  "Wie zichzelf vindt, verliest wat hij dacht te zijn.",
  "Elke waarheid draagt haar tegendeel in zich.",
  "Zonder einde geen begin. Wat durf jij af te sluiten?",
  "Zelfkennis is geen bezit, maar een voortdurende ontmoeting.",
  "Grenzeloze liefde vraagt om het verlies van controle.",
  "Rust vind je niet door stil te staan, maar door te bewegen met wat is.",
  "Paradox is de taal van de ziel.",
  "Hoe meer je vasthoudt, hoe minder je hebt.",
  "Echte verbinding ontstaat pas als je bereid bent om alleen te zijn.",
  "De waarheid ligt niet in het midden, maar in de spanning tussen extremen.",
  "Wat als het tegenovergestelde ook waar is?",
  "We zoeken helderheid in een wereld die fluistert.",
  "Je kunt niet groeien zonder eerst te breken.",
  "Wat je buiten jezelf zoekt, is vaak een vergeten deel van binnen.",
  "De ander is altijd een spiegel, nooit een antwoord.",
  "Wie alles begrijpt, heeft misschien te weinig gevoeld.",
  "De kern van jezelf vind je in wat je afwijst.",
  "Zonder verlies geen waarde. Wat durf jij te verliezen?",
  "De grens tussen moed en overgave is flinterdun.",
  "Niets is zo zeker als twijfel."
];

export default function CalendarStatement() {
  const [todayStatement, setTodayStatement] = useState("");
  const [dateInfo, setDateInfo] = useState({ day: 0, month: "", year: 0 });
  const [reflection, setReflection] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('nl-NL', { month: 'long' });
    const year = today.getFullYear();

    setDateInfo({ day, month, year });
    setTodayStatement(statements[(day - 1) % statements.length]);
  }, []);

  const handleSubmit = async () => {
    if (reflection.trim().length === 0) return;

    const { error } = await supabase.from("reflections").insert([
      {
        date: `${dateInfo.year}-${String(dateInfo.day).padStart(2, '0')}-${dateInfo.month}`,
        statement: todayStatement,
        reflection: reflection
      }
    ]);

    if (!error) {
      setSaved(true);
      setReflection("");
    } else {
      alert("Er is iets misgegaan bij het opslaan. Probeer opnieuw.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col justify-center items-center px-6 py-10 font-serif">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl md:text-5xl font-semibold mb-6 fade-in">
          Dag {dateInfo.day} {dateInfo.month} {dateInfo.year}
        </h1>
        <h2 className="text-xl md:text-2xl mb-8 text-gray-400 fade-in">
          Stelling van vandaag
        </h2>
        <p className="text-2xl md:text-3xl italic mb-10 fade-in leading-relaxed">
          "{todayStatement}"
        </p>
        <textarea
          placeholder="Wat roept dit bij je op?"
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          className="w-full p-4 text-black rounded-xl min-h-[150px] shadow-xl"
        />
        <button
          onClick={handleSubmit}
          className="mt-4 px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-semibold"
        >
          Deel mijn reflectie
        </button>
        {saved && <p className="text-green-400 mt-4">Reflectie opgeslagen!</p>}
      </div>
    </div>
  );
}

