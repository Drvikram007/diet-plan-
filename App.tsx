import React, { useState } from 'react';
import type { UserInput, DietPlan } from './types';
import { generateDietPlan } from './services/geminiService';
import DietPlannerForm from './components/DietPlannerForm';
import DietPlanDisplay from './components/DietPlanDisplay';
import Spinner from './components/Spinner';
import { LeafIcon } from './components/icons/LeafIcon';

const App: React.FC = () => {
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const [userInput, setUserInput] = useState<UserInput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (input: UserInput) => {
    setIsLoading(true);
    setError(null);
    setDietPlan(null);
    setUserInput(input);

    try {
      const plan = await generateDietPlan(input);
      setDietPlan(plan);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-teal-50/50 font-sans">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-x-3 mb-2">
            <LeafIcon className="h-10 w-10 text-teal-600"/>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
              AI-Powered Diet Planner
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Personalized nutrition plans for your health conditions and goals. Fill out the form below to get started.
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <DietPlannerForm onSubmit={handleSubmit} isLoading={isLoading} />

          <div className="mt-10">
            {isLoading && <Spinner />}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center" role="alert">
                <strong className="font-bold">Oops! </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            {dietPlan && userInput && <DietPlanDisplay plan={dietPlan} duration={userInput.duration} />}
            {!isLoading && !dietPlan && !error && (
                <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-700">Welcome!</h2>
                    <p className="mt-2 text-gray-600">Your personalized diet plan will appear here once generated.</p>
                </div>
            )}
          </div>
        </div>
      </main>
      <footer className="text-center py-4 mt-8">
          <p className="text-sm text-gray-500">
              Disclaimer: This tool provides suggestions and is not a substitute for professional medical advice.
          </p>
      </footer>
    </div>
  );
};

export default App;