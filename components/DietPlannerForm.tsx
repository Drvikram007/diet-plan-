import React, { useState } from 'react';
import type { UserInput, DietaryPreference, PlanDuration, Language } from '../types';
import { DIETARY_PREFERENCES, PLAN_DURATIONS, LANGUAGES } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';

interface DietPlannerFormProps {
  onSubmit: (userInput: UserInput) => void;
  isLoading: boolean;
}

const DietPlannerForm: React.FC<DietPlannerFormProps> = ({ onSubmit, isLoading }) => {
  const [condition, setCondition] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [comorbidity, setComorbidity] = useState('');
  const [preferences, setPreferences] = useState<DietaryPreference[]>([]);
  const [allergies, setAllergies] = useState('');
  const [goals, setGoals] = useState('');
  const [duration, setDuration] = useState<PlanDuration>('7-Day');
  const [language, setLanguage] = useState<Language>('English');

  const handlePreferenceChange = (preference: DietaryPreference) => {
    setPreferences(prev => 
      prev.includes(preference) 
        ? prev.filter(p => p !== preference)
        : [...prev, preference]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!condition.trim() || !age) {
        alert("Please specify a health condition and age.");
        return;
    }
    onSubmit({ condition, age, comorbidity, preferences, allergies, goals, duration, language });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      <fieldset>
        <legend className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-6">
          Health Profile
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age <span className="text-red-500">*</span>
            </label>
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
              placeholder="e.g., 35"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
              required
              min="1"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
              Primary Health Condition <span className="text-red-500">*</span>
            </label>
            <input
              id="condition"
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              placeholder="e.g., Type 2 Diabetes"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
              required
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="comorbidity" className="block text-sm font-medium text-gray-700">
              Additional Conditions (Comorbidities)
            </label>
            <input
              id="comorbidity"
              type="text"
              value={comorbidity}
              onChange={(e) => setComorbidity(e.target.value)}
              placeholder="e.g., High Blood Pressure, PCOS"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
            />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-6">
          Plan Customization
        </legend>
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Plan Duration</label>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {PLAN_DURATIONS.map(d => (
                <label key={d} className="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" name="duration" value={d} checked={duration === d} onChange={() => setDuration(d)} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300" />
                  <span className="text-gray-700">{d}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Language</label>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {LANGUAGES.map(l => (
                <label key={l} className="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" name="language" value={l} checked={language === l} onChange={() => setLanguage(l)} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300" />
                  <span className="text-gray-700">{l}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Dietary Preferences</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {DIETARY_PREFERENCES.map(pref => (
                <label key={pref} className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition">
                  <input
                    type="checkbox"
                    checked={preferences.includes(pref)}
                    onChange={() => handlePreferenceChange(pref)}
                    className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-gray-700">{pref}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </fieldset>
      
      <fieldset>
        <legend className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-6">
            Goals & Allergies
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">
                Allergies or Foods to Avoid
                </label>
                <input
                id="allergies"
                type="text"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                placeholder="e.g., Peanuts, Shellfish, Soy"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="goals" className="block text-sm font-medium text-gray-700">
                Health Goals
                </label>
                <input
                id="goals"
                type="text"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                placeholder="e.g., Reduce inflammation, Lose weight"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                />
            </div>
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={isLoading || !condition.trim() || !age}
        className="w-full flex items-center justify-center gap-x-2 px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            Generating...
          </>
        ) : (
          <>
            <SparklesIcon className="h-5 w-5"/>
            Generate My Plan
          </>
        )}
      </button>
    </form>
  );
};

export default DietPlannerForm;