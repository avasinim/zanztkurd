/* ===== Avasin Standard — Lesson Copy Protection =====
   Prevent casual copying of lesson content. This is a browser-side deterrent,
   not DRM: determined users can still access delivered HTML/source. */
(function(){
  const lessonContent=document.querySelector(".lesson-content");
  if(!lessonContent)return;

  const isEditable=e=>e.target.closest("input,textarea,select,[contenteditable='true']");
  document.addEventListener("contextmenu",function(e){
    if(!isEditable(e) && e.target.closest(".lesson-content")) e.preventDefault();
  },true);
  document.addEventListener("copy",function(e){
    if(!isEditable(e) && e.target.closest(".lesson-content")) e.preventDefault();
  },true);
  document.addEventListener("cut",function(e){
    if(!isEditable(e) && e.target.closest(".lesson-content")) e.preventDefault();
  },true);
  document.addEventListener("dragstart",function(e){
    if(!isEditable(e) && e.target.closest(".lesson-content")) e.preventDefault();
  },true);
  document.addEventListener("keydown",function(e){
    if(isEditable(e))return;
    if(!e.target.closest(".lesson-content"))return;
    const k=String(e.key||"").toLowerCase();
    if((e.ctrlKey||e.metaKey)&&["c","x","a","u","s"].includes(k)){
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  },true);
})();

/* COURSE 2 HARD GATE — runs before the rest of the site script */
(function(){
  const F=Array.from({length:25},(_,i)=>"course-2-"+String(i+1).padStart(2,"0")+".html");
  const p=(location.pathname.split("/").pop()||"").toLowerCase(), n=F.indexOf(p);
  if(n<0)return;
  const K="zanztkurd_course2_completed_v2";
  const get=()=>{try{return new Set(JSON.parse(localStorage.getItem(K)||"[]").map(Number))}catch(e){return new Set()}};
  const put=s=>localStorage.setItem(K,JSON.stringify([...s].sort((a,b)=>a-b)));
  const first=()=>{const s=get();for(let i=0;i<F.length;i++)if(!s.has(i))return i;return F.length};
  const gate=()=>{
    const s=get(), f=first();
    if(n>f){location.replace(F[f]);return}
    if(!document.querySelector(".lesson-nav"))return;
    if(document.querySelector("[data-c2-hard-gate]"))return;
    const box=document.createElement("div");
    box.setAttribute("data-c2-hard-gate","");
    box.style.cssText="margin:28px 0;padding:22px;border:1px solid #d8d4c8;border-right:5px solid #b38a58;border-radius:14px;background:#f7f6f0";
    box.innerHTML="<h3>کۆتایی وانە</h3><p>بۆ کردنەوەی وانەی دواتر، سەرەتا ئەم وانەیە تەواو بکە.</p><button type='button'>✓ نیشان‌دان وەک تەواوکراو</button>";
    const nav=document.querySelector(".lesson-nav");
    nav.parentNode.insertBefore(box,nav);
    const b=box.querySelector("button");
    if(s.has(n)){b.disabled=true;b.textContent="✓ تەواوکراوە"}else b.onclick=()=>{const x=get();x.add(n);put(x);if(n+1<F.length)location.href=F[n+1]};
  };
  const block=e=>{
    const a=e.target.closest&&e.target.closest("a[href]");if(!a)return;
    const t=(a.getAttribute("href")||"").split("/").pop().split("?")[0].toLowerCase(), i=F.indexOf(t);
    if(i>n&&!get().has(n)){e.preventDefault();e.stopImmediatePropagation();gate()}
  };
  document.addEventListener("click",block,true);
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",gate);else gate();
})();
const menuBtn=document.getElementById("menuBtn"),mobileMenu=document.getElementById("mobileMenu");
menuBtn?.addEventListener("click",()=>mobileMenu?.classList.toggle("open"));
mobileMenu?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>mobileMenu.classList.remove("open")));

const cards=[...document.querySelectorAll(".lesson-card")], searchInput=document.getElementById("searchInput"), level=document.getElementById("levelFilter"), topic=document.getElementById("topicFilter"), count=document.getElementById("resultCount"), empty=document.getElementById("empty");

function applyFilters(){
  if(!searchInput||!level||!topic||!count||!empty) return;
  const q=searchInput.value.trim().toLowerCase(), lv=level.value, tp=topic.value;
  let shown=0;
  cards.forEach(card=>{
    const title=(card.dataset.title||"").toLowerCase(), cardTopic=card.dataset.topic||"", cardLevel=card.dataset.level||"";
    const ok=(!q||title.includes(q)||card.textContent.toLowerCase().includes(q))&&(!lv||cardLevel===lv)&&(!tp||cardTopic===tp);
    card.style.display=ok?"":"none"; if(ok) shown++;
  });
  count.textContent=`${shown} وانە`; empty.style.display=shown?"none":"block";
}
document.getElementById("lessonSearch")?.addEventListener("submit",e=>{e.preventDefault();applyFilters();document.getElementById("lessons")?.scrollIntoView({behavior:"smooth"})});
[searchInput,level,topic].filter(Boolean).forEach(x=>x.addEventListener("input",applyFilters));
document.querySelectorAll(".chip").forEach(chip=>chip.addEventListener("click",()=>{
  document.querySelectorAll(".chip").forEach(c=>c.classList.remove("active")); chip.classList.add("active");
  if(topic) topic.value=chip.dataset.topic||""; applyFilters();
}));
document.querySelector(".newsletter button")?.addEventListener("click",()=>{
  const input=document.querySelector(".newsletter input");
  if(!input.value.trim()){input.focus();return}
  input.value="";input.placeholder="بە سەرکەوتویی تۆمار کرا ✓";
});

