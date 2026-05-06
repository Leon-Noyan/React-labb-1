# Todo App med React och TypeScript

Applikationen låter användaren skapa, redigera och ta bort egna todo tasks. Användaren kan även söka genom sina tasks för att navigera bland sina dagliga uppgifter.

## Funktioner

**Visa todo lista:** Hämtar alla tasks och listar dem från ett Api.
**Skapa ny task:** Låter användaren skapa en ny task.
**Redigera:** Ändra texten för en task samt markera den som slutförd och ej slutförd.
**Radera:** Ta bort en task.
**Sök:** Sök och filtrera bland todos/ tasks.
**Responsivitet:** Anpassad för desktop och mobil.

## Teknisk stack

**Frameworks:** React
**Språk:** TypeScript
**Styling:** CSS
**API:** Mock API: https://mockapi.io/

## API

Applikationen använder en API för att göra följande:
**GET:** Hämtar alla tasks från REST-API
**POST:** Används för att skapa en ny task
**PUT:** Används för att redigera en todo samt uppdatera dens status (slutförd/ej slutförd).
**DELETE:** Används för att ta bort en task via ID.
