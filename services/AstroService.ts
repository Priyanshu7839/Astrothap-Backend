// src/services/astrologyService.ts

import { zodiacData } from "../datafiles/ZodiacData.ts";
import { moonSignData } from "../datafiles/MoonSignData.ts";
import { numerologyData } from "../datafiles/NumerologyData.ts";
import { houseData } from "../datafiles/HouseData.ts";

// ========================================
// TYPES
// ========================================

type AstrologyInput = {
  name: string;
  dob: string; // YYYY-MM-DD
  timeOfBirth?: string; // HH:mm
  place: string;
};

// ========================================
// HELPERS
// ========================================

function reduceNumber(num: number): number {
  while (num > 9 && ![11, 22, 33].includes(num)) {
    num = num
      .toString()
      .split("")
      .reduce((a, b) => a + Number(b), 0);
  }

  return num;
}

// ========================================
// NUMEROLOGY
// ========================================

function getBirthNumber(dob: string) {
  const day = new Date(dob).getDate();

  return reduceNumber(day);
}

function getLifePath(dob: string) {
  const total = dob
    .replace(/-/g, "")
    .split("")
    .reduce((a, b) => a + Number(b), 0);

  return reduceNumber(total);
}

const chaldeanMap: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8,
};

function getChaldean(name: string) {
  const total = name
    .toUpperCase()
    .split("")
    .reduce((sum, char) => {
      return sum + (chaldeanMap[char] || 0);
    }, 0);

  return reduceNumber(total);
}

// ========================================
// SUN SIGN
// ========================================

function getSunSign(dob: string) {
  const date = new Date(dob);

  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (
    (month === 3 && day >= 21) ||
    (month === 4 && day <= 19)
  ) return "Aries";

  if (
    (month === 4 && day >= 20) ||
    (month === 5 && day <= 20)
  ) return "Taurus";

  if (
    (month === 5 && day >= 21) ||
    (month === 6 && day <= 20)
  ) return "Gemini";

  if (
    (month === 6 && day >= 21) ||
    (month === 7 && day <= 22)
  ) return "Cancer";

  if (
    (month === 7 && day >= 23) ||
    (month === 8 && day <= 22)
  ) return "Leo";

  if (
    (month === 8 && day >= 23) ||
    (month === 9 && day <= 22)
  ) return "Virgo";

  if (
    (month === 9 && day >= 23) ||
    (month === 10 && day <= 22)
  ) return "Libra";

  if (
    (month === 10 && day >= 23) ||
    (month === 11 && day <= 21)
  ) return "Scorpio";

  if (
    (month === 11 && day >= 22) ||
    (month === 12 && day <= 21)
  ) return "Sagittarius";

  if (
    (month === 12 && day >= 22) ||
    (month === 1 && day <= 19)
  ) return "Capricorn";

  if (
    (month === 1 && day >= 20) ||
    (month === 2 && day <= 18)
  ) return "Aquarius";

  return "Pisces";
}

// ========================================
// MOCK ADVANCED ASTROLOGY
// REPLACE LATER WITH SWISS EPHEMERIS
// ========================================

function getAdvancedAstrology() {
  return {
    moonSign: "Scorpio",
    lagna: "Leo",
    nakshatra: "Ashwini",

    houses: {
      first: "Self",
      second: "Finance",
      third: "Communication",
      fourth: "Home",
      fifth: "Creativity",
      sixth: "Health",
      seventh: "Relationships",
      eighth: "Transformation",
      ninth: "Spirituality",
      tenth: "Career",
      eleventh: "Social Circle",
      twelfth: "Subconscious",
    },

    planetaryPositions: {
      Sun: "Pisces",
      Moon: "Scorpio",
      Mars: "Aries",
      Venus: "Taurus",
      Mercury: "Aquarius",
      Jupiter: "Sagittarius",
      Saturn: "Capricorn",
    },
  };
}

// ========================================
// MAIN FUNCTION
// ========================================

export async function generateAstrologyProfile(
  input: AstrologyInput
) {



  const {
    name,
    dob,
    timeOfBirth,
    place,
  } = input;

  console.log(name)

  // =========================
  // NUMEROLOGY
  // =========================

  const birthNumber =
    getBirthNumber(dob);

  const lifePath =
    getLifePath(dob);

  const chaldean =
    getChaldean(name);

  // =========================
  // SUN SIGN
  // =========================

  const sunSign =
    getSunSign(dob);

  const sunData =
    zodiacData[sunSign];

  // =========================
  // BASE RESPONSE
  // =========================

  const result: any = {
    basicDetails: {
      name,
      dob,
      timeOfBirth,
      place,
    },

    numerology: {
      birthNumber,
      lifePath,
      chaldean,

      birthNumberData:
        numerologyData.birthNumbers[
          birthNumber
        ],

      lifePathData:
        numerologyData.lifePaths[
          lifePath
        ],

      chaldeanData:
        numerologyData.chaldean[
          chaldean
        ],
    },

    zodiac: {
      sunSign,

      traits:
        sunData?.traits || [],

      strengths:
        sunData?.strengths || [],

      shadowTraits:
        sunData?.shadowTraits || [],

      personality:
        sunData?.personality || "",

      dailyHoroscope:
        sunData?.dailyHoroscope || "",
    },

    emotionalProfile: {
      emotionalSensitivity:
        sunData?.emotionalSensitivity,

      overthinkingTendency:
        sunData?.overthinkingTendency,

      attachmentIntensity:
        sunData?.attachmentIntensity,

      communicationClarity:
        sunData?.communicationClarity,

      relationshipStability:
        sunData?.relationshipStability,
    },
  };



  return result;
}