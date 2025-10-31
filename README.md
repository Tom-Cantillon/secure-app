```markdown
# Instructions rapides — Lancement & identifiants

Voici les commandes à exécuter pour lancer l’application (dev / prod) et les identifiants déjà créés pour se connecter via l’interface.

## 1) Lancer l’environnement de développement (base + Adminer)
```bash
# Depuis la racine du dépôt
docker compose -f docker-compose.dev.yml up -d
```
- Adminer (dev) : http://localhost:8080  
- Connexion Adminer : serveur = db, utilisateur = secureapp, mot de passe = secureapp, base = secureapp

## 2) Lancer l’environnement de production (frontend + backend + db + Adminer)
```bash
# Depuis la racine du dépôt
docker compose -f docker-compose.prod.yml up --build -d
```
- Frontend (Nginx HTTPS) : https://localhost:8080  
- Adminer (prod) : http://localhost:8081 (serveur = db, user/password/db = secureapp si inchangé)

## 3) Identifiants (comptes déjà créés)
- Admin :
  - login : Tom
  - mot de passe : password
- Utilisateur :
  - login : Mathilde
  - mot de passe : password

```