const placeholderInfo = {
  "هەمو کتێبەکان ←":["کتێبخانە","لە وەشانی داهاتو هەمو کتێبەکان لەگەڵ زانیاریی نوسەر، بابەت، نرخ و شێوازی بەدەستهێنان لێرە دەردەکەون."],
  "دەستپێکردن ←":["کوردی بۆ سەرەتاییان","ڕێڕەوێکی سەرەتایی بۆ ئەلفوبێ، وشەکانی ڕۆژانە و دروستکردنی ڕستە."],
  "بینینی ڕێڕەو ←":["ڕێڕەوی فێربون","ڕێڕەوی هەڵبژێردراو بۆ فێربونی زمانی کوردی و زمانەوانی."],
  "پرسیارە باوەکان":["پرسیارە باوەکان","زانیارییە باوەکان لەسەر فێربون و بەکارهێنانی ئاڤاشین لەم بەشەدا کۆدەکرێنەوە."],
  "پەیوەندی":["پەیوەندی","بەشی پەیوەندیکردن لە وەشانی داهاتو بە زانیاریی پەیوەندیی تەواو زیاد دەکرێت."],
  "مەرجەکان":["مەرجەکان","مەرج و یاساکانی بەکارهێنانی پلاتفۆرم لە وەشانی داهاتو بە شێوەی تەواو دادەنرێن."]
};
document.querySelectorAll('a[href="#"]').forEach(a=>{
  a.addEventListener("click",e=>{
    e.preventDefault();
    const label=(a.textContent||"").trim();
    const item=placeholderInfo[label] || ["ئاڤاشین","ئەم بەشە هێشتا لە قۆناغی پەرەپێدانە."];
    openInfo(item[0],item[1]);
  });
});

document.querySelectorAll(".primary-btn").forEach(btn=>{
  const label=(btn.textContent||"").trim();
  if(label==="دەستپێکردن" || label==="چونەژورەوە"){
    btn.addEventListener("click",()=>{
      openInfo(label, label==="دەستپێکردن"
        ? "لە ئێستادا دەتوانیت وانەکان ببینیت و بەشەکانی سایت بپشکنیت. سیستەمی هەژمار لە قۆناغی داهاتودا زیاد دەکرێت."
        : "سیستەمی چونەژورەوە لە قۆناغی داهاتودا زیاد دەکرێت.");
    });
  }
});

const infoModal=document.getElementById("siteInfoModal");
const infoTitle=document.getElementById("siteInfoTitle");
const infoEyebrow=document.getElementById("siteInfoEyebrow");
const infoText=document.getElementById("siteInfoText");

function openInfo(title,text,eyebrow="ئاڤاشین"){
  if(!infoModal) return;
  infoTitle.textContent=title;
  infoText.textContent=text;
  infoEyebrow.textContent=eyebrow;
  infoModal.classList.add("open");
  infoModal.setAttribute("aria-hidden","false");
  document.body.classList.add("modal-open");
}
function closeInfo(){
  if(!infoModal) return;
  infoModal.classList.remove("open");
  infoModal.setAttribute("aria-hidden","true");
  document.body.classList.remove("modal-open");
}
infoModal?.querySelectorAll("[data-close-info]").forEach(el=>el.addEventListener("click",closeInfo));
document.addEventListener("keydown",e=>{if(e.key==="Escape" && infoModal?.classList.contains("open")) closeInfo();});

document.querySelectorAll("[data-book]").forEach((btn,i)=>{
  const books=[
    ["کتێبەکانی ئاڤاشین","ئەم بەشە بۆ ناساندن و پێشاندانی کتێبە پەیوەندیدارەکان بە زمانی کوردییە. لینک و زانیاریی وردی هەر کتێب لە وەشانی داهاتو زیاد دەکرێت.","کتێب"],
    ["کتێبی ڕێزمانی کوردی","پێشکەشکردنی زانیاریی کتێب، نوسەر، بابەت و شێوازی بەدەستهێنانی کتێب لەم شوێنەدا دەبێت.","کتێب"],
    ["سەرچاوەکانی زمانەوانی","کۆمەڵێک سەرچاوە و کتێبی زمانەوانی بۆ خوێندکاران و خوێنەران.","کتێب"]
  ];
  const item=books[Math.min(i,books.length-1)];
  btn.addEventListener("click",()=>openInfo(item[0],item[1],item[2]));
});

document.querySelectorAll('a[href="#"]').forEach(a=>{
  a.addEventListener("click",e=>{
    e.preventDefault();
    const label=(a.textContent||"").trim();
    if(label) openInfo(label,"ئەم بەشە هێشتا لە قۆناغی پەرەپێدانە. لە وەشانی داهاتودا بە ناوەڕۆکی تەواو پڕ دەکرێت.");
  });
});

