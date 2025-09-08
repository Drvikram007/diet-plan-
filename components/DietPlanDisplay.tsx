import React, { useState } from 'react';
import type { DietPlan, DailyPlan, Meal, PlanDuration } from '../types';

interface MealCardProps {
    mealType: string;
    meal: Meal;
}

const MealCard: React.FC<MealCardProps> = ({ mealType, meal }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-lg font-semibold text-teal-700 mb-2">{mealType}</h4>
            <p className="text-md font-medium text-gray-800 mb-3">{meal.name}</p>
            <div className="space-y-2">
                <div>
                    <h5 className="font-semibold text-sm text-gray-600">Ingredients:</h5>
                    <ul className="list-disc list-inside text-sm text-gray-600 pl-2 space-y-1">
                        {meal.ingredients.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                </div>
                <div>
                    <h5 className="font-semibold text-sm text-gray-600 mt-3">Instructions:</h5>
                    <p className="text-sm text-gray-600">{meal.instructions}</p>
                </div>
            </div>
        </div>
    );
};

interface DailyPlanAccordionProps {
    dailyPlan: DailyPlan;
    isOpen: boolean;
    onToggle: () => void;
}

const DailyPlanAccordion: React.FC<DailyPlanAccordionProps> = ({ dailyPlan, isOpen, onToggle }) => {
    return (
        <div className="border-b border-gray-200 last:border-b-0">
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center p-4 text-left text-lg font-semibold text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition"
            >
                <span>{dailyPlan.day}</span>
                <svg
                    className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            {isOpen && (
                <div className="p-4 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <MealCard mealType="Breakfast" meal={dailyPlan.breakfast} />
                        <MealCard mealType="Lunch" meal={dailyPlan.lunch} />
                        <MealCard mealType="Dinner" meal={dailyPlan.dinner} />
                        <MealCard mealType="Snacks" meal={dailyPlan.snacks} />
                    </div>
                </div>
            )}
        </div>
    );
};

interface DietPlanDisplayProps {
  plan: DietPlan;
  duration: PlanDuration;
}

const DietPlanDisplay: React.FC<DietPlanDisplayProps> = ({ plan, duration }) => {
  const [openDay, setOpenDay] = useState<string | null>(plan.length > 0 ? plan[0].day : null);

  const handleToggle = (day: string) => {
    setOpenDay(openDay === day ? null : day);
  };
  
  return (
    <div className="mt-10 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50/50">
            <h2 className="text-2xl font-bold text-center text-gray-800">Your {duration} Personalized Nutrition Plan</h2>
        </div>
      {plan.map((dailyPlan, index) => (
        <DailyPlanAccordion
          key={index}
          dailyPlan={dailyPlan}
          isOpen={openDay === dailyPlan.day}
          onToggle={() => handleToggle(dailyPlan.day)}
        />
      ))}
    </div>
  );
};

export default DietPlanDisplay;