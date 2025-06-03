<template>
  <div id="app">
    <router-view />

    <nav class="bottom-nav">
      <router-link to="/" class="nav-item" active-class="active">
        <div class="nav-icon">🏠</div>
        <div class="nav-label">Accueil</div>
      </router-link>
      <router-link to="/create" class="nav-item" active-class="active">
        <div class="nav-icon">➕</div>
        <div class="nav-label">Créer</div>
      </router-link>
      <router-link to="/results" class="nav-item" active-class="active">
        <div class="nav-icon">📊</div>
        <div class="nav-label">Résultats</div>
      </router-link>
    </nav>
  </div>
</template>