/* ===== V2 home lesson search ===== */
(function(){
  const input=document.getElementById("homeLessonSearchInput");
  const form=document.getElementById("homeSearchForm");
  const results=document.getElementById("homeSearchResults");
  const count=document.getElementById("homeSearchCount");
  const clear=document.getElementById("homeSearchClear");
  if(!input||!form||!results||!count) return;
  let lessons=[];

  function normalize(value){ return String(value||"").toLocaleLowerCase("ckb"); }

  function lessonUrl(item){
    const raw=String(item.pagePath||item.path||"");
    if(raw.endsWith(".html")) return "lessons/"+raw;
    const n=Number(item.originalNumber||item.number);
    return Number.isFinite(n) ? "lessons/"+String(n).padStart(3,"0")+".html" : "lessons/catalog.html";
  }

  function render(query){
    const q=normalize(query||"").trim();
    const filtered=q ? lessons.filter(function(item){
      return normalize(item.title).includes(q) || normalize(item.sectionTitle).includes(q) || normalize(item.courseTitle).includes(q);
    }) : lessons;
    count.textContent=String(filtered.length)+" وانە"+(q ? " دۆزرایەوە" : "ی بەردەست");

    if(!filtered.length){
      results.innerHTML='<div class="v2-search-empty">هیچ وانەیەک بەو وشەیە نەدۆزرایەوە. وشەیەکی تر تاقی بکەرەوە.</div>';
      return;
    }

    results.innerHTML=filtered.slice(0,6).map(function(item){
      return '<a class="v2-search-result" href="'+lessonUrl(item)+'">'
        +'<div class="v2-search-result-top"><span class="v2-search-number">وانەی '+(item.courseLessonNumber||item.number)+'</span><span class="v2-search-course">'+(item.courseTitle||"فۆنێتیک و فۆنۆلۆجی کوردیک")+'</span></div>'
        +'<b>'+item.title+'</b>'
        +'<small>'+(item.sectionTitle||"وانەی سەرچاوە")+' · سابیر ژاکاو</small>'
        +'</a>';
    }).join("");
  }

  fetch("lessons/index.json?v=20261004")
    .then(function(r){if(!r.ok) throw new Error("index"); return r.json();})
    .then(function(data){
      const courseMap=Object.fromEntries((data.courses||[]).map(function(c){return [c.id,c];}));
      const expanded=(data.sections||[]).flatMap(function(section){
        return (section.lessons||[]).map(function(item){
          const course=courseMap[item.courseId||section.courseId]||{};
          return Object.assign({},item,{
            sectionTitle:section.title,
            courseId:item.courseId||section.courseId||"",
            courseNumber:Number(course.number||999),
            courseTitle:course.title||"فۆنێتیک و فۆنۆلۆجی کوردیک"
          });
        });
      });
      const unique=new Map();
      expanded.forEach(function(item){
        const key=(item.courseId||"course")+"/"+String(item.courseLessonNumber||item.number);
        if(!unique.has(key)) unique.set(key,item);
      });
      lessons=Array.from(unique.values());
      lessons.sort(function(a,b){
        return (Number(a.courseNumber)||999)-(Number(b.courseNumber)||999)
          || (Number(a.courseLessonNumber||a.number)||999)-(Number(b.courseLessonNumber||b.number)||999);
      });
      render(input.value);
    })
    .catch(function(){
      count.textContent="کاتەلۆگی وانەکان بار نەکرا";
      results.innerHTML='<a class="v2-search-empty" href="lessons/catalog.html">بۆ بینینی وانەکان بچۆ بۆ کاتەلۆگی وانەکان ←</a>';
    });

  input.addEventListener("input",function(){render(input.value);});
  form.addEventListener("submit",function(e){e.preventDefault();render(input.value);});
  if(clear) clear.addEventListener("click",function(){input.value="";render("");input.focus();});
})();

