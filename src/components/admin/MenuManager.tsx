import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  ChevronRight, 
  ChevronDown, 
  Check, 
  X, 
  Layers, 
  ArrowUpDown,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { MenuItem, SubMenuItem, SubSubMenuItem } from '../../types';

export const MenuManager: React.FC = () => {
  const { 
    menus, 
    addMainMenu, 
    editMainMenu, 
    deleteMainMenu,
    addSubMenu, 
    editSubMenu, 
    deleteSubMenu,
    addSubSubMenu, 
    editSubSubMenu, 
    deleteSubSubMenu 
  } = useApp();

  // State for Add/Edit Modal
  const [modalType, setModalType] = useState<'add-main' | 'edit-main' | 'add-sub' | 'edit-sub' | 'add-subsub' | 'edit-subsub' | null>(null);
  
  // Selected targets for modals
  const [targetParentId, setTargetParentId] = useState<string>('');
  const [targetSubId, setTargetSubId] = useState<string>('');
  const [targetItemId, setTargetItemId] = useState<string>('');
  
  // Form fields
  const [formLabel, setFormLabel] = useState('');
  const [formHref, setFormHref] = useState('');
  const [formOrder, setFormOrder] = useState<number>(1);
  const [formBadge, setFormBadge] = useState('');

  const openAddMainMenu = () => {
    setFormLabel('');
    setFormHref('#');
    setFormOrder(menus.length + 1);
    setFormBadge('');
    setModalType('add-main');
  };

  const openEditMainMenu = (item: MenuItem) => {
    setTargetItemId(item.id);
    setFormLabel(item.label);
    setFormHref(item.href);
    setFormOrder(item.order);
    setFormBadge(item.badge || '');
    setModalType('edit-main');
  };

  const openAddSubMenu = (parentId: string) => {
    setTargetParentId(parentId);
    setFormLabel('');
    setFormHref('#');
    setFormOrder(1);
    setModalType('add-sub');
  };

  const openEditSubMenu = (parentId: string, sub: SubMenuItem) => {
    setTargetParentId(parentId);
    setTargetItemId(sub.id);
    setFormLabel(sub.label);
    setFormHref(sub.href);
    setFormOrder(sub.order);
    setModalType('edit-sub');
  };

  const openAddSubSubMenu = (parentId: string, subId: string) => {
    setTargetParentId(parentId);
    setTargetSubId(subId);
    setFormLabel('');
    setFormHref('#');
    setFormOrder(1);
    setModalType('add-subsub');
  };

  const openEditSubSubMenu = (parentId: string, subId: string, subsub: SubSubMenuItem) => {
    setTargetParentId(parentId);
    setTargetSubId(subId);
    setTargetItemId(subsub.id);
    setFormLabel(subsub.label);
    setFormHref(subsub.href);
    setFormOrder(subsub.order);
    setModalType('edit-subsub');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formLabel.trim()) return;

    if (modalType === 'add-main') {
      addMainMenu({
        label: formLabel,
        href: formHref || '#',
        order: Number(formOrder),
        badge: formBadge || undefined,
        children: []
      });
    } else if (modalType === 'edit-main') {
      editMainMenu(targetItemId, {
        label: formLabel,
        href: formHref || '#',
        order: Number(formOrder),
        badge: formBadge || undefined
      });
    } else if (modalType === 'add-sub') {
      addSubMenu(targetParentId, {
        label: formLabel,
        href: formHref || '#',
        order: Number(formOrder),
        children: []
      });
    } else if (modalType === 'edit-sub') {
      editSubMenu(targetParentId, targetItemId, {
        label: formLabel,
        href: formHref || '#',
        order: Number(formOrder)
      });
    } else if (modalType === 'add-subsub') {
      addSubSubMenu(targetParentId, targetSubId, {
        label: formLabel,
        href: formHref || '#',
        order: Number(formOrder)
      });
    } else if (modalType === 'edit-subsub') {
      editSubSubMenu(targetParentId, targetSubId, targetItemId, {
        label: formLabel,
        href: formHref || '#',
        order: Number(formOrder)
      });
    }

    setModalType(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-600" />
            <span>Navigation Menu Hierarchy (3-Level Architecture)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your website menus: <strong>Main Menu</strong> → <strong>Sub-Menu</strong> → <strong>Sub-Sub Menu</strong>. Changes reflect instantly on the live site.
          </p>
        </div>

        <button
          onClick={openAddMainMenu}
          className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold px-3.5 py-2 rounded-md transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Main Menu Item</span>
        </button>
      </div>

      {/* Hierarchical Menus List */}
      <div className="space-y-3">
        {menus.map((mainItem) => (
          <div 
            key={mainItem.id}
            className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden"
          >
            {/* Level 1: Main Menu Row */}
            <div className="bg-slate-100/90 px-4 py-3 flex items-center justify-between gap-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center">
                  L1
                </span>
                <span className="text-sm font-bold text-slate-900">{mainItem.label}</span>
                {mainItem.badge && (
                  <span className="bg-amber-200 text-amber-900 text-[10px] font-bold px-1.5 py-0.5 rounded">
                    {mainItem.badge}
                  </span>
                )}
                <span className="text-xs text-slate-400 font-mono">({mainItem.href})</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => openAddSubMenu(mainItem.id)}
                  className="text-xs font-medium bg-white hover:bg-slate-50 text-slate-700 px-2 py-1 rounded border border-slate-300 flex items-center gap-1"
                  title="Add Sub Menu under this item"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-600" />
                  <span>Add Sub-Menu</span>
                </button>
                <button
                  onClick={() => openEditMainMenu(mainItem)}
                  className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded"
                  title="Edit Main Menu"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete "${mainItem.label}" and all its submenus?`)) {
                      deleteMainMenu(mainItem.id);
                    }
                  }}
                  className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                  title="Delete Main Menu"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Level 2: Sub-Menus */}
            {mainItem.children && mainItem.children.length > 0 ? (
              <div className="p-3 bg-slate-50/50 space-y-2">
                {mainItem.children.map((subItem) => (
                  <div 
                    key={subItem.id} 
                    className="bg-white rounded border border-slate-200/80 p-3 ml-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded bg-amber-500 text-slate-950 text-[9px] font-bold flex items-center justify-center">
                          L2
                        </span>
                        <span className="text-xs font-semibold text-slate-800">{subItem.label}</span>
                        <span className="text-[11px] text-slate-400 font-mono">({subItem.href})</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openAddSubSubMenu(mainItem.id, subItem.id)}
                          className="text-[11px] font-medium bg-slate-50 hover:bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1"
                          title="Add Sub-Sub Menu item"
                        >
                          <Plus className="w-3 h-3 text-amber-600" />
                          <span>Add Sub-Sub</span>
                        </button>
                        <button
                          onClick={() => openEditSubMenu(mainItem.id, subItem)}
                          className="p-1 text-slate-500 hover:text-slate-800 rounded"
                          title="Edit Sub-Menu"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete sub-menu "${subItem.label}"?`)) {
                              deleteSubMenu(mainItem.id, subItem.id);
                            }
                          }}
                          className="p-1 text-red-400 hover:text-red-600 rounded"
                          title="Delete Sub-Menu"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Level 3: Sub-Sub-Menus */}
                    {subItem.children && subItem.children.length > 0 && (
                      <div className="mt-2 pl-4 border-l-2 border-amber-300 space-y-1 pt-1">
                        {subItem.children.map((subSub) => (
                          <div 
                            key={subSub.id}
                            className="flex items-center justify-between py-1 px-2 bg-slate-50 rounded text-[11px] text-slate-700 hover:bg-amber-50/40"
                          >
                            <div className="flex items-center gap-1.5">
                              <span className="w-3.5 h-3.5 rounded bg-slate-700 text-white text-[8px] font-bold flex items-center justify-center">
                                L3
                              </span>
                              <span className="font-medium">{subSub.label}</span>
                              <span className="text-slate-400 font-mono text-[10px]">({subSub.href})</span>
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => openEditSubSubMenu(mainItem.id, subItem.id, subSub)}
                                className="p-0.5 text-slate-400 hover:text-slate-700"
                                title="Edit"
                              >
                                <Edit2 className="w-2.5 h-2.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Delete "${subSub.label}"?`)) {
                                    deleteSubSubMenu(mainItem.id, subItem.id, subSub.id);
                                  }
                                }}
                                className="p-0.5 text-red-400 hover:text-red-600"
                                title="Delete"
                              >
                                <Trash2 className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-4 py-2 text-[11px] text-slate-400 italic">
                No sub-menus. Click "Add Sub-Menu" above to create dropdown links.
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add / Edit Form Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-md w-full p-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h4 className="text-sm font-bold text-slate-900">
                {modalType.startsWith('add') ? 'Add New' : 'Edit'} {' '}
                {modalType.includes('main') ? 'Main Menu Item (L1)' : modalType.includes('subsub') ? 'Sub-Sub Menu Item (L3)' : 'Sub Menu Item (L2)'}
              </h4>
              <button onClick={() => setModalType(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Menu Label / Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Services, Pre-Construction, Factory Projects..."
                  value={formLabel}
                  onChange={(e) => setFormLabel(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Destination Link / Anchor *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. #services, #projects, #contact or https://..."
                  value={formHref}
                  onChange={(e) => setFormHref(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formOrder}
                    onChange={(e) => setFormOrder(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                {modalType.includes('main') && (
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Badge Text (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Turnkey, New"
                      value={formBadge}
                      onChange={(e) => setFormBadge(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-3 py-1.5 rounded text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
