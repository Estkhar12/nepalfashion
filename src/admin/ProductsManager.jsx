import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Check, 
  X, 
  Filter, 
  Image as ImageIcon,
  Tag,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import sareesImg from '../assets/collection-sarees.jpg';
import kurtisImg from '../assets/collection-kurtis.jpg';
import westernImg from '../assets/collection-western.jpg';
import accessoriesImg from '../assets/collection-accessories.jpg';
import ethnicImg from '../assets/collection-ethnic.jpg';
import newArrivalsImg from '../assets/collection-newarrivals.jpg';

export const ProductsManager = () => {
  const { products, addProduct, updateProduct, deleteProduct, showToast } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [stockFilter, setStockFilter] = useState('ALL');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Form State
  const initialFormState = {
    name: '',
    subtitle: 'Daily & Party Wear',
    price: 3500,
    originalPrice: 4500,
    stock: 15,
    badge: 'Popular',
    image: kurtisImg,
    description: 'Premium quality designer fabric handcrafted with traditional Nepalese touch and elegant embroidery.',
    features: 'Pure Silk Blend\nGolden Zari Border\nBreathable & Comfortable\nIncludes Matching Dupatta',
    availableSizes: ['S', 'M', 'L', 'XL'],
    colors: ['#D81B60', '#0B192C', '#D4AF37'],
  };

  const [formData, setFormData] = useState(initialFormState);

  const presetImages = [
    { name: 'Saree', url: sareesImg },
    { name: 'Kurti', url: kurtisImg },
    { name: 'Western', url: westernImg },
    { name: 'Accessories', url: accessoriesImg },
    { name: 'Ethnic Set', url: ethnicImg },
    { name: 'New Arrival', url: newArrivalsImg },
  ];

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setFormData({
      ...prod,
      features: Array.isArray(prod.features) ? prod.features.join('\n') : prod.features || '',
      availableSizes: prod.availableSizes || ['M', 'L'],
    });
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Please enter a product name');
      return;
    }

    const cleanedData = {
      ...formData,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice),
      stock: Number(formData.stock),
      features: typeof formData.features === 'string'
        ? formData.features.split('\n').filter((f) => f.trim().length > 0)
        : formData.features,
    };

    if (editingProduct) {
      updateProduct({ ...editingProduct, ...cleanedData });
    } else {
      addProduct(cleanedData);
    }

    setIsModalOpen(false);
  };

  const toggleSize = (sz) => {
    const current = formData.availableSizes || [];
    if (current.includes(sz)) {
      setFormData({ ...formData, availableSizes: current.filter((s) => s !== sz) });
    } else {
      setFormData({ ...formData, availableSizes: [...current, sz] });
    }
  };

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === 'ALL' ||
      p.name.toUpperCase().includes(categoryFilter.toUpperCase()) ||
      p.subtitle.toUpperCase().includes(categoryFilter.toUpperCase());
    const matchesStock =
      stockFilter === 'ALL' ||
      (stockFilter === 'IN_STOCK' && (p.stock || 0) >= 10) ||
      (stockFilter === 'LOW_STOCK' && (p.stock || 0) > 0 && (p.stock || 0) < 10) ||
      (stockFilter === 'OUT_OF_STOCK' && (p.stock || 0) === 0);

    return matchesSearch && matchesCategory && matchesStock;
  });

  const categories = ['ALL', 'SAREES', 'KURTIS', 'WESTERN WEAR', 'ACCESSORIES', 'ETHNIC SETS', 'NEW ARRIVALS'];

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0B192C]">
            Fashion Products & Inventory
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your ladies' wear catalog, update prices, adjust inventory stock, and launch new collections.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-[#D81B60] hover:bg-[#C2185B] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Garment</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search sarees, kurtis, accessories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-pink"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2.5 w-full md:w-auto items-center">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c === 'ALL' ? 'All Categories' : c}</option>
            ))}
          </select>

          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink"
          >
            <option value="ALL">All Stock Levels</option>
            <option value="IN_STOCK">In Stock (10+)</option>
            <option value="LOW_STOCK">Low Stock (&lt;10)</option>
            <option value="OUT_OF_STOCK">Out of Stock</option>
          </select>

          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-2 rounded-xl">
            {filteredProducts.length} Items
          </span>
        </div>

      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-100 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-3.5 sm:px-6">Product</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Retail Price</th>
                <th className="p-3.5">Original Price</th>
                <th className="p-3.5">Stock Level</th>
                <th className="p-3.5">Badge</th>
                <th className="p-3.5 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-slate-400">
                    No fashion garments found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Image & Title */}
                    <td className="p-3.5 sm:px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-14 object-cover rounded-xl border border-slate-200 flex-shrink-0"
                        />
                        <div>
                          <h4 className="font-serif font-bold text-sm text-[#0B192C] uppercase">
                            {product.name}
                          </h4>
                          <span className="text-slate-500 text-[11px] block">{product.subtitle}</span>
                          <span className="text-[10px] text-slate-400">
                            Sizes: {product.availableSizes?.join(', ') || 'Free Size'}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-3.5">
                      <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        {product.name}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="p-3.5 font-bold font-mono text-[#D81B60] text-sm">
                      Rs. {product.price.toLocaleString()}
                    </td>

                    {/* Original Price */}
                    <td className="p-3.5 font-mono text-slate-400 line-through">
                      Rs. {product.originalPrice?.toLocaleString() || product.price.toLocaleString()}
                    </td>

                    {/* Stock */}
                    <td className="p-3.5">
                      <span
                        className={`inline-flex items-center gap-1 font-mono font-bold px-2.5 py-1 rounded-full text-xs ${
                          (product.stock || 0) < 5
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : (product.stock || 0) < 10
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {product.stock || 0} units
                      </span>
                    </td>

                    {/* Badge */}
                    <td className="p-3.5">
                      {product.badge ? (
                        <span className="bg-pink-100 text-[#D81B60] font-bold text-[10px] px-2 py-0.5 rounded-full uppercase">
                          {product.badge}
                        </span>
                      ) : (
                        <span className="text-slate-300 text-[10px]">—</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="p-3.5 sm:px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(product)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-brand-pink hover:bg-pink-50 transition-colors"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setDeleteConfirmId(product.id)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* ADD / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 animate-scaleUp">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#0B192C]">
                {editingProduct ? 'Edit Fashion Garment' : 'Add New Fashion Collection Item'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 pt-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Garment Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SAREES, KURTIS, BANARASI LEHENGA"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-brand-pink uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Subtitle / Style Type
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Traditional & Designer, Daily & Party Wear"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-brand-pink"
                  />
                </div>
              </div>

              {/* Price & Stock Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Sale Price (Rs.) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold text-[#D81B60] focus:outline-none focus:ring-2 focus:ring-brand-pink"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Original Price (Rs.)
                  </label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brand-pink"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Stock Units *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brand-pink"
                  />
                </div>
              </div>

              {/* Image Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Choose Garment Image
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {presetImages.map((img) => (
                    <div
                      key={img.name}
                      onClick={() => setFormData({ ...formData, image: img.url })}
                      className={`relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                        formData.image === img.url
                          ? 'border-[#D81B60] ring-2 ring-pink-300'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                      <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] text-center py-0.5 font-bold truncate">
                        {img.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sizes & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Available Sizes
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'].map((sz) => (
                      <button
                        type="button"
                        key={sz}
                        onClick={() => toggleSize(sz)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                          formData.availableSizes?.includes(sz)
                            ? 'bg-[#D81B60] text-white border-[#D81B60]'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Promotional Badge
                  </label>
                  <select
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-brand-pink"
                  >
                    <option value="">None</option>
                    <option value="Popular">Popular</option>
                    <option value="Bestseller">Bestseller</option>
                    <option value="Trending">Trending</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Exclusive">Exclusive</option>
                    <option value="New Season">New Season</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Product Description
                </label>
                <textarea
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-brand-pink"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl text-xs font-bold bg-[#D81B60] hover:bg-[#C2185B] text-white shadow-md"
                >
                  {editingProduct ? 'Update Garment' : 'Add to Catalog'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">Delete this product?</h4>
              <p className="text-xs text-slate-500 mt-1">
                This item will be removed from both the admin catalog and public storefront.
              </p>
            </div>
            <div className="flex gap-2 justify-center pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteProduct(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 text-white"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