/* ===== Contextual academic lesson tags ===== */
(function(){
  const tagsByLesson={
  "1": [
    "ئەلفبێ و ڕێنوس",
    "پیت و گرافیم",
    "فۆن و واچ",
    "بنەماکانی زمان‌ناسی"
  ],
  "2": [
    "ئەلفبێی کوردیک",
    "ئەلفبێی هەورامی",
    "ڕێنوس",
    "پیت و دەنگ"
  ],
  "3": [
    "ئەلفبێی کەڵهوڕی",
    "بازنەی باشور",
    "پیت و فۆن",
    "جۆراوجۆری ڕێنوس"
  ],
  "4": [
    "ئەلفبێی بازنەی باکور",
    "ڕێنوسی کوردیک",
    "پیت و گرافیم",
    "سیستەمی نوسین"
  ],
  "5": [
    "ئەلفبێی گشتی کوردیک",
    "بزوێنەکان",
    "نەبزوێنەکان",
    "پیت و دەنگ"
  ],
  "6": [
    "نگاری پیتەکان",
    "پیتی لکاو",
    "پیتی نەلکاو",
    "گرافیم و ڕێنوس"
  ],
  "7": [
    "جەدوەلی ئەلفبێ",
    "پیتەکانی کوردیک",
    "پەیوەندی پیت و فۆن",
    "ڕێنوس"
  ],
  "8": [
    "ڕێنوسی کوردیک",
    "بنەماکانی ڕێنوس",
    "نوسین و دەنگ",
    "سیستەمی نوسین"
  ],
  "9": [
    "پیتی (ئـ)",
    "فۆنێتیک",
    "فۆنۆلۆجی",
    "دۆخی فۆنێتیکی و فۆنۆلۆجی"
  ],
  "10": [
    "پیتی (ئـ)",
    "فۆنێتیک",
    "فۆنۆلۆجی",
    "بەشی دوەمی وانەی ٩"
  ],
  "11": [
    "پیتەکانی (ب، پ، ت)",
    "فۆنێتیک",
    "سازگەی بەرهەم‌هێنانی فۆن",
    "نەبزوێن"
  ],
  "12": [
    "پیتەکانی (خ، ج، چ، ح)",
    "فۆنێتیک",
    "شوێنی بەرهەم‌هێنان",
    "شی‌کردنەوەی فۆنێتیکی"
  ],
  "13": [
    "پیتەکانی (د، ز، ژ)",
    "فۆنێتیک",
    "سازگەی فۆن",
    "نەبزوێنەکان"
  ],
  "14": [
    "پیتەکانی (س، ش)",
    "فۆنێتیک",
    "تایبەتمەندی فۆنەکان",
    "شی‌کردنەوەی فۆنێتیکی"
  ],
  "15": [
    "پیتەکانی (ر، ڕ)",
    "فۆنێتیک",
    "فۆنۆلۆجی",
    "جیاوازی دەنگی"
  ],
  "16": [
    "پیتەکانی (ع، غ)",
    "فۆنێتیک",
    "فۆنۆلۆجی",
    "جۆری بەرهەم‌هێنانی دەنگ"
  ],
  "17": [
    "پیتەکانی (ف، ڤ، ق)",
    "فۆنێتیک",
    "لێکچوونی فۆنۆلۆجی",
    "سازگەی دەنگ"
  ],
  "18": [
    "پیتەکانی (ک، گ)",
    "فۆنێتیک",
    "لێکچوونی فۆنێتیکی",
    "پێشخستنی دەنگی"
  ],
  "19": [
    "فۆنێم /ڵ/ و /ل/",
    "فۆنێتیک",
    "فۆنۆلۆجی",
    "گۆڕانی دەنگ"
  ],
  "20": [
    "پیتی (ێ، ە)",
    "بزوێنەکان",
    "فۆنێتیک",
    "فۆنۆلۆجی"
  ],
  "21": [
    "پیتی (ێ)",
    "بزوێن",
    "فۆنێتیک",
    "فۆنۆلۆجی"
  ],
  "22": [
    "پیتی (ی)",
    "بزوێن",
    "ڕێنوس",
    "فۆنێتیک و فۆنۆلۆجی"
  ],
  "23": [
    "پیتی (و)",
    "بزوێن و نەبزوێن",
    "ڕێنوس",
    "فۆنێتیک و فۆنۆلۆجی"
  ],
  "24": [
    "پیتی (ه)",
    "فۆن /ه/",
    "فۆنێتیک",
    "سازگەی بەرهەم‌هێنان"
  ],
  "25": [
    "شوا (ə)",
    "بزرۆکە",
    "فۆنێتیک",
    "فۆنۆلۆجی"
  ],
  "26": [
    "خاڵبەندی",
    "ڕێنوس",
    "نیشانەکانی نوسین",
    "سیستەمی نوسین"
  ],
  "201": [
    "فۆنێتیک",
    "ئەندامەکانی ئاخاڤتن",
    "بەرهەم‌هێنانی دەنگ",
    "فۆنێتیکی ئاخاڤتن"
  ],
  "202": [
    "فۆنێتیک",
    "جۆرەکانی دەنگ",
    "تایبەتمەندی فۆن",
    "شی‌کردنەوەی دەنگ"
  ],
  "203": [
    "فۆنێم",
    "فۆنۆلۆجی",
    "واچ و ئەلۆفۆن",
    "سیستەمی فۆنۆلۆجی"
  ],
  "204": [
    "گۆڕان‌کاری فۆنۆلۆجی",
    "پەیوەندی دەنگەکان",
    "فۆنۆلۆجی",
    "پڕۆسەی دەنگی"
  ],
  "205": [
    "بزوێن",
    "نەبزوێن",
    "سیستەمی دەنگ",
    "فۆنێتیک و فۆنۆلۆجی"
  ],
  "206": [
    "سیلاب",
    "پێکهاتەی وشە",
    "فۆنۆلۆجی",
    "ساختاری سیلاب"
  ],
  "207": [
    "پڕۆسۆدی",
    "تیشک‌خستن",
    "ئاواز",
    "ڕێتمی ئاخاڤتن"
  ],
  "208": [
    "سیستەمی نوسین",
    "پیت",
    "فۆن",
    "فۆنێم"
  ],
  "209": [
    "ئەلفبێی فۆنێتیکی نێودەوڵەتی",
    "IPA",
    "نوسینەوەی دەنگ",
    "فۆنێتیک"
  ],
  "210": [
    "ئەکوستیک",
    "سیگناڵی دەنگ",
    "فۆرمەنت",
    "شی‌کردنەوەی ئەکوستیکی"
  ],
  "211": [
    "ئەندامەکانی ئاخاڤتن",
    "میکانیزمی بەرهەم‌هێنان",
    "فۆنێتیکی بەرهەم‌هێنان",
    "دەنگ"
  ],
  "212": [
    "بزوێنەکان",
    "فۆرمەنت",
    "F1 و F2",
    "شی‌کردنەوەی ئەکوستیکی"
  ],
  "213": [
    "نەبزوێنەکان",
    "شوێنی بەرهەم‌هێنان",
    "شێوازی بەرهەم‌هێنان",
    "فۆنێتیک"
  ],
  "214": [
    "فۆنێم",
    "ئەلۆفۆن",
    "دابەشکردنی فۆنێمی",
    "فۆنۆلۆجی"
  ],
  "215": [
    "گۆڕان‌کاری فۆنۆلۆجی",
    "پەیوەندی دەنگەکان",
    "پڕۆسە فۆنۆلۆجیەکان",
    "فۆنۆلۆجی"
  ],
  "216": [
    "سیلاب",
    "پێکهاتەی وشە",
    "Onset و Rhyme",
    "کۆدای سیلاب"
  ],
  "217": [
    "پڕۆسۆدی",
    "تیشک‌خستن",
    "ئاواز",
    "ڕێتم"
  ],
  "218": [
    "فۆنێتیکی بیستن",
    "درک‌کردنی دەنگ",
    "بیستن و زمان",
    "پڕۆسەی درکی"
  ],
  "219": [
    "جۆراوجۆری فۆنێتیکی",
    "جۆراوجۆری فۆنۆلۆجی",
    "ئاخاڤتن",
    "گۆڕینی دەنگ"
  ],
  "220": [
    "ئاخاڤتنی بەردەوام",
    "پڕۆسە فۆنێتیکی",
    "پڕۆسە فۆنۆلۆجی",
    "کۆئارتیکولەیشن"
  ],
  "221": [
    "فۆنێتیک",
    "ئەکوستیک",
    "فۆنۆلۆجی",
    "شی‌کردنەوەی دەنگ"
  ],
  "222": [
    "توێژینەوەی فۆنێتیکی",
    "توێژینەوەی ئەکوستیکی",
    "ئامرازەکانی پێوانەکردن",
    "داتا و شی‌کردنەوە"
  ],
  "223": [
    "کۆئارتیکولەیشن",
    "گۆڕان‌کاری فۆنێتیکی",
    "ئاخاڤتنی بەردەوام",
    "پڕۆسەی دەنگی"
  ],
  "224": [
    "سیستەمی فۆنێتیکی",
    "سیستەمی فۆنۆلۆجی",
    "شی‌کردنەوەی سیستەماتیک",
    "ڕێک‌خستن"
  ]
};
  const path=window.location.pathname.split("/").pop()||"";
  const m=path.match(/^course-2-(\d+)\.html$/);
  let key=null;
  if(m) key=200+Number(m[1]);
  else {
    const n=Number((path.match(/(\d+)\.html$/)||[])[1]);
    const course1={17:1,18:2,19:3,20:4,21:5,22:6,23:7,24:8,25:9,26:10,27:11,28:12,29:13,30:14,31:15,32:16,33:17,34:18,35:19,36:20,37:21,45:24,58:26};
    if(course1[n]) key=course1[n];
    else if(n>=38&&n<=44) key=22;
    else if(n>=46&&n<=51) key=23;
    else if(n>=52&&n<=57) key=25;
  }
  const labels=tagsByLesson[key];
  if(!labels) return;
  document.querySelectorAll(".lesson-content").forEach(function(content){
    const source=content.querySelector(".lesson-copy-note");
    if(!source) return;
    [...content.children].forEach(function(el){
      if(el!==source && el.querySelector && el.querySelector(".v2-pill")) el.remove();
    });
    const wrap=document.createElement("div");
    wrap.className="lesson-academic-tags";
    wrap.setAttribute("aria-label","پۆلەکانی وانە");
    wrap.style.cssText="display:flex;gap:.6rem;flex-wrap:wrap;margin:0 0 1rem";
    labels.forEach(function(label){
      const pill=document.createElement("span");
      pill.className="v2-pill";
      pill.textContent=label;
      wrap.appendChild(pill);
    });
    source.insertAdjacentElement("afterend",wrap);
  });
})();


