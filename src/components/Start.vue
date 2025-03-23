<template>
  <div class="app-container">
    <!-- Progress Bar -->
    <div v-if="currentStep === 'survey'" class="progress-bar">
      <div class="progress" :style="{ width: `${progress}%` }"></div>
    </div>

    <div class="content-container">
      <!-- Enqueteur Input Step -->
      <div v-if="currentStep === 'enqueteur'">
        <h2>Prénom enqueteur :</h2>
        <input class="form-control" type="text" v-model="enqueteur" />
        <button
          v-if="enqueteur && !isEnqueteurSaved"
          @click="setEnqueteur"
          class="btn-next"
        >
          Suivant
        </button>
      </div>

      <!-- Start Survey Step -->
      <div v-else-if="currentStep === 'start'" class="start-survey-container">
        <h2>Bonjour<br /></h2>
        <button @click="startSurvey" class="btn-next">
          COMMENCER QUESTIONNAIRE
        </button>
      </div>

      <!-- Survey Questions Step -->
      <div v-else-if="currentStep === 'survey' && !isSurveyComplete">
        <div class="question-container">
          <h2>{{ currentQuestion.text }}</h2>

          <!-- PDF Button for Q3a and Q3a_nonvoyageur -->
          <button
            v-if="
              ['Q3a', 'Q3b', 'Q3a_nv', 'Q3b_nv', 'Q3a_d', 'Q3b_d'].includes(
                currentQuestion.id
              )
            "
            @click="
              () => {
                console.log('Opening PDF modal');
                console.log('PDF URL:', pdfUrl);
                showPdf = true;
              }
            "
            class="btn-pdf"
          >
            Voir le plan du parking
          </button>

          <!-- Commune Selector for Q2 -->
          <div
            v-if="
              currentQuestion.id === 'Q2' ||
              currentQuestion.id === 'Q2_d' ||
              currentQuestion.id === 'Q2_nv'
            "
          >
            <div
              v-for="(option, index) in currentQuestion.options"
              :key="index"
            >
              <button @click="selectAnswer(option, index)" class="btn-option">
                {{ option.text }}
              </button>
            </div>
          </div>
          <div
            v-else-if="
              currentQuestion.id === 'Q2_precision' ||
              currentQuestion.id === 'Q2d_precision' ||
              currentQuestion.id === 'Q2_precis_nv'
            "
          >
            <CommuneSelector
              v-model="selectedCommune"
              v-model:postalCodePrefix="postalCodePrefix"
            />
            <p>Commune sélectionnée ou saisie: {{ selectedCommune }}</p>
            <button
              @click="handleCommuneSelection"
              class="btn-next"
              :disabled="!selectedCommune.trim()"
            >
              {{ isLastQuestion ? "Terminer" : "Suivant" }}
            </button>
          </div>
          <!-- Dropdown for Q5 -->
          <div
            v-else-if="
              currentQuestion.id === 'Q5_stations' ||
              currentQuestion.id === 'Q5_d_stations'
            "
          >
            <div class="station-input-container">
              <input
                v-model="stationInput"
                class="form-control"
                type="text"
                placeholder="Saisissez une gare"
              />
              <ul v-if="showFilteredStations" class="commune-dropdown">
                <li
                  v-for="station in filteredStations"
                  :key="station"
                  @click="selectStation(station)"
                  class="commune-option"
                >
                  {{ station }}
                </li>
              </ul>
            </div>
            <button
              @click="handleStationSelection"
              class="btn-next"
              :disabled="!stationInput.trim()"
            >
              {{ isLastQuestion ? "Terminer" : "Suivant" }}
            </button>
          </div>
          <!-- Street Input -->
          <div v-else-if="currentQuestion.streetInput">
            <div class="input-container">
              <input
                v-model="streetInput"
                class="form-control"
                type="text"
                :placeholder="
                  currentQuestion.freeTextPlaceholder || 'Saisissez une rue'
                "
              />
              <ul v-if="showFilteredStreets" class="commune-dropdown">
                <li
                  v-for="street in filteredStreets"
                  :key="street"
                  @click="selectStreet(street)"
                  class="commune-option"
                >
                  {{ street }}
                </li>
              </ul>
            </div>
            <button
              @click="handleStreetSelection"
              class="btn-next"
              :disabled="!streetInput.trim()"
            >
              {{ isLastQuestion ? "Terminer" : "Suivant" }}
            </button>
          </div>
          <!-- Multiple Choice Questions -->
          <div v-else-if="!currentQuestion.freeText">
            <div
              v-for="(option, index) in currentQuestion.options"
              :key="index"
            >
              <button @click="selectAnswer(option, index)" class="btn-option">
                {{ option.text }}
              </button>
            </div>
          </div>
          <!-- Free Text Questions -->
          <div v-else>
            <div class="input-container">
              <input
                v-model="freeTextAnswer"
                class="form-control"
                type="text"
                :placeholder="
                  currentQuestion.freeTextPlaceholder || 'Votre réponse'
                "
              />
            </div>
            <button
              @click="handleFreeTextAnswer"
              class="btn-next"
              :disabled="!freeTextAnswer.trim()"
            >
              {{ isLastQuestion ? "Terminer" : "Suivant" }}
            </button>
          </div>
          <!-- Back Button -->
          <button @click="previousQuestion" class="btn-return" v-if="canGoBack">
            Retour
          </button>
        </div>
      </div>

      <!-- Survey Complete Step -->
      <div v-else-if="isSurveyComplete" class="survey-complete">
        <h2>Merci pour votre réponse et bonne journée.</h2>
        <button @click="resetSurvey" class="btn-next">
          Nouveau questionnaire
        </button>
      </div>

      <!-- Logo -->
      <img class="logo" src="../assets/Alycelogo.webp" alt="Logo Alyce" />
    </div>

    <!-- Footer -->
    <div class="footer">
      <AdminDashboard />
    </div>

    <!-- PDF Modal -->
    <div v-if="showPdf" class="modal">
      <div class="modal-content pdf-content">
        <button
          class="close"
          @click="
            () => {
              showPdf = false;
              console.log('Closing PDF modal');
            }
          "
        >
          ×
        </button>
        <iframe
          :src="pdfUrl"
          width="100%"
          height="500px"
          type="application/pdf"
        >
          This browser does not support PDFs. Please download the PDF to view
          it.
        </iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { questions } from "./surveyQuestions.js";
