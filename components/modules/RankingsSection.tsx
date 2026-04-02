"use client";

import { motion } from "framer-motion";
import { Trophy, Star, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/src/context/LanguageContext";

interface Ranking {
  pos: number;
  team: string;
  points: number;
  last5: string[]; // ['W', 'D', 'L']
}

interface SportsTable {
  id: string;
  competition: string;
  category: string;
  rankings: Ranking[];
}

const MOCK_RANKINGS: SportsTable[] = [
  {
    id: "liga-portugal",
    competition: "Liga Portugal",
    category: "Football",
    rankings: [
      { pos: 1, team: "Sporting CP", points: 82, last5: ['W', 'W', 'W', 'W', 'D'] },
      { pos: 2, team: "SL Benfica", points: 76, last5: ['W', 'L', 'W', 'W', 'W'] },
      { pos: 3, team: "FC Porto", points: 68, last5: ['D', 'W', 'L', 'W', 'W'] },
    ]
  },
  {
    id: "f1-wdc",
    competition: "F1 World Standings",
    category: "Motorsport",
    rankings: [
      { pos: 1, team: "Max Verstappen (RBR)", points: 258, last5: ['W', 'W', 'W', 'W', 'L'] },
      { pos: 2, team: "Lando Norris (MCL)", points: 199, last5: ['W', 'D', 'W', 'W', 'D'] },
      { pos: 3, team: "Charles Leclerc (FER)", points: 177, last5: ['W', 'L', 'D', 'W', 'W'] },
    ]
  },
  {
    id: "nba-east",
    competition: "NBA East Conference",
    category: "Bouncing & Action",
    rankings: [
      { pos: 1, team: "Boston Celtics", points: 64, last5: ['W', 'W', 'W', 'W', 'W'] }, // Wins
      { pos: 2, team: "NY Knicks", points: 50, last5: ['W', 'W', 'L', 'W', 'W'] },
      { pos: 3, team: "Milwaukee Bucks", points: 49, last5: ['L', 'L', 'L', 'W', 'W'] },
    ]
  },
  {
    id: "poker-world",
    competition: "GPI World Poker Index",
    category: "Mind Sports",
    rankings: [
      { pos: 1, team: "Bin Weng", points: 4200, last5: ['W', 'W', 'W', 'W', 'W'] }, // Points
      { pos: 2, team: "Nacho Barbero", points: 3850, last5: ['W', 'L', 'W', 'W', 'W'] },
      { pos: 3, team: "Adrian Mateos", points: 3700, last5: ['W', 'W', 'D', 'W', 'W'] },
    ]
  }
];

export function RankingsSection() {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 px-6 md:px-12 bg-black border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
        >
          <div className="max-w-2xl">
            <span className="text-[#FF8C00] font-bold tracking-[0.2em] uppercase text-sm mb-4 block">World Rankings</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.blog.rankings.title}
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              {t.blog.rankings.desc}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {MOCK_RANKINGS.map((table, idx) => (
            <motion.div
              key={table.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-3xl p-6 md:p-8 hover:border-[#FF8C00]/30 transition-all duration-500 group"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF8C00]/10 flex items-center justify-center text-[#FF8C00] group-hover:scale-110 transition-transform">
                    <Trophy size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{table.competition}</h3>
                    <span className="text-xs text-zinc-500 uppercase tracking-widest">{table.category}</span>
                  </div>
                </div>
                <button className="text-[#FF8C00] hover:translate-x-1 transition-transform">
                  <ChevronRight size={24} />
                </button>
              </div>

              <div className="space-y-4">
                {table.rankings.map((team) => (
                  <div 
                    key={team.pos}
                    className="flex items-center justify-between py-4 border-b border-white/5 last:border-0 group/item"
                  >
                    <div className="flex items-center gap-6">
                      <span className={cn(
                        "text-lg font-bold w-6",
                        team.pos === 1 ? "text-[#FF8C00]" : "text-zinc-500"
                      )}>
                        {team.pos}
                      </span>
                      <span className="text-white font-medium group-hover/item:text-[#FF8C00] transition-colors">
                        {team.team}
                      </span>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="hidden md:flex gap-1.5">
                        {team.last5.map((res, i) => (
                          <div 
                            key={i}
                            className={cn(
                              "w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold",
                              res === 'W' ? "bg-green-500/20 text-green-500" :
                              res === 'L' ? "bg-red-500/20 text-red-500" :
                              "bg-zinc-500/20 text-zinc-500"
                            )}
                          >
                            {res}
                          </div>
                        ))}
                      </div>
                      <span className="text-[#FF8C00] font-black text-lg">
                        {team.points}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
