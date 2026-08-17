import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  FileText, 
  Plus, 
  CheckCircle, 
  Clock, 
  Truck, 
  PackageCheck, 
  XCircle, 
  Phone, 
  MapPin, 
  CreditCard,
  Trash2,
  X
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrdersManager = () => {
  const { 
    orders, 
    products, 
    createOrder, 
    updateOrderStatus, 
    deleteOrder, 
    openInvoiceForOrder, 
    showToast 
  } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [paymentFilter, setPaymentFilter] = useState('ALL');

  // Manual Order Modal
  const [isManualOrderOpen, setIsManualOrderOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || 'sarees');
  const [selectedSize, setSelectedSize] = useState('M');
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('Kathmandu');
  const [paymentMethod, setPaymentMethod] = useState('Cash On Delivery');
  const [discountAmount, setDiscountAmount] = useState(0);

  const handleCreateManualOrder = (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      showToast('Please provide customer name and phone number');
      return;
    }

    const prod = products.find((p) => p.id === selectedProductId) || products[0];
    const subtotal = prod.price * orderQuantity;
    const deliveryFee = subtotal > 5000 ? 0 : 150;
    const total = Math.max(0, subtotal - Number(discountAmount) + deliveryFee);

    const newOrder = createOrder({
      customer: {
        name: customerName,
        phone: customerPhone,
        email: `${customerName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
        address: customerAddress,
        city: 'Kathmandu',
      },
      items: [
        {
          id: prod.id,
          name: prod.name,
          subtitle: prod.subtitle,
          price: prod.price,
          quantity: Number(orderQuantity),
          selectedSize: selectedSize,
          selectedColor: '#D81B60',
        }
      ],
      subtotal,
      discountCode: discountAmount > 0 ? 'MANUAL' : '',
      discountAmount: Number(discountAmount),
      deliveryFee,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash On Delivery' ? 'Pending' : 'Paid',
      notes: 'Created via Kathmandu store phone / admin booking.',
    });

    setIsManualOrderOpen(false);
    showToast(`Order ${newOrder.id} created successfully!`);
    openInvoiceForOrder(newOrder);
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'ALL' || o.orderStatus === statusFilter;
    const matchesPayment = paymentFilter === 'ALL' || o.paymentMethod.includes(paymentFilter);
    return matchesSearch && matchesStatus && matchesPayment;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0B192C]">
            Customer Orders & Invoices
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Track order fulfillment, update delivery status, and print tax invoices for Kathmandu customers.
          </p>
        </div>

        <button
          onClick={() => setIsManualOrderOpen(true)}
          className="flex items-center gap-2 bg-[#D81B60] hover:bg-[#C2185B] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Phone/Walk-in Order</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by order ID, name, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-pink"
          />
        </div>

        {/* Status & Payment Filters */}
        <div className="flex flex-wrap gap-2.5 w-full md:w-auto items-center">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink"
          >
            <option value="ALL">All Order Statuses</option>
            <option value="Pending">Pending (New)</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink"
          >
            <option value="ALL">All Payment Types</option>
            <option value="Cash On Delivery">Cash On Delivery</option>
            <option value="eSewa">eSewa Wallet</option>
            <option value="Khalti">Khalti Wallet</option>
            <option value="Bank">Bank Transfer</option>
          </select>

          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-2 rounded-xl">
            {filteredOrders.length} Orders
          </span>
        </div>

      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-100 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-3.5 sm:px-6">Invoice #</th>
                <th className="p-3.5">Customer & City</th>
                <th className="p-3.5">Items & Sizes</th>
                <th className="p-3.5">Payment</th>
                <th className="p-3.5">Total Amount</th>
                <th className="p-3.5">Fulfillment Status</th>
                <th className="p-3.5 sm:px-6 text-right">Invoice & Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-slate-400">
                    No customer orders found matching your search.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Invoice ID & Date */}
                    <td className="p-3.5 sm:px-6 font-mono font-bold text-[#0B192C]">
                      {order.id}
                      <span className="block text-[10px] text-slate-400 font-sans font-normal">
                        {new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>

                    {/* Customer */}
                    <td className="p-3.5">
                      <span className="font-bold text-slate-800 block text-xs">{order.customer.name}</span>
                      <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{order.customer.phone}</span>
                      </span>
                      <span className="text-[10px] text-slate-400 block truncate max-w-[160px]">
                        {order.customer.address}
                      </span>
                    </td>

                    {/* Items */}
                    <td className="p-3.5">
                      <div className="space-y-0.5">
                        {order.items.map((i, idx) => (
                          <div key={idx} className="text-slate-700">
                            <strong className="text-[#0B192C] uppercase text-[11px]">{i.name}</strong>{' '}
                            <span className="text-[10px] text-slate-500">({i.selectedSize}) × {i.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Payment */}
                    <td className="p-3.5">
                      <span className="font-semibold text-slate-700 block text-[11px]">
                        {order.paymentMethod}
                      </span>
                      <span
                        className={`inline-block text-[10px] font-bold px-1.5 py-0.2 rounded mt-0.5 ${
                          order.paymentStatus === 'Paid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>

                    {/* Total Amount */}
                    <td className="p-3.5 font-bold font-mono text-[#D81B60] text-sm">
                      Rs. {order.total.toLocaleString()}
                      {order.discountAmount > 0 && (
                        <span className="block text-[10px] text-emerald-600 font-sans font-medium">
                          Saved Rs. {order.discountAmount}
                        </span>
                      )}
                    </td>

                    {/* Status Changer */}
                    <td className="p-3.5">
                      <select
                        value={order.orderStatus}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-full border focus:outline-none cursor-pointer ${
                          order.orderStatus === 'Delivered'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : order.orderStatus === 'Shipped'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : order.orderStatus === 'Processing'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : order.orderStatus === 'Cancelled'
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : 'bg-purple-50 text-purple-700 border-purple-200'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="p-3.5 sm:px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openInvoiceForOrder(order)}
                          className="flex items-center gap-1 bg-[#D81B60] hover:bg-[#C2185B] text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow transition-all"
                          title="Generate & Print Tax Invoice"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Print Bill</span>
                        </button>

                        <button
                          onClick={() => deleteOrder(order.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Order"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MANUAL ORDER MODAL */}
      {isManualOrderOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-serif font-bold text-lg text-[#0B192C]">
                Create Phone / Store Order
              </h3>
              <button
                onClick={() => setIsManualOrderOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualOrder} className="space-y-3.5 pt-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Customer Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pooja Shrestha"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-pink focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+977 98..."
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono focus:ring-2 focus:ring-brand-pink focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Delivery Address</label>
                  <input
                    type="text"
                    placeholder="e.g. Baneshwor, Kathmandu"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-pink focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Select Garment</label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:ring-2 focus:ring-brand-pink focus:outline-none"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.subtitle}) — Rs. {p.price.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Size</label>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-pink focus:outline-none"
                  >
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                    <option value="Free Size">Free Size</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={orderQuantity}
                    onChange={(e) => setOrderQuantity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono focus:ring-2 focus:ring-brand-pink focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Discount (Rs.)</label>
                  <input
                    type="number"
                    min="0"
                    value={discountAmount}
                    onChange={(e) => setDiscountAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono focus:ring-2 focus:ring-brand-pink focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:ring-2 focus:ring-brand-pink focus:outline-none"
                >
                  <option value="Cash On Delivery">Cash On Delivery (COD)</option>
                  <option value="eSewa Mobile Wallet">eSewa Mobile Wallet</option>
                  <option value="Khalti Digital Wallet">Khalti Digital Wallet</option>
                  <option value="Bank Transfer / FonePay">Bank Transfer / FonePay QR</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsManualOrderOpen(false)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl font-bold bg-[#D81B60] hover:bg-[#C2185B] text-white shadow"
                >
                  Create & Print Bill
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
