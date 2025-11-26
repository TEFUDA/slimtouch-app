import React, { useState, useEffect } from 'react';
import { Calendar, Users, Camera, CreditCard, Package, Settings, Home, Plus, Search, ChevronRight, Clock, MapPin, Phone, Mail, Euro, TrendingUp, CheckCircle, AlertCircle, X, Edit, Trash2, Eye, Upload, Save, Bell, Menu, User, LogOut, Filter, BarChart3, Target, Award, Zap, Play, BookOpen, Video, Moon, Sun, UserPlus, UserMinus, RefreshCw, Shield, Lock, Unlock, Share2, Download, MessageCircle, Send, FileText, Image, Smartphone, ExternalLink, Receipt, Repeat, AlertTriangle, PieChart, TrendingDown, Star, Trophy, Medal, Flame, Gift, Crown, ThumbsUp, XCircle, CalendarCheck, History, BellRing } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPie, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// ============================================
// API AIRTABLE VIA N8N
// ============================================

const API_BASE_URL = 'https://n8n.srv819641.hstgr.cloud/webhook';

// Récupérer toutes les clientes
const fetchClientes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/app-get-clientes`);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Erreur fetchClientes:', error);
    return [];
  }
};

// Récupérer tous les RDV
const fetchRdvs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/app-get-rdvs`);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Erreur fetchRdvs:', error);
    return [];
  }
};

// Créer une nouvelle cliente
const apiCreateCliente = async (clienteData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/app-create-cliente`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clienteData),
    });
    return await response.json();
  } catch (error) {
    console.error('Erreur apiCreateCliente:', error);
    throw error;
  }
};

// Créer un nouveau RDV
const apiCreateRdv = async (rdvData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/app-create-rdv`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rdvData),
    });
    return await response.json();
  } catch (error) {
    console.error('Erreur apiCreateRdv:', error);
    throw error;
  }
};

// Mettre à jour une cliente
const apiUpdateCliente = async (clienteId, clienteData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/app-update-cliente`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: clienteId, ...clienteData }),
    });
    return await response.json();
  } catch (error) {
    console.error('Erreur apiUpdateCliente:', error);
    throw error;
  }
};

// Mettre à jour un RDV
const apiUpdateRdv = async (rdvId, rdvData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/app-update-rdv`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: rdvId, ...rdvData }),
    });
    return await response.json();
  } catch (error) {
    console.error('Erreur apiUpdateRdv:', error);
    throw error;
  }
};

// Supprimer une cliente
const apiDeleteCliente = async (clienteId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/app-delete-cliente`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: clienteId }),
    });
    return await response.json();
  } catch (error) {
    console.error('Erreur apiDeleteCliente:', error);
    throw error;
  }
};

// Supprimer un RDV
const apiDeleteRdv = async (rdvId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/app-delete-rdv`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: rdvId }),
    });
    return await response.json();
  } catch (error) {
    console.error('Erreur apiDeleteRdv:', error);
    throw error;
  }
};

// ============================================
// NOUVELLES API
// ============================================

// VENTES
const fetchVentes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/app-get-ventes`);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Erreur fetchVentes:', error);
    return [];
  }
};

const apiCreateVente = async (venteData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/app-create-vente`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(venteData),
    });
    return await response.json();
  } catch (error) {
    console.error('Erreur apiCreateVente:', error);
    throw error;
  }
};

// ÉQUIPE
const fetchEquipe = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/app-get-equipe`);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Erreur fetchEquipe:', error);
    return [];
  }
};

const apiCreateEmploye = async (employeData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/app-create-employe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employeData),
    });
    return await response.json();
  } catch (error) {
    console.error('Erreur apiCreateEmploye:', error);
    throw error;
  }
};

const apiUpdateEmploye = async (employeId, employeData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/app-update-employe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: employeId, ...employeData }),
    });
    return await response.json();
  } catch (error) {
    console.error('Erreur apiUpdateEmploye:', error);
    throw error;
  }
};

const apiDeleteEmploye = async (employeId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/app-delete-employe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: employeId }),
    });
    return await response.json();
  } catch (error) {
    console.error('Erreur apiDeleteEmploye:', error);
    throw error;
  }
};

// MESSAGES
const fetchMessages = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/app-get-messages`);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Erreur fetchMessages:', error);
    return [];
  }
};

const apiCreateMessage = async (messageData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/app-create-message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageData),
    });
    return await response.json();
  } catch (error) {
    console.error('Erreur apiCreateMessage:', error);
    throw error;
  }
};

const apiUpdateMessage = async (messageId, messageData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/app-update-message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: messageId, ...messageData }),
    });
    return await response.json();
  } catch (error) {
    console.error('Erreur apiUpdateMessage:', error);
    throw error;
  }
};

// STOCKS
const fetchStocks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/app-get-stocks`);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Erreur fetchStocks:', error);
    return [];
  }
};

const apiUpdateStock = async (stockId, stockData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/app-update-stock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: stockId, ...stockData }),
    });
    return await response.json();
  } catch (error) {
    console.error('Erreur apiUpdateStock:', error);
    throw error;
  }
};

// PRODUITS
const fetchProduits = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/app-get-produits`);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Erreur fetchProduits:', error);
    return [];
  }
};

// PARRAINAGES
const fetchParrainages = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/app-get-parrainages`);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Erreur fetchParrainages:', error);
    return [];
  }
};

const apiCreateParrainage = async (parrainageData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/app-create-parrainage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parrainageData),
    });
    return await response.json();
  } catch (error) {
    console.error('Erreur apiCreateParrainage:', error);
    throw error;
  }
};

// OBJECTIFS
const fetchObjectifs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/app-get-objectifs`);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Erreur fetchObjectifs:', error);
    return [];
  }
};

const apiUpdateObjectifs = async (objectifId, objectifData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/app-update-objectifs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: objectifId, ...objectifData }),
    });
    return await response.json();
  } catch (error) {
    console.error('Erreur apiUpdateObjectifs:', error);
    throw error;
  }
};

// PHOTOS
const apiUpdatePhotos = async (clienteId, photosData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/app-update-photos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clienteId, ...photosData }),
    });
    return await response.json();
  } catch (error) {
    console.error('Erreur apiUpdatePhotos:', error);
    throw error;
  }
};

// ============================================
// DONNÉES DE DÉMO
// ============================================

const DEMO_EMPLOYEES = [
  { 
    id: 1, 
    nom: 'Inès Gros-Flandre', 
    role: 'Directrice', 
    email: 'ines@slimtouch.fr', 
    telephone: '06 XX XX XX XX',
    password: 'inesamiens',
    actif: true, 
    isDirector: true,
    dateEmbauche: '2025-01-01',
    photo: null
  },
  { 
    id: 2, 
    nom: 'Julie Martin', 
    role: 'Praticienne', 
    email: 'julie@slimtouch.fr',
    telephone: '06 11 22 33 44', 
    password: 'julie123',
    actif: true, 
    isDirector: false,
    dateEmbauche: '2025-03-15',
    onboardingComplete: true,
    photo: null
  },
  { 
    id: 3, 
    nom: 'Emma Dubois', 
    role: 'Praticienne', 
    email: 'emma@slimtouch.fr',
    telephone: '06 55 66 77 88', 
    password: 'emma123',
    actif: true, 
    isDirector: false,
    dateEmbauche: '2025-06-01',
    onboardingComplete: false,
    photo: null
  },
];

const DEMO_CLIENTS = [
  {
    id: 1,
    nom: 'Marie Dupont',
    telephone: '06 12 34 56 78',
    email: 'marie.dupont@email.com',
    adresse: '15 Rue des Lilas, 80000 Amiens',
    poidsInitial: 78,
    poidsActuel: 72,
    objectif: 70,
    forfait: 'Transformation Express',
    seancesRestantes: 4,
    seancesTotal: 10,
    prochainRdv: '2025-11-26T14:00',
    assignedTo: 2, // Julie
    photos: [
      { date: '2025-11-01', type: 'avant', url: '/photo1.jpg' },
      { date: '2025-11-15', type: 'pendant', url: '/photo2.jpg' }
    ],
    mesures: [
      { id: 1, date: '2025-11-01', tour_taille: 92, tour_hanches: 108, tour_cuisses: 62 },
      { id: 2, date: '2025-11-15', tour_taille: 88, tour_hanches: 105, tour_cuisses: 60 }
    ],
    notes: 'Zone à cibler : ventre et hanches. Très motivée.',
    suivis: [
      { id: 1, date: '2025-11-15', visibleToDirector: true, employeeId: 2, note: 'Bonne séance, cliente très réceptive. Zone abdominale bien travaillée.', duree: 45 },
      { id: 2, date: '2025-11-08', visibleToDirector: true, employeeId: 2, note: 'Première séance du programme. Expliqué le protocole complet.', duree: 60 }
    ],
    paiements: [
      { id: 1, date: '2025-11-01', montant: 690, methode: 'CB', statut: 'payé', type: 'complet', factureNumero: 'F2025-001', employeeId: 2 }
    ],
    statut: 'active'
  },
  {
    id: 2,
    nom: 'Sophie Martin',
    telephone: '06 98 76 54 32',
    email: 'sophie.m@email.com',
    adresse: '8 Avenue Jean Jaurès, 80000 Amiens',
    poidsInitial: 85,
    poidsActuel: 85,
    objectif: 77,
    forfait: 'Sculptage Zones',
    seancesRestantes: 5,
    seancesTotal: 5,
    prochainRdv: '2025-11-27T10:00',
    assignedTo: 2, // Julie
    photos: [],
    mesures: [],
    notes: 'Premier contact, intéressée par le programme complet si résultats.',
    suivis: [],
    paiements: [
      { id: 2, date: '2025-11-20', montant: 96.67, methode: 'CB', statut: 'payé', type: '3x', echeance: 1, totalEcheances: 3, montantTotal: 290, factureNumero: 'F2025-002', employeeId: 2 },
      { id: 3, date: '2025-12-20', montant: 96.67, methode: 'CB', statut: 'en_attente', type: '3x', echeance: 2, totalEcheances: 3, montantTotal: 290, factureNumero: 'F2025-002', employeeId: 2 },
      { id: 4, date: '2026-01-20', montant: 96.66, methode: 'CB', statut: 'en_attente', type: '3x', echeance: 3, totalEcheances: 3, montantTotal: 290, factureNumero: 'F2025-002', employeeId: 2 }
    ],
    statut: 'active'
  },
  {
    id: 3,
    nom: 'Isabelle Petit',
    telephone: '06 55 44 33 22',
    email: 'isa.petit@email.com',
    adresse: '22 Rue Victor Hugo, 80100 Abbeville',
    poidsInitial: 72,
    poidsActuel: 64,
    objectif: 64,
    forfait: 'Transformation Globale',
    seancesRestantes: 0,
    seancesTotal: 15,
    prochainRdv: null,
    assignedTo: 3, // Emma
    photos: [
      { date: '2025-09-01', type: 'avant', url: '/photo3.jpg' },
      { date: '2025-10-15', type: 'après', url: '/photo4.jpg' }
    ],
    mesures: [
      { id: 3, date: '2025-09-01', tour_taille: 84, tour_hanches: 100, tour_cuisses: 58 },
      { id: 4, date: '2025-10-15', tour_taille: 74, tour_hanches: 92, tour_cuisses: 52 }
    ],
    notes: 'Objectif atteint ! Très satisfaite, a laissé un témoignage.',
    suivis: [
      { id: 3, date: '2025-10-15', visibleToDirector: true, employeeId: 3, note: 'Dernière séance ! Objectif atteint, cliente ravie. Photos après prises.', duree: 45 }
    ],
    paiements: [
      { id: 5, date: '2025-09-01', montant: 990, methode: 'Espèces', statut: 'payé', type: 'complet', factureNumero: 'F2025-003', employeeId: 3 }
    ],
    statut: 'terminé'
  },
  {
    id: 4,
    nom: 'Claire Moreau',
    telephone: '06 77 88 99 00',
    email: 'claire.m@email.com',
    adresse: '45 Boulevard de la Liberté, 80000 Amiens',
    poidsInitial: 82,
    poidsActuel: 79,
    objectif: 74,
    forfait: 'Anti-Cellulite Expert',
    seancesRestantes: 5,
    seancesTotal: 8,
    prochainRdv: '2025-11-28T16:00',
    assignedTo: 3, // Emma
    photos: [
      { date: '2025-11-10', type: 'avant', url: '/photo5.jpg' }
    ],
    mesures: [
      { id: 5, date: '2025-11-10', tour_taille: 96, tour_hanches: 112, tour_cuisses: 64 }
    ],
    notes: 'Objectif principal : cuisses et fessiers. Problème de cellulite.',
    suivis: [
      { id: 4, date: '2025-11-20', visibleToDirector: true, employeeId: 3, note: 'Séance intense sur les cuisses. Bon ressenti de la cliente.', duree: 45 }
    ],
    paiements: [
      { id: 6, date: '2025-11-10', montant: 180, methode: 'CB', statut: 'payé', type: '3x', echeance: 1, totalEcheances: 3, montantTotal: 540, factureNumero: 'F2025-004', employeeId: 3 },
      { id: 7, date: '2025-12-10', montant: 180, methode: 'CB', statut: 'relance', type: '3x', echeance: 2, totalEcheances: 3, montantTotal: 540, factureNumero: 'F2025-004', employeeId: 3, relanceDate: '2025-11-25', relanceCount: 1 },
      { id: 8, date: '2026-01-10', montant: 180, methode: 'CB', statut: 'en_attente', type: '3x', echeance: 3, totalEcheances: 3, montantTotal: 540, factureNumero: 'F2025-004', employeeId: 3 }
    ],
    statut: 'active'
  },
  {
    id: 5,
    nom: 'Léa Bernard',
    telephone: '06 11 22 33 55',
    email: 'lea.b@email.com',
    adresse: '12 Rue du Commerce, 80000 Amiens',
    poidsInitial: 72,
    poidsActuel: 70,
    objectif: 65,
    forfait: 'Transformation Express',
    seancesRestantes: 8,
    seancesTotal: 10,
    prochainRdv: '2025-11-29T11:00',
    assignedTo: 2, // Julie
    photos: [],
    mesures: [
      { id: 6, date: '2025-11-05', tour_taille: 80, tour_hanches: 98, tour_cuisses: 56 },
      { id: 7, date: '2025-11-20', tour_taille: 78, tour_hanches: 96, tour_cuisses: 55 }
    ],
    notes: 'Nouvelle cliente, très motivée.',
    suivis: [
      { id: 5, date: '2025-11-20', visibleToDirector: true, employeeId: 2, note: 'Bonne progression, cliente assidue.', duree: 45 }
    ],
    paiements: [
      { id: 9, date: '2025-11-05', montant: 690, methode: 'Virement', statut: 'payé', type: 'complet', factureNumero: 'F2025-005', employeeId: 2 }
    ],
    statut: 'active'
  }
];

// ============================================
// SYSTÈME DE PARRAINAGE
// ============================================

const PARRAINAGE_CONFIG = {
  recompenseMarraine: 50, // € pour la marraine
  reductionFilleule: 50,  // € pour la filleule
  actif: true
};

// Données de parrainage (séparées des clients pour éviter les conflits)
// DEMO_PARRAINAGES - Commenté car données chargées depuis Airtable
// const DEMO_PARRAINAGES = [
//   { id: 1, marraineId: 1, filleuleId: 2, date: '2025-11-15', recompenseVersee: true },
//   { id: 2, marraineId: 1, filleuleId: 5, date: '2025-11-20', recompenseVersee: false },
//   { id: 3, marraineId: 3, filleuleId: 4, date: '2025-10-01', recompenseVersee: true }
// ];

// Codes de parrainage (générés automatiquement)
const DEMO_CODES_PARRAINAGE = {
  1: 'MARIE2025',
  2: 'SOPHIE2025',
  3: 'ISABELLE2025',
  4: 'CLAIRE2025',
  5: 'LEA2025'
};

const DEMO_RDVS = [
  { id: 1, clientId: 1, employeeId: 2, date: '2025-11-26', heure: '14:00', duree: 45, type: 'Séance G5', statut: 'confirmé' },
  { id: 2, clientId: 2, employeeId: 2, date: '2025-11-27', heure: '10:00', duree: 60, type: 'Découverte', statut: 'en attente' },
  { id: 3, clientId: 1, employeeId: 2, date: '2025-11-28', heure: '16:00', duree: 45, type: 'Séance G5', statut: 'confirmé' },
  { id: 4, clientId: 3, employeeId: 3, date: '2025-11-29', heure: '09:00', duree: 30, type: 'Bilan final', statut: 'confirmé' },
  { id: 5, clientId: 4, employeeId: 3, date: '2025-11-26', heure: '11:00', duree: 45, type: 'Séance G5', statut: 'confirmé' },
  { id: 6, clientId: 4, employeeId: 3, date: '2025-11-28', heure: '14:00', duree: 45, type: 'Séance G5', statut: 'en attente' },
];

// DEMO_STOCKS - Commenté car données chargées depuis Airtable
// const DEMO_STOCKS = {
//   2: [ // Julie
//     { id: 1, nom: 'Gel conducteur', quantite: 8, seuil: 5, unite: 'tubes', prix: 8.50 },
//     { id: 2, nom: 'Huile de massage', quantite: 4, seuil: 3, unite: 'flacons', prix: 15.00 },
//     { id: 3, nom: 'Draps jetables', quantite: 25, seuil: 20, unite: 'unités', prix: 0.50 },
//     { id: 4, nom: 'Gants jetables', quantite: 100, seuil: 50, unite: 'unités', prix: 0.10 },
//     { id: 5, nom: 'Crème amincissante', quantite: 2, seuil: 5, unite: 'pots', prix: 25.00 }
//   ],
//   3: [ // Emma
//     { id: 1, nom: 'Gel conducteur', quantite: 12, seuil: 5, unite: 'tubes', prix: 8.50 },
//     { id: 2, nom: 'Huile de massage', quantite: 6, seuil: 3, unite: 'flacons', prix: 15.00 },
//     { id: 3, nom: 'Draps jetables', quantite: 40, seuil: 20, unite: 'unités', prix: 0.50 },
//     { id: 4, nom: 'Gants jetables', quantite: 150, seuil: 50, unite: 'unités', prix: 0.10 },
//     { id: 5, nom: 'Crème amincissante', quantite: 4, seuil: 5, unite: 'pots', prix: 25.00 }
//   ]
// };

// DEMO_MESSAGES - Commenté car données chargées depuis Airtable
// const DEMO_MESSAGES = [
//   {
//     id: 1,
//     fromId: 2, // Julie
//     toId: 1, // Sarah (directrice)
//     message: "J'ai terminé la séance de Marie, le stock de gel conducteur est bas (2 tubes restants)",
//     date: '2025-11-25T16:30:00',
//     lu: true,
//     type: 'stock'
//   },
//   {
//     id: 2,
//     fromId: 1, // Sarah
//     toId: 2, // Julie
//     message: "OK, je commande demain matin. Peux-tu vérifier aussi l'huile de massage ?",
//     date: '2025-11-25T16:45:00',
//     lu: true,
//     type: 'normal'
//   },
//   {
//     id: 3,
//     fromId: 2, // Julie
//     toId: 1, // Sarah
//     message: "Il reste 4 flacons d'huile, ça devrait tenir la semaine 👍",
//     date: '2025-11-25T16:50:00',
//     lu: false,
//     type: 'normal'
//   },
//   {
//     id: 4,
//     fromId: 3, // Emma
//     toId: 1, // Sarah
//     message: "Super nouvelle ! Isabelle a atteint son objectif aujourd'hui 🎉 -8kg en 5 semaines !",
//     date: '2025-11-25T14:20:00',
//     lu: true,
//     type: 'success'
//   },
//   {
//     id: 5,
//     fromId: 1, // Sarah
//     toId: 3, // Emma
//     message: "Excellent travail Emma ! N'oublie pas de prendre les photos finales et d'exporter le PDF pour son dossier.",
//     date: '2025-11-25T14:35:00',
//     lu: true,
//     type: 'normal'
//   },
//   {
//     id: 6,
//     fromId: 2, // Julie
//     toId: 1, // Sarah
//     message: "RDV annulé : Sophie Martin ne peut pas venir demain. Elle reporte à la semaine prochaine.",
//     date: '2025-11-24T18:00:00',
//     lu: true,
//     type: 'warning'
//   }
// ];

// ============================================
// OBJECTIFS & GAMIFICATION
// ============================================

const BADGES = {
  first_month: { id: 'first_month', nom: 'Premier mois', icon: '🌟', description: 'Premier mois complété', color: '#c9a962' },
  seances_10: { id: 'seances_10', nom: '10 séances', icon: '💪', description: '10 séances réalisées', color: '#3b82f6' },
  seances_50: { id: 'seances_50', nom: '50 séances', icon: '🏆', description: '50 séances réalisées', color: '#c9a962' },
  seances_100: { id: 'seances_100', nom: '100 séances', icon: '👑', description: '100 séances réalisées', color: '#f59e0b' },
  client_10kg: { id: 'client_10kg', nom: 'Coach -10kg', icon: '🔥', description: 'Cliente ayant perdu 10kg', color: '#ef4444' },
  client_15kg: { id: 'client_15kg', nom: 'Coach -15kg', icon: '⭐', description: 'Cliente ayant perdu 15kg', color: '#c9a962' },
  ca_3000: { id: 'ca_3000', nom: 'CA 3000€', icon: '💰', description: '3000€ de CA mensuel', color: '#22c55e' },
  ca_5000: { id: 'ca_5000', nom: 'CA 5000€', icon: '💎', description: '5000€ de CA mensuel', color: '#a855f7' },
  perfect_week: { id: 'perfect_week', nom: 'Semaine parfaite', icon: '✨', description: 'Tous les RDV confirmés', color: '#c9a962' },
  client_satisfied: { id: 'client_satisfied', nom: 'Top satisfaction', icon: '❤️', description: '5 témoignages positifs', color: '#ec4899' },
  streak_7: { id: 'streak_7', nom: 'Série 7 jours', icon: '🔥', description: '7 jours consécutifs de travail', color: '#f97316' },
  streak_30: { id: 'streak_30', nom: 'Série 30 jours', icon: '🚀', description: '30 jours consécutifs', color: '#8b5cf6' }
};

// DEMO_OBJECTIVES - Commenté car données chargées depuis Airtable
// const DEMO_OBJECTIVES = {
//   2: { // Julie
//     monthly_seances_target: 25,
//     monthly_seances_current: 18,
//     monthly_ca_target: 4000,
//     monthly_ca_current: 2680,
//     streak_days: 12,
//     total_seances: 67,
//     badges_earned: ['first_month', 'seances_10', 'seances_50', 'ca_3000', 'streak_7'],
//     badges_progress: {
//       seances_100: 67,
//       ca_5000: 2680,
//       client_10kg: 1,
//       streak_30: 12
//     },
//     monthly_history: [
//       { mois: 'Juin', seances: 22, ca: 3200 },
//       { mois: 'Juil', seances: 25, ca: 3800 },
//       { mois: 'Août', seances: 20, ca: 2900 },
//       { mois: 'Sept', seances: 24, ca: 3600 },
//       { mois: 'Oct', seances: 26, ca: 4100 },
//       { mois: 'Nov', seances: 18, ca: 2680 }
//     ]
//   },
//   3: { // Emma
//     monthly_seances_target: 20,
//     monthly_seances_current: 14,
//     monthly_ca_target: 3500,
//     monthly_ca_current: 1990,
//     streak_days: 5,
//     total_seances: 34,
//     badges_earned: ['first_month', 'seances_10', 'client_10kg'],
//     badges_progress: {
//       seances_50: 34,
//       ca_3000: 1990,
//       streak_7: 5,
//       seances_100: 34
//     },
//     monthly_history: [
//       { mois: 'Juin', seances: 0, ca: 0 },
//       { mois: 'Juil', seances: 8, ca: 1200 },
//       { mois: 'Août', seances: 15, ca: 2200 },
//       { mois: 'Sept', seances: 18, ca: 2700 },
//       { mois: 'Oct', seances: 20, ca: 3100 },
//       { mois: 'Nov', seances: 14, ca: 1990 }
//     ]
//   }
// };

// ============================================
// CONFIRMATIONS & RAPPELS RDV
// ============================================

const RDV_STATUS = {
  pending: { label: 'En attente', color: '#6b7280', icon: '⏳' },
  sent: { label: 'Envoyé', color: '#3b82f6', icon: '📤' },
  confirmed: { label: 'Confirmé', color: '#22c55e', icon: '✓' },
  cancelled: { label: 'Annulé', color: '#ef4444', icon: '✗' },
  rescheduled: { label: 'Reporté', color: '#f59e0b', icon: '↻' },
  no_response: { label: 'Sans réponse', color: '#f97316', icon: '?' },
  completed: { label: 'Effectué', color: '#3b82f6', icon: '✓✓' }
};

const DEMO_RDV_CONFIRMATIONS = [
  {
    id: 1,
    rdvId: 1,
    clientId: 1,
    type: 'sms', // 'sms' | 'email' | 'whatsapp'
    action: 'rappel_j3', // 'rappel_j3' | 'rappel_j1' | 'confirmation' | 'annulation' | 'report'
    date: '2025-11-23T10:00:00',
    message: 'Bonjour Marie, rappel de votre RDV SLIM TOUCH le 26/11 à 14h00. Confirmez en répondant OUI.',
    response: 'OUI',
    responseDate: '2025-11-23T10:15:00',
    status: 'confirmed'
  },
  {
    id: 2,
    rdvId: 1,
    clientId: 1,
    type: 'sms',
    action: 'rappel_j1',
    date: '2025-11-25T09:00:00',
    message: 'Rappel : votre séance SLIM TOUCH est demain à 14h00. À très vite !',
    response: null,
    responseDate: null,
    status: 'sent'
  },
  {
    id: 3,
    rdvId: 2,
    clientId: 2,
    type: 'email',
    action: 'rappel_j3',
    date: '2025-11-24T08:00:00',
    message: 'Confirmation RDV du 27/11 à 10h00',
    response: null,
    responseDate: null,
    status: 'no_response'
  },
  {
    id: 4,
    rdvId: 3,
    clientId: 4,
    type: 'sms',
    action: 'rappel_j3',
    date: '2025-11-25T09:00:00',
    message: 'Bonjour Claire, rappel de votre RDV SLIM TOUCH le 28/11 à 16h00.',
    response: 'Je dois reporter à la semaine prochaine svp',
    responseDate: '2025-11-25T11:30:00',
    status: 'rescheduled'
  }
];

const ONBOARDING_VIDEOS = [
  { 
    id: 1, 
    titre: 'Bienvenue chez SLIM TOUCH', 
    description: 'Présentation de l\'entreprise, nos valeurs et notre mission.',
    duree: '8:30',
    categorie: 'Introduction',
    url: '#',
    obligatoire: true
  },
  { 
    id: 2, 
    titre: 'La machine G5 - Présentation', 
    description: 'Découverte de la machine G5, ses composants et son fonctionnement.',
    duree: '12:45',
    categorie: 'Technique',
    url: '#',
    obligatoire: true
  },
  { 
    id: 3, 
    titre: 'Protocole de séance standard', 
    description: 'Étape par étape : comment conduire une séance parfaite.',
    duree: '18:20',
    categorie: 'Technique',
    url: '#',
    obligatoire: true
  },
  { 
    id: 4, 
    titre: 'Zones du corps - Techniques spécifiques', 
    description: 'Techniques adaptées pour chaque zone : ventre, cuisses, bras, dos.',
    duree: '25:10',
    categorie: 'Technique',
    url: '#',
    obligatoire: true
  },
  { 
    id: 5, 
    titre: 'Accueil et relation cliente', 
    description: 'Comment créer une expérience premium pour nos clientes.',
    duree: '10:15',
    categorie: 'Relationnel',
    url: '#',
    obligatoire: true
  },
  { 
    id: 6, 
    titre: 'Prise de mesures et photos', 
    description: 'Protocole de suivi : mesures, pesée et photos avant/après.',
    duree: '7:40',
    categorie: 'Suivi',
    url: '#',
    obligatoire: true
  },
  { 
    id: 7, 
    titre: 'Utilisation de l\'application', 
    description: 'Guide complet de l\'application de gestion des clientes.',
    duree: '15:00',
    categorie: 'Outils',
    url: '#',
    obligatoire: true
  },
  { 
    id: 8, 
    titre: 'Hygiène et sécurité', 
    description: 'Protocoles d\'hygiène, désinfection et sécurité.',
    duree: '11:30',
    categorie: 'Sécurité',
    url: '#',
    obligatoire: true
  },
  { 
    id: 9, 
    titre: 'Gestion des stocks', 
    description: 'Comment gérer vos consommables et signaler les besoins.',
    duree: '6:20',
    categorie: 'Outils',
    url: '#',
    obligatoire: false
  },
  { 
    id: 10, 
    titre: 'Cas particuliers et contre-indications', 
    description: 'Situations spéciales, contre-indications et que faire.',
    duree: '14:00',
    categorie: 'Sécurité',
    url: '#',
    obligatoire: true
  }
];

// ============================================
// STYLES DYNAMIQUES
// ============================================

