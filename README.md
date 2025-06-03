# 🗳️ Vot3 – Application de vote Web3

**Vot3** est une application de vote décentralisée construite avec **Vue 3**, **TypeScript**, **Pinia**, **Vite**, et **Solidity**.  
Elle permet à des utilisateurs connectés via **MetaMask** de voter **Oui / Non** à des débats, ou d’en créer de nouveaux.

> ⚠️ **ALERTE IMPORTANT** : L’application est conçue **mobile first**. Veuillez tester en priorité sur **smartphone** ou en mode responsive.

🔗 Démo en ligne : [vot3-9e2s.vercel.app](https://vot3-9e2s.vercel.app/)

---

## ⚙️ Fonctionnalités

- 🧠 Liste des débats en cours
- 📊 Affichage des résultats des débats clôturés
- 🗳️ Création de nouveaux débats avec date de clôture et catégorie
- 🦊 Connexion MetaMask obligatoire pour voter ou créer
- 🔐 Interaction avec un smart contract Solidity via `ethers.js`

---

## 📁 Stack

- **Frontend** : Vue 3 + Vite + TypeScript + Pinia
- **Smart Contract** : Solidity (interface via ABI JSON)
- **Web3** : ethers.js + MetaMask
