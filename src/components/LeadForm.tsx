import React, { useState } from 'react';
import { Calendar, MapPin, Send } from 'lucide-react';
import type { LeadFormData } from '../types';
import { EquipmentSearch } from './EquipmentSearch';
import { BudgetInput } from './BudgetInput';
import { LocationInput } from './LocationInput';
import { DurationInput } from './DurationInput';

export const LeadForm = () => {
  const [formData, setFormData] = useState<LeadFormData>({
    equipment: [],
    startDate: '',
    duration: '',
    location: '',
    budget: '',
    name: '',
    email: '',
    phone: '',
    details: ''
  });

  const [errors, setErrors] = useState<Partial<LeadFormData>>({});

  const validateForm = () => {
    const newErrors: Partial<LeadFormData> = {};
    if (formData.equipment.length === 0) newErrors.equipment = 'Select at least one item';
    if (!formData.startDate) newErrors.startDate = 'Required';
    if (!formData.duration) newErrors.duration = 'Required';
    if (!formData.location) newErrors.location = 'Required';
    if (!formData.budget) newErrors.budget = 'Required';
    if (!formData.name) newErrors.name = 'Required';
    if (!formData.email) newErrors.email = 'Required';
    if (!formData.phone) newErrors.phone = 'Required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Handle form submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8 mt-[-3rem] mb-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-full">
          <EquipmentSearch
            selectedEquipment={formData.equipment}
            onEquipmentChange={(selected) => setFormData({ ...formData, equipment: selected })}
          />
          {errors.equipment && <p className="text-red-500 text-sm mt-1">{errors.equipment}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="date"
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            />
          </div>
          {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
        </div>

        <DurationInput
          value={formData.duration}
          onChange={(value) => setFormData({ ...formData, duration: value })}
          error={errors.duration}
        />

        <LocationInput
          value={formData.location}
          onChange={(value) => setFormData({ ...formData, location: value })}
          error={errors.location}
        />

        <BudgetInput
          value={formData.budget}
          onChange={(value) => setFormData({ ...formData, budget: value })}
          error={errors.budget}
        />

        <div className="col-span-full">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email Address"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>

        <div className="col-span-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Details
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            rows={4}
            placeholder="Any special requirements or notes..."
            value={formData.details}
            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="col-span-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
        >
          <Send className="h-5 w-5" />
          Submit Request
        </button>
      </div>
    </form>
  );
};