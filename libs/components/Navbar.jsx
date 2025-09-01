import { useState } from "react";

function Navbar({ sendDataToPersona }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(null);

  const personas = [
    {
      value: "hitesh-sir",
      label: "Hitesh Sir",
      image: "https://pbs.twimg.com/profile_images/1724344976715468800/MasktpKz_400x400.jpg",
    },
    {
      value: "piyush-sir",
      label: "Piyush Sir",
      image: "https://pbs.twimg.com/profile_images/1879075502356586496/V9wQzW7V_400x400.jpg",
    },
  ];

  const handleSelectPersona = (persona) => {
    setSelectedPersona(persona);
    sendDataToPersona(persona.value);
    setIsOpen(false);
  };

  return (
    <div className="mb-6 flex items-center justify-between bg-zinc-800/50 backdrop-blur-md border border-zinc-700 rounded-xl p-4 shadow-lg">
      <h2 className="text-2xl font-bold text-gradient">
        EchoPersona
      </h2>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-[180px] p-3 bg-zinc-700 text-gray-100 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center justify-between transition-all duration-200 hover:bg-zinc-600"
        >
          <span className="flex items-center gap-2 ">
            {selectedPersona ? (
              <>
                <img
                  src={selectedPersona.image}
                  alt={selectedPersona.label}
                  className="w-6 h-6 rounded-full object-cover border border-purple-500"
                />
                {selectedPersona.label}
              </>
            ) : (
              "Select a Persona"
            )}
          </span>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        {isOpen && (
          <div className="absolute top-full mt-2 w-[180px] bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl z-10 overflow-hidden">
            {personas.map((persona) => (
              <button
                key={persona.value}
                onClick={() => handleSelectPersona(persona)}
                className="w-full flex items-center gap-3 p-3 text-gray-100 hover:bg-zinc-700/80 transition-all duration-200"
              >
                <img
                  src={persona.image}
                  alt={persona.label}
                  className="w-8 h-8 rounded-full object-cover border-2 border-purple-500"
                />
                <span>{persona.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        button:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
}

export default Navbar;