import CommuneSelector from "./CommuneSelector.vue";
import AdminDashboard from "./AdminDashboard.vue";

// Refs for state management
const docCount = ref(0);
const currentStep = ref("enqueteur");
const startDate = ref("");
const enqueteur = ref("");
const currentQuestionIndex = ref(0);
const answers = ref({ question_answers: [] }); // Initialize with empty question_answers array
const freeTextAnswer = ref("");
const questionPath = ref(["Q0"]);
const isEnqueteurSaved = ref(false);
const isSurveyComplete = ref(false);
const selectedStation = ref("");
const selectedCommune = ref("");
const postalCodePrefix = ref("");
const showPdf = ref(false);
const pdfUrl = ref("/Plan.pdf");
const stationInput = ref("");
const streetInput = ref("");
const filteredStations = ref([]);
const filteredStreets = ref([]);
const selectedPoste = ref(null);

// Firestore refs
const surveyCollectionRef = collection(db, "Guyane");
const counterDocRef = doc(db, "counters", "surveyCounter");

// Stations list

const stationsList = [
  "Amboise",
  "Ancenis",
  "La Angers-Saint-Laud-Landerneau",
  "Batz-sur-Mer",
  "Baule",
  "Blois-Chambord",
  "Chaingy-Fourneaux-Plage",
  "Chouzy",
  "La Baule-Escoublac",
  "La Baule-les-Pins",
  "La Chapelle-Saint-Mesmin",
  "La Chaussée-Saint-Victor",
  "Le Croisic",
  "Le Pouliguen",
  "Les Aubrais",
  "Limeray",
  "Menars",
  "Mer",
  "Meung-sur-Loire",
  "Montlouis-sur-Loire",
  "Nantes",
  "Noizay",
  "Onzain-Chaumont-sur-Loire",
  "Orléans",
  "Pornichet",
  "Saint-Ay",
  "Saint-Nazaire",
  "Saint-Pierre-des-Corps",
  "Saumur",
  "Suèvres",
  "Tours",
  "Veuves-Monteaux",
];

