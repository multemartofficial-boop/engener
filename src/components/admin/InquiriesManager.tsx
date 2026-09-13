import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MessageSquare, 
  Trash2, 
  Phone, 
  Mail, 
  Building, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Filter, 
  Download,
  X,
  FileText
} from 'lucide-react';
import { InquiryForm } from '../../types';

export const InquiriesManager: React.FC = () => {
  const { inquiries, updateInquiryStatus, deleteInquiry } = useApp();
  
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryForm | null>(null);
  const [engineerNote, setEngineerNote] = useState('');

  const filtered = inquiries.filter(inq => 
    filterStatus === 'all' || inq.status === filterStatus
  );

  const openDetail = (inq: InquiryForm) => {
    setSelectedInquiry(inq);
    setEngineerNote(inq.notes || '');
  };

  const handleStatusChange = (inqId: string, newStatus: InquiryForm['status']) => {
    updateInquiryStatus(inqId, newStatus, engineerNote);
    if (selectedInquiry && selectedInquiry.id === inqId) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus, notes: engineerNote });
    }
  };

  const handleSaveNotes = () => {
    if (selectedInquiry) {
      updateInquiryStatus(selectedInquiry.id, selectedInquiry.status, engineerNote);
      setSelectedInquiry({ ...selectedInquiry, notes: engineerNote });
    }
  };

  const exportCSV = () => {
    const headers = ['Date', 'Client Name', 'Phone', 'Email', 'Company', 'Project Type', 'Location', 'Area', 'Status', 'Message'];
    const rows = inquiries.map(i => [
      new Date(i.createdAt).toLocaleDateString(),
      `"${i.fullName}"`,
      `"${i.phone}"`,
      `"${i.email}"`,
      `"${i.companyName || ''}"`,
      `"${i.projectType}"`,
      `"${i.location}"`,
      `"${i.estimatedArea || ''}"`,
      `"${i.status}"`,
      `"${(i.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `smart_engineering_leads_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: InquiryForm['status']) => {
    switch (status) {
      case 'New':
        return <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold text-[10px]">New Lead</span>;
      case 'In Review':
        return <span className="bg-blue-100 text-blue-900 px-2 py-0.5 rounded font-bold text-[10px]">In Review</span>;
      case 'Contacted':
        return <span className="bg-purple-100 text-purple-900 px-2 py-0.5 rounded font-bold text-[10px]">Contacted</span>;
      case 'Quoted':
        return <span className="bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold text-[10px]">BOQ Quoted</span>;
      case 'Archived':
        return <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium text-[10px]">Archived</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-600" />
            <span>Contact & Quote Inquiries Inbox</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Client leads, factory estimation requests, and inquiries submitted from smartengineering-bd.com.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-2 rounded-md transition-colors shrink-0"
        >
          <Download className="w-4 h-4 text-amber-400" />
          <span>Export to Excel / CSV</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'all', label: `All (${inquiries.length})` },
          { id: 'New', label: `New (${inquiries.filter(i => i.status === 'New').length})` },
          { id: 'In Review', label: 'In Review' },
          { id: 'Contacted', label: 'Contacted' },
          { id: 'Quoted', label: 'BOQ Quoted' },
          { id: 'Archived', label: 'Archived' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterStatus(tab.id)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap ${
              filterStatus === tab.id
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Inquiries Table */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-lg border border-slate-200 p-8 text-center text-xs text-slate-500">
          No inquiries found matching this status.
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Client / Company</th>
                  <th className="py-3 px-4">Project Type & Area</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((inq) => (
                  <tr 
                    key={inq.id} 
                    className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${inq.status === 'New' ? 'bg-amber-50/30' : ''}`}
                    onClick={() => openDetail(inq)}
                  >
                    <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{inq.fullName}</div>
                      {inq.companyName && (
                        <div className="text-[11px] text-slate-500">{inq.companyName}</div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-800">{inq.projectType}</div>
                      <div className="text-[11px] text-amber-700 font-semibold">
                        {inq.estimatedArea || inq.location}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-mono text-slate-800 font-medium">{inq.phone}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[150px]">{inq.email}</div>
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(inq.status)}
                    </td>
                    <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => {
                          if (confirm(`Delete inquiry from "${inq.fullName}"?`)) {
                            deleteInquiry(inq.id);
                          }
                        }}
                        className="p-1.5 text-red-400 hover:text-red-600 rounded hover:bg-red-50"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-xl w-full p-6 animate-in fade-in duration-150 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-slate-900 font-display">
                  Inquiry Submission Details
                </h4>
                {getStatusBadge(selectedInquiry.status)}
              </div>
              <button onClick={() => setSelectedInquiry(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              
              {/* Contact card */}
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">{selectedInquiry.fullName}</span>
                  <span className="text-[11px] text-slate-400">
                    {new Date(selectedInquiry.createdAt).toLocaleString()}
                  </span>
                </div>

                {selectedInquiry.companyName && (
                  <div className="text-slate-600 font-medium">
                    Company: <strong className="text-slate-800">{selectedInquiry.companyName}</strong>
                  </div>
                )}

                <div className="flex flex-wrap gap-4 pt-1">
                  <a 
                    href={`tel:${selectedInquiry.phone}`} 
                    className="inline-flex items-center gap-1 text-amber-700 hover:underline font-bold"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{selectedInquiry.phone}</span>
                  </a>
                  <a 
                    href={`mailto:${selectedInquiry.email}`} 
                    className="inline-flex items-center gap-1 text-blue-700 hover:underline"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{selectedInquiry.email}</span>
                  </a>
                </div>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-3 bg-white p-3 rounded-lg border border-slate-200">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Project Category</span>
                  <span className="font-semibold text-slate-800">{selectedInquiry.projectType}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Location / District</span>
                  <span className="font-semibold text-slate-800">{selectedInquiry.location || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Estimated Area</span>
                  <span className="font-semibold text-amber-700">{selectedInquiry.estimatedArea || 'Unspecified'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Target Timeline</span>
                  <span className="font-semibold text-slate-800">{selectedInquiry.timeline || 'Flexible'}</span>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Client Requirements / Message:
                </label>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {selectedInquiry.message || 'No additional note provided.'}
                </div>
              </div>

              {/* Status Selector */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Lead Status:
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['New', 'In Review', 'Contacted', 'Quoted', 'Archived'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(selectedInquiry.id, st)}
                      className={`px-3 py-1 rounded text-xs font-semibold border transition-colors ${
                        selectedInquiry.status === st
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Engineer internal notes */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Internal Engineering Notes:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Sent preliminary BOQ on Sept 10. Waiting for architectural drawings."
                    value={engineerNote}
                    onChange={(e) => setEngineerNote(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 focus:bg-white focus:outline-none"
                  />
                  <button
                    onClick={handleSaveNotes}
                    className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-3 py-1.5 rounded"
                  >
                    Save Note
                  </button>
                </div>
              </div>

            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100 mt-5">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 rounded bg-slate-900 text-white text-xs font-bold"
              >
                Close View
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
