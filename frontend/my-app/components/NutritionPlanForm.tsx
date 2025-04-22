'use client'; // src/components/NutritionPlanForm.tsx

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import * as Select from '@radix-ui/react-select';
import { motion } from 'framer-motion';

export default function NutritionPlanForm() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    gender: '',
    objective: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Here you would handle the form submission, like API call
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#24223A]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 rounded-3xl bg-[#1C1B2E]"
      >
        <h1 className="mb-8 text-4xl font-bold text-center text-[#F8F6E3]">
          Create Your Nutrition Plan
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="w-full px-4 py-3 text-lg text-gray-200 bg-[#252438] border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Age Input */}
          <div className="flex items-center">
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Age"
              className="flex-grow px-4 py-3 text-lg text-gray-200 bg-[#252438] border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="ml-4 text-lg text-gray-400">Years</span>
          </div>

          {/* Weight & Height (Side by side) */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              placeholder="Weight"
              className="px-4 py-3 text-lg text-gray-200 bg-[#252438] border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <div className="flex items-center">
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                placeholder="Height"
                className="w-full flex-grow px-3 py-3 text-lg text-gray-200 bg-[#252438] border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="ml-4 text-lg text-gray-400">cm</span>
            </div>
          </div>

          {/* Gender Select */}
          <Select.Root
            onValueChange={(value) => handleSelectChange('gender', value)}
            value={formData.gender}
          >
            <Select.Trigger
              className="flex items-center justify-between w-full px-4 py-3 text-lg text-left text-gray-300 bg-[#252438] border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Gender"
            >
              <Select.Value placeholder="Gender" />
              <Select.Icon>
                <ChevronDown size={20} />
              </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
              <Select.Content
                className="overflow-hidden bg-[#252438] rounded-lg shadow-lg"
                position="popper"
                sideOffset={5}
              >
                <Select.Viewport className="p-1">
                  <Select.Item
                    value="male"
                    className="flex items-center h-10 px-4 text-lg text-gray-200 rounded outline-none cursor-pointer hover:bg-[#333252] focus:bg-[#333252]"
                  >
                    <Select.ItemText>Male</Select.ItemText>
                  </Select.Item>
                  <Select.Item
                    value="female"
                    className="flex items-center h-10 px-4 text-lg text-gray-200 rounded outline-none cursor-pointer hover:bg-[#333252] focus:bg-[#333252]"
                  >
                    <Select.ItemText>Female</Select.ItemText>
                  </Select.Item>
        
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>

          {/* Objective Select */}
          <Select.Root
            onValueChange={(value) => handleSelectChange('objective', value)}
            value={formData.objective}
          >
            <Select.Trigger
              className="flex items-center justify-between w-full px-4 py-3 text-lg text-left text-gray-300 bg-[#252438] border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Objective"
            >
              <Select.Value placeholder="Select objective" />
              <Select.Icon>
                <ChevronDown size={20} />
              </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
              <Select.Content
                className="overflow-hidden bg-[#252438] rounded-lg shadow-lg"
                position="popper"
                sideOffset={5}
              >
                <Select.Viewport className="p-1">
                  <Select.Item
                    value="weight-loss"
                    className="flex items-center h-10 px-4 text-lg text-gray-200 rounded outline-none cursor-pointer hover:bg-[#333252] focus:bg-[#333252]"
                  >
                    <Select.ItemText>Weight Loss</Select.ItemText>
                  </Select.Item>
                  <Select.Item
                    value="muscle-gain"
                    className="flex items-center h-10 px-4 text-lg text-gray-200 rounded outline-none cursor-pointer hover:bg-[#333252] focus:bg-[#333252]"
                  >
                    <Select.ItemText>Muscle Gain</Select.ItemText>
                  </Select.Item>
                  <Select.Item
                    value="maintenance"
                    className="flex items-center h-10 px-4 text-lg text-gray-200 rounded outline-none cursor-pointer hover:bg-[#333252] focus:bg-[#333252]"
                  >
                    <Select.ItemText>Maintenance</Select.ItemText>
                  </Select.Item>
                  <Select.Item
                    value="general-health"
                    className="flex items-center h-10 px-4 text-lg text-gray-200 rounded outline-none cursor-pointer hover:bg-[#333252] focus:bg-[#333252]"
                  >
                    <Select.ItemText>General Health</Select.ItemText>
                  </Select.Item>
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 mt-6 text-xl font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Generate Plan
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