/* ===== سەرچاوەی یەکگرتووی وانەکان — Avasin Standard ===== */
(function(){
  const SOURCE_TEXT="سەرچاوە: سابیر ژاکاو · *فۆنێتیک و فۆنۆلۆجی کوردیک*";
  const candidates=[...document.querySelectorAll(".lesson-content p, .lesson-content div, .lesson-content footer, article p, article div, article footer")];
  const matches=candidates.filter(function(el){
    const t=(el.textContent||"").replace(/\s+/g," ").trim();
    return /^سەرچاوە(?:ی وانە)?\s*[:：]/.test(t) &&
      /سابیر ژاکاو/.test(t) &&
      /فۆنێتیک و فۆنۆلۆجی کوردیک/.test(t) &&
      !el.querySelector("p,div,footer");
  });
  if(!matches.length) return;
  matches.slice(0,-1).forEach(function(el){el.remove();});
  const source=matches[matches.length-1];
  source.innerHTML="سەرچاوە: سابیر ژاکاو · <em>فۆنێتیک و فۆنۆلۆجی کوردیک</em>";
  source.classList.add("lesson-source-final");
})();



/* ===== Course 2 sequential completion gate ===== */
(function(){
  const COURSE2_FILES=Array.from({length:25},function(_,i){
    return "course-2-"+String(i+1).padStart(2,"0")+".html";
  });
  const STORAGE="zanztkurd_course2_completed_v2";
  const path=(location.pathname.split("/").pop()||"").toLowerCase();
  const current=COURSE2_FILES.indexOf(path);

  function done(){
    try{return new Set(JSON.parse(localStorage.getItem(STORAGE)||"[]").map(Number));}
    catch(e){return new Set();}
  }
  function save(s){
    localStorage.setItem(STORAGE,JSON.stringify([...s].sort(function(a,b){return a-b;})));
  }
  function firstIncomplete(){
    const s=done();
    for(let i=0;i<COURSE2_FILES.length;i++) if(!s.has(i)) return i;
    return COURSE2_FILES.length;
  }
  function url(i){
    return document.querySelector(".learning-sequence") ?
      "lessons/"+COURSE2_FILES[i] : COURSE2_FILES[i];
  }
  function styles(){
    if(document.getElementById("course2-gate-styles"))return;
    const s=document.createElement("style");
    s.id="course2-gate-styles";
    s.textContent=".course2-gate{margin:28px 0 8px;padding:22px;border:1px solid rgba(39,61,50,.14);border-right:4px solid #b38a58;border-radius:14px;background:#f7f6f0;box-shadow:0 10px 28px rgba(27,42,35,.06)}.course2-gate h3{margin:0 0 8px;color:#26372f;font-size:1.12rem}.course2-gate p{margin:0 0 14px;color:#66716b;line-height:1.9}.course2-complete-btn{display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:10px;padding:11px 18px;background:#273f34;color:#fff;font:800 .95rem inherit;cursor:pointer}.course2-complete-btn[disabled]{opacity:.55;cursor:not-allowed}.course2-locked-link{opacity:.48!important;cursor:not-allowed!important;filter:grayscale(.35)}";
    document.head.appendChild(s);
  }
  function lessonGate(){
    if(current<0)return;
    styles();
    const s=done(),first=firstIncomplete();
    if(current>first){location.replace(url(first));return;}
    const nav=document.querySelector(".lesson-nav");
    if(!nav||nav.parentElement.querySelector(".course2-gate"))return;
    const gate=document.createElement("div");
    gate.className="course2-gate";
    const already=s.has(current),next=current+1<COURSE2_FILES.length?current+1:null;
    gate.innerHTML="<h3>"+(already?"ئەم وانە پێشتر تەواوکراوە.":"کۆتایی وانە")+"</h3><p>"+(already?"وانەی دواتر کراوەتەوە.":"دوای خوێندنەوەی تەواوی ناوەڕۆک، ئەم وانەیە وەک تەواوکراو نیشان بدە بۆ کردنەوەی وانەی دواتر.")+"</p><button class=\"course2-complete-btn\" type=\"button\" "+(already?"disabled":"")+">"+(already?"✓ تەواوکراوە":"✓ نیشان‌دان وەک تەواوکراو")+"</button>";
    nav.parentElement.insertBefore(gate,nav);
    gate.querySelector("button").addEventListener("click",function(){
      const latest=done();
      latest.add(current);
      save(latest);
      this.disabled=true;
      this.textContent="✓ تەواوکراوە";
      gate.querySelector("h3").textContent="وانەکە بە سەرکەوتوویی تەواو کرا.";
      gate.querySelector("p").textContent=next!==null?"وانەی دواتر ئێستا کراوەتەوە.":"هەمو وانەکانی کۆرسی ٢ تەواو کراون.";
      if(next!==null)setTimeout(function(){location.href=url(next);},650);
    });
  }
  function navGate(){
    if(current<0)return;
    document.addEventListener("click",function(ev){
      const a=ev.target.closest("a[href]");
      if(!a)return;
      const href=(a.getAttribute("href")||"").split("?")[0].split("#")[0];
      const target=href.split("/").pop().toLowerCase();
      const targetIndex=COURSE2_FILES.indexOf(target);
      if(targetIndex<0||targetIndex<=current)return;
      const latest=done();
      if(!latest.has(current)){
        ev.preventDefault();
        ev.stopImmediatePropagation();
        const gate=document.querySelector(".course2-gate");
        if(gate)gate.scrollIntoView({behavior:"smooth",block:"center"});
      }
    },true);
  }
  function learningGate(){
    const links=document.querySelectorAll('a[href*="lessons/course-2-"]');
    if(!links.length)return;
    styles();
    const first=firstIncomplete();
    links.forEach(function(a){
      const m=(a.getAttribute("href")||"").match(/course-2-(\d+)\.html$/);
      if(!m)return;
      const i=Number(m[1])-1;
      if(i>first){
        a.classList.add("course2-locked-link");
        a.setAttribute("aria-disabled","true");
        a.setAttribute("tabindex","-1");
        a.dataset.course2Locked="true";
        a.title="سەرەتا وانەی پێشوو تەواو بکە";
      }else{
        a.classList.remove("course2-locked-link");
        a.removeAttribute("aria-disabled");
        a.removeAttribute("tabindex");
        delete a.dataset.course2Locked;
      }
    });
    document.addEventListener("click",function(ev){
      const a=ev.target.closest&&ev.target.closest('a[href]');
      if(!a||a.dataset.course2Locked!=="true")return;
      ev.preventDefault();
      ev.stopImmediatePropagation();
    },true);
  }
  lessonGate();
  navGate();
  learningGate();
})();

