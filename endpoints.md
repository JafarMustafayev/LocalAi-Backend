### **CHAT (Söhbətlər) Endpoint-ləri**

1. **GET /api/Conversations**
   - **Təsvir:** Bütün söhbətləri gətirir.
   - **Parametrlər:**
     - `page` (int): Səhifə nömrəsi (default: 0)
     - `take` (int): Hər səhifədə gətiriləcək söhbət sayı (1–50 arası)
     - `is_archived` (bool): Arxivlənmiş söhbətləri filtrləmək üçün

   - **Cavab:** Bütün söhbətlərin siyahısı

2. **GET /api/Conversations/`{chatId}`**
   - **Təsvir:** Verilən `chatId`-yə aid söhbəti gətirir.
   - **Parametrlər:** `chatId` (string): Söhbətin unikal identifikatoru
   - **Cavab:** Göstərilən `chatId`-yə aid söhbət məlumatı

3. **PATCH /api/Conversations/`{chatId}`**
   - **Təsvir:** Söhbətin başlığını dəyişir.
   - **Parametrlər:**
     - `chatId` (string): Söhbətin kimliyi
     - `dto` (RenameDto): Yeni başlıq məlumatı

   - **Cavab:** Başlıq uğurla dəyişdirildikdə müsbət cavab qaytarır

4. **PATCH /api/Conversations/`{chatId}`/archive**
   - **Təsvir:** Söhbəti arxivləyir və ya arxivdən çıxarır.
   - **Parametrlər:**
     - `chatId` (string): Söhbətin kimliyi
     - `dto` (ArchiveDto): `IsArchived` (true/false) dəyəri

   - **Cavab:** Söhbət uğurla arxivlənib və ya arxivdən çıxarılıbsa müsbət cavab qaytarır

5. **DELETE /api/Conversations/`{chatId}`**
   - **Təsvir:** Söhbəti silir (fiziki olaraq silmir, yalnız “silinmiş” kimi işarələyir).
   - **Parametrlər:** `chatId` (string): Söhbətin kimliyi
   - **Cavab:** Söhbət uğurla silinib

---

### **MESSAGE (Mesajlar) Endpoint-ləri**

6. **GET /api/Conversations/`{chatId}`/messages**
   - **Təsvir:** Verilən söhbətə aid bütün mesajları gətirir.
   - **Parametrlər:** `chatId` (string): Söhbətin kimliyi
   - **Cavab:** Söhbətə aid bütün mesajların siyahısı

7. **GET /api/messages/`{messageId}`**
   - **Təsvir:** Müəyyən bir mesajı gətirir.
   - **Parametrlər:** `messageId` (string): Mesajın kimliyi
   - **Cavab:** Göstərilən `messageId`-yə aid mesaj məlumatı

8. **POST /api/Conversations/`{chatId}`/messages**
   - **Təsvir:** Yeni mesaj göndərir (istifadəçi mesajı və ya assistant cavabı).
   - **Parametrlər:**
     - `chatId` (string): Söhbətin kimliyi
     - `dto` (MessageDto): Mesajın məzmunu

   - **Cavab:** Göndərilən istifadəçi mesajı və assistant tərəfindən yaradılan cavab mesajı

9. **POST /api/messages/`{messageId}`/regenerate**
   - **Təsvir:** Göstərilən asistant mesajını yenidən yaradır (cavabı təkrar generasiya edir).
   - **Parametrlər:** `messageId` (string): Mesajın kimliyi
   - **Cavab:** Yenidən yaradılmış asistant mesajı

10. **POST /api/messages/`{messageId}`/reaction**
    - **Təsvir:** Mesaja reaksiya əlavə edir (məsələn, “like” və ya “dislike”).
    - **Parametrlər:**
      - `messageId` (string): Mesajın kimliyi
      - `dto` (ReactionDto): Reaksiya tipi (“like” və ya “dislike”)

    - **Cavab:** Reaksiyası yenilənmiş mesaj məlumatı

---

### **Model-lər**

1. **ResponseDto:** API cavablarının standart quruluşunu müəyyən edir.
   - `Message`: Cavab mesajı
   - `StatusCode`: HTTP status kodu
   - `IsSuccess`: Əməliyyatın uğurlu olub-olmaması
   - `Errors`: Xəta məlumatları (əgər varsa)
   - `Data`: Cavab məlumatı

2. **Chat:** Söhbət məlumatlarını saxlayır.
   - `Id`: Söhbətin kimliyi
   - `Title`: Başlıq
   - `ModelId`: İstifadə olunan AI modelinin ID-si
   - `CreatedAt`: Yaradılma tarixi
   - `UpdatedAt`: Son yenilənmə tarixi
   - `IsArchived`: Arxivlənmə vəziyyəti
   - `NamedBy`: Başlığı təyin edən şəxs
   - `IsDeleted`: Silinmə vəziyyəti
   - `Messages`: Söhbətə aid mesajlar

3. **Message:** Mesaj məlumatlarını saxlayır.
   - `Id`: Mesajın kimliyi
   - `ChatId`: Aid olduğu söhbətin kimliyi
   - `Role`: Mesajın müəllifi (“user” və ya “assistant”)
   - `Content`: Mesajın məzmunu
   - `Timestamp`: Göndərilmə tarixi
   - `IsThinking`: Assistant cavab yaradarkən “düşünmə” vəziyyəti (opsional)
   - `EditedAt`: Düzəliş tarixi (opsional)
   - `Reaction`: Mesajın aldığı reaksiya (opsional)
   - `IsDeleted`: Silinmə vəziyyəti

4. **DTO-lar:**
   - `RenameDto`: Söhbət başlığını yeniləmək üçün (`Title`)
   - `ArchiveDto`: Arxivləmə vəziyyətini dəyişmək üçün (`IsArchived`)
   - `MessageDto`: Yeni mesaj göndərmək üçün (`Content`)
   - `ReactionDto`: Mesaja reaksiya əlavə etmək üçün (`Reaction`)

---

Bu struktur, söhbət və mesajların idarəsini təmin edən çevik və genişlənə bilən bir API dizaynını göstərir.