const streetsList = [
  "Allée de Flore",
  "Allée de la Perrine",
  "Allée de la Roseraie",
  "Allée de l'Oratoire",
  "Allée des Bleuets",
  "Allée des Coquelicots",
  "Allée des Galeries",
  "Allée Edwige Feuillère",
  "Allée Pierre de Ronsard",
  "Allee des Tilleuls",
  "Avenue de Blois",
  "Avenue de Chambord",
  "Avenue de la Procession",
  "Avenue de Vendôme",
  "Avenue des Chaussées",
  "Avenue des Clos Neufs",
  "Avenue des Hauts de Lutz",
  "Avenue d'Orléans",
  "Avenue du Colonel Morlaix Demozay",
  "Avenue Jules Lemaître",
  "Avenue Longchamps",
  "Avenue Pierre de Félice",
  "Chemin de Fins à la Mairie",
  "Chemin de la Caillotière",
  "Chemin de Marchebault",
  "Chemin des Buissons",
  "Chemin des Fourneaux",
  "Chemin des Grandes Gibaudières",
  "Chemin des Quatre Vents",
  "Chemin du Verger aux Laurières",
  "Clos de la Chapelle",
  "Clos de Lutz",
  "Clos des Fourneaux",
  "Clos des Iles",
  "Cul de Sac des Cornes",
  "Impasse Clos Saint Jean",
  "Impasse de Bel Air",
  "Impasse de la Bergerie",
  "Impasse de la Ganache",
  "Impasse de la Monnaie",
  "Impasse de la Sourcière",
  "Impasse de la Touanne",
  "Impasse des Belles",
  "Impasse des Capucins",
  "Impasse des Caves d'Igoire",
  "Impasse des Clos Neufs",
  "Impasse des Laurières",
  "Impasse des Toits",
  "Impasse du Colombier",
  "Impasse Jules Lemaitre",
  "Impasse Oseille",
  "Impasse Saint Michel",
  "La Pointe des Fourneaux",
  "Lieu Dit le Grand Mail",
  "Place du Docteur Hyvernaud",
  "Place du Martroi",
  "Place du Petit Marché",
  "Place du Puits Gaillard",
  "Place Dunois",
  "Place Saint-firmin",
  "Promenade de Barchelin",
  "Quai de l'Abbaye",
  "Quai Dunois",
  "Route de Lailly En Val",
  "Route de Messas",
  "Route de Saint-Laurent",
  "Route du Val",
  "Rue Bêche Fève",
  "Rue Basse",
  "Rue Bernasse",
  "Rue Cassandre Salviati",
  "Rue Cave d'Igoire",
  "Rue Collinet Rousseau",
  "Rue Croque Motte",
  "Rue de Beauvilliers",
  "Rue de Bel Air",
  "Rue de Chateaudun",
  "Rue de Garambault",
  "Rue de la Beauce",
  "Rue de la Bonde",
  "Rue de la Boulangerie",
  "Rue de la Bretonnerie",
  "Rue de la Cordonnerie",
  "Rue de la Couture",
  "Rue de la Croix Nas",
  "Rue de la Fontaine Appia",
  "Rue de la Fontaine aux Clercs",
  "Rue de la Fossé aux Loups",
  "Rue de la Gare",
  "Rue de la Maille d'Or",
  "Rue de la Mardelle",
  "Rue de la Moissonnière",
  "Rue de la Pierre Blanche",
  "Rue de la Pointe Maubinée",
  "Rue de la Poterie",
  "Rue de la Sirène",
  "Rue de la Source",
  "Rue de la Sourciere",
  "Rue de la Tête Noire",
  "Rue de l'Abattoir",
  "Rue de l'Abbaye",
  "Rue de l'Abreuvoir",
  "Rue de l'Eglise",
  "Rue de l'Evêché",
  "Rue de l'Orme",
  "Rue de l'Orme à la Chêvre",
  "Rue de l'Ours",
  "Rue de l'Oursine",
  "Rue de Meung",
  "Rue de Pierre Couverte",
  "Rue de Vétille",
  "Rue d'Entre-deux aux Vallées",
  "Rue des 4 Nations",
  "Rue des Acacias",
  "Rue des Aigres Feuilles",
  "Rue des Baltants",
  "Rue des Belettes",
  "Rue des Bruyeres",
  "Rue des Capucins",
  "Rue des Champs de Veaux",
  "Rue des Champs Fleuris",
  "Rue des Champs Poulains",
  "Rue des Chardonnerets",
  "Rue des Chevaliers",
  "Rue des Cygnes",
  "Rue des Etuves",
  "Rue des Fontaines",
  "Rue des Forges",
  "Rue des Germines",
  "Rue des Grottes",
  "Rue des Iles",
  "Rue des Jonquilles",
  "Rue des Laurières",
  "Rue des Mésanges",
  "Rue des Marais",
  "Rue des Marmousets",
  "Rue des Ormeaux",
  "Rue des Quatre Fournils",
  "Rue des Querres",
  "Rue des Quintaux",
  "Rue des Relais",
  "Rue des Sablons",
  "Rue des sous Lutz",
  "Rue des Tanneurs",
  "Rue des Toits",
  "Rue des Trois Marchands",
  "Rue des Vieux Fossés",
  "Rue des Vignes",
  "Rue du Belier",
  "Rue du Cabris",
  "Rue du Château d'Eau",
  "Rue du Change",
  "Rue du Chat Qui Dort",
  "Rue du Clos des Belles",
  "Rue du Clos Saint Jean",
  "Rue du Colombier",
  "Rue du Cormier",
  "Rue du Faubourg Porte Dieu",
  "Rue du Four à Chaux",
  "Rue du Gris Meunier",
  "Rue du Gros Vilain",
  "Rue du Martroi",
  "Rue du Moulin à Vent",
  "Rue du Moulin Rouge",
  "Rue du Physicien Jacques Charles",
  "Rue du Pissot",
  "Rue du Poët Chaumont",
  "Rue du Pont",
  "Rue du Pouêt de Levrault",
  "Rue du Prateau",
  "Rue du Puits Chaumont",
  "Rue du Puits de l'Ange",
  "Rue du Puits Manu",
  "Rue du Puits Roussy",
  "Rue du RÛ",
  "Rue du Ravelin",
  "Rue du Saint-esprit",
  "Rue du Traineau",
  "Rue du Val Macé",
  "Rue Fourniere",
  "Rue Jean Voisin",
  "Rue Joachim du Bellay",
  "Rue Jules Lemaître",
  "Rue Julie Lour",
  "Rue les Haies Frisées",
  "Rue Nationale",
  "Rue Oseille",
  "Rue Porte aux Febvres",
  "Rue Porte Dieu",
  "Rue Porte Tavers",
  "Rue Porte Vendômoise",
  "Rue Robert Bothereau",
  "Rue Saint Gentien",
  "Rue Saint Michel",
  "Rue Saint-calais",
  "Rue Tardenoisienne",
  "Sentier de Levrault",
  "Sentier des Champs de Veaux",
  "Sentier des sous Lutz",
  "Venelle Badin",
];

// Computed properties
const currentQuestion = computed(() => {
  return currentQuestionIndex.value >= 0 &&
    currentQuestionIndex.value < questions.length
    ? questions[currentQuestionIndex.value]
    : null;
});

const showFilteredStations = computed(
  () => stationInput.value.length > 0 && filteredStations.value.length > 0
);

const showFilteredStreets = computed(
  () => streetInput.value.length > 0 && filteredStreets.value.length > 0
);

const canGoBack = computed(() => questionPath.value.length > 1);

const isLastQuestion = computed(
  () => currentQuestionIndex.value === questions.length - 1
);

const progress = computed(() => {
  if (currentStep.value !== "survey") return 0;
  if (isSurveyComplete.value) return 100;
  const totalQuestions = questions.length;
  const currentQuestionNumber = currentQuestionIndex.value + 1;
  const isLastOrEnding =
    isLastQuestion.value ||
    currentQuestion.value?.options?.some((option) => option.next === "end");
  return isLastOrEnding
    ? 100
    : Math.min(Math.round((currentQuestionNumber / totalQuestions) * 100), 99);
});

