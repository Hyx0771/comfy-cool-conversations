import ChatBotWidget from '../components/ChatBotWidget';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="text-center max-w-4xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-6 text-gray-800">
            Clobol <span className="text-blue-600">❄️</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Uw partner voor klimaat- en verwarmingsoplossingen
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-4xl mb-4">❄️</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Airco Installatie</h3>
            <p className="text-gray-600">Professionele installatie van airconditioners voor optimaal comfort</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-4xl mb-4">🔥</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Verwarming Service</h3>
            <p className="text-gray-600">Onderhoud en reparatie van verwarmingssystemen en CV-ketels</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-4xl mb-4">🔧</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">24/7 Onderhoud</h3>
            <p className="text-gray-600">Snel en betrouwbaar onderhoud voor al uw klimaatapparatuur</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Vraag direct een offerte aan!</h2>
          <p className="text-lg text-gray-600 mb-6">
            Gebruik onze chatbot Bolt om binnen 2 minuten een offerte te krijgen. 
            Eenvoudig, snel en persoonlijk advies!
          </p>
          <div className="flex justify-center items-center space-x-4">
            <span className="text-4xl animate-bounce">👉</span>
            <span className="text-lg font-medium text-blue-600">
              Klik op de chatbot rechtsonder!
            </span>
          </div>
        </div>
      </div>

      <ChatBotWidget />
    </div>
  );
};

export default Index;
