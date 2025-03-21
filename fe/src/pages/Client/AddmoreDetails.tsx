
import React from 'react';

const AddmoreDetails = () => {
  return (
    <div>
      <h2 className='text-center text-2xl'>Add Your Details</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Add your Bio:</label>
          <input
            type="text"
            id="bio"
            className="border-gray-300 border p-2 w-full rounded"
            placeholder="Enter your bio"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Enter your Phone Number:</label>
          <input
            type="text"
            id="phone"
            className="border-gray-300 border p-2 w-full rounded"
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div>
          <label htmlFor="about" className="block text-sm font-medium text-gray-700">More About You:</label>
          <input
            type="text"
            id="about"
            className="border-gray-300 border p-2 w-full rounded"
            placeholder="Tell us more about you"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">Add</button>
      </form>
    </div>
  );
}

export default AddmoreDetails;
