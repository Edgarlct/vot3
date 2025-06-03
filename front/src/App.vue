<template>
  <div>
    <nav>
      <a href="/">Accueil</a> |
      <a href="/results">Résultats</a> |
      <a href="/create">Créer</a>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
nav {
  padding: 1rem;
  font-size: 1rem;
}
a {
  margin-right: 1rem;
}
</style>
