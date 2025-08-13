import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Rocket,
  BookOpenText,
  LineChart,
  Sparkles,
  ShieldCheck,
  Users,
  Stars,
  Gauge,
  Workflow,
  CalendarCheck2,
  Trophy,
  Lightbulb,
  PenTool
} from "lucide-react";

const Home = ({ darkMode }) => {
  // Parallax lights in hero
  const { scrollYProgress } = useScroll();
  const yHeroBlob1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yHeroBlob2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotateHero = useTransform(scrollYProgress, [0, 1], [0, 12]);

  const baseCard =
    "rounded-2xl border shadow-xl backdrop-blur-md transition-all duration-300";

  const darkCard = "bg-gradient-to-br from-black/60 via-white/5 to-black/40 border-gray-800/40";
  const lightCard = "bg-white/90 border-gray-200";

  const gradientBtnDark = "bg-gradient-to-tr from-indigo-600 via-indigo-500 to-pink-500 text-white";
  const gradientBtnLight = "bg-gradient-to-tr from-indigo-500 to-pink-500 text-white";

  return (
    <div
      className={`min-h-screen w-full overflow-x-hidden ${
        darkMode
          ? "bg-gradient-to-b from-[#050406] via-[#07070a] to-[#0b0b0f] text-gray-200"
          : "bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-900"
      }`}
    >
      {/* ===== HERO ===== */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-6 md:px-10">
        {/* Floating gradient lights */}
        <motion.div
          style={{ y: yHeroBlob1, rotate: rotateHero }}
          className="pointer-events-none absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full blur-3xl"
          aria-hidden
          style={{
            y: yHeroBlob1,
            rotate: rotateHero,
            background: darkMode
              ? "radial-gradient(circle, rgba(99,102,241,0.30), transparent 60%)"
              : "radial-gradient(circle, rgba(79,70,229,0.25), transparent 60%)",
          }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -right-24 h-[520px] w-[520px] rounded-full blur-3xl"
          style={{
            y: yHeroBlob2,
            rotate: rotateHero,
            background: darkMode
              ? "radial-gradient(circle, rgba(236,72,153,0.25), transparent 60%)"
              : "radial-gradient(circle, rgba(219,39,119,0.22), transparent 60%)",
          }}
        />

        <div
          className={`relative z-10 mx-auto w-full max-w-6xl ${
            darkMode ? darkCard : lightCard
          } ${baseCard} p-8 md:p-14`}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1 text-sm"
            >
              <Sparkles className="h-4 w-4" />
              Crafted for your learning journey
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight"
            >
              Track. Reflect.{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
                Grow
              </span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mx-auto mt-4 max-w-3xl text-base md:text-lg leading-relaxed"
            >
              DevTrail is your luxury developer diary—document learnings, analyze challenges, and build a public or private timeline of growth. A place where progress feels beautiful.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              <Link to="/entryform">
                <motion.button
                  whileHover={{ scale: 1.06, boxShadow: "0 0 24px rgba(99,102,241,0.8)" }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative overflow-hidden px-7 py-3 rounded-2xl font-semibold text-lg ${
                    darkMode ? gradientBtnDark : gradientBtnLight
                  }`}
                >
                  <span className="relative z-10 inline-flex items-center gap-2">
                    <Rocket className="h-5 w-5" /> Start Writing
                  </span>
                  <motion.span
                    className="absolute inset-0 bg-white/10"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>
              </Link>

              <Link to="/community">
                <motion.button
                  whileHover={{ scale: 1.06, boxShadow: "0 0 24px rgba(239,68,68,0.8)" }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-7 py-3 rounded-2xl font-semibold text-lg border-2 ${
                    darkMode
                      ? "border-red-500 text-red-400 hover:bg-red-500/10"
                      : "border-red-500 text-red-600 hover:bg-red-50"
                  }`}
                >
                  Explore Community
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 md:px-10 py-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-20 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold"
            >
              Everything you need to journal like a pro
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mt-2 text-base md:text-lg opacity-90"
            >
              Beautiful, fast, and thoughtfully designed tools that keep you consistent.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <BookOpenText className="h-6 w-6" />, title: "Daily Developer Diary", desc: "Capture learnings, wins, and blockers in a clean, flowing editor with AI-assist." },
              { icon: <LineChart className="h-6 w-6" />, title: "Contribution Graph", desc: "Visualize streaks and momentum over time—stay accountable and inspired." },
              { icon: <ShieldCheck className="h-6 w-6" />, title: "Private or Public", desc: "Keep entries just for you or share highlights with the world—your choice." },
              { icon: <Workflow className="h-6 w-6" />, title: "AI Summaries", desc: "Turn rough notes into concise explanations or step-by-step solutions." },
              { icon: <CalendarCheck2 className="h-6 w-6" />, title: "Daily Prompts", desc: "Gentle nudges and ideas to help you reflect and write consistently." },
              { icon: <Gauge className="h-6 w-6" />, title: "Performance", desc: "Built with modern tooling for speed—snappy UI and buttery animations." },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className={`${baseCard} ${darkMode ? darkCard : lightCard} p-6`}
              >
                <div className="mb-3 inline-flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 text-white">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold mb-1">{f.title}</h3>
                <p className="text-sm opacity-90">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BAKI Sections same structure mein optimized kar diye */}
      {/* ... */}
    </div>
  );
};

export default Home;