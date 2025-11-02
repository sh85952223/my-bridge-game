// src/components/pages/pageRegistry.ts

import { lazy } from 'react';
export const pageRegistry = {
  // --- 작업 완료 (폴더 경로 유지) ---
  1: lazy(() => import('./Page01_Title/')),
  2: lazy(() => import('./Page02_HanjaIntro/')),
  3: lazy(() => import('./Page03_HanjaQuiz1/')),
  4: lazy(() => import('./Page04_HanjaQuiz1_Result/')),
  5: lazy(() => import('./Page05_HanjaQuiz2/')),
  6: lazy(() => import('./Page06_HanjaQuiz2_Result/')),
  7: lazy(() => import('./Page07_ActivityIntro/')),
  8: lazy(() => import('./Page08_ImageQuiz1/')),
  9: lazy(() => import('./Page09_VSQuiz/')),
  10: lazy(() => import('./Page10_AmazingBridges/')),
  11: lazy(() => import('./Page11_Definition/')),
  12: lazy(() => import('./Page12_QuizIntro/')),       
  13: lazy(() => import('./Page13_StructureQuiz/')),   
  14: lazy(() => import('./Page14_HintHub/')),         
  15: lazy(() => import('./Page15_MatchQuiz/')),        
  16: lazy(() => import('./Page16_StudyGuide/')),
  17: lazy(() => import('./Page17_BridgeTypeQuiz/')),
  18: lazy(() => import('./Page18_DisadvantageQuiz/')),
  19: lazy(() => import('./Page19_ForceQuiz/')),
  20: lazy(() => import('./Page20_WindQuiz/')),
  21: lazy(() => import('./Page21_LengthQuiz/')),
  22: lazy(() => import('./Page22_TrussQuiz/')),
};