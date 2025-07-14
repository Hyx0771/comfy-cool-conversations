# Clobol Widget - Complete Package

## 📦 **Bestanden overzicht:**

### **Hoofdbestanden:**
- `widget-complete.html` - Volledig werkende widget
- `widget-api.js` - API voor integratie
- `widget-types.js` - TypeScript definities
- `widget-data.js` - FAQ data
- `widget-utils.js` - Utility functies
- `build-widget-standalone.js` - Build script

### **Implementatie opties:**

#### **1. Direct iframe embedden:**
```html
<iframe 
  src="https://clobol-aigento.netlify.app/widget-complete.html"
  width="100%"
  height="100%"
  style="border: none; background: transparent;"
  title="Clobol Widget"
  allow="microphone; camera"
></iframe>
```

#### **2. Script tag (met API):**
```html
<script src="https://clobol-aigento.netlify.app/widget-api.js"></script>
<script>
  const widget = new ClobolWidgetAPI();
  widget.init({
    theme: 'light',
    primaryColor: '#007BFF',
    title: 'Clobol Support'
  });
</script>
```

#### **3. Automatische initialisatie:**
```html
<script 
  src="https://clobol-aigento.netlify.app/widget-api.js"
  data-theme="light"
  data-position="bottom-right"
  data-primary-color="#007BFF"
  data-title="Clobol Support"
></script>
```

## 🎯 **Functionaliteiten:**

### **✅ Startscherm:**
- Welkomstbericht van Bolt
- Keuze tussen "Offerte" en "Vraag stellen"
- Motiverende tekst

### **✅ FAQ Flow:**
- 10 veelgestelde vragen
- Interactieve chat interface
- Typing indicator
- Tijdstempels
- Aangepaste input voor eigen vragen

### **✅ Quote Flow:**
- Placeholder voor quote functionaliteit
- Terug naar start optie

### **✅ Responsive Design:**
- Desktop: 380x600px
- Mobile: Fullscreen
- Hover effecten
- Smooth animaties

### **✅ Configureerbaar:**
- Thema (light/dark)
- Positie (4 opties)
- Kleuren aanpasbaar
- Titel en subtitel
- Welkomstbericht

## 🔧 **API Methods:**

```javascript
// Initialiseren
widget.init(config);

// Openen/sluiten
widget.open();
widget.close();
widget.toggle();

// Configuratie updaten
widget.updateConfig({ primaryColor: '#FF0000' });

// Vernietigen
widget.destroy();

// Event handlers
widget.onOpen = function() { console.log('Widget opened'); };
widget.onClose = function() { console.log('Widget closed'); };
widget.onMessage = function(msg) { console.log('Message:', msg); };
```

## 🎨 **Styling:**

- **Hoofdkleur:** #007BFF (configureerbaar)
- **Animaties:** Fade in, hover effects, typing dots
- **Fonts:** System fonts (-apple-system, etc.)
- **Gradients:** Subtiele blue gradients
- **Shadows:** Moderne dropshadows

## 📱 **Responsive breakpoints:**

- **Desktop:** 380px width, 600px height
- **Mobile:** Full viewport coverage
- **Tablet:** Aangepaste sizing

Dit is een complete, werkende widget met alle ondersteunende bestanden! 🚀