const isValidCommuneSelection = computed(() => {
  return (
    selectedCommune.value.includes(" - ") || selectedCommune.value.trim() !== ""
  );
});

// Add these new methods
const filterStations = () => {
  const input = stationInput.value.toLowerCase();
  filteredStations.value = stationsList.filter((station) =>
    station.toLowerCase().includes(input)
  );
};

const filterStreets = () => {
  const input = streetInput.value.toLowerCase();
  filteredStreets.value = streetsList.filter((street) =>
    street.toLowerCase().includes(input)
  );
};

const selectStation = (station) => {
  stationInput.value = station;
  filteredStations.value = [];
};

const selectStreet = (street) => {
  streetInput.value = street;
  filteredStreets.value = [];
};

// Methods
const setEnqueteur = () => {
  if (enqueteur.value.trim() !== "") {
    currentStep.value = "start";
    isEnqueteurSaved.value = true;
  }
};

const startSurvey = () => {
  // Set the start date using the current time
  const now = new Date();
  startDate.value = now.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  console.log("==== NEW SURVEY STARTED ====");
  console.log("Survey started at:", startDate.value);

  // Create a completely new answers object to avoid referencing previous data
  answers.value = { question_answers: [] };

  // Clear any previous sessionStorage to start fresh
  sessionStorage.removeItem("vehicleType");

  // Reset all state
  currentStep.value = "survey";
  isSurveyComplete.value = false;

  // Make sure we start with Poste question
  questionPath.value = ["Poste"];

  // Find the index of the Poste question to ensure we start there
  const posteIndex = questions.findIndex((q) => q.id === "Poste");
  if (posteIndex !== -1) {
    currentQuestionIndex.value = posteIndex;
    console.log("Starting with Poste question");
  } else {
    currentQuestionIndex.value = 0;
    console.warn("Warning: Could not find Poste question in questions array");
  }

  // Reset all input fields
  freeTextAnswer.value = "";
  selectedCommune.value = "";
  postalCodePrefix.value = "";
  stationInput.value = "";
  streetInput.value = "";

  // Clear filtered lists
  filteredStations.value = [];
  filteredStreets.value = [];

  console.log("Survey state initialized, ready for responses");
  console.log("Current answers object:", answers.value);
};

const selectAnswer = (option, index) => {
  const questionId = currentQuestion.value.id;

  // Debug logging
  debugBeforeAnswer(questionId, option, index);

  // Special handling for Q0 (vehicle type)
  if (questionId === "Q0") {
    console.log(
      `Selected vehicle type: ${option.text} (index: ${index}, value: ${
        index + 1
      })`
    );

    // Store Q0 value in both sessionStorage and as a regular answer
    const vehicleValue = index + 1;
    sessionStorage.setItem("vehicleType", vehicleValue.toString());

    // Store Q0 in the main answers object (this is needed for vehicle type)
    answers.value.Q0 = vehicleValue;
    answers.value.Q0_optionId = option.id || vehicleValue;

    // Also update question_answers array
    if (!answers.value.question_answers) {
      answers.value.question_answers = [];
    }

    // Remove any existing Q0 entry
    const existingQ0Index = answers.value.question_answers.findIndex(
      (qa) => qa.questionId === "Q0"
    );

    if (existingQ0Index !== -1) {
      answers.value.question_answers.splice(existingQ0Index, 1);
    }

    // Add the Q0 answer to tracking array
    answers.value.question_answers.push({
      questionId: "Q0",
      questionText: "Type de véhicule",
      optionId: option.id || vehicleValue,
      optionText: option.text,
      optionIndex: index,
    });

    console.log(
      "Vehicle type set successfully. Current answers:",
      answers.value
    );
  }
  // Special handling for Poste selection
  else if (questionId === "Poste") {
    console.log(
      `Selected Poste: ${option.text} (index: ${index}, value: ${index + 1})`
    );

    // Store Poste selection in answers
    answers.value.Poste = index + 1;

    // Add to question_answers array
    if (!answers.value.question_answers) {
      answers.value.question_answers = [];
    }

    // Remove any existing Poste entry if changing answer
    const existingPosteIndex = answers.value.question_answers.findIndex(
      (qa) => qa.questionId === "Poste"
    );

    if (existingPosteIndex !== -1) {
      answers.value.question_answers.splice(existingPosteIndex, 1);
    }

    // Add the Poste answer to tracking array
    answers.value.question_answers.push({
      questionId: "Poste",
      questionText: "Poste",
      optionId: option.id || index + 1,
      optionText: option.text,
      optionIndex: index,
    });

    // Store the selected poste for reference
    selectedPoste.value = option.text;

    console.log("Poste selection saved:", answers.value);
  }
  // For non-Q0 questions
  else {
    // Special check for missing Q0 - only check this for questions after Q0 (not for Poste)
    if (
      !answers.value.hasOwnProperty("Q0") &&
      !sessionStorage.getItem("vehicleType") &&
      questionId !== "Poste"
    ) {
      console.warn(
        "Warning: Answering questions without a vehicle type set. Redirecting to vehicle selection."
      );
      // Find Q0 index
      const q0Index = questions.findIndex((q) => q.id === "Q0");
      if (q0Index !== -1) {
        currentQuestionIndex.value = q0Index;
        questionPath.value.push("Q0");
      }
      return;
    }

    // Track this answer in the question_answers array only
    if (!answers.value.question_answers) {
      answers.value.question_answers = [];
    }

    // First remove any existing entry for this question (in case of changing answer)
    const existingIndex = answers.value.question_answers.findIndex(
      (qa) => qa.questionId === questionId
    );
    if (existingIndex !== -1) {
      answers.value.question_answers.splice(existingIndex, 1);
    }

    // Add the current question-answer to the tracking array only
    answers.value.question_answers.push({
      questionId: questionId,
      questionText: currentQuestion.value.text,
      optionId: option.id || `option_${index + 1}`,
      optionText: option.text,
      optionIndex: index,
    });
  }

  // Log the selection for debugging
  console.log(
    `Selected answer for ${questionId}: ${option.text} (value: ${
      index + 1
    }, id: ${option.id || `option_${index + 1}`})`
  );

  // Get the next question ID based on the selected option
  const nextQuestionId = option.next;

  // Determine what to do next
  if (nextQuestionId === "end") {
    finishSurvey();
  } else if (option.requiresPrecision) {
    nextQuestion(nextQuestionId);
  } else {
    nextQuestion(nextQuestionId);
  }
};

