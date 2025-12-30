'use client';

import { useEffect, useState } from 'react';
import { getTodayMenu, getMenuStatus, createOrder, type DabbaItem, type MenuStatus } from '@/lib/api/dabba';
import { MenuItemCard } from '@/components/dabba/menu-item-card';
import { StickyCta } from '@/components/dabba/sticky-cta';

interface SelectedItem {
  itemId: string;
  quantity: number;
}

export default function DabbaPage() {
  const [menu, setMenu] = useState<{ menu: any; items: DabbaItem[] } | null>(null);
  const [status, setStatus] = useState<MenuStatus | null>(null);
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    officeName: '',
    deliveryLocation: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [menuResponse, statusResponse] = await Promise.all([
      getTodayMenu(),
      getMenuStatus(),
    ]);

    if (menuResponse.success && menuResponse.data) {
      setMenu(menuResponse.data);
    }

    if (statusResponse.success) {
      setStatus(statusResponse.data);
    }

    setLoading(false);
  };

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: quantity,
    }));
  };

  const getTotalItems = () => {
    return Object.values(selectedItems).reduce((sum, qty) => sum + qty, 0);
  };

  const getTotalAmount = () => {
    if (!menu) return 0;
    return menu.items.reduce((total, item) => {
      const quantity = selectedItems[item.id] || 0;
      return total + item.price * quantity;
    }, 0);
  };

  const handleProceedToOrder = () => {
    if (getTotalItems() === 0) {
      alert('Please select at least one item');
      return;
    }
    setShowForm(true);
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const orderItems = Object.entries(selectedItems)
      .filter(([_, qty]) => qty > 0)
      .map(([itemId, quantity]) => ({
        itemId,
        quantity,
      }));

    const order = {
      ...formData,
      items: orderItems,
      timeSlot: menu?.menu.timeSlot || 'LUNCH',
    };

    const response = await createOrder(order);

    if (response.success) {
      setOrderSuccess(true);
      // Reset form
      setFormData({
        customerName: '',
        phone: '',
        officeName: '',
        deliveryLocation: '',
      });
      setSelectedItems({});
    } else {
      alert(response.message || 'Failed to place order');
    }

    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="text-center">
          <div className="text-2xl mb-2">Loading...</div>
          <div className="text-gray-600">Aapka Dabba ready ho raha hai 🍽️</div>
        </div>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 px-4 pb-20">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 text-center shadow-lg">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Placed!</h2>
          <p className="text-gray-600 mb-6">
            Aapka Dabba 1–3 PM ke beech deliver ho jayega. Dhanyawad! 😊
          </p>
          <button
            onClick={() => {
              setOrderSuccess(false);
              setShowForm(false);
              loadData();
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl">
            Wapas Menu Dekho
          </button>
        </div>
      </div>
    );
  }

  if (!menu) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 px-4 pb-20">
        <div className="text-center">
          <div className="text-2xl mb-2">No Menu Available</div>
          <div className="text-gray-600">Aaj ka menu abhi available nahi hai.</div>
        </div>
      </div>
    );
  }

  const isOrderingClosed = status ? !status.isOrderingOpen : false;
  const totalItems = getTotalItems();
  const totalAmount = getTotalAmount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 pb-24">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Aaj Ka Dabba</h1>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Theme:</span>
              <span className="font-semibold text-orange-600">{menu.menu.theme}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Order by:</span>
              <span className="font-semibold text-gray-900">12:30 PM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Delivery:</span>
              <span className="font-semibold text-gray-900">1–3 PM</span>
            </div>
          </div>
        </div>

        {/* Closed Message */}
        {isOrderingClosed && (
          <div className="bg-gray-100 border-2 border-gray-300 rounded-xl p-4 mb-6 text-center">
            <p className="text-gray-700 font-semibold">
              Orders closed. Kal ka Dabba 10:30 AM ko milega 👀
            </p>
          </div>
        )}

        {/* Menu Items */}
        {!showForm ? (
          <>
            <div className="space-y-4 mb-6">
              {menu.items.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  selectedQuantity={selectedItems[item.id] || 0}
                  onQuantityChange={(qty) => handleQuantityChange(item.id, qty)}
                  disabled={isOrderingClosed}
                />
              ))}
            </div>

            {/* Order Summary */}
            {totalItems > 0 && (
              <div className="bg-white rounded-xl p-4 shadow-sm mb-6 sticky bottom-24">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Total Items:</span>
                  <span className="font-bold text-lg">{totalItems}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-bold text-2xl text-orange-600">₹{totalAmount}</span>
                </div>
              </div>
            )}
          </>
        ) : (
          <form onSubmit={handleSubmitOrder} className="space-y-4">
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Order Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Aapka naam"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="10-digit number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Office Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.officeName}
                    onChange={(e) => setFormData({ ...formData, officeName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Office ka naam"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Delivery Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.deliveryLocation}
                    onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Floor, desk number, etc."
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl">
                Back
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl disabled:opacity-50">
                {submitting ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Sticky CTA */}
      {!showForm && !isOrderingClosed && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-4 shadow-lg">
          <button
            onClick={totalItems > 0 ? handleProceedToOrder : undefined}
            disabled={totalItems === 0}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-colors ${
              totalItems > 0
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}>
            {totalItems > 0 ? `Book Your Dabba (₹${totalAmount})` : 'Select Items to Order'}
          </button>
        </div>
      )}
    </div>
  );
}

