import React from 'react';
import { CASCADE_STAGES } from '../data/lakeData';
import { GitFork, ArrowDown } from 'lucide-react';

export const CascadeDisasterModel: React.FC = () => {
  return (
    <div
      id="cascade-disaster-multi-stage-analysis"
      className="bg-[#181b25] p-6 rounded-xl border border-[#262a34] shadow-md space-y-4"
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <GitFork size={20} className="text-[#00e5ff]" />
          <h2 className="text-lg md:text-xl font-bold text-[#dfe2ef] tracking-tight">
            Cascade Disaster Multi-Stage Analysis
          </h2>
        </div>
        <p className="text-xs md:text-sm text-[#bac9cc]">
          Dynamic cascading hazard simulation for Lake South Lhonak outburst propagation.
        </p>
      </div>

      {/* Sequential Visual Flow */}
      <div className="space-y-2">
        {CASCADE_STAGES.map((stage, idx) => {
          const isLast = idx === CASCADE_STAGES.length - 1;

          let numBg = 'bg-[#262a34] text-[#00e5ff]';
          let probColor = 'text-[#00e5ff]';
          let cardBorder = 'border-[#262a34] hover:border-[#3b494c]';

          if (stage.status === 'critical') {
            numBg = isLast ? 'bg-[#ffb4ab] text-[#690005]' : 'bg-[#93000a] text-[#ffdad6]';
            probColor = 'text-[#ffb4ab]';
            if (isLast) {
              cardBorder = 'border-[#ffb4ab] ring-1 ring-[#ffb4ab]/50 bg-[#1c1f29]/90';
            }
          } else if (stage.status === 'high') {
            numBg = 'bg-[#00374d] text-[#7bd0ff]';
            probColor = 'text-[#7bd0ff]';
          }

          return (
            <React.Fragment key={stage.step}>
              <div
                className={`p-3.5 bg-[#1c1f29] rounded-lg border flex items-center justify-between gap-3 transition-colors ${cardBorder}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-['JetBrains_Mono'] text-xs font-bold ${numBg}`}
                  >
                    {stage.step}
                  </span>
                  <div>
                    <div
                      className={`text-sm font-semibold ${
                        isLast ? 'text-[#ffb4ab]' : 'text-[#dfe2ef]'
                      }`}
                    >
                      {stage.title}
                    </div>
                    <div className="text-xs text-[#bac9cc] mt-0.5">
                      {stage.description}
                    </div>
                  </div>
                </div>

                <div className="text-right whitespace-nowrap">
                  <span
                    className={`font-['JetBrains_Mono'] text-xs font-bold uppercase block ${probColor}`}
                  >
                    {stage.probability}
                  </span>
                  <span
                    className={`font-['JetBrains_Mono'] text-[10px] ${
                      isLast ? 'text-[#ffb4ab] font-semibold' : 'text-[#bac9cc]'
                    }`}
                  >
                    {stage.timeframe}
                  </span>
                </div>
              </div>

              {!isLast && (
                <div className="flex justify-center -my-1 text-[#00e5ff]/70">
                  <ArrowDown size={16} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
