
import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';
import { CalendarIcon } from '@heroicons/react/outline';

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
  // ... meer stellingen
];

export default function CalendarStatement() {
  const [todayStatement, setTodayStatement] = useState("");
  const [dateInfo, setDateInfo] = useState({ day: 0, month: "", year: 0 });
  const [reflection, setReflection] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('nl-NL', { month: 'long' });
    const year = today.getFullYear();

    setDateInfo({ day, month, year });
    setTodayStatement(statements[(day - 1) % statements.length]);
  }, []);

  async function handleSave() {
    setSaving(true);
    const { error } = await supabase.from('reflections').insert({
      date: `${dateInfo.day} ${dateInfo.month} ${dateInfo.year}`,
      statement: todayStatement,
      reflection: reflection
    });
    setSaving(false);
    if (error) {
      setMessage("Er is iets misgegaan bij het opslaan.");
    } else {
      setMessage("Je reflectie is opgeslagen.");
      setReflection("");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white flex flex-col justify-center items-center px-6 py-16 font-serif">
      <div className="text-center max-w-xl space-y-8">
        <CalendarIcon className="h-12 w-12 text-indigo-300 mx-auto" />
        <h1 className="text-5xl font-semibold mb-8">{dateInfo.day} {dateInfo.month} {dateInfo.year}</h1>
        <h2 className="text-2xl text-gray-200">Stelling van vandaag</h2>
        <p className="text-3xl italic text-center">{todayStatement}</p>
        <textarea
          placeholder="Wat roept dit bij je op?"
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          className="w-full p-5 text-black rounded-xl min-h-[150px] shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSave}
          disabled={saving || !reflection.trim()}
          className="mt-4 px-6 py-3 bg-indigo-700 hover:bg-indigo-800 rounded-lg text-white disabled:opacity-50"
        >
          {saving ? "Opslaan..." : "Opslaan"}
        </button>
        {message && <p className="mt-2 text-white italic">{message}</p>}
      </div>
    </div>
  );
}


