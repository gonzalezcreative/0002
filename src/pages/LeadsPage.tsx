import React, { useState } from 'react';
import { LeadPreview } from '../components/LeadPreview';
import { Search, Filter, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLeads } from '../hooks/useLeads';

export const LeadsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'available' | 'purchased'>('available');
  const { availableLeads, purchasedLeads, loading, error } = useLeads(user?.uid);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAvailableLeads = availableLeads.filter(lead => 
    lead.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.equipment.some(eq => eq.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredPurchasedLeads = purchasedLeads.filter(lead =>
    lead.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.equipment.some(eq => eq.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Tab Navigation */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 mb-8">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('available')}
              className={`flex-1 py-3 px-6 rounded-lg transition-all ${
                activeTab === 'available'
                  ? 'bg-white text-purple-600 shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Available Rental Requests
            </button>
            {user && (
              <button
                onClick={() => setActiveTab('purchased')}
                className={`flex-1 py-3 px-6 rounded-lg transition-all ${
                  activeTab === 'purchased'
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Purchased Requests
              </button>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by location or equipment..."
              className="w-full pl-10 p-3 bg-white/90 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              showFilters
                ? 'bg-white text-purple-600'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Filter className="h-5 w-5" />
            Filter
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center text-white py-12">Loading...</div>
        ) : (
          <LeadPreview
            leads={activeTab === 'available' ? filteredAvailableLeads : filteredPurchasedLeads}
            isPurchased={activeTab === 'purchased'}
          />
        )}
      </div>
    </div>
  );
};