# NEXT-JS-TESTING

## Preparation de l'environnement de dev/test

Dans un fichier .env et .env.test, il faut mettre la variable d'environnement suivante :

- Generation de secret avec openssl:

  ```bash
  openssl rand -base64 32
  ```

- Pour postgres:

  ```bash
  POSTGRES_URL="postgresql://postgres:postgres@localhost:5432/next-js-testing-<DEV ou TEST>"
  ```

- Gestion de session, on utilise openSSL pour générer une clé secrète:

```bash
SESSION_SECRET="EMe+UwMuib+8bhS8H1ehG4M1P9oE7jiGWootiM5CZrU="
```

- Gestion de l'authentification:

  ```bash
  SESSION_USE_JWT=true
  ```

- Pour pouvoir deployer:
  ```bash
  AUTH_TRUST_HOST=true
  ```

> Récapitulatif des variables d'environnement pour dev:
>
> ```bash
> POSTGRES_URL=postgresql://postgres:postgres@localhost:5432/next-js-testing-dev
> SESSION_SECRET=t9wpZYUcVVsdMkb8J+GrJxbYCOHy9mT44S7S0IqFcrg=
> AUTH_SECRET="C02ZbpYJNnxO2aabMZc3CMrFlNNX+S17LCpNvfVLSe4="
> SESSION_USE_JWT=true
> AUTH_TRUST_HOST=true
> ```

> Récapitulatif des variables d'environnement pour test:
>
> ```bash
> POSTGRES_URL=postgresql://postgres:postgres@localhost:5432/next-js-testing-test
> SESSION_SECRET=t9wpZYUcVVsdMkb8J+GrJxbYCOHy9mT44S7S0IqFcrg=
> AUTH_SECRET="C02ZbpYJNnxO2aabMZc3CMrFlNNX+S17LCpNvfVLSe4="
> SESSION_USE_JWT=true
> AUTH_TRUST_HOST=true
> ```

## Installation et lancement

- Installation des dépendances:

  ```bash
  pnpm install
  ```

- Lancement de l'application:
  ```bash
  pnpm dev
  ```

## Pour les tests

- Lancement des tests avec vitest:
  ```bash
  pnpm test
  ```
- Lancement des tests e2e avec affichage (reset db + build):
  ```bash
  pnpm e2e:test-clean
  ```
- Lancement des tests e2e avec affichage (sans reset db, ni build):
  ```bash
  pnpm e2e:test
  ```
- Lancement des tests e2e en CLI seulement (avec build):
  ```bash
  pnpm e2e:test-clean-ci
  ```
- Lancement des tests e2e en CLI seulement (sans reset db, ni build):
  ```bash
  pnpm e2e:test-ci
  ```
