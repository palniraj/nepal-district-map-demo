import { useState } from "react";
import {
  NepalMap,
  NepalMapLegend,
  createMultiColorScale,
  getDataStats,
  getProvinceSummary,
  type Province,
  type DistrictDataMap,
} from "nepal-district-map";

/* ─── Demo data ─── */

const populationData: DistrictDataMap = {
  Kathmandu: { value: 2017532, tooltip: "Population: 20.17 Lakh" },
  Morang: { value: 965370, tooltip: "Population: 9.65 Lakh" },
  Rupandehi: { value: 880196, tooltip: "Population: 8.80 Lakh" },
  Jhapa: { value: 812650, tooltip: "Population: 8.13 Lakh" },
  Sunsari: { value: 763487, tooltip: "Population: 7.63 Lakh" },
  Kailali: { value: 775709, tooltip: "Population: 7.76 Lakh" },
  Kaski: { value: 492098, tooltip: "Population: 4.92 Lakh" },
  Chitawan: { value: 579984, tooltip: "Population: 5.80 Lakh" },
  Bara: { value: 687708, tooltip: "Population: 6.88 Lakh" },
  Parsa: { value: 601017, tooltip: "Population: 6.01 Lakh" },
  Banke: { value: 491313, tooltip: "Population: 4.91 Lakh" },
  Dang: { value: 548141, tooltip: "Population: 5.48 Lakh" },
  Lalitpur: { value: 468132, tooltip: "Population: 4.68 Lakh" },
  Dhanusha: { value: 754777, tooltip: "Population: 7.55 Lakh" },
  Sarlahi: { value: 769729, tooltip: "Population: 7.70 Lakh" },
  Rautahat: { value: 686722, tooltip: "Population: 6.87 Lakh" },
  Siraha: { value: 637328, tooltip: "Population: 6.37 Lakh" },
  Saptari: { value: 639284, tooltip: "Population: 6.39 Lakh" },
  Mahottari: { value: 627580, tooltip: "Population: 6.28 Lakh" },
  Makwanpur: { value: 420477, tooltip: "Population: 4.20 Lakh" },
  Kapilbastu: { value: 571936, tooltip: "Population: 5.72 Lakh" },
  Kanchanpur: { value: 451248, tooltip: "Population: 4.51 Lakh" },
  Udayapur: { value: 317532, tooltip: "Population: 3.18 Lakh" },
  Ilam: { value: 290254, tooltip: "Population: 2.90 Lakh" },
  Gorkha: { value: 271061, tooltip: "Population: 2.71 Lakh" },
  Tanahu: { value: 323288, tooltip: "Population: 3.23 Lakh" },
  Palpa: { value: 261389, tooltip: "Population: 2.61 Lakh" },
  Surkhet: { value: 350804, tooltip: "Population: 3.51 Lakh" },
  Bardiya: { value: 426576, tooltip: "Population: 4.27 Lakh" },
  Bhaktapur: { value: 304651, tooltip: "Population: 3.05 Lakh" },
  Nuwakot: { value: 277471, tooltip: "Population: 2.77 Lakh" },
  Kavrepalanchok: { value: 381937, tooltip: "Population: 3.82 Lakh" },
  Sindhupalchok: { value: 287798, tooltip: "Population: 2.88 Lakh" },
  Dhading: { value: 336067, tooltip: "Population: 3.36 Lakh" },
  Sindhuli: { value: 296192, tooltip: "Population: 2.96 Lakh" },
  Ramechhap: { value: 202646, tooltip: "Population: 2.03 Lakh" },
  Dolakha: { value: 186557, tooltip: "Population: 1.87 Lakh" },
  Solukhumbu: { value: 105886, tooltip: "Population: 1.06 Lakh" },
  Okhaldhunga: { value: 147984, tooltip: "Population: 1.48 Lakh" },
  Khotang: { value: 206312, tooltip: "Population: 2.06 Lakh" },
  Bhojpur: { value: 182459, tooltip: "Population: 1.82 Lakh" },
  Dhankuta: { value: 163412, tooltip: "Population: 1.63 Lakh" },
  Tehrathum: { value: 101577, tooltip: "Population: 1.02 Lakh" },
  Sankhuwasabha: { value: 158742, tooltip: "Population: 1.59 Lakh" },
  Taplejung: { value: 127461, tooltip: "Population: 1.27 Lakh" },
  Panchthar: { value: 191817, tooltip: "Population: 1.92 Lakh" },
  Rolpa: { value: 224506, tooltip: "Population: 2.25 Lakh" },
  Rukum: { value: 188005, tooltip: "Population: 1.88 Lakh" },
  Pyuthan: { value: 228102, tooltip: "Population: 2.28 Lakh" },
  Gulmi: { value: 280160, tooltip: "Population: 2.80 Lakh" },
  Arghakhanchi: { value: 197632, tooltip: "Population: 1.98 Lakh" },
  Syangja: { value: 289148, tooltip: "Population: 2.89 Lakh" },
  Parbat: { value: 146590, tooltip: "Population: 1.47 Lakh" },
  Baglung: { value: 268613, tooltip: "Population: 2.69 Lakh" },
  Myagdi: { value: 113641, tooltip: "Population: 1.14 Lakh" },
  Mustang: { value: 13452, tooltip: "Population: 0.13 Lakh" },
  Manang: { value: 6538, tooltip: "Population: 0.07 Lakh" },
  Lamjung: { value: 167724, tooltip: "Population: 1.68 Lakh" },
  Nawalparasi: { value: 328764, tooltip: "Population: 3.29 Lakh" },
  "Nawalparasi East": { value: 316961, tooltip: "Population: 3.17 Lakh" },
  Dolpa: { value: 36700, tooltip: "Population: 0.37 Lakh" },
  Jumla: { value: 89427, tooltip: "Population: 0.89 Lakh" },
  Kalikot: { value: 105580, tooltip: "Population: 1.06 Lakh" },
  Mugu: { value: 55286, tooltip: "Population: 0.55 Lakh" },
  Humla: { value: 50858, tooltip: "Population: 0.51 Lakh" },
  Dailekh: { value: 261770, tooltip: "Population: 2.62 Lakh" },
  Jajarkot: { value: 171304, tooltip: "Population: 1.71 Lakh" },
  Salyan: { value: 242444, tooltip: "Population: 2.42 Lakh" },
  "Rukum West": { value: 154272, tooltip: "Population: 1.54 Lakh" },
  Bajura: { value: 134912, tooltip: "Population: 1.35 Lakh" },
  Bajhang: { value: 195159, tooltip: "Population: 1.95 Lakh" },
  Darchula: { value: 133274, tooltip: "Population: 1.33 Lakh" },
  Baitadi: { value: 250898, tooltip: "Population: 2.51 Lakh" },
  Dadeldhura: { value: 142094, tooltip: "Population: 1.42 Lakh" },
  Doti: { value: 211746, tooltip: "Population: 2.12 Lakh" },
  Achham: { value: 257477, tooltip: "Population: 2.57 Lakh" },
};

