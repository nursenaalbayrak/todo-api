📝 Todo API 
-NestJS + PostgreSQL + Docker

Bu proje, NestJS ile geliştirilmiş bir görev yönetimi (Todo) API’sidir. Kullanıcılar kayıt olabilir, giriş yapabilir, görev oluşturabilir, tamamlayabilir, güncelleyebilir ve silebilir. JWT ile kimlik doğrulama ve rol tabanlı erişim kontrolü mevcuttur.

🚀 Özellikler
	•	Kullanıcı kayıt ve giriş (JWT Token ile)
	•	Rol bazlı yetkilendirme (User/Admin)
	•	Görev CRUD işlemleri
	•	Görev filtreleme
	•	Docker ile çalıştırılabilir
	•	Swagger UI ile test edilebilir

⚙️ Kurulum
	1.	Gerekli paketleri kur:
  
npm install
	2.	.env dosyasını oluştur:

DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USERNAME=sifreniz
DATABASE_PASSWORD=sifreniz
DATABASE_NAME=todo_db
JWT_SECRET=supersecretkey

🐳 Docker ile Başlatma

docker-compose up –build

Bu komut hem PostgreSQL hem de API uygulamasını başlatır.

🧪 API Örnekleri

➕ Kullanıcı oluşturma
POST /users

{
“username”: “nursena”,
“email”: “nursena@example.com”,
“password”: “123456”
}

🔐 Giriş yap
POST /auth/login

{
“email”: “nursena@example.com”,
“password”: “123456”
}

✅ Görev ekle
POST /todos
Headers: Authorization: Bearer 

{
“title”: “Sunum hazırla”,
“description”: “Proje anlatılacak”
}

📘 Swagger UI

Swagger arayüzüne erişmek için:
http://localhost:3000/api
Buradan kullanıcı girişi, görev oluşturma gibi tüm işlemleri test edebilirsin.

👥 Kullanıcı Rolleri
	•	User: Sadece kendi görevlerini yönetebilir.
	•	Admin: Tüm kullanıcıları ve görevleri görebilir.

Admin yapmak için şu şekilde güncelle:

PATCH /users/{id}

{
“role”: “Admin”
}

📁 Proje Yapısı

src/
├── auth/              # Kimlik doğrulama işlemleri
├── users/             # Kullanıcı işlemleri
├── todos/             # Görev işlemleri
├── guards/            # Yetki kontrolleri
├── app.module.ts      # Ana modül

🧾 Komutlar

İşlem: Geliştirme sunucusu
Komut: npm run start:dev

İşlem: Docker başlatma
Komut: docker-compose up –build

İşlem: Swagger UI aç
Adres: http://localhost:3000/api

İşlem: GitHub’a gönder
Komut: git push origin main

🧠 Notlar
	•	Veritabanı docker içinde olduğundan kalıcı değil. Volume ayarlarsan kalıcı olur.
	•	Swagger arayüzü ile kolayca test yapabilirsin.
	•	Giriş yaptıktan sonra “Authorize” tuşuyla token’ı girmen gerekiyor.
