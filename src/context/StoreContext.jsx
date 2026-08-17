import React, { createContext, useContext, useState, useEffect } from 'react';
import { collectionsData as initialProducts } from '../data/products';
import { 
  initialOrders, 
  initialDiscounts, 
  initialCustomers, 
  initialStoreSettings,
  sampleHistoricalSales 
} from '../data/mockAdminData';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // 1. Current View Mode: 'storefront' | 'admin'
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem('nfk_view_mode') || 'storefront';
  });

  // 2. Active Admin Navigation Tab
  const [adminTab, setAdminTab] = useState('overview');

  // 3. Dynamic Products State (CRUD enabled)
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('nfk_products');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialProducts;
  });

  // 4. Orders State (CRUD + Status updates enabled)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('nfk_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialOrders;
  });

  // 5. Discounts & Offers State
  const [discounts, setDiscounts] = useState(() => {
    try {
      const saved = localStorage.getItem('nfk_discounts');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialDiscounts;
  });

  // 6. Customers CRM State
  const [customers, setCustomers] = useState(() => {
    try {
      const saved = localStorage.getItem('nfk_customers');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialCustomers;
  });

  // 7. Store Settings (Address, Phone, PAN, VAT, Delivery)
  const [storeSettings, setStoreSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('nfk_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialStoreSettings;
  });

  // 8. Shopping Cart State for public storefront
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('nepal_fashion_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        ...initialProducts[1], // Kurti item
        selectedSize: 'M',
        selectedColor: '#E91E63',
        quantity: 1,
      }
    ];
  });

  // 9. Active Applied Coupon in Cart
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // 10. Selected Order for Invoice Modal
  const [invoiceOrder, setInvoiceOrder] = useState(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  // 11. Global Toast message
  const [toastMessage, setToastMessage] = useState('');

  // LocalStorage sync effects
  useEffect(() => {
    try {
      localStorage.setItem('nfk_view_mode', currentView);
    } catch (e) {}
  }, [currentView]);

  useEffect(() => {
    try {
      localStorage.setItem('nfk_products', JSON.stringify(products));
    } catch (e) {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('nfk_orders', JSON.stringify(orders));
    } catch (e) {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('nfk_discounts', JSON.stringify(discounts));
    } catch (e) {}
  }, [discounts]);

  useEffect(() => {
    try {
      localStorage.setItem('nfk_customers', JSON.stringify(customers));
    } catch (e) {}
  }, [customers]);

  useEffect(() => {
    try {
      localStorage.setItem('nfk_settings', JSON.stringify(storeSettings));
    } catch (e) {}
  }, [storeSettings]);

  useEffect(() => {
    try {
      localStorage.setItem('nepal_fashion_cart', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  // --- Product CRUD Actions ---
  const addProduct = (newProduct) => {
    const id = newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4);
    const productToAdd = {
      ...newProduct,
      id,
      rating: newProduct.rating || 5.0,
      reviewsCount: newProduct.reviewsCount || 1,
      price: Number(newProduct.price) || 0,
      originalPrice: Number(newProduct.originalPrice) || Number(newProduct.price) || 0,
      stock: Number(newProduct.stock) || 10,
    };
    setProducts((prev) => [productToAdd, ...prev]);
    showToast(`Product "${productToAdd.name}" added successfully!`);
    return productToAdd;
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p))
    );
    showToast(`Product "${updatedProduct.name}" updated successfully!`);
  };

  const deleteProduct = (id) => {
    const p = products.find((item) => item.id === id);
    setProducts((prev) => prev.filter((item) => item.id !== id));
    showToast(`Product "${p?.name || 'Item'}" deleted.`);
  };

  // --- Order CRUD Actions ---
  const createOrder = (orderData) => {
    const orderId = 'NFKTM-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      customer: orderData.customer,
      items: orderData.items,
      subtotal: orderData.subtotal,
      discountCode: orderData.discountCode || '',
      discountAmount: orderData.discountAmount || 0,
      deliveryFee: orderData.deliveryFee || 0,
      total: orderData.total,
      paymentMethod: orderData.paymentMethod || 'Cash On Delivery',
      paymentStatus: orderData.paymentStatus || 'Pending',
      orderStatus: 'Pending',
      notes: orderData.notes || '',
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Update customer lifetime spend or add new customer
    setCustomers((prev) => {
      const existing = prev.find((c) => c.phone === orderData.customer.phone || c.email === orderData.customer.email);
      if (existing) {
        return prev.map((c) =>
          c.id === existing.id
            ? {
                ...c,
                totalOrders: c.totalOrders + 1,
                totalSpent: c.totalSpent + newOrder.total,
                lastOrderDate: new Date().toISOString().slice(0, 10),
              }
            : c
        );
      } else {
        return [
          {
            id: 'cust-' + Date.now(),
            name: orderData.customer.name,
            phone: orderData.customer.phone,
            email: orderData.customer.email,
            city: orderData.customer.city || 'Kathmandu',
            totalOrders: 1,
            totalSpent: newOrder.total,
            tier: newOrder.total > 15000 ? 'VIP Gold' : 'Silver',
            lastOrderDate: new Date().toISOString().slice(0, 10),
          },
          ...prev,
        ];
      }
    });

    return newOrder;
  };

  const updateOrderStatus = (orderId, status, paymentStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              orderStatus: status || o.orderStatus,
              paymentStatus: paymentStatus || o.paymentStatus,
            }
          : o
      )
    );
    showToast(`Order ${orderId} status changed to "${status}"`);
  };

  const deleteOrder = (orderId) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    showToast(`Order ${orderId} deleted.`);
  };

  // --- Discount & Offers Actions ---
  const addDiscount = (disc) => {
    const newDisc = {
      ...disc,
      id: 'disc-' + Date.now(),
      usedCount: 0,
      isActive: true,
    };
    setDiscounts((prev) => [newDisc, ...prev]);
    showToast(`Offer coupon "${newDisc.code}" created!`);
  };

  const toggleDiscount = (id) => {
    setDiscounts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isActive: !d.isActive } : d))
    );
  };

  const deleteDiscount = (id) => {
    setDiscounts((prev) => prev.filter((d) => d.id !== id));
    showToast('Coupon offer removed.');
  };

  const applyCouponCode = (code, subtotal) => {
    const cleanCode = code.trim().toUpperCase();
    const found = discounts.find((d) => d.code === cleanCode && d.isActive);
    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code.' };
    }
    if (subtotal < found.minOrder) {
      return {
        success: false,
        message: `Coupon requires a minimum order of Rs. ${found.minOrder.toLocaleString()}.`,
      };
    }

    let discountAmount = 0;
    if (found.type === 'percentage') {
      discountAmount = Math.round((subtotal * found.value) / 100);
      if (found.maxDiscount && discountAmount > found.maxDiscount) {
        discountAmount = found.maxDiscount;
      }
    } else {
      discountAmount = found.value;
    }

    setAppliedCoupon({
      code: found.code,
      discountAmount,
      title: found.title,
    });

    return {
      success: true,
      discountAmount,
      message: `Coupon "${found.code}" applied! You saved Rs. ${discountAmount.toLocaleString()}.`,
    };
  };

  const removeCouponCode = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed.');
  };

  // --- Invoice Modal Opener ---
  const openInvoiceForOrder = (order) => {
    setInvoiceOrder(order);
    setIsInvoiceOpen(true);
  };

  const closeInvoice = () => {
    setIsInvoiceOpen(false);
    setInvoiceOrder(null);
  };

  // --- Cart Actions ---
  const addToCart = (newItem) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.id === newItem.id && i.selectedSize === newItem.selectedSize
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity || 1;
        return updated;
      }
      return [...prev, newItem];
    });
    showToast(`Added ${newItem.name} (${newItem.selectedSize}) to your bag!`);
  };

  const updateCartQuantity = (id, size, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id, size);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedSize === size
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const removeFromCart = (id, size) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.selectedSize === size))
    );
    showToast('Item removed from bag.');
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  // Reset to default sample data if user wishes
  const resetToSampleData = () => {
    setProducts(initialProducts);
    setOrders(initialOrders);
    setDiscounts(initialDiscounts);
    setCustomers(initialCustomers);
    setStoreSettings(initialStoreSettings);
    showToast('Admin data reset to default demo records.');
  };

  return (
    <StoreContext.Provider
      value={{
        // View & Navigation
        currentView,
        setCurrentView,
        adminTab,
        setAdminTab,
        // Products
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        // Orders
        orders,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        // Invoices
        invoiceOrder,
        isInvoiceOpen,
        openInvoiceForOrder,
        closeInvoice,
        // Discounts
        discounts,
        addDiscount,
        toggleDiscount,
        deleteDiscount,
        appliedCoupon,
        applyCouponCode,
        removeCouponCode,
        // Customers
        customers,
        // Settings
        storeSettings,
        setStoreSettings,
        // Cart
        cartItems,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        // Analytics
        sampleHistoricalSales,
        // Toast
        toastMessage,
        showToast,
        setToastMessage,
        // Utilities
        resetToSampleData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