const coverageData: DistrictDataMap = {
  Udayapur: { color: "#FFD600", tooltip: "📍 Distributor Hub" },
  Okhaldhunga: { color: "#60a5fa", tooltip: "✓ Covered by Udayapur" },
  Solukhumbu: { color: "#60a5fa", tooltip: "✓ Covered by Udayapur" },
  Khotang: { color: "#60a5fa", tooltip: "✓ Covered by Udayapur" },
  Bhojpur: { color: "#60a5fa", tooltip: "✓ Covered by Udayapur" },
  Sunsari: { color: "#FFD600", tooltip: "📍 Distributor Hub" },
  Dhankuta: { color: "#60a5fa", tooltip: "✓ Covered by Sunsari" },
  Morang: { color: "#FFD600", tooltip: "📍 Distributor Hub" },
  Tehrathum: { color: "#60a5fa", tooltip: "✓ Covered by Morang" },
  Sankhuwasabha: { color: "#60a5fa", tooltip: "✓ Covered by Morang" },
  Jhapa: { color: "#FFD600", tooltip: "📍 Distributor Hub" },
  Ilam: { color: "#60a5fa", tooltip: "✓ Covered by Jhapa" },
  Panchthar: { color: "#60a5fa", tooltip: "✓ Covered by Jhapa" },
  Taplejung: { color: "#60a5fa", tooltip: "✓ Covered by Jhapa" },
  Parsa: { color: "#FFD600", tooltip: "📍 Distributor Hub" },
  Bara: { color: "#FFD600", tooltip: "📍 Distributor Hub" },
  Sarlahi: { color: "#FFD600", tooltip: "📍 Distributor Hub" },
  Rautahat: { color: "#60a5fa", tooltip: "✓ Covered by Sarlahi" },
  Mahottari: { color: "#60a5fa", tooltip: "✓ Covered by Sarlahi" },
  Siraha: { color: "#FFD600", tooltip: "📍 Distributor Hub" },
  Saptari: { color: "#60a5fa", tooltip: "✓ Covered by Siraha" },
  Dhanusha: { color: "#60a5fa", tooltip: "✓ Covered by Siraha" },
  Kathmandu: { color: "#FFD600", tooltip: "📍 Main Distributor Hub" },
  Lalitpur: { color: "#60a5fa", tooltip: "✓ Covered by Kathmandu" },
  Bhaktapur: { color: "#60a5fa", tooltip: "✓ Covered by Kathmandu" },
  Dhading: { color: "#60a5fa", tooltip: "✓ Covered by Kathmandu" },
  Sindhupalchok: { color: "#60a5fa", tooltip: "✓ Covered by Kathmandu" },
  Kavrepalanchok: { color: "#60a5fa", tooltip: "✓ Covered by Kathmandu" },
  Ramechhap: { color: "#60a5fa", tooltip: "✓ Covered by Kathmandu" },
  Sindhuli: { color: "#60a5fa", tooltip: "✓ Covered by Kathmandu" },
  Dolakha: { color: "#60a5fa", tooltip: "✓ Covered by Kathmandu" },
  Nuwakot: { color: "#FFD600", tooltip: "📍 Distributor Hub" },
  Rasuwa: { color: "#60a5fa", tooltip: "✓ Covered by Nuwakot" },
  Makwanpur: { color: "#FFD600", tooltip: "📍 Distributor Hub" },
  Chitawan: { color: "#FFD600", tooltip: "📍 Distributor Hub" },
  Kaski: { color: "#FFD600", tooltip: "📍 Distributor Hub" },
  Baglung: { color: "#60a5fa", tooltip: "✓ Covered by Kaski" },
  Parbat: { color: "#60a5fa", tooltip: "✓ Covered by Kaski" },
  Myagdi: { color: "#60a5fa", tooltip: "✓ Covered by Kaski" },
  Mustang: { color: "#60a5fa", tooltip: "✓ Covered by Kaski" },
  Syangja: { color: "#60a5fa", tooltip: "✓ Covered by Kaski" },
  Tanahu: { color: "#FFD600", tooltip: "📍 Distributor Hub" },
  Lamjung: { color: "#60a5fa", tooltip: "✓ Covered by Tanahu" },
  Gorkha: { color: "#60a5fa", tooltip: "✓ Covered by Tanahu" },
  Manang: { color: "#60a5fa", tooltip: "✓ Covered by Tanahu" },
  Rupandehi: { color: "#FFD600", tooltip: "📍 Distributor Hub" },
  Palpa: { color: "#60a5fa", tooltip: "✓ Covered by Rupandehi" },
  Arghakhanchi: { color: "#60a5fa", tooltip: "✓ Covered by Rupandehi" },
  Kapilbastu: { color: "#60a5fa", tooltip: "✓ Covered by Rupandehi" },
  Gulmi: { color: "#60a5fa", tooltip: "✓ Covered by Rupandehi" },
  Pyuthan: { color: "#60a5fa", tooltip: "✓ Covered by Rupandehi" },
  Dang: { color: "#60a5fa", tooltip: "✓ Covered by Rupandehi" },
  Rolpa: { color: "#60a5fa", tooltip: "✓ Covered by Rupandehi" },
  Rukum: { color: "#60a5fa", tooltip: "✓ Covered by Rupandehi" },
  Nawalparasi: { color: "#FFD600", tooltip: "📍 Distributor Hub" },
  Banke: { color: "#FFD600", tooltip: "📍 Distributor Hub" },
  Bardiya: { color: "#60a5fa", tooltip: "✓ Covered by Banke" },
  Surkhet: { color: "#FFD600", tooltip: "📍 Distributor Hub" },
  Dailekh: { color: "#60a5fa", tooltip: "✓ Covered by Surkhet" },
  Jajarkot: { color: "#60a5fa", tooltip: "✓ Covered by Surkhet" },
  Salyan: { color: "#60a5fa", tooltip: "✓ Covered by Surkhet" },
  "Rukum West": { color: "#60a5fa", tooltip: "✓ Covered by Surkhet" },
  Kalikot: { color: "#60a5fa", tooltip: "✓ Covered by Surkhet" },
  Jumla: { color: "#60a5fa", tooltip: "✓ Covered by Surkhet" },
  Mugu: { color: "#60a5fa", tooltip: "✓ Covered by Surkhet" },
  Humla: { color: "#60a5fa", tooltip: "✓ Covered by Surkhet" },
  Dolpa: { color: "#60a5fa", tooltip: "✓ Covered by Surkhet" },
  Kailali: { color: "#FFD600", tooltip: "📍 Distributor Hub" },
  Kanchanpur: { color: "#60a5fa", tooltip: "✓ Covered by Kailali" },
  Dadeldhura: { color: "#60a5fa", tooltip: "✓ Covered by Kailali" },
  Doti: { color: "#60a5fa", tooltip: "✓ Covered by Kailali" },
  Achham: { color: "#60a5fa", tooltip: "✓ Covered by Kailali" },
  Baitadi: { color: "#60a5fa", tooltip: "✓ Covered by Kailali" },
  Bajhang: { color: "#60a5fa", tooltip: "✓ Covered by Kailali" },
  Bajura: { color: "#60a5fa", tooltip: "✓ Covered by Kailali" },
  Darchula: { color: "#60a5fa", tooltip: "✓ Covered by Kailali" },
};