const handleFreeTextAnswer = () => {
  if (currentQuestion.value) {
    // Skip for street questions since they're handled by handleStreetSelection
    if (
      currentQuestion.value.id === "Q2a" ||
      currentQuestion.value.id === "Q2a_d" ||
      currentQuestion.value.id === "Q2a_nv"
    ) {
      return;
    }

    answers.value[currentQuestion.value.id] = freeTextAnswer.value;

    // Track this free text answer in the question_answers array
    if (!answers.value.question_answers) {
      answers.value.question_answers = [];
    }

    answers.value.question_answers.push({
      questionId: currentQuestion.value.id,
      questionText: currentQuestion.value.text,
      optionId: "freetext",
      optionText: freeTextAnswer.value,
      optionIndex: 0,
    });

    if (currentQuestionIndex.value < questions.length - 1) {
      nextQuestion();
    } else {
      finishSurvey();
    }
  }
};

const handleStationSelection = () => {
  if (stationInput.value.trim() !== "") {
    const isListedStation = stationsList.includes(stationInput.value);
    const questionId = currentQuestion.value.id;

    if (questionId === "Q5_stations") {
      answers.value["Q5"] = stationInput.value;
      if (!isListedStation) {
        answers.value["Q5_CUSTOM"] = stationInput.value;
      }

      // Track this station answer in the question_answers array
      if (!answers.value.question_answers) {
        answers.value.question_answers = [];
      }

      answers.value.question_answers.push({
        questionId: "Q5",
        questionText: currentQuestion.value.text,
        optionId: "station_input",
        optionText: stationInput.value,
        optionIndex: 0,
      });
    } else if (questionId === "Q5_d_stations") {
      answers.value["Q5_d"] = stationInput.value;
      if (!isListedStation) {
        answers.value["Q5_d_CUSTOM"] = stationInput.value;
      }

      // Track this station answer in the question_answers array
      if (!answers.value.question_answers) {
        answers.value.question_answers = [];
      }

      answers.value.question_answers.push({
        questionId: "Q5_d",
        questionText: currentQuestion.value.text,
        optionId: "station_input",
        optionText: stationInput.value,
        optionIndex: 0,
      });
    }

    nextQuestion();
    stationInput.value = ""; // Reset input for next use
    filteredStations.value = []; // Clear filtered list
  }
};

const handleStreetSelection = () => {
  if (streetInput.value.trim() !== "") {
    const isListedStreet = streetsList.includes(streetInput.value);
    const questionId = currentQuestion.value.id;

    // Store the answer based on the question ID
    if (questionId === "Q2a") {
      answers.value["Q2a"] = streetInput.value;
      if (!isListedStreet) {
        answers.value["Q2a_CUSTOM"] = streetInput.value;
      }

      // Track this street answer in the question_answers array
      if (!answers.value.question_answers) {
        answers.value.question_answers = [];
      }

      answers.value.question_answers.push({
        questionId: "Q2a",
        questionText: currentQuestion.value.text,
        optionId: "street_input",
        optionText: streetInput.value,
        optionIndex: 0,
      });
    } else if (questionId === "Q2a_d") {
      answers.value["Q2a_d"] = streetInput.value;
      if (!isListedStreet) {
        answers.value["Q2a_d_CUSTOM"] = streetInput.value;
      }

      // Track this street answer in the question_answers array
      if (!answers.value.question_answers) {
        answers.value.question_answers = [];
      }

      answers.value.question_answers.push({
        questionId: "Q2a_d",
        questionText: currentQuestion.value.text,
        optionId: "street_input",
        optionText: streetInput.value,
        optionIndex: 0,
      });
    } else if (questionId === "Q2a_nv") {
      answers.value["Q2a_nv"] = streetInput.value;
      if (!isListedStreet) {
        answers.value["Q2a_nv_CUSTOM"] = streetInput.value;
      }

      // Track this street answer in the question_answers array
      if (!answers.value.question_answers) {
        answers.value.question_answers = [];
      }

      answers.value.question_answers.push({
        questionId: "Q2a_nv",
        questionText: currentQuestion.value.text,
        optionId: "street_input",
        optionText: streetInput.value,
        optionIndex: 0,
      });
    }

    // Force move to next question
    const nextQuestionId = currentQuestion.value.next;
    if (nextQuestionId === "end") {
      finishSurvey();
    } else {
      const nextIndex = questions.findIndex((q) => q.id === nextQuestionId);
      if (nextIndex !== -1) {
        currentQuestionIndex.value = nextIndex;
        questionPath.value.push(nextQuestionId);
      }
    }

    // Reset the input
    streetInput.value = "";
    filteredStreets.value = [];
  }
};

