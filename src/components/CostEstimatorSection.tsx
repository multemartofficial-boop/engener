import React, { useState, useMemo } from 'react';
import { Calculator, Zap, ArrowRight, CheckCircle, Info, ShieldCheck } from 'lucide-react';

interface CostEstimatorProps {
  onApplyToInquiry?: (data: { area: string; projectType: string; specs: string }) => void;
}

export const CostEstimatorSection: React.FC<CostEstimatorProps> = ({ onApplyToInquiry }) => {
  const [buildingType, setBuildingType] = useState<'warehouse' | 'factory' | 'agro' | 'multistory'>('warehouse');
  const [areaSqFt, setAreaSqFt] = useState<number>(35000);
  const [eaveHeight, setEaveHeight] = useState<number>(25);
  const [craneCapacity, setCraneCapacity] = useState<'none' | '5ton' | '10ton' | '20ton'>('none');
  const [sheetingType, setSheetingType] = useState<'single' | 'insulated'>('single');

  // Realistic Bangladesh Steel Market Estimation Factors (approx. 2024-2026 rates)
  const estimates = useMemo(() => {
    // Steel weight in kg per sq ft
    let baseKgPerSqFt = 16.5; // for warehouse ~16-18 kg/sqft
    if (buildingType === 'factory') baseKgPerSqFt = 21.0;
    if (buildingType === 'agro') baseKgPerSqFt = 18.0;
    if (buildingType === 'multistory') baseKgPerSqFt = 32.0;

    // Height multiplier
    if (eaveHeight > 25) baseKgPerSqFt += (eaveHeight - 25) * 0.4;

    // Crane multiplier
    if (craneCapacity === '5ton') baseKgPerSqFt += 3.5;
    if (craneCapacity === '10ton') baseKgPerSqFt += 5.5;
    if (craneCapacity === '20ton') baseKgPerSqFt += 8.5;

    const totalWeightKg = areaSqFt * baseKgPerSqFt;
    const totalTons = Math.round(totalWeightKg / 1000);

    // Cost per sq ft in BDT
    // Pre-Engineered Steel Superstructure supply & erection usually ranges 420 - 750 BDT/sqft depending on spec
    let costPerSqFt = 480;
    if (buildingType === 'factory') costPerSqFt = 620;
    if (buildingType === 'agro') costPerSqFt = 580;
    if (buildingType === 'multistory') costPerSqFt = 890;

    if (eaveHeight > 25) costPerSqFt += (eaveHeight - 25) * 12;
    if (craneCapacity !== 'none') costPerSqFt += 95;
    if (sheetingType === 'insulated') costPerSqFt += 180; // PU sandwich panel premium

    const totalCostMin = Math.round((costPerSqFt * 0.92 * areaSqFt) / 100000); // in Lakh BDT
    const totalCostMax = Math.round((costPerSqFt * 1.08 * areaSqFt) / 100000);

    // Estimated months
    let months = 2.5;
    if (areaSqFt > 50000) months = 3.5;
    if (areaSqFt > 100000) months = 4.5;
    if (areaSqFt > 150000) months = 6.0;

    return {
      tons: totalTons,
      costRangeLakh: `${totalCostMin} - ${totalCostMax}`,
      costRangeCrore: `${(totalCostMin / 100).toFixed(2)} - ${(totalCostMax / 100).toFixed(2)}`,
      timelineMonths: months,
      ratePerSqFt: costPerSqFt
    };
  }, [buildingType, areaSqFt, eaveHeight, craneCapacity, sheetingType]);

  const handleApply = () => {
    const specsString = `${buildingType.toUpperCase()} Steel Building: ${areaSqFt.toLocaleString()} sq.ft, ${eaveHeight}ft eave height, Crane: ${craneCapacity}, Sheeting: ${sheetingType === 'insulated' ? '50mm PU Insulated' : '0.50mm Galvalume'}. Estimated steel: ~${estimates.tons} Tons.`;
    
    if (onApplyToInquiry) {
      onApplyToInquiry({
        area: `${areaSqFt.toLocaleString()} Sq. Ft.`,
        projectType: buildingType === 'warehouse' ? 'Warehouse & Logistics Hub' : buildingType === 'factory' ? 'Industrial Manufacturing Plant' : buildingType === 'agro' ? 'Agro & Cold Storage' : 'Commercial Multi-Story',
        specs: specsString
      });
    }

    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="estimator" className="py-12 sm:py-24 bg-slate-50 text-slate-900 border-b border-slate-200 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-2.5 sm:mb-3">
            <Calculator className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive Engineering Tool</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Steel Building Quick Cost & Tonnage Estimator
          </h2>
          <p className="mt-2 text-xs sm:text-base text-slate-600 leading-relaxed">
            Obtain immediate ballpark estimates for structural steel tonnage, fabrication timeline, and preliminary budget tailored for industrial projects in Bangladesh.
          </p>
        </div>

        {/* Estimator Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Controls Form (Left) */}
          <div className="lg:col-span-7 bg-white p-4 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-5 sm:space-y-6">
            
            {/* Building Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 sm:mb-2.5">
                1. Project / Building Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'warehouse', label: 'Warehouse / Depot' },
                  { id: 'factory', label: 'Factory / Plant' },
                  { id: 'agro', label: 'Agro / Cold Shed' },
                  { id: 'multistory', label: 'Multi-Story Steel' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setBuildingType(item.id as any)}
                    className={`py-2.5 px-2 rounded-lg text-[11px] sm:text-xs font-semibold border transition-all text-center min-h-[44px] flex items-center justify-center ${
                      buildingType === item.id
                        ? 'bg-amber-600 text-white border-amber-600 font-semibold shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Covered Floor Area Slider with Mobile Quick Presets */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  2. Covered Floor Area (Sq. Ft.)
                </label>
                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
                  <input
                    type="number"
                    min="5000"
                    max="500000"
                    step="1000"
                    value={areaSqFt}
                    onChange={(e) => setAreaSqFt(Number(e.target.value))}
                    className="w-20 sm:w-24 text-right bg-transparent text-amber-700 font-bold text-xs sm:text-sm focus:outline-none"
                  />
                  <span className="text-[11px] sm:text-xs text-slate-500">Sq. Ft.</span>
                </div>
              </div>

              {/* Mobile Quick Presets */}
              <div className="flex items-center gap-1.5 mb-2.5 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0 mr-1">Presets:</span>
                {[20000, 50000, 80000, 120000, 180000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAreaSqFt(preset)}
                    className={`text-[10px] font-semibold px-2 py-1 rounded border transition-colors shrink-0 ${
                      areaSqFt === preset
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {(preset / 1000)}k sft
                  </button>
                ))}
              </div>

              <input
                type="range"
                min="10000"
                max="200000"
                step="5000"
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
              <div className="flex justify-between text-[10px] sm:text-[11px] text-slate-400 mt-1">
                <span>10k</span>
                <span>75k</span>
                <span>150k</span>
                <span>200k+</span>
              </div>
            </div>

            {/* Clear Eave Height (2 cols on mobile, 4 on desktop) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                3. Clear Internal Eave Height
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { height: 20, label: '20 Ft (Standard)' },
                  { height: 25, label: '25 Ft (Medium)' },
                  { height: 30, label: '30 Ft (High-Bay)' },
                  { height: 38, label: '38 Ft (Heavy Tonnage)' },
                ].map((item) => (
                  <button
                    key={item.height}
                    type="button"
                    onClick={() => setEaveHeight(item.height)}
                    className={`p-2.5 rounded-lg text-xs font-semibold border transition-all text-center min-h-[44px] flex items-center justify-center ${
                      eaveHeight === item.height
                        ? 'bg-amber-600 text-white border-amber-600 font-semibold shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Overhead Crane & Sheeting */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 sm:mb-2">
                  4. Overhead Traveling Crane
                </label>
                <select
                  value={craneCapacity}
                  onChange={(e) => setCraneCapacity(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg p-3 min-h-[44px] focus:border-amber-500 focus:outline-none"
                >
                  <option value="none">No Overhead Crane Required</option>
                  <option value="5ton">5-Ton Traveling Crane</option>
                  <option value="10ton">10-Ton Heavy Crane</option>
                  <option value="20ton">20-Ton Heavy Industrial Crane</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 sm:mb-2">
                  5. Roof & Wall Cladding
                </label>
                <select
                  value={sheetingType}
                  onChange={(e) => setSheetingType(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg p-3 min-h-[44px] focus:border-amber-500 focus:outline-none"
                >
                  <option value="single">Single Skin 0.50mm Galvalume Color</option>
                  <option value="insulated">50mm PU/PIR Insulated Sandwich Panel</option>
                </select>
              </div>
            </div>

          </div>

          {/* Results Summary Card (Right) */}
          <div className="lg:col-span-5 bg-white p-5 sm:p-8 rounded-xl border border-amber-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-200 mb-4 sm:mb-6">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-700 block">
                    Preliminary Calculation
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                    Project Estimate Summary
                  </h3>
                </div>
                <div className="p-2 rounded-lg bg-amber-50 text-amber-600 border border-amber-200">
                  <Zap className="w-5 h-5" />
                </div>
              </div>

              {/* Estimate Highlights */}
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                
                <div className="bg-amber-50/50 p-3 sm:p-3.5 rounded-lg border border-amber-100">
                  <span className="text-[10px] sm:text-[11px] text-slate-600 uppercase tracking-wider block font-medium">
                    Estimated Structural Steel Weight
                  </span>
                  <div className="text-xl sm:text-2xl font-extrabold text-amber-700 font-display mt-0.5">
                    ~{estimates.tons} Metric Tons
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1">
                    Based on ASTM A572 Grade 50 primary built-up steel & cold-formed Z purlins.
                  </p>
                </div>

                <div className="bg-slate-50 p-3 sm:p-3.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] sm:text-[11px] text-slate-600 uppercase tracking-wider block font-medium">
                    Approximate Budget (Superstructure)
                  </span>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display mt-0.5">
                    BDT {estimates.costRangeCrore} Crore
                  </div>
                  <span className="text-[11px] sm:text-xs text-amber-800 font-medium">
                    (Approx. {estimates.costRangeLakh} Lakh BDT @ ৳{estimates.ratePerSqFt}/sq.ft.)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  <div className="bg-slate-50 p-2.5 sm:p-3 rounded-lg border border-slate-200">
                    <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
                      Fab & Erection Time
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      ~{estimates.timelineMonths} Months
                    </span>
                  </div>
                  <div className="bg-slate-50 p-2.5 sm:p-3 rounded-lg border border-slate-200">
                    <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
                      Building Code
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-700">
                      BNBC 2020
                    </span>
                  </div>
                </div>

              </div>

              <div className="text-[10px] sm:text-[11px] text-slate-500 flex items-start gap-1.5 mb-5 sm:mb-6">
                <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Exact cost depends on soil boring SPT values, wind speed zone, and architectural accessories. Submit your site location for a customized BOQ.
                </span>
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={handleApply}
              id="apply-estimator-to-inquiry-btn"
              className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3.5 px-4 rounded-lg uppercase tracking-wider text-xs shadow-xs hover:shadow transition-all min-h-[46px] active:scale-98"
            >
              <span>Request Detailed BOQ Based on This</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
