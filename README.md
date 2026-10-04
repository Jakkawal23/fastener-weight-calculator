# NutWeigh 螺丝秤 · ชั่งน็อต

**English** · [ภาษาไทย](#ภาษาไทย)

A small offline web app for warehouse staff to convert **quantity ↔ weight** for hex bolts, nuts, flat washers and spring washers, based on the **GB30 hex bolt quantity table** (GB30 数量表, white zinc-plated bolts).

Typical use: a customer orders 200 pcs of M8×25. NutWeigh tells you that's **5.45 jin (斤) = 2.725 kg**, rounds it to a weight you can actually put on the scale (e.g. **5.5 jin**), and shows how many pieces that rounded weight really is.

---

## Contents
- [Features](#features)
- [Getting started](#getting-started)
- [How to use](#how-to-use)
  - [1. Calculate](#1-calculate)
  - [2. Data table](#2-data-table)
  - [3. Edit data](#3-edit-data)
- [Updating the data](#updating-the-data)
- [How the calculation works](#how-the-calculation-works)
- [Data file format](#data-file-format)
- [Project structure](#project-structure)
- [Notes and known limitations](#notes-and-known-limitations)

---

## Features
- **Three calculation modes:** pieces → jin/kg, jin → pieces, kg → pieces
- **Four product types:** hex bolts (螺栓), nuts (螺母), flat washers (平垫), spring washers (弹垫); sizes M6–M24 with every length from the original table
- **Rounding that is easy to set:**
  1. choose **what** to round: jin, kg, or pieces
  2. choose **how fine**: e.g. 10 / 5 / 1 / 0.5 jin, 1 liang (两) = 0.1 jin, whole pieces, 10 / 50 / 100 pcs, or a custom step
  3. choose the **direction**: up, nearest, or down

  The result shows the exact value and the rounded value side by side, with a comparison of pieces / jin / kg and the difference.
- **Bilingual UI:** Chinese by default with a Thai toggle. The Thai UI keeps Chinese units in brackets, e.g. `จิน (斤)`, `ตัว (个)`, to match Chinese invoices.
- **Data table page** that shows every value used in the calculation, plus grams per piece. Tap a row to calculate with it.
- **In-browser data editor:** change quantities, add or remove lengths and sizes, edit nut/washer weights.
- **Export / import `data.js`**, and **replace `data.js` on the server.** The app detects the new file automatically.
- **Calculation history:** note down results during a picking session.
- **Mobile-friendly:** bottom tab bar, large inputs, numeric keypad. Light and dark themes follow the device.
- **No install, no build step, no dependencies, works offline.**

---

## Getting started

### Option A: open locally
1. Download or clone this repository.
2. Double-click `index.html`. It opens in your browser and works without internet.

### Option B: host it (to use on phones)
Upload the folder to any static web host. With **GitHub Pages**:
1. Push this repository to GitHub.
2. Go to **Settings → Pages → Build and deployment**, set **Source: Deploy from a branch** and **Branch: `main` / root**.
3. After a minute the app is live at `https://<your-username>.github.io/<repo-name>/`.
4. Open that link on a phone and use the browser's **Add to Home screen** for quick access.

> ⚠️ A public repository makes the data table visible to anyone. Use a private repository if that matters; GitHub Pages for private repos needs a paid plan.

### Option C: local server (for development)
```bash
npx http-server -p 8137 -c-1
```
Then open http://localhost:8137.

---

## How to use

Switch language with **中文 / ไทย** in the top-right corner. The choice is remembered.

### 1. Calculate
1. **Choose the product** (① 选择产品): bolt / nut / flat washer / spring washer, then the **size** (e.g. M8) and, for bolts, the **length** in mm.
   The green box below shows the value from the table that will be used, e.g.
   `M8×25: 3,670 pcs / 100 jin → 0.02725 jin (13.62 g) each`.
2. **Enter a value** (② 输入数值). Pick the mode first:
   | Mode | You enter | You get |
   |---|---|---|
   | pcs → jin | number of pieces | weight in jin and kg |
   | jin → pcs | weight in jin | number of pieces |
   | kg → pcs | weight in kg | number of pieces |

   The result updates as you type.
3. **Rounding** (③ 取整):
   - **What to round:** none / jin / kg / pieces
   - **Precision:** tap a preset or type a custom step
   - **Direction:** up (default) / nearest / down
4. **Read the result:**
   - left box: the **exact** value
   - purple box: the **rounded** value
   - the table compares pieces / jin / kg before and after rounding; the rounded row is highlighted
   - the formula line shows exactly how the number was calculated
5. Press **Enter** or **Note down** (记下) to save the result in **Recent records** (up to 30 entries, kept in this browser).

**Example.** M8×25, 200 pcs, round **jin** **up** to **1 liang (0.1 jin)**:

| | Exact | Rounded | Difference |
|---|---|---|---|
| Pieces | 200 | 201.8 | +1.8 |
| **Jin** | 5.45 | **5.5** | +0.05 |
| Kg | 2.725 | 2.75 | +0.025 |

Weigh **5.5 jin** and you'll have about 202 pieces.

### 2. Data table
- Shows every size with its lengths, **pieces per 100 jin**, and **grams per piece**, plus nut / flat washer / spring washer weights (jin per piece).
- Use the chips at the top to filter by size.
- Cells marked **empty** (空 / ว่าง) were blank in the original paper table. Fill them in on the Edit page.
- **Tap any row** to jump to the calculator with that item selected.
- The last card lists the hand-written nut packaging notes. These are for reference only and are not used in calculations.

### 3. Edit data
1. Pick a **size**. Edit the quantity for any length, delete a row with **×**, or add one with **+ Add length**.
2. Edit nut / flat washer / spring washer weights (jin per piece). Leave a field empty if unknown.
3. Add a new size (e.g. `M27`) or delete one.
4. **Base jin** sets what the bolt quantities refer to (100 = pieces per 100 jin).
5. Press **Save**. Values are checked: lengths must be unique positive numbers, and quantities must be positive or empty. **Discard** throws away unsaved edits.

Saved edits are stored **in this browser only**. A yellow banner at the top reminds you when local edits are in use.

---

## Updating the data

The **Data file** card on the Edit page shows which data is in use (`data.js` or local edits) and offers these actions:

| Action | What it does |
|---|---|
| **Export data.js** | Downloads the current data as a `data.js` file in the same format as the original |
| **Import file** | Loads a previously exported `data.js` (or `.json`) into the editor. Press **Save** to apply. |
| **Use data from data.js** | Discards local edits and goes back to the `data.js` on the server |
| **Restore old local data** | Appears after the server file was replaced. Brings back the local edits that were backed up. |

### Updating for everyone (server / back end)
1. Edit the data on the Edit page, then press **Export data.js**.
2. Replace `data.js` in the website folder with the downloaded file. The name must be exactly `data.js`; if your browser saved it as `data (1).js`, rename it.
3. Upload or commit the folder. Every device that opens the app picks up the new data automatically.

**How the switch works:** every export gets a new `"version"` timestamp. Local edits remember which `data.js` version they were based on. When the app sees a different version on the server, it uses the new file, backs up the old local edits, and shows a banner.

> If you edit `data.js` **by hand**, also change its `"version"` value. Otherwise devices with local edits keep using their own data.

---

## How the calculation works

```
Bolt:             weight per piece (jin) = boltBaseJin ÷ table quantity
                  e.g. M8×25 → 100 ÷ 3670 = 0.02725 jin
Nut / washers:    weight per piece (jin) = value from the table

pcs → jin:        jin = pcs × weight per piece
jin → pcs:        pcs = jin ÷ weight per piece
kg  ↔ jin:        1 jin (斤) = 0.5 kg = 10 liang (两) = 500 g
```

**Rounding:** only the chosen value is rounded to the chosen step. The other two values are recalculated from it:
- rounding **jin** or **kg** shows how many pieces that weight really is
- rounding **pieces** shows the weight of the rounded quantity

---

## Data file format

`data.js` defines one object, `window.DEFAULT_DATA`, written as valid JSON:

```js
window.DEFAULT_DATA = {
  "version": "2026-10-04",          // change this whenever the data changes
  "boltBaseJin": 100,               // bolt quantities = pieces per 100 jin
  "sizes": [
    {
      "size": "M8",
      "nutJin": 0.038,              // nut, jin per piece
      "flatWasherJin": 0.02,        // flat washer, jin per piece
      "springWasherJin": 0.02,      // spring washer, jin per piece
      "bolts": [[10,5450],[12,5050],[25,3670], ...]   // [length mm, pieces per 100 jin]; null = blank
    }
  ],
  "nutPacks": [ { "size": "M8", "jin": 100, "pcs": 10000 } ]   // reference only
};
```

The comments above are for explanation only. Keep the real file free of comments inside the object so **Import** can read it.

---

## Project structure

| File | Purpose |
|---|---|
| `index.html` | Page layout (three pages: Calculate, Data table, Edit) |
| `styles.css` | Styles, dark mode, mobile layout |
| `app.js` | Calculation, rounding, translations (`I18N`), table, editor, import/export |
| `data.js` | **The data**, taken from the GB30 table |
| `README.md` | This file |

**Browser storage keys:** `gb30.data` (local edits), `gb30.backup`, `gb30.lang`, `gb30.prefs2`, `gb30.history`.

**Adding a language:** add an entry to the `I18N` object in `app.js` and a button in the `.lang` group in `index.html`.

---

## Notes and known limitations
- **Nut weights in the table vs. hand-written notes:** the table gives M8 nut = 0.038 jin (≈19 g), but the hand-written packaging note (100 jin / 10,000 pcs) implies 0.01 jin (≈5 g). The app uses the table value. Check by weighing and correct it in the editor if needed.
- **Flat and spring washers** share the single 平弹垫 value from the paper table until you enter separate values.
- Blank cells in the original table: M10×170, M10×190, M12×170, M12×180.
- Local edits and history live in the browser. Clearing site data removes them, so export `data.js` as a backup.

---
---

## ภาษาไทย

[English](#nutweigh-螺丝秤--ชั่งน็อต) · **ภาษาไทย**

เว็บแอปเล็ก ๆ สำหรับพนักงานคลังสินค้า ใช้แปลง **จำนวน ↔ น้ำหนัก** ของน็อตตัวผู้ น็อตตัวเมีย แหวนอีแปะ และแหวนสปริง อ้างอิงจาก **ตาราง GB30 数量表** (น็อตหัวหกเหลี่ยมชุบขาว) ใช้งานได้โดยไม่ต้องต่ออินเทอร์เน็ต

ตัวอย่างการใช้งาน: ลูกค้าสั่ง M8×25 จำนวน 200 ตัว ระบบจะบอกว่าต้องชั่ง **5.45 จิน (斤) = 2.725 กก.** ปัดให้เป็นน้ำหนักที่ชั่งได้จริง เช่น **5.5 จิน** และบอกว่าน้ำหนักที่ปัดแล้วได้ประมาณกี่ตัว

---

## สารบัญ
- [ความสามารถ](#ความสามารถ)
- [เริ่มใช้งาน](#เริ่มใช้งาน)
- [วิธีใช้งาน](#วิธีใช้งาน)
  - [1. หน้าคำนวณ](#1-หน้าคำนวณ)
  - [2. หน้าตารางข้อมูล](#2-หน้าตารางข้อมูล)
  - [3. หน้าแก้ไขข้อมูล](#3-หน้าแก้ไขข้อมูล)
- [การอัปเดตข้อมูล](#การอัปเดตข้อมูล)
- [หลักการคำนวณ](#หลักการคำนวณ)
- [รูปแบบไฟล์ข้อมูล](#รูปแบบไฟล์ข้อมูล)
- [โครงสร้างไฟล์](#โครงสร้างไฟล์)
- [ข้อควรทราบ](#ข้อควรทราบ)

---

## ความสามารถ
- **คำนวณได้ 3 แบบ:** ตัว → จิน/กิโล, จิน → ตัว, กิโล → ตัว
- **สินค้า 4 ประเภท:** น็อตตัวผู้ (螺栓), น็อตตัวเมีย (螺母), แหวนอีแปะ (平垫), แหวนสปริง (弹垫) ขนาด M6–M24 ครบทุกความยาวตามตารางต้นฉบับ
- **ปัดเศษได้ง่าย:**
  1. เลือกว่าจะปัด **ค่าอะไร**: จิน กิโล หรือจำนวน
  2. เลือก **ความละเอียด** เช่น 10 / 5 / 1 / 0.5 จิน, 1 ขีด (两) = 0.1 จิน, จำนวนเต็ม, ทีละ 10 / 50 / 100 ตัว หรือกำหนดเอง
  3. เลือก **ทิศทาง**: ปัดขึ้น ปัดใกล้สุด หรือปัดลง

  ผลลัพธ์แสดงค่าที่คำนวณได้คู่กับค่าที่ปัดแล้ว พร้อมตารางเทียบ จำนวน / จิน / กิโล และส่วนต่าง
- **2 ภาษา:** ภาษาจีนเป็นค่าเริ่มต้น สลับเป็นภาษาไทยได้ หน้าภาษาไทยมีหน่วยภาษาจีนในวงเล็บ เช่น `จิน (斤)` `ตัว (个)` ใช้เทียบกับบิลจีนได้ง่าย
- **หน้าตารางข้อมูล** แสดงค่าที่ใช้คำนวณทั้งหมด พร้อมน้ำหนักเป็นกรัมต่อตัว แตะแถวไหนก็ได้เพื่อไปคำนวณขนาดนั้น
- **แก้ไขข้อมูลบนเว็บได้:** แก้จำนวน เพิ่มหรือลบความยาวและขนาด แก้น้ำหนักน็อตตัวเมียและแหวน
- **ส่งออก / นำเข้า `data.js`** และ **แทนไฟล์ `data.js` ที่หลังบ้านได้** ระบบจะรู้เองและเปลี่ยนไปใช้ไฟล์ใหม่
- **ประวัติการคำนวณ** ไว้จดผลระหว่างจัดของ
- **ใช้บนมือถือได้:** แถบเมนูอยู่ด้านล่าง ช่องกรอกใหญ่ เปิดแป้นตัวเลขให้อัตโนมัติ รองรับโหมดมืดตามเครื่อง
- **ไม่ต้องติดตั้ง ไม่ต้อง build ไม่มี dependency ใช้งานออฟไลน์ได้**

---

## เริ่มใช้งาน

### วิธีที่ 1: เปิดในเครื่อง
1. ดาวน์โหลดหรือ clone repository นี้
2. ดับเบิลคลิกไฟล์ `index.html` เว็บจะเปิดในเบราว์เซอร์ และใช้ได้โดยไม่ต้องต่ออินเทอร์เน็ต

### วิธีที่ 2: ขึ้นเว็บ (เพื่อใช้บนมือถือ)
อัปโหลดโฟลเดอร์ไปที่ static web host ตัวไหนก็ได้ ถ้าใช้ **GitHub Pages**:
1. push repository นี้ขึ้น GitHub
2. ไปที่ **Settings → Pages → Build and deployment** ตั้ง **Source: Deploy from a branch** และ **Branch: `main` / root**
3. รอประมาณ 1 นาที เว็บจะเปิดได้ที่ `https://<ชื่อผู้ใช้>.github.io/<ชื่อ-repo>/`
4. เปิดลิงก์นั้นบนมือถือ แล้วเลือก **เพิ่มไปยังหน้าจอหลัก (Add to Home screen)** จะเปิดได้เร็วเหมือนแอป

> ⚠️ ถ้า repository เป็น Public ทุกคนจะเห็นข้อมูลตาราง ถ้าไม่ต้องการให้เห็นให้ตั้งเป็น Private แต่ GitHub Pages ของ repo แบบ Private ต้องใช้บัญชีแบบเสียเงิน

### วิธีที่ 3: รันเซิร์ฟเวอร์ในเครื่อง (สำหรับนักพัฒนา)
```bash
npx http-server -p 8137 -c-1
```
แล้วเปิด http://localhost:8137

---

## วิธีใช้งาน

สลับภาษาได้ที่ปุ่ม **中文 / ไทย** มุมขวาบน ระบบจะจำภาษาที่เลือกไว้

### 1. หน้าคำนวณ
1. **เลือกสินค้า** (① เลือกสินค้า): น็อตตัวผู้ / น็อตตัวเมีย / แหวนอีแปะ / แหวนสปริง แล้วเลือก **ขนาด** (เช่น M8) ถ้าเป็นน็อตตัวผู้ให้เลือก **ความยาว** (มม.) ด้วย
   กล่องสีเขียวด้านล่างจะบอกค่าจากตารางที่ใช้คำนวณ เช่น
   `M8×25: 3,670 ตัว (个) / 100 จิน (斤) → ตัวละ 0.02725 จิน (13.62 กรัม)`
2. **กรอกค่า** (② กรอกค่า) โดยเลือกโหมดก่อน:
   | โหมด | กรอก | ได้ผลลัพธ์ |
   |---|---|---|
   | ตัว → จิน | จำนวนตัว | น้ำหนักเป็นจินและกิโล |
   | จิน → ตัว | น้ำหนักเป็นจิน | จำนวนตัว |
   | กิโล → ตัว | น้ำหนักเป็นกิโล | จำนวนตัว |

   ผลลัพธ์จะเปลี่ยนทันทีที่พิมพ์
3. **ปัดเศษ** (③ ปัดเศษ):
   - **จะปัดค่าอะไร:** ไม่ปัด / จิน / กิโล / จำนวน
   - **ปัดละเอียดแค่ไหน:** กดปุ่มที่ตั้งไว้ หรือพิมพ์ในช่อง "กำหนดเอง"
   - **ทิศทาง:** ปัดขึ้น (ค่าเริ่มต้น) / ปัดใกล้สุด / ปัดลง
4. **อ่านผลลัพธ์:**
   - กล่องซ้าย: **ค่าที่คำนวณได้** (ค่าจริง)
   - กล่องสีม่วง: **ค่าที่ปัดแล้ว**
   - ตารางด้านล่างเทียบ จำนวน / จิน / กิโล ก่อนและหลังปัด แถวที่ถูกปัดจะเป็นสีม่วง
   - บรรทัด "สูตร" แสดงวิธีคิดตัวเลขทั้งหมด
5. กด **Enter** หรือปุ่ม **จดไว้** เพื่อบันทึกผลลงใน **ประวัติการคำนวณ** (เก็บได้ 30 รายการล่าสุด ในเบราว์เซอร์เครื่องนั้น)

**ตัวอย่าง:** M8×25 จำนวน 200 ตัว ปัด **จิน** แบบ **ปัดขึ้น** ทีละ **1 ขีด (0.1 จิน)**

| | ค่าที่คำนวณได้ | ค่าที่ปัดแล้ว | ส่วนต่าง |
|---|---|---|---|
| จำนวน (个) | 200 | 201.8 | +1.8 |
| **จิน (斤)** | 5.45 | **5.5** | +0.05 |
| กิโล (公斤) | 2.725 | 2.75 | +0.025 |

ชั่ง **5.5 จิน** จะได้ประมาณ 202 ตัว

### 2. หน้าตารางข้อมูล
- แสดงทุกขนาด พร้อมความยาว **จำนวนตัวต่อ 100 จิน** และ **น้ำหนักกรัมต่อตัว** รวมถึงน้ำหนักน็อตตัวเมียและแหวน (จินต่อตัว)
- กดปุ่มด้านบนเพื่อกรองดูเฉพาะขนาดที่ต้องการ
- ช่องที่ขึ้นคำว่า **ว่าง** คือช่องที่ว่างในตารางกระดาษต้นฉบับ เติมได้ในหน้าแก้ไขข้อมูล
- **แตะแถวไหนก็ได้** เพื่อไปหน้าคำนวณพร้อมเลือกสินค้านั้นให้ทันที
- การ์ดสุดท้ายคือบันทึกลายมือเรื่องบรรจุภัณฑ์น็อตตัวเมีย ใช้อ้างอิงเท่านั้น ไม่ได้นำมาคำนวณ

### 3. หน้าแก้ไขข้อมูล
1. เลือก **ขนาด** แล้วแก้จำนวนของแต่ละความยาว กด **×** เพื่อลบแถว หรือกด **+ เพิ่มความยาว**
2. แก้น้ำหนักน็อตตัวเมีย / แหวนอีแปะ / แหวนสปริง (จินต่อตัว) ถ้าไม่ทราบค่าให้เว้นว่างไว้
3. เพิ่มขนาดใหม่ (เช่น `M27`) หรือลบขนาดที่ไม่ใช้
4. **จำนวนจินที่ใช้เทียบ** คือจำนวนจินที่ตัวเลขจำนวนน็อตตัวผู้อ้างอิงถึง (100 = จำนวนตัวต่อ 100 จิน)
5. กด **บันทึก** ระบบจะตรวจค่าให้: ความยาวต้องเป็นตัวเลขมากกว่า 0 และห้ามซ้ำ จำนวนต้องมากกว่า 0 หรือเว้นว่าง ถ้าไม่ต้องการเก็บสิ่งที่แก้ กด **ยกเลิกการแก้ไข**

ข้อมูลที่บันทึกจะเก็บ **ในเบราว์เซอร์เครื่องนั้นเท่านั้น** และจะมีแถบสีเหลืองด้านบนเตือนว่ากำลังใช้ข้อมูลที่แก้ในเครื่อง

---

## การอัปเดตข้อมูล

การ์ด **ไฟล์ข้อมูล** ในหน้าแก้ไขข้อมูลจะบอกว่าตอนนี้ใช้ข้อมูลจากไหน (ไฟล์ `data.js` หรือข้อมูลที่แก้ในเครื่อง) และมีปุ่มต่อไปนี้:

| ปุ่ม | ทำอะไร |
|---|---|
| **ส่งออก data.js** | ดาวน์โหลดข้อมูลปัจจุบันเป็นไฟล์ `data.js` รูปแบบเดียวกับต้นฉบับ |
| **นำเข้าไฟล์** | โหลดไฟล์ `data.js` (หรือ `.json`) ที่เคยส่งออกกลับเข้ามา แล้วกด **บันทึก** |
| **ใช้ข้อมูลจากไฟล์ data.js** | ทิ้งข้อมูลที่แก้ในเครื่อง แล้วกลับไปใช้ไฟล์ `data.js` |
| **กู้ข้อมูลเก่าในเครื่อง** | ปรากฏหลังจากไฟล์หลังบ้านถูกเปลี่ยน ใช้กู้ข้อมูลเก่าที่ระบบสำรองไว้ |

### แก้ข้อมูลให้ทุกเครื่อง (จากหลังบ้าน)
1. แก้ข้อมูลในหน้าแก้ไขข้อมูล แล้วกด **ส่งออก data.js**
2. นำไฟล์ที่ดาวน์โหลดไปแทน `data.js` ในโฟลเดอร์เว็บ ชื่อไฟล์ต้องเป็น `data.js` เท่านั้น ถ้าเบราว์เซอร์ตั้งชื่อเป็น `data (1).js` ให้เปลี่ยนชื่อก่อน
3. อัปโหลดหรือ commit ขึ้นไป ทุกเครื่องที่เปิดเว็บจะได้ข้อมูลใหม่อัตโนมัติ

**ระบบรู้ได้อย่างไรว่ามีไฟล์ใหม่:** ทุกครั้งที่ส่งออกจะได้ค่า `"version"` ใหม่ ข้อมูลที่แก้ในเครื่องจะจำว่าอ้างอิง `data.js` เวอร์ชันไหน ถ้าเว็บเห็นว่าไฟล์บนเซิร์ฟเวอร์เป็นคนละเวอร์ชัน จะเปลี่ยนไปใช้ไฟล์ใหม่ สำรองข้อมูลเก่าในเครื่องไว้ และขึ้นแถบแจ้งเตือน

> ถ้าแก้ `data.js` **ด้วยมือ** ต้องเปลี่ยนค่า `"version"` ด้วยทุกครั้ง ไม่เช่นนั้นเครื่องที่เคยบันทึกข้อมูลไว้จะยังใช้ข้อมูลเดิมของเครื่องนั้น

---

## หลักการคำนวณ

```
น็อตตัวผู้:          น้ำหนักต่อตัว (จิน) = boltBaseJin ÷ จำนวนในตาราง
                     เช่น M8×25 → 100 ÷ 3670 = 0.02725 จิน
น็อตตัวเมีย / แหวน:   น้ำหนักต่อตัว (จิน) = ค่าในตาราง

ตัว → จิน:   จิน = จำนวน × น้ำหนักต่อตัว
จิน → ตัว:   จำนวน = จิน ÷ น้ำหนักต่อตัว
กิโล ↔ จิน:  1 จิน (斤) = 0.5 กก. = 10 ขีด (两) = 500 กรัม
```

**การปัด:** ระบบปัดเฉพาะค่าที่เลือกตามความละเอียดที่ตั้งไว้ แล้วคำนวณอีกสองค่าใหม่จากค่าที่ปัดแล้ว
- ปัด **จิน** หรือ **กิโล** จะรู้ว่าน้ำหนักนั้นได้กี่ตัวจริง ๆ
- ปัด **จำนวน** จะรู้ว่าจำนวนที่ปัดแล้วหนักเท่าไร

---

## รูปแบบไฟล์ข้อมูล

`data.js` กำหนดออบเจกต์ `window.DEFAULT_DATA` หนึ่งตัว เขียนเป็น JSON ที่ถูกต้อง:

```js
window.DEFAULT_DATA = {
  "version": "2026-10-04",          // เปลี่ยนทุกครั้งที่แก้ข้อมูล
  "boltBaseJin": 100,               // จำนวนน็อตตัวผู้ = จำนวนตัวต่อ 100 จิน
  "sizes": [
    {
      "size": "M8",
      "nutJin": 0.038,              // น็อตตัวเมีย จินต่อตัว
      "flatWasherJin": 0.02,        // แหวนอีแปะ จินต่อตัว
      "springWasherJin": 0.02,      // แหวนสปริง จินต่อตัว
      "bolts": [[10,5450],[12,5050],[25,3670], ...]   // [ความยาว มม., จำนวนตัวต่อ 100 จิน]; null = ช่องว่าง
    }
  ],
  "nutPacks": [ { "size": "M8", "jin": 100, "pcs": 10000 } ]   // ใช้อ้างอิงเท่านั้น
};
```

คอมเมนต์ด้านบนใส่ไว้เพื่ออธิบายเท่านั้น ในไฟล์จริงห้ามใส่คอมเมนต์ข้างในออบเจกต์ ไม่เช่นนั้นปุ่ม **นำเข้าไฟล์** จะอ่านไฟล์ไม่ได้

---

## โครงสร้างไฟล์

| ไฟล์ | หน้าที่ |
|---|---|
| `index.html` | โครงหน้าเว็บ (3 หน้า: คำนวณ, ตารางข้อมูล, แก้ไขข้อมูล) |
| `styles.css` | หน้าตา, โหมดมืด, เลย์เอาต์มือถือ |
| `app.js` | การคำนวณ, การปัด, ข้อความสองภาษา (`I18N`), ตาราง, หน้าแก้ไข, นำเข้า/ส่งออก |
| `data.js` | **ข้อมูลจากตาราง GB30** |
| `README.md` | ไฟล์นี้ |

**คีย์ที่เก็บในเบราว์เซอร์:** `gb30.data` (ข้อมูลที่แก้ในเครื่อง), `gb30.backup`, `gb30.lang`, `gb30.prefs2`, `gb30.history`

**เพิ่มภาษาใหม่:** เพิ่มชุดข้อความในออบเจกต์ `I18N` ใน `app.js` และเพิ่มปุ่มในกลุ่ม `.lang` ใน `index.html`

---

## ข้อควรทราบ
- **น้ำหนักน็อตตัวเมียในตาราง ไม่ตรงกับบันทึกลายมือ:** ตารางระบุ M8 = 0.038 จิน (≈19 กรัม) แต่บันทึกลายมือ (100 จิน / 10,000 ตัว) เท่ากับ 0.01 จิน (≈5 กรัม) เว็บใช้ค่าจากตาราง ควรลองชั่งจริงเพื่อตรวจสอบ ถ้าไม่ตรงให้แก้ในหน้าแก้ไขข้อมูล
- **แหวนอีแปะกับแหวนสปริง** ตอนนี้ใช้ค่า 平弹垫 ค่าเดียวกันตามตารางกระดาษ จนกว่าจะใส่ค่าแยก
- ช่องที่ว่างในตารางต้นฉบับ: M10×170, M10×190, M12×170, M12×180
- ข้อมูลที่แก้และประวัติการคำนวณเก็บในเบราว์เซอร์ ถ้าล้างข้อมูลเว็บไซต์ ข้อมูลนี้จะหาย ควรกด **ส่งออก data.js** เก็บไว้เป็นสำรอง