// Add these watches
watch(stationInput, () => {
  filterStations();
});

watch(streetInput, () => {
  filterStreets();
});

const updateSelectedCommune = (value) => {
  selectedCommune.value = value;
};

const handleCommuneSelection = () => {
  if (selectedCommune.value.trim() !== "") {
    const parts = selectedCommune.value.split(" - ");
    const currentQuestionId = currentQuestion.value.id;
    const isNonPassenger = currentQuestionId.includes("nonvoyageur");
    const questionPrefix = isNonPassenger ? "Q2_nonvoyageur" : "Q2";

    let communeValue = "";

    if (parts.length === 2) {
      // Dropdown selection
      const [commune, codeInsee] = parts;
      answers.value[`${questionPrefix}_COMMUNE`] = commune;
      answers.value["CODE_INSEE"] = codeInsee;
      answers.value["COMMUNE_LIBRE"] = ""; // Clear COMMUNE_LIBRE
      communeValue = commune;
    } else {
      // Manual entry or free text
      answers.value[`${questionPrefix}_COMMUNE`] = ""; // Clear the dropdown commune
      answers.value["CODE_INSEE"] = ""; // Clear INSEE code
      answers.value["COMMUNE_LIBRE"] = selectedCommune.value.trim(); // Set COMMUNE_LIBRE
      communeValue = selectedCommune.value.trim();
    }

    // Track this commune answer in the question_answers array
    if (!answers.value.question_answers) {
      answers.value.question_answers = [];
    }

    answers.value.question_answers.push({
      questionId: currentQuestionId,
      questionText: currentQuestion.value.text,
      optionId: "commune_input",
      optionText: communeValue,
      optionIndex: 0,
    });

    nextQuestion();
  }
};

const nextQuestion = (forcedNextId = null) => {
  let nextQuestionId = forcedNextId;

  if (!nextQuestionId && currentQuestion.value) {
    if (currentQuestion.value.next) {
      nextQuestionId = currentQuestion.value.next;
    } else if (!currentQuestion.value.freeText) {
      const selectedAnswer = answers.value[currentQuestion.value.id];
      const selectedOption = currentQuestion.value.options[selectedAnswer - 1];
      nextQuestionId = selectedOption?.next || null;
    }
  }

  if (nextQuestionId === "end") {
    finishSurvey();
  } else if (nextQuestionId) {
    const nextIndex = questions.findIndex((q) => q.id === nextQuestionId);
    if (nextIndex !== -1) {
      currentQuestionIndex.value = nextIndex;
      questionPath.value.push(nextQuestionId);
      freeTextAnswer.value = "";
      selectedCommune.value = "";
      postalCodePrefix.value = "";
    }
  }
};

const previousQuestion = () => {
  if (canGoBack.value) {
    // Remove current question from path
    const currentQuestionId = questionPath.value.pop();
    const previousQuestionId =
      questionPath.value[questionPath.value.length - 1];

    // Find indices
    const previousIndex = questions.findIndex(
      (q) => q.id === previousQuestionId
    );

    if (previousIndex !== -1) {
      // Update current question index
      currentQuestionIndex.value = previousIndex;

      // Clear current question's answers
      if (currentQuestionId) {
        // Clear main answer
        delete answers.value[currentQuestionId];

        // Clear any custom/additional fields
        delete answers.value[`${currentQuestionId}_CUSTOM`];

        // Also remove from question_answers array if it exists
        if (
          answers.value.question_answers &&
          answers.value.question_answers.length > 0
        ) {
          // Find the index of the current question in question_answers array
          const qaIndex = answers.value.question_answers.findIndex(
            (qa) => qa.questionId === currentQuestionId
          );

          // If found, remove it
          if (qaIndex !== -1) {
            answers.value.question_answers.splice(qaIndex, 1);
          }
        }

        // Clear special fields for commune questions
        if (currentQuestionId.includes("Q2")) {
          delete answers.value["Q2_COMMUNE"];
          delete answers.value["CODE_INSEE"];
          delete answers.value["COMMUNE_LIBRE"];
        }
      }

      // Reset all input fields
      freeTextAnswer.value = "";
      stationInput.value = "";
      streetInput.value = "";
      selectedCommune.value = "";
      postalCodePrefix.value = "";

      // Clear filtered lists
      filteredStations.value = [];
      filteredStreets.value = [];
    }
  }
};

