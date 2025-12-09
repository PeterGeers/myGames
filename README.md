# 🎮 Kids Quiz Game

Een speels, veilig en toegankelijk webspel in React (TypeScript) gericht op kinderen van 8–12 jaar.

## 📋 Overzicht

Dit is een interactief quiz-spel met vier thema's:
- ⚽ **Voetbal** - Spelers, acties en stadionmomenten
- 🏑 **Hockey** - Stick, slagen en toernooien  
- 🎵 **Muziek & Musical** - Instrumenten, liedjes en musicaltermen
- 🏕️ **Scouting** - Natuur, knopen en kampvuurliedjes

## ✨ Kenmerken

- **Multiple-choice vragen** met 4 antwoordopties
- **Timer systeem** - 40 seconden per vraag
- **Levens systeem** - 3 levens per spel
- **Score tracking** met lokale high score opslag
- **Progressieve moeilijkheid** - Easy → Medium → Hard
- **Responsive design** - Mobiel eerst
- **Toegankelijk** - Toetsenbord navigatie, ARIA labels
- **Bewerkbare vragen** - Externe JSON configuratie

## 🚀 Installatie & Gebruik

### Installeren
```bash
cd myGames
npm install
```

### Starten
```bash
npm start
```

Het spel opent automatisch in je browser op `http://localhost:3000`

### Bouwen voor productie
```bash
npm run build
```

## 📁 Project Structuur

```
myGames/
├── public/
│   ├── index.html          # HTML template
│   └── questions.json      # Bewerkbare vragenbank
├── src/
│   ├── App.tsx            # Hoofd component met game logica
│   ├── App.css            # Styling en animaties
│   ├── types.ts           # TypeScript type definities
│   ├── themes.ts          # Theme loader functies
│   └── index.tsx          # React entry point
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript configuratie
└── README.md             # Deze file
```

## 🎨 Kleurenpalet

- **Primair**: #FF6F61 (warm koraal)
- **Secundair**: #4A90E2 (helder blauw)
- **Accent geel**: #FFD166 (warm geel)
- **Accent groen**: #6EE7B7 (mint groen)
- **Achtergrond**: #FDF6E3 (zacht crème)

## 📝 Vragen Bewerken

### Via de Editor in het spel:
1. Speel het spel tot het einde
2. Klik op "⚙️ Vragen bewerken"
3. Download `questions.json`
4. Bewerk het bestand in een teksteditor
5. Vervang het bestand in de `public` map
6. Herlaad de pagina

### JSON Structuur:
```json
{
  "id": "thema-id",
  "title": "Thema Naam",
  "description": "Beschrijving van het thema",
  "questions": [
    {
      "id": "v1",
      "difficulty": "easy",
      "prompt": "Vraag tekst?",
      "answer": "correct antwoord",
      "type": "multiple-choice",
      "choices": ["optie1", "optie2", "optie3", "optie4"]
    }
  ]
}
```

## 🎯 Spelregels

1. **Kies een thema** of speel random
2. **Beantwoord vragen** binnen 40 seconden
3. **Verdien punten** - 10 punten per goed antwoord
4. **Let op je levens** - 3 levens, verlies er één bij fout antwoord
5. **Speel 3 rondes** met oplopende moeilijkheid
6. **Behaal de hoogste score!**

## 📊 Vragenbank

- **Voetbal**: 16 vragen (8 easy, 6 medium, 2 hard)
- **Hockey**: 12 vragen (7 easy, 4 medium, 1 hard)
- **Muziek & Musical**: 11 vragen (7 easy, 3 medium, 1 hard)
- **Scouting**: 12 vragen (8 easy, 3 medium, 1 hard)

**Totaal**: 51 vragen

## 🛠️ Technologie Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **CSS3** - Styling en animaties
- **LocalStorage** - High score opslag

## 🎮 Game Flow

```
Welkom Scherm
    ↓
Thema Selectie
    ↓
Ronde 1 (Easy) → Timer → Antwoord → Feedback
    ↓
Ronde 2 (Medium) → Timer → Antwoord → Feedback
    ↓
Ronde 3 (Hard) → Timer → Antwoord → Feedback
    ↓
Eindscherm met Score
    ↓
Speel Opnieuw / Vragen Bewerken
```

## 🔧 Aanpassingen

### Timer aanpassen
In `src/App.tsx`, regel 40:
```typescript
timeLeft: 40  // Verander naar gewenste seconden
```

### Aantal levens aanpassen
In `src/App.tsx`, regel 8:
```typescript
lives: 3  // Verander naar gewenst aantal
```

### Punten per vraag aanpassen
In `src/App.tsx`, regel 82:
```typescript
score: prev.score + 10  // Verander 10 naar gewenst aantal
```

## 📱 Browser Ondersteuning

- Chrome (laatste 2 versies)
- Firefox (laatste 2 versies)
- Safari (laatste 2 versies)
- Edge (laatste 2 versies)

## 🎓 Leerdoelen

- **Kennis vergroten** over verschillende thema's
- **Snelheid** - Denken onder tijdsdruk
- **Besluitvorming** - Kiezen uit meerdere opties
- **Concentratie** - Focus houden tijdens het spel

## 📄 Licentie

Dit project is gemaakt voor educatieve doeleinden.

## 🤝 Bijdragen

Voel je vrij om nieuwe vragen toe te voegen via `public/questions.json`!

---

**Veel plezier met spelen! 🎉**
