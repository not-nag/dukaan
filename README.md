# Dukaan - Hindi flavoured CLI Key-Value Store

Dukaan is a fun and intuitive command-line utility to store, retrieve, delete, and display key-value pairs. It adds a unique twist by offering all feedback and instructions in Hindi.

---

## ✨ Features

- **Add Key-Value Pairs:** Save data with a unique key in persistent storage.
- **Retrieve Values:** Access stored values using their associated keys.
- **Delete Keys:** Remove unwanted keys and their values.
- **List All Keys:** Display all the stored keys at once.
- **Validation Rules:** Prevents keys longer than 20 characters and values longer than 100 characters.
- **Persistent Storage:** Data is stored in SQLite for session persistence.

---

## 📦 Installation

Install Dukaan globally using npm:

```bash
npm install -g dukaan
```

# 🚀 Dukaan Commands & Usages

## 📖 1. View Help
Displays all available commands and their usage instructions.

### Command:
```bash
dukaan sikhao
```

### Example Output:
```
Sahi use karne ka tareeka:
  dukaan andar <key> <value>  # Ek mast key-value set karo
  dukaan baahar <key>         # Apni key ka value dekh lo
  dukaan dikhao               # Saare keys dekh lo, kya pata kuch chhupa ho!
  dukaan fenko <key>          # Agar koi key kaam ka nahi hai, to usse fenko!
```

---

## ✍️ 2. Add a Key-Value Pair
Stores a key-value pair in the database. Both key and value are required.

### Command:
```bash
dukaan andar <key> <value>
```

### Example:
```bash
dukaan andar country Bharat
```

### Output:
```
Chaabi 'country' aur uska mulya jodd diya hai
```

---

## 🔑 3. Retrieve a Value by Key
Fetches the value associated with a specific key. The key must exist in the database.

### Command:
```bash
dukaan baahar <key>
```

### Example:
```bash
dukaan baahar country
```

### Output:
```
country:Bharat
```
If the key does not exist:
```
Chaabi dukaan mein nahi mili
```

---

## 🗂️ 4. Show All Stored Keys
Displays a list of all stored keys in the database.

### Command:
```bash
dukaan dikhao
```

### Example:
```bash
dukaan dikhao
```

### Output:
```
Chaabiyan:
- country
- email
```
If no keys are stored:
```
Koi Chaabi nahi hai dukaan mein.
```

---

## 🗑️ 5. Delete a Key
Removes a key and its associated value from the database.

### Command:
```bash
dukaan fenko <key>
```

### Example:
```bash
dukaan fenko username
```

### Output:
```
Chaabi 'username' aur uska mulya hata diya gaya.
```
If the key does not exist:
```
Chaabi nahi mili
```