/* ===== Course 1 sequential completion gate ===== */
(function(){
  const COURSE1_FILES=["017.html","018.html","019.html","020.html","021.html","022.html","023.html","024.html","025.html","026.html","027.html","028.html","029.html","030.html","031.html","032.html","033.html","034.html","035.html","036.html","037.html","038.html","039.html","040.html","041.html","042.html","043.html","044.html","046.html","047.html","048.html","049.html","050.html","051.html","045.html","052.html","053.html","054.html","055.html","056.html","057.html","058.html"];
  const STORAGE="zanztkurd_course1_completed_v2";
  const path=(location.pathname.split("/").pop()||"").toLowerCase();
  const current=COURSE1_FILES.indexOf(path);
  function done(){try{return new Set(JSON.parse(localStorage.getItem(STORAGE)||"[]").map(Number));}catch(e){return new Set();}}
  function save(s){localStorage.setItem(STORAGE,JSON.stringify([...s].sort(function(a,b){return a-b;})));}
  function firstIncomplete(){const s=done();for(let i=0;i<COURSE1_FILES.length;i++)if(!s.has(i))return i;return COURSE1_FILES.length;}
  function url(i){return document.querySelector(".learning-sequence") ? "lessons/"+COURSE1_FILES[i] : COURSE1_FILES[i];}
  function styles(){
    if(document.getElementById("course1-gate-styles"))return;
    const s=document.createElement("style");s.id="course1-gate-styles";
    s.textContent=".course1-gate{margin:28px 0 8px;padding:22px;border:1px solid rgba(39,61,50,.14);border-right:4px solid #b38a58;border-radius:14px;background:#f7f6f0;box-shadow:0 10px 28px rgba(27,42,35,.06)}.course1-gate h3{margin:0 0 8px;color:#26372f;font-size:1.12rem}.course1-gate p{margin:0 0 14px;color:#66716b;line-height:1.9}.course1-complete-btn{display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:10px;padding:11px 18px;background:#273f34;color:#fff;font:800 .95rem inherit;cursor:pointer}.course1-complete-btn[disabled]{opacity:.55;cursor:not-allowed}.course1-locked-link{opacity:.48!important;cursor:not-allowed!important;filter:grayscale(.35)}";
    document.head.appendChild(s);
  }
  function lessonGate(){
    if(current<0)return;
    styles();
    const s=done(),first=firstIncomplete();
    if(current>first){location.replace(url(first));return;}
    const nav=document.querySelector(".lesson-nav");if(!nav||nav.parentElement.querySelector(".course1-gate"))return;
    const gate=document.createElement("div");gate.className="course1-gate";
    const already=s.has(current),next=current+1<COURSE1_FILES.length?current+1:null;
    gate.innerHTML="<h3>"+(already?"ئەم وانە/بەش پێشتر تەواوکراوە.":"کۆتایی وانە/بەش")+"</h3><p>"+(already?"بەشی دواتر کراوەتەوە.":"دوای خوێندنەوەی تەواوی ناوەڕۆک، ئەم وانە/بەشە وەک تەواوکراو نیشان بدە بۆ کردنەوەی بەشی دواتر.")+"</p><button class=\"course1-complete-btn\" type=\"button\" "+(already?"disabled":"")+">"+(already?"✓ تەواوکراوە":"✓ نیشان‌دان وەک تەواوکراو")+"</button>";
    nav.parentElement.insertBefore(gate,nav);
    gate.querySelector("button").addEventListener("click",function(){
      const latest=done();latest.add(current);save(latest);this.disabled=true;this.textContent="✓ تەواوکراوە";
      gate.querySelector("h3").textContent="وانەکە بە سەرکەوتوویی تەواو کرا.";
      gate.querySelector("p").textContent=next!==null?"بەشی دواتر ئێستا کراوەتەوە.":"هەمو بەشەکانی ڕێڕەوی کۆرسی ١ تەواو کراون.";
      if(next!==null)setTimeout(function(){location.href=url(next);},650);
    });
  }
  function navGate(){
    if(current<0)return;
    const links=document.querySelectorAll(".lesson-nav a[href]");
    links.forEach(function(a){
      const href=(a.getAttribute("href")||"").split("?")[0].split("#")[0];
      const target=href.split("/").pop().toLowerCase();
      const targetIndex=COURSE1_FILES.indexOf(target);
      if(targetIndex<0)return;
      a.addEventListener("click",function(ev){
        const latest=done();
        if(targetIndex>current && !latest.has(current)){
          ev.preventDefault();
          ev.stopImmediatePropagation();
          const gate=document.querySelector(".course1-gate");
          if(gate) gate.scrollIntoView({behavior:"smooth",block:"center"});
        }
      });
    });

    /* Hard-stop every forward Course-1 link, even if the link is outside .lesson-nav. */
    document.addEventListener("click",function(ev){
      const a=ev.target.closest("a[href]");
      if(!a)return;
      const href=(a.getAttribute("href")||"").split("?")[0].split("#")[0];
      const target=href.split("/").pop().toLowerCase();
      const targetIndex=COURSE1_FILES.indexOf(target);
      if(targetIndex<0 || targetIndex<=current)return;
      const latest=done();
      if(!latest.has(current)){
        ev.preventDefault();
        ev.stopImmediatePropagation();
        const gate=document.querySelector(".course1-gate");
        if(gate) gate.scrollIntoView({behavior:"smooth",block:"center"});
      }
    },true);
  }

  function learningGate(){
    if(!document.querySelector(".learning-sequence"))return;
    styles();
    const first=firstIncomplete();
    document.querySelectorAll('.learning-sequence a[href*="lessons/"]').forEach(function(a){
      const m=(a.getAttribute("href")||"").match(/lessons\/(\d+)\.html$/);if(!m)return;
      const i=COURSE1_FILES.indexOf(m[1]+".html");if(i<0)return;
      if(i>first){a.classList.add("course1-locked-link");a.setAttribute("aria-disabled","true");a.title="سەرەتا وانەی پێشوو تەواو بکە";a.addEventListener("click",function(ev){ev.preventDefault();});}
    });
  }
  lessonGate();navGate();learningGate();
})();