const getStyles = (isDark) => `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  :root {
    --primary: ${isDark ? '#1a1a2e' : '#ffffff'};
    --primary-light: ${isDark ? '#16213e' : '#f8f9fa'};
    --accent: #c9a962;
    --accent-light: #e8d5a3;
    --accent-glow: rgba(201, 169, 98, 0.3);
    --success: #4ade80;
    --warning: #fbbf24;
    --danger: #f87171;
    --info: #60a5fa;
    --bg: ${isDark ? '#0f0f1a' : '#f5f5f7'};
    --bg-card: ${isDark ? 'rgba(26, 26, 46, 0.8)' : 'rgba(255, 255, 255, 0.9)'};
    --bg-card-hover: ${isDark ? 'rgba(26, 26, 46, 0.95)' : 'rgba(255, 255, 255, 1)'};
    --text: ${isDark ? '#f8fafc' : '#1a1a2e'};
    --text-muted: ${isDark ? '#94a3b8' : '#64748b'};
    --border: ${isDark ? 'rgba(201, 169, 98, 0.2)' : 'rgba(201, 169, 98, 0.3)'};
    --shadow: ${isDark ? '0 4px 30px rgba(0, 0, 0, 0.3)' : '0 4px 30px rgba(0, 0, 0, 0.1)'};
    --shadow-glow: 0 0 40px rgba(201, 169, 98, 0.15);
  }
  
  .app-container {
    font-family: 'Outfit', sans-serif;
    background: var(--bg);
    min-height: 100vh;
    color: var(--text);
    display: flex;
    position: relative;
    overflow: hidden;
  }
  
  .app-container::before {
    content: '';
    position: fixed;
    top: -50%;
    right: -30%;
    width: 80%;
    height: 80%;
    background: radial-gradient(ellipse, rgba(201, 169, 98, ${isDark ? '0.08' : '0.05'}) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }
  
  /* Sidebar */
  .sidebar {
    width: 280px;
    background: ${isDark ? 'linear-gradient(180deg, var(--primary) 0%, var(--bg) 100%)' : 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)'};
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100vh;
    z-index: 100;
    transition: transform 0.3s ease;
  }
  
  @media (max-width: 1024px) {
    .sidebar {
      transform: translateX(-100%);
    }
    .sidebar.open {
      transform: translateX(0);
    }
  }
  
  .sidebar-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--border);
  }
  
  .logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--accent);
    letter-spacing: 3px;
  }
  
  /* Logo icon removed */
  
  .role-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-top: 12px;
  }
  
  .role-badge.director {
    background: linear-gradient(135deg, rgba(201, 169, 98, 0.3), rgba(201, 169, 98, 0.1));
    color: var(--accent);
    border: 1px solid var(--accent);
  }
  
  .role-badge.employee {
    background: rgba(96, 165, 250, 0.15);
    color: var(--info);
    border: 1px solid var(--info);
  }
  
  .sidebar-nav {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
  }
  
  .nav-section {
    margin-bottom: 1.5rem;
  }
  
  .nav-section-title {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--text-muted);
    padding: 0 12px;
    margin-bottom: 8px;
  }
  
  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 12px;
    color: var(--text-muted);
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: 4px;
    border: 1px solid transparent;
  }
  
  .nav-item:hover {
    background: var(--bg-card);
    color: var(--text);
    border-color: var(--border);
  }
  
  .nav-item.active {
    background: linear-gradient(135deg, rgba(201, 169, 98, 0.2) 0%, rgba(201, 169, 98, 0.1) 100%);
    color: var(--accent);
    border-color: var(--accent);
    box-shadow: var(--shadow-glow);
  }
  
  .nav-item svg {
    width: 20px;
    height: 20px;
  }
  
  .nav-item .badge-count {
    margin-left: auto;
    background: var(--danger);
    color: white;
    font-size: 0.7rem;
    padding: 2px 8px;
    border-radius: 10px;
    font-weight: 600;
  }
  
  .sidebar-footer {
    padding: 1rem;
    border-top: 1px solid var(--border);
  }
  
  .user-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .user-avatar {
    width: 42px;
    height: 42px;
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1.1rem;
    color: ${isDark ? 'var(--primary)' : '#ffffff'};
  }
  
  .user-details {
    flex: 1;
  }
  
  .user-details h4 {
    font-weight: 600;
    font-size: 0.9rem;
  }
  
  .user-details span {
    font-size: 0.75rem;
    color: var(--text-muted);
  }
  
  .logout-btn {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    transition: all 0.2s;
  }
  
  .logout-btn:hover {
    color: var(--danger);
    background: rgba(248, 113, 113, 0.1);
  }
  
  /* Main Content */
  .main-content {
    flex: 1;
    margin-left: 280px;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
  }
  
  @media (max-width: 1024px) {
    .main-content {
      margin-left: 0;
    }
  }
  
  /* Header */
  .header {
    background: var(--bg-card);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 50;
  }
  
  .header-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .menu-toggle {
    display: none;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 10px;
    color: var(--text);
    cursor: pointer;
  }
  
  @media (max-width: 1024px) {
    .menu-toggle {
      display: flex;
    }
  }
  
  .page-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  .header-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .search-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 10px 16px;
    width: 280px;
  }
  
  .search-bar input {
    background: transparent;
    border: none;
    color: var(--text);
    font-size: 0.9rem;
    width: 100%;
    outline: none;
  }
  
  .search-bar input::placeholder {
    color: var(--text-muted);
  }
  
  .search-bar svg {
    color: var(--text-muted);
    width: 18px;
    height: 18px;
  }
  
  .icon-btn {
    position: relative;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 10px;
    color: var(--text-muted);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .icon-btn:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
  
  .icon-btn svg {
    width: 20px;
    height: 20px;
  }
  
  .notification-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    width: 18px;
    height: 18px;
    background: var(--danger);
    border-radius: 50%;
    font-size: 0.7rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
  
  .notifications-dropdown {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    width: 360px;
    background: var(--bg-card);
    backdrop-filter: blur(20px);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 1rem;
    box-shadow: var(--shadow);
    z-index: 100;
    max-height: 400px;
    overflow-y: auto;
  }
  
  .notifications-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--border);
  }
  
  .notifications-header h4 {
    font-size: 1rem;
    font-weight: 600;
  }
  
  .mark-all-read {
    font-size: 0.8rem;
    color: var(--accent);
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .notification-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px;
    border-radius: 12px;
    margin-bottom: 8px;
    background: var(--bg);
    border: 1px solid var(--border);
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .notification-item:hover {
    border-color: var(--accent);
  }
  
  .notification-item.unread {
    border-left: 3px solid var(--accent);
  }
  
  .notification-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .notification-icon.warning { background: rgba(251, 191, 36, 0.2); color: var(--warning); }
  .notification-icon.info { background: rgba(96, 165, 250, 0.2); color: var(--info); }
  .notification-icon.success { background: rgba(74, 222, 128, 0.2); color: var(--success); }
  .notification-icon.schedule { background: rgba(201, 169, 98, 0.2); color: var(--accent); }
  
  .notification-content {
    flex: 1;
    min-width: 0;
  }
  
  .notification-content h5 {
    font-size: 0.85rem;
    font-weight: 500;
    margin-bottom: 4px;
    line-height: 1.3;
  }
  
  .notification-content span {
    font-size: 0.75rem;
    color: var(--text-muted);
  }
  
  /* Content Area */
  .content {
    flex: 1;
    padding: 1.5rem;
    overflow-y: auto;
  }
  
  /* Stats Cards */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .stat-card {
    background: var(--bg-card);
    backdrop-filter: blur(20px);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 1.5rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent), var(--accent-light));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .stat-card:hover {
    transform: translateY(-4px);
    border-color: var(--accent);
    box-shadow: var(--shadow-glow);
  }
  
  .stat-card:hover::before {
    opacity: 1;
  }
  
  .stat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  
  .stat-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .stat-icon.gold { background: linear-gradient(135deg, rgba(201, 169, 98, 0.3), rgba(201, 169, 98, 0.1)); color: var(--accent); }
  .stat-icon.green { background: rgba(74, 222, 128, 0.15); color: var(--success); }
  .stat-icon.blue { background: rgba(96, 165, 250, 0.15); color: var(--info); }
  .stat-icon.red { background: rgba(248, 113, 113, 0.15); color: var(--danger); }
  
  .stat-trend {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.8rem;
    color: var(--success);
  }
  
  .stat-trend.down { color: var(--danger); }
  
  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 4px;
    background: linear-gradient(135deg, var(--text), var(--text-muted));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .stat-label {
    font-size: 0.85rem;
    color: var(--text-muted);
  }
  
  /* Cards & Sections */
  .card {
    background: var(--bg-card);
    backdrop-filter: blur(20px);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.25rem;
  }
  
  .card-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .card-title svg {
    color: var(--accent);
  }
  
  /* Buttons */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    border-radius: 12px;
    font-weight: 500;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    font-family: inherit;
  }
  
  .btn-primary {
    background: linear-gradient(135deg, var(--accent), var(--accent-light));
    color: ${isDark ? 'var(--primary)' : '#ffffff'};
    box-shadow: 0 4px 15px rgba(201, 169, 98, 0.3);
  }
  
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(201, 169, 98, 0.4);
  }
  
  .btn-secondary {
    background: var(--bg);
    color: var(--text);
    border: 1px solid var(--border);
  }
  
  .btn-secondary:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
  
  .btn-danger {
    background: rgba(248, 113, 113, 0.15);
    color: var(--danger);
    border: 1px solid var(--danger);
  }
  
  .btn-danger:hover {
    background: var(--danger);
    color: white;
  }
  
  .btn-ghost {
    background: transparent;
    color: var(--text-muted);
    padding: 8px;
  }
  
  .btn-ghost:hover {
    color: var(--accent);
  }
  
  .btn-sm {
    padding: 8px 14px;
    font-size: 0.8rem;
  }
  
  /* Tables */
  .table-container {
    overflow-x: auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th {
    text-align: left;
    padding: 14px 16px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--text-muted);
    border-bottom: 1px solid var(--border);
  }
  
  td {
    padding: 14px 16px;
    border-bottom: 1px solid var(--border);
    font-size: 0.9rem;
  }
  
  tr:hover td {
    background: rgba(201, 169, 98, 0.05);
  }
  
  /* Status badges */
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  .badge-success { background: rgba(74, 222, 128, 0.15); color: var(--success); }
  .badge-warning { background: rgba(251, 191, 36, 0.15); color: var(--warning); }
  .badge-danger { background: rgba(248, 113, 113, 0.15); color: var(--danger); }
  .badge-info { background: rgba(96, 165, 250, 0.15); color: var(--info); }
  .badge-gold { background: rgba(201, 169, 98, 0.15); color: var(--accent); }
  
  /* Client Card */
  .client-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 1.25rem;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 1rem;
  }
  
  .client-card:hover {
    border-color: var(--accent);
    transform: translateX(8px);
    box-shadow: var(--shadow-glow);
  }
  
  .client-card-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 1rem;
  }
  
  .client-avatar {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, var(--accent), var(--accent-light));
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1.1rem;
    color: ${isDark ? 'var(--primary)' : '#ffffff'};
  }
  
  .client-info h3 {
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 4px;
  }
  
  .client-info span {
    font-size: 0.8rem;
    color: var(--text-muted);
  }
  
  .client-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    padding-top: 1rem;
    border-top: 1px solid var(--border);
  }
  
  .client-stat {
    text-align: center;
  }
  
  .client-stat-value {
    font-weight: 600;
    font-size: 1.1rem;
    color: var(--accent);
  }
  
  .client-stat-label {
    font-size: 0.7rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  /* Progress bar */
  .progress-container {
    margin-top: 1rem;
  }
  
  .progress-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 0.8rem;
  }
  
  .progress-bar {
    height: 8px;
    background: var(--bg);
    border-radius: 10px;
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), var(--accent-light));
    border-radius: 10px;
    transition: width 0.5s ease;
  }
  
  /* RDV Item */
  .rdv-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 1rem;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    margin-bottom: 10px;
    transition: all 0.2s ease;
  }
  
  .rdv-item:hover {
    border-color: var(--accent);
  }
  
  .rdv-time {
    min-width: 70px;
    text-align: center;
  }
  
  .rdv-time-value {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--accent);
  }
  
  .rdv-time-duration {
    font-size: 0.75rem;
    color: var(--text-muted);
  }
  
  .rdv-details {
    flex: 1;
  }
  
  .rdv-details h4 {
    font-weight: 500;
    font-size: 0.95rem;
    margin-bottom: 4px;
  }
  
  .rdv-details span {
    font-size: 0.8rem;
    color: var(--text-muted);
  }
  
  /* Forms */
  .form-group {
    margin-bottom: 1.25rem;
  }
  
  .form-label {
    display: block;
    font-size: 0.85rem;
    font-weight: 500;
    margin-bottom: 8px;
    color: var(--text-muted);
  }
  
  .form-input {
    width: 100%;
    padding: 14px 16px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    color: var(--text);
    font-size: 0.95rem;
    font-family: inherit;
    transition: all 0.2s ease;
  }
  
  .form-input:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-glow);
  }
  
  .form-input::placeholder {
    color: var(--text-muted);
  }
  
  textarea.form-input {
    min-height: 120px;
    resize: vertical;
  }
  
  .form-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  /* Modal */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 200;
    padding: 1rem;
  }
  
  .modal {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 20px;
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
  }
  
  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    border-bottom: 1px solid var(--border);
  }
  
  .modal-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem;
    font-weight: 600;
  }
  
  .modal-body {
    padding: 1.5rem;
  }
  
  .modal-footer {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    padding: 1.5rem;
    border-top: 1px solid var(--border);
  }
  
  /* Onboarding Videos */
  .video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.25rem;
  }
  
  .video-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  
  .video-card:hover {
    border-color: var(--accent);
    transform: translateY(-4px);
    box-shadow: var(--shadow-glow);
  }
  
  .video-thumbnail {
    height: 160px;
    background: linear-gradient(135deg, var(--primary), var(--bg));
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
  }
  
  .video-thumbnail::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(201, 169, 98, 0.1), transparent);
  }
  
  .play-button {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, var(--accent), var(--accent-light));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${isDark ? 'var(--primary)' : '#ffffff'};
    box-shadow: var(--shadow-glow);
    transition: transform 0.2s;
    z-index: 1;
  }
  
  .video-card:hover .play-button {
    transform: scale(1.1);
  }
  
  .video-duration {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: rgba(0,0,0,0.7);
    color: white;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 500;
  }
  
  .video-completed {
    position: absolute;
    top: 10px;
    right: 10px;
    background: var(--success);
    color: white;
    padding: 6px;
    border-radius: 50%;
  }
  
  .video-content {
    padding: 1.25rem;
  }
  
  .video-category {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--accent);
    margin-bottom: 6px;
  }
  
  .video-title {
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 8px;
    line-height: 1.4;
  }
  
  .video-description {
    font-size: 0.85rem;
    color: var(--text-muted);
    line-height: 1.5;
  }
  
  /* Employee Card */
  .employee-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 1.5rem;
    transition: all 0.3s ease;
  }
  
  .employee-card:hover {
    border-color: var(--accent);
    box-shadow: var(--shadow-glow);
  }
  
  .employee-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .employee-avatar {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, var(--accent), var(--accent-light));
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.5rem;
    color: ${isDark ? 'var(--primary)' : '#ffffff'};
  }
  
  .employee-info h3 {
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 4px;
  }
  
  .employee-info span {
    font-size: 0.85rem;
    color: var(--text-muted);
  }
  
  .employee-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border);
  }
  
  .employee-stat {
    text-align: center;
    padding: 0.75rem;
    background: var(--bg);
    border-radius: 10px;
  }
  
  .employee-stat-value {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--accent);
  }
  
  .employee-stat-label {
    font-size: 0.7rem;
    color: var(--text-muted);
    text-transform: uppercase;
  }
  
  /* Tabs */
  .tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 1.5rem;
  }
  
  .tab {
    padding: 10px 18px;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    color: var(--text-muted);
    transition: all 0.2s ease;
    border: 1px solid transparent;
  }
  
  .tab:hover {
    color: var(--text);
    background: var(--bg);
  }
  
  .tab.active {
    color: var(--accent);
    background: rgba(201, 169, 98, 0.1);
    border-color: var(--accent);
  }
  
  /* Login Page */
  .login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg);
    padding: 1rem;
  }
  
  .login-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 3rem;
    width: 100%;
    max-width: 440px;
    text-align: center;
  }
  
  .login-logo {
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--accent);
    margin-bottom: 0.5rem;
    letter-spacing: 4px;
  }
  
  .login-subtitle {
    color: var(--text-muted);
    margin-bottom: 2.5rem;
  }
  
  /* Suivi Timeline */
  .suivi-timeline {
    position: relative;
    padding-left: 30px;
  }
  
  .suivi-timeline::before {
    content: '';
    position: absolute;
    left: 8px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--border);
  }
  
  .suivi-item {
    position: relative;
    padding: 1.25rem;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    margin-bottom: 1rem;
  }
  
  .suivi-item::before {
    content: '';
    position: absolute;
    left: -26px;
    top: 1.5rem;
    width: 12px;
    height: 12px;
    background: var(--accent);
    border-radius: 50%;
    border: 3px solid var(--bg-card);
  }
  
  .suivi-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }
  
  .suivi-date {
    font-size: 0.8rem;
    color: var(--text-muted);
  }
  
  .suivi-employee {
    font-size: 0.8rem;
    color: var(--accent);
  }
  
  .suivi-note {
    font-size: 0.95rem;
    line-height: 1.6;
  }
  
  /* Stock Alert */
  .stock-alert {
    background: rgba(248, 113, 113, 0.1);
    border: 1px solid rgba(248, 113, 113, 0.3);
    border-radius: 12px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 1rem;
  }
  
  .stock-alert svg {
    color: var(--danger);
    flex-shrink: 0;
  }
  
  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-in {
    animation: fadeIn 0.3s ease forwards;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  .pulse {
    animation: pulse 2s infinite;
  }
  
  @keyframes slideIn {
    from { transform: translateX(-10px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  .slide-in {
    animation: slideIn 0.3s ease forwards;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .spin {
    animation: spin 1s linear infinite;
  }
`;

// ============================================
// PAGE DE CONNEXION
// ============================================

