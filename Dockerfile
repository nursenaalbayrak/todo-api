# 1. Node.js imajı seç
FROM node:18

# 2. Çalışma dizinini ayarla
WORKDIR /app

# 3. package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# 4. Bağımlılıkları yükle
RUN npm install

# 5. Diğer tüm dosyaları kopyala
COPY . .

# 6. Build et (opsiyonel ama önerilir)
RUN npm run build

# 7. Başlatma komutu
CMD ["npm", "run", "start:dev"]

# 8. Uygulama portunu aç
EXPOSE 3000