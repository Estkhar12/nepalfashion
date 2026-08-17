import React from 'react';
import { X, Printer, Download, CheckCircle, Phone, Mail, MapPin } from 'lucide-react';
import { BrandLogo } from '../components/Icons';
import { useStore } from '../context/StoreContext';

export const InvoiceModal = () => {
  const { invoiceOrder, isInvoiceOpen, closeInvoice, storeSettings } = useStore();

  if (!isInvoiceOpen || !invoiceOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  const calculateVat = () => {
    if (!storeSettings.isVatEnabled) return 0;
    const taxable = invoiceOrder.subtotal - (invoiceOrder.discountAmount || 0);
    return Math.round((taxable * (storeSettings.vatRate || 13)) / 100);
  };

  const vatAmount = calculateVat();
  const netTotal = invoiceOrder.total + vatAmount;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white print:static animate-fadeIn">
      
      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-4 print:shadow-none print:border-none print:max-w-none print:m-0 print:rounded-none">
        
        {/* Top Control Bar (Hidden when printing) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between print:hidden border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-base sm:text-lg text-pink-400">
              Tax Invoice
            </span>
            <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
              {invoiceOrder.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-[#D81B60] hover:bg-[#C2185B] text-white px-4 py-2 rounded-lg text-xs font-bold shadow transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice / Save PDF</span>
            </button>

            <button
              onClick={closeInvoice}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* --- INVOICE PAPER CONTENT (Printable Area) --- */}
        <div id="invoice-paper" className="p-6 sm:p-10 bg-white text-slate-800 font-sans space-y-6">
          
          {/* Official Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b-2 border-[#D81B60]">
            <div>
              <BrandLogo className="h-12" />
              <div className="mt-2 text-xs text-slate-600 space-y-0.5">
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-pink" />
                  <span>{storeSettings.address}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-brand-pink" />
                  <span>{storeSettings.phone} | WhatsApp: {storeSettings.whatsapp}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-brand-pink" />
                  <span>{storeSettings.email}</span>
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="inline-block bg-pink-50 border border-pink-200 px-3 py-1 rounded text-[#D81B60] font-serif font-bold text-sm uppercase tracking-wider mb-2">
                TAX INVOICE / BILL
              </div>
              <p className="text-xs font-bold text-slate-700">
                PAN / VAT Reg No: <span className="font-mono text-slate-900">{storeSettings.panNumber}</span>
              </p>
              <p className="text-xs text-slate-600 font-semibold mt-1">
                Invoice No: <span className="font-mono text-brand-pink font-bold">{invoiceOrder.id}</span>
              </p>
              <p className="text-xs text-slate-500">
                Date: {new Date(invoiceOrder.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Bill To / Customer Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
            <div>
              <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Billed To (Customer):
              </span>
              <h4 className="font-bold text-sm text-[#0B192C]">
                {invoiceOrder.customer.name}
              </h4>
              <p className="text-slate-600 mt-0.5">{invoiceOrder.customer.address}</p>
              <p className="text-slate-600">City: {invoiceOrder.customer.city || 'Kathmandu'}</p>
              <p className="text-slate-600 font-mono mt-1">Phone: {invoiceOrder.customer.phone}</p>
              {invoiceOrder.customer.email && (
                <p className="text-slate-500">{invoiceOrder.customer.email}</p>
              )}
            </div>

            <div className="sm:text-right flex flex-col justify-between">
              <div>
                <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Order Details:
                </span>
                <p className="text-slate-700">
                  Payment Method: <span className="font-bold text-[#0B192C]">{invoiceOrder.paymentMethod}</span>
                </p>
                <p className="text-slate-700">
                  Payment Status:{' '}
                  <span
                    className={`font-bold px-1.5 py-0.5 rounded text-[11px] ${
                      invoiceOrder.paymentStatus === 'Paid'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {invoiceOrder.paymentStatus}
                  </span>
                </p>
                <p className="text-slate-700 mt-1">
                  Delivery Mode: <span className="font-medium">Kathmandu Express Courier</span>
                </p>
              </div>

              {invoiceOrder.notes && (
                <p className="text-[11px] text-slate-500 italic mt-2">
                  Notes: "{invoiceOrder.notes}"
                </p>
              )}
            </div>
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#0B192C] text-white">
                  <th className="p-2.5 font-bold rounded-l-lg">S.N.</th>
                  <th className="p-2.5 font-bold">Item & Description</th>
                  <th className="p-2.5 font-bold">Size</th>
                  <th className="p-2.5 font-bold text-right">Unit Rate (Rs.)</th>
                  <th className="p-2.5 font-bold text-center">Qty</th>
                  <th className="p-2.5 font-bold text-right rounded-r-lg">Total Amount (Rs.)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {invoiceOrder.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-2.5 font-mono text-slate-500">{idx + 1}</td>
                    <td className="p-2.5 font-medium text-slate-900">
                      <span className="font-bold text-[#0B192C] uppercase">{item.name}</span>
                      <span className="text-slate-500 block text-[11px]">{item.subtitle}</span>
                    </td>
                    <td className="p-2.5 font-semibold text-slate-700">{item.selectedSize}</td>
                    <td className="p-2.5 text-right font-mono">{item.price.toLocaleString()}</td>
                    <td className="p-2.5 text-center font-bold">{item.quantity}</td>
                    <td className="p-2.5 text-right font-bold font-mono text-[#0B192C]">
                      {(item.price * item.quantity).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Calculations & Grand Total */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pt-2">
            {/* Terms / Bank Payment Details */}
            <div className="sm:col-span-7 space-y-2 text-[11px] text-slate-500 border border-slate-100 p-3 rounded-lg bg-slate-50/50">
              <p className="font-bold text-slate-700 uppercase tracking-wider">Terms & Conditions:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Goods once sold can be exchanged within 7 days with original invoice & tags intact.</li>
                <li>For any queries or returns, WhatsApp our customer support at {storeSettings.phone}.</li>
                <li>This is a computer-generated tax invoice for Nepal Fashion KTM.</li>
              </ul>
            </div>

            {/* Total Calculations */}
            <div className="sm:col-span-5 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-mono font-semibold">Rs. {invoiceOrder.subtotal.toLocaleString()}</span>
              </div>

              {invoiceOrder.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount ({invoiceOrder.discountCode || 'Promo'}):</span>
                  <span className="font-mono">- Rs. {invoiceOrder.discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Delivery Charge:</span>
                <span className="font-mono font-semibold">
                  {invoiceOrder.deliveryFee === 0 ? 'FREE' : `Rs. ${invoiceOrder.deliveryFee}`}
                </span>
              </div>

              {storeSettings.isVatEnabled && (
                <div className="flex justify-between text-slate-600">
                  <span>VAT ({storeSettings.vatRate}%):</span>
                  <span className="font-mono font-semibold">Rs. {vatAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-sm sm:text-base font-bold text-[#0B192C] pt-2 border-t-2 border-slate-800">
                <span>Grand Total:</span>
                <span className="text-[#D81B60] font-mono">Rs. {netTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Authorized Signature & Official Seal */}
          <div className="pt-8 border-t border-slate-200 flex justify-between items-end">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#D81B60]/40 flex items-center justify-center text-[#D81B60]/60 text-[9px] font-bold text-center leading-tight uppercase transform -rotate-12 select-none">
                Official<br/>KTM Seal
              </div>
              <div className="text-[10px] text-slate-400">
                <p className="font-bold text-slate-600">Nepal Fashion KTM</p>
                <p>Verified Merchant</p>
              </div>
            </div>

            <div className="text-center">
              <div className="font-script text-2xl text-[#0B192C] select-none -mb-1">
                Nepal Fashion KTM
              </div>
              <div className="w-40 border-t border-slate-400 mt-1"></div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block mt-0.5">
                Authorized Signatory
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
