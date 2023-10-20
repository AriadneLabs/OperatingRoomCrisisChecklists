import Home from "./pages/Home.svelte";
import Air_Embolism from "./pages/Air_Embolism.svelte"
import Anaphylaxis from "./pages/Anaphylaxis.svelte"
import Bradycardia from "./pages/Bradycardia.svelte"
import Cardiac_Arrest_PEA_Asystole from "./pages/Cardiac_Arrest_PEA_Asystole.svelte"
import Cardiac_Arrest_VF_VT from "./pages/Cardiac_Arrest_VF_VT.svelte"
import Failed_Airway from "./pages/Failed_Airway.svelte"
import Fire from "./pages/Fire.svelte"
import Hemorrhage from "./pages/Hemorrhage.svelte"
import Hypotension from "./pages/Hypotension.svelte"
import Hypoxia from "./pages/Hypoxia.svelte"
import Malignant_Hyperthermia from "./pages/Malignant_Hyperthermia.svelte"
import Tachycardia from "./pages/Tachycardia.svelte"
import OB_Hemorrhage from "./pages/OB_Hemorrhage.svelte"
import LAST from "./pages/LAST.svelte"
import Myocardial_Ischemia from "./pages/Myocardial_Ischemia.svelte"
import Delayed_Emergence from "./pages/Delayed_Emergence.svelte"
import Transfusion_Reaction from "./pages/Transfusion_Reaction.svelte"

export default [
  {
    path: "/",
    component: Home
  },
  {
    path: "/air_embolism",
    component: Air_Embolism
  },
  {
    path: "/anaphylaxis",
    component: Anaphylaxis
  },
  {
    path: "/bradycardia",
    component: Bradycardia
  },
  {
    path: "/cardiac_arrest_pea_asystole",
    component: Cardiac_Arrest_PEA_Asystole
  },
  {
    path: "/cardiac_arrest_vf_vt",
    component: Cardiac_Arrest_VF_VT
  },
  {
    path: "/failed_airway",
    component: Failed_Airway
  },
  {
    path: "/fire",
    component: Fire
  },
  {
    path: "/hemorrhage",
    component: Hemorrhage
  },
  {
    path: "/hypotension",
    component: Hypotension
  },
  {
    path: "/hypoxia",
    component: Hypoxia
  },
  {
    path: "/malignant_hyperthermia",
    component: Malignant_Hyperthermia
  },
  {
    path: "/tachycardia",
    component: Tachycardia
  },
  {
    path: "/ob_hemorrhage",
    component: OB_Hemorrhage
  },
  {
    path: "/last",
    component: LAST
  },
  {
    path: "/myocardial_ischemia",
    component: Myocardial_Ischemia
  },
  {
    path: "/delayed_emergence",
    component: Delayed_Emergence
  },
  {
    path: "/transfusion_reaction",
    component: Transfusion_Reaction
  },
];
