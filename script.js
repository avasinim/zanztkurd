/* Shared Supabase client singleton: avoid multiple GoTrueClient instances per page. */
window.ZANSTI_GET_SUPABASE_CLIENT = window.ZANSTI_GET_SUPABASE_CLIENT || function(){
  if(!window.supabase?.createClient || !window.ZANSTI_SUPABASE?.ready) return null;
  if(!window.ZANSTI_SUPABASE_CLIENT){
    window.ZANSTI_SUPABASE_CLIENT = window.supabase.createClient(
      window.ZANSTI_SUPABASE.url,
      window.ZANSTI_SUPABASE.publishableKey
    );
  }
  return window.ZANSTI_SUPABASE_CLIENT;
};

/* ===== Avasin access gate — lessons + catalog =====
   Lesson content and the lesson catalog require authentication + enrollment. */
(function(){
  const path=(location.pathname.split("/").pop()||"").toLowerCase();
  const isLesson=/^0(?:1[7-9]|[2-4]\d|5[0-8])\.html$/.test(path)||/^course-2-\d+\.html$/.test(path);
  const isCatalog=path==="catalog.html" && /\/lessons\/catalog\.html$/i.test(location.pathname);
  const isProtectedCatalogTarget=(href)=>{ return /(?:^|\/)lessons\/catalog\.html(?:$|[?#])/i.test(String(href||"")); };
  if(isLesson){
    document.documentElement.style.visibility="hidden";
    const robots=document.querySelector('meta[name="robots"]');
    if(robots) robots.setAttribute("content","noindex,follow");
    else { const m=document.createElement("meta"); m.name="robots"; m.content="noindex,follow"; document.head.appendChild(m); }
  }

  function authUrl(next){
    return (location.pathname.includes("/lessons/")?"../auth.html":"auth.html")+"?next="+encodeURIComponent(next||location.href);
  }
  function targetOf(href){
    return (href||"").split("?")[0].split("#")[0].split("/").pop().toLowerCase();
  }
  function isProtectedLessonTarget(href){
    const target=targetOf(href);
    return /^0(?:1[7-9]|[2-4]\d|5[0-8])\.html$/.test(target)||/^course-2-\d+\.html$/.test(target);
  }
  let supabaseReadyPromise=null;
  function loadScriptOnce(src,id){
    return new Promise((resolve,reject)=>{
      if(id && document.getElementById(id)){ resolve(); return; }
      const existing=[...document.scripts].find(s=>s.src===src);
      if(existing){
        existing.addEventListener("load",resolve,{once:true});
        existing.addEventListener("error",reject,{once:true});
        if(window.supabase?.createClient || window.ZANSTI_SUPABASE?.ready) resolve();
        return;
      }
      const el=document.createElement("script");
      if(id)el.id=id;
      el.src=src;
      el.onload=resolve;
      el.onerror=reject;
      document.head.appendChild(el);
    });
  }
  async function ensureSupabase(){
    if(window.supabase?.createClient && window.ZANSTI_SUPABASE?.ready)return true;
    if(!supabaseReadyPromise){
      supabaseReadyPromise=(async()=>{
        try{
          await loadScriptOnce("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2","zansti-supabase-js");
          await loadScriptOnce((location.pathname.includes("/lessons/")?"../supabase-config.js":"supabase-config.js")+"?v=20261008-authfix","zansti-supabase-config");
          return !!(window.supabase?.createClient && window.ZANSTI_SUPABASE?.ready);
        }catch(e){ return false; }
      })();
    }
    return supabaseReadyPromise;
  }
  async function getSession(){
    if(!await ensureSupabase()) return null;
    const sb=window.ZANSTI_GET_SUPABASE_CLIENT();
    const {data:{session}}=await sb.auth.getSession();
    return {sb,session};
  }
  async function hasEnrollment(sb,userId,courseId){
    const {data,error}=await sb.rpc("student_has_enrollment",{p_course_id:courseId});
    if(error){ console.error("[Avasin] enrollment access check failed",error); return false; }
    return data===true;
  }
  async function isOwner(sb){
    const {data,error}=await sb.rpc("is_site_owner");
    return !error && data===true;
  }
  function lessonOrderFor(target){
    if(/^course-2-\d+\.html$/.test(target)){
      return Array.from({length:25},(_,i)=>"course-2-"+String(i+1).padStart(2,"0")+".html");
    }
    return ["017.html","018.html","019.html","020.html","021.html","022.html","023.html","024.html","025.html","026.html","027.html","028.html","029.html","030.html","031.html","032.html","033.html","034.html","035.html","036.html","037.html","038.html","039.html","040.html","041.html","042.html","043.html","044.html","046.html","047.html","048.html","049.html","050.html","051.html","045.html","052.html","053.html","054.html","055.html","056.html","057.html","058.html"];
  }
  async function loadProtectedLessonContent(sb,target){
    const box=document.querySelector(".lesson-content");
    if(!box)return true;
    const lessonKey=box.getAttribute("data-lesson-key")||target;
    box.setAttribute("aria-busy","true");
    try{
      const {data,error}=await sb.from("lesson_content")
        .select("content_html")
        .eq("lesson_key",lessonKey)
        .limit(1)
        .maybeSingle();
      if(error){
        console.error("[Avasin] lesson_content query failed",error);
        box.innerHTML="<p class=\"lesson-content-error\">نەتوانرا ناوەڕۆکی وانەکە لە سێرڤەرەوە وەربگیرێت. تکایە پەڕەکە نوێ بکەرەوە.</p>";
        return false;
      }
      if(!data?.content_html){
        console.error("[Avasin] lesson_content row missing",lessonKey);
        box.innerHTML="<p class=\"lesson-content-error\">ناوەڕۆکی ئەم وانەیە لە بنکەدراوەدا نەدۆزرایەوە.</p>";
        return false;
      }
      box.innerHTML=data.content_html;
      return true;
    }catch(error){
      console.error("[Avasin] lesson content load exception",error);
      box.innerHTML="<p class=\"lesson-content-error\">هەڵەیەک لە بارکردنی ناوەڕۆکی وانەکە ڕوویدا. تکایە پەڕەکە نوێ بکەرەوە.</p>";
      return false;
    }finally{
      box.setAttribute("aria-busy","false");
    }
  }
  async function hasPreviousLessonCompleted(sb,userId,courseId,target){
    const order=lessonOrderFor(target);
    const index=order.indexOf(target);
    if(index<=0)return true;
    const previous=order[index-1];
    const {data,error}=await sb.from("lesson_progress")
      .select("lesson_key")
      .eq("user_id",userId)
      .eq("course_id",courseId)
      .eq("lesson_key",previous)
      .maybeSingle();
    return !error && !!data;
  }
  async function allowOrRedirect(ev,a){
    const rawHref=a.getAttribute("href")||a.getAttribute("data-lesson-href");
    if(!isProtectedLessonTarget(rawHref) && !isProtectedCatalogTarget(rawHref)) return;
    ev.preventDefault();
    ev.stopImmediatePropagation();
    try{
      const got=await getSession();
      if(!got?.session){location.href=authUrl(a.href||new URL(rawHref,location.href).href);return;}
      const owner=await isOwner(got.sb);
      const target=targetOf(rawHref);
      if(isProtectedCatalogTarget(rawHref)){
        if(!owner){
          const [c1,c2]=await Promise.all([
            hasEnrollment(got.sb,got.session.user.id,"orthography-kurdik"),
            hasEnrollment(got.sb,got.session.user.id,"phonetics-phonology-kurdik")
          ]);
          if(!c1&&!c2){location.href=(location.pathname.includes("/lessons/")?"../dashboard.html":"dashboard.html")+"?enroll=required";return;}
        }
      }else{
        const courseId=/^course-2-\d+\.html$/.test(target)?"phonetics-phonology-kurdik":"orthography-kurdik";
        if(!owner && !await hasEnrollment(got.sb,got.session.user.id,courseId)){
          location.href=(location.pathname.includes("/lessons/")?"../dashboard.html":"dashboard.html")+"?enroll=required";
          return;
        }
        if(!owner && !await hasPreviousLessonCompleted(got.sb,got.session.user.id,courseId,target)){
          window.alert("ئەم وانەیە هێشتا قفڵە. بۆ کردنەوەی وانەی دواتر، سەرەتا وانەی پێشو تەواو بکە و پاشان هەوڵ بدەوە.");
          return;
        }
      }
      location.href=new URL(rawHref,location.href).href;
    }catch(error){
      console.error("[Avasin] lesson navigation/access check failed",error);
      window.alert("پشکنینی دەستگەیشتن تەواو نەبوو. پەیوەندی ئینتەرنێت بپشکنە و پەڕەکە نوێ بکەرەوە؛ ئەگەر هەڵەکە بەردەوام بوو، لە Console ـی وێبگەڕدا هەڵەی [Avasin] ببینە.");
    }
  }

  document.addEventListener("click",function(ev){
    const a=ev.target.closest&&ev.target.closest("a[href],a[data-lesson-href]");
    if(a) allowOrRedirect(ev,a);
  },true);

  (async function pageGate(){
    try{
      if(isLesson){
        const got=await getSession();
        if(!got?.session){
          location.replace(authUrl(location.href));
          return;
        }
        const owner=await isOwner(got.sb);
        const target=path;
        const courseId=/^course-2-\d+\.html$/.test(target)?"phonetics-phonology-kurdik":"orthography-kurdik";
        if(!owner && !await hasEnrollment(got.sb,got.session.user.id,courseId)){
          location.replace("../dashboard.html?enroll=required");
          return;
        }
        if(!owner && !await hasPreviousLessonCompleted(got.sb,got.session.user.id,courseId,target)){
          location.replace("../dashboard.html?lesson=locked");
          return;
        }
        await loadProtectedLessonContent(got.sb,target);
        document.documentElement.style.visibility="";
        return;
      }
    if(!isCatalog) return;
    document.documentElement.style.visibility="hidden";
    const got=await getSession();
    if(!got?.session){location.replace("../auth.html?next="+encodeURIComponent(location.href));return;}
    if(await isOwner(got.sb)){
      document.querySelectorAll("[data-lesson-href]").forEach(function(a){
        a.setAttribute("href",a.getAttribute("data-lesson-href"));
        a.removeAttribute("data-lesson-href");
      });
      document.documentElement.style.visibility="";
      return;
    }
    const [c1,c2]=await Promise.all([
      hasEnrollment(got.sb,got.session.user.id,"orthography-kurdik"),
      hasEnrollment(got.sb,got.session.user.id,"phonetics-phonology-kurdik")
    ]);
    if(!c1&&!c2){location.replace("../dashboard.html?enroll=required");return;}
    document.querySelectorAll("[data-lesson-href]").forEach(function(a){
      a.setAttribute("href",a.getAttribute("data-lesson-href"));
      a.removeAttribute("data-lesson-href");
    });
    document.documentElement.style.visibility="";
    }catch(error){
      console.error("[Avasin] protected page gate failed",error);
      if(isLesson){
        const box=document.querySelector(".lesson-content");
        if(box)box.innerHTML="<p class=\"lesson-content-error\">بارکردنی وانەکە سەرکەوتوو نەبوو. تکایە پەڕەکە نوێ بکەرەوە؛ ئەگەر کێشەکە بەردەوام بوو، پشتیوانی پەیوەندی پێوە بکە.</p>";
        document.documentElement.style.visibility="";
      }
    }
  })();
})();
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
  if(label==="دەستپێکردن" || label==="چوونەژورەوە"){
    btn.addEventListener("click",()=>{
      openInfo(label, label==="دەستپێکردن"
        ? "لە ئێستادا دەتوانیت وانەکان ببینیت و بەشەکانی سایت بپشکنیت. سیستەمی هەژمار لە قۆناغی داهاتودا زیاد دەکرێت."
        : "سیستەمی چوونەژورەوە لە قۆناغی داهاتودا زیاد دەکرێت.");
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



/* ===== Avasin Owner status shared with local progression gates ===== */
if(!window.ZANSTI_OWNER_CHECK){
  window.ZANSTI_OWNER_CHECK=(async function(){
    try{
      if(!window.supabase?.createClient || !window.ZANSTI_SUPABASE?.ready)return false;
      const sb=window.ZANSTI_GET_SUPABASE_CLIENT();
      const {data:{session}}=await sb.auth.getSession();
      if(!session)return false;
      const {data,error}=await sb.rpc("is_site_owner");
      return !error && data===true;
    }catch(e){return false;}
  })();
}

/* ===== Server progress sync for local UI fallback ===== */
if(!window.ZANSTI_SYNC_PROGRESS){
  window.ZANSTI_SYNC_PROGRESS=async function(courseId,files,storage,includeOwner=false){
    try{
      if(!window.supabase?.createClient||!window.ZANSTI_SUPABASE?.ready)return;
      const sb=window.ZANSTI_GET_SUPABASE_CLIENT();
      const {data:{session}}=await sb.auth.getSession();
      if(!session)return;
      const {data:owner}=await sb.rpc("is_site_owner");
      if(owner===true && !includeOwner)return;
      const {data:rows,error}=await sb.from("lesson_progress").select("lesson_key").eq("user_id",session.user.id).eq("course_id",courseId);
      if(error){
        console.error("[Avasin] progress sync failed; refusing to trust stale local completion cache",error);
        localStorage.setItem(storage,"[]");
        return false;
      }
      const indexByFile=new Map(files.map((file,i)=>[file,i]));
      const done=new Set((rows||[]).map(r=>indexByFile.get(String(r.lesson_key))).filter(i=>Number.isInteger(i)));
      localStorage.setItem(storage,JSON.stringify([...done].sort((a,b)=>a-b)));
      return true;
    }catch(e){
      console.error("[Avasin] progress sync exception",e);
      localStorage.setItem(storage,"[]");
      return false;
    }
  };
}

/* ===== Server-authoritative lesson completion ===== */
async function markLessonComplete(courseId, lessonKey){
  try{
    if(!window.supabase?.createClient||!window.ZANSTI_SUPABASE?.ready){
      return {ok:false,reason:"supabase_unavailable"};
    }
    const sb=window.ZANSTI_GET_SUPABASE_CLIENT();
    const {data:{session}}=await sb.auth.getSession();
    if(!session)return {ok:false,reason:"auth_required"};
    const {data,error}=await sb.rpc("complete_lesson",{
      p_course_id:courseId,
      p_lesson_key:lessonKey
    });
    if(error){
      console.error("[Avasin] complete_lesson failed",{courseId,lessonKey,code:error.code,message:error.message});
      return {ok:false,reason:error.message||"rpc_failed"};
    }
    return {ok:true,data};
  }catch(error){
    console.error("[Avasin] complete_lesson exception",error);
    return {ok:false,reason:"exception"};
  }
}

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
    return /\/lessons\//i.test(location.pathname) ? COURSE2_FILES[i] : "lessons/"+COURSE2_FILES[i];
  }
  function styles(){
    if(document.getElementById("course2-gate-styles"))return;
    const s=document.createElement("style");
    s.id="course2-gate-styles";
    s.textContent=".course2-gate{margin:28px 0 8px;padding:22px;border:1px solid rgba(39,61,50,.14);border-right:4px solid #b38a58;border-radius:14px;background:#f7f6f0;box-shadow:0 10px 28px rgba(27,42,35,.06)}.course2-gate h3{margin:0 0 8px;color:#26372f;font-size:1.12rem}.course2-gate p{margin:0 0 14px;color:#66716b;line-height:1.9}.course2-complete-btn{display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:10px;padding:11px 18px;background:#273f34;color:#fff;font:800 .95rem inherit;cursor:pointer}.course2-complete-btn[disabled]{opacity:.55;cursor:not-allowed}.course2-locked-link{opacity:.48!important;cursor:not-allowed!important;filter:grayscale(.35)}";
    document.head.appendChild(s);
  }
  async function lessonGate(){
    if(current<0)return;
    if(await window.ZANSTI_OWNER_CHECK)return;
    styles();
    await window.ZANSTI_SYNC_PROGRESS("phonetics-phonology-kurdik",COURSE2_FILES,STORAGE);
    const s=done(),first=firstIncomplete();
    if(current>first){location.replace(url(first));return;}
    const nav=document.querySelector(".lesson-nav");
    if(!nav||nav.parentElement.querySelector(".course2-gate"))return;
    const gate=document.createElement("div");
    gate.className="course2-gate";
    const already=s.has(current),next=current+1<COURSE2_FILES.length?current+1:null;
    gate.innerHTML="<h3>"+(already?"ئەم وانە پێشتر تەواوکراوە.":"کۆتایی وانە")+"</h3><p>"+(already?"وانەی دواتر کراوەتەوە.":"دوای خوێندنەوەی تەواوی ناوەڕۆک، ئەم وانەیە وەک تەواوکراو نیشان بدە بۆ کردنەوەی وانەی دواتر.")+"</p><button class=\"course2-complete-btn\" type=\"button\" "+(already?"disabled":"")+">"+(already?"✓ تەواوکراوە":"✓ نیشان‌ دان وەک تەواوکراو")+"</button>";
    nav.parentElement.insertBefore(gate,nav);
    gate.querySelector("button").addEventListener("click",async function(){
      const button=this;
      button.disabled=true;
      button.textContent="لە سیستەمدا پاشەکەوت دەکرێت...";
      const result=await markLessonComplete("phonetics-phonology-kurdik",COURSE2_FILES[current]);
      if(!result.ok){
        button.disabled=false;
        button.textContent="✓ نیشان‌ دان وەک تەواوکراو";
        gate.querySelector("p").textContent="پاشەکەوت‌کردنی تەواوبون سەرکەوتو نەبو. تکایە چوونەژورەوە و خۆتۆمارکردنت بپشکنە و دوبارە تێ‌بکۆشەوە.";
        return;
      }
      const latest=done();
      latest.add(current);
      save(latest);
      button.textContent="✓ تەواوکراوە";
      gate.querySelector("h3").textContent="وانەکە بە سەرکەوتوویی تەواو کرا.";
      gate.querySelector("p").textContent=next!==null?"وانەی دواتر ئێستا کراوەتەوە.":"هەمو وانەکانی کۆرسی ٢ تەواو کراون.";
      if(next!==null)setTimeout(function(){location.href=url(next);},650);
    });
  }
  async function navGate(){
    if(current<0 || await window.ZANSTI_OWNER_CHECK)return;
    if(await window.ZANSTI_OWNER_CHECK)return;
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
  async function learningGate(){
    if(await window.ZANSTI_OWNER_CHECK)return;
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
  function url(i){return /\/lessons\//i.test(location.pathname) ? COURSE1_FILES[i] : "lessons/"+COURSE1_FILES[i];}
  function styles(){
    if(document.getElementById("course1-gate-styles"))return;
    const s=document.createElement("style");s.id="course1-gate-styles";
    s.textContent=".course1-gate{margin:28px 0 8px;padding:22px;border:1px solid rgba(39,61,50,.14);border-right:4px solid #b38a58;border-radius:14px;background:#f7f6f0;box-shadow:0 10px 28px rgba(27,42,35,.06)}.course1-gate h3{margin:0 0 8px;color:#26372f;font-size:1.12rem}.course1-gate p{margin:0 0 14px;color:#66716b;line-height:1.9}.course1-complete-btn{display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:10px;padding:11px 18px;background:#273f34;color:#fff;font:800 .95rem inherit;cursor:pointer}.course1-complete-btn[disabled]{opacity:.55;cursor:not-allowed}.course1-locked-link{opacity:.48!important;cursor:not-allowed!important;filter:grayscale(.35)}";
    document.head.appendChild(s);
  }
  async function lessonGate(){
    if(current<0 || await window.ZANSTI_OWNER_CHECK)return;
    styles();
    await window.ZANSTI_SYNC_PROGRESS("orthography-kurdik",COURSE1_FILES,STORAGE,true);
    /* Reconcile the completion gate directly against the server before deciding
       whether this lesson is already complete. Never let stale localStorage
       disable the completion button when no server record exists. */
    let serverDone=new Set(),serverProgressLoaded=false;
    try{
      if(window.supabase?.createClient && window.ZANSTI_SUPABASE?.ready){
        const sb=window.ZANSTI_GET_SUPABASE_CLIENT();
        const {data:{session}}=await sb.auth.getSession();
        if(session){
          const {data:rows,error}=await sb.from("lesson_progress")
            .select("lesson_key")
            .eq("user_id",session.user.id)
            .eq("course_id","orthography-kurdik");
          if(error) console.error("[Avasin] authoritative Course 1 progress read failed",error);
          else {
            const indexByFile=new Map(COURSE1_FILES.map((file,i)=>[file,i]));
            serverDone=new Set((rows||[]).map(row=>indexByFile.get(String(row.lesson_key))).filter(i=>Number.isInteger(i)));
            serverProgressLoaded=true;
          }
        }
      }
    }catch(error){console.error("[Avasin] Course 1 progress reconciliation failed",error);}
    /* Never redirect a learner to lesson 1 because a temporary progress read failed.
       Reconcile the local cache only after a successful authoritative read. */
    if(serverProgressLoaded){
      localStorage.setItem(STORAGE,JSON.stringify([...serverDone].sort((a,b)=>a-b)));
    }
    const s=serverProgressLoaded?serverDone:done(),first=firstIncomplete();
    /* Do not redirect a learner away from a lesson based on a progress snapshot.
       A stale session/RLS read must never create a loop back to lesson 1. Forward
       navigation remains controlled by the completion gate below. */
    const nav=document.querySelector(".lesson-nav");if(!nav||nav.parentElement.querySelector(".course1-gate"))return;
    const gate=document.createElement("div");gate.className="course1-gate";
    const already=s.has(current),next=current+1<COURSE1_FILES.length?current+1:null;
    gate.innerHTML="<h3>"+(already?"ئەم وانە/بەش پێشتر تەواوکراوە.":"کۆتایی وانە/بەش")+"</h3><p>"+(already?"بەشی دواتر کراوەتەوە.":"دوای خوێندنەوەی تەواوی ناوەڕۆک، ئەم وانە/بەشە وەک تەواوکراو نیشان بدە بۆ کردنەوەی بەشی دواتر.")+"</p><button class=\"course1-complete-btn\" type=\"button\" "+(already?"disabled":"")+">"+(already?"✓ تەواوکراوە":"✓ نیشان‌ دان وەک تەواوکراو")+"</button>";
    nav.parentElement.insertBefore(gate,nav);
    gate.querySelector("button").addEventListener("click",async function(){
      const button=this;
      button.disabled=true;
      button.textContent="لە سیستەمدا پاشەکەوت دەکرێت...";
      const result=await markLessonComplete("orthography-kurdik",COURSE1_FILES[current]);
      if(!result.ok){
        button.disabled=false;
        button.textContent="✓ نیشان‌ دان وەک تەواوکراو";
        gate.querySelector("p").textContent="پاشەکەوت‌کردنی تەواوبون سەرکەوتو نەبو. تکایە چوونەژورەوە و خۆتۆمارکردنت بپشکنە و دوبارە تێ‌بکۆشەوە.";
        return;
      }
      const latest=done();
      latest.add(current);
      save(latest);
      const COURSE1_LESSON_ENDS={17:18,18:19,19:20,20:21,27:22,33:23,34:24,40:25,41:26};
      const learnerLesson=COURSE1_LESSON_ENDS[current];
      if(learnerLesson){
        localStorage.setItem("lesson-completed:course-current:"+learnerLesson,"true");
        localStorage.setItem("lesson-progress:course-current:"+learnerLesson,"completed");
      }
      button.textContent="✓ تەواوکراوە";
      gate.querySelector("h3").textContent="وانەکە بە سەرکەوتوویی تەواو کرا.";
      gate.querySelector("p").textContent=next!==null?"بەشی دواتر ئێستا کراوەتەوە.":"هەمو بەشەکانی ڕێڕەوی کۆرسی ١ تەواو کراون.";
      if(next!==null)setTimeout(function(){location.href=url(next);},650);
    });
  }
  async function navGate(){
    if(current<0 || await window.ZANSTI_OWNER_CHECK)return;
    /* The server is authoritative. Do not block a learner using a stale localStorage
       snapshot after the page itself has confirmed completion from lesson_progress. */
    document.addEventListener("click",async function(ev){
      const a=ev.target.closest("a[href]");
      if(!a)return;
      const href=(a.getAttribute("href")||"").split("?")[0].split("#")[0];
      const target=href.split("/").pop().toLowerCase();
      const targetIndex=COURSE1_FILES.indexOf(target);
      if(targetIndex<0 || targetIndex<=current)return;

      ev.preventDefault();
      ev.stopImmediatePropagation();

      try{
        const sb=window.ZANSTI_GET_SUPABASE_CLIENT();
        const {data:{session}}=await sb.auth.getSession();
        if(!session){
          const gate=document.querySelector(".course1-gate");
          if(gate)gate.scrollIntoView({behavior:"smooth",block:"center"});
          return;
        }
        const {data,error}=await sb.from("lesson_progress")
          .select("lesson_key")
          .eq("user_id",session.user.id)
          .eq("course_id","orthography-kurdik")
          .eq("lesson_key",COURSE1_FILES[current])
          .maybeSingle();

        /* If the progress query itself fails, let navigation proceed; RLS remains
           the final security boundary and will reject unauthorized lesson content. */
        if(error){
          console.error("[Avasin] authoritative navigation check failed; relying on RLS",error);
          window.location.href=a.href;
          return;
        }
        if(data){
          const latest=done();
          latest.add(current);
          save(latest);
          window.location.href=a.href;
          return;
        }
        const gate=document.querySelector(".course1-gate");
        if(gate)gate.scrollIntoView({behavior:"smooth",block:"center"});
      }catch(error){
        console.error("[Avasin] navigation progress check failed; relying on RLS",error);
        window.location.href=a.href;
      }
    },true);
  }
  async function learningGate(){
    if(!document.querySelector(".learning-sequence") || await window.ZANSTI_OWNER_CHECK)return;
    styles();
    await window.ZANSTI_SYNC_PROGRESS("orthography-kurdik",COURSE1_FILES,STORAGE,true);
    const first=firstIncomplete();
    document.querySelectorAll('.learning-sequence a[href*="lessons/"]').forEach(function(a){
      const m=(a.getAttribute("href")||"").match(/lessons\/(\d+)\.html$/);if(!m)return;
      const i=COURSE1_FILES.indexOf(m[1]+".html");if(i<0)return;
      if(i>first){a.classList.add("course1-locked-link");a.setAttribute("aria-disabled","true");a.title="سەرەتا وانەی پێشوو تەواو بکە";a.addEventListener("click",function(ev){ev.preventDefault();});}
    });
  }
  lessonGate();navGate();learningGate();
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