function LoginPage({ onLogin, isDark, toggleTheme }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const user = DEMO_EMPLOYEES.find(emp => emp.email === email && emp.password === password);
    if (user) {
      onLogin(user);
    } else {
      setError('Email ou mot de passe incorrect');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <style>{getStyles(isDark)}</style>
      <div className="login-card animate-in">
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <button className="icon-btn" onClick={toggleTheme}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        
        <div className="login-logo">SLIM TOUCH</div>
        <p className="login-subtitle">Espace professionnel</p>
        
        <div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Mot de passe</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          
          {error && (
            <div style={{ color: 'var(--danger)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              {error}
            </div>
          )}
          
          <button onClick={handleLogin} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
            <Lock size={18} /> Se connecter
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// APPLICATION PRINCIPALE
// ============================================

export default function SlimTouchApp() {
  const [isDark, setIsDark] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [clients, setClients] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [rdvs, setRdvs] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [produits, setProduits] = useState([]);
  const [ventes, setVentes] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [completedVideos, setCompletedVideos] = useState([1, 2]);
  const [clientFilter, setClientFilter] = useState('all');
  const [editingClient, setEditingClient] = useState(null);
  
  // State pour le chargement API
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  
  // Fonction pour charger les données depuis Airtable
  // Charger les données Airtable au démarrage
  useEffect(() => {
    const loadData = async () => {
      setDataLoading(true);
      try {
        const [
          clientesData,
          rdvsData,
          equipeData,
          messagesData,
          stocksData,
          produitsData,
          parrainagesData,
          objectifsData,
          ventesData
        ] = await Promise.all([
          fetchClientes(),
          fetchRdvs(),
          fetchEquipe(),
          fetchMessages(),
          fetchStocks(),
          fetchProduits(),
          fetchParrainages(),
          fetchObjectifs(),
          fetchVentes()
        ]);
        
        setClients(clientesData);
        setRdvs(rdvsData);
        setEmployees(equipeData.length > 0 ? equipeData : DEMO_EMPLOYEES); // Fallback sur démo si vide
        setMessages(messagesData);
        setStocks(stocksData);
        setProduits(produitsData);
        setParrainages(parrainagesData);
        setObjectives(objectifsData);
        setVentes(ventesData);
        
        console.log('✅ Toutes les données chargées !');
      } catch (error) {
        console.error('❌ Erreur chargement:', error);
        // Fallback sur les employés démo pour permettre la connexion
        setEmployees(DEMO_EMPLOYEES);
      }
      setDataLoading(false);
    };
    
    if (currentUser) loadData();
  }, [currentUser]);
  
  // Fonction pour rafraîchir les données manuellement
  const refreshData = async () => {
    setIsLoading(true);
    try {
      const [
        clientesData,
        rdvsData,
        equipeData,
        messagesData,
        stocksData,
        produitsData,
        parrainagesData,
        objectifsData,
        ventesData
      ] = await Promise.all([
        fetchClientes(),
        fetchRdvs(),
        fetchEquipe(),
        fetchMessages(),
        fetchStocks(),
        fetchProduits(),
        fetchParrainages(),
        fetchObjectifs(),
        fetchVentes()
      ]);
      
      setClients(clientesData);
      setRdvs(rdvsData);
      if (equipeData.length > 0) setEmployees(equipeData);
      setMessages(messagesData);
      setStocks(stocksData);
      setProduits(produitsData);
      setParrainages(parrainagesData);
      setObjectives(objectifsData);
      setVentes(ventesData);
      
      console.log('🔄 Toutes les données rafraîchies !');
    } catch (err) {
      console.error('❌ Erreur rafraîchissement:', err);
      setApiError('Erreur de synchronisation');
    }
    setIsLoading(false);
  };
  
  // States pour les modals de la fiche cliente
  const [showSuiviModal, setShowSuiviModal] = useState(false);
  const [showMesureModal, setShowMesureModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(null); // 'avant', 'pendant', 'après'
  const [showRdvModal, setShowRdvModal] = useState(false);
  const [editingSuivi, setEditingSuivi] = useState(null);
  const [editingMesure, setEditingMesure] = useState(null);
  
  // Formulaire suivi
  const [suiviForm, setSuiviForm] = useState({ date: new Date().toISOString().split('T')[0], duree: '45', note: '' });
  
  // Formulaire mensuration
  const [mesureForm, setMesureForm] = useState({ date: new Date().toISOString().split('T')[0], tour_taille: '', tour_hanches: '', tour_cuisses: '' });
  
  // Formulaire RDV
  const [rdvForm, setRdvForm] = useState({ date: '', heure: '', duree: '45', type: 'Séance G5' });
  
  // States pour le planning
  const [planningFilter, setPlanningFilter] = useState('all'); // 'all' ou employeeId
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showPlanningRdvModal, setShowPlanningRdvModal] = useState(false);
  const [editingRdv, setEditingRdv] = useState(null);
  const [planningRdvForm, setPlanningRdvForm] = useState({ clientId: '', date: '', heure: '', duree: '45', type: 'Séance G5', employeeId: '' });
  
  // State pour le modal paiement
  const [showPaiementModal, setShowPaiementModal] = useState(false);
  const [paiementForm, setPaiementForm] = useState({ clientId: '', montant: '', methode: 'CB' });
  
  // State pour le filtre des suivis
  const [suiviFilter, setSuiviFilter] = useState('all');
  
  // State pour nouvelle employée
  const [newEmployeeForm, setNewEmployeeForm] = useState({ nom: '', telephone: '', email: '', password: '', dateEmbauche: '' });
  
  // State pour la messagerie interne
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [showExportModal, setShowExportModal] = useState(null); // client object or null
  const [paiement3xForm, setPaiement3xForm] = useState({ clientId: '', montantTotal: '', methode: 'CB', employeeId: '' });
  
  // State pour objectifs et gamification
  const [objectives, setObjectives] = useState([]);
  const [showBadgeModal, setShowBadgeModal] = useState(null);
  
  // State pour confirmations RDV
  const [rdvConfirmations, setRdvConfirmations] = useState(DEMO_RDV_CONFIRMATIONS);
  const [showRdvConfirmModal, setShowRdvConfirmModal] = useState(null);
  const [showRappelModal, setShowRappelModal] = useState(null);
  
  // States pour le système de parrainage
  const [parrainages, setParrainages] = useState([]);
  const [codesParrainage, setCodesParrainage] = useState(DEMO_CODES_PARRAINAGE);
  
  // Couleurs par employé pour le calendrier
  const EMPLOYEE_COLORS = {
    2: { bg: 'rgba(59, 130, 246, 0.2)', border: '#3b82f6', text: '#3b82f6' }, // Julie - Bleu
    3: { bg: 'rgba(168, 85, 247, 0.2)', border: '#a855f7', text: '#a855f7' }, // Emma - Violet
  };
  
  // Fonction pour obtenir les jours du mois
  const getCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Lundi = 0
    
    const days = [];
    // Jours du mois précédent
    const prevMonth = new Date(year, month, 0);
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({ day: prevMonth.getDate() - i, currentMonth: false, date: new Date(year, month - 1, prevMonth.getDate() - i) });
    }
    // Jours du mois actuel
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, currentMonth: true, date: new Date(year, month, i) });
    }
    // Jours du mois suivant
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ day: i, currentMonth: false, date: new Date(year, month + 1, i) });
    }
    return days;
  };
  
  // RDV filtrés pour le planning
  const getFilteredRdvs = () => {
    if (planningFilter === 'all') return rdvs;
    return rdvs.filter(r => r.employeeId === parseInt(planningFilter));
  };
  
  // Obtenir les RDV d'un jour donné
  const getRdvsForDay = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return getFilteredRdvs().filter(r => r.date === dateStr);
  };
  
  // Modifier le statut d'un RDV
  const handleToggleRdvStatus = (rdvId) => {
    setRdvs(prev => prev.map(r => 
      r.id === rdvId 
        ? { ...r, statut: r.statut === 'confirmé' ? 'en attente' : 'confirmé' }
        : r
    ));
  };
  
  // Supprimer un RDV
  const handleDeleteRdv = async (rdvId) => {
    if (!window.confirm('Supprimer ce rendez-vous ?')) return;
    
    // Supprimer dans Airtable
    try {
      const rdv = rdvs.find(r => r.id === rdvId);
      if (rdv?.airtable_id) {
        await apiDeleteRdv(rdv.airtable_id);
        console.log('✅ RDV supprimé dans Airtable');
      }
    } catch (error) {
      console.error('⚠️ Erreur suppression RDV Airtable:', error);
    }
    
    setRdvs(prev => prev.filter(r => r.id !== rdvId));
  };
  
  // Créer un RDV depuis le planning
  const handleCreatePlanningRdv = async () => {
    if (!planningRdvForm.clientId || !planningRdvForm.date || !planningRdvForm.heure || !planningRdvForm.employeeId) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    const newRdv = {
      id: Date.now(),
      clientId: parseInt(planningRdvForm.clientId),
      employeeId: parseInt(planningRdvForm.employeeId),
      date: planningRdvForm.date,
      heure: planningRdvForm.heure,
      duree: parseInt(planningRdvForm.duree),
      type: planningRdvForm.type,
      statut: 'en attente'
    };
    
    // Envoyer à Airtable
    try {
      const client = clients.find(c => c.id === parseInt(planningRdvForm.clientId));
      const result = await apiCreateRdv({
        client_id: newRdv.clientId,
        client_nom: client?.nom || '',
        employee_id: newRdv.employeeId,
        date: newRdv.date,
        heure: newRdv.heure,
        duree: newRdv.duree,
        type: newRdv.type,
        statut: newRdv.statut
      });
      console.log('✅ RDV créé dans Airtable:', result);
      if (result.id) {
        newRdv.airtable_id = result.id;
      }
    } catch (error) {
      console.error('⚠️ Erreur Airtable RDV, sauvegarde locale uniquement:', error);
    }
    
    setRdvs(prev => [...prev, newRdv]);
    setShowPlanningRdvModal(false);
    setPlanningRdvForm({ clientId: '', date: '', heure: '', duree: '45', type: 'Séance G5', employeeId: '' });
    const client = clients.find(c => c.id === parseInt(planningRdvForm.clientId));
    addNotification({ type: 'schedule', message: `Nouveau RDV : ${client?.nom} - ${planningRdvForm.date}`, forEmployee: parseInt(planningRdvForm.employeeId) });
  };
  
  // Modifier un RDV
  const handleUpdateRdv = () => {
    setRdvs(prev => prev.map(r => 
      r.id === editingRdv.id 
        ? { ...r, clientId: parseInt(planningRdvForm.clientId), employeeId: parseInt(planningRdvForm.employeeId), date: planningRdvForm.date, heure: planningRdvForm.heure, duree: parseInt(planningRdvForm.duree), type: planningRdvForm.type }
        : r
    ));
    setShowPlanningRdvModal(false);
    setEditingRdv(null);
    const client = clients.find(c => c.id === parseInt(planningRdvForm.clientId));
    addNotification({ type: 'schedule', message: `RDV modifié : ${client?.nom}`, forEmployee: parseInt(planningRdvForm.employeeId) });
  };
  
  // Configuration des forfaits (state modifiable)
  const [forfaits, setForfaits] = useState({
    'Sculptage Zones': { icon: '🎯', seances: 5, prix: 290, prixBarre: 390, resultat: '-4 à -6 kg' },
    'Transformation Express': { icon: '🔥', seances: 10, prix: 690, prixBarre: 750, resultat: '-8 à -11 kg', popular: true },
    'Transformation Globale': { icon: '✨', seances: 15, prix: 990, prixBarre: 1050, resultat: '-12 à -15 kg' },
    'Anti-Cellulite Expert': { icon: '💎', seances: 8, prix: 540, prixBarre: 600, resultat: '-70% cellulite' }
  });
  
  // Alias pour la compatibilité avec le code existant
  const FORFAITS = forfaits;
  
  // State pour le modal forfait
  const [showForfaitModal, setShowForfaitModal] = useState(false);
  const [editingForfait, setEditingForfait] = useState(null); // null = nouveau, sinon = nom du forfait
  const [forfaitForm, setForfaitForm] = useState({
    nom: '',
    icon: '💫',
    seances: 5,
    prix: 0,
    prixBarre: 0,
    resultat: '',
    popular: false
  });
  
  // Ouvrir le modal pour ajouter un forfait
  const openNewForfaitModal = () => {
    setEditingForfait(null);
    setForfaitForm({
      nom: '',
      icon: '💫',
      seances: 5,
      prix: 0,
      prixBarre: 0,
      resultat: '',
      popular: false
    });
    setShowForfaitModal(true);
  };
  
  // Ouvrir le modal pour modifier un forfait
  const openEditForfaitModal = (nomForfait) => {
    const forfait = forfaits[nomForfait];
    setEditingForfait(nomForfait);
    setForfaitForm({
      nom: nomForfait,
      icon: forfait.icon || '💫',
      seances: forfait.seances || 5,
      prix: forfait.prix || 0,
      prixBarre: forfait.prixBarre || 0,
      resultat: forfait.resultat || '',
      popular: forfait.popular || false
    });
    setShowForfaitModal(true);
  };
  
  // Sauvegarder un forfait (ajout ou modification)
  const handleSaveForfait = () => {
    if (!forfaitForm.nom.trim()) {
      alert('Veuillez entrer un nom de forfait');
      return;
    }
    if (forfaitForm.prix <= 0) {
      alert('Veuillez entrer un prix valide');
      return;
    }
    
    const isEditing = editingForfait !== null;
    const message = isEditing ? `Forfait "${forfaitForm.nom}" modifié avec succès !` : `Nouveau forfait "${forfaitForm.nom}" créé avec succès !`;
    
    setForfaits(prev => {
      const newForfaits = { ...prev };
      
      // Si on modifie et que le nom a changé, supprimer l'ancien
      if (editingForfait && editingForfait !== forfaitForm.nom) {
        delete newForfaits[editingForfait];
      }
      
      // Ajouter/Modifier le forfait
      newForfaits[forfaitForm.nom] = {
        icon: forfaitForm.icon,
        seances: parseInt(forfaitForm.seances),
        prix: parseInt(forfaitForm.prix),
        prixBarre: parseInt(forfaitForm.prixBarre) || parseInt(forfaitForm.prix),
        resultat: forfaitForm.resultat,
        popular: forfaitForm.popular
      };
      
      return newForfaits;
    });
    
    setShowForfaitModal(false);
    alert(message);
  };
  
  // Supprimer un forfait
  const handleDeleteForfait = (nomForfait) => {
    // Vérifier si des clientes utilisent ce forfait
    const clientsWithForfait = clients.filter(c => c.forfait === nomForfait);
    if (clientsWithForfait.length > 0) {
      alert(`Impossible de supprimer : ${clientsWithForfait.length} cliente(s) utilisent ce forfait`);
      return;
    }
    
    if (window.confirm(`Supprimer le forfait "${nomForfait}" ?`)) {
      setForfaits(prev => {
        const newForfaits = { ...prev };
        delete newForfaits[nomForfait];
        return newForfaits;
      });
      alert(`Forfait "${nomForfait}" supprimé`);
    }
  };
  
  // Fonction pour ajouter un suivi
  const handleAddSuivi = () => {
    if (!suiviForm.note.trim()) { alert('Veuillez entrer une note'); return; }
    const newSuivi = {
      id: Date.now(),
      date: suiviForm.date,
      duree: parseInt(suiviForm.duree),
      note: suiviForm.note,
      employeeId: currentUser.id
    };
    setClients(prev => prev.map(c => 
      c.id === selectedClient.id 
        ? { ...c, suivis: [newSuivi, ...c.suivis] }
        : c
    ));
    setSelectedClient(prev => ({ ...prev, suivis: [newSuivi, ...prev.suivis] }));
    setShowSuiviModal(false);
    setSuiviForm({ date: new Date().toISOString().split('T')[0], duree: '45', note: '' });
  };
  
  // Fonction pour modifier un suivi
  const handleUpdateSuivi = () => {
    setClients(prev => prev.map(c => 
      c.id === selectedClient.id 
        ? { ...c, suivis: c.suivis.map(s => s.id === editingSuivi.id ? { ...s, ...suiviForm, duree: parseInt(suiviForm.duree) } : s) }
        : c
    ));
    setSelectedClient(prev => ({ ...prev, suivis: prev.suivis.map(s => s.id === editingSuivi.id ? { ...s, ...suiviForm, duree: parseInt(suiviForm.duree) } : s) }));
    setShowSuiviModal(false);
    setEditingSuivi(null);
    setSuiviForm({ date: new Date().toISOString().split('T')[0], duree: '45', note: '' });
  };
  
  // Fonction pour supprimer un suivi
  const handleDeleteSuivi = (suiviId) => {
    if (!window.confirm('Supprimer ce suivi ?')) return;
    setClients(prev => prev.map(c => 
      c.id === selectedClient.id 
        ? { ...c, suivis: c.suivis.filter(s => s.id !== suiviId) }
        : c
    ));
    setSelectedClient(prev => ({ ...prev, suivis: prev.suivis.filter(s => s.id !== suiviId) }));
  };
  
  // Fonction pour ajouter une mensuration
  const handleAddMesure = () => {
    if (!mesureForm.tour_taille || !mesureForm.tour_hanches || !mesureForm.tour_cuisses) { 
      alert('Veuillez remplir toutes les mesures'); return; 
    }
    const newMesure = {
      id: Date.now(),
      date: mesureForm.date,
      tour_taille: parseInt(mesureForm.tour_taille),
      tour_hanches: parseInt(mesureForm.tour_hanches),
      tour_cuisses: parseInt(mesureForm.tour_cuisses)
    };
    setClients(prev => prev.map(c => 
      c.id === selectedClient.id 
        ? { ...c, mesures: [newMesure, ...c.mesures] }
        : c
    ));
    setSelectedClient(prev => ({ ...prev, mesures: [newMesure, ...prev.mesures] }));
    setShowMesureModal(false);
    setMesureForm({ date: new Date().toISOString().split('T')[0], tour_taille: '', tour_hanches: '', tour_cuisses: '' });
  };
  
  // Fonction pour supprimer une mensuration
  const handleDeleteMesure = (mesureId) => {
    if (!window.confirm('Supprimer cette mensuration ?')) return;
    setClients(prev => prev.map(c => 
      c.id === selectedClient.id 
        ? { ...c, mesures: c.mesures.filter(m => m.id !== mesureId) }
        : c
    ));
    setSelectedClient(prev => ({ ...prev, mesures: prev.mesures.filter(m => m.id !== mesureId) }));
  };
  
  // Fonction pour ajouter une photo
  const handleAddPhoto = (type) => {
    const newPhoto = {
      id: Date.now(),
      type: type.toLowerCase(),
      url: 'uploaded',
      date: new Date().toISOString().split('T')[0]
    };
    const existingIndex = selectedClient.photos.findIndex(p => p.type === type.toLowerCase());
    let newPhotos;
    if (existingIndex >= 0) {
      newPhotos = selectedClient.photos.map((p, i) => i === existingIndex ? newPhoto : p);
    } else {
      newPhotos = [...selectedClient.photos, newPhoto];
    }
    setClients(prev => prev.map(c => 
      c.id === selectedClient.id ? { ...c, photos: newPhotos } : c
    ));
    setSelectedClient(prev => ({ ...prev, photos: newPhotos }));
    setShowPhotoModal(null);
  };
  
  // Fonction pour créer un nouveau RDV
  const handleCreateRdv = async () => {
    if (!rdvForm.date || !rdvForm.heure) { alert('Veuillez remplir la date et l\'heure'); return; }
    const newRdv = {
      id: Date.now(),
      clientId: selectedClient.id,
      employeeId: selectedClient.assignedTo,
      date: rdvForm.date,
      heure: rdvForm.heure,
      duree: parseInt(rdvForm.duree),
      type: rdvForm.type,
      statut: 'en attente'
    };
    
    // Envoyer à Airtable
    try {
      const result = await apiCreateRdv({
        client_id: newRdv.clientId,
        client_nom: selectedClient.nom,
        employee_id: newRdv.employeeId,
        date: newRdv.date,
        heure: newRdv.heure,
        duree: newRdv.duree,
        type: newRdv.type,
        statut: newRdv.statut
      });
      console.log('✅ RDV créé dans Airtable:', result);
      if (result.id) {
        newRdv.airtable_id = result.id;
      }
    } catch (error) {
      console.error('⚠️ Erreur Airtable RDV:', error);
    }
    
    setRdvs(prev => [...prev, newRdv]);
    setShowRdvModal(false);
    setRdvForm({ date: '', heure: '', duree: '45', type: 'Séance G5' });
    addNotification({ type: 'schedule', message: `Nouveau RDV : ${selectedClient.nom} - ${rdvForm.date}`, forEmployee: selectedClient.assignedTo });
  };
  
  // Calculer séances effectuées depuis les RDV passés
  const getSeancesEffectuees = (clientId) => {
    const today = new Date().toISOString().split('T')[0];
    return rdvs.filter(r => r.clientId === clientId && r.date < today && r.statut === 'confirmé').length;
  };
  
  // ============================================
  // FONCTIONS DE SYNCHRONISATION GLOBALES
  // ============================================
  
  // Mettre à jour le statut d'un client automatiquement
  const updateClientStatus = (clientId) => {
    setClients(prev => prev.map(c => {
      if (c.id !== clientId) return c;
      const seancesEffectuees = rdvs.filter(r => r.clientId === clientId && r.date < new Date().toISOString().split('T')[0] && r.statut === 'confirmé').length;
      const progression = c.poidsInitial - c.poidsActuel;
      const objectifAtteint = c.poidsActuel <= c.objectif;
      
      let newStatut = c.statut;
      if (seancesEffectuees >= c.seancesTotal || objectifAtteint) {
        newStatut = 'terminé';
      } else if (seancesEffectuees > 0 || c.paiements.length > 0) {
        newStatut = 'active';
      }
      return { ...c, statut: newStatut };
    }));
  };
  
  // Marquer une séance comme effectuée (appelé quand RDV passe et confirmé)
  const markSeanceAsCompleted = (rdvId) => {
    const rdv = rdvs.find(r => r.id === rdvId);
    if (!rdv) return;
    
    // Mettre le RDV en confirmé
    setRdvs(prev => prev.map(r => r.id === rdvId ? { ...r, statut: 'confirmé' } : r));
    
    // Mettre à jour le statut du client
    updateClientStatus(rdv.clientId);
    
    // Notifier
    const client = clients.find(c => c.id === rdv.clientId);
    addNotification({
      type: 'success',
      message: `Séance confirmée : ${client?.nom}`,
      forEmployee: rdv.employeeId
    });
  };
  
  // Modifier les stocks (utilisable par tous)
  const updateStock = (employeeId, stockId, newQuantity) => {
    setStocks(prev => ({
      ...prev,
      [employeeId]: prev[employeeId].map(s => 
        s.id === stockId ? { ...s, quantite: newQuantity } : s
      )
    }));
    
    // Alerter si stock bas
    const stock = stocks[employeeId]?.find(s => s.id === stockId);
    if (stock && newQuantity <= stock.seuil) {
      addNotification({
        type: 'warning',
        message: `Stock bas : ${stock.nom} (${newQuantity} restant)`,
        forEmployee: employeeId
      });
    }
  };
  
  // Ajouter un paiement (synchronisé avec CA global)
  const addPayment = (clientId, montant, methode) => {
    const newPaiement = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      montant: parseInt(montant),
      methode,
      statut: 'payé'
    };
    
    setClients(prev => prev.map(c => 
      c.id === clientId 
        ? { ...c, paiements: [...c.paiements, newPaiement], statut: 'active' }
        : c
    ));
    
    // Mettre à jour le client sélectionné si c'est lui
    if (selectedClient?.id === clientId) {
      setSelectedClient(prev => ({ ...prev, paiements: [...prev.paiements, newPaiement], statut: 'active' }));
    }
    
    const client = clients.find(c => c.id === clientId);
    addNotification({
      type: 'success',
      message: `Paiement reçu : ${client?.nom} - ${montant}€`,
      forEmployee: null
    });
  };
  
  // Calculer les stats globales en temps réel
  const getGlobalStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const thisWeekStart = new Date();
    thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay() + 1);
    const thisWeekStartStr = thisWeekStart.toISOString().split('T')[0];
    
    return {
      totalClients: clients.length,
      clientsActifs: clients.filter(c => c.statut === 'active').length,
      clientsTermines: clients.filter(c => c.statut === 'terminé').length,
      prospects: clients.filter(c => c.statut === 'prospect').length,
      rdvsAujourdHui: rdvs.filter(r => r.date === today).length,
      rdvsSemaine: rdvs.filter(r => r.date >= thisWeekStartStr).length,
      caTotal: clients.reduce((acc, c) => acc + c.paiements.reduce((a, p) => a + p.montant, 0), 0),
      caMois: clients.reduce((acc, c) => acc + c.paiements.filter(p => p.date.startsWith(today.substring(0, 7))).reduce((a, p) => a + p.montant, 0), 0),
      seancesTotales: rdvs.filter(r => r.date < today && r.statut === 'confirmé').length,
      poidsPerduTotal: clients.reduce((acc, c) => acc + (c.poidsInitial - c.poidsActuel), 0),
      stocksAlerte: Object.values(stocks).flat().filter(s => s.quantite <= s.seuil).length
    };
  };
  
  // Stats par employé (pour la directrice)
  const getEmployeeStats = (employeeId) => {
    const empClients = clients.filter(c => c.assignedTo === employeeId);
    const empRdvs = rdvs.filter(r => r.employeeId === employeeId);
    const today = new Date().toISOString().split('T')[0];
    
    return {
      clientsActifs: empClients.filter(c => c.statut === 'active').length,
      clientsTotal: empClients.length,
      rdvsAVenir: empRdvs.filter(r => r.date >= today).length,
      seancesEffectuees: empRdvs.filter(r => r.date < today && r.statut === 'confirmé').length,
      suivis: empClients.reduce((acc, c) => acc + c.suivis.filter(s => s.employeeId === employeeId).length, 0),
      ca: empClients.reduce((acc, c) => acc + c.paiements.reduce((a, p) => a + p.montant, 0), 0),
      stocksAlerte: (stocks[employeeId] || []).filter(s => s.quantite <= s.seuil).length
    };
  };
  
  // Obtenir tous les suivis récents (pour la directrice)
  const getAllRecentSuivis = () => {
    return clients
      .flatMap(c => c.suivis.map(s => ({ ...s, clientId: c.id, clientNom: c.nom, clientForfait: c.forfait })))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  };
  
  // Vérifier si un RDV est passé et non traité
  const checkPendingRdvs = () => {
    const today = new Date().toISOString().split('T')[0];
    return rdvs.filter(r => r.date < today && r.statut === 'en attente');
  };
  
  // Créer une nouvelle praticienne
  const handleCreateEmployee = () => {
    if (!newEmployeeForm.nom || !newEmployeeForm.email || !newEmployeeForm.password) {
      alert('Veuillez remplir le nom, l\'email et le mot de passe');
      return;
    }
    
    const newEmployee = {
      id: Date.now(),
      nom: newEmployeeForm.nom,
      role: 'Praticienne',
      email: newEmployeeForm.email,
      telephone: newEmployeeForm.telephone || '',
      password: newEmployeeForm.password,
      actif: true,
      isDirector: false,
      dateEmbauche: newEmployeeForm.dateEmbauche || new Date().toISOString().split('T')[0],
      onboardingComplete: false,
      photo: null
    };
    
    setEmployees(prev => [...prev, newEmployee]);
    
    // Créer des stocks par défaut pour la nouvelle employée
    setStocks(prev => ({
      ...prev,
      [newEmployee.id]: [
        { id: 1, nom: 'Gel conducteur', quantite: 10, seuil: 3, unite: 'tubes', prix: 12.50 },
        { id: 2, nom: 'Huile de massage', quantite: 8, seuil: 3, unite: 'flacons', prix: 18.00 },
        { id: 3, nom: 'Draps jetables', quantite: 50, seuil: 20, unite: 'unités', prix: 0.50 },
        { id: 4, nom: 'Gants jetables', quantite: 100, seuil: 30, unite: 'unités', prix: 0.15 },
        { id: 5, nom: 'Crème amincissante', quantite: 5, seuil: 2, unite: 'pots', prix: 35.00 }
      ]
    }));
    
    // Ajouter la couleur pour la nouvelle employée
    EMPLOYEE_COLORS[newEmployee.id] = { 
      bg: 'rgba(34, 197, 94, 0.2)', 
      border: '#22c55e', 
      text: '#22c55e' 
    };
    
    setShowModal(null);
    setNewEmployeeForm({ nom: '', telephone: '', email: '', password: '', dateEmbauche: '' });
    
    addNotification({
      type: 'success',
      message: `Nouvelle praticienne ajoutée : ${newEmployee.nom}`,
      forEmployee: null
    });
  };
  
  // Réassigner une cliente et mettre à jour les RDV associés
  const reassignClient = (clientId, newEmployeeId) => {
    const oldClient = clients.find(c => c.id === clientId);
    const oldEmployeeId = oldClient?.assignedTo;
    
    // Mettre à jour le client
    setClients(prev => prev.map(c => 
      c.id === clientId ? { ...c, assignedTo: newEmployeeId } : c
    ));
    
    // Mettre à jour les RDV futurs de ce client
    const today = new Date().toISOString().split('T')[0];
    setRdvs(prev => prev.map(r => 
      r.clientId === clientId && r.date >= today 
        ? { ...r, employeeId: newEmployeeId }
        : r
    ));
    
    // Notifier les employées concernées
    if (newEmployeeId && newEmployeeId !== oldEmployeeId) {
      const client = clients.find(c => c.id === clientId);
      addNotification({
        type: 'info',
        message: `Nouvelle cliente assignée : ${client?.nom}`,
        forEmployee: newEmployeeId
      });
      
      if (oldEmployeeId) {
        addNotification({
          type: 'info',
          message: `Cliente retirée : ${client?.nom}`,
          forEmployee: oldEmployeeId
        });
      }
    }
  };
  
  // Filtrer les suivis selon l'employée sélectionnée
  const getFilteredSuivis = () => {
    const allSuivis = clients.flatMap(c => c.suivis.map(s => ({ ...s, clientNom: c.nom, clientId: c.id, clientForfait: c.forfait })));
    if (suiviFilter === 'all') return allSuivis.sort((a, b) => new Date(b.date) - new Date(a.date));
    return allSuivis.filter(s => s.employeeId === parseInt(suiviFilter)).sort((a, b) => new Date(b.date) - new Date(a.date));
  };
  
  // ============================================
  // FONCTIONS MESSAGERIE INTERNE
  // ============================================
  
  // Obtenir les conversations de l'utilisateur actuel
  const getConversations = () => {
    const userMessages = messages.filter(m => m.fromId === currentUser?.id || m.toId === currentUser?.id);
    const contacts = new Set();
    userMessages.forEach(m => {
      if (m.fromId !== currentUser?.id) contacts.add(m.fromId);
      if (m.toId !== currentUser?.id) contacts.add(m.toId);
    });
    
    return Array.from(contacts).map(contactId => {
      const contact = employees.find(e => e.id === contactId);
      const conversationMessages = messages.filter(m => 
        (m.fromId === currentUser?.id && m.toId === contactId) ||
        (m.fromId === contactId && m.toId === currentUser?.id)
      ).sort((a, b) => new Date(a.date) - new Date(b.date));
      
      const lastMessage = conversationMessages[conversationMessages.length - 1];
      const unreadCount = conversationMessages.filter(m => m.toId === currentUser?.id && !m.lu).length;
      
      return {
        contactId,
        contact,
        lastMessage,
        unreadCount,
        messages: conversationMessages
      };
    }).sort((a, b) => new Date(b.lastMessage?.date || 0) - new Date(a.lastMessage?.date || 0));
  };
  
  // Envoyer un message
  const sendMessage = (toId, messageText, type = 'normal') => {
    if (!messageText.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      fromId: currentUser.id,
      toId: toId,
      message: messageText.trim(),
      date: new Date().toISOString(),
      lu: false,
      type: type
    };
    
    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');
    
    // Notification pour le destinataire
    addNotification({
      type: 'info',
      message: `Nouveau message de ${currentUser.nom.split(' ')[0]}`,
      forEmployee: toId
    });
  };
  
  // Marquer les messages comme lus
  const markMessagesAsRead = (contactId) => {
    setMessages(prev => prev.map(m => 
      m.fromId === contactId && m.toId === currentUser?.id && !m.lu
        ? { ...m, lu: true }
        : m
    ));
  };
  
  // Compter les messages non lus
  const getUnreadCount = () => {
    return messages.filter(m => m.toId === currentUser?.id && !m.lu).length;
  };
  
  // ============================================
  // FONCTIONS EXPORT TRANSFORMATIONS
  // ============================================
  
  // Générer les données pour l'export PDF
  const generateExportData = (client) => {
    const forfaitInfo = FORFAITS[client.forfait] || {};
    const poidsPerdu = client.poidsInitial - client.poidsActuel;
    const progressionPoids = ((poidsPerdu / (client.poidsInitial - client.objectif)) * 100).toFixed(0);
    const seancesEffectuees = getSeancesEffectuees(client.id);
    
    // Calcul des mesures perdues
    const premieresMesures = client.mesures[0] || {};
    const dernieresMesures = client.mesures[client.mesures.length - 1] || {};
    const cmPerdus = {
      taille: (premieresMesures.tour_taille || 0) - (dernieresMesures.tour_taille || 0),
      hanches: (premieresMesures.tour_hanches || 0) - (dernieresMesures.tour_hanches || 0),
      cuisses: (premieresMesures.tour_cuisses || 0) - (dernieresMesures.tour_cuisses || 0)
    };
    
    return {
      client,
      forfaitInfo,
      poidsPerdu,
      progressionPoids: Math.min(100, Math.max(0, progressionPoids)),
      seancesEffectuees,
      cmPerdus,
      totalCmPerdus: cmPerdus.taille + cmPerdus.hanches + cmPerdus.cuisses,
      dateDebut: client.mesures[0]?.date || client.paiements[0]?.date || 'N/A',
      dateFin: new Date().toLocaleDateString('fr-FR')
    };
  };
  
  // Générer le contenu HTML pour le PDF
  const generatePDFContent = (client) => {
    const data = generateExportData(client);
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Transformation SLIM TOUCH - ${client.nom}</title>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 40px; background: #fff; color: #1a1a2e; }
    .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #c9a962; padding-bottom: 20px; }
    .logo { font-size: 32px; font-weight: bold; color: #c9a962; }
    .subtitle { color: #666; margin-top: 5px; }
    .client-name { font-size: 28px; margin: 20px 0 10px; color: #1a1a2e; }
    .forfait { display: inline-block; background: linear-gradient(135deg, #c9a962, #e8d5a3); padding: 8px 20px; border-radius: 20px; color: #1a1a2e; font-weight: bold; }
    .results { display: flex; justify-content: space-around; margin: 40px 0; flex-wrap: wrap; gap: 20px; }
    .result-box { text-align: center; padding: 25px 30px; background: linear-gradient(135deg, #f8f4ec, #fff); border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); min-width: 150px; }
    .result-value { font-size: 42px; font-weight: bold; color: #c9a962; }
    .result-label { color: #666; margin-top: 5px; font-size: 14px; }
    .measurements { margin: 30px 0; }
    .measurement-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #eee; }
    .photos-section { margin: 40px 0; text-align: center; }
    .photos-grid { display: flex; justify-content: center; gap: 30px; margin-top: 20px; }
    .photo-box { width: 200px; height: 280px; background: #f0f0f0; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #999; }
    .section-title { font-size: 18px; color: #1a1a2e; margin: 30px 0 15px; padding-bottom: 10px; border-bottom: 2px solid #c9a962; }
    .footer { text-align: center; margin-top: 50px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px; }
    .guarantee { background: linear-gradient(135deg, #c9a962, #e8d5a3); color: #1a1a2e; padding: 15px 25px; border-radius: 10px; text-align: center; margin: 30px 0; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">✨ SLIM TOUCH</div>
    <div class="subtitle">Massage G5 • Résultats Garantis</div>
    <div class="client-name">${client.nom}</div>
    <div class="forfait">${data.forfaitInfo.icon || '💫'} ${client.forfait}</div>
  </div>
  
  <div class="results">
    <div class="result-box">
      <div class="result-value">-${data.poidsPerdu} kg</div>
      <div class="result-label">Poids perdu</div>
    </div>
    <div class="result-box">
      <div class="result-value">-${data.totalCmPerdus} cm</div>
      <div class="result-label">Centimètres perdus</div>
    </div>
    <div class="result-box">
      <div class="result-value">${data.seancesEffectuees}</div>
      <div class="result-label">Séances réalisées</div>
    </div>
    <div class="result-box">
      <div class="result-value">${data.progressionPoids}%</div>
      <div class="result-label">Objectif atteint</div>
    </div>
  </div>
  
  <div class="section-title">📏 Évolution des mensurations</div>
  <div class="measurements">
    <div class="measurement-row">
      <span>Tour de taille</span>
      <span><strong>-${data.cmPerdus.taille} cm</strong></span>
    </div>
    <div class="measurement-row">
      <span>Tour de hanches</span>
      <span><strong>-${data.cmPerdus.hanches} cm</strong></span>
    </div>
    <div class="measurement-row">
      <span>Tour de cuisses</span>
      <span><strong>-${data.cmPerdus.cuisses} cm</strong></span>
    </div>
  </div>
  
  <div class="photos-section">
    <div class="section-title">📸 Transformation visuelle</div>
    <div class="photos-grid">
      <div>
        <div class="photo-box">${client.photos.find(p => p.type === 'avant') ? '📷 Avant' : 'Photo avant'}</div>
        <div style="margin-top:10px;color:#666;">AVANT</div>
      </div>
      <div>
        <div class="photo-box">${client.photos.find(p => p.type === 'après') ? '📷 Après' : 'Photo après'}</div>
        <div style="margin-top:10px;color:#666;">APRÈS</div>
      </div>
    </div>
  </div>
  
  <div class="guarantee">
    ✅ Programme du ${data.dateDebut} au ${data.dateFin}
  </div>
  
  <div class="footer">
    <p>SLIM TOUCH - Massage G5 Professionnel</p>
    <p>📞 06 XX XX XX XX • 📍 Amiens & alentours</p>
    <p>www.slimtouch.fr</p>
  </div>
</body>
</html>`;
  };
  
  // Exporter en PDF (ouvre dans nouvelle fenêtre pour impression)
  const exportToPDF = (client) => {
    const content = generatePDFContent(client);
    const printWindow = window.open('', '_blank');
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
  };
  
  // Générer le texte pour partage WhatsApp/SMS
  const generateShareText = (client) => {
    const data = generateExportData(client);
    return `✨ TRANSFORMATION SLIM TOUCH ✨

🎯 Résultats de ${client.nom.split(' ')[0]} :
• -${data.poidsPerdu} kg perdus
• -${data.totalCmPerdus} cm en moins
• ${data.seancesEffectuees} séances réalisées
• ${data.progressionPoids}% de l'objectif atteint !

💪 Programme ${client.forfait}

Vous aussi, transformez votre corps avec notre méthode G5 garantie !

📞 Contactez-nous pour votre séance découverte
🌐 www.slimtouch.fr`;
  };
  
  // Partager via WhatsApp
  const shareViaWhatsApp = (client, includePreview = true) => {
    const text = generateShareText(client);
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };
  
  // Partager via SMS
  const shareViaSMS = (client) => {
    const text = generateShareText(client);
    // sms: ne fonctionne pas partout, on utilise le format le plus compatible
    window.location.href = `sms:?body=${encodeURIComponent(text)}`;
  };
  
  // Copier le texte de partage
  const copyShareText = async (client) => {
    const text = generateShareText(client);
    try {
      await navigator.clipboard.writeText(text);
      addNotification({
        type: 'success',
        message: 'Texte copié dans le presse-papier !',
        forEmployee: currentUser?.id
      });
    } catch (err) {
      // Fallback pour les navigateurs plus anciens
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      addNotification({
        type: 'success',
        message: 'Texte copié !',
        forEmployee: currentUser?.id
      });
    }
  };
  
  // ============================================
  // GESTION DES PAIEMENTS AVANCÉE
  // ============================================
  
  // Obtenir tous les paiements avec infos clients
  const getAllPaiements = () => {
    const allPaiements = [];
    clients.forEach(client => {
      client.paiements.forEach(p => {
        allPaiements.push({
          ...p,
          clientId: client.id,
          clientNom: client.nom,
          clientEmail: client.email,
          clientTelephone: client.telephone,
          forfait: client.forfait
        });
      });
    });
    return allPaiements.sort((a, b) => new Date(b.date) - new Date(a.date));
  };
  
  // Statistiques de paiements
  const getPaiementStats = () => {
    const allPaiements = getAllPaiements();
    const today = new Date();
    const thisMonth = today.getMonth();
    const thisYear = today.getFullYear();
    
    // CA Total (paiements payés uniquement)
    const caTotal = allPaiements.filter(p => p.statut === 'payé').reduce((acc, p) => acc + p.montant, 0);
    
    // CA ce mois
    const caMois = allPaiements.filter(p => {
      const pDate = new Date(p.date);
      return p.statut === 'payé' && pDate.getMonth() === thisMonth && pDate.getFullYear() === thisYear;
    }).reduce((acc, p) => acc + p.montant, 0);
    
    // En attente
    const enAttente = allPaiements.filter(p => p.statut === 'en_attente').reduce((acc, p) => acc + p.montant, 0);
    
    // En relance
    const enRelance = allPaiements.filter(p => p.statut === 'relance').reduce((acc, p) => acc + p.montant, 0);
    
    // Nombre de paiements par statut
    const nbPaye = allPaiements.filter(p => p.statut === 'payé').length;
    const nbAttente = allPaiements.filter(p => p.statut === 'en_attente').length;
    const nbRelance = allPaiements.filter(p => p.statut === 'relance').length;
    
    // CA par praticienne
    const caParPraticienne = {};
    employees.filter(e => !e.isDirector).forEach(emp => {
      caParPraticienne[emp.id] = allPaiements
        .filter(p => p.statut === 'payé' && p.employeeId === emp.id)
        .reduce((acc, p) => acc + p.montant, 0);
    });
    
    // CA par mois (6 derniers mois)
    const caParMois = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date(thisYear, thisMonth - i, 1);
      const month = date.toLocaleDateString('fr-FR', { month: 'short' });
      const ca = allPaiements.filter(p => {
        const pDate = new Date(p.date);
        return p.statut === 'payé' && pDate.getMonth() === date.getMonth() && pDate.getFullYear() === date.getFullYear();
      }).reduce((acc, p) => acc + p.montant, 0);
      caParMois.push({ mois: month, ca, objectif: 3000 });
    }
    
    return {
      caTotal,
      caMois,
      enAttente,
      enRelance,
      nbPaye,
      nbAttente,
      nbRelance,
      caParPraticienne,
      caParMois,
      tauxRecouvrement: Math.round((caTotal / (caTotal + enAttente + enRelance)) * 100) || 100
    };
  };
  
  // Créer un paiement échelonné (3x sans frais)
  const createEchelonnement = (clientId, montantTotal, methode, employeeId) => {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;
    
    const today = new Date();
    const factureNumero = `F${today.getFullYear()}-${String(Date.now()).slice(-4)}`;
    const montantEcheance = Math.round((montantTotal / 3) * 100) / 100;
    const reste = montantTotal - (montantEcheance * 2);
    
    const newPaiements = [
      {
        id: Date.now(),
        date: today.toISOString().split('T')[0],
        montant: montantEcheance,
        methode,
        statut: 'payé',
        type: '3x',
        echeance: 1,
        totalEcheances: 3,
        montantTotal,
        factureNumero,
        employeeId
      },
      {
        id: Date.now() + 1,
        date: new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()).toISOString().split('T')[0],
        montant: montantEcheance,
        methode,
        statut: 'en_attente',
        type: '3x',
        echeance: 2,
        totalEcheances: 3,
        montantTotal,
        factureNumero,
        employeeId
      },
      {
        id: Date.now() + 2,
        date: new Date(today.getFullYear(), today.getMonth() + 2, today.getDate()).toISOString().split('T')[0],
        montant: reste,
        methode,
        statut: 'en_attente',
        type: '3x',
        echeance: 3,
        totalEcheances: 3,
        montantTotal,
        factureNumero,
        employeeId
      }
    ];
    
    setClients(prev => prev.map(c => 
      c.id === clientId 
        ? { ...c, paiements: [...c.paiements, ...newPaiements], statut: 'active' }
        : c
    ));
    
    addNotification({
      type: 'success',
      message: `Paiement 3x sans frais créé pour ${client.nom} (${montantTotal}€)`,
      forEmployee: null
    });
    
    return factureNumero;
  };
  
  // Marquer un paiement comme payé
  const markPaiementAsPaid = (clientId, paiementId) => {
    setClients(prev => prev.map(c => {
      if (c.id !== clientId) return c;
      return {
        ...c,
        paiements: c.paiements.map(p => 
          p.id === paiementId ? { ...p, statut: 'payé', datePaiement: new Date().toISOString().split('T')[0] } : p
        )
      };
    }));
    
    addNotification({
      type: 'success',
      message: 'Paiement marqué comme reçu',
      forEmployee: currentUser?.id
    });
  };
  
  // Envoyer une relance
  const sendRelance = (clientId, paiementId) => {
    setClients(prev => prev.map(c => {
      if (c.id !== clientId) return c;
      return {
        ...c,
        paiements: c.paiements.map(p => 
          p.id === paiementId 
            ? { 
                ...p, 
                statut: 'relance', 
                relanceDate: new Date().toISOString().split('T')[0],
                relanceCount: (p.relanceCount || 0) + 1
              } 
            : p
        )
      };
    }));
    
    const client = clients.find(c => c.id === clientId);
    addNotification({
      type: 'warning',
      message: `Relance envoyée à ${client?.nom}`,
      forEmployee: currentUser?.id
    });
  };
  
  // Générer une facture PDF
  const generateFacturePDF = (paiement, client) => {
    const forfaitInfo = FORFAITS[client.forfait] || {};
    const content = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Facture ${paiement.factureNumero || 'N/A'}</title>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 40px; background: #fff; color: #333; }
    .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
    .logo { font-size: 28px; font-weight: bold; color: #c9a962; }
    .facture-info { text-align: right; }
    .facture-numero { font-size: 24px; font-weight: bold; color: #1a1a2e; }
    .section { margin: 30px 0; }
    .section-title { font-size: 14px; color: #666; text-transform: uppercase; margin-bottom: 10px; }
    .client-info { background: #f8f8f8; padding: 20px; border-radius: 8px; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th { background: #1a1a2e; color: white; padding: 12px; text-align: left; }
    td { padding: 12px; border-bottom: 1px solid #eee; }
    .total-row { font-weight: bold; background: #f8f8f8; }
    .total-amount { font-size: 24px; color: #c9a962; }
    .footer { margin-top: 50px; text-align: center; color: #999; font-size: 12px; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; }
    .badge-success { background: #d4edda; color: #155724; }
    .badge-warning { background: #fff3cd; color: #856404; }
    .badge-danger { background: #f8d7da; color: #721c24; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="logo">✨ SLIM TOUCH</div>
      <p>Massage G5 Professionnel</p>
      <p>SIRET : XXX XXX XXX XXXXX</p>
    </div>
    <div class="facture-info">
      <div class="facture-numero">FACTURE</div>
      <p><strong>${paiement.factureNumero || 'N/A'}</strong></p>
      <p>Date : ${new Date(paiement.date).toLocaleDateString('fr-FR')}</p>
      <p>
        <span class="badge ${paiement.statut === 'payé' ? 'badge-success' : paiement.statut === 'relance' ? 'badge-danger' : 'badge-warning'}">
          ${paiement.statut === 'payé' ? '✓ PAYÉE' : paiement.statut === 'relance' ? '⚠ EN RELANCE' : '⏳ EN ATTENTE'}
        </span>
      </p>
    </div>
  </div>
  
  <div class="section">
    <div class="section-title">Facturé à</div>
    <div class="client-info">
      <strong>${client.nom}</strong><br>
      ${client.adresse}<br>
      ${client.email}<br>
      ${client.telephone}
    </div>
  </div>
  
  <div class="section">
    <div class="section-title">Détail de la prestation</div>
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Qté</th>
          <th>Prix unitaire</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>${forfaitInfo.icon || '💫'} ${client.forfait}</strong><br>
            <span style="color:#666;font-size:12px">${forfaitInfo.seances || '?'} séances - ${forfaitInfo.resultat || ''}</span>
            ${paiement.type === '3x' ? '<br><span style="color:#c9a962;font-size:12px">Paiement en 3x sans frais - Échéance ' + paiement.echeance + '/' + paiement.totalEcheances + '</span>' : ''}
          </td>
          <td>1</td>
          <td>${paiement.type === '3x' ? paiement.montantTotal : paiement.montant}€</td>
          <td>${paiement.type === '3x' ? paiement.montantTotal : paiement.montant}€</td>
        </tr>
        ${paiement.type === '3x' ? `
        <tr>
          <td colspan="3" style="text-align:right">Échéance ${paiement.echeance}/${paiement.totalEcheances}</td>
          <td><strong>${paiement.montant}€</strong></td>
        </tr>
        ` : ''}
      </tbody>
    </table>
  </div>
  
  <div style="text-align: right; margin-top: 30px;">
    <p style="font-size: 14px; color: #666;">Total TTC</p>
    <p class="total-amount">${paiement.montant}€</p>
    <p style="font-size: 12px; color: #666;">TVA non applicable, art. 293B du CGI</p>
  </div>
  
  <div class="section" style="margin-top: 40px;">
    <div class="section-title">Conditions de paiement</div>
    <p>Mode de paiement : <strong>${paiement.methode}</strong></p>
    ${paiement.type === '3x' ? '<p>Échéancier : 3 fois sans frais</p>' : ''}
    <p>Date d\'échéance : ${new Date(paiement.date).toLocaleDateString('fr-FR')}</p>
  </div>
  
  <div class="footer">
    <p>SLIM TOUCH - Massage G5 Professionnel</p>
    <p>📞 06 XX XX XX XX • 📧 contact@slimtouch.fr</p>
    <p>Merci pour votre confiance !</p>
  </div>
</body>
</html>`;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
  };
  
  // ============================================
  // DONNÉES POUR LES GRAPHIQUES
  // ============================================
  
  // Données de progression du poids pour un client
  const getClientWeightData = (client) => {
    if (!client) return [];
    
    const data = [];
    // Point initial
    if (client.poidsInitial) {
      data.push({
        date: 'Début',
        poids: client.poidsInitial,
        objectif: client.objectif
      });
    }
    
    // Points des mesures
    client.mesures.forEach((m, i) => {
      data.push({
        date: new Date(m.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
        poids: client.poidsActuel - (client.mesures.length - 1 - i) * 0.5, // Estimation
        objectif: client.objectif
      });
    });
    
    // Point actuel
    data.push({
      date: 'Actuel',
      poids: client.poidsActuel,
      objectif: client.objectif
    });
    
    return data;
  };
  
  // Données de mesures pour un client
  const getClientMeasurementsData = (client) => {
    if (!client || !client.mesures.length) return [];
    
    return client.mesures.map(m => ({
      date: new Date(m.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
      taille: m.tour_taille,
      hanches: m.tour_hanches,
      cuisses: m.tour_cuisses
    }));
  };
  
  // Données de conversion prospects
  const getConversionData = () => {
    const prospects = clients.filter(c => c.statut === 'prospect').length;
    const actives = clients.filter(c => c.statut === 'active').length;
    const terminees = clients.filter(c => c.statut === 'terminé').length;
    
    return [
      { name: 'Prospects', value: prospects, color: '#3b82f6' },
      { name: 'En cours', value: actives, color: '#c9a962' },
      { name: 'Terminés', value: terminees, color: '#22c55e' }
    ];
  };
  
  // Données de CA par praticienne
  const getCaParPraticienneData = () => {
    const stats = getPaiementStats();
    return employees.filter(e => !e.isDirector).map(emp => ({
      name: emp.nom.split(' ')[0],
      ca: stats.caParPraticienne[emp.id] || 0,
      color: EMPLOYEE_COLORS[emp.id]?.border || '#c9a962'
    }));
  };
  
  // Couleurs pour les graphiques
  const CHART_COLORS = {
    primary: '#c9a962',
    secondary: '#3b82f6',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
    muted: '#6b7280'
  };
  
  // ============================================
  // FONCTIONS OBJECTIFS & GAMIFICATION
  // ============================================
  
  // Obtenir les objectifs d'une employée
  const getEmployeeObjectives = (employeeId) => {
    return objectives[employeeId] || {
      monthly_seances_target: 20,
      monthly_seances_current: 0,
      monthly_ca_target: 3000,
      monthly_ca_current: 0,
      streak_days: 0,
      total_seances: 0,
      badges_earned: [],
      badges_progress: {},
      monthly_history: []
    };
  };
  
  // Calculer le pourcentage de progression
  const getProgressPercentage = (current, target) => {
    return Math.min(100, Math.round((current / target) * 100));
  };
  
  // Vérifier et attribuer de nouveaux badges
  const checkAndAwardBadges = (employeeId) => {
    const obj = objectives[employeeId];
    if (!obj) return;
    
    const newBadges = [...obj.badges_earned];
    
    // Badge séances
    if (obj.total_seances >= 10 && !newBadges.includes('seances_10')) {
      newBadges.push('seances_10');
      addNotification({ type: 'success', message: '🏆 Nouveau badge : 10 séances !', forEmployee: employeeId });
    }
    if (obj.total_seances >= 50 && !newBadges.includes('seances_50')) {
      newBadges.push('seances_50');
      addNotification({ type: 'success', message: '🏆 Nouveau badge : 50 séances !', forEmployee: employeeId });
    }
    if (obj.total_seances >= 100 && !newBadges.includes('seances_100')) {
      newBadges.push('seances_100');
      addNotification({ type: 'success', message: '👑 Nouveau badge : 100 séances !', forEmployee: employeeId });
    }
    
    // Badge CA
    if (obj.monthly_ca_current >= 3000 && !newBadges.includes('ca_3000')) {
      newBadges.push('ca_3000');
      addNotification({ type: 'success', message: '💰 Nouveau badge : CA 3000€ !', forEmployee: employeeId });
    }
    if (obj.monthly_ca_current >= 5000 && !newBadges.includes('ca_5000')) {
      newBadges.push('ca_5000');
      addNotification({ type: 'success', message: '💎 Nouveau badge : CA 5000€ !', forEmployee: employeeId });
    }
    
    // Badge streak
    if (obj.streak_days >= 7 && !newBadges.includes('streak_7')) {
      newBadges.push('streak_7');
      addNotification({ type: 'success', message: '🔥 Nouveau badge : Série 7 jours !', forEmployee: employeeId });
    }
    if (obj.streak_days >= 30 && !newBadges.includes('streak_30')) {
      newBadges.push('streak_30');
      addNotification({ type: 'success', message: '🚀 Nouveau badge : Série 30 jours !', forEmployee: employeeId });
    }
    
    if (newBadges.length > obj.badges_earned.length) {
      setObjectives(prev => ({
        ...prev,
        [employeeId]: { ...prev[employeeId], badges_earned: newBadges }
      }));
    }
  };
  
  // Incrémenter les objectifs après une séance
  const incrementSeanceObjective = (employeeId, caAmount = 0) => {
    setObjectives(prev => {
      const current = prev[employeeId] || getEmployeeObjectives(employeeId);
      const updated = {
        ...current,
        monthly_seances_current: current.monthly_seances_current + 1,
        total_seances: current.total_seances + 1,
        monthly_ca_current: current.monthly_ca_current + caAmount,
        streak_days: current.streak_days + 1
      };
      return { ...prev, [employeeId]: updated };
    });
    
    setTimeout(() => checkAndAwardBadges(employeeId), 100);
  };
  
  // Obtenir le classement des praticiennes
  const getLeaderboard = () => {
    return employees
      .filter(e => !e.isDirector)
      .map(emp => ({
        ...emp,
        objectives: getEmployeeObjectives(emp.id),
        score: (getEmployeeObjectives(emp.id).monthly_seances_current * 10) + 
               (getEmployeeObjectives(emp.id).badges_earned.length * 50)
      }))
      .sort((a, b) => b.score - a.score);
  };
  
  // ============================================
  // FONCTIONS CONFIRMATIONS & RAPPELS RDV
  // ============================================
  
  // Obtenir le statut de confirmation d'un RDV
  const getRdvConfirmationStatus = (rdvId) => {
    const confirmations = rdvConfirmations.filter(c => c.rdvId === rdvId);
    if (confirmations.length === 0) return 'pending';
    
    const lastConfirmation = confirmations.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    return lastConfirmation.status;
  };
  
  // Envoyer un rappel (simulé)
  const sendRappel = (rdvId, type = 'sms', action = 'rappel_j1') => {
    const rdv = rdvs.find(r => r.id === rdvId);
    if (!rdv) return;
    
    const client = clients.find(c => c.id === rdv.clientId);
    if (!client) return;
    
    const rdvDate = new Date(rdv.date + 'T' + rdv.heure);
    const formattedDate = rdvDate.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
    const formattedTime = rdv.heure;
    
    const messages = {
      rappel_j3: `Bonjour ${client.nom.split(' ')[0]}, rappel de votre RDV SLIM TOUCH le ${formattedDate} à ${formattedTime}. Confirmez en répondant OUI ou appelez-nous pour modifier.`,
      rappel_j1: `Rappel : votre séance SLIM TOUCH est demain à ${formattedTime}. À très vite ! 💆‍♀️`,
      confirmation: `Votre RDV du ${formattedDate} à ${formattedTime} est confirmé. Pensez à porter des vêtements confortables.`
    };
    
    const newConfirmation = {
      id: Date.now(),
      rdvId,
      clientId: client.id,
      type,
      action,
      date: new Date().toISOString(),
      message: messages[action] || messages.rappel_j1,
      response: null,
      responseDate: null,
      status: 'sent'
    };
    
    setRdvConfirmations(prev => [...prev, newConfirmation]);
    
    // Mettre à jour le statut du RDV
    setRdvs(prev => prev.map(r => 
      r.id === rdvId 
        ? { ...r, rappelEnvoye: true, dernierRappel: new Date().toISOString() }
        : r
    ));
    
    addNotification({
      type: 'success',
      message: `📱 Rappel ${type.toUpperCase()} envoyé à ${client.nom.split(' ')[0]}`,
      forEmployee: rdv.employeeId
    });
    
    return newConfirmation;
  };
  
  // Simuler une réponse cliente
  const simulateClientResponse = (confirmationId, response, newStatus) => {
    setRdvConfirmations(prev => prev.map(c => 
      c.id === confirmationId 
        ? { ...c, response, responseDate: new Date().toISOString(), status: newStatus }
        : c
    ));
    
    const confirmation = rdvConfirmations.find(c => c.id === confirmationId);
    if (confirmation) {
      // Mettre à jour le RDV
      setRdvs(prev => prev.map(r => 
        r.id === confirmation.rdvId 
          ? { ...r, statut: newStatus === 'confirmed' ? 'confirmé' : newStatus === 'cancelled' ? 'annulé' : 'en attente' }
          : r
      ));
      
      const client = clients.find(c => c.id === confirmation.clientId);
      addNotification({
        type: newStatus === 'confirmed' ? 'success' : newStatus === 'cancelled' ? 'warning' : 'info',
        message: `${client?.nom.split(' ')[0]} a ${newStatus === 'confirmed' ? 'confirmé' : newStatus === 'cancelled' ? 'annulé' : 'reporté'} son RDV`,
        forEmployee: null
      });
    }
  };
  
  // Annuler un RDV
  const cancelRdv = (rdvId, reason = '') => {
    const rdv = rdvs.find(r => r.id === rdvId);
    if (!rdv) return;
    
    const client = clients.find(c => c.id === rdv.clientId);
    
    setRdvs(prev => prev.map(r => 
      r.id === rdvId 
        ? { ...r, statut: 'annulé', raisonAnnulation: reason, dateAnnulation: new Date().toISOString() }
        : r
    ));
    
    // Ajouter une confirmation d'annulation
    const newConfirmation = {
      id: Date.now(),
      rdvId,
      clientId: rdv.clientId,
      type: 'system',
      action: 'annulation',
      date: new Date().toISOString(),
      message: `RDV annulé${reason ? ` : ${reason}` : ''}`,
      response: null,
      responseDate: null,
      status: 'cancelled'
    };
    
    setRdvConfirmations(prev => [...prev, newConfirmation]);
    
    addNotification({
      type: 'warning',
      message: `RDV annulé : ${client?.nom} - ${rdv.date}`,
      forEmployee: rdv.employeeId
    });
  };
  
  // Reporter un RDV
  const rescheduleRdv = (rdvId, newDate, newHeure) => {
    const rdv = rdvs.find(r => r.id === rdvId);
    if (!rdv) return;
    
    const client = clients.find(c => c.id === rdv.clientId);
    const oldDate = rdv.date;
    
    setRdvs(prev => prev.map(r => 
      r.id === rdvId 
        ? { ...r, date: newDate, heure: newHeure, statut: 'en attente', ancienneDate: oldDate }
        : r
    ));
    
    // Ajouter une confirmation de report
    const newConfirmation = {
      id: Date.now(),
      rdvId,
      clientId: rdv.clientId,
      type: 'system',
      action: 'report',
      date: new Date().toISOString(),
      message: `RDV reporté du ${oldDate} au ${newDate} à ${newHeure}`,
      response: null,
      responseDate: null,
      status: 'rescheduled'
    };
    
    setRdvConfirmations(prev => [...prev, newConfirmation]);
    
    addNotification({
      type: 'info',
      message: `RDV reporté : ${client?.nom} - ${newDate} ${newHeure}`,
      forEmployee: rdv.employeeId
    });
  };
  
  // Obtenir les RDV nécessitant un rappel
  const getRdvsNeedingReminder = () => {
    // Utiliser une date de référence basée sur les données de démo
    const today = new Date('2025-11-25');
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const in3Days = new Date(today);
    in3Days.setDate(in3Days.getDate() + 3);
    
    return rdvs.filter(r => {
      // Exclure les annulés et les confirmés
      if (r.statut === 'annulé' || r.statut === 'confirmé') return false;
      
      const rdvDate = new Date(r.date);
      rdvDate.setHours(0, 0, 0, 0);
      
      // RDV dans les 3 prochains jours
      if (rdvDate >= today && rdvDate <= in3Days) {
        return true;
      }
      return false;
    });
  };
  
  // Obtenir les RDV en attente (tous les futurs non confirmés)
  const getRdvsPending = () => {
    const today = new Date('2025-11-25');
    today.setHours(0, 0, 0, 0);
    
    return rdvs.filter(r => {
      if (r.statut === 'annulé' || r.statut === 'confirmé') return false;
      const rdvDate = new Date(r.date);
      rdvDate.setHours(0, 0, 0, 0);
      return rdvDate >= today;
    });
  };
  
  // Envoyer les rappels automatiques (simulé)
  const sendAutomaticReminders = () => {
    const rdvsToRemind = getRdvsNeedingReminder();
    let sent = 0;
    
    rdvsToRemind.forEach(rdv => {
      sendRappel(rdv.id, 'sms', 'rappel_j1');
      sent++;
    });
    
    if (sent > 0) {
      addNotification({
        type: 'success',
        message: `📱 ${sent} rappel(s) automatique(s) envoyé(s)`,
        forEmployee: null
      });
    }
    
    return sent;
  };
  
  // Obtenir l'historique des confirmations pour un RDV
  const getRdvConfirmationHistory = (rdvId) => {
    return rdvConfirmations
      .filter(c => c.rdvId === rdvId)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  };
  
  // ============================================
  // FONCTIONS SYSTÈME DE PARRAINAGE
  // ============================================
  
  // Générer un code de parrainage pour une cliente
  const genererCodeParrainage = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    if (!client) return '';
    const prenom = client.nom.split(' ')[0].toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return `${prenom}${new Date().getFullYear()}`;
  };
  
  // Obtenir le code de parrainage d'une cliente
  const getCodeParrainage = (clientId) => {
    if (codesParrainage[clientId]) return codesParrainage[clientId];
    const code = genererCodeParrainage(clientId);
    setCodesParrainage(prev => ({ ...prev, [clientId]: code }));
    return code;
  };
  
  // Obtenir les filleules d'une marraine
  const getFilleules = (marraineId) => {
    return parrainages
      .filter(p => p.marraineId === marraineId)
      .map(p => ({
        ...p,
        filleule: clients.find(c => c.id === p.filleuleId)
      }))
      .filter(p => p.filleule); // Filtrer les filleules qui n'existent pas
  };
  
  // Obtenir la marraine d'une filleule
  const getMarraine = (filleuleId) => {
    const parrainage = parrainages.find(p => p.filleuleId === filleuleId);
    if (!parrainage) return null;
    const marraine = clients.find(c => c.id === parrainage.marraineId);
    if (!marraine) return null; // Retourner null si la marraine n'existe pas
    return {
      ...parrainage,
      marraine
    };
  };
  
  // Stats globales du parrainage
  const getStatsParrainage = () => {
    const totalParrainages = parrainages.length;
    const recompensesVersees = parrainages.filter(p => p.recompenseVersee).length;
    const recompensesEnAttente = parrainages.filter(p => !p.recompenseVersee).length;
    const marraines = [...new Set(parrainages.map(p => p.marraineId))];
    
    // CA généré par les filleules
    const caFilleules = parrainages.reduce((acc, p) => {
      const filleule = clients.find(c => c.id === p.filleuleId);
      const paiements = filleule?.paiements?.filter(pay => pay.statut === 'payé') || [];
      return acc + paiements.reduce((sum, pay) => sum + pay.montant, 0);
    }, 0);
    
    return {
      totalParrainages,
      recompensesVersees,
      recompensesEnAttente,
      nbMarraines: marraines.length,
      totalRecompenses: recompensesVersees * PARRAINAGE_CONFIG.recompenseMarraine,
      caFilleules
    };
  };
  
  // Valider une récompense de parrainage
  const validerRecompense = (parrainageId) => {
    setParrainages(prev => prev.map(p => 
      p.id === parrainageId ? { ...p, recompenseVersee: true } : p
    ));
    const parrainage = parrainages.find(p => p.id === parrainageId);
    const marraine = clients.find(c => c.id === parrainage?.marraineId);
    addNotification({
      type: 'success',
      message: `💰 ${PARRAINAGE_CONFIG.recompenseMarraine}€ versés à ${marraine?.nom.split(' ')[0]}`,
      forEmployee: null
    });
  };
  
  // Partager le code parrainage
  const partagerCodeParrainage = (client, methode) => {
    const code = getCodeParrainage(client.id);
    const message = `🎁 Parrainage SLIM TOUCH\n\n${client.nom.split(' ')[0]} vous offre ${PARRAINAGE_CONFIG.reductionFilleule}€ de réduction !\n\nCode : ${code}\n\nRéservez votre séance sur notre site !`;
    
    if (methode === 'sms') {
      window.open(`sms:?body=${encodeURIComponent(message)}`, '_blank');
    } else if (methode === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
    } else if (methode === 'email') {
      window.open(`mailto:?subject=🎁 ${PARRAINAGE_CONFIG.reductionFilleule}€ offerts chez SLIM TOUCH&body=${encodeURIComponent(message)}`, '_blank');
    }
    
    addNotification({
      type: 'success',
      message: `📱 Code parrainage partagé !`,
      forEmployee: null
    });
  };
  
  // Top des marraines
  const getTopMarraines = () => {
    const marraines = [...new Set(parrainages.map(p => p.marraineId))];
    return marraines.map(marraineId => {
      const marraine = clients.find(c => c.id === marraineId);
      if (!marraine) return null; // Skip si la marraine n'existe pas
      const filleules = getFilleules(marraineId);
      const recompensesVersees = filleules.filter(f => f.recompenseVersee).length;
      const recompensesEnAttente = filleules.filter(f => !f.recompenseVersee).length;
      
      // CA généré
      const caGenere = filleules.reduce((acc, f) => {
        const paiements = f.filleule?.paiements?.filter(p => p.statut === 'payé') || [];
        return acc + paiements.reduce((sum, p) => sum + p.montant, 0);
      }, 0);
      
      return {
        marraine,
        nbFilleules: filleules.length,
        recompensesVersees,
        recompensesEnAttente,
        totalRecompenses: recompensesVersees * PARRAINAGE_CONFIG.recompenseMarraine,
        caGenere
      };
    }).filter(item => item !== null).sort((a, b) => b.nbFilleules - a.nbFilleules);
  };

  // Formulaire nouvelle cliente
  const [newClientForm, setNewClientForm] = useState({
    nom: '',
    telephone: '',
    email: '',
    adresse: '',
    poidsActuel: '',
    objectif: '',
    forfait: 'Sculptage Zones',
    assignedTo: 2,
    notes: ''
  });
  
  // Fonction pour créer une nouvelle cliente
  const handleCreateClient = async () => {
    if (!newClientForm.nom || !newClientForm.telephone) {
      alert('Veuillez remplir le nom et le téléphone');
      return;
    }
    
    // Utiliser les forfaits dynamiques
    const forfaitInfo = forfaits[newClientForm.forfait] || { seances: 5, prix: 290 };
    
    const newClient = {
      id: Date.now(),
      nom: newClientForm.nom,
      telephone: newClientForm.telephone,
      email: newClientForm.email || '',
      adresse: newClientForm.adresse || '',
      poidsInitial: parseInt(newClientForm.poidsActuel) || 75,
      poidsActuel: parseInt(newClientForm.poidsActuel) || 75,
      objectif: parseInt(newClientForm.objectif) || 67,
      forfait: newClientForm.forfait,
      seancesRestantes: forfaitInfo.seances,
      seancesTotal: forfaitInfo.seances,
      prochainRdv: null,
      assignedTo: parseInt(newClientForm.assignedTo),
      photos: [],
      mesures: [],
      notes: newClientForm.notes || '',
      suivis: [],
      paiements: [],
      statut: 'prospect'
    };
    
    // Envoyer à Airtable
    try {
      const result = await apiCreateCliente({
        nom: newClient.nom,
        telephone: newClient.telephone,
        email: newClient.email,
        adresse: newClient.adresse,
        poids_initial: newClient.poidsInitial,
        poids_actuel: newClient.poidsActuel,
        objectif: newClient.objectif,
        forfait: newClient.forfait,
        seances_restantes: newClient.seancesRestantes,
        seances_total: newClient.seancesTotal,
        assigned_to: newClient.assignedTo,
        notes: newClient.notes,
        statut: newClient.statut
      });
      console.log('✅ Cliente créée dans Airtable:', result);
      // Utiliser l'ID retourné par Airtable si disponible
      if (result.id) {
        newClient.airtable_id = result.id;
      }
    } catch (error) {
      console.error('⚠️ Erreur Airtable, sauvegarde locale uniquement:', error);
    }
    
    setClients(prev => [newClient, ...prev]);
    setShowModal(null);
    setNewClientForm({
      nom: '',
      telephone: '',
      email: '',
      adresse: '',
      poidsActuel: '',
      objectif: '',
      forfait: 'Sculptage Zones',
      assignedTo: 2,
      notes: ''
    });
    
    // Notification
    addNotification({
      type: 'success',
      message: `Nouvelle cliente ajoutée : ${newClient.nom}`,
      forEmployee: newClient.assignedTo
    });
  };
  
  // Fonction pour supprimer une cliente
  const handleDeleteClient = async (clientId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette cliente ?')) {
      // Supprimer dans Airtable
      try {
        const client = clients.find(c => c.id === clientId);
        if (client?.airtable_id) {
          await apiDeleteCliente(client.airtable_id);
          console.log('✅ Cliente supprimée dans Airtable');
        }
      } catch (error) {
        console.error('⚠️ Erreur suppression Airtable:', error);
      }
      setClients(prev => prev.filter(c => c.id !== clientId));
    }
  };
  
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'schedule', message: 'Nouveau RDV ajouté : Marie Dupont - 26/11 à 14h', time: '5 min', read: false, forEmployee: 2 },
    { id: 2, type: 'warning', message: 'Stock bas : Crème amincissante', time: '30 min', read: false, forEmployee: 2 },
    { id: 3, type: 'success', message: 'Paiement reçu : Marie Dupont - 750€', time: '1h', read: true, forEmployee: null },
    { id: 4, type: 'info', message: 'Nouvelle cliente assignée : Claire Moreau', time: '2h', read: false, forEmployee: 3 },
    { id: 5, type: 'schedule', message: 'RDV modifié : Sophie Martin déplacé au 27/11 à 10h', time: '3h', read: false, forEmployee: 2 }
  ]);

  const toggleTheme = () => setIsDark(!isDark);
  
  const handleLogin = (user) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
  };
  
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('dashboard');
    setSidebarOpen(false);
  };

  // Filtrer les notifications pour l'utilisateur courant
  const userNotifications = currentUser?.isDirector 
    ? notifications 
    : notifications.filter(n => n.forEmployee === currentUser?.id || n.forEmployee === null);

  const unreadCount = userNotifications.filter(n => !n.read).length;

  // Fonction pour ajouter une notification (utilisée lors des changements de planning)
  const addNotification = (notif) => {
    setNotifications(prev => [{ ...notif, id: Date.now(), time: 'À l\'instant', read: false }, ...prev]);
  };

  // Menu items selon le rôle
  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Tableau de bord', icon: Home },
      { id: 'clients', label: 'Mes Clientes', icon: Users },
      { id: 'planning', label: 'Mon Planning', icon: Calendar },
      { id: 'suivi', label: 'Suivi & Photos', icon: Camera },
      { id: 'stocks', label: 'Mes Stocks', icon: Package },
    ];
    
    if (currentUser?.isDirector) {
      return [
        { id: 'dashboard', label: 'Tableau de bord', icon: Home },
        { id: 'clients', label: 'Toutes les Clientes', icon: Users },
        { id: 'planning', label: 'Planning Global', icon: Calendar },
        { id: 'rappels', label: 'Rappels RDV', icon: BellRing, badge: getRdvsPending().length },
        { id: 'parrainage', label: 'Parrainage', icon: Gift, badge: getStatsParrainage().recompensesEnAttente },
        { id: 'suivi', label: 'Suivis en Direct', icon: Camera },
        { id: 'messages', label: 'Messages', icon: MessageCircle, badge: getUnreadCount() },
        { id: 'objectifs', label: 'Objectifs Équipe', icon: Trophy, section: 'Administration' },
        { id: 'employees', label: 'Gestion Équipe', icon: User },
        { id: 'stocks', label: 'Stocks Équipe', icon: Package },
        { id: 'paiements', label: 'Paiements', icon: CreditCard },
        { id: 'settings', label: 'Paramètres', icon: Settings },
      ];
    } else {
      return [
        ...baseItems,
        { id: 'objectifs', label: 'Mes Objectifs', icon: Trophy, badge: getEmployeeObjectives(currentUser?.id).badges_earned.length },
        { id: 'messages', label: 'Messages', icon: MessageCircle, badge: getUnreadCount() },
        { id: 'onboarding', label: 'Formation', icon: BookOpen, badge: ONBOARDING_VIDEOS.length - completedVideos.length, section: 'Ressources' },
      ];
    }
  };

  // Stats selon le rôle (utilise les fonctions de synchronisation)
  const getStats = () => {
    const globalStats = getGlobalStats();
    
    if (currentUser?.isDirector) {
      return {
        clientsActifs: globalStats.clientsActifs,
        rdvsSemaine: globalStats.rdvsSemaine,
        rdvsAujourdHui: globalStats.rdvsAujourdHui,
        caTotal: globalStats.caTotal,
        caMois: globalStats.caMois,
        employeesActifs: employees.filter(e => e.actif && !e.isDirector).length,
        tauxReussite: Math.round((clients.filter(c => c.statut === 'terminé' && c.poidsActuel <= c.objectif).length / Math.max(clients.filter(c => c.statut === 'terminé').length, 1)) * 100),
        poidsPerduTotal: globalStats.poidsPerduTotal,
        stocksAlerte: globalStats.stocksAlerte,
        rdvsPending: checkPendingRdvs().length
      };
    } else {
      const myStats = getEmployeeStats(currentUser?.id);
      const myClients = clients.filter(c => c.assignedTo === currentUser?.id);
      return {
        mesClientes: myStats.clientsActifs,
        mesRdvs: myStats.rdvsAVenir,
        seancesEffectuees: myStats.seancesEffectuees,
        suivis: myStats.suivis,
        tauxReussite: Math.round((myClients.filter(c => c.statut === 'terminé' && c.poidsActuel <= c.objectif).length / Math.max(myClients.filter(c => c.statut === 'terminé').length, 1)) * 100),
        stocksAlerte: myStats.stocksAlerte
      };
    }
  };

  // Filtrer les clients selon le rôle
  const getVisibleClients = () => {
    if (currentUser?.isDirector) return clients;
    return clients.filter(c => c.assignedTo === currentUser?.id);
  };

  // Filtrer les RDVs selon le rôle
  const getVisibleRdvs = () => {
    if (currentUser?.isDirector) return rdvs;
    return rdvs.filter(r => r.employeeId === currentUser?.id);
  };

  // Obtenir les stocks visibles
  const getVisibleStocks = () => {
    if (currentUser?.isDirector) return stocks;
    return { [currentUser?.id]: stocks[currentUser?.id] || [] };
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} isDark={isDark} toggleTheme={toggleTheme} />;
  }

  // Écran de chargement pendant le fetch des données
  if (dataLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        background: 'var(--bg)',
        color: 'var(--text)'
      }}>
        <style>{getStyles(isDark)}</style>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
          <div>Chargement des données...</div>
        </div>
      </div>
    );
  }

  const menuItems = getMenuItems();
  const stats = getStats();
  const visibleClients = getVisibleClients();
  const visibleRdvs = getVisibleRdvs();

  return (
    <div className="app-container">
      <style>{getStyles(isDark)}</style>
      
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span>SLIM TOUCH</span>
          </div>
          <div className={`role-badge ${currentUser.isDirector ? 'director' : 'employee'}`}>
            {currentUser.isDirector ? <Shield size={14} /> : <User size={14} />}
            {currentUser.isDirector ? 'Directrice' : 'Praticienne'}
          </div>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item, index) => {
            const showSection = item.section && (index === 0 || menuItems[index - 1]?.section !== item.section);
            return (
              <React.Fragment key={item.id}>
                {showSection && (
                  <div className="nav-section-title" style={{ marginTop: index > 0 ? '1rem' : 0 }}>
                    {item.section}
                  </div>
                )}
                <div
                  className={`nav-item ${currentView === item.id ? 'active' : ''}`}
                  onClick={() => { setCurrentView(item.id); setSidebarOpen(false); setSelectedClient(null); setSelectedEmployee(null); }}
                >
                  <item.icon />
                  <span>{item.label}</span>
                  {item.badge > 0 && <span className="badge-count">{item.badge}</span>}
                </div>
              </React.Fragment>
            );
          })}
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">{currentUser.nom.charAt(0)}</div>
            <div className="user-details">
              <h4>{currentUser.nom.split(' ')[0]}</h4>
              <span>{currentUser.role}</span>
            </div>
            <button className="logout-btn" onClick={handleLogout} title="Déconnexion">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <div className="header-left">
            <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={22} />
            </button>
            <h1 className="page-title">
              {selectedClient ? selectedClient.nom : 
               selectedEmployee ? selectedEmployee.nom :
               menuItems.find(m => m.id === currentView)?.label}
            </h1>
            {isLoading && (
              <span style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '6px', 
                fontSize: '0.8rem', 
                color: 'var(--accent)',
                marginLeft: '12px'
              }}>
                <RefreshCw size={14} className="spin" style={{ animation: 'spin 1s linear infinite' }} /> 
                Synchronisation...
              </span>
            )}
            {apiError && (
              <span style={{ 
                fontSize: '0.75rem', 
                color: 'var(--warning)',
                marginLeft: '12px'
              }}>
                ⚠️ Mode hors-ligne
              </span>
            )}
          </div>
          
          <div className="header-right">
            <button 
              className="icon-btn" 
              onClick={refreshData} 
              title="Rafraîchir les données"
              disabled={isLoading}
              style={{ opacity: isLoading ? 0.5 : 1 }}
            >
              <RefreshCw size={20} style={{ animation: isLoading ? 'spin 1s linear infinite' : 'none' }} />
            </button>
            
            <div className="search-bar">
              <Search />
              <input type="text" placeholder="Rechercher une cliente..." />
            </div>
            
            <button className="icon-btn" onClick={toggleTheme} title={isDark ? 'Mode clair' : 'Mode sombre'}>
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <div style={{ position: 'relative' }}>
              <button className="icon-btn" onClick={() => setShowNotifications(!showNotifications)}>
                <Bell size={20} />
                {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
              </button>
              
              {showNotifications && (
                <div className="notifications-dropdown">
                  <div className="notifications-header">
                    <h4>Notifications</h4>
                    <button className="mark-all-read" onClick={() => setNotifications(prev => prev.map(n => ({...n, read: true})))}>
                      Tout marquer lu
                    </button>
                  </div>
                  {userNotifications.length === 0 ? (
                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '1rem' }}>
                      Aucune notification
                    </p>
                  ) : (
                    userNotifications.slice(0, 8).map(notif => (
                      <div 
                        key={notif.id} 
                        className={`notification-item ${!notif.read ? 'unread' : ''}`}
                        onClick={() => setNotifications(prev => prev.map(n => n.id === notif.id ? {...n, read: true} : n))}
                      >
                        <div className={`notification-icon ${notif.type}`}>
                          {notif.type === 'warning' && <AlertCircle size={18} />}
                          {notif.type === 'info' && <Bell size={18} />}
                          {notif.type === 'success' && <CheckCircle size={18} />}
                          {notif.type === 'schedule' && <Calendar size={18} />}
                        </div>
                        <div className="notification-content">
                          <h5>{notif.message}</h5>
                          <span>Il y a {notif.time}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </header>
        
        <div className="content">
          {/* ============================================ */}
          {/* DASHBOARD */}
          {/* ============================================ */}
          {currentView === 'dashboard' && !selectedClient && (
            <div className="animate-in">
              {/* Stats pour Directrice */}
              {currentUser.isDirector ? (
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-header">
                      <div className="stat-icon gold"><Users size={24} /></div>
                      <div className="stat-trend"><TrendingUp size={16} /> +2</div>
                    </div>
                    <div className="stat-value">{stats.clientsActifs}</div>
                    <div className="stat-label">Clientes actives</div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-header">
                      <div className="stat-icon blue"><Calendar size={24} /></div>
                    </div>
                    <div className="stat-value">{stats.rdvsSemaine}</div>
                    <div className="stat-label">RDV cette semaine</div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-header">
                      <div className="stat-icon green"><Euro size={24} /></div>
                      <div className="stat-trend"><TrendingUp size={16} /> +12%</div>
                    </div>
                    <div className="stat-value">{stats.caTotal.toLocaleString()}€</div>
                    <div className="stat-label">Chiffre d'affaires</div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-header">
                      <div className="stat-icon gold"><User size={24} /></div>
                    </div>
                    <div className="stat-value">{stats.employeesActifs}</div>
                    <div className="stat-label">Praticiennes actives</div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-header">
                      <div className="stat-icon gold"><Award size={24} /></div>
                    </div>
                    <div className="stat-value">{stats.tauxReussite}%</div>
                    <div className="stat-label">Taux de réussite</div>
                  </div>
                </div>
              ) : (
                /* Stats pour Employée */
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-header">
                      <div className="stat-icon gold"><Users size={24} /></div>
                    </div>
                    <div className="stat-value">{stats.mesClientes}</div>
                    <div className="stat-label">Mes clientes actives</div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-header">
                      <div className="stat-icon blue"><Calendar size={24} /></div>
                    </div>
                    <div className="stat-value">{stats.mesRdvs}</div>
                    <div className="stat-label">Mes RDV à venir</div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-header">
                      <div className="stat-icon green"><CheckCircle size={24} /></div>
                    </div>
                    <div className="stat-value">{stats.seancesEffectuees}</div>
                    <div className="stat-label">Séances effectuées</div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-header">
                      <div className="stat-icon gold"><Award size={24} /></div>
                    </div>
                    <div className="stat-value">{stats.tauxReussite}%</div>
                    <div className="stat-label">Taux de réussite</div>
                  </div>
                </div>
              )}
              
              {/* Graphiques Dashboard Directrice */}
              {currentUser.isDirector && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  {/* Graphique CA mensuel */}
                  <div className="card">
                    <div className="card-header">
                      <div className="card-title"><TrendingUp size={18} /> CA mensuel</div>
                      <button className="btn btn-secondary btn-sm" onClick={() => setCurrentView('paiements')}>
                        Détails <ChevronRight size={14} />
                      </button>
                    </div>
                    <div style={{ height: '200px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={getPaiementStats().caParMois}>
                          <defs>
                            <linearGradient id="colorCaDash" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#c9a962" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#c9a962" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="mois" stroke="#888" fontSize={11} />
                          <YAxis stroke="#888" fontSize={11} tickFormatter={(v) => `${v}€`} />
                          <Tooltip 
                            contentStyle={{ background: '#1a1a2e', border: '1px solid #c9a962', borderRadius: '8px' }}
                            formatter={(value) => [`${value}€`]}
                          />
                          <Area type="monotone" dataKey="ca" stroke="#c9a962" strokeWidth={2} fill="url(#colorCaDash)" name="CA" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  {/* Graphique Conversions */}
                  <div className="card">
                    <div className="card-header">
                      <div className="card-title"><Users size={18} /> Répartition clientes</div>
                    </div>
                    <div style={{ height: '200px', display: 'flex', alignItems: 'center' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPie>
                          <Pie
                            data={getConversionData()}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={70}
                            paddingAngle={5}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}`}
                            labelLine={false}
                          >
                            {getConversionData().map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ background: '#1a1a2e', border: '1px solid #c9a962', borderRadius: '8px' }}
                          />
                        </RechartsPie>
                      </ResponsiveContainer>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '0.8rem' }}>
                      <span><span style={{ color: '#3b82f6' }}>●</span> Prospects</span>
                      <span><span style={{ color: '#c9a962' }}>●</span> En cours</span>
                      <span><span style={{ color: '#22c55e' }}>●</span> Terminés</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Alertes Paiements Directrice */}
              {currentUser.isDirector && getPaiementStats().nbRelance > 0 && (
                <div className="card" style={{ marginBottom: '1.5rem', background: 'rgba(248, 113, 113, 0.05)', border: '1px solid var(--danger)' }}>
                  <div className="card-header">
                    <div className="card-title" style={{ color: 'var(--danger)' }}>
                      <AlertTriangle size={18} /> Paiements en attente de relance
                    </div>
                    <button className="btn btn-danger btn-sm" onClick={() => setCurrentView('paiements')}>
                      Gérer <ChevronRight size={14} />
                    </button>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ padding: '0.75rem 1.25rem', background: 'rgba(248, 113, 113, 0.1)', borderRadius: '10px' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--danger)' }}>
                        {getPaiementStats().enRelance.toLocaleString()}€
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>En relance</div>
                    </div>
                    <div style={{ padding: '0.75rem 1.25rem', background: 'rgba(251, 191, 36, 0.1)', borderRadius: '10px' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--warning)' }}>
                        {getPaiementStats().enAttente.toLocaleString()}€
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>En attente</div>
                    </div>
                  </div>
                </div>
              )}
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
                {/* Prochains RDV */}
                <div className="card">
                  <div className="card-header">
                    <div className="card-title"><Calendar /> Prochains RDV</div>
                    <button className="btn btn-secondary btn-sm" onClick={() => setCurrentView('planning')}>
                      Voir tout <ChevronRight size={16} />
                    </button>
                  </div>
                  
                  {visibleRdvs.slice(0, 4).map(rdv => {
                    const client = clients.find(c => c.id === rdv.clientId);
                    const employee = employees.find(e => e.id === rdv.employeeId);
                    return (
                      <div key={rdv.id} className="rdv-item">
                        <div className="rdv-time">
                          <div className="rdv-time-value">{rdv.heure}</div>
                          <div className="rdv-time-duration">{rdv.duree} min</div>
                        </div>
                        <div className="rdv-details">
                          <h4>{client?.nom}</h4>
                          <span>
                            {rdv.type} • {new Date(rdv.date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
                            {currentUser.isDirector && <> • {employee?.nom.split(' ')[0]}</>}
                          </span>
                        </div>
                        <span className={`badge ${rdv.statut === 'confirmé' ? 'badge-success' : 'badge-warning'}`}>
                          {rdv.statut}
                        </span>
                      </div>
                    );
                  })}
                </div>
                
                {/* Clientes récentes */}
                <div className="card">
                  <div className="card-header">
                    <div className="card-title"><Users /> {currentUser.isDirector ? 'Clientes récentes' : 'Mes clientes'}</div>
                    {currentUser.isDirector && (
                      <button className="btn btn-primary btn-sm" onClick={() => setShowModal('newClient')}>
                        <Plus size={18} /> Ajouter
                      </button>
                    )}
                  </div>
                  
                  {visibleClients.slice(0, 3).map(client => {
                    const assignedEmployee = employees.find(e => e.id === client.assignedTo);
                    return (
                      <div 
                        key={client.id} 
                        className="client-card"
                        onClick={() => { setSelectedClient(client); setCurrentView('clients'); }}
                      >
                        <div className="client-card-header">
                          <div className="client-avatar">{client.nom.charAt(0)}</div>
                          <div className="client-info">
                            <h3>{client.nom}</h3>
                            <span>
                              {client.forfait}
                              {currentUser.isDirector && assignedEmployee && <> • {assignedEmployee.nom.split(' ')[0]}</>}
                            </span>
                          </div>
                          <span className={`badge ${
                            client.statut === 'active' ? 'badge-success' : 
                            client.statut === 'prospect' ? 'badge-info' : 'badge-gold'
                          }`}>
                            {client.statut}
                          </span>
                        </div>
                        <div className="client-stats">
                          <div className="client-stat">
                            <div className="client-stat-value">-{client.poidsInitial - client.poidsActuel}kg</div>
                            <div className="client-stat-label">Perdu</div>
                          </div>
                          <div className="client-stat">
                            <div className="client-stat-value">{client.seancesRestantes}</div>
                            <div className="client-stat-label">Séances</div>
                          </div>
                          <div className="client-stat">
                            <div className="client-stat-value">{Math.round(((client.seancesTotal - client.seancesRestantes) / client.seancesTotal) * 100)}%</div>
                            <div className="client-stat-label">Progression</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Alertes stocks pour employée */}
              {!currentUser.isDirector && stocks[currentUser.id]?.filter(s => s.quantite <= s.seuil).length > 0 && (
                <div className="stock-alert">
                  <AlertCircle size={20} />
                  <span>
                    <strong>{stocks[currentUser.id].filter(s => s.quantite <= s.seuil).length} produit(s)</strong> en stock bas - 
                    <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('stocks'); }} style={{ color: 'var(--danger)', marginLeft: '4px' }}>
                      Voir mes stocks
                    </a>
                  </span>
                </div>
              )}
              
              {/* Progression formation pour employée */}
              {!currentUser.isDirector && !currentUser.onboardingComplete && (
                <div className="card">
                  <div className="card-header">
                    <div className="card-title"><BookOpen /> Ma Formation</div>
                    <button className="btn btn-primary btn-sm" onClick={() => setCurrentView('onboarding')}>
                      Continuer <ChevronRight size={16} />
                    </button>
                  </div>
                  <div className="progress-container">
                    <div className="progress-header">
                      <span>Progression</span>
                      <span>{completedVideos.length}/{ONBOARDING_VIDEOS.length} vidéos</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${(completedVideos.length / ONBOARDING_VIDEOS.length) * 100}%` }} />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Vue directrice : Activité récente de l'équipe */}
              {currentUser.isDirector && (
                <div className="card">
                  <div className="card-header">
                    <div className="card-title"><BarChart3 /> Activité récente de l'équipe</div>
                  </div>
                  <div className="suivi-timeline">
                    {clients.flatMap(c => c.suivis.map(s => ({ ...s, clientNom: c.nom, clientId: c.id }))).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5).map((suivi, i) => {
                      const employee = employees.find(e => e.id === suivi.employeeId);
                      return (
                        <div key={i} className="suivi-item slide-in" style={{ animationDelay: `${i * 0.1}s` }}>
                          <div className="suivi-header">
                            <span className="suivi-employee">{employee?.nom} → {suivi.clientNom}</span>
                            <span className="suivi-date">{new Date(suivi.date).toLocaleDateString('fr-FR')}</span>
                          </div>
                          <p className="suivi-note">{suivi.note}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============================================ */}
          {/* CLIENTS */}
          {/* ============================================ */}
          {currentView === 'clients' && !selectedClient && (
            <div className="animate-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div className="tabs">
                  <div 
                    className={`tab ${clientFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setClientFilter('all')}
                  >
                    Toutes ({visibleClients.length})
                  </div>
                  <div 
                    className={`tab ${clientFilter === 'active' ? 'active' : ''}`}
                    onClick={() => setClientFilter('active')}
                  >
                    Actives ({visibleClients.filter(c => c.statut === 'active').length})
                  </div>
                  <div 
                    className={`tab ${clientFilter === 'prospect' ? 'active' : ''}`}
                    onClick={() => setClientFilter('prospect')}
                  >
                    Prospects ({visibleClients.filter(c => c.statut === 'prospect').length})
                  </div>
                  <div 
                    className={`tab ${clientFilter === 'terminé' ? 'active' : ''}`}
                    onClick={() => setClientFilter('terminé')}
                  >
                    Terminées ({visibleClients.filter(c => c.statut === 'terminé').length})
                  </div>
                </div>
                {currentUser.isDirector && (
                  <button className="btn btn-primary" onClick={() => setShowModal('newClient')}>
                    <Plus size={18} /> Nouvelle cliente
                  </button>
                )}
              </div>
              
              <div className="card">
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Cliente</th>
                        <th>Forfait</th>
                        <th>Progression</th>
                        <th>Séances</th>
                        {currentUser.isDirector && <th>Praticienne</th>}
                        <th>Statut</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleClients
                        .filter(c => clientFilter === 'all' || c.statut === clientFilter)
                        .map(client => {
                        const assignedEmployee = employees.find(e => e.id === client.assignedTo);
                        return (
                          <tr key={client.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedClient(client)}>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div className="client-avatar" style={{ width: '40px', height: '40px', fontSize: '1rem' }}>
                                  {client.nom.charAt(0)}
                                </div>
                                <div>
                                  <strong>{client.nom}</strong>
                                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{client.telephone}</div>
                                </div>
                              </div>
                            </td>
                            <td>{client.forfait}</td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ color: 'var(--success)', fontWeight: '600' }}>-{client.poidsInitial - client.poidsActuel}kg</span>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>/ -{client.poidsInitial - client.objectif}kg</span>
                              </div>
                            </td>
                            <td>{client.seancesRestantes}/{client.seancesTotal}</td>
                            {currentUser.isDirector && (
                              <td>
                                <span className="badge badge-info">{assignedEmployee?.nom.split(' ')[0]}</span>
                              </td>
                            )}
                            <td>
                              <span className={`badge ${
                                client.statut === 'active' ? 'badge-success' : 
                                client.statut === 'prospect' ? 'badge-info' : 'badge-gold'
                              }`}>
                                {client.statut}
                              </span>
                            </td>
                            <td onClick={e => e.stopPropagation()}>
                              <button 
                                className="btn btn-ghost" 
                                title="Voir"
                                onClick={(e) => { e.stopPropagation(); setSelectedClient(client); }}
                              >
                                <Eye size={18} />
                              </button>
                              <button 
                                className="btn btn-ghost" 
                                title="Modifier"
                                onClick={(e) => { 
                                  e.stopPropagation(); 
                                  setEditingClient(client);
                                  setNewClientForm({
                                    nom: client.nom,
                                    telephone: client.telephone,
                                    email: client.email,
                                    adresse: client.adresse,
                                    poidsActuel: client.poidsActuel.toString(),
                                    objectif: client.objectif.toString(),
                                    forfait: client.forfait,
                                    assignedTo: client.assignedTo,
                                    notes: client.notes
                                  });
                                  setShowModal('editClient');
                                }}
                              >
                                <Edit size={18} />
                              </button>
                              {currentUser.isDirector && (
                                <button 
                                  className="btn btn-ghost" 
                                  style={{ color: 'var(--danger)' }} 
                                  title="Supprimer"
                                  onClick={(e) => { e.stopPropagation(); handleDeleteClient(client.id); }}
                                >
                                  <Trash2 size={18} />
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Client Detail View */}
          {selectedClient && (
            <div className="animate-in">
              <button className="btn btn-secondary" onClick={() => setSelectedClient(null)} style={{ marginBottom: '1.5rem' }}>
                ← Retour aux clientes
              </button>
              
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <div className="client-avatar" style={{ width: '90px', height: '90px', fontSize: '2.5rem', borderRadius: '20px' }}>
                  {selectedClient.nom.charAt(0)}
                </div>
                <div style={{ flex: 1, minWidth: '300px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem' }}>{selectedClient.nom}</h2>
                    <span className={`badge ${selectedClient.statut === 'active' ? 'badge-success' : selectedClient.statut === 'prospect' ? 'badge-info' : 'badge-gold'}`}>
                      {selectedClient.statut}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={16} style={{ color: 'var(--accent)' }} /> {selectedClient.telephone}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={16} style={{ color: 'var(--accent)' }} /> {selectedClient.email}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={16} style={{ color: 'var(--accent)' }} /> {selectedClient.adresse}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button className="btn btn-secondary" onClick={() => {
                    setEditingClient(selectedClient);
                    setNewClientForm({
                      nom: selectedClient.nom,
                      telephone: selectedClient.telephone,
                      email: selectedClient.email,
                      adresse: selectedClient.adresse,
                      poidsActuel: selectedClient.poidsActuel.toString(),
                      objectif: selectedClient.objectif.toString(),
                      forfait: selectedClient.forfait,
                      assignedTo: selectedClient.assignedTo,
                      notes: selectedClient.notes
                    });
                    setShowModal('editClient');
                  }}><Edit size={18} /> Modifier</button>
                  <button className="btn btn-primary" onClick={() => setShowRdvModal(true)}><Calendar size={18} /> Nouveau RDV</button>
                  <button className="btn btn-secondary" onClick={() => setShowExportModal(selectedClient)} style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid var(--success)' }}>
                    <Share2 size={18} style={{ color: 'var(--success)' }} /> Exporter
                  </button>
                </div>
              </div>
              
              {/* Progress cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.25rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text)' }}>{selectedClient.poidsInitial}kg</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Poids initial</div>
                </div>
                <div style={{ background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.15), rgba(201, 169, 98, 0.05))', border: '1px solid var(--accent)', borderRadius: '16px', padding: '1.25rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--accent)' }}>{selectedClient.poidsActuel}kg</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Poids actuel</div>
                </div>
                <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.25rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text)' }}>{selectedClient.objectif}kg</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Objectif</div>
                </div>
                <div style={{ background: 'rgba(74, 222, 128, 0.1)', border: '1px solid var(--success)', borderRadius: '16px', padding: '1.25rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--success)' }}>-{selectedClient.poidsInitial - selectedClient.poidsActuel}kg</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Perte totale</div>
                </div>
              </div>
              
              {/* Graphiques de progression cliente */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                {/* Courbe de poids */}
                <div className="card">
                  <div className="card-header">
                    <div className="card-title"><TrendingDown size={18} /> Évolution du poids</div>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => setShowExportModal(selectedClient)}
                    >
                      <Share2 size={14} /> Partager
                    </button>
                  </div>
                  <div style={{ height: '200px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={getClientWeightData(selectedClient)}>
                        <defs>
                          <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="date" stroke="#888" fontSize={11} />
                        <YAxis 
                          stroke="#888" 
                          fontSize={11} 
                          domain={['dataMin - 2', 'dataMax + 2']}
                          tickFormatter={(v) => `${v}kg`}
                        />
                        <Tooltip 
                          contentStyle={{ background: '#1a1a2e', border: '1px solid #c9a962', borderRadius: '8px' }}
                          formatter={(value, name) => [`${value}kg`, name === 'poids' ? 'Poids' : 'Objectif']}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="poids" 
                          stroke="#22c55e" 
                          strokeWidth={2} 
                          fill="url(#colorWeight)" 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="objectif" 
                          stroke="#c9a962" 
                          strokeDasharray="5 5" 
                          dot={false}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '0.5rem', fontSize: '0.8rem' }}>
                    <span><span style={{ color: '#22c55e' }}>●</span> Poids actuel</span>
                    <span><span style={{ color: '#c9a962' }}>- -</span> Objectif</span>
                  </div>
                </div>
                
                {/* Courbe des mensurations */}
                <div className="card">
                  <div className="card-header">
                    <div className="card-title"><Target size={18} /> Évolution des mensurations</div>
                  </div>
                  {selectedClient.mesures.length > 0 ? (
                    <>
                      <div style={{ height: '200px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={getClientMeasurementsData(selectedClient)}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="date" stroke="#888" fontSize={11} />
                            <YAxis stroke="#888" fontSize={11} tickFormatter={(v) => `${v}cm`} />
                            <Tooltip 
                              contentStyle={{ background: '#1a1a2e', border: '1px solid #c9a962', borderRadius: '8px' }}
                              formatter={(value) => [`${value}cm`]}
                            />
                            <Line type="monotone" dataKey="taille" stroke="#c9a962" strokeWidth={2} dot={{ r: 4 }} name="Taille" />
                            <Line type="monotone" dataKey="hanches" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} name="Hanches" />
                            <Line type="monotone" dataKey="cuisses" stroke="#a855f7" strokeWidth={2} dot={{ r: 4 }} name="Cuisses" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '0.5rem', fontSize: '0.8rem' }}>
                        <span><span style={{ color: '#c9a962' }}>●</span> Taille</span>
                        <span><span style={{ color: '#3b82f6' }}>●</span> Hanches</span>
                        <span><span style={{ color: '#a855f7' }}>●</span> Cuisses</span>
                      </div>
                    </>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      <Target size={40} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                      <p>Aucune mesure enregistrée</p>
                      <button className="btn btn-secondary btn-sm" style={{ marginTop: '0.5rem' }} onClick={() => setShowMesureModal(true)}>
                        <Plus size={14} /> Ajouter des mesures
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Séances Progress */}
              <div className="card" style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Programme : </span>
                    <strong style={{ color: 'var(--accent)' }}>{FORFAITS[selectedClient.forfait]?.icon} {selectedClient.forfait}</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginLeft: '10px' }}>
                      ({FORFAITS[selectedClient.forfait]?.prix}€)
                    </span>
                  </div>
                  <div style={{ textAlign: 'right', background: 'var(--bg)', padding: '0.75rem 1.25rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent)' }}>
                      {getSeancesEffectuees(selectedClient.id)}
                    </span>
                    <span style={{ color: 'var(--text-muted)' }}> / {selectedClient.seancesTotal} séances</span>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {selectedClient.seancesTotal - getSeancesEffectuees(selectedClient.id)} restante(s)
                    </div>
                  </div>
                </div>
                <div className="progress-bar" style={{ height: '12px' }}>
                  <div className="progress-fill" style={{ width: `${(getSeancesEffectuees(selectedClient.id) / selectedClient.seancesTotal) * 100}%` }} />
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
                {/* Suivis */}
                <div className="card">
                  <div className="card-header">
                    <div className="card-title"><Edit /> Suivis de séances</div>
                    <button className="btn btn-secondary btn-sm" onClick={() => {
                      setSuiviForm({ date: new Date().toISOString().split('T')[0], duree: '45', note: '' });
                      setEditingSuivi(null);
                      setShowSuiviModal(true);
                    }}><Plus size={16} /> Ajouter</button>
                  </div>
                  {selectedClient.suivis.length > 0 ? (
                    <div className="suivi-timeline">
                      {selectedClient.suivis.map((suivi, i) => {
                        const employee = employees.find(e => e.id === suivi.employeeId);
                        return (
                          <div key={suivi.id || i} className="suivi-item" style={{ position: 'relative' }}>
                            <div className="suivi-header">
                              <span className="suivi-employee">{employee?.nom}</span>
                              <span className="suivi-date">{new Date(suivi.date).toLocaleDateString('fr-FR')} • {suivi.duree} min</span>
                            </div>
                            <p className="suivi-note">{suivi.note}</p>
                            <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '4px' }}>
                              <button 
                                className="btn btn-ghost" 
                                style={{ padding: '4px' }}
                                title="Modifier"
                                onClick={() => {
                                  setEditingSuivi(suivi);
                                  setSuiviForm({ date: suivi.date, duree: suivi.duree.toString(), note: suivi.note });
                                  setShowSuiviModal(true);
                                }}
                              >
                                <Edit size={14} />
                              </button>
                              <button 
                                className="btn btn-ghost" 
                                style={{ padding: '4px', color: 'var(--danger)' }}
                                title="Supprimer"
                                onClick={() => handleDeleteSuivi(suivi.id)}
                              >
                                <X size={14} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>Aucun suivi enregistré</p>
                  )}
                </div>
                
                {/* Photos */}
                <div className="card">
                  <div className="card-header">
                    <div className="card-title"><Camera /> Photos de suivi</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                    {['avant', 'pendant', 'après'].map((type) => {
                      const photo = selectedClient.photos.find(p => p.type === type);
                      return (
                        <div 
                          key={type} 
                          onClick={() => setShowPhotoModal(type)}
                          style={{
                            aspectRatio: '1',
                            background: photo?.url ? 'linear-gradient(135deg, var(--accent), var(--accent-light))' : 'var(--bg)',
                            border: photo?.url ? '1px solid var(--accent)' : '2px dashed var(--border)',
                            borderRadius: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            color: photo?.url ? 'var(--primary)' : 'var(--text-muted)',
                            transition: 'all 0.2s',
                            fontSize: '0.8rem',
                            textTransform: 'uppercase'
                          }}
                        >
                          {photo?.url ? <CheckCircle size={28} /> : <Camera size={28} />}
                          <span>{type}</span>
                          {photo?.url && <span style={{ fontSize: '0.65rem' }}>{photo.date}</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Mensurations */}
                <div className="card">
                  <div className="card-header">
                    <div className="card-title"><BarChart3 /> Mensurations</div>
                    <button className="btn btn-secondary btn-sm" onClick={() => {
                      setMesureForm({ date: new Date().toISOString().split('T')[0], tour_taille: '', tour_hanches: '', tour_cuisses: '' });
                      setShowMesureModal(true);
                    }}><Plus size={16} /> Ajouter</button>
                  </div>
                  {selectedClient.mesures.length > 0 ? (
                    <div className="table-container">
                      <table>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Taille</th>
                            <th>Hanches</th>
                            <th>Cuisses</th>
                            <th style={{ width: '40px' }}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedClient.mesures.map((m) => (
                            <tr key={m.id}>
                              <td>{new Date(m.date).toLocaleDateString('fr-FR')}</td>
                              <td>{m.tour_taille} cm</td>
                              <td>{m.tour_hanches} cm</td>
                              <td>{m.tour_cuisses} cm</td>
                              <td>
                                <button 
                                  className="btn btn-ghost" 
                                  style={{ padding: '4px', color: 'var(--danger)' }}
                                  title="Supprimer"
                                  onClick={() => handleDeleteMesure(m.id)}
                                >
                                  <X size={16} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>Aucune mensuration</p>
                  )}
                </div>
                
                {/* Parrainage */}
                <div className="card">
                  <div className="card-header">
                    <div className="card-title"><Gift /> Parrainage</div>
                  </div>
                  
                  {/* Code parrainage */}
                  <div style={{ 
                    background: 'linear-gradient(135deg, rgba(201,169,98,0.1), rgba(201,169,98,0.05))',
                    border: '1px solid var(--accent)',
                    borderRadius: '12px',
                    padding: '1rem',
                    marginBottom: '1rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      Code parrainage
                    </div>
                    <div style={{ 
                      fontSize: '1.5rem', 
                      fontWeight: '700', 
                      fontFamily: 'monospace', 
                      letterSpacing: '3px',
                      color: 'var(--accent)'
                    }}>
                      {getCodeParrainage(selectedClient.id)}
                    </div>
                  </div>
                  
                  {/* Boutons partage */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                    <button 
                      className="btn btn-secondary btn-sm" 
                      style={{ flex: 1 }}
                      onClick={() => partagerCodeParrainage(selectedClient, 'sms')}
                    >
                      <Smartphone size={14} /> SMS
                    </button>
                    <button 
                      className="btn btn-secondary btn-sm" 
                      style={{ flex: 1 }}
                      onClick={() => partagerCodeParrainage(selectedClient, 'whatsapp')}
                    >
                      <MessageCircle size={14} /> WhatsApp
                    </button>
                    <button 
                      className="btn btn-secondary btn-sm" 
                      style={{ flex: 1 }}
                      onClick={() => partagerCodeParrainage(selectedClient, 'email')}
                    >
                      <Mail size={14} /> Email
                    </button>
                  </div>
                  
                  {/* Bénéfices */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
                    <div style={{ 
                      background: 'rgba(34, 197, 94, 0.1)', 
                      border: '1px solid var(--success)',
                      borderRadius: '8px',
                      padding: '0.75rem',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Filleule reçoit</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--success)' }}>-{PARRAINAGE_CONFIG.reductionFilleule}€</div>
                    </div>
                    <div style={{ 
                      background: 'rgba(201, 169, 98, 0.1)', 
                      border: '1px solid var(--accent)',
                      borderRadius: '8px',
                      padding: '0.75rem',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Elle reçoit</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--accent)' }}>+{PARRAINAGE_CONFIG.recompenseMarraine}€</div>
                    </div>
                  </div>
                  
                  {/* Marraine (si parrainée) */}
                  {getMarraine(selectedClient.id) && (
                    <div style={{ 
                      background: 'rgba(139, 92, 246, 0.1)', 
                      border: '1px solid #8b5cf6',
                      borderRadius: '8px',
                      padding: '0.75rem',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ fontSize: '0.8rem', color: '#8b5cf6' }}>
                        🎁 Parrainée par <strong>{getMarraine(selectedClient.id).marraine?.nom}</strong>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Réduction de {PARRAINAGE_CONFIG.reductionFilleule}€ appliquée
                      </div>
                    </div>
                  )}
                  
                  {/* Filleules */}
                  {getFilleules(selectedClient.id).length > 0 && (
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                        Ses filleules ({getFilleules(selectedClient.id).length})
                      </div>
                      {getFilleules(selectedClient.id).map(item => (
                        <div 
                          key={item.id}
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px',
                            padding: '0.5rem',
                            background: 'var(--bg)',
                            borderRadius: '8px',
                            marginBottom: '0.5rem'
                          }}
                        >
                          <div className="client-avatar" style={{ width: '30px', height: '30px', fontSize: '0.75rem' }}>
                            {item.filleule?.nom.charAt(0)}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.85rem' }}>{item.filleule?.nom}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                              {new Date(item.date).toLocaleDateString('fr-FR')}
                            </div>
                          </div>
                          {item.recompenseVersee ? (
                            <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>✓ Versé</span>
                          ) : (
                            <span className="badge" style={{ background: 'rgba(251, 191, 36, 0.2)', color: 'var(--warning)', border: '1px solid var(--warning)', fontSize: '0.65rem' }}>
                              En attente
                            </span>
                          )}
                        </div>
                      ))}
                      <div style={{ 
                        marginTop: '0.5rem', 
                        padding: '0.5rem', 
                        background: 'rgba(34, 197, 94, 0.1)', 
                        borderRadius: '6px',
                        textAlign: 'center',
                        fontSize: '0.85rem',
                        color: 'var(--success)'
                      }}>
                        💰 Total gagné : {getFilleules(selectedClient.id).filter(f => f.recompenseVersee).length * PARRAINAGE_CONFIG.recompenseMarraine}€
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Notes */}
                <div className="card">
                  <div className="card-header">
                    <div className="card-title"><Edit /> Notes</div>
                  </div>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {selectedClient.notes || 'Aucune note'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ============================================ */}
          {/* PLANNING */}
          {/* ============================================ */}
          {currentView === 'planning' && (
            <div className="animate-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                {currentUser.isDirector && (
                  <div className="tabs">
                    <div 
                      className={`tab ${planningFilter === 'all' ? 'active' : ''}`}
                      onClick={() => setPlanningFilter('all')}
                    >
                      Tous
                    </div>
                    {employees.filter(e => !e.isDirector).map(emp => (
                      <div 
                        key={emp.id} 
                        className={`tab ${planningFilter === emp.id.toString() ? 'active' : ''}`}
                        onClick={() => setPlanningFilter(emp.id.toString())}
                        style={{ 
                          borderColor: planningFilter === emp.id.toString() ? EMPLOYEE_COLORS[emp.id]?.border : undefined,
                          color: planningFilter === emp.id.toString() ? EMPLOYEE_COLORS[emp.id]?.text : undefined
                        }}
                      >
                        {emp.nom.split(' ')[0]}
                      </div>
                    ))}
                  </div>
                )}
                <button className="btn btn-primary" onClick={() => {
                  setPlanningRdvForm({ clientId: '', date: '', heure: '', duree: '45', type: 'Séance G5', employeeId: '' });
                  setEditingRdv(null);
                  setShowPlanningRdvModal(true);
                }}>
                  <Plus size={18} /> Nouveau RDV
                </button>
              </div>
              
              {/* Calendrier mensuel */}
              <div className="card" style={{ marginBottom: '1.5rem' }}>
                <div className="card-header">
                  <button className="btn btn-ghost" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}>
                    ← Précédent
                  </button>
                  <div className="card-title" style={{ textTransform: 'capitalize' }}>
                    <Calendar size={20} />
                    {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                  </div>
                  <button className="btn btn-ghost" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}>
                    Suivant →
                  </button>
                </div>
                
                {/* Légende des couleurs */}
                {currentUser.isDirector && planningFilter === 'all' && (
                  <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', padding: '0.75rem', background: 'var(--bg)', borderRadius: '8px' }}>
                    {employees.filter(e => !e.isDirector).map(emp => (
                      <div key={emp.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: EMPLOYEE_COLORS[emp.id]?.border }} />
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{emp.nom.split(' ')[0]}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Jours de la semaine */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', marginBottom: '2px' }}>
                  {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                    <div key={day} style={{ padding: '0.75rem', textAlign: 'center', fontWeight: '600', fontSize: '0.8rem', color: 'var(--text-muted)', background: 'var(--bg)', borderRadius: '4px' }}>
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Grille du calendrier */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
                  {getCalendarDays(currentMonth).map((dayInfo, index) => {
                    const dayRdvs = getRdvsForDay(dayInfo.date);
                    const isToday = dayInfo.date.toDateString() === new Date().toDateString();
                    return (
                      <div 
                        key={index}
                        style={{
                          minHeight: '100px',
                          padding: '0.5rem',
                          background: dayInfo.currentMonth ? 'var(--bg-card)' : 'var(--bg)',
                          borderRadius: '4px',
                          opacity: dayInfo.currentMonth ? 1 : 0.4,
                          border: isToday ? '2px solid var(--accent)' : '1px solid var(--border)',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          if (dayInfo.currentMonth) {
                            setPlanningRdvForm({ clientId: '', date: dayInfo.date.toISOString().split('T')[0], heure: '10:00', duree: '45', type: 'Séance G5', employeeId: '' });
                            setEditingRdv(null);
                            setShowPlanningRdvModal(true);
                          }
                        }}
                      >
                        <div style={{ 
                          fontSize: '0.85rem', 
                          fontWeight: isToday ? '700' : '500', 
                          marginBottom: '4px',
                          color: isToday ? 'var(--accent)' : 'var(--text)'
                        }}>
                          {dayInfo.day}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          {dayRdvs.slice(0, 3).map(rdv => {
                            const client = clients.find(c => c.id === rdv.clientId);
                            const colors = EMPLOYEE_COLORS[rdv.employeeId] || { bg: 'rgba(201,169,98,0.2)', border: '#c9a962', text: '#c9a962' };
                            return (
                              <div 
                                key={rdv.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingRdv(rdv);
                                  setPlanningRdvForm({
                                    clientId: rdv.clientId.toString(),
                                    date: rdv.date,
                                    heure: rdv.heure,
                                    duree: rdv.duree.toString(),
                                    type: rdv.type,
                                    employeeId: rdv.employeeId.toString()
                                  });
                                  setShowPlanningRdvModal(true);
                                }}
                                style={{
                                  fontSize: '0.7rem',
                                  padding: '2px 4px',
                                  borderRadius: '3px',
                                  background: colors.bg,
                                  borderLeft: `3px solid ${colors.border}`,
                                  color: colors.text,
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  cursor: 'pointer'
                                }}
                                title={`${rdv.heure} - ${client?.nom}`}
                              >
                                {rdv.heure} {client?.nom.split(' ')[0]}
                              </div>
                            );
                          })}
                          {dayRdvs.length > 3 && (
                            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                              +{dayRdvs.length - 3} autres
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Liste des RDV à venir */}
              <div className="card">
                <div className="card-header">
                  <div className="card-title"><Clock /> Rendez-vous à venir</div>
                </div>
                
                {getFilteredRdvs().sort((a, b) => new Date(a.date + 'T' + a.heure) - new Date(b.date + 'T' + b.heure)).map(rdv => {
                  const client = clients.find(c => c.id === rdv.clientId);
                  const employee = employees.find(e => e.id === rdv.employeeId);
                  const colors = EMPLOYEE_COLORS[rdv.employeeId] || { bg: 'rgba(201,169,98,0.2)', border: '#c9a962' };
                  return (
                    <div 
                      key={rdv.id} 
                      className="rdv-item"
                      style={{ borderLeft: currentUser.isDirector ? `4px solid ${colors.border}` : undefined }}
                    >
                      <div className="rdv-time">
                        <div className="rdv-time-value">{rdv.heure}</div>
                        <div className="rdv-time-duration">{rdv.duree} min</div>
                      </div>
                      <div className="rdv-details">
                        <h4>{client?.nom}</h4>
                        <span>
                          {rdv.type} • {new Date(rdv.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                          {currentUser.isDirector && <> • <strong style={{ color: colors.border }}>{employee?.nom.split(' ')[0]}</strong></>}
                        </span>
                      </div>
                      <span 
                        className={`badge ${rdv.statut === 'confirmé' ? 'badge-success' : 'badge-warning'}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleToggleRdvStatus(rdv.id)}
                        title="Cliquer pour changer le statut"
                      >
                        {rdv.statut === 'confirmé' ? <CheckCircle size={14} style={{ marginRight: '4px' }} /> : <Clock size={14} style={{ marginRight: '4px' }} />}
                        {rdv.statut}
                      </span>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button 
                          className="btn btn-ghost" 
                          title="Modifier" 
                          onClick={() => {
                            setEditingRdv(rdv);
                            setPlanningRdvForm({
                              clientId: rdv.clientId.toString(),
                              date: rdv.date,
                              heure: rdv.heure,
                              duree: rdv.duree.toString(),
                              type: rdv.type,
                              employeeId: rdv.employeeId.toString()
                            });
                            setShowPlanningRdvModal(true);
                          }}
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          className="btn btn-ghost" 
                          style={{ color: 'var(--danger)' }} 
                          title="Supprimer"
                          onClick={() => handleDeleteRdv(rdv.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  );
                })}
                
                {getFilteredRdvs().length === 0 && (
                  <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>Aucun rendez-vous</p>
                )}
              </div>
            </div>
          )}

          {/* ============================================ */}
          {/* SUIVI EN DIRECT (Directrice) */}
          {/* ============================================ */}
          {currentView === 'suivi' && currentUser.isDirector && (
            <div className="animate-in">
              <div className="card">
                <div className="card-header">
                  <div className="card-title"><Camera /> Tous les suivis en temps réel</div>
                </div>
                
                <div className="tabs" style={{ marginBottom: '1.5rem' }}>
                  <div 
                    className={`tab ${suiviFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setSuiviFilter('all')}
                  >
                    Tous
                  </div>
                  {employees.filter(e => !e.isDirector).map(emp => (
                    <div 
                      key={emp.id} 
                      className={`tab ${suiviFilter === emp.id.toString() ? 'active' : ''}`}
                      onClick={() => setSuiviFilter(emp.id.toString())}
                      style={{
                        borderColor: suiviFilter === emp.id.toString() ? EMPLOYEE_COLORS[emp.id]?.border : undefined,
                        color: suiviFilter === emp.id.toString() ? EMPLOYEE_COLORS[emp.id]?.text : undefined
                      }}
                    >
                      {emp.nom.split(' ')[0]}
                    </div>
                  ))}
                </div>
                
                <div className="suivi-timeline">
                  {getFilteredSuivis().length > 0 ? getFilteredSuivis().map((suivi, i) => {
                    const employee = employees.find(e => e.id === suivi.employeeId);
                    const colors = EMPLOYEE_COLORS[suivi.employeeId] || { bg: 'rgba(201,169,98,0.2)', border: '#c9a962' };
                    return (
                      <div 
                        key={suivi.id || i} 
                        className="suivi-item slide-in" 
                        style={{ 
                          animationDelay: `${i * 0.05}s`,
                          borderLeft: `3px solid ${colors.border}`
                        }}
                      >
                        <div className="suivi-header">
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <span 
                              className="badge" 
                              style={{ 
                                background: colors.bg, 
                                color: colors.text || colors.border,
                                border: `1px solid ${colors.border}`
                              }}
                            >
                              {employee?.nom.split(' ')[0]}
                            </span>
                            <span style={{ color: 'var(--accent)' }}>{suivi.clientNom}</span>
                          </div>
                          <span className="suivi-date">{new Date(suivi.date).toLocaleDateString('fr-FR')} • {suivi.duree} min</span>
                        </div>
                        <p className="suivi-note">{suivi.note}</p>
                      </div>
                    );
                  }) : (
                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
                      Aucun suivi trouvé
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SUIVI (Employée) */}
          {currentView === 'suivi' && !currentUser.isDirector && (
            <div className="animate-in">
              <div className="card">
                <div className="card-header">
                  <div className="card-title"><Camera /> Suivi photo de mes clientes</div>
                </div>
                
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Sélectionnez une cliente pour gérer ses photos et son suivi.
                </p>
                
                {visibleClients.filter(c => c.statut !== 'prospect').map(client => (
                  <div 
                    key={client.id}
                    className="client-card"
                    onClick={() => { setSelectedClient(client); setCurrentView('clients'); }}
                  >
                    <div className="client-card-header">
                      <div className="client-avatar">{client.nom.charAt(0)}</div>
                      <div className="client-info">
                        <h3>{client.nom}</h3>
                        <span>{client.photos.length} photo(s) • {client.suivis.length} suivi(s)</span>
                      </div>
                      <ChevronRight size={20} style={{ color: 'var(--text-muted)' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================ */}
          {/* GESTION ÉQUIPE (Directrice uniquement) */}
          {/* ============================================ */}
          {currentView === 'employees' && currentUser.isDirector && !selectedEmployee && (
            <div className="animate-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif' }}>Gestion de l'équipe</h3>
                <button className="btn btn-primary" onClick={() => setShowModal('newEmployee')}>
                  <UserPlus size={18} /> Ajouter une praticienne
                </button>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                {employees.filter(e => !e.isDirector).map(employee => {
                  const empClients = clients.filter(c => c.assignedTo === employee.id);
                  const empRdvs = rdvs.filter(r => r.employeeId === employee.id);
                  const empStocks = stocks[employee.id] || [];
                  const stockAlerts = empStocks.filter(s => s.quantite <= s.seuil).length;
                  
                  return (
                    <div key={employee.id} className="employee-card">
                      <div className="employee-header">
                        <div className="employee-avatar">{employee.nom.charAt(0)}</div>
                        <div className="employee-info">
                          <h3>{employee.nom}</h3>
                          <span>{employee.email}</span>
                        </div>
                        <span className={`badge ${employee.actif ? 'badge-success' : 'badge-danger'}`}>
                          {employee.actif ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      
                      {!employee.onboardingComplete && (
                        <div style={{ background: 'rgba(251, 191, 36, 0.1)', border: '1px solid var(--warning)', borderRadius: '10px', padding: '10px 14px', marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--warning)' }}>
                          <BookOpen size={16} style={{ display: 'inline', marginRight: '8px' }} />
                          Formation en cours
                        </div>
                      )}
                      
                      {stockAlerts > 0 && (
                        <div style={{ background: 'rgba(248, 113, 113, 0.1)', border: '1px solid var(--danger)', borderRadius: '10px', padding: '10px 14px', marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--danger)' }}>
                          <AlertCircle size={16} style={{ display: 'inline', marginRight: '8px' }} />
                          {stockAlerts} produit(s) en stock bas
                        </div>
                      )}
                      
                      <div className="employee-stats">
                        <div className="employee-stat">
                          <div className="employee-stat-value">{empClients.length}</div>
                          <div className="employee-stat-label">Clientes</div>
                        </div>
                        <div className="employee-stat">
                          <div className="employee-stat-value">{empRdvs.filter(r => r.date >= new Date().toISOString().split('T')[0]).length}</div>
                          <div className="employee-stat-label">RDV</div>
                        </div>
                        <div className="employee-stat">
                          <div className="employee-stat-value">{empClients.reduce((acc, c) => acc + c.suivis.filter(s => s.employeeId === employee.id).length, 0)}</div>
                          <div className="employee-stat-label">Suivis</div>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
                        <button className="btn btn-secondary btn-sm" style={{ flex: 1 }} onClick={() => setSelectedEmployee(employee)}>
                          <Eye size={16} /> Voir détails
                        </button>
                        <button className="btn btn-secondary btn-sm" onClick={() => setShowModal({ type: 'assignClients', employee })}>
                          <Users size={16} />
                        </button>
                        <button className="btn btn-danger btn-sm">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Employee Detail (Directrice) */}
          {selectedEmployee && currentUser.isDirector && (
            <div className="animate-in">
              <button className="btn btn-secondary" onClick={() => setSelectedEmployee(null)} style={{ marginBottom: '1.5rem' }}>
                ← Retour à l'équipe
              </button>
              
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <div className="employee-avatar" style={{ width: '90px', height: '90px', fontSize: '2.5rem', borderRadius: '20px' }}>
                  {selectedEmployee.nom.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', marginBottom: '0.5rem' }}>{selectedEmployee.nom}</h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: 'var(--text-muted)' }}>
                    <span><Mail size={16} style={{ display: 'inline', marginRight: '6px', color: 'var(--accent)' }} />{selectedEmployee.email}</span>
                    <span><Phone size={16} style={{ display: 'inline', marginRight: '6px', color: 'var(--accent)' }} />{selectedEmployee.telephone}</span>
                    <span><Calendar size={16} style={{ display: 'inline', marginRight: '6px', color: 'var(--accent)' }} />Depuis le {new Date(selectedEmployee.dateEmbauche).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
                {/* Clientes assignées */}
                <div className="card">
                  <div className="card-header">
                    <div className="card-title"><Users /> Clientes assignées</div>
                    <button className="btn btn-secondary btn-sm" onClick={() => setShowModal({ type: 'assignClients', employee: selectedEmployee })}>
                      <Edit size={16} /> Gérer
                    </button>
                  </div>
                  {clients.filter(c => c.assignedTo === selectedEmployee.id).map(client => (
                    <div key={client.id} className="client-card" onClick={() => { setSelectedClient(client); setCurrentView('clients'); setSelectedEmployee(null); }}>
                      <div className="client-card-header">
                        <div className="client-avatar" style={{ width: '40px', height: '40px', fontSize: '1rem' }}>{client.nom.charAt(0)}</div>
                        <div className="client-info">
                          <h3 style={{ fontSize: '0.95rem' }}>{client.nom}</h3>
                          <span>{client.forfait}</span>
                        </div>
                        <span className={`badge ${client.statut === 'active' ? 'badge-success' : client.statut === 'prospect' ? 'badge-info' : 'badge-gold'}`}>
                          {client.statut}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Stocks */}
                <div className="card">
                  <div className="card-header">
                    <div className="card-title"><Package /> Stocks</div>
                  </div>
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Produit</th>
                          <th>Quantité</th>
                          <th>Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(stocks[selectedEmployee.id] || []).map(stock => (
                          <tr key={stock.id}>
                            <td>{stock.nom}</td>
                            <td>{stock.quantite} {stock.unite}</td>
                            <td>
                              <span className={`badge ${stock.quantite <= stock.seuil ? 'badge-danger' : 'badge-success'}`}>
                                {stock.quantite <= stock.seuil ? 'Bas' : 'OK'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================ */}
          {/* STOCKS */}
          {/* ============================================ */}
          {currentView === 'stocks' && (
            <div className="animate-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif' }}>
                  {currentUser.isDirector ? 'Stocks de l\'équipe' : 'Mes Stocks'}
                </h3>
                {stats.stocksAlerte > 0 && (
                  <span className="badge badge-danger" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                    <AlertCircle size={16} style={{ marginRight: '6px' }} />
                    {stats.stocksAlerte} produit(s) en alerte
                  </span>
                )}
              </div>
              
              {currentUser.isDirector ? (
                // Vue directrice : stocks de chaque employée
                employees.filter(e => !e.isDirector).map(employee => {
                  const empStocks = stocks[employee.id] || [];
                  const empStats = getEmployeeStats(employee.id);
                  
                  return (
                    <div key={employee.id} className="card" style={{ marginBottom: '1rem' }}>
                      <div className="card-header">
                        <div className="card-title">
                          <div className="client-avatar" style={{ width: '36px', height: '36px', fontSize: '1rem', background: EMPLOYEE_COLORS[employee.id]?.bg, border: `2px solid ${EMPLOYEE_COLORS[employee.id]?.border}` }}>
                            {employee.nom.charAt(0)}
                          </div>
                          <span>{employee.nom}</span>
                          {empStats.stocksAlerte > 0 && (
                            <span className="badge badge-danger" style={{ marginLeft: '10px' }}>
                              {empStats.stocksAlerte} alerte(s)
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          {empStats.clientsActifs} clientes • {empStats.rdvsAVenir} RDV à venir
                        </div>
                      </div>
                      <div className="table-container">
                        <table>
                          <thead>
                            <tr>
                              <th>Produit</th>
                              <th>Quantité</th>
                              <th>Seuil</th>
                              <th>Statut</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {empStocks.map(stock => (
                              <tr key={stock.id} style={{ background: stock.quantite <= stock.seuil ? 'rgba(248, 113, 113, 0.1)' : 'transparent' }}>
                                <td><strong>{stock.nom}</strong></td>
                                <td>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <button 
                                      className="btn btn-ghost" 
                                      style={{ padding: '4px 8px', minWidth: '32px' }}
                                      onClick={() => updateStock(employee.id, stock.id, Math.max(0, stock.quantite - 1))}
                                    >−</button>
                                    <span style={{ minWidth: '40px', textAlign: 'center', fontWeight: '600' }}>{stock.quantite}</span>
                                    <button 
                                      className="btn btn-ghost" 
                                      style={{ padding: '4px 8px', minWidth: '32px' }}
                                      onClick={() => updateStock(employee.id, stock.id, stock.quantite + 1)}
                                    >+</button>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{stock.unite}</span>
                                  </div>
                                </td>
                                <td>{stock.seuil} {stock.unite}</td>
                                <td>
                                  <span className={`badge ${stock.quantite <= stock.seuil ? 'badge-danger' : 'badge-success'}`}>
                                    {stock.quantite <= stock.seuil ? '⚠️ Stock bas' : '✓ OK'}
                                  </span>
                                </td>
                                <td>
                                  <button 
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => updateStock(employee.id, stock.id, stock.seuil + 5)}
                                    title="Réapprovisionner"
                                  >
                                    <RefreshCw size={14} /> +5
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })
              ) : (
                // Vue employée : ses propres stocks
                <div className="card">
                  {(stocks[currentUser.id] || []).filter(s => s.quantite <= s.seuil).length > 0 && (
                    <div className="stock-alert">
                      <AlertCircle size={20} />
                      <span>
                        <strong>{(stocks[currentUser.id] || []).filter(s => s.quantite <= s.seuil).length} produit(s)</strong> nécessitent un réapprovisionnement
                      </span>
                    </div>
                  )}
                  
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Produit</th>
                          <th>Quantité</th>
                          <th>Seuil d'alerte</th>
                          <th>Prix unitaire</th>
                          <th>Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(stocks[currentUser.id] || []).map(stock => (
                          <tr key={stock.id} style={{ background: stock.quantite <= stock.seuil ? 'rgba(248, 113, 113, 0.1)' : 'transparent' }}>
                            <td><strong>{stock.nom}</strong></td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <button 
                                  className="btn btn-ghost" 
                                  style={{ padding: '4px 8px', minWidth: '32px' }}
                                  onClick={() => updateStock(currentUser.id, stock.id, Math.max(0, stock.quantite - 1))}
                                >−</button>
                                <span style={{ minWidth: '40px', textAlign: 'center', fontWeight: '600' }}>{stock.quantite}</span>
                                <button 
                                  className="btn btn-ghost" 
                                  style={{ padding: '4px 8px', minWidth: '32px' }}
                                  onClick={() => updateStock(currentUser.id, stock.id, stock.quantite + 1)}
                                >+</button>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{stock.unite}</span>
                              </div>
                            </td>
                            <td>{stock.seuil} {stock.unite}</td>
                            <td>{stock.prix.toFixed(2)}€</td>
                            <td>
                              <span className={`badge ${stock.quantite <= stock.seuil ? 'badge-danger' : 'badge-success'}`}>
                                {stock.quantite <= stock.seuil ? '⚠️ Stock bas' : '✓ OK'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============================================ */}
          {/* PAIEMENTS (Directrice) */}
          {/* ============================================ */}
          {currentView === 'paiements' && currentUser.isDirector && (
            <div className="animate-in">
              {/* Stats principales */}
              <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
                <div className="stat-card">
                  <div className="stat-header">
                    <div className="stat-icon green"><Euro size={24} /></div>
                  </div>
                  <div className="stat-value">{getPaiementStats().caTotal.toLocaleString()}€</div>
                  <div className="stat-label">CA Total (payé)</div>
                </div>
                <div className="stat-card">
                  <div className="stat-header">
                    <div className="stat-icon gold"><TrendingUp size={24} /></div>
                  </div>
                  <div className="stat-value">{getPaiementStats().caMois.toLocaleString()}€</div>
                  <div className="stat-label">CA ce mois</div>
                </div>
                <div className="stat-card" style={{ background: 'rgba(251, 191, 36, 0.1)', border: '1px solid var(--warning)' }}>
                  <div className="stat-header">
                    <div className="stat-icon" style={{ color: 'var(--warning)' }}><Clock size={24} /></div>
                  </div>
                  <div className="stat-value" style={{ color: 'var(--warning)' }}>{getPaiementStats().enAttente.toLocaleString()}€</div>
                  <div className="stat-label">En attente ({getPaiementStats().nbAttente})</div>
                </div>
                <div className="stat-card" style={{ background: 'rgba(248, 113, 113, 0.1)', border: '1px solid var(--danger)' }}>
                  <div className="stat-header">
                    <div className="stat-icon" style={{ color: 'var(--danger)' }}><AlertTriangle size={24} /></div>
                  </div>
                  <div className="stat-value" style={{ color: 'var(--danger)' }}>{getPaiementStats().enRelance.toLocaleString()}€</div>
                  <div className="stat-label">En relance ({getPaiementStats().nbRelance})</div>
                </div>
              </div>
              
              {/* Graphiques */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                {/* Graphique CA par mois */}
                <div className="card">
                  <div className="card-header">
                    <div className="card-title"><BarChart3 size={18} /> Évolution du CA</div>
                  </div>
                  <div style={{ height: '250px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={getPaiementStats().caParMois}>
                        <defs>
                          <linearGradient id="colorCa" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#c9a962" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#c9a962" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="mois" stroke="#888" fontSize={12} />
                        <YAxis stroke="#888" fontSize={12} tickFormatter={(v) => `${v}€`} />
                        <Tooltip 
                          contentStyle={{ background: '#1a1a2e', border: '1px solid #c9a962', borderRadius: '8px' }}
                          formatter={(value) => [`${value}€`, 'CA']}
                        />
                        <Area type="monotone" dataKey="ca" stroke="#c9a962" strokeWidth={2} fill="url(#colorCa)" />
                        <Line type="monotone" dataKey="objectif" stroke="#3b82f6" strokeDasharray="5 5" dot={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Graphique CA par praticienne */}
                <div className="card">
                  <div className="card-header">
                    <div className="card-title"><Users size={18} /> CA par praticienne</div>
                  </div>
                  <div style={{ height: '250px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={getCaParPraticienneData()} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis type="number" stroke="#888" fontSize={12} tickFormatter={(v) => `${v}€`} />
                        <YAxis type="category" dataKey="name" stroke="#888" fontSize={12} width={60} />
                        <Tooltip 
                          contentStyle={{ background: '#1a1a2e', border: '1px solid #c9a962', borderRadius: '8px' }}
                          formatter={(value) => [`${value}€`, 'CA']}
                        />
                        <Bar dataKey="ca" radius={[0, 4, 4, 0]}>
                          {getCaParPraticienneData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              {/* Taux de recouvrement + Répartition statuts */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="card">
                  <div className="card-header">
                    <div className="card-title"><Target size={18} /> Taux de recouvrement</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem' }}>
                    <div style={{ 
                      width: '150px', 
                      height: '150px', 
                      borderRadius: '50%', 
                      background: `conic-gradient(var(--success) ${getPaiementStats().tauxRecouvrement * 3.6}deg, rgba(255,255,255,0.1) 0deg)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto'
                    }}>
                      <div style={{ 
                        width: '120px', 
                        height: '120px', 
                        borderRadius: '50%', 
                        background: 'var(--bg-card)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                      }}>
                        <span style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--success)' }}>{getPaiementStats().tauxRecouvrement}%</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>recouvré</span>
                      </div>
                    </div>
                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                      <div><span style={{ color: 'var(--success)' }}>●</span> Payé: {getPaiementStats().nbPaye}</div>
                      <div><span style={{ color: 'var(--warning)' }}>●</span> Attente: {getPaiementStats().nbAttente}</div>
                      <div><span style={{ color: 'var(--danger)' }}>●</span> Relance: {getPaiementStats().nbRelance}</div>
                    </div>
                  </div>
                </div>
                
                {/* Conversions */}
                <div className="card">
                  <div className="card-header">
                    <div className="card-title"><PieChart size={18} /> Répartition clientes</div>
                  </div>
                  <div style={{ height: '200px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPie>
                        <Pie
                          data={getConversionData()}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {getConversionData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ background: '#1a1a2e', border: '1px solid #c9a962', borderRadius: '8px' }}
                        />
                        <Legend />
                      </RechartsPie>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              {/* Tableau des paiements amélioré */}
              <div className="card">
                <div className="card-header">
                  <div className="card-title"><CreditCard size={18} /> Gestion des paiements</div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => setShowModal('newPaiement3x')}>
                      <Repeat size={16} /> Paiement 3x
                    </button>
                    <button className="btn btn-primary btn-sm" onClick={() => {
                      setPaiementForm({ clientId: '', montant: '', methode: 'CB' });
                      setShowPaiementModal(true);
                    }}>
                      <Plus size={16} /> Paiement simple
                    </button>
                  </div>
                </div>
                
                {/* Filtres */}
                <div className="tabs" style={{ marginBottom: '1rem' }}>
                  <div className="tab active">Tous</div>
                  <div className="tab">✓ Payés</div>
                  <div className="tab">⏳ En attente</div>
                  <div className="tab">⚠️ En relance</div>
                </div>
                
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Facture</th>
                        <th>Date</th>
                        <th>Cliente</th>
                        <th>Type</th>
                        <th>Montant</th>
                        <th>Méthode</th>
                        <th>Statut</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getAllPaiements().map((p, i) => {
                        const emp = employees.find(e => e.id === p.employeeId);
                        return (
                          <tr key={p.id || i} style={{ 
                            background: p.statut === 'relance' ? 'rgba(248, 113, 113, 0.05)' : 
                                        p.statut === 'en_attente' ? 'rgba(251, 191, 36, 0.05)' : 'transparent'
                          }}>
                            <td>
                              <button 
                                className="btn btn-ghost btn-sm"
                                onClick={() => {
                                  const client = clients.find(c => c.id === p.clientId);
                                  if (client) generateFacturePDF(p, client);
                                }}
                                title="Télécharger la facture"
                              >
                                <FileText size={14} /> {p.factureNumero || 'N/A'}
                              </button>
                            </td>
                            <td>{new Date(p.date).toLocaleDateString('fr-FR')}</td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div className="client-avatar" style={{ width: '32px', height: '32px', fontSize: '0.85rem' }}>
                                  {p.clientNom?.charAt(0)}
                                </div>
                                <div>
                                  <div>{p.clientNom}</div>
                                  <div style={{ fontSize: '0.75rem', color: EMPLOYEE_COLORS[p.employeeId]?.text }}>
                                    {emp?.nom.split(' ')[0]}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              {p.type === '3x' ? (
                                <span className="badge" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6', border: '1px solid #3b82f6' }}>
                                  <Repeat size={12} /> {p.echeance}/{p.totalEcheances}
                                </span>
                              ) : (
                                <span className="badge badge-gold">Complet</span>
                              )}
                            </td>
                            <td>
                              <strong style={{ 
                                color: p.statut === 'payé' ? 'var(--success)' : 
                                       p.statut === 'relance' ? 'var(--danger)' : 'var(--warning)' 
                              }}>
                                {p.montant}€
                              </strong>
                              {p.type === '3x' && (
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                  sur {p.montantTotal}€
                                </div>
                              )}
                            </td>
                            <td>{p.methode}</td>
                            <td>
                              {p.statut === 'payé' && (
                                <span className="badge badge-success">✓ Payé</span>
                              )}
                              {p.statut === 'en_attente' && (
                                <span className="badge" style={{ background: 'rgba(251, 191, 36, 0.2)', color: 'var(--warning)', border: '1px solid var(--warning)' }}>
                                  ⏳ En attente
                                </span>
                              )}
                              {p.statut === 'relance' && (
                                <span className="badge badge-danger">
                                  ⚠️ Relance {p.relanceCount > 1 ? `(${p.relanceCount})` : ''}
                                </span>
                              )}
                            </td>
                            <td>
                              <div style={{ display: 'flex', gap: '0.25rem' }}>
                                {p.statut !== 'payé' && (
                                  <>
                                    <button 
                                      className="btn btn-ghost btn-sm"
                                      onClick={() => markPaiementAsPaid(p.clientId, p.id)}
                                      title="Marquer comme payé"
                                      style={{ color: 'var(--success)' }}
                                    >
                                      <CheckCircle size={16} />
                                    </button>
                                    {p.statut !== 'relance' && (
                                      <button 
                                        className="btn btn-ghost btn-sm"
                                        onClick={() => sendRelance(p.clientId, p.id)}
                                        title="Envoyer une relance"
                                        style={{ color: 'var(--danger)' }}
                                      >
                                        <AlertTriangle size={16} />
                                      </button>
                                    )}
                                  </>
                                )}
                                <button 
                                  className="btn btn-ghost btn-sm"
                                  onClick={() => {
                                    const client = clients.find(c => c.id === p.clientId);
                                    if (client) generateFacturePDF(p, client);
                                  }}
                                  title="Générer facture PDF"
                                >
                                  <Receipt size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ============================================ */}
          {/* ONBOARDING / FORMATION (Employée) */}
          {/* ============================================ */}
          {currentView === 'onboarding' && !currentUser.isDirector && (
            <div className="animate-in">
              <div className="card" style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '0.5rem' }}>Bienvenue dans votre espace formation</h3>
                    <p style={{ color: 'var(--text-muted)' }}>
                      Suivez ces vidéos pour maîtriser toutes les techniques SLIM TOUCH.
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--accent)' }}>
                      {completedVideos.length}/{ONBOARDING_VIDEOS.length}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>vidéos complétées</div>
                  </div>
                </div>
                <div className="progress-container" style={{ marginTop: '1.5rem' }}>
                  <div className="progress-bar" style={{ height: '10px' }}>
                    <div className="progress-fill" style={{ width: `${(completedVideos.length / ONBOARDING_VIDEOS.length) * 100}%` }} />
                  </div>
                </div>
              </div>
              
              <div className="tabs" style={{ marginBottom: '1.5rem' }}>
                <div className="tab active">Toutes</div>
                <div className="tab">Technique</div>
                <div className="tab">Relationnel</div>
                <div className="tab">Sécurité</div>
                <div className="tab">Outils</div>
              </div>
              
              <div className="video-grid">
                {ONBOARDING_VIDEOS.map(video => {
                  const isCompleted = completedVideos.includes(video.id);
                  return (
                    <div key={video.id} className="video-card">
                      <div 
                        className="video-thumbnail"
                        onClick={() => {
                          if (!isCompleted) {
                            setCompletedVideos(prev => [...prev, video.id]);
                          }
                        }}
                      >
                        <div className="play-button">
                          <Play size={24} />
                        </div>
                        <span className="video-duration">{video.duree}</span>
                        {isCompleted && (
                          <div className="video-completed">
                            <CheckCircle size={18} />
                          </div>
                        )}
                      </div>
                      <div className="video-content">
                        <div className="video-category">{video.categorie}</div>
                        <h3 className="video-title">{video.titre}</h3>
                        <p className="video-description">{video.description}</p>
                        {video.obligatoire && !isCompleted && (
                          <span className="badge badge-warning" style={{ marginTop: '10px' }}>
                            Obligatoire
                          </span>
                        )}
                        {isCompleted && (
                          <span className="badge badge-success" style={{ marginTop: '10px' }}>
                            <CheckCircle size={14} /> Complétée
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================ */}
          {/* MESSAGERIE INTERNE */}
          {/* ============================================ */}
          {currentView === 'messages' && (
            <div className="animate-in">
              <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.5rem', height: 'calc(100vh - 200px)', minHeight: '500px' }}>
                {/* Liste des conversations */}
                <div className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div className="card-header" style={{ borderBottom: '1px solid var(--border)', padding: '1rem 1.25rem' }}>
                    <div className="card-title" style={{ margin: 0 }}><MessageCircle size={18} /> Conversations</div>
                  </div>
                  
                  <div style={{ flex: 1, overflowY: 'auto' }}>
                    {getConversations().length > 0 ? getConversations().map(conv => {
                      const colors = EMPLOYEE_COLORS[conv.contactId] || { bg: 'rgba(201,169,98,0.2)', border: '#c9a962' };
                      return (
                        <div 
                          key={conv.contactId}
                          onClick={() => {
                            setSelectedConversation(conv);
                            markMessagesAsRead(conv.contactId);
                          }}
                          style={{
                            padding: '1rem 1.25rem',
                            borderBottom: '1px solid var(--border)',
                            cursor: 'pointer',
                            background: selectedConversation?.contactId === conv.contactId ? colors.bg : 'transparent',
                            borderLeft: selectedConversation?.contactId === conv.contactId ? `3px solid ${colors.border}` : '3px solid transparent',
                            transition: 'all 0.2s'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div 
                              className="client-avatar" 
                              style={{ 
                                width: '45px', 
                                height: '45px', 
                                fontSize: '1rem',
                                background: colors.bg,
                                border: `2px solid ${colors.border}`,
                                color: colors.text || colors.border
                              }}
                            >
                              {conv.contact?.nom.charAt(0)}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <strong style={{ fontSize: '0.95rem' }}>{conv.contact?.nom.split(' ')[0]}</strong>
                                {conv.unreadCount > 0 && (
                                  <span className="badge badge-danger" style={{ minWidth: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>
                                    {conv.unreadCount}
                                  </span>
                                )}
                              </div>
                              <p style={{ 
                                margin: '4px 0 0', 
                                fontSize: '0.8rem', 
                                color: 'var(--text-muted)',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}>
                                {conv.lastMessage?.message}
                              </p>
                              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                {conv.lastMessage?.date && new Date(conv.lastMessage.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }) : (
                      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        <MessageCircle size={40} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                        <p>Aucune conversation</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Nouveau message à quelqu'un */}
                  <div style={{ padding: '1rem', borderTop: '1px solid var(--border)' }}>
                    <select 
                      className="form-input" 
                      style={{ fontSize: '0.85rem' }}
                      onChange={(e) => {
                        if (e.target.value) {
                          const contact = employees.find(emp => emp.id === parseInt(e.target.value));
                          setSelectedConversation({
                            contactId: parseInt(e.target.value),
                            contact,
                            messages: messages.filter(m => 
                              (m.fromId === currentUser?.id && m.toId === parseInt(e.target.value)) ||
                              (m.fromId === parseInt(e.target.value) && m.toId === currentUser?.id)
                            ).sort((a, b) => new Date(a.date) - new Date(b.date)),
                            unreadCount: 0
                          });
                          e.target.value = '';
                        }
                      }}
                    >
                      <option value="">+ Nouvelle conversation...</option>
                      {employees.filter(e => e.id !== currentUser?.id).map(emp => (
                        <option key={emp.id} value={emp.id}>{emp.nom}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Zone de conversation */}
                <div className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  {selectedConversation ? (
                    <>
                      {/* Header conversation */}
                      <div style={{ 
                        padding: '1rem 1.25rem', 
                        borderBottom: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        background: EMPLOYEE_COLORS[selectedConversation.contactId]?.bg || 'transparent'
                      }}>
                        <div 
                          className="client-avatar" 
                          style={{ 
                            width: '40px', 
                            height: '40px', 
                            fontSize: '1rem',
                            background: EMPLOYEE_COLORS[selectedConversation.contactId]?.bg,
                            border: `2px solid ${EMPLOYEE_COLORS[selectedConversation.contactId]?.border || 'var(--accent)'}`,
                            color: EMPLOYEE_COLORS[selectedConversation.contactId]?.text || 'var(--accent)'
                          }}
                        >
                          {selectedConversation.contact?.nom.charAt(0)}
                        </div>
                        <div>
                          <strong>{selectedConversation.contact?.nom}</strong>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{selectedConversation.contact?.role}</div>
                        </div>
                      </div>
                      
                      {/* Messages */}
                      <div style={{ 
                        flex: 1, 
                        overflowY: 'auto', 
                        padding: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem'
                      }}>
                        {messages
                          .filter(m => 
                            (m.fromId === currentUser?.id && m.toId === selectedConversation.contactId) ||
                            (m.fromId === selectedConversation.contactId && m.toId === currentUser?.id)
                          )
                          .sort((a, b) => new Date(a.date) - new Date(b.date))
                          .map((msg, i) => {
                          const isMe = msg.fromId === currentUser?.id;
                          const msgTypeColors = {
                            stock: { bg: 'rgba(251, 191, 36, 0.2)', border: 'var(--warning)' },
                            success: { bg: 'rgba(34, 197, 94, 0.2)', border: 'var(--success)' },
                            warning: { bg: 'rgba(248, 113, 113, 0.2)', border: 'var(--danger)' },
                            normal: {}
                          };
                          const typeStyle = msgTypeColors[msg.type] || {};
                          
                          return (
                            <div 
                              key={msg.id} 
                              style={{ 
                                alignSelf: isMe ? 'flex-end' : 'flex-start',
                                maxWidth: '70%'
                              }}
                            >
                              <div style={{
                                background: isMe ? 'var(--accent)' : (typeStyle.bg || 'var(--bg)'),
                                color: isMe ? '#1a1a2e' : 'var(--text)',
                                padding: '0.75rem 1rem',
                                borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                border: !isMe ? `1px solid ${typeStyle.border || 'var(--border)'}` : 'none',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                              }}>
                                {msg.type === 'stock' && <Package size={14} style={{ display: 'inline', marginRight: '6px', color: 'var(--warning)' }} />}
                                {msg.type === 'success' && <Award size={14} style={{ display: 'inline', marginRight: '6px', color: 'var(--success)' }} />}
                                {msg.type === 'warning' && <AlertCircle size={14} style={{ display: 'inline', marginRight: '6px', color: 'var(--danger)' }} />}
                                {msg.message}
                              </div>
                              <div style={{ 
                                fontSize: '0.7rem', 
                                color: 'var(--text-muted)', 
                                marginTop: '4px',
                                textAlign: isMe ? 'right' : 'left'
                              }}>
                                {new Date(msg.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                {isMe && msg.lu && <span style={{ marginLeft: '6px' }}>✓✓</span>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Zone de saisie */}
                      <div style={{ 
                        padding: '1rem', 
                        borderTop: '1px solid var(--border)',
                        display: 'flex',
                        gap: '0.75rem'
                      }}>
                        <input 
                          type="text"
                          className="form-input"
                          placeholder="Écrivez votre message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && newMessage.trim()) {
                              sendMessage(selectedConversation.contactId, newMessage);
                            }
                          }}
                          style={{ flex: 1 }}
                        />
                        <button 
                          className="btn btn-primary"
                          onClick={() => sendMessage(selectedConversation.contactId, newMessage)}
                          disabled={!newMessage.trim()}
                        >
                          <Send size={18} />
                        </button>
                      </div>
                      
                      {/* Boutons rapides */}
                      <div style={{ padding: '0 1rem 1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <button 
                          className="btn btn-secondary btn-sm"
                          onClick={() => sendMessage(selectedConversation.contactId, "Stock de gel conducteur bas, peux-tu commander ?", 'stock')}
                        >
                          <Package size={14} /> Stock bas
                        </button>
                        <button 
                          className="btn btn-secondary btn-sm"
                          onClick={() => sendMessage(selectedConversation.contactId, "RDV annulé par la cliente", 'warning')}
                        >
                          <AlertCircle size={14} /> RDV annulé
                        </button>
                        <button 
                          className="btn btn-secondary btn-sm"
                          onClick={() => sendMessage(selectedConversation.contactId, "Objectif atteint ! 🎉", 'success')}
                        >
                          <Award size={14} /> Objectif atteint
                        </button>
                      </div>
                    </>
                  ) : (
                    <div style={{ 
                      flex: 1, 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: 'var(--text-muted)'
                    }}>
                      <MessageCircle size={60} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                      <p style={{ fontSize: '1.1rem' }}>Sélectionnez une conversation</p>
                      <p style={{ fontSize: '0.85rem' }}>ou démarrez-en une nouvelle</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ============================================ */}
          {/* OBJECTIFS & GAMIFICATION (Directrice) */}
          {/* ============================================ */}
          {currentView === 'objectifs' && currentUser.isDirector && (
            <div className="animate-in">
              {/* Leaderboard */}
              <div className="card" style={{ marginBottom: '1.5rem' }}>
                <div className="card-header">
                  <div className="card-title"><Trophy size={18} /> Classement de l'équipe</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {getLeaderboard().map((emp, index) => {
                    const obj = emp.objectives;
                    const colors = EMPLOYEE_COLORS[emp.id] || { bg: 'rgba(201,169,98,0.2)', border: '#c9a962' };
                    return (
                      <div key={emp.id} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '1rem',
                        padding: '1rem 1.25rem',
                        background: index === 0 ? 'linear-gradient(135deg, rgba(201, 169, 98, 0.2), rgba(201, 169, 98, 0.05))' : 'var(--bg)',
                        border: `1px solid ${index === 0 ? 'var(--accent)' : 'var(--border)'}`,
                        borderRadius: '12px'
                      }}>
                        <div style={{ 
                          width: '40px', 
                          height: '40px', 
                          borderRadius: '50%', 
                          background: index === 0 ? 'var(--accent)' : index === 1 ? '#c0c0c0' : '#cd7f32',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: '700',
                          color: '#1a1a2e',
                          fontSize: '1.25rem'
                        }}>
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                        </div>
                        <div className="client-avatar" style={{ width: '50px', height: '50px', background: colors.bg, border: `2px solid ${colors.border}`, color: colors.text }}>
                          {emp.nom.charAt(0)}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{emp.nom}</div>
                          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            <span>{obj.monthly_seances_current} séances ce mois</span>
                            <span>•</span>
                            <span>{obj.monthly_ca_current}€ CA</span>
                            <span>•</span>
                            <span>🔥 {obj.streak_days} jours</span>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent)' }}>{emp.score} pts</div>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            {obj.badges_earned.slice(0, 5).map(badgeId => (
                              <span key={badgeId} title={BADGES[badgeId]?.nom} style={{ fontSize: '1.1rem' }}>
                                {BADGES[badgeId]?.icon}
                              </span>
                            ))}
                            {obj.badges_earned.length > 5 && (
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>+{obj.badges_earned.length - 5}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Détail par praticienne */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
                {employees.filter(e => !e.isDirector).map(emp => {
                  const obj = getEmployeeObjectives(emp.id);
                  const colors = EMPLOYEE_COLORS[emp.id] || { bg: 'rgba(201,169,98,0.2)', border: '#c9a962', text: '#c9a962' };
                  const seancesProgress = getProgressPercentage(obj.monthly_seances_current, obj.monthly_seances_target);
                  const caProgress = getProgressPercentage(obj.monthly_ca_current, obj.monthly_ca_target);
                  
                  return (
                    <div key={emp.id} className="card">
                      <div className="card-header" style={{ borderBottom: `2px solid ${colors.border}` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div className="client-avatar" style={{ width: '45px', height: '45px', background: colors.bg, border: `2px solid ${colors.border}`, color: colors.text }}>
                            {emp.nom.charAt(0)}
                          </div>
                          <div>
                            <div className="card-title" style={{ marginBottom: '0' }}>{emp.nom}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                              🔥 Série de {obj.streak_days} jours • {obj.total_seances} séances totales
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Objectif séances */}
                      <div style={{ marginBottom: '1.25rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '0.9rem' }}>📅 Séances ce mois</span>
                          <span style={{ fontWeight: '600', color: seancesProgress >= 100 ? 'var(--success)' : colors.text }}>
                            {obj.monthly_seances_current} / {obj.monthly_seances_target}
                          </span>
                        </div>
                        <div className="progress-bar" style={{ height: '10px' }}>
                          <div className="progress-fill" style={{ width: `${seancesProgress}%`, background: seancesProgress >= 100 ? 'var(--success)' : colors.border }} />
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                          {seancesProgress >= 100 ? '✓ Objectif atteint !' : `${obj.monthly_seances_target - obj.monthly_seances_current} restantes`}
                        </div>
                      </div>
                      
                      {/* Objectif CA */}
                      <div style={{ marginBottom: '1.25rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '0.9rem' }}>💰 CA ce mois</span>
                          <span style={{ fontWeight: '600', color: caProgress >= 100 ? 'var(--success)' : colors.text }}>
                            {obj.monthly_ca_current}€ / {obj.monthly_ca_target}€
                          </span>
                        </div>
                        <div className="progress-bar" style={{ height: '10px' }}>
                          <div className="progress-fill" style={{ width: `${caProgress}%`, background: caProgress >= 100 ? 'var(--success)' : colors.border }} />
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                          {caProgress >= 100 ? '✓ Objectif atteint !' : `${obj.monthly_ca_target - obj.monthly_ca_current}€ restants`}
                        </div>
                      </div>
                      
                      {/* Graphique historique */}
                      {obj.monthly_history.length > 0 && (
                        <div style={{ height: '120px', marginBottom: '1rem' }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={obj.monthly_history}>
                              <XAxis dataKey="mois" stroke="#888" fontSize={10} />
                              <YAxis stroke="#888" fontSize={10} />
                              <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid var(--border)', borderRadius: '8px' }} />
                              <Bar dataKey="seances" fill={colors.border} radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                      
                      {/* Badges */}
                      <div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                          Badges obtenus ({obj.badges_earned.length})
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {obj.badges_earned.map(badgeId => {
                            const badge = BADGES[badgeId];
                            return (
                              <div 
                                key={badgeId}
                                style={{ 
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  padding: '6px 12px',
                                  background: `${badge?.color}20`,
                                  border: `1px solid ${badge?.color}`,
                                  borderRadius: '20px',
                                  fontSize: '0.8rem'
                                }}
                                title={badge?.description}
                              >
                                <span>{badge?.icon}</span>
                                <span style={{ color: badge?.color }}>{badge?.nom}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* OBJECTIFS (Employée) */}
          {currentView === 'objectifs' && !currentUser.isDirector && (
            <div className="animate-in">
              {(() => {
                const obj = getEmployeeObjectives(currentUser?.id);
                const seancesProgress = getProgressPercentage(obj.monthly_seances_current, obj.monthly_seances_target);
                const caProgress = getProgressPercentage(obj.monthly_ca_current, obj.monthly_ca_target);
                
                return (
                  <>
                    {/* Stats principales */}
                    <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
                      <div className="stat-card" style={{ background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.2), rgba(201, 169, 98, 0.05))', border: '1px solid var(--accent)' }}>
                        <div className="stat-header">
                          <div className="stat-icon gold"><Flame size={24} /></div>
                        </div>
                        <div className="stat-value" style={{ color: 'var(--accent)' }}>{obj.streak_days} jours</div>
                        <div className="stat-label">Série en cours</div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-header">
                          <div className="stat-icon blue"><Target size={24} /></div>
                        </div>
                        <div className="stat-value">{obj.total_seances}</div>
                        <div className="stat-label">Séances totales</div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-header">
                          <div className="stat-icon green"><Award size={24} /></div>
                        </div>
                        <div className="stat-value">{obj.badges_earned.length}</div>
                        <div className="stat-label">Badges obtenus</div>
                      </div>
                      <div className="stat-card">
                        <div className="stat-header">
                          <div className="stat-icon"><Trophy size={24} /></div>
                        </div>
                        <div className="stat-value">{(obj.monthly_seances_current * 10) + (obj.badges_earned.length * 50)} pts</div>
                        <div className="stat-label">Score total</div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
                      {/* Objectifs du mois */}
                      <div className="card">
                        <div className="card-header">
                          <div className="card-title"><Target size={18} /> Objectifs du mois</div>
                        </div>
                        
                        {/* Séances */}
                        <div style={{ marginBottom: '1.5rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <span style={{ fontSize: '1.5rem' }}>📅</span>
                              <span>Séances</span>
                            </div>
                            <span style={{ fontSize: '1.25rem', fontWeight: '700', color: seancesProgress >= 100 ? 'var(--success)' : 'var(--accent)' }}>
                              {obj.monthly_seances_current}/{obj.monthly_seances_target}
                            </span>
                          </div>
                          <div className="progress-bar" style={{ height: '12px' }}>
                            <div className="progress-fill" style={{ width: `${seancesProgress}%`, background: seancesProgress >= 100 ? 'var(--success)' : 'var(--accent)' }} />
                          </div>
                          {seancesProgress >= 100 && (
                            <div style={{ marginTop: '0.5rem', color: 'var(--success)', fontSize: '0.85rem' }}>
                              🎉 Objectif atteint ! Bonus débloqué
                            </div>
                          )}
                        </div>
                        
                        {/* CA */}
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <span style={{ fontSize: '1.5rem' }}>💰</span>
                              <span>Chiffre d'affaires</span>
                            </div>
                            <span style={{ fontSize: '1.25rem', fontWeight: '700', color: caProgress >= 100 ? 'var(--success)' : 'var(--accent)' }}>
                              {obj.monthly_ca_current}€/{obj.monthly_ca_target}€
                            </span>
                          </div>
                          <div className="progress-bar" style={{ height: '12px' }}>
                            <div className="progress-fill" style={{ width: `${caProgress}%`, background: caProgress >= 100 ? 'var(--success)' : 'var(--accent)' }} />
                          </div>
                          {caProgress >= 100 && (
                            <div style={{ marginTop: '0.5rem', color: 'var(--success)', fontSize: '0.85rem' }}>
                              🎉 Objectif atteint ! Bonus débloqué
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Historique */}
                      <div className="card">
                        <div className="card-header">
                          <div className="card-title"><BarChart3 size={18} /> Historique mensuel</div>
                        </div>
                        <div style={{ height: '200px' }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={obj.monthly_history}>
                              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                              <XAxis dataKey="mois" stroke="#888" fontSize={11} />
                              <YAxis stroke="#888" fontSize={11} />
                              <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid var(--accent)', borderRadius: '8px' }} />
                              <Bar dataKey="seances" fill="#c9a962" radius={[4, 4, 0, 0]} name="Séances" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      
                      {/* Badges obtenus */}
                      <div className="card">
                        <div className="card-header">
                          <div className="card-title"><Medal size={18} /> Mes badges</div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}>
                          {obj.badges_earned.map(badgeId => {
                            const badge = BADGES[badgeId];
                            return (
                              <div 
                                key={badgeId}
                                style={{ 
                                  textAlign: 'center',
                                  padding: '1rem',
                                  background: `${badge?.color}15`,
                                  border: `1px solid ${badge?.color}`,
                                  borderRadius: '12px'
                                }}
                              >
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{badge?.icon}</div>
                                <div style={{ fontWeight: '600', color: badge?.color, fontSize: '0.85rem' }}>{badge?.nom}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{badge?.description}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      {/* Badges à débloquer */}
                      <div className="card">
                        <div className="card-header">
                          <div className="card-title"><Star size={18} /> À débloquer</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          {Object.entries(BADGES).filter(([id]) => !obj.badges_earned.includes(id)).slice(0, 5).map(([badgeId, badge]) => {
                            const progress = obj.badges_progress[badgeId] || 0;
                            const target = badgeId.includes('seances_100') ? 100 : 
                                          badgeId.includes('seances_50') ? 50 : 
                                          badgeId.includes('ca_5000') ? 5000 : 
                                          badgeId.includes('ca_3000') ? 3000 :
                                          badgeId.includes('streak_30') ? 30 : 
                                          badgeId.includes('streak_7') ? 7 : 10;
                            const progressPct = Math.min(100, Math.round((progress / target) * 100));
                            
                            return (
                              <div key={badgeId} style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '1rem',
                                padding: '0.75rem',
                                background: 'var(--bg)',
                                borderRadius: '10px',
                                opacity: 0.7
                              }}>
                                <span style={{ fontSize: '1.5rem', filter: 'grayscale(100%)' }}>{badge.icon}</span>
                                <div style={{ flex: 1 }}>
                                  <div style={{ fontSize: '0.85rem', marginBottom: '4px' }}>{badge.nom}</div>
                                  <div className="progress-bar" style={{ height: '6px' }}>
                                    <div className="progress-fill" style={{ width: `${progressPct}%` }} />
                                  </div>
                                </div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{progressPct}%</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {/* ============================================ */}
          {/* RAPPELS RDV (Directrice) */}
          {/* ============================================ */}
          {currentView === 'rappels' && currentUser.isDirector && (
            <div className="animate-in">
              {/* Stats rappels */}
              <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
                <div className="stat-card">
                  <div className="stat-header">
                    <div className="stat-icon gold"><BellRing size={24} /></div>
                  </div>
                  <div className="stat-value">{getRdvsPending().length}</div>
                  <div className="stat-label">À rappeler</div>
                </div>
                <div className="stat-card" style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid var(--success)' }}>
                  <div className="stat-header">
                    <div className="stat-icon green"><CheckCircle size={24} /></div>
                  </div>
                  <div className="stat-value">{rdvs.filter(r => r.statut === 'confirmé').length}</div>
                  <div className="stat-label">Confirmés</div>
                </div>
                <div className="stat-card" style={{ background: 'rgba(251, 191, 36, 0.1)', border: '1px solid var(--warning)' }}>
                  <div className="stat-header">
                    <div className="stat-icon" style={{ color: 'var(--warning)' }}><Clock size={24} /></div>
                  </div>
                  <div className="stat-value">{rdvs.filter(r => r.statut === 'en attente').length}</div>
                  <div className="stat-label">En attente</div>
                </div>
                <div className="stat-card" style={{ background: 'rgba(248, 113, 113, 0.1)', border: '1px solid var(--danger)' }}>
                  <div className="stat-header">
                    <div className="stat-icon" style={{ color: 'var(--danger)' }}><XCircle size={24} /></div>
                  </div>
                  <div className="stat-value">{rdvs.filter(r => r.statut === 'annulé').length}</div>
                  <div className="stat-label">Annulés</div>
                </div>
              </div>
              
              {/* Bouton envoi auto */}
              <div className="card" style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '0.5rem' }}>Rappels automatiques</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      Envoyez automatiquement un rappel SMS/Email aux clientes pour les RDV des prochains jours
                    </p>
                  </div>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => {
                      const rdvsToRemind = getRdvsPending();
                      if (rdvsToRemind.length === 0) {
                        addNotification({ type: 'info', message: 'Aucun rappel à envoyer', forEmployee: null });
                        return;
                      }
                      rdvsToRemind.forEach(rdv => {
                        sendRappel(rdv.id, 'sms', 'rappel_j1');
                      });
                      addNotification({ type: 'success', message: `📱 ${rdvsToRemind.length} rappel(s) envoyé(s) !`, forEmployee: null });
                    }}
                    disabled={getRdvsPending().length === 0}
                  >
                    <BellRing size={18} /> Envoyer les rappels ({getRdvsPending().length})
                  </button>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '1.5rem' }}>
                {/* RDV à confirmer */}
                <div className="card">
                  <div className="card-header">
                    <div className="card-title"><Clock size={18} /> RDV en attente de confirmation</div>
                  </div>
                  {getRdvsPending().length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {getRdvsPending().map(rdv => {
                        const client = clients.find(c => c.id === rdv.clientId);
                        const emp = employees.find(e => e.id === rdv.employeeId);
                        const colors = EMPLOYEE_COLORS[rdv.employeeId] || {};
                        const status = getRdvConfirmationStatus(rdv.id);
                        const statusInfo = RDV_STATUS[status] || RDV_STATUS.pending;
                        
                        return (
                          <div 
                            key={rdv.id} 
                            style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '1rem',
                              padding: '1rem',
                              background: 'var(--bg)',
                              borderRadius: '12px',
                              borderLeft: `4px solid ${statusInfo.color}`,
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                            onClick={() => setShowRdvConfirmModal(rdv)}
                          >
                            <div className="client-avatar" style={{ width: '45px', height: '45px' }}>
                              {client?.nom.charAt(0)}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {client?.nom}
                                <span className="badge" style={{ 
                                  background: `${statusInfo.color}20`, 
                                  color: statusInfo.color,
                                  border: `1px solid ${statusInfo.color}`,
                                  fontSize: '0.65rem',
                                  padding: '2px 8px'
                                }}>
                                  {statusInfo.icon} {statusInfo.label}
                                </span>
                              </div>
                              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                {new Date(rdv.date).toLocaleDateString('fr-FR', { weekday: 'short', day: '2-digit', month: 'short' })} à {rdv.heure}
                              </div>
                              <div style={{ fontSize: '0.8rem', color: colors.text }}>{emp?.nom.split(' ')[0]}</div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }} onClick={(e) => e.stopPropagation()}>
                              <button 
                                className="btn btn-secondary btn-sm"
                                onClick={() => sendRappel(rdv.id, 'sms', 'rappel_j1')}
                                title="Envoyer SMS"
                              >
                                <Smartphone size={14} />
                              </button>
                              <button 
                                className="btn btn-secondary btn-sm"
                                onClick={() => sendRappel(rdv.id, 'email', 'rappel_j1')}
                                title="Envoyer Email"
                              >
                                <Mail size={14} />
                              </button>
                              <button 
                                className="btn btn-sm"
                                style={{ background: 'rgba(34, 197, 94, 0.2)', border: '1px solid var(--success)', color: 'var(--success)' }}
                                onClick={() => {
                                  setRdvs(prev => prev.map(r => r.id === rdv.id ? { ...r, statut: 'confirmé' } : r));
                                  addNotification({ type: 'success', message: `RDV confirmé : ${client?.nom}`, forEmployee: null });
                                }}
                                title="Confirmer"
                              >
                                <CheckCircle size={14} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      <CheckCircle size={40} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                      <p>Tous les RDV sont confirmés ! 🎉</p>
                    </div>
                  )}
                </div>
                
                {/* Historique des confirmations */}
                <div className="card">
                  <div className="card-header">
                    <div className="card-title"><History size={18} /> Historique des confirmations</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '400px', overflowY: 'auto' }}>
                    {rdvConfirmations.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 15).map(conf => {
                      const client = clients.find(c => c.id === conf.clientId);
                      const statusInfo = RDV_STATUS[conf.status] || RDV_STATUS.pending;
                      
                      return (
                        <div key={conf.id} style={{ 
                          padding: '0.75rem',
                          background: 'var(--bg)',
                          borderRadius: '8px',
                          borderLeft: `3px solid ${statusInfo.color}`,
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onClick={() => {
                          const rdv = rdvs.find(r => r.id === conf.rdvId);
                          if (rdv) setShowRdvConfirmModal(rdv);
                        }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                              <div style={{ fontSize: '0.85rem', fontWeight: '500' }}>
                                {statusInfo.icon} {client?.nom.split(' ')[0]} - {conf.action.replace('_', ' ')}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                                {conf.type.toUpperCase()} • {new Date(conf.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                              {(conf.status === 'sent' || conf.status === 'no_response') && (
                                <div style={{ display: 'flex', gap: '0.25rem' }} onClick={(e) => e.stopPropagation()}>
                                  <button 
                                    className="btn btn-sm"
                                    style={{ padding: '2px 6px', background: 'rgba(34, 197, 94, 0.2)', border: '1px solid var(--success)', color: 'var(--success)', fontSize: '0.65rem' }}
                                    onClick={() => {
                                      simulateClientResponse(conf.id, 'OUI', 'confirmed');
                                      setRdvs(prev => prev.map(r => r.id === conf.rdvId ? { ...r, statut: 'confirmé' } : r));
                                    }}
                                    title="Confirmer"
                                  >
                                    ✓
                                  </button>
                                  <button 
                                    className="btn btn-sm"
                                    style={{ padding: '2px 6px', background: 'rgba(248, 113, 113, 0.2)', border: '1px solid var(--danger)', color: 'var(--danger)', fontSize: '0.65rem' }}
                                    onClick={() => {
                                      simulateClientResponse(conf.id, 'NON', 'cancelled');
                                      setRdvs(prev => prev.map(r => r.id === conf.rdvId ? { ...r, statut: 'annulé' } : r));
                                    }}
                                    title="Annuler"
                                  >
                                    ✗
                                  </button>
                                </div>
                              )}
                              <span className="badge" style={{ 
                                background: `${statusInfo.color}20`, 
                                color: statusInfo.color,
                                border: `1px solid ${statusInfo.color}`,
                                fontSize: '0.7rem'
                              }}>
                                {statusInfo.label}
                              </span>
                            </div>
                          </div>
                          {conf.response && (
                            <div style={{ 
                              marginTop: '0.5rem', 
                              padding: '0.5rem', 
                              background: 'var(--bg-card)', 
                              borderRadius: '6px',
                              fontSize: '0.8rem',
                              fontStyle: 'italic'
                            }}>
                              "{conf.response}"
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================ */}
          {/* PARRAINAGE (Directrice) */}
          {/* ============================================ */}
          {currentView === 'parrainage' && currentUser.isDirector && (
            <div className="animate-in">
              {/* Stats parrainage */}
              <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
                <div className="stat-card">
                  <div className="stat-header">
                    <div className="stat-icon gold"><Gift size={24} /></div>
                  </div>
                  <div className="stat-value">{getStatsParrainage().totalParrainages}</div>
                  <div className="stat-label">Parrainages</div>
                </div>
                <div className="stat-card" style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid var(--success)' }}>
                  <div className="stat-header">
                    <div className="stat-icon green"><Users size={24} /></div>
                  </div>
                  <div className="stat-value">{getStatsParrainage().nbMarraines}</div>
                  <div className="stat-label">Marraines actives</div>
                </div>
                <div className="stat-card" style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid #8b5cf6' }}>
                  <div className="stat-header">
                    <div className="stat-icon" style={{ color: '#8b5cf6' }}><Euro size={24} /></div>
                  </div>
                  <div className="stat-value">{getStatsParrainage().caFilleules.toLocaleString()}€</div>
                  <div className="stat-label">CA via parrainage</div>
                </div>
                <div className="stat-card" style={{ background: 'rgba(251, 191, 36, 0.1)', border: '1px solid var(--warning)' }}>
                  <div className="stat-header">
                    <div className="stat-icon" style={{ color: 'var(--warning)' }}><Clock size={24} /></div>
                  </div>
                  <div className="stat-value">{getStatsParrainage().recompensesEnAttente}</div>
                  <div className="stat-label">Récompenses en attente</div>
                </div>
              </div>
              
              {/* Règles du programme */}
              <div className="card" style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '0.5rem' }}>
                      <Gift size={20} style={{ display: 'inline', marginRight: '8px' }} />
                      Programme de parrainage
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      Marraine : <strong style={{ color: 'var(--success)' }}>+{PARRAINAGE_CONFIG.recompenseMarraine}€</strong> • 
                      Filleule : <strong style={{ color: 'var(--accent)' }}>-{PARRAINAGE_CONFIG.reductionFilleule}€</strong> sur le forfait
                    </p>
                  </div>
                  <div className="badge badge-success" style={{ fontSize: '0.9rem', padding: '8px 16px' }}>
                    ✓ Programme actif
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '1.5rem' }}>
                {/* Top Marraines */}
                <div className="card">
                  <div className="card-header">
                    <div className="card-title"><Trophy size={18} /> Top Marraines</div>
                  </div>
                  {getTopMarraines().length > 0 ? (
                    <div className="table-container">
                      <table>
                        <thead>
                          <tr>
                            <th>Rang</th>
                            <th>Marraine</th>
                            <th>Filleules</th>
                            <th>CA généré</th>
                            <th>Récompenses</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getTopMarraines().map((item, index) => (
                            <tr key={item.marraine?.id}>
                              <td>
                                <span style={{ fontSize: '1.2rem' }}>
                                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                                </span>
                              </td>
                              <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <div className="client-avatar" style={{ width: '35px', height: '35px', fontSize: '0.85rem' }}>
                                    {item.marraine.nom.charAt(0)}
                                  </div>
                                  <div>
                                    <div style={{ fontWeight: '500' }}>{item.marraine.nom}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                                      {getCodeParrainage(item.marraine.id)}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td><strong>{item.nbFilleules}</strong></td>
                              <td style={{ color: 'var(--success)' }}>{item.caGenere.toLocaleString()}€</td>
                              <td>
                                <span style={{ color: 'var(--success)' }}>{item.totalRecompenses}€</span>
                                {item.recompensesEnAttente > 0 && (
                                  <span style={{ color: 'var(--warning)', marginLeft: '8px' }}>
                                    (+{item.recompensesEnAttente * PARRAINAGE_CONFIG.recompenseMarraine}€ en attente)
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      <Gift size={40} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                      <p>Aucun parrainage pour le moment</p>
                    </div>
                  )}
                </div>
                
                {/* Récompenses en attente */}
                <div className="card">
                  <div className="card-header">
                    <div className="card-title"><Clock size={18} /> Récompenses à valider</div>
                  </div>
                  {parrainages.filter(p => !p.recompenseVersee && clients.find(c => c.id === p.marraineId) && clients.find(c => c.id === p.filleuleId)).length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {parrainages.filter(p => !p.recompenseVersee).map(parrainage => {
                        const marraine = clients.find(c => c.id === parrainage.marraineId);
                        const filleule = clients.find(c => c.id === parrainage.filleuleId);
                        if (!marraine || !filleule) return null; // Skip si client manquant
                        return (
                          <div 
                            key={parrainage.id}
                            style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '1rem',
                              padding: '1rem',
                              background: 'var(--bg)',
                              borderRadius: '12px',
                              borderLeft: '4px solid var(--warning)'
                            }}
                          >
                            <div className="client-avatar" style={{ width: '45px', height: '45px' }}>
                              {marraine.nom.charAt(0)}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: '600' }}>{marraine.nom}</div>
                              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                A parrainé <strong>{filleule.nom}</strong>
                              </div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                {new Date(parrainage.date).toLocaleDateString('fr-FR')}
                              </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--warning)' }}>
                                +{PARRAINAGE_CONFIG.recompenseMarraine}€
                              </div>
                              <button 
                                className="btn btn-sm"
                                style={{ background: 'rgba(34, 197, 94, 0.2)', border: '1px solid var(--success)', color: 'var(--success)', marginTop: '4px' }}
                                onClick={() => validerRecompense(parrainage.id)}
                              >
                                <CheckCircle size={14} /> Valider
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      <CheckCircle size={40} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                      <p>Toutes les récompenses sont versées ! ✨</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Historique des parrainages */}
              <div className="card" style={{ marginTop: '1.5rem' }}>
                <div className="card-header">
                  <div className="card-title"><History size={18} /> Historique des parrainages</div>
                </div>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Marraine</th>
                        <th>Filleule</th>
                        <th>Forfait</th>
                        <th>Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {parrainages
                        .filter(p => clients.find(c => c.id === p.marraineId) && clients.find(c => c.id === p.filleuleId))
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map(parrainage => {
                        const marraine = clients.find(c => c.id === parrainage.marraineId);
                        const filleule = clients.find(c => c.id === parrainage.filleuleId);
                        return (
                          <tr key={parrainage.id}>
                            <td>{new Date(parrainage.date).toLocaleDateString('fr-FR')}</td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div className="client-avatar" style={{ width: '30px', height: '30px', fontSize: '0.75rem' }}>
                                  {marraine.nom.charAt(0)}
                                </div>
                                {marraine.nom}
                              </div>
                            </td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div className="client-avatar" style={{ width: '30px', height: '30px', fontSize: '0.75rem' }}>
                                  {filleule.nom.charAt(0)}
                                </div>
                                {filleule.nom}
                              </div>
                            </td>
                            <td>{filleule.forfait || '-'}</td>
                            <td>
                              {parrainage.recompenseVersee ? (
                                <span className="badge badge-success">✓ Versé</span>
                              ) : (
                                <span className="badge" style={{ background: 'rgba(251, 191, 36, 0.2)', color: 'var(--warning)', border: '1px solid var(--warning)' }}>
                                  En attente
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ============================================ */}
          {/* PARAMÈTRES (Directrice) */}
          {/* ============================================ */}
          {currentView === 'settings' && currentUser.isDirector && (
            <div className="animate-in">
              <div className="card">
                <div className="card-header">
                  <div className="card-title"><Zap /> Intégrations</div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                  {[
                    { name: 'Airtable', icon: '📊', status: 'connected', desc: 'Base de données clients' },
                    { name: 'Cal.com', icon: '📅', status: 'connected', desc: 'Gestion des RDV' },
                    { name: 'Brevo', icon: '📧', status: 'connected', desc: 'Emails automatiques' }
                  ].map(integration => (
                    <div key={integration.name} style={{ 
                      background: 'var(--bg)', 
                      border: '1px solid var(--border)', 
                      borderRadius: '16px', 
                      padding: '1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}>
                      <div style={{ width: '50px', height: '50px', background: 'var(--bg-card)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                        {integration.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ marginBottom: '4px' }}>{integration.name}</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{integration.desc}</p>
                      </div>
                      <span className="badge badge-success">Connecté</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="card">
                <div className="card-header">
                  <div className="card-title"><Settings /> Paramètres généraux</div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Nom de l'entreprise</label>
                    <input type="text" className="form-input" defaultValue="SLIM TOUCH" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email de contact</label>
                    <input type="email" className="form-input" defaultValue="contact@slimtouch.fr" />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Téléphone</label>
                    <input type="tel" className="form-input" defaultValue="06 XX XX XX XX" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Zone d'intervention</label>
                    <input type="text" className="form-input" defaultValue="Amiens et environs (30km)" />
                  </div>
                </div>
                
                <button className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
                  <Save size={18} /> Enregistrer
                </button>
              </div>
              
              <div className="card">
                <div className="card-header">
                  <div className="card-title"><CreditCard /> Tarification</div>
                  <button className="btn btn-primary" onClick={openNewForfaitModal}>
                    <Plus size={18} /> Nouveau forfait
                  </button>
                </div>
                
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Forfait</th>
                        <th>Séances</th>
                        <th>Prix barré</th>
                        <th>Prix actuel</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(forfaits).map(([nom, forfait]) => (
                        <tr key={nom} style={forfait.popular ? { background: 'rgba(201, 169, 98, 0.05)' } : {}}>
                          <td>
                            <strong>{forfait.icon} {nom}</strong>
                            <div style={{ fontSize: '0.8rem', color: forfait.popular ? 'var(--accent)' : 'var(--text-muted)' }}>
                              {forfait.popular && '⭐ Le plus populaire • '}{forfait.resultat}
                            </div>
                          </td>
                          <td>{forfait.seances} séances</td>
                          <td style={{ textDecoration: 'line-through', color: 'var(--text-muted)' }}>{forfait.prixBarre}€</td>
                          <td><strong style={{ color: 'var(--success)' }}>{forfait.prix}€</strong></td>
                          <td>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              <button className="btn btn-ghost" onClick={() => openEditForfaitModal(nom)} title="Modifier">
                                <Edit size={18} />
                              </button>
                              <button 
                                className="btn btn-ghost" 
                                onClick={() => handleDeleteForfait(nom)} 
                                title="Supprimer"
                                style={{ color: 'var(--danger)' }}
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {Object.keys(forfaits).length === 0 && (
                  <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    Aucun forfait configuré
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ============================================ */}
      {/* MODALS */}
      {/* ============================================ */}
      
      {/* Modal Forfait (Ajout/Modification) */}
      {showForfaitModal && (
        <div className="modal-overlay" onClick={() => setShowForfaitModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {editingForfait ? `Modifier "${editingForfait}"` : 'Nouveau forfait'}
              </h3>
              <button className="btn btn-ghost" onClick={() => setShowForfaitModal(false)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group" style={{ flex: 2 }}>
                  <label className="form-label">Nom du forfait *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Ex: Transformation Express"
                    value={forfaitForm.nom}
                    onChange={(e) => setForfaitForm(prev => ({ ...prev, nom: e.target.value }))}
                  />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Icône</label>
                  <select 
                    className="form-input"
                    value={forfaitForm.icon}
                    onChange={(e) => setForfaitForm(prev => ({ ...prev, icon: e.target.value }))}
                  >
                    <option value="🎯">🎯 Cible</option>
                    <option value="🔥">🔥 Feu</option>
                    <option value="✨">✨ Étoiles</option>
                    <option value="💎">💎 Diamant</option>
                    <option value="💫">💫 Brillant</option>
                    <option value="⚡">⚡ Éclair</option>
                    <option value="🌟">🌟 Étoile</option>
                    <option value="💪">💪 Muscle</option>
                    <option value="🏆">🏆 Trophée</option>
                    <option value="👑">👑 Couronne</option>
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nombre de séances *</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    min="1"
                    max="50"
                    value={forfaitForm.seances}
                    onChange={(e) => setForfaitForm(prev => ({ ...prev, seances: parseInt(e.target.value) || 1 }))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Prix actuel (€) *</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    min="0"
                    step="10"
                    value={forfaitForm.prix}
                    onChange={(e) => setForfaitForm(prev => ({ ...prev, prix: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Prix barré (€)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    min="0"
                    step="10"
                    placeholder="Optionnel"
                    value={forfaitForm.prixBarre}
                    onChange={(e) => setForfaitForm(prev => ({ ...prev, prixBarre: parseInt(e.target.value) || 0 }))}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Résultat attendu</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Ex: -8 à -11 kg en 5 semaines"
                  value={forfaitForm.resultat}
                  onChange={(e) => setForfaitForm(prev => ({ ...prev, resultat: e.target.value }))}
                />
              </div>
              
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={forfaitForm.popular}
                    onChange={(e) => setForfaitForm(prev => ({ ...prev, popular: e.target.checked }))}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--accent)' }}
                  />
                  <span>⭐ Marquer comme "Le plus populaire"</span>
                </label>
              </div>
              
              {/* Aperçu */}
              <div style={{ 
                marginTop: '1rem', 
                padding: '1rem', 
                background: 'var(--bg)', 
                borderRadius: '12px',
                border: '1px dashed var(--border)'
              }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Aperçu :</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{forfaitForm.icon}</span>
                  <div>
                    <strong>{forfaitForm.nom || 'Nom du forfait'}</strong>
                    {forfaitForm.popular && <span style={{ color: 'var(--accent)', marginLeft: '8px' }}>⭐ Populaire</span>}
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      {forfaitForm.seances} séances • {forfaitForm.resultat || 'Résultat attendu'}
                    </div>
                  </div>
                  <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                    {forfaitForm.prixBarre > 0 && forfaitForm.prixBarre !== forfaitForm.prix && (
                      <div style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        {forfaitForm.prixBarre}€
                      </div>
                    )}
                    <strong style={{ color: 'var(--success)', fontSize: '1.2rem' }}>{forfaitForm.prix}€</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setShowForfaitModal(false)}>Annuler</button>
              <button className="btn btn-primary" onClick={handleSaveForfait}>
                <Save size={18} /> {editingForfait ? 'Enregistrer' : 'Créer le forfait'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal Nouvelle Cliente */}
      {showModal === 'newClient' && (
        <div className="modal-overlay" onClick={() => setShowModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Nouvelle cliente</h3>
              <button className="btn btn-ghost" onClick={() => setShowModal(null)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nom complet *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Marie Dupont"
                    value={newClientForm.nom}
                    onChange={(e) => setNewClientForm(prev => ({ ...prev, nom: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Téléphone *</label>
                  <input 
                    type="tel" 
                    className="form-input" 
                    placeholder="06 12 34 56 78"
                    value={newClientForm.telephone}
                    onChange={(e) => setNewClientForm(prev => ({ ...prev, telephone: e.target.value }))}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="email@exemple.com"
                  value={newClientForm.email}
                  onChange={(e) => setNewClientForm(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Adresse</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="15 Rue des Lilas, 80000 Amiens"
                  value={newClientForm.adresse}
                  onChange={(e) => setNewClientForm(prev => ({ ...prev, adresse: e.target.value }))}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Poids actuel (kg)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    placeholder="75"
                    value={newClientForm.poidsActuel}
                    onChange={(e) => setNewClientForm(prev => ({ ...prev, poidsActuel: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Objectif (kg)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    placeholder="67"
                    value={newClientForm.objectif}
                    onChange={(e) => setNewClientForm(prev => ({ ...prev, objectif: e.target.value }))}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Forfait</label>
                  <select 
                    className="form-input"
                    value={newClientForm.forfait}
                    onChange={(e) => setNewClientForm(prev => ({ ...prev, forfait: e.target.value }))}
                  >
                    {Object.entries(forfaits).map(([nom, f]) => (
                      <option key={nom} value={nom}>
                        {f.icon} {nom} - {f.seances} séances ({f.prix}€)
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Assigner à</label>
                  <select 
                    className="form-input"
                    value={newClientForm.assignedTo}
                    onChange={(e) => setNewClientForm(prev => ({ ...prev, assignedTo: parseInt(e.target.value) }))}
                  >
                    {employees.filter(e => !e.isDirector).map(emp => (
                      <option key={emp.id} value={emp.id}>{emp.nom}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea 
                  className="form-input" 
                  placeholder="Zones à cibler, remarques..."
                  value={newClientForm.notes}
                  onChange={(e) => setNewClientForm(prev => ({ ...prev, notes: e.target.value }))}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(null)}>Annuler</button>
              <button className="btn btn-primary" onClick={handleCreateClient}><Save size={18} /> Enregistrer</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal Modifier Cliente */}
      {showModal === 'editClient' && editingClient && (
        <div className="modal-overlay" onClick={() => { setShowModal(null); setEditingClient(null); }}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Modifier {editingClient.nom}</h3>
              <button className="btn btn-ghost" onClick={() => { setShowModal(null); setEditingClient(null); }}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nom complet *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={newClientForm.nom}
                    onChange={(e) => setNewClientForm(prev => ({ ...prev, nom: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Téléphone *</label>
                  <input 
                    type="tel" 
                    className="form-input" 
                    value={newClientForm.telephone}
                    onChange={(e) => setNewClientForm(prev => ({ ...prev, telephone: e.target.value }))}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-input" 
                  value={newClientForm.email}
                  onChange={(e) => setNewClientForm(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Adresse</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={newClientForm.adresse}
                  onChange={(e) => setNewClientForm(prev => ({ ...prev, adresse: e.target.value }))}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Poids actuel (kg)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={newClientForm.poidsActuel}
                    onChange={(e) => setNewClientForm(prev => ({ ...prev, poidsActuel: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Objectif (kg)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={newClientForm.objectif}
                    onChange={(e) => setNewClientForm(prev => ({ ...prev, objectif: e.target.value }))}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Forfait</label>
                  <select 
                    className="form-input"
                    value={newClientForm.forfait}
                    onChange={(e) => setNewClientForm(prev => ({ ...prev, forfait: e.target.value }))}
                  >
                    {Object.entries(forfaits).map(([nom, f]) => (
                      <option key={nom} value={nom}>
                        {f.icon} {nom} - {f.seances} séances ({f.prix}€)
                      </option>
                    ))}
                  </select>
                </div>
                {currentUser.isDirector && (
                  <div className="form-group">
                    <label className="form-label">Assigner à</label>
                    <select 
                      className="form-input"
                      value={newClientForm.assignedTo}
                      onChange={(e) => setNewClientForm(prev => ({ ...prev, assignedTo: parseInt(e.target.value) }))}
                    >
                      {employees.filter(e => !e.isDirector).map(emp => (
                        <option key={emp.id} value={emp.id}>{emp.nom}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea 
                  className="form-input" 
                  value={newClientForm.notes}
                  onChange={(e) => setNewClientForm(prev => ({ ...prev, notes: e.target.value }))}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => { setShowModal(null); setEditingClient(null); }}>Annuler</button>
              <button className="btn btn-primary" onClick={() => {
                setClients(prev => prev.map(c => 
                  c.id === editingClient.id 
                    ? {
                        ...c,
                        nom: newClientForm.nom,
                        telephone: newClientForm.telephone,
                        email: newClientForm.email,
                        adresse: newClientForm.adresse,
                        poidsActuel: parseInt(newClientForm.poidsActuel) || c.poidsActuel,
                        objectif: parseInt(newClientForm.objectif) || c.objectif,
                        forfait: newClientForm.forfait,
                        assignedTo: newClientForm.assignedTo,
                        notes: newClientForm.notes
                      }
                    : c
                ));
                setShowModal(null);
                setEditingClient(null);
                addNotification({
                  type: 'success',
                  message: `Cliente modifiée : ${newClientForm.nom}`,
                  forEmployee: newClientForm.assignedTo
                });
              }}><Save size={18} /> Enregistrer</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal Nouveau RDV */}
      {showModal === 'newRdv' && (
        <div className="modal-overlay" onClick={() => setShowModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Nouveau rendez-vous</h3>
              <button className="btn btn-ghost" onClick={() => setShowModal(null)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Cliente *</label>
                <select className="form-input">
                  {visibleClients.map(c => (
                    <option key={c.id} value={c.id}>{c.nom}</option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Date *</label>
                  <input type="date" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Heure *</label>
                  <input type="time" className="form-input" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Type de séance</label>
                  <select className="form-input">
                    <option>Séance G5</option>
                    <option>Découverte</option>
                    <option>Bilan initial</option>
                    <option>Bilan final</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Durée (min)</label>
                  <select className="form-input">
                    <option>30</option>
                    <option selected>45</option>
                    <option>60</option>
                  </select>
                </div>
              </div>
              {currentUser.isDirector && (
                <div className="form-group">
                  <label className="form-label">Praticienne</label>
                  <select className="form-input">
                    {employees.filter(e => !e.isDirector).map(emp => (
                      <option key={emp.id} value={emp.id}>{emp.nom}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(null)}>Annuler</button>
              <button className="btn btn-primary" onClick={() => {
                // Notifier l'employée du nouveau RDV
                addNotification({
                  type: 'schedule',
                  message: 'Nouveau RDV ajouté à votre planning',
                  forEmployee: 2 // À remplacer par l'employée sélectionnée
                });
                setShowModal(null);
              }}><Calendar size={18} /> Créer le RDV</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Nouvelle Employée */}
      {showModal === 'newEmployee' && (
        <div className="modal-overlay" onClick={() => setShowModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Nouvelle praticienne</h3>
              <button className="btn btn-ghost" onClick={() => setShowModal(null)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nom complet *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Prénom Nom"
                    value={newEmployeeForm.nom}
                    onChange={(e) => setNewEmployeeForm(prev => ({ ...prev, nom: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Téléphone</label>
                  <input 
                    type="tel" 
                    className="form-input" 
                    placeholder="06 XX XX XX XX"
                    value={newEmployeeForm.telephone}
                    onChange={(e) => setNewEmployeeForm(prev => ({ ...prev, telephone: e.target.value }))}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="email@slimtouch.fr"
                  value={newEmployeeForm.email}
                  onChange={(e) => setNewEmployeeForm(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Mot de passe temporaire *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="motdepasse123"
                  value={newEmployeeForm.password}
                  onChange={(e) => setNewEmployeeForm(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Date d'embauche</label>
                <input 
                  type="date" 
                  className="form-input"
                  value={newEmployeeForm.dateEmbauche}
                  onChange={(e) => setNewEmployeeForm(prev => ({ ...prev, dateEmbauche: e.target.value }))}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(null)}>Annuler</button>
              <button className="btn btn-primary" onClick={handleCreateEmployee}>
                <UserPlus size={18} /> Créer le compte
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Assigner Clientes */}
      {showModal?.type === 'assignClients' && (
        <div className="modal-overlay" onClick={() => setShowModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Gérer les clientes de {showModal.employee.nom}</h3>
              <button className="btn btn-ghost" onClick={() => setShowModal(null)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Cochez les clientes à assigner à cette praticienne. Les RDV futurs seront automatiquement réassignés.
              </p>
              <div style={{ 
                display: 'flex', 
                gap: '1rem', 
                padding: '0.75rem', 
                background: EMPLOYEE_COLORS[showModal.employee.id]?.bg, 
                borderRadius: '8px', 
                marginBottom: '1.5rem',
                border: `1px solid ${EMPLOYEE_COLORS[showModal.employee.id]?.border}`
              }}>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: '700', color: EMPLOYEE_COLORS[showModal.employee.id]?.text }}>
                    {clients.filter(c => c.assignedTo === showModal.employee.id).length}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>clientes assignées</div>
                </div>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: '700', color: EMPLOYEE_COLORS[showModal.employee.id]?.text }}>
                    {rdvs.filter(r => r.employeeId === showModal.employee.id && r.date >= new Date().toISOString().split('T')[0]).length}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>RDV à venir</div>
                </div>
              </div>
              {clients.map(client => {
                const isAssigned = client.assignedTo === showModal.employee.id;
                const futureRdvs = rdvs.filter(r => r.clientId === client.id && r.date >= new Date().toISOString().split('T')[0]).length;
                return (
                  <div key={client.id} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '14px', 
                    padding: '12px',
                    background: isAssigned ? EMPLOYEE_COLORS[showModal.employee.id]?.bg : 'var(--bg)',
                    border: isAssigned ? `1px solid ${EMPLOYEE_COLORS[showModal.employee.id]?.border}` : '1px solid var(--border)',
                    borderRadius: '12px',
                    marginBottom: '10px',
                    transition: 'all 0.2s'
                  }}>
                    <input 
                      type="checkbox" 
                      checked={isAssigned}
                      onChange={() => {
                        const newEmployeeId = isAssigned ? null : showModal.employee.id;
                        reassignClient(client.id, newEmployeeId);
                      }}
                      style={{ width: '20px', height: '20px', accentColor: 'var(--accent)' }}
                    />
                    <div className="client-avatar" style={{ width: '40px', height: '40px', fontSize: '1rem' }}>
                      {client.nom.charAt(0)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <strong>{client.nom}</strong>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {FORFAITS[client.forfait]?.icon} {client.forfait}
                        {futureRdvs > 0 && <span style={{ marginLeft: '8px', color: 'var(--accent)' }}>• {futureRdvs} RDV</span>}
                      </div>
                    </div>
                    <span className={`badge ${client.statut === 'active' ? 'badge-success' : client.statut === 'prospect' ? 'badge-info' : 'badge-gold'}`}>
                      {client.statut}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(null)}>Fermer</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal Ajouter/Modifier Suivi */}
      {showSuiviModal && (
        <div className="modal-overlay" onClick={() => { setShowSuiviModal(false); setEditingSuivi(null); }}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editingSuivi ? 'Modifier le suivi' : 'Ajouter un suivi de séance'}</h3>
              <button className="btn btn-ghost" onClick={() => { setShowSuiviModal(false); setEditingSuivi(null); }}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input 
                    type="date" 
                    className="form-input" 
                    value={suiviForm.date}
                    onChange={(e) => setSuiviForm(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Durée (min)</label>
                  <select 
                    className="form-input"
                    value={suiviForm.duree}
                    onChange={(e) => setSuiviForm(prev => ({ ...prev, duree: e.target.value }))}
                  >
                    <option value="30">30</option>
                    <option value="45">45</option>
                    <option value="60">60</option>
                    <option value="90">90</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Notes de séance *</label>
                <textarea 
                  className="form-input" 
                  rows="4"
                  placeholder="Décrivez la séance, les zones travaillées, le ressenti de la cliente..."
                  value={suiviForm.note}
                  onChange={(e) => setSuiviForm(prev => ({ ...prev, note: e.target.value }))}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => { setShowSuiviModal(false); setEditingSuivi(null); }}>Annuler</button>
              <button className="btn btn-primary" onClick={editingSuivi ? handleUpdateSuivi : handleAddSuivi}>
                <Save size={18} /> Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal Ajouter Mensuration */}
      {showMesureModal && (
        <div className="modal-overlay" onClick={() => setShowMesureModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Ajouter une mensuration</h3>
              <button className="btn btn-ghost" onClick={() => setShowMesureModal(false)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Date</label>
                <input 
                  type="date" 
                  className="form-input" 
                  value={mesureForm.date}
                  onChange={(e) => setMesureForm(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Tour de taille (cm)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    placeholder="88"
                    value={mesureForm.tour_taille}
                    onChange={(e) => setMesureForm(prev => ({ ...prev, tour_taille: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Tour de hanches (cm)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    placeholder="105"
                    value={mesureForm.tour_hanches}
                    onChange={(e) => setMesureForm(prev => ({ ...prev, tour_hanches: e.target.value }))}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Tour de cuisses (cm)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  placeholder="60"
                  value={mesureForm.tour_cuisses}
                  onChange={(e) => setMesureForm(prev => ({ ...prev, tour_cuisses: e.target.value }))}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowMesureModal(false)}>Annuler</button>
              <button className="btn btn-primary" onClick={handleAddMesure}>
                <Save size={18} /> Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal Ajouter Photo */}
      {showPhotoModal && (
        <div className="modal-overlay" onClick={() => setShowPhotoModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Photo {showPhotoModal.toUpperCase()}</h3>
              <button className="btn btn-ghost" onClick={() => setShowPhotoModal(null)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div 
                style={{
                  border: '2px dashed var(--border)',
                  borderRadius: '16px',
                  padding: '3rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: 'var(--bg)'
                }}
                onClick={() => handleAddPhoto(showPhotoModal)}
              >
                <Upload size={48} style={{ color: 'var(--accent)', marginBottom: '1rem' }} />
                <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Cliquez pour ajouter une photo</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>ou glissez-déposez une image</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowPhotoModal(null)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal Nouveau RDV */}
      {showRdvModal && selectedClient && (
        <div className="modal-overlay" onClick={() => setShowRdvModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Nouveau RDV pour {selectedClient.nom}</h3>
              <button className="btn btn-ghost" onClick={() => setShowRdvModal(false)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Date *</label>
                  <input 
                    type="date" 
                    className="form-input" 
                    value={rdvForm.date}
                    onChange={(e) => setRdvForm(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Heure *</label>
                  <input 
                    type="time" 
                    className="form-input" 
                    value={rdvForm.heure}
                    onChange={(e) => setRdvForm(prev => ({ ...prev, heure: e.target.value }))}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select 
                    className="form-input"
                    value={rdvForm.type}
                    onChange={(e) => setRdvForm(prev => ({ ...prev, type: e.target.value }))}
                  >
                    <option value="Séance G5">Séance G5</option>
                    <option value="Découverte">Séance découverte</option>
                    <option value="Bilan">Bilan / Mesures</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Durée</label>
                  <select 
                    className="form-input"
                    value={rdvForm.duree}
                    onChange={(e) => setRdvForm(prev => ({ ...prev, duree: e.target.value }))}
                  >
                    <option value="30">30 min</option>
                    <option value="45">45 min</option>
                    <option value="60">60 min</option>
                  </select>
                </div>
              </div>
              <div style={{ background: 'var(--bg)', padding: '1rem', borderRadius: '12px', marginTop: '1rem' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  <strong style={{ color: 'var(--accent)' }}>{FORFAITS[selectedClient.forfait]?.icon} {selectedClient.forfait}</strong><br />
                  Séances effectuées : {getSeancesEffectuees(selectedClient.id)} / {selectedClient.seancesTotal}
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowRdvModal(false)}>Annuler</button>
              <button className="btn btn-primary" onClick={handleCreateRdv}>
                <Save size={18} /> Créer le RDV
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal RDV depuis Planning (création/modification) */}
      {showPlanningRdvModal && (
        <div className="modal-overlay" onClick={() => { setShowPlanningRdvModal(false); setEditingRdv(null); }}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editingRdv ? 'Modifier le RDV' : 'Nouveau rendez-vous'}</h3>
              <button className="btn btn-ghost" onClick={() => { setShowPlanningRdvModal(false); setEditingRdv(null); }}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Cliente *</label>
                <select 
                  className="form-input"
                  value={planningRdvForm.clientId}
                  onChange={(e) => setPlanningRdvForm(prev => ({ ...prev, clientId: e.target.value }))}
                >
                  <option value="">Sélectionner une cliente</option>
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.nom} - {FORFAITS[c.forfait]?.icon} {c.forfait}</option>
                  ))}
                </select>
              </div>
              {currentUser.isDirector && (
                <div className="form-group">
                  <label className="form-label">Praticienne *</label>
                  <select 
                    className="form-input"
                    value={planningRdvForm.employeeId}
                    onChange={(e) => setPlanningRdvForm(prev => ({ ...prev, employeeId: e.target.value }))}
                  >
                    <option value="">Sélectionner une praticienne</option>
                    {employees.filter(e => !e.isDirector).map(emp => (
                      <option key={emp.id} value={emp.id}>{emp.nom}</option>
                    ))}
                  </select>
                </div>
              )}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Date *</label>
                  <input 
                    type="date" 
                    className="form-input" 
                    value={planningRdvForm.date}
                    onChange={(e) => setPlanningRdvForm(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Heure *</label>
                  <input 
                    type="time" 
                    className="form-input" 
                    value={planningRdvForm.heure}
                    onChange={(e) => setPlanningRdvForm(prev => ({ ...prev, heure: e.target.value }))}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Type de séance</label>
                  <select 
                    className="form-input"
                    value={planningRdvForm.type}
                    onChange={(e) => setPlanningRdvForm(prev => ({ ...prev, type: e.target.value }))}
                  >
                    <option value="Séance G5">Séance G5</option>
                    <option value="Découverte">Séance découverte</option>
                    <option value="Bilan">Bilan / Mesures</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Durée</label>
                  <select 
                    className="form-input"
                    value={planningRdvForm.duree}
                    onChange={(e) => setPlanningRdvForm(prev => ({ ...prev, duree: e.target.value }))}
                  >
                    <option value="30">30 min</option>
                    <option value="45">45 min</option>
                    <option value="60">60 min</option>
                  </select>
                </div>
              </div>
              {planningRdvForm.clientId && (
                <div style={{ background: 'var(--bg)', padding: '1rem', borderRadius: '12px', marginTop: '1rem' }}>
                  {(() => {
                    const client = clients.find(c => c.id === parseInt(planningRdvForm.clientId));
                    if (!client) return null;
                    return (
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <strong style={{ color: 'var(--accent)' }}>{FORFAITS[client.forfait]?.icon} {client.forfait}</strong> - {FORFAITS[client.forfait]?.prix}€<br />
                        Séances : {getSeancesEffectuees(client.id)} / {client.seancesTotal}
                      </p>
                    );
                  })()}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => { setShowPlanningRdvModal(false); setEditingRdv(null); }}>Annuler</button>
              <button className="btn btn-primary" onClick={editingRdv ? handleUpdateRdv : handleCreatePlanningRdv}>
                <Save size={18} /> {editingRdv ? 'Enregistrer' : 'Créer le RDV'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal Paiement 3x sans frais */}
      {showModal === 'newPaiement3x' && (
        <div className="modal-overlay" onClick={() => setShowModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title"><Repeat size={20} /> Paiement en 3x sans frais</h3>
              <button className="btn btn-ghost" onClick={() => setShowModal(null)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div style={{ 
                background: 'rgba(59, 130, 246, 0.1)', 
                border: '1px solid #3b82f6', 
                borderRadius: '12px', 
                padding: '1rem', 
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                <Repeat size={24} style={{ color: '#3b82f6', marginBottom: '0.5rem' }} />
                <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Facilités de paiement</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Le montant sera divisé en 3 échéances mensuelles égales
                </p>
              </div>
              
              <div className="form-group">
                <label className="form-label">Cliente *</label>
                <select 
                  className="form-input"
                  value={paiement3xForm.clientId}
                  onChange={(e) => {
                    const client = clients.find(c => c.id === parseInt(e.target.value));
                    const forfait = FORFAITS[client?.forfait];
                    setPaiement3xForm(prev => ({ 
                      ...prev, 
                      clientId: e.target.value,
                      montantTotal: forfait?.prix || '',
                      employeeId: client?.assignedTo || ''
                    }));
                  }}
                >
                  <option value="">Sélectionner une cliente</option>
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.nom} - {c.forfait}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Montant total *</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    placeholder="690"
                    value={paiement3xForm.montantTotal}
                    onChange={(e) => setPaiement3xForm(prev => ({ ...prev, montantTotal: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Méthode de paiement</label>
                  <select 
                    className="form-input"
                    value={paiement3xForm.methode}
                    onChange={(e) => setPaiement3xForm(prev => ({ ...prev, methode: e.target.value }))}
                  >
                    <option value="CB">Carte bancaire</option>
                    <option value="Virement">Virement</option>
                    <option value="Chèque">Chèque</option>
                  </select>
                </div>
              </div>
              
              {paiement3xForm.montantTotal && (
                <div style={{ 
                  background: 'var(--bg)', 
                  border: '1px solid var(--border)', 
                  borderRadius: '12px', 
                  padding: '1.25rem',
                  marginTop: '1rem'
                }}>
                  <h4 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>📅 Échéancier prévu</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {[0, 1, 2].map(i => {
                      const montant = Math.round((parseFloat(paiement3xForm.montantTotal) / 3) * 100) / 100;
                      const date = new Date();
                      date.setMonth(date.getMonth() + i);
                      return (
                        <div key={i} style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          padding: '0.75rem',
                          background: i === 0 ? 'rgba(34, 197, 94, 0.1)' : 'transparent',
                          borderRadius: '8px',
                          border: i === 0 ? '1px solid var(--success)' : '1px solid var(--border)'
                        }}>
                          <div>
                            <span style={{ fontWeight: '600' }}>Échéance {i + 1}</span>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                              {date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <strong style={{ color: i === 0 ? 'var(--success)' : 'var(--text)' }}>
                              {i === 2 
                                ? (parseFloat(paiement3xForm.montantTotal) - (montant * 2)).toFixed(2) 
                                : montant.toFixed(2)}€
                            </strong>
                            {i === 0 && <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>À encaisser</div>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ 
                    marginTop: '1rem', 
                    paddingTop: '1rem', 
                    borderTop: '1px solid var(--border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontWeight: '700'
                  }}>
                    <span>Total</span>
                    <span style={{ color: 'var(--accent)' }}>{paiement3xForm.montantTotal}€</span>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(null)}>Annuler</button>
              <button className="btn btn-primary" onClick={() => {
                if (!paiement3xForm.clientId || !paiement3xForm.montantTotal) {
                  alert('Veuillez sélectionner une cliente et entrer un montant');
                  return;
                }
                createEchelonnement(
                  parseInt(paiement3xForm.clientId), 
                  parseFloat(paiement3xForm.montantTotal), 
                  paiement3xForm.methode,
                  parseInt(paiement3xForm.employeeId) || currentUser?.id
                );
                setShowModal(null);
                setPaiement3xForm({ clientId: '', montantTotal: '', methode: 'CB', employeeId: '' });
              }}>
                <Repeat size={18} /> Créer l'échéancier
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal Nouveau Paiement */}
      {showPaiementModal && (
        <div className="modal-overlay" onClick={() => setShowPaiementModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Enregistrer un paiement</h3>
              <button className="btn btn-ghost" onClick={() => setShowPaiementModal(false)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Cliente *</label>
                <select 
                  className="form-input"
                  value={paiementForm.clientId}
                  onChange={(e) => {
                    const client = clients.find(c => c.id === parseInt(e.target.value));
                    setPaiementForm(prev => ({ 
                      ...prev, 
                      clientId: e.target.value,
                      montant: client ? FORFAITS[client.forfait]?.prix.toString() : ''
                    }));
                  }}
                >
                  <option value="">Sélectionner une cliente</option>
                  {clients.filter(c => c.statut !== 'terminé').map(c => (
                    <option key={c.id} value={c.id}>
                      {c.nom} - {FORFAITS[c.forfait]?.icon} {c.forfait} ({FORFAITS[c.forfait]?.prix}€)
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Montant (€) *</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    placeholder="690"
                    value={paiementForm.montant}
                    onChange={(e) => setPaiementForm(prev => ({ ...prev, montant: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Méthode</label>
                  <select 
                    className="form-input"
                    value={paiementForm.methode}
                    onChange={(e) => setPaiementForm(prev => ({ ...prev, methode: e.target.value }))}
                  >
                    <option value="CB">Carte bancaire</option>
                    <option value="Espèces">Espèces</option>
                    <option value="Virement">Virement</option>
                    <option value="Chèque">Chèque</option>
                  </select>
                </div>
              </div>
              {paiementForm.clientId && (
                <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '1rem', borderRadius: '12px', marginTop: '1rem', border: '1px solid var(--success)' }}>
                  {(() => {
                    const client = clients.find(c => c.id === parseInt(paiementForm.clientId));
                    if (!client) return null;
                    const forfait = FORFAITS[client.forfait];
                    return (
                      <div>
                        <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                          <strong>{forfait?.icon} {client.forfait}</strong>
                        </p>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          {forfait?.seances} séances • {forfait?.resultat}
                        </p>
                        <p style={{ fontSize: '1.1rem', color: 'var(--success)', fontWeight: '600', marginTop: '0.5rem' }}>
                          Prix : <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{forfait?.prixBarre}€</span> → {forfait?.prix}€
                        </p>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowPaiementModal(false)}>Annuler</button>
              <button className="btn btn-primary" onClick={() => {
                if (!paiementForm.clientId || !paiementForm.montant) {
                  alert('Veuillez sélectionner une cliente et entrer un montant');
                  return;
                }
                addPayment(parseInt(paiementForm.clientId), paiementForm.montant, paiementForm.methode);
                setShowPaiementModal(false);
                setPaiementForm({ clientId: '', montant: '', methode: 'CB' });
              }}>
                <Save size={18} /> Enregistrer le paiement
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal Export Transformation */}
      {showExportModal && (
        <div className="modal-overlay" onClick={() => setShowExportModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3 className="modal-title"><Share2 size={20} /> Exporter la transformation</h3>
              <button className="btn btn-ghost" onClick={() => setShowExportModal(null)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              {/* Aperçu des résultats */}
              <div style={{ 
                background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.15), rgba(201, 169, 98, 0.05))', 
                border: '1px solid var(--accent)',
                borderRadius: '16px',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem', fontFamily: 'Playfair Display, serif' }}>
                  ✨ Transformation de {showExportModal.nom.split(' ')[0]}
                </h4>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{showExportModal.forfait}</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--success)' }}>
                      -{showExportModal.poidsInitial - showExportModal.poidsActuel} kg
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Poids perdu</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--accent)' }}>
                      {(() => {
                        const data = generateExportData(showExportModal);
                        return `-${data.totalCmPerdus} cm`;
                      })()}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Centimètres</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text)' }}>
                      {getSeancesEffectuees(showExportModal.id)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Séances</div>
                  </div>
                </div>
              </div>
              
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', textAlign: 'center' }}>
                Partagez ces résultats avec vos prospects pour les convaincre !
              </p>
              
              {/* Options d'export */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button 
                  className="btn" 
                  style={{ 
                    background: '#25D366', 
                    color: 'white', 
                    padding: '1rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    fontSize: '1rem'
                  }}
                  onClick={() => shareViaWhatsApp(showExportModal)}
                >
                  <Smartphone size={22} /> Partager sur WhatsApp
                </button>
                
                <button 
                  className="btn"
                  style={{ 
                    background: 'var(--bg)', 
                    border: '1px solid var(--border)',
                    padding: '1rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    fontSize: '1rem'
                  }}
                  onClick={() => shareViaSMS(showExportModal)}
                >
                  <MessageCircle size={22} /> Envoyer par SMS
                </button>
                
                <button 
                  className="btn"
                  style={{ 
                    background: 'rgba(239, 68, 68, 0.1)', 
                    border: '1px solid #ef4444',
                    color: '#ef4444',
                    padding: '1rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    fontSize: '1rem'
                  }}
                  onClick={() => exportToPDF(showExportModal)}
                >
                  <FileText size={22} /> Générer PDF (imprimer)
                </button>
                
                <button 
                  className="btn btn-secondary"
                  style={{ 
                    padding: '1rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    fontSize: '1rem'
                  }}
                  onClick={() => copyShareText(showExportModal)}
                >
                  <ExternalLink size={22} /> Copier le texte
                </button>
              </div>
              
              {/* Aperçu du texte */}
              <div style={{ marginTop: '1.5rem' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Aperçu du message :</p>
                <div style={{ 
                  background: 'var(--bg)', 
                  border: '1px solid var(--border)', 
                  borderRadius: '12px', 
                  padding: '1rem',
                  fontSize: '0.85rem',
                  whiteSpace: 'pre-line',
                  maxHeight: '150px',
                  overflowY: 'auto'
                }}>
                  {generateShareText(showExportModal)}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowExportModal(null)}>Fermer</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal Détail Confirmation RDV */}
      {showRdvConfirmModal && (
        <div className="modal-overlay" onClick={() => setShowRdvConfirmModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '550px' }}>
            <div className="modal-header">
              <h3 className="modal-title"><CalendarCheck size={20} /> Confirmation RDV</h3>
              <button className="btn btn-ghost" onClick={() => setShowRdvConfirmModal(null)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              {(() => {
                const rdv = showRdvConfirmModal;
                const client = clients.find(c => c.id === rdv.clientId);
                const emp = employees.find(e => e.id === rdv.employeeId);
                const history = getRdvConfirmationHistory(rdv.id);
                const status = getRdvConfirmationStatus(rdv.id);
                const statusInfo = RDV_STATUS[status] || RDV_STATUS.pending;
                
                return (
                  <>
                    {/* Infos RDV */}
                    <div style={{ 
                      display: 'flex', 
                      gap: '1rem', 
                      alignItems: 'center',
                      padding: '1rem',
                      background: 'var(--bg)',
                      borderRadius: '12px',
                      marginBottom: '1.5rem'
                    }}>
                      <div className="client-avatar" style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}>
                        {client?.nom.charAt(0)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ marginBottom: '0.25rem' }}>{client?.nom}</h4>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                          📅 {new Date(rdv.date).toLocaleDateString('fr-FR', { weekday: 'long', day: '2-digit', month: 'long' })}
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                          🕐 {rdv.heure} • 👤 {emp?.nom.split(' ')[0]}
                        </div>
                      </div>
                      <span className="badge" style={{ 
                        background: `${statusInfo.color}20`, 
                        color: statusInfo.color,
                        border: `1px solid ${statusInfo.color}`,
                        padding: '8px 16px'
                      }}>
                        {statusInfo.icon} {statusInfo.label}
                      </span>
                    </div>
                    
                    {/* Actions */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                      <button 
                        className="btn btn-secondary"
                        onClick={() => {
                          sendRappel(rdv.id, 'sms', 'rappel_j1');
                        }}
                      >
                        <Smartphone size={16} /> Rappel SMS
                      </button>
                      <button 
                        className="btn btn-secondary"
                        onClick={() => {
                          sendRappel(rdv.id, 'email', 'rappel_j1');
                        }}
                      >
                        <Mail size={16} /> Rappel Email
                      </button>
                      <button 
                        className="btn"
                        style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid var(--success)', color: 'var(--success)' }}
                        onClick={() => {
                          setRdvs(prev => prev.map(r => r.id === rdv.id ? { ...r, statut: 'confirmé' } : r));
                          setShowRdvConfirmModal(null);
                        }}
                      >
                        <CheckCircle size={16} /> Confirmer
                      </button>
                      <button 
                        className="btn"
                        style={{ background: 'rgba(248, 113, 113, 0.1)', border: '1px solid var(--danger)', color: 'var(--danger)' }}
                        onClick={() => {
                          cancelRdv(rdv.id, 'Annulé par la cliente');
                          setShowRdvConfirmModal(null);
                        }}
                      >
                        <XCircle size={16} /> Annuler
                      </button>
                    </div>
                    
                    {/* Reporter */}
                    <div style={{ 
                      padding: '1rem', 
                      background: 'rgba(251, 191, 36, 0.1)', 
                      border: '1px solid var(--warning)',
                      borderRadius: '12px',
                      marginBottom: '1.5rem'
                    }}>
                      <div style={{ fontWeight: '600', marginBottom: '0.75rem', color: 'var(--warning)' }}>
                        <RefreshCw size={16} style={{ display: 'inline', marginRight: '6px' }} />
                        Reporter le RDV
                      </div>
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <input 
                          type="date" 
                          className="form-input" 
                          style={{ flex: 1 }}
                          id="reschedule-date"
                          defaultValue={rdv.date}
                        />
                        <input 
                          type="time" 
                          className="form-input" 
                          style={{ width: '120px' }}
                          id="reschedule-time"
                          defaultValue={rdv.heure}
                        />
                        <button 
                          className="btn btn-secondary"
                          onClick={() => {
                            const newDate = document.getElementById('reschedule-date').value;
                            const newTime = document.getElementById('reschedule-time').value;
                            if (newDate && newTime) {
                              rescheduleRdv(rdv.id, newDate, newTime);
                              setShowRdvConfirmModal(null);
                            }
                          }}
                        >
                          Reporter
                        </button>
                      </div>
                    </div>
                    
                    {/* Simulation réponse cliente */}
                    <div style={{ 
                      padding: '1rem', 
                      background: 'rgba(139, 92, 246, 0.1)', 
                      border: '1px solid #8b5cf6',
                      borderRadius: '12px',
                      marginBottom: '1.5rem'
                    }}>
                      <div style={{ fontWeight: '600', marginBottom: '0.75rem', color: '#8b5cf6' }}>
                        🎭 Simuler réponse cliente
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <button 
                          className="btn btn-sm"
                          style={{ background: 'rgba(34, 197, 94, 0.2)', border: '1px solid var(--success)', color: 'var(--success)' }}
                          onClick={() => {
                            const lastConf = rdvConfirmations.filter(c => c.rdvId === rdv.id).sort((a,b) => new Date(b.date) - new Date(a.date))[0];
                            if (lastConf) {
                              simulateClientResponse(lastConf.id, 'OUI, je confirme !', 'confirmed');
                              setRdvs(prev => prev.map(r => r.id === rdv.id ? { ...r, statut: 'confirmé' } : r));
                            } else {
                              setRdvs(prev => prev.map(r => r.id === rdv.id ? { ...r, statut: 'confirmé' } : r));
                              addNotification({ type: 'success', message: `${client?.nom.split(' ')[0]} a confirmé son RDV`, forEmployee: null });
                            }
                          }}
                        >
                          ✓ Confirme
                        </button>
                        <button 
                          className="btn btn-sm"
                          style={{ background: 'rgba(248, 113, 113, 0.2)', border: '1px solid var(--danger)', color: 'var(--danger)' }}
                          onClick={() => {
                            const lastConf = rdvConfirmations.filter(c => c.rdvId === rdv.id).sort((a,b) => new Date(b.date) - new Date(a.date))[0];
                            if (lastConf) {
                              simulateClientResponse(lastConf.id, 'Je dois annuler, désolée', 'cancelled');
                            }
                            cancelRdv(rdv.id, 'Annulé par la cliente');
                          }}
                        >
                          ✗ Annule
                        </button>
                        <button 
                          className="btn btn-sm"
                          style={{ background: 'rgba(251, 191, 36, 0.2)', border: '1px solid var(--warning)', color: 'var(--warning)' }}
                          onClick={() => {
                            const lastConf = rdvConfirmations.filter(c => c.rdvId === rdv.id).sort((a,b) => new Date(b.date) - new Date(a.date))[0];
                            if (lastConf) {
                              simulateClientResponse(lastConf.id, 'Pouvez-vous reporter à la semaine prochaine ?', 'rescheduled');
                            }
                          }}
                        >
                          ↻ Demande report
                        </button>
                        <button 
                          className="btn btn-sm"
                          style={{ background: 'rgba(249, 115, 22, 0.2)', border: '1px solid #f97316', color: '#f97316' }}
                          onClick={() => {
                            const lastConf = rdvConfirmations.filter(c => c.rdvId === rdv.id).sort((a,b) => new Date(b.date) - new Date(a.date))[0];
                            if (lastConf) {
                              simulateClientResponse(lastConf.id, null, 'no_response');
                            }
                          }}
                        >
                          ? Sans réponse
                        </button>
                      </div>
                    </div>
                    
                    {/* Historique */}
                    {history.length > 0 && (
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                          <History size={16} style={{ display: 'inline', marginRight: '6px' }} />
                          Historique des communications
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '200px', overflowY: 'auto' }}>
                          {history.map(conf => {
                            const confStatus = RDV_STATUS[conf.status] || RDV_STATUS.pending;
                            return (
                              <div key={conf.id} style={{ 
                                padding: '0.75rem',
                                background: 'var(--bg)',
                                borderRadius: '8px',
                                borderLeft: `3px solid ${confStatus.color}`
                              }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                                  <span>{conf.type.toUpperCase()} - {conf.action.replace('_', ' ')}</span>
                                  <span style={{ color: 'var(--text-muted)' }}>
                                    {new Date(conf.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                                {conf.response && (
                                  <div style={{ 
                                    marginTop: '0.5rem', 
                                    fontSize: '0.85rem',
                                    fontStyle: 'italic',
                                    color: 'var(--text-muted)'
                                  }}>
                                    Réponse : "{conf.response}"
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowRdvConfirmModal(null)}>Fermer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