const finishSurvey = async () => {
  // First, capture all necessary data before changing state
  const surveyData = { ...answers.value }; // Create a copy of the answers
  const capturedQ0 = surveyData.Q0; // Specifically grab Q0 value
  const capturedQ0_optionId = surveyData.Q0_optionId;
  const capturedQuestionAnswers = [...(surveyData.question_answers || [])];

  // Now set survey to complete
  isSurveyComplete.value = true;
  const now = new Date();
  const uniqueId = await getNextId();

  console.log("===== FINISHING SURVEY =====");
  console.log("Captured Q0:", capturedQ0);
  console.log("Captured question_answers:", capturedQuestionAnswers.length);

  // Log all answers for debugging
  console.log("Survey answers before saving:", surveyData);

  // Determine vehicle type (VL or PL) using captured value
  let vehicleTypeValue = capturedQ0;

  // Fallback to sessionStorage if no captured value
  if (vehicleTypeValue === undefined) {
    const storedType = sessionStorage.getItem("vehicleType");
    vehicleTypeValue = storedType ? parseInt(storedType) : null;
    console.log(
      "Retrieved vehicle type from sessionStorage:",
      vehicleTypeValue
    );
  }

  // Log what we've found
  if (vehicleTypeValue === undefined || vehicleTypeValue === null) {
    console.error("Error: Missing vehicle type (Q0) value");
  } else {
    console.log("Using vehicle type value:", vehicleTypeValue);
  }

  // Set the vehicle type
  const isVL = vehicleTypeValue === 1;
  const vehicleType = isVL ? "Véhicule Léger (VL)" : "Poids Lourd (PL)";

  console.log(
    "Final vehicle determination - Is VL vehicle:",
    isVL,
    "Vehicle Type:",
    vehicleType,
    "Q0 value:",
    vehicleTypeValue
  );

  // Create answers object with basic info
  const orderedAnswers = {
    ID_questionnaire: uniqueId,
    firebase_timestamp: new Date().toISOString(),
    HEURE_DEBUT: startDate.value || "",
    DATE: now.toLocaleDateString("fr-FR").replace(/\//g, "-"),
    JOUR: [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ][now.getDay()],
    HEURE_FIN: now.toLocaleTimeString("fr-FR").slice(0, 5),
    ENQUETEUR: enqueteur.value,
    TYPE_VEHICULE: vehicleType,
    // Always include Q0 explicitly
    Q0: vehicleTypeValue,
    Q0_optionId: capturedQ0_optionId || vehicleTypeValue,
  };

  // Add Poste information if available
  const posteAnswer = surveyData.question_answers?.find(
    (qa) => qa.questionId === "Poste"
  );
  if (posteAnswer) {
    orderedAnswers.Poste = posteAnswer.optionIndex + 1; // Convert to 1-based index
    orderedAnswers.Poste_text = posteAnswer.optionText;
  } else if (selectedPoste.value) {
    // Fallback to selectedPoste if not in question_answers
    orderedAnswers.Poste_text = selectedPoste.value;
  }

  // Loop through all entries in captured surveyData
  for (const [key, value] of Object.entries(surveyData)) {
    // Skip already added fields, question_answers, and any _text fields
    if (
      key !== "question_answers" &&
      !["Q0", "Q0_optionId"].includes(key) &&
      !key.includes("_text") // Skip all _text fields
    ) {
      // Add to the orderedAnswers
      orderedAnswers[key] = value;
    }
  }

  // Use the captured question_answers if available, otherwise create it
  if (capturedQuestionAnswers.length > 0) {
    console.log(
      "Using existing question_answers:",
      capturedQuestionAnswers.length,
      "items"
    );

    // Make sure Q0 is included in question_answers if not already present
    const hasQ0 = capturedQuestionAnswers.some((qa) => qa.questionId === "Q0");

    if (!hasQ0 && vehicleTypeValue) {
      const q0Data = {
        questionId: "Q0",
        questionText: "Type de véhicule",
        optionId: vehicleTypeValue,
        optionText: vehicleType,
        optionIndex: vehicleTypeValue - 1,
      };
      capturedQuestionAnswers.unshift(q0Data);
    }

    orderedAnswers.question_answers = capturedQuestionAnswers;
  } else {
    console.log("No existing question_answers found, building from scratch");
    // Build question_answers array from all entries
    orderedAnswers.question_answers = [];

    // Always include Q0 (vehicle type) first if available
    if (vehicleTypeValue) {
      orderedAnswers.question_answers.push({
        questionId: "Q0",
        questionText: "Type de véhicule",
        optionId: vehicleTypeValue,
        optionText: vehicleType,
        optionIndex: vehicleTypeValue - 1,
      });
    }

    // Loop through all entries to build question_answers
    for (const [key, value] of Object.entries(surveyData)) {
      if (
        key !== "Q0" &&
        !key.includes("_text") &&
        !key.includes("_optionId") &&
        !key.includes("_precision") &&
        !key.includes("_CUSTOM")
      ) {
        // Find the question data
        const questionData = questions.find((q) => q.id === key);
        if (questionData) {
          // For option-based questions
          if (!questionData.freeText && questionData.options) {
            // Get the selected option (adjust for 1-based index)
            const selectedOptionIndex = value - 1;
            if (
              questionData.options &&
              selectedOptionIndex >= 0 &&
              selectedOptionIndex < questionData.options.length
            ) {
              const selectedOption = questionData.options[selectedOptionIndex];
              orderedAnswers.question_answers.push({
                questionId: key,
                questionText: questionData.text,
                optionId:
                  selectedOption.id || `option_${selectedOptionIndex + 1}`,
                optionText: selectedOption.text,
                optionIndex: selectedOptionIndex,
              });
            }
          }
          // For free text questions
          else if (questionData.freeText) {
            orderedAnswers.question_answers.push({
              questionId: key,
              questionText: questionData.text,
              optionId: "freetext",
              optionText: value,
              optionIndex: 0,
            });
          }
        }
      }
    }
  }

  try {
    // Log what we're about to save
    console.log("Saving survey data:", orderedAnswers);

    // Save to Firebase
    const docRef = await addDoc(surveyCollectionRef, orderedAnswers);

    // Store the Firestore document ID in our response
    console.log("Survey saved with ID:", uniqueId, "Firestore ID:", docRef.id);

    // Update the orderedAnswers with the Firestore ID - this will be part of the document in Firebase
    const updatedData = { firestore_id: docRef.id };
    await setDoc(docRef, updatedData, { merge: true });

    // Also log the document ID separately for easy copying
    console.log("DOCUMENT ID FOR REFERENCE:", docRef.id);
  } catch (error) {
    console.error("Error saving survey:", error);
  }
};

const resetSurvey = () => {
  // Clear any vehicle type in session storage
  sessionStorage.removeItem("vehicleType");

  // Reset step to start
  currentStep.value = "start";

  // Clear all times and answers - create a completely new object
  startDate.value = "";
  answers.value = { question_answers: [] };

  // Reset indices and paths to start with Poste question
  currentQuestionIndex.value = 0;
  questionPath.value = ["Poste"];

  // Reset all input fields
  freeTextAnswer.value = "";
  selectedCommune.value = "";
  postalCodePrefix.value = "";
  stationInput.value = "";
  streetInput.value = "";
  selectedPoste.value = null;

  // Clear completion state
  isSurveyComplete.value = false;

  // Clear filtered lists
  filteredStations.value = [];
  filteredStreets.value = [];

  console.log("Survey reset - ready for new questionnaire");
};

const getDocCount = async () => {
  try {
    const querySnapshot = await getDocs(surveyCollectionRef);
    docCount.value = querySnapshot.size;
  } catch (error) {
    console.error("Error getting document count:", error);
  }
};

const getNextId = async () => {
  const counterDoc = await getDoc(counterDocRef);
  let counter = 1;

  if (counterDoc.exists()) {
    counter = counterDoc.data().value + 1;
  }

  await setDoc(counterDocRef, { value: counter });

  return `-${counter.toString().padStart(6, "0")}`;
};

// Add this new debug method to check survey status at any time
const checkSurveyStatus = () => {
  console.log("===== SURVEY STATUS =====");
  console.log("Current step:", currentStep.value);
  console.log("Current question index:", currentQuestionIndex.value);
  console.log("Current question ID:", currentQuestion.value?.id);
  console.log("Question path:", questionPath.value);
  console.log("Vehicle type (Q0):", answers.value.Q0);
  console.log(
    "Vehicle type from sessionStorage:",
    sessionStorage.getItem("vehicleType")
  );
  console.log("Total answers count:", Object.keys(answers.value).length - 1); // -1 for question_answers array
  console.log(
    "Tracked responses in question_answers:",
    answers.value.question_answers?.length || 0
  );
  console.log("Is survey complete:", isSurveyComplete.value);
  console.log("========================");
};

// Call this at the beginning of selectAnswer to help with debugging
const debugBeforeAnswer = (questionId, option, index) => {
  console.log(`----- Before answering ${questionId} -----`);
  console.log(`Current question: ${questionId}`);
  console.log(
    `Selected option: ${option.text} (index: ${index}, value: ${index + 1})`
  );
  console.log(
    `Current answers: `,
    Object.keys(answers.value).filter((k) => k !== "question_answers")
  );
  console.log(`Question path: ${questionPath.value.join(" -> ")}`);
};

// Lifecycle hooks
onMounted(() => {
  getDocCount();
});
</script>


<style>
/* Base styles */
body {
  background-color: #2a3b63;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #2a3b63;
  color: white;
}

.content-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5% 0;
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
  box-sizing: border-box;
  overflow-y: auto;
}

