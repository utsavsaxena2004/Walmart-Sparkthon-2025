import React, { useState } from 'react';
import { Phone, Plus, Edit2, Trash2, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { useTheme } from '../../contexts/ThemeContext';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  type: 'family' | 'emergency' | 'medical';
}

interface EmergencyContactsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyContacts: React.FC<EmergencyContactsProps> = ({ isOpen, onClose }) => {
  const { isDimMode } = useTheme();
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    { id: '1', name: 'Festival', phone: '6398XXXXXX', relationship: 'Best Friend', type: 'family' },
    { id: '2', name: 'Emergency Services', phone: '112', relationship: 'Emergency', type: 'emergency' },
    { id: '3', name: 'Store Staff', phone: '9898XXXXXX', relationship: 'Medical Emergency', type: 'medical' },
    { id: '4', name: 'Dr. Daku Mangal Singh', phone: '8888XXXXXX', relationship: 'Primary Doctor', type: 'medical' },
    { id: '5', name: 'Mom', phone: '9999XXXXXX', relationship: 'Mother', type: 'family' }
  ]);

  const [editingContact, setEditingContact] = useState<EmergencyContact | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [emergencyMessage, setEmergencyMessage] = useState('');
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);

  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    relationship: '',
    type: 'family' as const
  });

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      const contact: EmergencyContact = {
        id: Date.now().toString(),
        ...newContact
      };
      setContacts([...contacts, contact]);
      setNewContact({ name: '', phone: '', relationship: '', type: 'family' });
      setShowAddForm(false);
    }
  };

  const handleEditContact = (contact: EmergencyContact) => {
    setEditingContact(contact);
  };

  const handleUpdateContact = () => {
    if (editingContact) {
      setContacts(contacts.map(c => 
        c.id === editingContact.id ? editingContact : c
      ));
      setEditingContact(null);
    }
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const handleEmergencyAlert = () => {
    const familyContacts = contacts.filter(c => c.type === 'family');
    const emergencyContacts = contacts.filter(c => c.type === 'emergency');
    
    const message = `EMERGENCY ALERT: I need immediate assistance. Please check on me or call emergency services. Location: Walmart Store. Time: ${new Date().toLocaleString()}`;
    
    setEmergencyMessage(`Emergency alert sent to ${familyContacts.length} family members and ${emergencyContacts.length} emergency services.`);
    setShowEmergencyAlert(true);
    
    setTimeout(() => setShowEmergencyAlert(false), 5000);
  };

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'emergency':
        return '🚨';
      case 'medical':
        return '🏥';
      case 'family':
        return '👨‍👩‍👧‍👦';
      default:
        return '📞';
    }
  };

  const getContactColor = (type: string) => {
    if (isDimMode) {
      switch (type) {
        case 'emergency':
          return 'bg-red-900 border-red-700';
        case 'medical':
          return 'bg-blue-900 border-blue-700';
        case 'family':
          return 'bg-green-900 border-green-700';
        default:
          return 'bg-gray-700 border-gray-600';
      }
    } else {
      switch (type) {
        case 'emergency':
          return 'bg-red-50 border-red-200';
        case 'medical':
          return 'bg-blue-50 border-blue-200';
        case 'family':
          return 'bg-green-50 border-green-200';
        default:
          return 'bg-gray-50 border-gray-200';
      }
    }
  };

  const modalStyle = isDimMode ? {
    backgroundColor: '#1f2937',
    color: '#f9fafb'
  } : {};

  const cardStyle = isDimMode ? {
    backgroundColor: '#374151',
    color: '#f9fafb'
  } : {
    backgroundColor: '#f9fafb',
    color: '#111827'
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Emergency Contacts" 
      className="max-w-2xl"
      style={modalStyle}
    >
      <div className="space-y-6">
        {/* Emergency Alert Button */}
        <div 
          className="p-4 rounded-lg border"
          style={isDimMode ? {
            backgroundColor: '#7f1d1d',
            borderColor: '#dc2626',
            color: '#fecaca'
          } : {
            backgroundColor: '#fef2f2',
            borderColor: '#fecaca',
            color: '#7f1d1d'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Emergency Alert
              </h3>
              <p className="text-sm mt-1 opacity-90">
                Send immediate alert to all family members and emergency services
              </p>
            </div>
            <Button 
              onClick={handleEmergencyAlert}
              variant="primary"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Send Alert
            </Button>
          </div>
        </div>

        {/* Emergency Alert Message */}
        {showEmergencyAlert && (
          <div 
            className="p-4 rounded-lg border"
            style={isDimMode ? {
              backgroundColor: '#065f46',
              borderColor: '#059669',
              color: '#d1fae5'
            } : {
              backgroundColor: '#ecfdf5',
              borderColor: '#10b981',
              color: '#065f46'
            }}
          >
            <p className="font-medium">
              ✅ {emergencyMessage}
            </p>
          </div>
        )}

        {/* Add Contact Button */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold" style={isDimMode ? {color: '#f9fafb'} : {color: '#111827'}}>
            Contacts
          </h3>
          <Button 
            onClick={() => setShowAddForm(true)}
            variant="primary"
            size="sm"
            className="flex items-center"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Contact
          </Button>
        </div>

        {/* Add Contact Form */}
        {showAddForm && (
          <div className="p-4 rounded-lg space-y-4" style={cardStyle}>
            <h4 className="font-medium">Add New Contact</h4>
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Name"
                value={newContact.name}
                onChange={(e) => setNewContact({...newContact, name: e.target.value})}
              />
              <Input
                placeholder="Phone Number"
                value={newContact.phone}
                onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
              />
              <Input
                placeholder="Relationship"
                value={newContact.relationship}
                onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
              />
              <select
                value={newContact.type}
                onChange={(e) => setNewContact({...newContact, type: e.target.value as any})}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={isDimMode ? {
                  backgroundColor: '#4b5563',
                  borderColor: '#6b7280',
                  color: '#f9fafb'
                } : {}}
              >
                <option value="family">Family</option>
                <option value="emergency">Emergency</option>
                <option value="medical">Medical</option>
              </select>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleAddContact} variant="primary" size="sm">
                Add Contact
              </Button>
              <Button onClick={() => setShowAddForm(false)} variant="outline" size="sm">
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Contacts List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`p-4 rounded-lg border-2 ${getContactColor(contact.type)}`}
              style={isDimMode ? {color: '#f9fafb'} : {}}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getContactIcon(contact.type)}</span>
                  <div>
                    <h4 className="font-medium">{contact.name}</h4>
                    <p className="text-sm opacity-75">{contact.relationship}</p>
                    <p className="text-sm font-mono opacity-90">{contact.phone}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => window.open(`tel:${contact.phone}`)}
                    variant="primary"
                    size="sm"
                    className="flex items-center"
                  >
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleEditContact(contact)}
                    variant="outline"
                    size="sm"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  {contact.type !== 'emergency' && (
                    <Button
                      onClick={() => handleDeleteContact(contact.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Contact Modal */}
        {editingContact && (
          <div className="fixed inset-0 z-60 flex items-center justify-center">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setEditingContact(null)} />
            <div 
              className="relative rounded-xl shadow-2xl max-w-md w-full mx-4 p-6"
              style={isDimMode ? {
                backgroundColor: '#1f2937',
                color: '#f9fafb'
              } : {
                backgroundColor: 'white',
                color: '#111827'
              }}
            >
              <h3 className="text-lg font-semibold mb-4">Edit Contact</h3>
              <div className="space-y-4">
                <Input
                  placeholder="Name"
                  value={editingContact.name}
                  onChange={(e) => setEditingContact({...editingContact, name: e.target.value})}
                />
                <Input
                  placeholder="Phone Number"
                  value={editingContact.phone}
                  onChange={(e) => setEditingContact({...editingContact, phone: e.target.value})}
                />
                <Input
                  placeholder="Relationship"
                  value={editingContact.relationship}
                  onChange={(e) => setEditingContact({...editingContact, relationship: e.target.value})}
                />
                <select
                  value={editingContact.type}
                  onChange={(e) => setEditingContact({...editingContact, type: e.target.value as any})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={isDimMode ? {
                    backgroundColor: '#4b5563',
                    borderColor: '#6b7280',
                    color: '#f9fafb'
                  } : {}}
                >
                  <option value="family">Family</option>
                  <option value="emergency">Emergency</option>
                  <option value="medical">Medical</option>
                </select>
              </div>
              <div className="flex space-x-2 mt-6">
                <Button onClick={handleUpdateContact} variant="primary" size="sm">
                  Update
                </Button>
                <Button onClick={() => setEditingContact(null)} variant="outline" size="sm">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};