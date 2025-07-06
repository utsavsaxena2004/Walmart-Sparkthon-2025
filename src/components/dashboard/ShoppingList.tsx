import React, { useState } from 'react';
import { Plus, X, ShoppingCart, AlertTriangle, Star } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useStore } from '../../contexts/StoreContext';

export const ShoppingList: React.FC = () => {
  const { shoppingList, addToShoppingList, removeFromShoppingList, updateShoppingItem } = useStore();
  const [newItem, setNewItem] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddItem = () => {
    if (newItem.trim()) {
      addToShoppingList({
        id: Date.now().toString(),
        name: newItem.trim(),
        category: 'General',
        location: { x: 200, y: 100 },
        allergenWarning: false,
        autoReorder: false
      });
      setNewItem('');
      setShowAddForm(false);
    }
  };

  const toggleAutoReorder = (itemId: string, autoReorder: boolean) => {
    updateShoppingItem(itemId, { autoReorder });
  };

  const getItemStatusColor = (item: any) => {
    if (item.allergenWarning) return 'border-red-200 bg-red-50';
    if (item.autoReorder) return 'border-green-200 bg-green-50';
    return 'border-gray-200 bg-white';
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <ShoppingCart className="w-5 h-5 text-gray-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Shopping List</h2>
          <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {shoppingList.length}
          </span>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowAddForm(true)}
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Item
        </Button>
      </div>

      {showAddForm && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter item name..."
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
            />
            <Button variant="primary" onClick={handleAddItem}>
              Add
            </Button>
            <Button variant="outline" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {shoppingList.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Your shopping list is empty</p>
            <p className="text-sm">Add items to get started with optimized routing</p>
          </div>
        ) : (
          shoppingList.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-lg border-2 ${getItemStatusColor(item)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    {item.allergenWarning && (
                      <AlertTriangle className="w-4 h-4 text-red-500 ml-2" />
                    )}
                    {item.autoReorder && (
                      <Star className="w-4 h-4 text-green-500 ml-2" />
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {item.category} • {item.preferredBrand && `${item.preferredBrand} • `}
                    Location: Aisle {Math.floor(item.location.x / 100)}
                  </div>
                  {item.lastPurchased && (
                    <div className="text-xs text-gray-500">
                      Last purchased: {new Date(item.lastPurchased).toLocaleDateString()}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant={item.autoReorder ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => toggleAutoReorder(item.id, !item.autoReorder)}
                  >
                    {item.autoReorder ? 'Auto' : 'Manual'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFromShoppingList(item.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {shoppingList.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-blue-900">Route Optimization</h4>
              <p className="text-sm text-blue-700">
                {shoppingList.filter(item => item.autoReorder).length} items set for auto-reorder
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-600">Est. Time</div>
              <div className="font-bold text-blue-900">
                {Math.max(15, shoppingList.length * 3)} min
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};