.question-container {
  width: 100%;
  margin-bottom: 30px;
}

.input-container,
.station-input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
}

.form-control {
  width: 100%;
  max-width: 400px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid white;
  background-color: #333;
  color: white;
  font-size: 16px;
  margin-bottom: 15px;
}

.btn-next,
.btn-return,
.btn-option,
.btn-pdf {
  width: 100%;
  max-width: 400px;
  color: white;
  padding: 15px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.btn-next {
  background-color: green;
}

.btn-return {
  background-color: grey;
  margin-top: 30px;
}

.btn-option {
  background-color: #4a5a83;
  text-align: left;
}

.btn-pdf {
  background-color: #3498db;
  margin: 15px auto;
  display: block;
}

.commune-dropdown {
  position: relative;
  width: 100%;
  max-width: 400px;
  max-height: 200px;
  overflow-y: auto;
  background-color: #333;
  border: 1px solid #666;
  border-radius: 5px;
  z-index: 1000;
  margin: -10px auto 15px;
  padding: 0;
  list-style: none;
}

.commune-option {
  padding: 10px;
  cursor: pointer;
  color: white;
  border-bottom: 1px solid #444;
}

.commune-option:hover {
  background-color: #444;
}

.station-input-container {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.logo {
  max-width: 25%;
  height: auto;
  margin-top: 40px;
  margin-bottom: 20px;
}

.footer {
  background: linear-gradient(to right, #4c4faf, #3f51b5);
  padding: 20px;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
}

.progress {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.3s ease-in-out;
}

@media screen and (max-width: 480px) {
  .commune-dropdown {
    width: 90%;
    left: 50%;
    transform: translateX(-50%);
  }

  .form-control {
    max-width: 90%;
  }
}

.modal {
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #1a1a1a;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #1a1a1a;
}

.pdf-content {
  width: 100%;
  height: 100%;
  position: relative;
}

.pdf-content iframe {
  border: none;
  width: 100%;
  height: 100%;
  background: white;
}

.close {
  position: fixed;
  right: 20px;
  top: 20px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 10000;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.close::before,
.close::after {
  content: "";
  position: absolute;
  width: 24px;
  height: 2px;
  background-color: white;
  transform-origin: center;
}

.close::before {
  transform: rotate(45deg);
}

.close::after {
  transform: rotate(-45deg);
}

.close:hover {
  opacity: 1;
}

@media screen and (min-width: 768px) {
  .modal {
    padding: 40px;
  }

  .modal-content {
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>
