import React, { useState } from 'react';
// import MainNavbar from '../MainNavbar'; 

const PaymentDetails = () => {
  const [selectedPlan, setSelectedPlan] = useState('annual');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* <MainNavbar /> */}
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-4">Payment Details</h1>
          <div className="flex justify-end">
            <div className="bg-orange-100 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="text-orange-500 mr-2">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                    {/* Codeiqgenius-Frontend-Nitesh\public\522835-PIYD9Y-533 1.png */}
                      <img src="/522835-PIYD9Y-533 1.png" alt="" className="w-full h-full object-cover rounded-lg" />
                  <div className="text-sm text-gray-600">Included</div>
                  <div className="text-xs text-gray-500">with</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Course Info */}
        <div className="bg-white rounded-lg p-4 mb-6 flex items-center">
          <div className="w-24 h-16 bg-gray-200 rounded mr-4">
            {/* Placeholder for video thumbnail */}
          </div>
          <div>
            <h3 className="font-semibold">Video Title</h3>
            <p className="text-sm text-gray-600">
              Unlock unlimited courses along with 50,000+ other courses with Personal Plan subscription today!
            </p>
          </div>
        </div>

        {/* Choose Your Plan */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6">Choose Your Plan</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Annual Plan */}
            <div className={`border-2 rounded-lg p-6 cursor-pointer transition-colors ${
              selectedPlan === 'annual' 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedPlan('annual')}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    selectedPlan === 'annual' 
                      ? 'border-green-500 bg-green-500' 
                      : 'border-gray-300'
                  }`}></div>
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                </div>
              </div>
              
              <h3 className="font-semibold text-lg">Annual Subscription</h3>
              <div className="text-2xl font-bold my-2">₹ 3,999 /Year</div>
              <div className="text-green-600 text-sm">Save 20%</div>
              <div className="text-sm text-gray-600">(Best Plan)</div>
            </div>

            {/* Monthly Plan */}
            <div className={`border-2 rounded-lg p-6 cursor-pointer transition-colors ${
              selectedPlan === 'monthly' 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedPlan('monthly')}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    selectedPlan === 'monthly' 
                      ? 'border-green-500 bg-green-500' 
                      : 'border-gray-300'
                  }`}></div>
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                </div>
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              </div>
              
              <h3 className="font-semibold text-lg">Monthly Subscription</h3>
              <div className="text-2xl font-bold my-2">₹ 400/Month</div>
              <div className="text-sm text-gray-600">Cancel Anytime</div>
            </div>
          </div>
        </div>

        {/* Plan Benefits */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-lg mb-4">We Provide These In Annual Plan</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">•</span>
              Access To Over 36,000 Of Our Top Courses In Tech, Business, And More
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">•</span>
              Hands-On Learning Experiences To Build Your Skills
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">•</span>
              Course Recommendations To Help You Start Learning Faster
            </li>
          </ul>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Item Name</span>
              <span>₹ 1299</span>
            </div>
            <div className="flex justify-between">
              <span>Price Breakdown</span>
              <span>₹ 1299</span>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold mb-4">Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Due:</span>
              <span className="font-semibold">₹ 3,999</span>
            </div>
            <div className="flex justify-between">
              <span>Yearly Access:</span>
              <span className="font-semibold">₹ 3,999</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