/* ===== Supabase account + enrollment guard / server progress =====
   Browser pages remain static, while access and progress are tied to the
   authenticated Supabase user. Local sequential gates remain as UI fallback. */
(function(){
  if(!window.ZANSTI_SUPABASE?.ready)return;
  const path=(location.pathname.split("/").pop()||"").toLowerCase();
  const isC2=/^course-2-\d+\.html$/.test(path);
  const isC1=/^(0\d|[1-5]\d)\.html$/.test(path);
  if(!isC1&&!isC2)return;
  const courseId=isC2?"phonetics-phonology-kurdik":"orthography-kurdik";
  const sb=supabase.createClient(ZANSTI_SUPABASE.url,ZANSTI_SUPABASE.publishableKey);

  (async function guard(){
    const {data:{session}}=await sb.auth.getSession();
    if(!session){location.replace("../auth.html?next="+encodeURIComponent(location.pathname));return;}
    if(!session.user.email_confirmed_at){location.replace("../dashboard.html?verify=required");return;}
    const {data,error}=await sb.from("enrollments").select("status").eq("user_id",session.user.id).eq("course_id",courseId).maybeSingle();
    if(error||!data||!["active","completed"].includes(data.status)){
      location.replace("../dashboard.html?enroll=required");
    }
  })();

  document.addEventListener("click",async function(ev){
    const button=ev.target.closest&&ev.target.closest(".course1-complete-btn,.course2-complete-btn");
    if(!button||button.disabled)return;
    ev.preventDefault();
    ev.stopImmediatePropagation();
    button.disabled=true;
    const {data:{session}}=await sb.auth.getSession();
    if(!session||!session.user.email_confirmed_at){location.replace("../auth.html?next="+encodeURIComponent(location.pathname));return;}
    const {error:enrollError}=await sb.from("enrollments").select("status").eq("user_id",session.user.id).eq("course_id",courseId).maybeSingle();
    if(enrollError){button.disabled=false;return;}
    const {data:enroll}=await sb.from("enrollments").select("status").eq("user_id",session.user.id).eq("course_id",courseId).maybeSingle();
    if(!enroll||!["active","completed"].includes(enroll.status)){location.replace("../dashboard.html?enroll=required");return;}
    const {error}=await sb.from("lesson_progress").upsert({
      user_id:session.user.id,course_id:courseId,lesson_key:path,completed_at:new Date().toISOString()
    },{onConflict:"user_id,course_id,lesson_key"});
    if(error){
      button.disabled=false;
      button.textContent="دووبارە هەوڵ بدە";
      return;
    }
    const storage=isC2?"zanztkurd_course2_completed_v2":"zanztkurd_course1_completed_v2";
    const files=isC2?Array.from({length:25},(_,i)=>"course-2-"+String(i+1).padStart(2,"0")+".html"):["017.html","018.html","019.html","020.html","021.html","022.html","023.html","024.html","025.html","026.html","027.html","028.html","029.html","030.html","031.html","032.html","033.html","034.html","035.html","036.html","037.html","038.html","039.html","040.html","041.html","042.html","043.html","044.html","046.html","047.html","048.html","049.html","050.html","051.html","045.html","052.html","053.html","054.html","055.html","056.html","057.html","058.html"];
    const index=files.indexOf(path);
    try{
      const done=new Set(JSON.parse(localStorage.getItem(storage)||"[]").map(Number));
      if(index>=0)done.add(index);
      localStorage.setItem(storage,JSON.stringify([...done].sort((a,b)=>a-b)));
    }catch(e){}
    button.textContent="✓ تەواوکراوە";
    const next=index+1<files.length?files[index+1]:null;
    const gate=button.closest(".course1-gate,.course2-gate");
    if(gate){
      const h=gate.querySelector("h3"),p=gate.querySelector("p");
      if(h)h.textContent="وانەکە بە سەرکەوتوویی تەواو کرا.";
      if(p)p.textContent=next?"وانەی دواتر ئێستا کراوەتەوە.":"هەمو وانەکانی ئەم کۆرسە تەواو کراون.";
    }
    if(next)setTimeout(()=>location.href=next,650);
  },true);
})();
