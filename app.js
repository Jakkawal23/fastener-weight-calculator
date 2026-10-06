(function () {
  "use strict";

  /* ================= 常量 / ค่าคงที่ ================= */
  var KG_PER_JIN = 0.5;           // 1 斤 = 0.5 公斤
  var LS = {
    data: "gb30.data",            // 本机修改过的数据 (ข้อมูลที่แก้ในเครื่อง)
    backup: "gb30.backup",        // data.js 更新后旧的本机数据 (สำรองเมื่อไฟล์หลังบ้านถูกเปลี่ยน)
    lang: "gb30.lang",
    prefs: "gb30.prefs3",
    history: "gb30.history"
  };

  /* ================= 文字 / ข้อความ ================= */
  // 泰文界面的单位/产品名后面加上中文，方便对照中国单据
  var I18N = {
    zh: {
      appTitle: "螺丝秤 NutWeigh",
      tabCalc: "计算", tabTable: "数据表", tabEdit: "编辑数据",
      step1: "① 选择产品", step2: "② 输入数值", step3: "③ 取整",
      bolt: "螺栓", nut: "螺母", flat: "平垫", spring: "弹垫", square: "方垫",
      size: "规格", length: "长度 (mm)", specDims: "规格（内径×外径×厚）", specSquare: "规格（内径×边长×厚）",
      modePcs: "个 → 斤", modeJin: "斤 → 个", modeKg: "公斤 → 个",
      inPcs: "需要的数量", inJin: "重量", inKg: "重量",
      pcs: "个", jin: "斤", kg: "公斤", g: "克", liang: "两",
      qtyName: "数量", jinName: "斤", kgName: "公斤",
      roundWhat: "对哪个值取整？", roundLevel: "取整精度", roundDir: "取整方向", custom: "自定义",
      tNone: "不取整", tJin: "斤", tKg: "公斤", tPcs: "数量",
      dirUp: "向上", dirNear: "四舍五入", dirDown: "向下",
      intOnly: "整数",
      calcVal: "计算值", roundVal: "取整后", diff: "相差",
      perPiece: "单个重量",
      basisQty: "{name}：{qty} 个 / {base} 斤 → 每个 {w} 斤（{g} 克）",
      basisW: "{name}：每个 {w} 斤（{g} 克）",
      noData: "此规格在表中没有数据，请到「编辑数据」补充。",
      enterValue: "输入数值后自动计算",
      formula: "公式",
      saveHist: "记下", history: "最近记录", clear: "清空", noHistory: "暂无记录",
      tableTitle: "数量表",
      tableNote: "数量 = 每 {base} 斤的个数（螺母为每个斤数）。点击任意一行可直接去计算。",
      all: "全部", catBolt: "螺栓 / 螺母",
      thLen: "长度", thSpec: "规格", thQty: "个 / {base} 斤", thG: "克 / 个", thJinPc: "斤 / 个",
      nutRow: "螺母（斤 / 个）",
      tFlat: "平垫数量表", tSpring: "镀锌弹垫数量表", tSquare: "方垫（手写记录）",
      nutPacks: "螺母包装（手写记录，仅供参考）", thPack: "斤 / 个",
      editTitle: "编辑数据",
      editNote: "修改后点「保存」，数据保存在本机浏览器。",
      baseJin: "数量表对应的斤数（所有数量表通用）",
      category: "编辑类别",
      addLen: "+ 添加长度", addRow: "+ 添加一行", addSize: "添加新规格（螺栓）", add: "添加",
      delSize: "删除此规格",
      specHint: "格式：内径*外径*厚度，例如 8*22*1.5",
      save: "保存", discard: "放弃修改",
      fileTitle: "数据文件（导出 / 导入 / 后台替换）",
      exportJs: "导出 data.js", import: "导入文件", reset: "恢复为 data.js 的数据", restoreBackup: "取回旧的本机数据",
      srcFile: "当前使用：<b>data.js 文件</b>（版本 {v}）",
      srcLocal: "当前使用：<b>本机修改的数据</b>（保存于 {v}，基于 data.js 版本 {b}）",
      srcFileNew: "后台 data.js 已更新（版本 {v}），已改用新文件。旧的本机数据已备份。",
      howto1: "点「导出 data.js」下载当前数据。",
      howto2: "要在本机恢复：点「导入文件」选择该文件 → 点「保存」。",
      howto3: "要在后台更新：用下载的文件替换网站文件夹里的 <code>data.js</code>（文件名必须是 data.js）。",
      howto4: "替换后打开网页，系统会自动改用新的 data.js。",
      saved: "已保存。", discarded: "已放弃修改。", resetDone: "已恢复为 data.js 的数据。",
      imported: "已导入「{f}」（版本 {v}），检查后点「保存」。", restored: "已取回旧数据，检查后点「保存」。",
      importErr: "文件格式不正确。", exported: "已导出 data.js。",
      confirmReset: "确定恢复为 data.js 文件里的数据？本机修改会被删除。",
      confirmDelSize: "确定删除 {size} 的全部数据？",
      sizeExists: "该规格已存在。", unsaved: "有未保存的修改",
      errLen: "{size}：长度必须是大于 0 的数字且不能重复。",
      errQty: "{size}×{len}：数量必须是大于 0 的数字或留空。",
      errNut: "{size}：螺母重量必须是大于 0 的数字或留空。",
      errSpec: "{cat}：规格「{spec}」格式不对或重复（例如 8*22*1.5）。",
      errSpring: "{cat}：规格「{spec}」必须是数字（例如 M8）且不能重复。",
      errListQty: "{cat} {spec}：数量必须是大于 0 的数字或留空。",
      errBase: "斤数必须大于 0。",
      customBanner: "当前使用本机修改过的数据。",
      footer: "1 斤 = 0.5 公斤 = 10 两 = 500 克",
      emptyCell: "空"
    },
    th: {
      appTitle: "ชั่งน็อต NutWeigh",
      tabCalc: "คำนวณ", tabTable: "ตารางข้อมูล", tabEdit: "แก้ไขข้อมูล",
      step1: "① เลือกสินค้า", step2: "② กรอกค่า", step3: "③ ปัดเศษ",
      bolt: "น็อตตัวผู้ (螺栓)", nut: "น็อตตัวเมีย (螺母)", flat: "แหวนอีแปะ (平垫)", spring: "แหวนสปริง (弹垫)", square: "แหวนสี่เหลี่ยม (方垫)",
      size: "ขนาด (规格)", length: "ความยาว มม. (长度)", specDims: "สเปก ใน×นอก×หนา (规格)", specSquare: "สเปก ใน×ด้าน×หนา (规格)",
      modePcs: "ตัว → จิน (斤)", modeJin: "จิน (斤) → ตัว", modeKg: "กิโล (公斤) → ตัว",
      inPcs: "จำนวนที่ต้องการ", inJin: "น้ำหนัก", inKg: "น้ำหนัก",
      pcs: "ตัว (个)", jin: "จิน (斤)", kg: "กก. (公斤)", g: "กรัม (克)", liang: "ขีด (两)",
      qtyName: "จำนวน (个)", jinName: "จิน (斤)", kgName: "กิโล (公斤)",
      roundWhat: "จะปัดค่าอะไร?", roundLevel: "ปัดละเอียดแค่ไหน", roundDir: "ทิศทางการปัด", custom: "กำหนดเอง",
      tNone: "ไม่ปัด", tJin: "จิน (斤)", tKg: "กิโล (公斤)", tPcs: "จำนวน (个)",
      dirUp: "ปัดขึ้น", dirNear: "ปัดใกล้สุด", dirDown: "ปัดลง",
      intOnly: "จำนวนเต็ม",
      calcVal: "ค่าที่คำนวณได้", roundVal: "ค่าที่ปัดแล้ว", diff: "ส่วนต่าง",
      perPiece: "น้ำหนักต่อตัว",
      basisQty: "{name}: {qty} ตัว (个) / {base} จิน (斤) → ตัวละ {w} จิน (斤) ({g} กรัม)",
      basisW: "{name}: ตัวละ {w} จิน (斤) ({g} กรัม)",
      noData: "ขนาดนี้ยังไม่มีข้อมูลในตาราง ไปเพิ่มได้ที่หน้า \"แก้ไขข้อมูล\"",
      enterValue: "กรอกค่าแล้วระบบจะคำนวณให้ทันที",
      formula: "สูตร",
      saveHist: "จดไว้", history: "ประวัติการคำนวณ", clear: "ล้าง", noHistory: "ยังไม่มีประวัติ",
      tableTitle: "ตารางจำนวน (数量表)",
      tableNote: "จำนวน = จำนวนตัวต่อ {base} จิน (斤) (น็อตตัวเมียเป็นจินต่อตัว) แตะแถวใดก็ได้เพื่อไปคำนวณ",
      all: "ทั้งหมด", catBolt: "น็อตตัวผู้ / ตัวเมีย",
      thLen: "ยาว", thSpec: "สเปก (规格)", thQty: "ตัว / {base} จิน (斤)", thG: "กรัม / ตัว", thJinPc: "จิน (斤) / ตัว",
      nutRow: "น็อตตัวเมีย (จิน 斤 ต่อตัว)",
      tFlat: "แหวนอีแปะ (平垫数量表)", tSpring: "แหวนสปริงชุบซิงค์ (镀锌弹垫数量表)", tSquare: "แหวนสี่เหลี่ยม (方垫 บันทึกลายมือ)",
      nutPacks: "บรรจุภัณฑ์น็อตตัวเมีย (บันทึกลายมือ ใช้อ้างอิงเท่านั้น)", thPack: "จิน (斤) / ตัว",
      editTitle: "แก้ไขข้อมูล",
      editNote: "แก้ไขแล้วกด \"บันทึก\" ข้อมูลจะเก็บไว้ในเบราว์เซอร์เครื่องนี้",
      baseJin: "จำนวนจิน (斤) ที่ตารางจำนวนอ้างอิง (ใช้ร่วมกันทุกตาราง)",
      category: "หมวดที่จะแก้ไข",
      addLen: "+ เพิ่มความยาว", addRow: "+ เพิ่มแถว", addSize: "เพิ่มขนาดใหม่ (น็อตตัวผู้)", add: "เพิ่ม",
      delSize: "ลบขนาดนี้",
      specHint: "รูปแบบ: ใน*นอก*หนา เช่น 8*22*1.5",
      save: "บันทึก", discard: "ยกเลิกการแก้ไข",
      fileTitle: "ไฟล์ข้อมูล (ส่งออก / นำเข้า / แทนไฟล์หลังบ้าน)",
      exportJs: "ส่งออก data.js", import: "นำเข้าไฟล์", reset: "ใช้ข้อมูลจากไฟล์ data.js", restoreBackup: "กู้ข้อมูลเก่าในเครื่อง",
      srcFile: "ข้อมูลที่ใช้อยู่: <b>ไฟล์ data.js</b> (เวอร์ชัน {v})",
      srcLocal: "ข้อมูลที่ใช้อยู่: <b>ข้อมูลที่แก้ในเครื่องนี้</b> (บันทึกเมื่อ {v}, อ้างอิง data.js เวอร์ชัน {b})",
      srcFileNew: "ไฟล์ data.js หลังบ้านถูกอัปเดต (เวอร์ชัน {v}) ระบบเปลี่ยนมาใช้ไฟล์ใหม่แล้ว ข้อมูลเก่าในเครื่องถูกสำรองไว้",
      howto1: "กด \"ส่งออก data.js\" เพื่อดาวน์โหลดข้อมูลปัจจุบัน",
      howto2: "ถ้าจะกู้กลับในเครื่อง: กด \"นำเข้าไฟล์\" เลือกไฟล์นั้น → กด \"บันทึก\"",
      howto3: "ถ้าจะแก้ที่หลังบ้าน: นำไฟล์ที่ดาวน์โหลดไปแทน <code>data.js</code> ในโฟลเดอร์เว็บ (ชื่อไฟล์ต้องเป็น data.js)",
      howto4: "เปิดเว็บใหม่ ระบบจะเปลี่ยนไปใช้ data.js ตัวใหม่ให้อัตโนมัติ",
      saved: "บันทึกแล้ว", discarded: "ยกเลิกการแก้ไขแล้ว", resetDone: "เปลี่ยนกลับมาใช้ข้อมูลจากไฟล์ data.js แล้ว",
      imported: "นำเข้า \"{f}\" (เวอร์ชัน {v}) แล้ว ตรวจสอบแล้วกด \"บันทึก\"", restored: "กู้ข้อมูลเก่าแล้ว ตรวจสอบแล้วกด \"บันทึก\"",
      importErr: "รูปแบบไฟล์ไม่ถูกต้อง", exported: "ส่งออก data.js แล้ว",
      confirmReset: "ต้องการกลับไปใช้ข้อมูลจากไฟล์ data.js ใช่ไหม? ข้อมูลที่แก้ไว้ในเครื่องนี้จะหายไป",
      confirmDelSize: "ต้องการลบข้อมูลทั้งหมดของ {size} ใช่ไหม?",
      sizeExists: "มีขนาดนี้อยู่แล้ว", unsaved: "มีการแก้ไขที่ยังไม่บันทึก",
      errLen: "{size}: ความยาวต้องเป็นตัวเลขมากกว่า 0 และห้ามซ้ำ",
      errQty: "{size}×{len}: จำนวนต้องเป็นตัวเลขมากกว่า 0 หรือเว้นว่าง",
      errNut: "{size}: น้ำหนักน็อตตัวเมียต้องเป็นตัวเลขมากกว่า 0 หรือเว้นว่าง",
      errSpec: "{cat}: สเปก \"{spec}\" รูปแบบไม่ถูกต้องหรือซ้ำ (ตัวอย่าง 8*22*1.5)",
      errSpring: "{cat}: ขนาด \"{spec}\" ต้องเป็นตัวเลข (เช่น M8) และห้ามซ้ำ",
      errListQty: "{cat} {spec}: จำนวนต้องเป็นตัวเลขมากกว่า 0 หรือเว้นว่าง",
      errBase: "จำนวนจินต้องมากกว่า 0",
      customBanner: "กำลังใช้ข้อมูลที่แก้ไขในเครื่องนี้",
      footer: "1 จิน (斤) = 0.5 กก. (公斤) = 10 ขีด (两) = 500 กรัม (克)",
      emptyCell: "ว่าง"
    }
  };

  var TYPES = ["bolt", "nut", "flat", "spring", "square"];
  // 垫片数量表在数据里的字段 / ช่องข้อมูลของตารางแหวน
  var LIST_FIELD = { flat: "flatWashers", spring: "springWashers", square: "squareWashers" };
  // 取整精度选项 / ตัวเลือกความละเอียดการปัด
  var LEVELS = {
    jin: [10, 5, 1, 0.5, 0.1],
    kg: [10, 5, 1, 0.5, 0.1],
    pcs: [1, 10, 50, 100, 500, 1000]
  };

  /* ================= 存储 / storage ================= */
  function lsGet(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw == null ? fallback : JSON.parse(raw);
    } catch (e) { return fallback; }
  }
  function lsSet(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* ignore */ }
  }
  function lsDel(key) {
    try { localStorage.removeItem(key); } catch (e) { /* ignore */ }
  }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  // 兼容旧格式 (boltBaseJin、没有垫片表) / รองรับไฟล์รูปแบบเก่า
  function normalize(d) {
    if (d.baseJin == null && d.boltBaseJin != null) d.baseJin = d.boltBaseJin;
    delete d.boltBaseJin;
    Object.keys(LIST_FIELD).forEach(function (k) { if (!Array.isArray(d[LIST_FIELD[k]])) d[LIST_FIELD[k]] = []; });
    d.sizes.forEach(function (s) { delete s.flatWasherJin; delete s.springWasherJin; });
    return d;
  }

  /* ================= 状态 / state ================= */
  var FILE_DATA = normalize(clone(window.DEFAULT_DATA));
  var data, usingCustom = false, fileUpdated = false;
  (function loadData() {
    var stored = lsGet(LS.data, null);
    if (stored && stored.sizes) {
      if (stored.baseVersion === FILE_DATA.version) {
        data = normalize(stored); usingCustom = true; return;
      }
      // 后台替换了 data.js → 用新文件，旧本机数据备份
      lsSet(LS.backup, stored);
      lsDel(LS.data);
      fileUpdated = true;
    }
    data = clone(FILE_DATA);
  })();

  var lang = lsGet(LS.lang, "zh");
  if (!I18N[lang]) lang = "zh";

  var prefs = Object.assign({
    type: "bolt", sel: {}, mode: "pcs",
    target: "jin", dir: "up", steps: { jin: 0.1, kg: 0.1, pcs: 1 }
  }, lsGet(LS.prefs, {}));
  if (TYPES.indexOf(prefs.type) < 0) prefs.type = "bolt";

  var history = lsGet(LS.history, []);
  var page = "calc";
  var tableFilter = "all";
  var draft = null;          // 编辑草稿
  var editCat = "bolt";
  var editSize = null;
  var dirty = false;

  function t(key, vars) {
    var s = (I18N[lang] && I18N[lang][key]) || I18N.zh[key] || key;
    if (vars) Object.keys(vars).forEach(function (k) { s = s.split("{" + k + "}").join(vars[k]); });
    return s;
  }
  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }
  function savePrefs() { lsSet(LS.prefs, prefs); }
  function fmtVer(v) { return v ? String(v).replace("T", " ").slice(0, 19) : "—"; }

  /* ================= 数字 / numbers ================= */
  function num(v) {
    if (v === null || v === undefined) return NaN;
    var s = String(v).replace(/,/g, "").trim();
    if (s === "") return NaN;
    return Number(s);
  }
  function fmt(n, dec) {
    if (!isFinite(n)) return "—";
    if (dec === undefined) dec = 3;
    return Number(n.toFixed(dec)).toLocaleString("en-US", { maximumFractionDigits: dec });
  }
  function fmtPcs(n) { return fmt(n, Math.abs(n - Math.round(n)) < 1e-6 ? 0 : 1); }
  function roundStep(x, step, dir) {
    if (!(step > 0)) return x;
    var q = x / step;
    var r = dir === "up" ? Math.ceil(q - 1e-9) : dir === "down" ? Math.floor(q + 1e-9) : Math.round(q);
    return Number((r * step).toFixed(6));
  }

  /* ================= 规格 / specs ================= */
  function specLabel(spec) { return String(spec).split("*").join("×"); }
  function specParts(spec) { return String(spec).split("*").map(Number); }
  function sizeNum(size) { return parseFloat(String(size).replace(/[^\d.]/g, "")) || 0; }
  function normSize(s) { var n = sizeNum(s); return n > 0 ? "M" + n : ""; }
  function cmpSpec(a, b) {
    var pa = specParts(a), pb = specParts(b);
    for (var i = 0; i < Math.max(pa.length, pb.length); i++) {
      var d = (pa[i] || 0) - (pb[i] || 0);
      if (d) return d;
    }
    return 0;
  }

  /* ================= 数据查询 / lookup ================= */
  function sizeRec(size, src) {
    var list = (src || data).sizes;
    for (var i = 0; i < list.length; i++) if (list[i].size === size) return list[i];
    return null;
  }

  // 把 [规格, 数量] 列表按内径分组 / จัดกลุ่มตามขนาดรู
  function groupList(list) {
    var map = {}, out = [];
    list.slice().sort(function (a, b) { return cmpSpec(a[0], b[0]); }).forEach(function (r) {
      var g = "M" + specParts(r[0])[0];
      if (!map[g]) { map[g] = { size: g, items: [] }; out.push(map[g]); }
      map[g].items.push({ key: String(r[0]), label: specLabel(r[0]), qty: r[1] });
    });
    return out;
  }

  // 统一的产品目录：[{size, items:[{key, label, qty | w}]}]
  // qty = 每 baseJin 斤的个数；w = 每个斤数（螺母）
  function catalog(type) {
    if (type === "bolt") return data.sizes.map(function (s) {
      return { size: s.size, items: s.bolts.map(function (b) { return { key: String(b[0]), label: String(b[0]), qty: b[1] }; }) };
    });
    if (type === "nut") return data.sizes.map(function (s) { return { size: s.size, items: [{ key: "", label: "", w: s.nutJin }] }; });
    if (type === "spring") return data.springWashers.slice().sort(function (a, b) { return sizeNum(a[0]) - sizeNum(b[0]); })
      .map(function (r) { return { size: r[0], items: [{ key: "", label: "", qty: r[1] }] }; });
    return groupList(data[LIST_FIELD[type]]);
  }
  function hasValue(it) { return it && (it.qty > 0 || it.w > 0); }

  function itemName(type, size, item) {
    if (type === "bolt") return size + "×" + item.label + " " + t("bolt");
    if (type === "flat" || type === "square") return t(type) + " " + item.label;
    return size + " " + t(type);
  }

  // 当前所选: {type, group, item} 并修正无效选择
  function currentSel() {
    var type = prefs.type;
    var groups = catalog(type);
    var sel = prefs.sel[type] || (prefs.sel[type] = {});
    var group = null;
    groups.forEach(function (g) { if (g.size === sel.size) group = g; });
    if (!group) {
      group = groups.filter(function (g) { return g.size === "M8"; })[0] || groups[0] || null;
      sel.size = group ? group.size : null;
    }
    var item = null;
    if (group) {
      group.items.forEach(function (it) { if (it.key === sel.item) item = it; });
      if (!item) { item = group.items.filter(hasValue)[0] || group.items[0]; sel.item = item ? item.key : ""; }
    }
    return { type: type, groups: groups, group: group, item: item };
  }

  // 当前所选产品的单个重量 (斤/个)
  function unitInfo() {
    var c = currentSel();
    if (!c.group || !hasValue(c.item)) return null;
    var name = itemName(c.type, c.group.size, c.item);
    if (c.item.qty > 0) {
      var base = data.baseJin;
      var w = base / c.item.qty;
      return {
        w: w, label: name,
        basis: t("basisQty", { name: name, qty: fmt(c.item.qty, 0), base: fmt(base), w: fmt(w, 6), g: fmt(w * 500, 3) }),
        perPcExpr: "(" + fmt(base) + " ÷ " + fmt(c.item.qty, 0) + ")"
      };
    }
    return {
      w: c.item.w, label: name,
      basis: t("basisW", { name: name, w: fmt(c.item.w, 5), g: fmt(c.item.w * 500, 2) }),
      perPcExpr: fmt(c.item.w, 5)
    };
  }

  /* ================= 通用控件 / segmented ================= */
  function renderSeg(el, items, current, onPick) {
    el.innerHTML = items.map(function (it) {
      return '<button type="button" data-v="' + esc(it.v) + '" class="' + (String(it.v) === String(current) ? "on" : "") + '">' + esc(it.label) + "</button>";
    }).join("");
    el.onclick = function (e) {
      var b = e.target.closest("button");
      if (b) onPick(b.getAttribute("data-v"));
    };
  }
  function rerender() { renderCalcControls(); renderResult(); }

  /* ================= 计算页 / calc page ================= */
  function renderCalcControls() {
    renderSeg($("typeSeg"), TYPES.map(function (k) { return { v: k, label: t(k) }; }), prefs.type, function (v) {
      prefs.type = v; savePrefs(); rerender();
    });

    var c = currentSel();
    savePrefs();
    $("sizeSel").innerHTML = c.groups.map(function (g) {
      var ok = g.items.some(hasValue);
      return '<option value="' + esc(g.size) + '"' + (c.group && g.size === c.group.size ? " selected" : "") + ">" +
        esc(g.size) + (ok ? "" : " (" + esc(t("emptyCell")) + ")") + "</option>";
    }).join("");

    var multi = c.type === "bolt" || c.type === "flat" || c.type === "square";
    $("lenField").hidden = !multi;
    if (multi && c.group) {
      $("itemLabel").textContent = t(c.type === "bolt" ? "length" : c.type === "square" ? "specSquare" : "specDims");
      $("lenSel").innerHTML = c.group.items.map(function (it) {
        return '<option value="' + esc(it.key) + '"' + (c.item && it.key === c.item.key ? " selected" : "") + ">" +
          esc(it.label) + (hasValue(it) ? "" : " (" + esc(t("emptyCell")) + ")") + "</option>";
      }).join("");
    }

    renderSeg($("modeSeg"), [
      { v: "pcs", label: t("modePcs") }, { v: "jin", label: t("modeJin") }, { v: "kg", label: t("modeKg") }
    ], prefs.mode, function (v) {
      prefs.mode = v; savePrefs(); rerender(); $("amount").focus();
    });
    var inKey = { pcs: "inPcs", jin: "inJin", kg: "inKg" }[prefs.mode];
    $("amountLabel").textContent = t(inKey);
    $("amountUnit").textContent = t(prefs.mode);
    $("amount").setAttribute("inputmode", prefs.mode === "pcs" ? "numeric" : "decimal");

    // ③ 取整：先选对象，再选精度和方向
    renderSeg($("targetSeg"), [
      { v: "none", label: t("tNone") }, { v: "jin", label: t("tJin") },
      { v: "kg", label: t("tKg") }, { v: "pcs", label: t("tPcs") }
    ], prefs.target, function (v) {
      prefs.target = v; savePrefs(); rerender();
    });
    $("roundOpts").hidden = prefs.target === "none";
    if (prefs.target !== "none") {
      var tg = prefs.target;
      var cur = prefs.steps[tg];
      $("levelChips").innerHTML = LEVELS[tg].map(function (s) {
        return '<button type="button" data-v="' + s + '" class="' + (Number(cur) === s ? "on" : "") + '">' + esc(levelLabel(tg, s)) + "</button>";
      }).join("");
      $("levelChips").onclick = function (e) {
        var b = e.target.closest("button"); if (!b) return;
        prefs.steps[tg] = Number(b.getAttribute("data-v")); savePrefs(); rerender();
      };
      if (document.activeElement !== $("stepInput")) $("stepInput").value = cur;
      $("stepInput").setAttribute("inputmode", tg === "pcs" ? "numeric" : "decimal");
      $("stepUnit").textContent = t(tg);
      renderSeg($("dirSeg"), [
        { v: "up", label: t("dirUp") }, { v: "near", label: t("dirNear") }, { v: "down", label: t("dirDown") }
      ], prefs.dir, function (v) {
        prefs.dir = v; savePrefs(); rerender();
      });
    }

    var info = unitInfo();
    var basis = $("basis");
    basis.className = "basis" + (info ? "" : " bad");
    basis.textContent = info ? info.basis : t("noData");
  }

  function levelLabel(tg, s) {
    if (tg === "pcs") return s === 1 ? t("intOnly") : s + " " + t("pcs");
    if (tg === "jin" && s === 0.1) return "1 " + t("liang") + " = 0.1 " + t("jin");
    return s + " " + t(tg);
  }

  var lastResult = null;

  function renderResult() {
    var box = $("result");
    var info = unitInfo();
    var amount = num($("amount").value);
    lastResult = null;
    if (!info || !(amount > 0)) {
      box.innerHTML = '<div class="empty">' + esc(info ? t("enterValue") : t("noData")) + "</div>";
      return;
    }
    var w = info.w;

    // 原始值 / ค่าดิบ
    var raw = {};
    if (prefs.mode === "pcs") { raw.pcs = amount; raw.jin = amount * w; }
    else { raw.jin = prefs.mode === "kg" ? amount / KG_PER_JIN : amount; raw.pcs = raw.jin / w; }
    raw.kg = raw.jin * KG_PER_JIN;

    // 取整后 / ค่าที่ปัดแล้ว: 只取整所选的值，其他由它换算
    var tg = prefs.target;
    var rounding = tg !== "none";
    var r = raw;
    if (rounding) {
      var step = num(prefs.steps[tg]);
      r = {};
      if (tg === "pcs") { r.pcs = roundStep(raw.pcs, step, prefs.dir); r.jin = r.pcs * w; r.kg = r.jin * KG_PER_JIN; }
      else if (tg === "jin") { r.jin = roundStep(raw.jin, step, prefs.dir); r.kg = r.jin * KG_PER_JIN; r.pcs = r.jin / w; }
      else { r.kg = roundStep(raw.kg, step, prefs.dir); r.jin = r.kg / KG_PER_JIN; r.pcs = r.jin / w; }
    }

    var html = '<div class="res-grid">';
    if (prefs.mode === "pcs") {
      html += box2(t("calcVal"), fmt(raw.jin, 3), t("jin"), fmt(raw.kg, 3) + " " + t("kg"), false);
      if (rounding) html += box2(t("roundVal"), fmt(r.jin, 3), t("jin"), fmt(r.kg, 3) + " " + t("kg") + " · " + fmtPcs(r.pcs) + " " + t("pcs"), true);
    } else {
      html += box2(t("calcVal"), fmtPcs(raw.pcs), t("pcs"), fmt(raw.jin, 3) + " " + t("jin") + " · " + fmt(raw.kg, 3) + " " + t("kg"), false);
      if (rounding) html += box2(t("roundVal"), fmtPcs(r.pcs), t("pcs"), fmt(r.jin, 3) + " " + t("jin") + " · " + fmt(r.kg, 3) + " " + t("kg"), true);
    }
    html += "</div>";

    if (rounding) {
      var rows = [
        { k: "pcs", name: t("qtyName"), a: fmtPcs(raw.pcs), b: fmtPcs(r.pcs), d: r.pcs - raw.pcs, dd: 1 },
        { k: "jin", name: t("jinName"), a: fmt(raw.jin, 3), b: fmt(r.jin, 3), d: r.jin - raw.jin, dd: 3 },
        { k: "kg", name: t("kgName"), a: fmt(raw.kg, 3), b: fmt(r.kg, 3), d: r.kg - raw.kg, dd: 3 }
      ];
      html += '<table class="cmp"><thead><tr><th></th><th>' + esc(t("calcVal")) + "</th><th>" + esc(t("roundVal")) + "</th><th>" + esc(t("diff")) + "</th></tr></thead><tbody>" +
        rows.map(function (x) {
          var dTxt = Math.abs(x.d) < 1e-9 ? "0" : (x.d > 0 ? "+" : "") + fmt(x.d, x.dd);
          return '<tr class="' + (x.k === tg ? "target" : "") + '"><td>' + esc(x.name) + "</td><td>" + x.a + "</td><td>" + x.b + '</td><td class="' + (x.d > 1e-9 ? "pos" : "") + '">' + dTxt + "</td></tr>";
        }).join("") + "</tbody></table>";
    }

    html += '<div class="res-note">' + esc(t("perPiece")) + ": " + fmt(w, 6) + " " + esc(t("jin")) + " (" + fmt(w * 500, 3) + " " + esc(t("g")) + ")</div>";
    var f;
    if (prefs.mode === "pcs") {
      f = fmt(amount, 0) + " × " + info.perPcExpr + " = " + fmt(raw.jin, 4) + " " + t("jin") + " × 0.5 = " + fmt(raw.kg, 4) + " " + t("kg");
    } else {
      f = (prefs.mode === "kg" ? fmt(amount, 3) + " " + t("kg") + " ÷ 0.5 = " + fmt(raw.jin, 4) + " " + t("jin") + "; " : "") +
        fmt(raw.jin, 4) + " ÷ " + info.perPcExpr + " = " + fmt(raw.pcs, 2) + " " + t("pcs");
    }
    html += '<div class="formula">' + esc(t("formula")) + ": " + esc(f) + "</div>";
    html += '<div class="res-actions"><button type="button" class="ghost small" id="saveHist">' + esc(t("saveHist")) + "</button></div>";
    box.innerHTML = html;
    $("saveHist").onclick = addHistory;

    var inTxt = prefs.mode === "pcs" ? fmt(amount, 0) + " " + t("pcs") : fmt(amount, 3) + " " + t(prefs.mode);
    lastResult = {
      label: info.label,
      text: inTxt + " → " + fmtPcs(r.pcs) + " " + t("pcs") + " = " + fmt(r.jin, 3) + " " + t("jin") + " (" + fmt(r.kg, 3) + " " + t("kg") + ")"
    };
  }

  function box2(lbl, main, unit, sub, rounded) {
    return '<div class="res-box' + (rounded ? " rounded" : "") + '"><div class="lbl">' + esc(lbl) + '</div>' +
      '<div class="res-main">' + main + "<small>" + esc(unit) + "</small></div>" +
      '<div class="res-sub">' + esc(sub) + "</div></div>";
  }

  function addHistory() {
    if (!lastResult) return;
    var d = new Date();
    var time = String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
    history.unshift({ time: time, label: lastResult.label, text: lastResult.text });
    history = history.slice(0, 30);
    lsSet(LS.history, history);
    renderHistory();
  }
  function renderHistory() {
    var ul = $("historyList");
    if (!history.length) { ul.innerHTML = '<li class="muted">' + esc(t("noHistory")) + "</li>"; return; }
    ul.innerHTML = history.map(function (h) {
      return "<li><span><b>" + esc(h.label) + "</b> · " + esc(h.text) + '</span><span class="t">' + esc(h.time) + "</span></li>";
    }).join("");
  }

  /* ================= 数据表页 / table page ================= */
  function qtyRow(type, size, item, firstCell) {
    var ok = item.qty > 0;
    return '<tr class="click" data-act="' + type + '" data-size="' + esc(size) + '" data-item="' + esc(item.key) + '">' +
      "<td>" + esc(firstCell) + "</td>" +
      '<td class="' + (ok ? "" : "na") + '">' + (ok ? fmt(item.qty, 0) : esc(t("emptyCell"))) + "</td>" +
      "<td>" + (ok ? fmt(data.baseJin / item.qty * 500, 2) : "—") + "</td></tr>";
  }
  function tableHead(firstCol) {
    return "<table><thead><tr><th>" + esc(firstCol) + "</th><th>" + esc(t("thQty", { base: fmt(data.baseJin) })) + "</th><th>" + esc(t("thG")) + "</th></tr></thead><tbody>";
  }
  function washerCard(type, title, specCol) {
    var groups = catalog(type);
    if (!groups.length) return "";
    var multi = type !== "spring";
    var rows = groups.map(function (g) {
      if (!multi) return qtyRow(type, g.size, g.items[0], g.size);
      return '<tr class="sep"><td colspan="3">' + esc(g.size) + "</td></tr>" +
        g.items.map(function (it) { return qtyRow(type, g.size, it, it.label); }).join("");
    }).join("");
    return '<div class="card tcard"><h3>' + esc(title) + "</h3>" + tableHead(specCol) + rows + "</tbody></table></div>";
  }

  function renderTable() {
    var base = fmt(data.baseJin);
    $("tableNote").textContent = t("tableNote", { base: base });

    var items = [
      { v: "all", label: t("all") }, { v: "bolt", label: t("catBolt") },
      { v: "flat", label: t("flat") }, { v: "spring", label: t("spring") }, { v: "square", label: t("square") }
    ];
    $("tableFilter").innerHTML = items.map(function (it) {
      return '<button type="button" data-v="' + esc(it.v) + '" class="' + (tableFilter === it.v ? "on" : "") + '">' + esc(it.label) + "</button>";
    }).join("");
    $("tableFilter").onclick = function (e) {
      var b = e.target.closest("button"); if (!b) return;
      tableFilter = b.getAttribute("data-v"); renderTable();
    };
    function show(k) { return tableFilter === "all" || tableFilter === k; }

    var html = "";
    if (show("bolt")) {
      html += data.sizes.map(function (s) {
        var rows = s.bolts.map(function (b) {
          return qtyRow("bolt", s.size, { key: String(b[0]), qty: b[1] }, s.size + "×" + b[0]);
        }).join("");
        var nutOk = s.nutJin > 0;
        var nut = '<tr class="sep"><td colspan="3">' + esc(t("nutRow")) + "</td></tr>" +
          '<tr class="click" data-act="nut" data-size="' + esc(s.size) + '" data-item="">' +
          "<td>" + esc(t("nut")) + "</td>" +
          '<td class="' + (nutOk ? "" : "na") + '">' + (nutOk ? fmt(s.nutJin, 4) + " " + esc(t("thJinPc")) : esc(t("emptyCell"))) + "</td>" +
          "<td>" + (nutOk ? fmt(s.nutJin * 500, 1) : "—") + "</td></tr>";
        return '<div class="card tcard"><h3>' + esc(s.size) + "<span>" + esc(t("bolt")) + "</span></h3>" +
          tableHead(t("thLen")) + rows + nut + "</tbody></table></div>";
      }).join("");
    }
    if (show("flat")) html += washerCard("flat", t("tFlat"), t("thSpec"));
    if (show("spring")) html += washerCard("spring", t("tSpring"), t("thSpec"));
    if (show("square")) html += washerCard("square", t("tSquare"), t("thSpec"));

    if (show("bolt") && data.nutPacks && data.nutPacks.length) {
      html += '<div class="card tcard"><h3>' + esc(t("nutPacks")) + "</h3><table><thead><tr><th>" + esc(t("size")) + "</th><th>" +
        esc(t("thPack")) + "</th><th>" + esc(t("thG")) + "</th></tr></thead><tbody>" +
        data.nutPacks.map(function (p) {
          return "<tr><td>" + esc(p.size) + "</td><td>" + fmt(p.jin) + " / " + fmt(p.pcs, 0) + "</td><td>" + fmt(p.jin * 500 / p.pcs, 1) + "</td></tr>";
        }).join("") + "</tbody></table></div>";
    }
    $("tableGrid").innerHTML = html;
    $("tableGrid").onclick = function (e) {
      var tr = e.target.closest("tr.click"); if (!tr) return;
      prefs.type = tr.getAttribute("data-act");
      prefs.sel[prefs.type] = { size: tr.getAttribute("data-size"), item: tr.getAttribute("data-item") };
      savePrefs();
      showPage("calc");
      $("amount").focus();
    };
  }

  /* ================= 编辑页 / edit page ================= */
  function str(v) { return v == null ? "" : String(v); }
  function startDraft(src) {
    draft = normalize(clone(src || data));
    // 输入框用字符串保存，保存时再校验
    draft.sizes.forEach(function (s) {
      s.bolts = s.bolts.map(function (b) { return [str(b[0]), str(b[1])]; });
      s.nutJin = str(s.nutJin);
    });
    Object.keys(LIST_FIELD).forEach(function (k) {
      draft[LIST_FIELD[k]] = draft[LIST_FIELD[k]].map(function (r) { return [str(r[0]), str(r[1])]; });
    });
    draft.baseJin = str(draft.baseJin);
    dirty = !!src;
    if (!editSize || !sizeRec(editSize, draft)) editSize = draft.sizes.length ? draft.sizes[0].size : null;
  }
  function markDirty() { dirty = true; setMsg(t("unsaved"), false); }
  function setMsg(text, isErr) {
    var m = $("eMsg"); m.textContent = text || ""; m.className = "msg" + (isErr ? " err" : "");
  }

  function renderSource() {
    var el = $("eSource");
    if (usingCustom) {
      el.className = "info";
      el.innerHTML = t("srcLocal", { v: esc(fmtVer(data.version)), b: esc(fmtVer(data.baseVersion)) });
    } else if (fileUpdated) {
      el.className = "info new";
      el.innerHTML = t("srcFileNew", { v: esc(fmtVer(FILE_DATA.version)) });
    } else {
      el.className = "info";
      el.innerHTML = t("srcFile", { v: esc(fmtVer(FILE_DATA.version)) });
    }
    $("eRestore").hidden = !lsGet(LS.backup, null);
    $("eHowto").innerHTML = ["howto1", "howto2", "howto3", "howto4"].map(function (k) { return "<li>" + t(k) + "</li>"; }).join("");
  }

  function renderEdit() {
    if (!draft) startDraft();
    renderSource();
    $("eBaseJin").value = draft.baseJin;
    renderSeg($("eCatSeg"), [
      { v: "bolt", label: t("catBolt") }, { v: "flat", label: t("flat") },
      { v: "spring", label: t("spring") }, { v: "square", label: t("square") }
    ], editCat, function (v) { editCat = v; renderEdit(); });
    $("eSizeRow").hidden = editCat !== "bolt";
    $("eAddSizeCard").hidden = editCat !== "bolt";
    if (editCat === "bolt") renderEditBolts(); else renderEditList();
  }

  function renderEditBolts() {
    $("eSizeSel").innerHTML = draft.sizes.map(function (s) {
      return '<option value="' + esc(s.size) + '"' + (s.size === editSize ? " selected" : "") + ">" + esc(s.size) + "</option>";
    }).join("");
    var s = sizeRec(editSize, draft);
    var card = $("eSizeCard");
    if (!s) { card.innerHTML = ""; return; }

    var html = '<div class="cardhead"><h2>' + esc(s.size) + " · " + esc(t("bolt")) + '</h2><button type="button" class="danger small" id="eDelSize">' + esc(t("delSize")) + "</button></div>";
    html += '<table class="etable"><thead><tr><th>' + esc(t("length")) + "</th><th>" + esc(t("thQty", { base: draft.baseJin })) + "</th><th></th></tr></thead><tbody>";
    s.bolts.forEach(function (b, i) {
      html += '<tr><td><input type="text" inputmode="numeric" data-i="' + i + '" data-c="0" value="' + esc(b[0]) + '"></td>' +
        '<td><input type="text" inputmode="numeric" data-i="' + i + '" data-c="1" value="' + esc(b[1]) + '" placeholder="' + esc(t("emptyCell")) + '"></td>' +
        '<td><button type="button" class="iconbtn" data-del="' + i + '" aria-label="delete">×</button></td></tr>';
    });
    html += "</tbody></table>";
    html += '<div class="actions" style="margin-top:8px"><button type="button" class="ghost small" id="eAddRow">' + esc(t("addLen")) + "</button></div>";
    html += '<div class="grid2"><label class="field"><span>' + esc(t("nut")) + " · " + esc(t("thJinPc")) +
      '</span><input type="text" inputmode="decimal" data-nut="1" value="' + esc(s.nutJin) + '"></label></div>';
    card.innerHTML = html;

    card.oninput = function (e) {
      var el = e.target;
      if (el.hasAttribute("data-nut")) { s.nutJin = el.value; markDirty(); }
      else if (el.hasAttribute("data-i")) { s.bolts[Number(el.getAttribute("data-i"))][Number(el.getAttribute("data-c"))] = el.value; markDirty(); }
    };
    card.onclick = function (e) {
      var del = e.target.closest("[data-del]");
      if (del) { s.bolts.splice(Number(del.getAttribute("data-del")), 1); markDirty(); renderEdit(); return; }
      if (e.target.id === "eAddRow") {
        var last = s.bolts.length ? num(s.bolts[s.bolts.length - 1][0]) : 0;
        s.bolts.push([String((last > 0 ? last : 0) + 10), ""]);
        markDirty(); renderEdit(); focusLastRow(card);
        return;
      }
      if (e.target.id === "eDelSize") {
        if (!confirm(t("confirmDelSize", { size: s.size }))) return;
        draft.sizes = draft.sizes.filter(function (x) { return x !== s; });
        editSize = draft.sizes.length ? draft.sizes[0].size : null;
        markDirty(); renderEdit();
      }
    };
  }

  // 垫片表：两列 [规格, 数量] / ตารางแหวน: [สเปก, จำนวน]
  function renderEditList() {
    var list = draft[LIST_FIELD[editCat]];
    var card = $("eSizeCard");
    var isSpring = editCat === "spring";
    var html = '<div class="cardhead"><h2>' + esc(t(editCat)) + "</h2></div>";
    if (!isSpring) html += '<p class="muted">' + esc(t("specHint")) + "</p>";
    html += '<table class="etable"><thead><tr><th>' + esc(t("thSpec")) + "</th><th>" + esc(t("thQty", { base: draft.baseJin })) + "</th><th></th></tr></thead><tbody>";
    list.forEach(function (r, i) {
      html += '<tr><td><input type="text" data-i="' + i + '" data-c="0" value="' + esc(r[0]) + '" style="text-align:left"></td>' +
        '<td><input type="text" inputmode="numeric" data-i="' + i + '" data-c="1" value="' + esc(r[1]) + '" placeholder="' + esc(t("emptyCell")) + '"></td>' +
        '<td><button type="button" class="iconbtn" data-del="' + i + '" aria-label="delete">×</button></td></tr>';
    });
    html += "</tbody></table>";
    html += '<div class="actions" style="margin-top:8px"><button type="button" class="ghost small" id="eAddRow">' + esc(t("addRow")) + "</button></div>";
    card.innerHTML = html;

    card.oninput = function (e) {
      var el = e.target;
      if (el.hasAttribute("data-i")) { list[Number(el.getAttribute("data-i"))][Number(el.getAttribute("data-c"))] = el.value; markDirty(); }
    };
    card.onclick = function (e) {
      var del = e.target.closest("[data-del]");
      if (del) { list.splice(Number(del.getAttribute("data-del")), 1); markDirty(); renderEdit(); return; }
      if (e.target.id === "eAddRow") {
        list.push([isSpring ? "M" : "", ""]);
        markDirty(); renderEdit(); focusLastRow(card);
      }
    };
  }
  function focusLastRow(card) {
    var inputs = card.querySelectorAll('input[data-c="0"]');
    if (inputs.length) inputs[inputs.length - 1].focus();
  }

  // 校验草稿 → {data} 或 {err}
  function validateDraft() {
    var base = num(draft.baseJin);
    if (!(base > 0)) return { err: t("errBase") };
    var out = { version: "", baseJin: base, sizes: [], flatWashers: [], springWashers: [], squareWashers: [], nutPacks: draft.nutPacks || [] };
    for (var i = 0; i < draft.sizes.length; i++) {
      var s = draft.sizes[i];
      var rec = { size: s.size, nutJin: null };
      var nraw = String(s.nutJin).trim();
      if (nraw !== "") { var nv = num(nraw); if (!(nv > 0)) return { err: t("errNut", { size: s.size }) }; rec.nutJin = nv; }
      var seen = {};
      var bolts = [];
      for (var j = 0; j < s.bolts.length; j++) {
        var len = num(s.bolts[j][0]);
        if (!(len > 0) || seen[len]) return { err: t("errLen", { size: s.size }) };
        seen[len] = true;
        var qraw = String(s.bolts[j][1]).trim();
        var q = qraw === "" ? null : num(qraw);
        if (q !== null && !(q > 0)) return { err: t("errQty", { size: s.size, len: len }) };
        bolts.push([len, q]);
      }
      bolts.sort(function (a, b) { return a[0] - b[0]; });
      rec.bolts = bolts;
      out.sizes.push(rec);
    }
    out.sizes.sort(function (a, b) { return sizeNum(a.size) - sizeNum(b.size); });

    var cats = Object.keys(LIST_FIELD);
    for (var c = 0; c < cats.length; c++) {
      var cat = cats[c], field = LIST_FIELD[cat], rows = draft[field], used = {}, res = [];
      for (var k = 0; k < rows.length; k++) {
        var spec = String(rows[k][0]).trim().replace(/[x×X]/g, "*").replace(/\s+/g, "");
        var qr = String(rows[k][1]).trim();
        if (spec === "" && qr === "") continue;              // 空行忽略
        if (cat === "spring") {
          spec = normSize(spec);
          if (!spec || used[spec]) return { err: t("errSpring", { cat: t(cat), spec: rows[k][0] }) };
        } else {
          var parts = specParts(spec);
          if (!spec || parts.some(function (p) { return !(p > 0); }) || used[spec]) return { err: t("errSpec", { cat: t(cat), spec: rows[k][0] }) };
        }
        used[spec] = true;
        var qv = qr === "" ? null : num(qr);
        if (qv !== null && !(qv > 0)) return { err: t("errListQty", { cat: t(cat), spec: spec }) };
        res.push([spec, qv]);
      }
      res.sort(cat === "spring" ? function (a, b) { return sizeNum(a[0]) - sizeNum(b[0]); } : function (a, b) { return cmpSpec(a[0], b[0]); });
      out[field] = res;
    }
    return { data: out };
  }

  function nowVersion() {
    var d = new Date();
    function p(n) { return String(n).padStart(2, "0"); }
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + "T" + p(d.getHours()) + ":" + p(d.getMinutes()) + ":" + p(d.getSeconds());
  }

  // 生成与原 data.js 相同结构的文件内容（可直接替换后台文件）
  function buildDataJs(obj) {
    var json = JSON.stringify(obj, null, 2)
      // 每个 [a, b] 压成一行，同一列表放在同一行，方便阅读
      .replace(/\[\s*("[^"]*"|-?[\d.]+|null),\s*(-?[\d.]+|null)\s*\]/g, "[$1,$2]")
      .replace(/("(?:bolts|flatWashers|springWashers|squareWashers)": \[)([\s\S]*?)(\n\s*\])/g, function (m, a, body, c) {
        return a + body.replace(/\],\s*\[/g, "],[") + c;
      });
    return "/*\n" +
      " * NutWeigh 螺丝秤 — data.js\n" +
      " * 导出时间 / ส่งออกเมื่อ: " + obj.version + "\n" +
      " * 可直接替换网站文件夹中的 data.js / นำไปแทนไฟล์ data.js ในโฟลเดอร์เว็บได้ทันที\n" +
      " * 字段说明见 README.md / ดูคำอธิบายใน README.md\n" +
      " */\n" +
      "window.DEFAULT_DATA = " + json + ";\n";
  }

  function parseDataFile(text) {
    var txt = String(text).replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
    var obj = JSON.parse(txt.slice(txt.indexOf("{"), txt.lastIndexOf("}") + 1));
    if (!obj || !Array.isArray(obj.sizes)) throw new Error("bad");
    obj.sizes.forEach(function (s) { if (!s.size || !Array.isArray(s.bolts)) throw new Error("bad"); });
    return normalize(obj);
  }

  function bindEdit() {
    $("eBaseJin").oninput = function () { draft.baseJin = this.value; markDirty(); };
    $("eSizeSel").onchange = function () { editSize = this.value; renderEdit(); };
    $("eAddSize").onclick = function () {
      var name = normSize($("eNewSize").value);
      if (!name) return;
      if (sizeRec(name, draft)) { setMsg(t("sizeExists"), true); return; }
      draft.sizes.push({ size: name, nutJin: "", bolts: [["", ""]] });
      editSize = name; $("eNewSize").value = "";
      markDirty(); renderEdit();
    };
    $("eSave").onclick = function () {
      var r = validateDraft();
      if (r.err) { setMsg(r.err, true); return; }
      data = r.data;
      data.version = nowVersion();
      data.baseVersion = FILE_DATA.version;   // 记住基于哪个 data.js，后台替换后自动切换
      lsSet(LS.data, data);
      usingCustom = true; fileUpdated = false;
      startDraft(); renderEdit(); renderBanner();
      setMsg(t("saved"), false);
    };
    $("eDiscard").onclick = function () { startDraft(); renderEdit(); setMsg(t("discarded"), false); };
    $("eReset").onclick = function () {
      if (!confirm(t("confirmReset"))) return;
      lsDel(LS.data);
      data = clone(FILE_DATA);
      usingCustom = false;
      startDraft(); renderEdit(); renderBanner();
      setMsg(t("resetDone"), false);
    };
    $("eRestore").onclick = function () {
      var b = lsGet(LS.backup, null);
      if (!b) return;
      startDraft(b); renderEdit();
      setMsg(t("restored"), false);
    };
    $("eExport").onclick = function () {
      var r = validateDraft();
      if (r.err) { setMsg(r.err, true); return; }
      r.data.version = nowVersion();
      var blob = new Blob([buildDataJs(r.data)], { type: "text/javascript" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "data.js";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
      setMsg(t("exported"), false);
    };
    $("eImportBtn").onclick = function () { $("eImport").click(); };
    $("eImport").onchange = function () {
      var file = this.files && this.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        try {
          var obj = parseDataFile(reader.result);
          startDraft(obj);
          renderEdit();
          setMsg(t("imported", { f: file.name, v: fmtVer(obj.version) }), false);
        } catch (e) { setMsg(t("importErr"), true); }
      };
      reader.readAsText(file);
      this.value = "";
    };
  }

  /* ================= 页面 / pages ================= */
  function renderBanner() {
    var b = $("customBanner");
    b.hidden = !usingCustom && !fileUpdated;
    if (usingCustom) b.textContent = t("customBanner");
    else if (fileUpdated) b.textContent = t("srcFileNew", { v: fmtVer(FILE_DATA.version) });
  }

  function renderPage() {
    if (page === "calc") { renderCalcControls(); renderResult(); renderHistory(); }
    if (page === "table") renderTable();
    if (page === "edit") renderEdit();
  }
  function showPage(p) {
    page = p;
    ["calc", "table", "edit"].forEach(function (k) { $("page-" + k).hidden = k !== p; });
    document.querySelectorAll(".tabs button").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-page") === p); });
    renderPage();
    window.scrollTo(0, 0);
  }

  function applyLang() {
    document.documentElement.lang = lang === "th" ? "th" : "zh-CN";
    document.title = t("appTitle");
    document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    document.querySelectorAll(".lang button").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-lang") === lang); });
    renderBanner();
    var keepMsg = $("eMsg").textContent;
    var y = window.scrollY;
    renderPage();
    window.scrollTo(0, y);
    $("eMsg").textContent = keepMsg;
  }

  /* ================= 绑定 / wiring ================= */
  document.querySelectorAll(".lang button").forEach(function (b) {
    b.onclick = function () { lang = b.getAttribute("data-lang"); lsSet(LS.lang, lang); applyLang(); };
  });
  document.querySelectorAll(".tabs button").forEach(function (b) {
    b.onclick = function () { showPage(b.getAttribute("data-page")); };
  });

  $("sizeSel").onchange = function () {
    prefs.sel[prefs.type] = { size: this.value, item: null }; savePrefs(); rerender();
  };
  $("lenSel").onchange = function () {
    prefs.sel[prefs.type].item = this.value; savePrefs(); rerender();
  };
  $("amount").oninput = renderResult;
  $("amount").onkeydown = function (e) { if (e.key === "Enter") addHistory(); };
  $("stepInput").oninput = function () {
    var v = num(this.value);
    if (v > 0) { prefs.steps[prefs.target] = v; savePrefs(); }
    rerender();
    $("stepInput").focus();
  };
  $("clearHistory").onclick = function () { history = []; lsSet(LS.history, history); renderHistory(); };

  window.addEventListener("beforeunload", function (e) {
    if (dirty) { e.preventDefault(); e.returnValue = ""; }
  });

  bindEdit();
  applyLang();
  showPage("calc");
})();