/* ─── Tabs ─── */

type Tab = "province" | "heatmap" | "coverage";

export default function App() {
  const [tab, setTab] = useState<Tab>("province");
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [clickedDistrict, setClickedDistrict] = useState<string | null>(null);

  const stats = getDataStats(populationData);
  const heatmapScale = createMultiColorScale(stats.min, stats.max, [
    "#1e3a5f",
    "#0ea5e9",
    "#22c55e",
    "#eab308",
    "#dc2626",
  ]);

  const coverageSummary = getProvinceSummary(coverageData);
  const hubCount = Object.values(coverageData).filter(d => d.color === "#FFD600").length;
  const coveredCount = Object.keys(coverageData).length;

  return (
    <div style={{ minHeight: "100vh", background: "#0B1929", color: "#e2e8f0", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Header */}
      <header style={{ padding: "32px 24px 0", maxWidth: 1000, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0, color: "#fff" }}>
          nepal-district-map
        </h1>
        <p style={{ fontSize: 14, opacity: 0.5, marginTop: 4 }}>
          Interactive SVG map of Nepal — 77 districts, 7 provinces, zero dependencies
        </p>

        {/* Tab bar */}
        <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
          {([
            { id: "province" as Tab, label: "🗺️ Province View" },
            { id: "heatmap" as Tab, label: "🌡️ Population Heatmap" },
            { id: "coverage" as Tab, label: "📍 Coverage Map" },
          ]).map(t => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setSelectedProvince(null); setClickedDistrict(null); }}
              style={{
                padding: "10px 20px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                background: tab === t.id ? "#FFD600" : "rgba(255,255,255,0.08)",
                color: tab === t.id ? "#0B1929" : "#94a3b8",
                transition: "all 0.2s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <main style={{ maxWidth: 1000, margin: "0 auto", padding: "24px 24px 48px" }}>

        {/* ─── Province View ─── */}
        {tab === "province" && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <NepalMapLegend
                selectedProvince={selectedProvince}
                onProvinceClick={(p) => setSelectedProvince(selectedProvince === p ? null : p)}
                labelColor="#94a3b8"
                fontSize={13}
              />
            </div>

            <NepalMap
              selectedProvince={selectedProvince}
              onDistrictClick={(name) => setClickedDistrict(name)}
              backgroundColor="#0f172a"
              strokeColor="rgba(148,163,184,0.3)"
              style={{ borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)" }}
            />

            {clickedDistrict && (
              <div style={{
                marginTop: 16, padding: "12px 20px", background: "rgba(255,255,255,0.06)",
                borderRadius: 12, fontSize: 14, display: "inline-block",
              }}>
                Clicked: <strong style={{ color: "#FFD600" }}>{clickedDistrict}</strong>
              </div>
            )}
          </div>
        )}

        {/* ─── Heatmap ─── */}
        {tab === "heatmap" && (
          <div>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 16 }}>
              {[
                { label: "Districts", value: stats.count },
                { label: "Min", value: stats.min.toLocaleString() },
                { label: "Max", value: stats.max.toLocaleString() },
                { label: "Average", value: Math.round(stats.average).toLocaleString() },
              ].map(s => (
                <div key={s.label} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "10px 18px" }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>{s.value}</div>
                  <div style={{ fontSize: 11, opacity: 0.5 }}>{s.label}</div>
                </div>
              ))}
            </div>

            <NepalMap
              data={populationData}
              colorMode="data"
              colorScale={heatmapScale}
              baseColor="#1e293b"
              strokeColor="#334155"
              backgroundColor="#0f172a"
              labelColor="#e2e8f0"
              onDistrictClick={(name, data) => {
                setClickedDistrict(data?.tooltip ? `${name} — ${data.tooltip}` : name);
              }}
              style={{ borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)" }}
            />

            <div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
              <NepalMapLegend
                mode="custom"
                items={[
                  { color: "#1e3a5f", label: "< 1 Lakh" },
                  { color: "#0ea5e9", label: "1–3 Lakh" },
                  { color: "#22c55e", label: "3–5 Lakh" },
                  { color: "#eab308", label: "5–10 Lakh" },
                  { color: "#dc2626", label: "> 10 Lakh" },
                ]}
                labelColor="#94a3b8"
                swatchShape="square"
              />
            </div>

            {clickedDistrict && (
              <div style={{
                marginTop: 12, padding: "12px 20px", background: "rgba(255,255,255,0.06)",
                borderRadius: 12, fontSize: 14, display: "inline-block",
              }}>
                <strong style={{ color: "#FFD600" }}>{clickedDistrict}</strong>
              </div>
            )}
          </div>
        )}

        {/* ─── Coverage Map ─── */}
        {tab === "coverage" && (
          <div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
              <div style={{ background: "rgba(255,215,0,0.1)", borderRadius: 10, padding: "10px 18px" }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#FFD600" }}>{hubCount}</div>
                <div style={{ fontSize: 11, opacity: 0.5 }}>Distributor Hubs</div>
              </div>
              <div style={{ background: "rgba(96,165,250,0.1)", borderRadius: 10, padding: "10px 18px" }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#60a5fa" }}>{coveredCount}</div>
                <div style={{ fontSize: 11, opacity: 0.5 }}>Districts Covered</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "10px 18px" }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>7</div>
                <div style={{ fontSize: 11, opacity: 0.5 }}>Provinces</div>
              </div>
            </div>

            <NepalMap
              data={coverageData}
              colorMode="flat"
              baseColor="#1a2744"
              strokeColor="rgba(28,90,138,0.25)"
              backgroundColor="#0B2A4A"
              labelColor="rgba(255,255,255,0.85)"
              onDistrictClick={(name, data) => {
                setClickedDistrict(data?.tooltip ? `${name} — ${data.tooltip}` : name);
              }}
              style={{ borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)" }}
            />

            <div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
              <NepalMapLegend
                mode="custom"
                items={[
                  { color: "#FFD600", label: "Distributor Hub" },
                  { color: "#60a5fa", label: "Covered District" },
                  { color: "#1a2744", label: "Expansion Opportunity" },
                ]}
                labelColor="#94a3b8"
              />
            </div>

            {/* Province breakdown */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 20, justifyContent: "center" }}>
              {coverageSummary.map(s => (
                <div key={s.province} style={{
                  background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 14px",
                  textAlign: "center", minWidth: 100,
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color, margin: "0 auto 6px" }} />
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0" }}>{s.province}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#FFD600", marginTop: 2 }}>
                    {s.coveredDistricts}
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 400 }}>/{s.totalDistricts}</span>
                  </div>
                  <div style={{ fontSize: 10, opacity: 0.4, marginTop: 2 }}>districts</div>
                </div>
              ))}
            </div>

            {clickedDistrict && (
              <div style={{
                marginTop: 16, padding: "12px 20px", background: "rgba(255,255,255,0.06)",
                borderRadius: 12, fontSize: 14, display: "inline-block",
              }}>
                <strong style={{ color: "#FFD600" }}>{clickedDistrict}</strong>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "24px", opacity: 0.3, fontSize: 12 }}>
        nepal-district-map by Niraj Pal — MIT License
      </footer>
    </div>
  );
}
