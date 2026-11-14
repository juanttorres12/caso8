export function calculateSampling({ counts, margin = 0.05, z = 1.96 }) {
  const values = Object.values(counts).map(Number);
  if (values.some(v => !Number.isFinite(v) || v < 0)) throw new Error("Los conteos deben ser números no negativos.");
  const total = values.reduce((sum, value) => sum + value, 0);
  if (total <= 0) throw new Error("El total de observaciones debe ser mayor que cero.");
  if (!(margin > 0 && margin <= 0.5) || !(z > 0)) throw new Error("Revisa el margen y el valor Z.");
  const rework = Number(counts.rework);
  const p = rework / total;
  const halfWidth = z * Math.sqrt((p * (1 - p)) / total);
  const lower = Math.max(0, p - halfWidth);
  const upper = Math.min(1, p + halfWidth);
  const requiredTotal = Math.ceil((z ** 2 * p * (1 - p)) / (margin ** 2));
  return { total, rework, p, halfWidth, lower, upper, requiredTotal, additional: Math.max(0, requiredTotal - total) };
}

export function calculateErgonomics({ deskHeight = 720, instructionDistance = 450, elbowOffset = 20 }) {
  const profiles = [
    { percentile: "P5", elbow: 650, reach: 300 },
    { percentile: "P50", elbow: 710, reach: 360 },
    { percentile: "P95", elbow: 780, reach: 420 }
  ];
  return profiles.map(profile => {
    const targetHeight = profile.elbow - elbowOffset;
    return {
      ...profile,
      targetHeight,
      deskDifference: deskHeight - targetHeight,
      deskWithin: Math.abs(deskHeight - targetHeight) < 0.001,
      reachWithin: instructionDistance <= profile.reach
    };
  });
}

export function calculateMoment({ mass = 1.2, gravity = 9.81, distanceA = 0.45, distanceB = 0.25 }) {
  if ([mass, gravity, distanceA, distanceB].some(v => !Number.isFinite(Number(v)) || Number(v) < 0)) {
    throw new Error("Masa, gravedad y distancias deben ser valores no negativos.");
  }
  const force = mass * gravity;
  const momentA = force * distanceA;
  const momentB = force * distanceB;
  const reduction = momentA === 0 ? 0 : (1 - momentB / momentA) * 100;
  return { force, momentA, momentB, reduction };
}

const $ = id => document.getElementById(id);
const number = id => Number($(id).value);
const fmt = (value, digits = 2) => value.toLocaleString("es-MX", { minimumFractionDigits: digits, maximumFractionDigits: digits });
const pct = value => `${fmt(value * 100)} %`;

function updateSampling() {
  try {
    const result = calculateSampling({
      counts: { prepare: number("prepare"), inspect: number("inspect"), rework: number("rework"), search: number("search") },
      margin: number("margin"), z: number("zvalue")
    });
    $("totalObs").textContent = result.total;
    $("proportion").textContent = pct(result.p);
    $("interval").textContent = `${pct(result.lower)} – ${pct(result.upper)}`;
    $("sampleSize").textContent = result.requiredTotal;
    $("samplingMessage").textContent = result.requiredTotal <= result.total
      ? `La muestra actual (${result.total}) alcanza el tamaño estimado de ${result.requiredTotal} observaciones para el margen solicitado.`
      : `Se estiman ${result.requiredTotal} observaciones en total; faltarían ${result.additional} para alcanzar ese tamaño.`;
  } catch (error) { $("samplingMessage").textContent = error.message; }
}

function updateErgonomics() {
  try {
    const profiles = calculateErgonomics({ deskHeight: number("deskHeight"), instructionDistance: number("instructionDistance"), elbowOffset: number("elbowOffset") });
    $("surfaceP5").textContent = profiles[0].targetHeight;
    $("surfaceP50").textContent = profiles[1].targetHeight;
    $("surfaceP95").textContent = profiles[2].targetHeight;
    $("ergoResults").innerHTML = profiles.map(p => {
      const deskText = p.deskWithin ? "Mesa coincide con el objetivo" : `Mesa fuera del objetivo (diferencia: ${fmt(p.deskDifference, 0)} mm)`;
      const reachText = p.reachWithin ? "Instrucciones dentro del alcance" : "Instrucciones fuera del alcance cómodo";
      return `<article class="profile"><h3>${p.percentile}</h3><p>Altura sugerida: <strong>${p.targetHeight} mm</strong></p><p class="status ${p.deskWithin ? "in" : "out"}">${deskText}</p><p class="status ${p.reachWithin ? "in" : "out"}">${reachText} (alcance: ${p.reach} mm)</p></article>`;
    }).join("");
  } catch (error) { $("ergoResults").textContent = error.message; }
}

function updateMoment() {
  try {
    const result = calculateMoment({ mass: number("mass"), gravity: number("gravity"), distanceA: number("distanceA"), distanceB: number("distanceB") });
    $("force").textContent = `${fmt(result.force)} N`;
    $("momentA").textContent = `${fmt(result.momentA)} N·m`;
    $("momentB").textContent = `${fmt(result.momentB)} N·m`;
    $("reduction").textContent = `${fmt(result.reduction)} %`;
  } catch (error) { $("force").textContent = error.message; }
}

if (typeof document !== "undefined") {
  $("samplingButton").addEventListener("click", updateSampling);
  $("ergoButton").addEventListener("click", updateErgonomics);
  $("momentButton").addEventListener("click", updateMoment);
  updateSampling(); updateErgonomics(); updateMoment();
}
