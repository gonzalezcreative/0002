import React, { useState } from 'react';
import { Calendar, MapPin, Package, ExternalLink, Phone, Mail, User } from 'lucide-react';
import type { Lead } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './AuthModal';

interface LeadPreviewProps {
  leads: Lead[];
  isPurchased?: boolean;
}

export const LeadPreview = ({ leads, isPurchased = false }: LeadPreviewProps) => {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<string | null>(null);

  const handlePurchase = async (leadId: string) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setSelectedLead(leadId);
    // Implement Stripe payment logic here
    console.log('Purchase lead:', leadId);
  };

  if (leads.length === 0) {
    return (
      <div className="text-center py-12 bg-white/10 backdrop-blur-sm rounded-lg">
        <p className="text-white text-lg">
          {isPurchased 
            ? "You haven't purchased any leads yet"
            : "No rental requests available at the moment"}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leads.map((lead) => (
          <div key={lead.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <Package className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="text-sm text-gray-600">
                    {lead.equipment.length} items requested
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  lead.status === 'open' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {lead.status}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span className="text-sm">
                    {new Date(lead.startDate).toLocaleDateString()} - {lead.duration}
                  </span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="text-sm">
                    {isPurchased 
                      ? lead.location 
                      : lead.location.split(',')[1]?.trim() || lead.location}
                  </span>
                </div>

                {isPurchased && (
                  <>
                    <div className="pt-4 border-t border-gray-100">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Customer Details:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                          <User className="h-4 w-4 mr-2" />
                          <span className="text-sm">{lead.name}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Mail className="h-4 w-4 mr-2" />
                          <a href={`mailto:${lead.email}`} className="text-sm text-purple-600 hover:text-purple-800">
                            {lead.email}
                          </a>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Phone className="h-4 w-4 mr-2" />
                          <a href={`tel:${lead.phone}`} className="text-sm text-purple-600 hover:text-purple-800">
                            {lead.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                    {lead.details && (
                      <div className="pt-4 border-t border-gray-100">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Additional Details:</h4>
                        <p className="text-sm text-gray-600">{lead.details}</p>
                      </div>
                    )}
                  </>
                )}
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm font-medium text-gray-900">Budget Range:</span>
                  <span className="ml-2 text-sm text-gray-600">{lead.budget}</span>
                </div>

                {!isPurchased && (
                  <button
                    onClick={() => handlePurchase(lead.id)}
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Customer Details ($5)
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};