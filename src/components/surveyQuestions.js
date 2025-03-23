export const questions = [
	{
		id: "Poste",
		text: "Poste",
		options: [
			{ id: 1, text: "Poste 1 :  route de Tarzan nord", next: "Q0" },
			{ id: 2, text: "Poste 2 : route de Tarzan sud", next: "Q0" },
			{ id: 3, text: "Poste 3 : route des Encens ouest", next: "Q0" },
			{ id: 4, text: "Poste 4 : route des Encens est", next: "Q0" },
			{ id: 5, text: "Poste 5 : route de Suzini nord", next: "Q0" },
			{ id: 6, text: "Poste 6 : route de Suzini sud", next: "Q0" },
		],
	},
	{
		id: "Q0",
		text: "Type de véhicule",
		options: [
			{ id: 1, text: "Véhicule Léger (VL)", next: "Q1_VL" },
			{ id: 2, text: "Poids Lourd (PL)", next: "Q1_PL" },
		],
	},
	// Questions pour les Véhicules Légers (VL)
	{
		id: "Q1_VL",
		text: "Quelle est l'origine de votre déplacement ?",
		options: [
			{ id: 1, text: "Cayenne", next: "Q1a_VL_Cayenne" },
			{ id: 2, text: "Remire-Montjoly", next: "Q1a_VL_Remire" },
			{ id: 3, text: "Matoury", next: "Q1a_VL_Matoury" },
			{ id: 4, text: "Apatou", next: "Q2_VL" },
			{ id: 5, text: "Awala-Yalimapo", next: "Q2_VL" },
			{ id: 6, text: "Camopi", next: "Q2_VL" },
			{ id: 7, text: "Grand-Santi", next: "Q2_VL" },
			{ id: 8, text: "Iracoubo", next: "Q2_VL" },
			{ id: 9, text: "Kourou", next: "Q2_VL" },
			{ id: 10, text: "Macouria", next: "Q2_VL" },
			{ id: 11, text: "Mana", next: "Q2_VL" },
			{ id: 12, text: "Maripasoula", next: "Q2_VL" },
			{ id: 13, text: "Montsinery-Tonnegrande", next: "Q2_VL" },
			{ id: 14, text: "Ouanary", next: "Q2_VL" },
			{ id: 15, text: "Papaichton", next: "Q2_VL" },
			{ id: 16, text: "Regina", next: "Q2_VL" },
			{ id: 17, text: "Roura", next: "Q2_VL" },
			{ id: 18, text: "Saint-Elie", next: "Q2_VL" },
			{ id: 19, text: "Saint-Georges", next: "Q2_VL" },
			{ id: 20, text: "Saint-Laurent-du-Maroni", next: "Q2_VL" },
			{ id: 21, text: "Saul", next: "Q2_VL" },
			{ id: 22, text: "Sinnamary", next: "Q2_VL" },
			{ id: 23, text: "Autre commune", next: "Q1_VL_precision", requiresPrecision: true },
		],
	},
	{
		id: "Q1_VL_precision",
		text: "Préciser le nom de la commune :",
		freeText: true,
		next: "Q2_VL",
	},
	{
		id: "Q1a_VL_Cayenne",
		text: "Préciser le quartier à Cayenne :",
		options: [
			{ id: 1, text: "Anatole", next: "Q2_VL" },
			{ id: 2, text: "Bonhomme", next: "Q2_VL" },
			{ id: 3, text: "Buzaret", next: "Q2_VL" },
			{ id: 4, text: "Cabassou", next: "Q2_VL" },
			{ id: 5, text: "Chatenay", next: "Q2_VL" },
			{ id: 6, text: "de Gaulle", next: "Q2_VL" },
			{ id: 7, text: "Eau Lisette", next: "Q2_VL" },
			{ id: 8, text: "Galmot", next: "Q2_VL" },
			{ id: 9, text: "La Madeleine", next: "Q2_VL" },
			{ id: 10, text: "Leblond", next: "Q2_VL" },
			{ id: 11, text: "Les Amandiers", next: "Q2_VL" },
			{ id: 12, text: "Mango", next: "Q2_VL" },
			{ id: 13, text: "Mirza", next: "Q2_VL" },
			{ id: 14, text: "Mont Baduel", next: "Q2_VL" },
			{ id: 15, text: "Mont Lucas", next: "Q2_VL" },
			{ id: 16, text: "Montabo", next: "Q2_VL" },
			{ id: 17, text: "Palmistes", next: "Q2_VL" },
			{ id: 18, text: "Themire", next: "Q2_VL" },
			{ id: 19, text: "Troubiran-Bourda", next: "Q2_VL" },
			{ id: 20, text: "Zephir", next: "Q2_VL" },
			{ id: 21, text: "Zone Collery", next: "Q2_VL" },
			{ id: 22, text: "Autre", next: "Q1a_VL_precision", requiresPrecision: true },
		],
	},
	{
		id: "Q1a_VL_Remire",
		text: "Préciser le quartier à Remire-Montjoly :",
		options: [
			{ id: 1, text: "Les Ames Claires", next: "Q2_VL" },
			{ id: 2, text: "Mahury-Degrad des Cannes", next: "Q2_VL" },
			{ id: 3, text: "Montjoly-Plage", next: "Q2_VL" },
			{ id: 4, text: "Morne Coco-Bp134", next: "Q2_VL" },
			{ id: 5, text: "Moulin a Vent", next: "Q2_VL" },
			{ id: 6, text: "Remire", next: "Q2_VL" },
			{ id: 7, text: "Autre", next: "Q1a_VL_precision", requiresPrecision: true },
		],
	},
	{
		id: "Q1a_VL_Matoury",
		text: "Préciser le quartier à Matoury :",
		options: [
			{ id: 1, text: "Le Grand Larivot", next: "Q2_VL" },
			{ id: 2, text: "Sud Bourg", next: "Q2_VL" },
			{ id: 3, text: "Cogneau Est", next: "Q2_VL" },
			{ id: 4, text: "Centre Bourg", next: "Q2_VL" },
			{ id: 5, text: "Balata", next: "Q2_VL" },
			{ id: 6, text: "Stoupan", next: "Q2_VL" },
			{ id: 7, text: "La Desire-Rochambeau", next: "Q2_VL" },
			{ id: 8, text: "Chaumiere", next: "Q2_VL" },
			{ id: 9, text: "Autre", next: "Q1a_VL_precision", requiresPrecision: true },
		],
	},
	{
		id: "Q1a_VL_precision",
		text: "Préciser le nom du quartier :",
		freeText: true,
		next: "Q2_VL",
	},
	{
		id: "Q2_VL",
		text: "Quel est le motif à l'origine de votre déplacement ?",
		options: [
			{ id: 1, text: "Domicile", next: "Q3_VL" },
			{ id: 2, text: "Travail", next: "Q3_VL" },
			{ id: 3, text: "Affaires professionnelles", next: "Q3_VL" },
			{ id: 4, text: "Loisirs", next: "Q3_VL" },
			{ id: 5, text: "Écoles/études", next: "Q3_VL" },
			{ id: 6, text: "Autre", next: "Q2_VL_precision", requiresPrecision: true },
		],
	},
	{
		id: "Q2_VL_precision",
		text: "Préciser le motif :",
		freeText: true,
		next: "Q3_VL",
	},
	{
		id: "Q3_VL",
		text: "Quelle est la destination de votre déplacement ?",
		options: [
			{ id: 1, text: "Cayenne", next: "Q3a_VL_Cayenne" },
			{ id: 2, text: "Remire-Montjoly", next: "Q3a_VL_Remire" },
			{ id: 3, text: "Matoury", next: "Q3a_VL_Matoury" },
			{ id: 4, text: "Apatou", next: "Q4_VL" },
			{ id: 5, text: "Awala-Yalimapo", next: "Q4_VL" },
			{ id: 6, text: "Camopi", next: "Q4_VL" },
			{ id: 7, text: "Grand-Santi", next: "Q4_VL" },
			{ id: 8, text: "Iracoubo", next: "Q4_VL" },
			{ id: 9, text: "Kourou", next: "Q4_VL" },
			{ id: 10, text: "Macouria", next: "Q4_VL" },
			{ id: 11, text: "Mana", next: "Q4_VL" },
			{ id: 12, text: "Maripasoula", next: "Q4_VL" },
			{ id: 13, text: "Montsinery-Tonnegrande", next: "Q4_VL" },
			{ id: 14, text: "Ouanary", next: "Q4_VL" },
			{ id: 15, text: "Papaichton", next: "Q4_VL" },
			{ id: 16, text: "Regina", next: "Q4_VL" },
			{ id: 17, text: "Roura", next: "Q4_VL" },
			{ id: 18, text: "Saint-Elie", next: "Q4_VL" },
			{ id: 19, text: "Saint-Georges", next: "Q4_VL" },
			{ id: 20, text: "Saint-Laurent-du-Maroni", next: "Q4_VL" },
			{ id: 21, text: "Saul", next: "Q4_VL" },
			{ id: 22, text: "Sinnamary", next: "Q4_VL" },
			{ id: 23, text: "Autre commune", next: "Q3_VL_precision", requiresPrecision: true },
		],
	},
	{
		id: "Q3_VL_precision",
		text: "Préciser le nom de la commune :",
		freeText: true,
		next: "Q4_VL",
	},
	{
		id: "Q3a_VL_Cayenne",
		text: "Préciser le quartier à Cayenne :",
		options: [
			{ id: 1, text: "Anatole", next: "Q4_VL" },
			{ id: 2, text: "Bonhomme", next: "Q4_VL" },
			{ id: 3, text: "Buzaret", next: "Q4_VL" },
			{ id: 4, text: "Cabassou", next: "Q4_VL" },
			{ id: 5, text: "Chatenay", next: "Q4_VL" },
			{ id: 6, text: "de Gaulle", next: "Q4_VL" },
			{ id: 7, text: "Eau Lisette", next: "Q4_VL" },
			{ id: 8, text: "Galmot", next: "Q4_VL" },
			{ id: 9, text: "La Madeleine", next: "Q4_VL" },
			{ id: 10, text: "Leblond", next: "Q4_VL" },
			{ id: 11, text: "Les Amandiers", next: "Q4_VL" },
			{ id: 12, text: "Mango", next: "Q4_VL" },
			{ id: 13, text: "Mirza", next: "Q4_VL" },
			{ id: 14, text: "Mont Baduel", next: "Q4_VL" },
			{ id: 15, text: "Mont Lucas", next: "Q4_VL" },
			{ id: 16, text: "Montabo", next: "Q4_VL" },
			{ id: 17, text: "Palmistes", next: "Q4_VL" },
			{ id: 18, text: "Themire", next: "Q4_VL" },
			{ id: 19, text: "Troubiran-Bourda", next: "Q4_VL" },
			{ id: 20, text: "Zephir", next: "Q4_VL" },
			{ id: 21, text: "Zone Collery", next: "Q4_VL" },
			{ id: 22, text: "Autre", next: "Q3a_VL_precision", requiresPrecision: true },
		],
	},
	{
		id: "Q3a_VL_Remire",
		text: "Préciser le quartier à Remire-Montjoly :",
		options: [
			{ id: 1, text: "Les Ames Claires", next: "Q4_VL" },
			{ id: 2, text: "Mahury-Degrad des Cannes", next: "Q4_VL" },
			{ id: 3, text: "Montjoly-Plage", next: "Q4_VL" },
			{ id: 4, text: "Morne Coco-Bp134", next: "Q4_VL" },
			{ id: 5, text: "Moulin a Vent", next: "Q4_VL" },
			{ id: 6, text: "Remire", next: "Q4_VL" },
			{ id: 7, text: "Autre", next: "Q3a_VL_precision", requiresPrecision: true },
		],
	},
	{
		id: "Q3a_VL_Matoury",
		text: "Préciser le quartier à Matoury :",
		options: [
			{ id: 1, text: "Le Grand Larivot", next: "Q4_VL" },
			{ id: 2, text: "Sud Bourg", next: "Q4_VL" },
			{ id: 3, text: "Cogneau Est", next: "Q4_VL" },
			{ id: 4, text: "Centre Bourg", next: "Q4_VL" },
			{ id: 5, text: "Balata", next: "Q4_VL" },
			{ id: 6, text: "Stoupan", next: "Q4_VL" },
			{ id: 7, text: "La Desire-Rochambeau", next: "Q4_VL" },
			{ id: 8, text: "Chaumiere", next: "Q4_VL" },
			{ id: 9, text: "Autre", next: "Q3a_VL_precision", requiresPrecision: true },
		],
	},
	{
		id: "Q3a_VL_precision",
		text: "Préciser le nom du quartier :",
		freeText: true,
		next: "Q4_VL",
	},
	{
		id: "Q4_VL",
		text: "Quel est le motif à la destination de votre déplacement ?",
		options: [
			{ id: 1, text: "Domicile", next: "Q5_VL" },
			{ id: 2, text: "Travail", next: "Q5_VL" },
			{ id: 3, text: "Affaires professionnelles", next: "Q5_VL" },
			{ id: 4, text: "Loisirs", next: "Q5_VL" },
			{ id: 5, text: "Écoles/études", next: "Q5_VL" },
			{ id: 6, text: "Autre", next: "Q4_VL_precision", requiresPrecision: true },
		],
	},
	{
		id: "Q4_VL_precision",
		text: "Préciser le motif :",
		freeText: true,
		next: "Q5_VL",
	},
	{
		id: "Q5_VL",
		text: "À quelle fréquence réalisez-vous ce déplacement ?",
		options: [
			{ id: 1, text: "Tous les jours ou presque", next: "end" },
			{ id: 2, text: "1 à 2 fois par semaine", next: "end" },
			{ id: 3, text: "1 à 2 fois par mois", next: "end" },
			{ id: 4, text: "Rarement", next: "end" },
			{ id: 5, text: "C'est la première fois", next: "end" },
		],
	},

	// Questions pour les Poids Lourds (PL)
	{
		id: "Q1_PL",
		text: "Quelle est l'origine de votre déplacement ? (dernier point d'arrêt pour chargement, déchargement ou entrepôt)",
		options: [
			{ id: 1, text: "Cayenne", next: "Q1a_PL_Cayenne" },
			{ id: 2, text: "Remire-Montjoly", next: "Q1a_PL_Remire" },
			{ id: 3, text: "Matoury", next: "Q1a_PL_Matoury" },
			{ id: 4, text: "Apatou", next: "Q2_PL" },
			{ id: 5, text: "Awala-Yalimapo", next: "Q2_PL" },
			{ id: 6, text: "Camopi", next: "Q2_PL" },
			{ id: 7, text: "Grand-Santi", next: "Q2_PL" },
			{ id: 8, text: "Iracoubo", next: "Q2_PL" },
			{ id: 9, text: "Kourou", next: "Q2_PL" },
			{ id: 10, text: "Macouria", next: "Q2_PL" },
			{ id: 11, text: "Mana", next: "Q2_PL" },
			{ id: 12, text: "Maripasoula", next: "Q2_PL" },
			{ id: 13, text: "Montsinery-Tonnegrande", next: "Q2_PL" },
			{ id: 14, text: "Ouanary", next: "Q2_PL" },
			{ id: 15, text: "Papaichton", next: "Q2_PL" },
			{ id: 16, text: "Regina", next: "Q2_PL" },
			{ id: 17, text: "Roura", next: "Q2_PL" },
			{ id: 18, text: "Saint-Elie", next: "Q2_PL" },
			{ id: 19, text: "Saint-Georges", next: "Q2_PL" },
			{ id: 20, text: "Saint-Laurent-du-Maroni", next: "Q2_PL" },
			{ id: 21, text: "Saul", next: "Q2_PL" },
			{ id: 22, text: "Sinnamary", next: "Q2_PL" },
			{ id: 23, text: "Autre commune", next: "Q1_PL_precision", requiresPrecision: true },
		],
	},
	{
		id: "Q1_PL_precision",
		text: "Préciser le nom de la commune :",
		freeText: true,
		next: "Q2_PL",
	},
	{
		id: "Q1a_PL_Cayenne",
		text: "Préciser le quartier à Cayenne :",
		options: [
			{ id: 1, text: "Anatole", next: "Q2_PL" },
			{ id: 2, text: "Bonhomme", next: "Q2_PL" },
			{ id: 3, text: "Buzaret", next: "Q2_PL" },
			{ id: 4, text: "Cabassou", next: "Q2_PL" },
			{ id: 5, text: "Chatenay", next: "Q2_PL" },
			{ id: 6, text: "de Gaulle", next: "Q2_PL" },
			{ id: 7, text: "Eau Lisette", next: "Q2_PL" },
			{ id: 8, text: "Galmot", next: "Q2_PL" },
			{ id: 9, text: "La Madeleine", next: "Q2_PL" },
			{ id: 10, text: "Leblond", next: "Q2_PL" },
			{ id: 11, text: "Les Amandiers", next: "Q2_PL" },
			{ id: 12, text: "Mango", next: "Q2_PL" },
			{ id: 13, text: "Mirza", next: "Q2_PL" },
			{ id: 14, text: "Mont Baduel", next: "Q2_PL" },
			{ id: 15, text: "Mont Lucas", next: "Q2_PL" },
			{ id: 16, text: "Montabo", next: "Q2_PL" },
			{ id: 17, text: "Palmistes", next: "Q2_PL" },
			{ id: 18, text: "Themire", next: "Q2_PL" },
			{ id: 19, text: "Troubiran-Bourda", next: "Q2_PL" },
			{ id: 20, text: "Zephir", next: "Q2_PL" },
			{ id: 21, text: "Zone Collery", next: "Q2_PL" },
			{ id: 22, text: "Autre", next: "Q1a_PL_precision", requiresPrecision: true },
		],
	},
	{
		id: "Q1a_PL_Remire",
		text: "Préciser le quartier à Remire-Montjoly :",
		options: [
			{ id: 1, text: "Les Ames Claires", next: "Q2_PL" },
			{ id: 2, text: "Mahury-Degrad des Cannes", next: "Q2_PL" },
			{ id: 3, text: "Montjoly-Plage", next: "Q2_PL" },
			{ id: 4, text: "Morne Coco-Bp134", next: "Q2_PL" },
			{ id: 5, text: "Moulin a Vent", next: "Q2_PL" },
			{ id: 6, text: "Remire", next: "Q2_PL" },
			{ id: 7, text: "Autre", next: "Q1a_PL_precision", requiresPrecision: true },
		],
	},
	{
		id: "Q1a_PL_Matoury",
		text: "Préciser le quartier à Matoury :",
		options: [
			{ id: 1, text: "Le Grand Larivot", next: "Q2_PL" },
			{ id: 2, text: "Sud Bourg", next: "Q2_PL" },
			{ id: 3, text: "Cogneau Est", next: "Q2_PL" },
			{ id: 4, text: "Centre Bourg", next: "Q2_PL" },
			{ id: 5, text: "Balata", next: "Q2_PL" },
			{ id: 6, text: "Stoupan", next: "Q2_PL" },
			{ id: 7, text: "La Desire-Rochambeau", next: "Q2_PL" },
			{ id: 8, text: "Chaumiere", next: "Q2_PL" },
			{ id: 9, text: "Autre", next: "Q1a_PL_precision", requiresPrecision: true },
		],
	},
	{
		id: "Q1a_PL_precision",
		text: "Préciser le nom du quartier :",
		freeText: true,
		next: "Q2_PL",
	},
	{
		id: "Q2_PL",
		text: "Quelle est la destination de votre déplacement ? (prochain point d'arrêt pour chargement, déchargement ou entrepôt)",
		options: [
			{ id: 1, text: "Cayenne", next: "Q2a_PL_Cayenne" },
			{ id: 2, text: "Remire-Montjoly", next: "Q2a_PL_Remire" },
			{ id: 3, text: "Matoury", next: "Q2a_PL_Matoury" },
			{ id: 4, text: "Apatou", next: "Q3_PL" },
			{ id: 5, text: "Awala-Yalimapo", next: "Q3_PL" },
			{ id: 6, text: "Camopi", next: "Q3_PL" },
			{ id: 7, text: "Grand-Santi", next: "Q3_PL" },
			{ id: 8, text: "Iracoubo", next: "Q3_PL" },
			{ id: 9, text: "Kourou", next: "Q3_PL" },
			{ id: 10, text: "Macouria", next: "Q3_PL" },
			{ id: 11, text: "Mana", next: "Q3_PL" },
			{ id: 12, text: "Maripasoula", next: "Q3_PL" },
			{ id: 13, text: "Montsinery-Tonnegrande", next: "Q3_PL" },
			{ id: 14, text: "Ouanary", next: "Q3_PL" },
			{ id: 15, text: "Papaichton", next: "Q3_PL" },
			{ id: 16, text: "Regina", next: "Q3_PL" },
			{ id: 17, text: "Roura", next: "Q3_PL" },
			{ id: 18, text: "Saint-Elie", next: "Q3_PL" },
			{ id: 19, text: "Saint-Georges", next: "Q3_PL" },
			{ id: 20, text: "Saint-Laurent-du-Maroni", next: "Q3_PL" },
			{ id: 21, text: "Saul", next: "Q3_PL" },
			{ id: 22, text: "Sinnamary", next: "Q3_PL" },
			{ id: 23, text: "Autre commune", next: "Q2_PL_precision", requiresPrecision: true },
		],
	},
	{
		id: "Q2_PL_precision",
		text: "Préciser le nom de la commune :",
		freeText: true,
		next: "Q3_PL",
	},
	{
		id: "Q2a_PL_Cayenne",
		text: "Préciser le quartier à Cayenne :",
		options: [
			{ id: 1, text: "Anatole", next: "Q3_PL" },
			{ id: 2, text: "Bonhomme", next: "Q3_PL" },
			{ id: 3, text: "Buzaret", next: "Q3_PL" },
			{ id: 4, text: "Cabassou", next: "Q3_PL" },
			{ id: 5, text: "Chatenay", next: "Q3_PL" },
			{ id: 6, text: "de Gaulle", next: "Q3_PL" },
			{ id: 7, text: "Eau Lisette", next: "Q3_PL" },
			{ id: 8, text: "Galmot", next: "Q3_PL" },
			{ id: 9, text: "La Madeleine", next: "Q3_PL" },
			{ id: 10, text: "Leblond", next: "Q3_PL" },
			{ id: 11, text: "Les Amandiers", next: "Q3_PL" },
			{ id: 12, text: "Mango", next: "Q3_PL" },
			{ id: 13, text: "Mirza", next: "Q3_PL" },
			{ id: 14, text: "Mont Baduel", next: "Q3_PL" },
			{ id: 15, text: "Mont Lucas", next: "Q3_PL" },
			{ id: 16, text: "Montabo", next: "Q3_PL" },
			{ id: 17, text: "Palmistes", next: "Q3_PL" },
			{ id: 18, text: "Themire", next: "Q3_PL" },
			{ id: 19, text: "Troubiran-Bourda", next: "Q3_PL" },
			{ id: 20, text: "Zephir", next: "Q3_PL" },
			{ id: 21, text: "Zone Collery", next: "Q3_PL" },
			{ id: 22, text: "Autre", next: "Q2a_PL_precision", requiresPrecision: true },
		],
	},
	{
		id: "Q2a_PL_Remire",
		text: "Préciser le quartier à Remire-Montjoly :",
		options: [
			{ id: 1, text: "Les Ames Claires", next: "Q3_PL" },
			{ id: 2, text: "Mahury-Degrad des Cannes", next: "Q3_PL" },
			{ id: 3, text: "Montjoly-Plage", next: "Q3_PL" },
			{ id: 4, text: "Morne Coco-Bp134", next: "Q3_PL" },
			{ id: 5, text: "Moulin a Vent", next: "Q3_PL" },
			{ id: 6, text: "Remire", next: "Q3_PL" },
			{ id: 7, text: "Autre", next: "Q2a_PL_precision", requiresPrecision: true },
		],
	},
	{
		id: "Q2a_PL_Matoury",
		text: "Préciser le quartier à Matoury :",
		options: [
			{ id: 1, text: "Le Grand Larivot", next: "Q3_PL" },
			{ id: 2, text: "Sud Bourg", next: "Q3_PL" },
			{ id: 3, text: "Cogneau Est", next: "Q3_PL" },
			{ id: 4, text: "Centre Bourg", next: "Q3_PL" },
			{ id: 5, text: "Balata", next: "Q3_PL" },
			{ id: 6, text: "Stoupan", next: "Q3_PL" },
			{ id: 7, text: "La Desire-Rochambeau", next: "Q3_PL" },
			{ id: 8, text: "Chaumiere", next: "Q3_PL" },
			{ id: 9, text: "Autre", next: "Q2a_PL_precision", requiresPrecision: true },
		],
	},
	{
		id: "Q2a_PL_precision",
		text: "Préciser le nom du quartier :",
		freeText: true,
		next: "Q3_PL",
	},
	{
		id: "Q3_PL",
		text: "À quelle fréquence réalisez-vous ce déplacement ?",
		options: [
			{ id: 1, text: "Tous les jours ou presque", next: "end" },
			{ id: 2, text: "1 à 2 fois par semaine", next: "end" },
			{ id: 3, text: "1 à 2 fois par mois", next: "end" },
			{ id: 4, text: "Rarement", next: "end" },
			{ id: 5, text: "C'est la première fois", next: "end" }
		],
	}
];