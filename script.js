/* ===== Avasin Standard — global visible-text spelling ===== */
(function(){
  const replacements = [
    [/نووسراوە/g,"نوسراوە"],
    [/نووسینی/g,"نوسینی"],
    [/نووسین/g,"نوسین"],
    [/فێربوون/g,"فێربون"],
    [/هەموو/g,"هەمو"],
    [/نموونە/g,"نمونە"],
    [/پێویست/g,"پەیویست"],
    [/ڕوون/g,"ڕون"],
    [/ناوەڕۆک/g,"نێوەڕۆک"],
    [/چییە/g,"چیە"],
    [/نییە/g,"نیە"],
    [/دەستپێکردن/g,"دەست‌پێ‌کردن"]
  ];
  const normalizeAvasinText = value => replacements.reduce((text,[pattern,replacement])=>text.replace(pattern,replacement),value);
  const needsAvasinNormalization = value => replacements.some(([pattern])=>pattern.test(value));
  const fixAvasinSpelling = root => {
    if(!root) return;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[];
    while(walker.nextNode()) nodes.push(walker.currentNode);
    for(const node of nodes){
      const parent=node.parentElement;
      if(parent && /^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA)$/i.test(parent.tagName)) continue;
      if(node.nodeValue && needsAvasinNormalization(node.nodeValue)){
        node.nodeValue=normalizeAvasinText(node.nodeValue);
      }
    }
    if(root.querySelectorAll){
      root.querySelectorAll("[title],[aria-label],[placeholder],[alt]").forEach(el=>{
        for(const attr of ["title","aria-label","placeholder","alt"]){
          const value=el.getAttribute(attr);
          if(value && needsAvasinNormalization(value)) el.setAttribute(attr,normalizeAvasinText(value));
        }
      });
    }
  };
  const run=()=>fixAvasinSpelling(document.body);
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",run,{once:true});
  else run();
  const observer=new MutationObserver(records=>{
    for(const record of records){
      if(record.type==="characterData"){
        const n=record.target;
        const p=n.parentElement;
        if(!(p && /^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA)$/i.test(p.tagName)) && n.nodeValue && needsAvasinNormalization(n.nodeValue)){
          n.nodeValue=normalizeAvasinText(n.nodeValue);
        }
      }else{
        record.addedNodes.forEach(node=>{
          if(node.nodeType===Node.TEXT_NODE){
            const p=node.parentElement;
            if(!(p && /^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA)$/i.test(p.tagName)) && node.nodeValue && needsAvasinNormalization(node.nodeValue)){
              node.nodeValue=normalizeAvasinText(node.nodeValue);
            }
          }else if(node.nodeType===Node.ELEMENT_NODE) fixAvasinSpelling(node);
        });
      }
    }
  });
  const start=()=>{if(document.body) observer.observe(document.body,{subtree:true,childList:true,characterData:true});};
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",start,{once:true});
  else start();
})();
/* Ensure the shared academic UI stylesheet is the last stylesheet in the cascade.
   This resolves older page-local CSS overriding the compact design layer. */
(function(){
  function loadAvasinAcademicUI(){
    const links=[...document.querySelectorAll('link[rel="stylesheet"][href*="style.css"]')];
    if(!links.length)return;
    const link=links[links.length-1];
    const href=new URL(link.href,location.href);
    href.searchParams.set("v","20261014-academic-ui-cascade-fix");
    link.href=href.href;
    document.head.appendChild(link);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",loadAvasinAcademicUI,{once:true});
  else loadAvasinAcademicUI();
})();

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
  const isLesson=/^0(?:1[7-9]|[2-4]\d|5[0-8])\.html$/.test(path)||/^course-2-\d+\.html$/.test(path)||/^kurmanji-course-[12]-lesson-\d{2}\.html$/.test(path);
  const isCatalog=path==="catalog.html" && /\/lessons\/catalog\.html$/i.test(location.pathname);
  const isProtectedCatalogTarget=(href)=>{ return /(?:^|\/)lessons\/catalog\.html(?:$|[?#])/i.test(String(href||"")); };
  if(isLesson){
    document.documentElement.style.visibility="hidden";
    const robots=document.querySelector('meta[name="robots"]');
    if(robots) robots.setAttribute("content","noindex,follow");
    else { const m=document.createElement("meta"); m.name="robots"; m.content="noindex,follow"; document.head.appendChild(m); }
  } else if(isCatalog) {
    // The public lesson catalog must remain discoverable and indexable.
    const robots=document.querySelector('meta[name="robots"]');
    if(robots) robots.setAttribute("content","index,follow");
    else { const m=document.createElement("meta"); m.name="robots"; m.content="index,follow"; document.head.appendChild(m); }
  }

  function authUrl(next){
    return (location.pathname.includes("/lessons/")?"../auth.html":"auth.html")+"?next="+encodeURIComponent(next||location.href);
  }
  function targetOf(href){
    return (href||"").split("?")[0].split("#")[0].split("/").pop().toLowerCase();
  }
  function courseIdForTarget(target){
    if(/^kurmanji-course-1-lesson-\d{2}\.html$/.test(target)) return "kurmanji-course-1";
    if(/^kurmanji-course-2-lesson-\d{2}\.html$/.test(target)) return "kurmanji-course-2";
    return /^course-2-\d+\.html$/.test(target) ? "phonetics-phonology-kurdik" : "orthography-kurdik";
  }
  function isProtectedLessonTarget(href){
    const target=targetOf(href);
    return /^0(?:1[7-9]|[2-4]\d|5[0-8])\.html$/.test(target)||/^course-2-\d+\.html$/.test(target)||/^kurmanji-course-[12]-lesson-\d{2}\.html$/.test(target);
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
  /* Share the same Supabase readiness check with lesson-progress gates. */
  window.ZANSTI_WAIT_FOR_SUPABASE = ensureSupabase;
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
    if(/^kurmanji-course-1-lesson-\d{2}\.html$/.test(target)){
      return Array.from({length:26},(_,i)=>"kurmanji-course-1-lesson-"+String(i+1).padStart(2,"0")+".html");
    }
    if(/^kurmanji-course-2-lesson-\d{2}\.html$/.test(target)){
      return Array.from({length:12},(_,i)=>"kurmanji-course-2-lesson-"+String(i+1).padStart(2,"0")+".html");
    }
    if(/^course-2-\d+\.html$/.test(target)){
      return Array.from({length:32},(_,i)=>"course-2-"+String(i+1).padStart(2,"0")+".html");
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
        box.innerHTML="<p class=\"lesson-content-error\">نەتوانرا نێوەڕۆکی وانەکە لە سێرڤەرەوە وەربگیرێت. تکایە پەڕەکە نوێ بکەرەوە.</p>";
        return false;
      }
      if(!data?.content_html){
        console.error("[Avasin] lesson_content row missing",lessonKey);
        box.innerHTML="<p class=\"lesson-content-error\">نێوەڕۆکی ئەم وانەیە لە بنکەدراوەدا نەدۆزرایەوە.</p>";
        return false;
      }
      box.innerHTML=data.content_html;
      return true;
    }catch(error){
      console.error("[Avasin] lesson content load exception",error);
      box.innerHTML="<p class=\"lesson-content-error\">هەڵەیەک لە بارکردنی نێوەڕۆکی وانەکە ڕوویدا. تکایە پەڕەکە نوێ بکەرەوە.</p>";
      return false;
    }finally{
      box.setAttribute("aria-busy","false");
    }
  }
  async function hasPreviousLessonCompleted(sb,userId,courseId,target){
    const order=lessonOrderFor(target);
    const index=order.indexOf(target);
    if(index<=0)return true;
    /* Ask the same server-side policy used by lesson_content RLS. This avoids
       mismatches between a direct lesson_progress SELECT and the real gate. */
    const {data,error}=await sb.rpc("can_read_lesson_content",{
      p_course_id:courseId,
      p_lesson_key:target
    });
    if(error){
      console.error("[Avasin] authoritative lesson sequence check failed",error);
      return false;
    }
    return data===true;
  }
  async function allowOrRedirect(ev,a){
    const rawHref=a.getAttribute("href")||a.getAttribute("data-lesson-href");
    if(!isProtectedLessonTarget(rawHref)) return;
    ev.preventDefault();
    ev.stopImmediatePropagation();
    try{
      const got=await getSession();
      if(!got?.session){location.href=authUrl(a.href||new URL(rawHref,location.href).href);return;}
      const owner=await isOwner(got.sb);
      const target=targetOf(rawHref);
        const courseId=courseIdForTarget(target);
        if(!owner && !await hasEnrollment(got.sb,got.session.user.id,courseId)){
          location.href=(location.pathname.includes("/lessons/")?"../dashboard.html":"dashboard.html")+"?enroll=required";
          return;
        }
        if(!owner && !await hasPreviousLessonCompleted(got.sb,got.session.user.id,courseId,target)){
          window.alert("ئەم وانەیە هێشتا قفڵە. بۆ کردنەوەی وانەی دواتر، سەرەتا وانەی پێشو تەواو بکە و پاشان هەوڵ بدەوە.");
          return;
        }
      location.href=new URL(rawHref,location.href).href;
    }catch(error){
      console.error("[Avasin] lesson navigation/access check failed",error);
      window.alert("پشکنینی دەستگەیشتن تەواو نەبوو. پەیوەندی ئینتەرنێت بپشکنە و پەڕەکە نوێ بکەرەوە؛ ئەگەر هەڵەکە بەردەوام بوو، لە Console ـی وێبگەڕدا هەڵەی [Avasin] ببینە.");
    }
  }

  /* Lesson links use native navigation. The destination page performs the same
     authentication, enrollment, and progression checks before showing content.
     Avoid intercepting clicks here: this global capture handler could suppress
     catalog/course controls when an access check stalls or fails. */

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
        const courseId=courseIdForTarget(target);
        if(!owner && !await hasEnrollment(got.sb,got.session.user.id,courseId)){
          location.replace((location.pathname.includes("/lessons/")?"../dashboard.html":"dashboard.html")+"?enroll=required");
          return;
        }
        if(!owner && !await hasPreviousLessonCompleted(got.sb,got.session.user.id,courseId,target)){
          location.replace((location.pathname.includes("/lessons/")?"../dashboard.html":"dashboard.html")+"?lesson=locked");
          return;
        }
        await loadProtectedLessonContent(got.sb,target);
        document.documentElement.style.visibility="";
        return;
      }
    // The catalog is public and indexable; authentication is required only when opening a lesson.
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
/* ===== Avasin Standard — Owner-only Lesson Copy =====
   Copy restrictions are a browser-side deterrent, not DRM. The verified site
   owner is exempt; everyone else remains protected, including if auth fails. */
(function(){
  const lessonContent=document.querySelector(".lesson-content");
  if(!lessonContent)return;

  let ownerMayCopy=false;
  const isEditable=e=>e.target.closest("input,textarea,select,[contenteditable='true']");
  const isLessonTarget=e=>!!e.target.closest(".lesson-content");
  document.addEventListener("contextmenu",function(e){
    if(!ownerMayCopy && !isEditable(e) && isLessonTarget(e)) e.preventDefault();
  },true);
  document.addEventListener("copy",function(e){
    if(!ownerMayCopy && !isEditable(e) && isLessonTarget(e)) e.preventDefault();
  },true);
  document.addEventListener("cut",function(e){
    if(!ownerMayCopy && !isEditable(e) && isLessonTarget(e)) e.preventDefault();
  },true);
  document.addEventListener("dragstart",function(e){
    if(!ownerMayCopy && !isEditable(e) && isLessonTarget(e)) e.preventDefault();
  },true);
  document.addEventListener("keydown",function(e){
    if(ownerMayCopy || isEditable(e) || !isLessonTarget(e))return;
    const k=String(e.key||"").toLowerCase();
    if((e.ctrlKey||e.metaKey)&&["c","x","a","u","s"].includes(k)){
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  },true);

  (async function verifyOwnerCopyPermission(){
    try{
      if(typeof window.ZANSTI_WAIT_FOR_SUPABASE==="function"){
        await window.ZANSTI_WAIT_FOR_SUPABASE();
      }
      const client=window.ZANSTI_GET_SUPABASE_CLIENT?.();
      if(!client)return;
      const {data:{session},error:sessionError}=await client.auth.getSession();
      if(sessionError || !session)return;
      const {data,error}=await client.rpc("is_site_owner");
      if(!error && data===true){ ownerMayCopy=true; document.documentElement.classList.add("avasin-owner-copy"); const ownerStyle=document.createElement("style"); ownerStyle.id="avasin-owner-copy-style"; ownerStyle.textContent=".avasin-owner-copy .lesson-content,.avasin-owner-copy .lesson-content *{-webkit-user-select:text!important;user-select:text!important;-webkit-touch-callout:default!important}.avasin-owner-copy .lesson-content img,.avasin-owner-copy .lesson-content svg{-webkit-user-drag:auto!important;user-drag:auto!important}"; document.head.appendChild(ownerStyle); }
    }catch(error){
      console.warn("[Avasin] owner copy permission check failed; keeping copy protection enabled.");
    }
  })();
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

/* Removed obsolete CTA click interception: real links/forms must retain their native navigation. */

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
      if(typeof window.ZANSTI_WAIT_FOR_SUPABASE==="function" && !await window.ZANSTI_WAIT_FOR_SUPABASE())return false;
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
      if(typeof window.ZANSTI_WAIT_FOR_SUPABASE==="function" && !await window.ZANSTI_WAIT_FOR_SUPABASE())return false;
      if(!window.supabase?.createClient||!window.ZANSTI_SUPABASE?.ready)return false;
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
    if(typeof window.ZANSTI_WAIT_FOR_SUPABASE==="function" && !await window.ZANSTI_WAIT_FOR_SUPABASE()){
      return {ok:false,reason:"supabase_unavailable"};
    }
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
  const COURSE2_FILES=Array.from({length:32},function(_,i){
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
    const isOwner=await window.ZANSTI_OWNER_CHECK;
    styles();
    await window.ZANSTI_SYNC_PROGRESS("phonetics-phonology-kurdik",COURSE2_FILES,STORAGE,isOwner===true);
    const s=done(),first=firstIncomplete();
    /* Owners can browse every lesson, but still need the completion action
       to write their own progress to Supabase and have it appear in reports. */
    if(!isOwner && current>first){location.replace(url(first));return;}
    const nav=document.querySelector(".lesson-nav");
    if(!nav||nav.parentElement.querySelector(".course2-gate"))return;
    const gate=document.createElement("div");
    gate.className="course2-gate";
    const already=s.has(current),next=current+1<COURSE2_FILES.length?current+1:null;
    gate.innerHTML="<h3>"+(already?"ئەم وانە پێشتر تەواوکراوە.":"کۆتایی وانە")+"</h3><p>"+(already?"وانەی دواتر کراوەتەوە.":"دوای خوێندنەوەی تەواوی نێوەڕۆک، ئەم وانەیە وەک تەواوکراو نیشان بدە بۆ کردنەوەی وانەی دواتر.")+"</p><button class=\"course2-complete-btn\" type=\"button\" "+(already?"disabled":"")+">"+(already?"✓ تەواوکراوە":"✓ نیشان‌ دان وەک تەواوکراو")+"</button>";
    if(nav)nav.parentElement.insertBefore(gate,nav);else insertionTarget.appendChild(gate);
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
  function lessonMeta(index){
    if(index<=20)return {lesson:index+1};
    if(index<=27)return {lesson:22,part:index-20,total:7};
    if(index<=33)return {lesson:23,part:index-27,total:6};
    if(index===34)return {lesson:24};
    if(index<=40)return {lesson:25,part:index-34,total:6};
    return {lesson:26};
  }
  function ensureLessonNavigation(){
    if(current<0||document.querySelector(".lesson-nav a[href]"))return;
    const card=document.querySelector(".content-page-card");
    if(!card)return;
    const nav=document.createElement("nav");
    nav.className="lesson-nav course1-auto-nav";
    nav.setAttribute("aria-label","ناڤیگەیشنی وانەکان");
    function label(index){
      const meta=lessonMeta(index);
      return "وانەی "+meta.lesson+(meta.part?" · بەشی "+meta.part+"/"+meta.total:"");
    }
    function item(index,isPrevious){
      if(index<0||index>=COURSE1_FILES.length){
        const span=document.createElement("span");
        span.textContent=isPrevious?"دەستپێکی کۆرس":"کۆتایی کۆرس";
        return span;
      }
      const a=document.createElement("a");
      a.href=COURSE1_FILES[index];
      a.setAttribute("aria-label",(isPrevious?"گەڕانەوە بۆ ":"چوون بۆ ")+label(index));
      const direction=document.createElement("span");
      direction.className="lesson-nav-direction";
      direction.textContent=(isPrevious?"← ":"")+label(index)+(isPrevious?"":" →");
      const caption=document.createElement("span");
      caption.className="lesson-nav-label";
      caption.textContent=isPrevious?"وانەی پێشو":"وانەی دواتر";
      a.append(direction,caption);
      return a;
    }
    nav.append(item(current-1,true),item(current+1,false));
    card.appendChild(nav);
  }
  function firstIncomplete(){const s=done();for(let i=0;i<COURSE1_FILES.length;i++)if(!s.has(i))return i;return COURSE1_FILES.length;}
  function url(i){return /\/lessons\//i.test(location.pathname) ? COURSE1_FILES[i] : "lessons/"+COURSE1_FILES[i];}
  function styles(){
    if(document.getElementById("course1-gate-styles"))return;
    const s=document.createElement("style");s.id="course1-gate-styles";
    s.textContent=".course1-auto-nav{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:22px;padding:10px;border:1px solid rgba(39,61,50,.16);border-radius:14px;background:#fff;box-shadow:0 8px 24px rgba(27,42,35,.05)}.course1-auto-nav>a,.course1-auto-nav>span{display:flex;min-height:42px;flex-direction:column;align-items:center;justify-content:center;gap:3px;padding:9px 12px;border:1px solid rgba(39,61,50,.12);border-radius:10px;background:#f7f6f0;color:#273f34;text-align:center;font-size:.9rem;font-weight:750;text-decoration:none}.course1-auto-nav .lesson-nav-label{font-size:.78rem;font-weight:600;color:#66716b}.course1-gate{margin:28px 0 8px;padding:22px;border:1px solid rgba(39,61,50,.14);border-right:4px solid #b38a58;border-radius:14px;background:#f7f6f0;box-shadow:0 10px 28px rgba(27,42,35,.06)}.course1-gate h3{margin:0 0 8px;color:#26372f;font-size:1.12rem}.course1-gate p{margin:0 0 14px;color:#66716b;line-height:1.9}.course1-complete-btn{display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:10px;padding:11px 18px;background:#273f34;color:#fff;font:800 .95rem inherit;cursor:pointer}.course1-complete-btn[disabled]{opacity:.55;cursor:not-allowed}.course1-locked-link{opacity:.48!important;cursor:not-allowed!important;filter:grayscale(.35)}";
    document.head.appendChild(s);
  }
  async function lessonGate(){
    /* Owners retain unrestricted navigation, but can still record their own progress. */
    if(current<0)return;
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
    const s=serverProgressLoaded?serverDone:new Set(),first=firstIncomplete();
    /* Do not redirect a learner away from a lesson based on a progress snapshot.
       A stale session/RLS read must never create a loop back to lesson 1. Forward
       navigation remains controlled by the completion gate below. */
    const nav=document.querySelector(".lesson-nav");
    const insertionTarget=nav?.parentElement || document.querySelector(".content-page-card") || document.querySelector(".content-page-body .container");
    if(!insertionTarget || insertionTarget.querySelector(".course1-gate"))return;
    const gate=document.createElement("div");gate.className="course1-gate";
    const already=s.has(current),next=current+1<COURSE1_FILES.length?current+1:null;
    gate.innerHTML="<h3>"+(already?"ئەم وانە/بەش پێشتر تەواوکراوە.":"کۆتایی وانە/بەش")+"</h3><p>"+(already?"بەشی دواتر کراوەتەوە.":"دوای خوێندنەوەی تەواوی نێوەڕۆک، ئەم وانە/بەشە وەک تەواوکراو نیشان بدە بۆ کردنەوەی بەشی دواتر.")+"</p><button class=\"course1-complete-btn\" type=\"button\" "+(already?"disabled":"")+">"+(already?"✓ تەواوکراوە":"✓ نیشان‌ دان وەک تەواوکراو")+"</button>";
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
  ensureLessonNavigation();
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





/* Avasin Standard — site-wide visible-text orthography normalization.
   Applies to static and dynamically loaded page content without touching scripts, styles, or editable fields. */
(function(){
  const fixes = [["چوونەژوورەوە","چوونەژورەوە"],["سەرکەوتوویی","سەرکەوتویی"],["پێشکەوتوو","پێشکەوتو"],["سەرکەوتوو","سەرکەوتو"],["دەستگەیشتن","دەست‌گەیشتن"],["پێشوو","پێشو"],["دەربارەی","لەبوارەی"],["زیاد","زۆر"]];
  function normalize(value){
    let out=String(value);
    for(const [from,to] of fixes) out=out.split(from).join(to);
    return out;
  }
  function fixTextNode(node){
    if(!node || node.nodeType!==Node.TEXT_NODE || !node.parentElement) return;
    if(node.parentElement.closest('script,style,noscript,textarea,input,select,option,[contenteditable="true"]')) return;
    const next=normalize(node.nodeValue);
    if(next!==node.nodeValue) node.nodeValue=next;
  }
  function fixAttributes(el){
    if(!el || el.nodeType!==Node.ELEMENT_NODE) return;
    for(const name of ['placeholder','aria-label','title','alt']){
      const value=el.getAttribute(name);
      if(value!==null){const next=normalize(value);if(next!==value)el.setAttribute(name,next);}
    }
  }
  function scan(root){
    if(!root)return;
    if(root.nodeType===Node.TEXT_NODE){fixTextNode(root);return;}
    if(root.nodeType===Node.ELEMENT_NODE){fixAttributes(root);if(root.matches('script,style,noscript,textarea,input,select,option,[contenteditable="true"]'))return;}
    if(root.querySelectorAll){root.querySelectorAll('*').forEach(fixAttributes);}
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    let node;while((node=walker.nextNode()))fixTextNode(node);
  }
  const start=()=>{
    scan(document.body);
    const observer=new MutationObserver(records=>records.forEach(record=>{
      if(record.type==='characterData')fixTextNode(record.target);
      else record.addedNodes.forEach(scan);
    }));
    observer.observe(document.body,{subtree:true,childList:true,characterData:true});
  };
  if(document.body)start();else document.addEventListener('DOMContentLoaded',start,{once:true});
})();


/* Avasin: collective academic directory, not a personal-profile button */
(function(){
  const labelAcademicLinks = () => {
    document.querySelectorAll('a[href]').forEach(a => {
      const rawHref = a.getAttribute('href') || '';
      const href = rawHref.split('#')[0].split('?')[0];
      const pageName = href.split('/').pop();
      if (pageName === 'sabir-zhakaw.html') {
        if (a.textContent.trim() === 'سابیر ژاکاو' || a.textContent.trim() === 'پەڕەی تایبەت' || a.textContent.trim() === 'چوونە نێو بەشی سابیر ژاکاو') a.textContent = 'دەستەی ئەکادێمی';
      }
      if (rawHref === '#sabir-zhakaw') a.setAttribute('href', '#academic-people');
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', labelAcademicLinks, {once:true});
  else labelAcademicLinks();
})();


/* Avasin Standard — reliable UI localization.
   Only interface labels are localized here. Lesson/article body text is never rewritten.
   Full-page machine translation remains a separate task until a reliable provider is configured. */
(function(){
  "use strict";
  const LANGUAGES=[
    {code:"ckb",name:"کوردی (سۆرانی)",initial:"ک"},
    {code:"en",name:"English",initial:"E"},
    {code:"ar",name:"العربية",initial:"ع"},
    {code:"tr",name:"Türkçe",initial:"T"},
    {code:"fa",name:"فارسی",initial:"ف"},
    {code:"az",name:"Azərbaycanca",initial:"A"},
    {code:"ru",name:"Русский",initial:"Р"},
    {code:"de",name:"Deutsch",initial:"D"},
    {code:"fr",name:"Français",initial:"F"},
    {code:"es",name:"Español",initial:"E"}
  ];
  const LABELS={
    "فێربون":{en:"Learning",ar:"التعلّم",tr:"Öğrenme",fa:"یادگیری",az:"Öyrənmə",ru:"Обучение",de:"Lernen",fr:"Apprentissage",es:"Aprendizaje"},
    "زمان‌ناسی":{en:"Linguistics",ar:"علم اللغة",tr:"Dilbilim",fa:"زبان‌شناسی",az:"Dilçilik",ru:"Языкознание",de:"Linguistik",fr:"Linguistique",es:"Lingüística"},
    "وانەکان":{en:"Lessons",ar:"الدروس",tr:"Dersler",fa:"درس‌ها",az:"Dərslər",ru:"Уроки",de:"Lektionen",fr:"Leçons",es:"Lecciones"},
    "کتێب‌خانە":{en:"Library",ar:"المكتبة",tr:"Kütüphane",fa:"کتابخانه",az:"Kitabxana",ru:"Библиотека",de:"Bibliothek",fr:"Bibliothèque",es:"Biblioteca"},
    "کتێبخانە":{en:"Library",ar:"المكتبة",tr:"Kütüphane",fa:"کتابخانه",az:"Kitabxana",ru:"Библиотека",de:"Bibliothek",fr:"Bibliothèque",es:"Biblioteca"},
    "دەستەی ئەکادێمی":{en:"Academic team",ar:"الفريق الأكاديمي",tr:"Akademik ekip",fa:"گروه دانشگاهی",az:"Akademik heyət",ru:"Академическая команда",de:"Akademisches Team",fr:"Équipe académique",es:"Equipo académico"},
    "دەربارەی ئاڤاشین":{en:"About Avasin",ar:"عن آفاسين",tr:"Avasin hakkında",fa:"درباره ئاڤاشین",az:"Avasin haqqında",ru:"Об Авасин",de:"Über Avasin",fr:"À propos d’Avasin",es:"Acerca de Avasin"},
    "چوونەژورەوە":{en:"Sign in",ar:"تسجيل الدخول",tr:"Giriş yap",fa:"ورود",az:"Daxil ol",ru:"Войти",de:"Anmelden",fr:"Se connecter",es:"Iniciar sesión"},
    "چوونەژوورەوە":{en:"Sign in",ar:"تسجيل الدخول",tr:"Giriş yap",fa:"ورود",az:"Daxil ol",ru:"Войти",de:"Anmelden",fr:"Se connecter",es:"Iniciar sesión"},
    "چوونەدەرەوە":{en:"Sign out",ar:"تسجيل الخروج",tr:"Çıkış yap",fa:"خروج",az:"Çıxış",ru:"Выйти",de:"Abmelden",fr:"Se déconnecter",es:"Cerrar sesión"},
    "گەڕانەوە":{en:"Back",ar:"رجوع",tr:"Geri",fa:"بازگشت",az:"Geri",ru:"Назад",de:"Zurück",fr:"Retour",es:"Volver"},
    "گەڕانەوە بۆ پەڕەی سەرەکی":{en:"Back to home",ar:"العودة إلى الصفحة الرئيسية",tr:"Ana sayfaya dön",fa:"بازگشت به صفحه اصلی",az:"Əsas səhifəyə qayıt",ru:"На главную",de:"Zur Startseite",fr:"Retour à l’accueil",es:"Volver al inicio"},
    "پەیوەندی":{en:"Contact",ar:"اتصل بنا",tr:"İletişim",fa:"تماس",az:"Əlaqə",ru:"Контакты",de:"Kontakt",fr:"Contact",es:"Contacto"},
    "زمانی ماڵپەڕ":{en:"Site language",ar:"لغة الموقع",tr:"Site dili",fa:"زبان وب‌سایت",az:"Saytın dili",ru:"Язык сайта",de:"Seitensprache",fr:"Langue du site",es:"Idioma del sitio"},
    "هەمو کتێبەکان ←":{en:"All books ←",ar:"كل الكتب ←",tr:"Tüm kitaplar ←",fa:"همه کتاب‌ها ←",az:"Bütün kitablar ←",ru:"Все книги ←",de:"Alle Bücher ←",fr:"Tous les livres ←",es:"Todos los libros ←"},
    "کاتەلۆگی وانەکان":{en:"Lesson catalog",ar:"فهرس الدروس",tr:"Ders kataloğu",fa:"فهرست درس‌ها",az:"Dərs kataloqu",ru:"Каталог уроков",de:"Lektionskatalog",fr:"Catalogue des leçons",es:"Catálogo de lecciones"},
    "ڕێڕەوی فێربون":{en:"Learning path",ar:"مسار التعلّم",tr:"Öğrenme yolu",fa:"مسیر یادگیری",az:"Öyrənmə yolu",ru:"Учебный маршрут",de:"Lernpfad",fr:"Parcours d’apprentissage",es:"Ruta de aprendizaje"},
    "پێشکەوتن":{en:"Progress",ar:"التقدّم",tr:"İlerleme",fa:"پیشرفت",az:"İrəliləyiş",ru:"Прогресс",de:"Fortschritt",fr:"Progression",es:"Progreso"},
    "وانە تەواوکراوەکان":{en:"Completed lessons",ar:"الدروس المكتملة",tr:"Tamamlanan dersler",fa:"درس‌های تکمیل‌شده",az:"Tamamlanmış dərslər",ru:"Завершённые уроки",de:"Abgeschlossene Lektionen",fr:"Leçons terminées",es:"Lecciones completadas"},
    "هەمو ڕێڕەوەکان":{en:"All paths",ar:"كل المسارات",tr:"Tüm yollar",fa:"همه مسیرها",az:"Bütün yollar",ru:"Все маршруты",de:"Alle Lernpfade",fr:"Tous les parcours",es:"Todas las rutas"},
    "هەمو بەشەکان":{en:"All sections",ar:"كل الأقسام",tr:"Tüm bölümler",fa:"همه بخش‌ها",az:"Bütün bölmələr",ru:"Все разделы",de:"Alle Bereiche",fr:"Toutes les sections",es:"Todas las secciones"},
    "گەڕان بە نێو بابەتەکان‌دا":{en:"Search topics",ar:"البحث في الموضوعات",tr:"Konularda ara",fa:"جست‌وجو در موضوعات",az:"Mövzularda axtar",ru:"Поиск по темам",de:"Themen durchsuchen",fr:"Rechercher des sujets",es:"Buscar temas"},
    "تۆڕەکانی ئێمە":{en:"Our networks",ar:"شبكاتنا",tr:"Sosyal ağlarımız",fa:"شبکه‌های ما",az:"Şəbəkələrimiz",ru:"Наши сети",de:"Unsere Netzwerke",fr:"Nos réseaux",es:"Nuestras redes"},
    "یوتیوب":{en:"YouTube",ar:"يوتيوب",tr:"YouTube",fa:"یوتیوب",az:"YouTube",ru:"YouTube",de:"YouTube",fr:"YouTube",es:"YouTube"},
    "تەلەگرام":{en:"Telegram",ar:"تيليغرام",tr:"Telegram",fa:"تلگرام",az:"Telegram",ru:"Телеграм",de:"Telegram",fr:"Telegram",es:"Telegram"},
    "بینینی وانەکان":{en:"View lessons",ar:"عرض الدروس",tr:"Dersleri görüntüle",fa:"مشاهده درس‌ها",az:"Dərslərə bax",ru:"Смотреть уроки",de:"Lektionen ansehen",fr:"Voir les leçons",es:"Ver lecciones"},
    "چوونە پەنێڵی بەڕێوبەرایەتی ←":{en:"Open admin panel ←",ar:"فتح لوحة الإدارة ←",tr:"Yönetim panelini aç ←",fa:"بازکردن پنل مدیریت ←",az:"İdarəetmə panelini aç ←",ru:"Открыть панель управления ←",de:"Adminbereich öffnen ←",fr:"Ouvrir le panneau d’administration ←",es:"Abrir panel de administración ←"},
    "دروستکردنی هەژمار":{en:"Create account",ar:"إنشاء حساب",tr:"Hesap oluştur",fa:"ایجاد حساب",az:"Hesab yarat",ru:"Создать аккаунт",de:"Konto erstellen",fr:"Créer un compte",es:"Crear cuenta"},
    "سەرچاوەی جیهان":{en:"Global resources",ar:"المصادر العالمية",tr:"Küresel kaynaklar",fa:"منابع جهانی",az:"Qlobal mənbələr",ru:"Мировые ресурсы",de:"Globale Ressourcen",fr:"Ressources mondiales",es:"Recursos globales"},
    "سەرچاوە زانستییەکانی جیهان":{en:"Global academic resources",ar:"المصادر الأكاديمية العالمية",tr:"Küresel akademik kaynaklar",fa:"منابع علمی جهانی",az:"Qlobal elmi mənbələr",ru:"Мировые научные ресурсы",de:"Globale akademische Ressourcen",fr:"Ressources académiques mondiales",es:"Recursos académicos globales"},
    "وێبلۆگ":{en:"Blog",ar:"المدونة",tr:"Blog",fa:"وبلاگ",az:"Bloq",ru:"Блог",de:"Blog",fr:"Blog",es:"Blog"},
    "پەنێڵی خوێندکار":{en:"Student dashboard",ar:"لوحة الطالب",tr:"Öğrenci paneli",fa:"پنل دانشجو",az:"Tələbə paneli",ru:"Панель студента",de:"Studentenbereich",fr:"Espace étudiant",es:"Panel del estudiante"},
    "پەنێڵی بەڕێوبەرایەتی":{en:"Admin panel",ar:"لوحة الإدارة",tr:"Yönetim paneli",fa:"پنل مدیریت",az:"İdarəetmə paneli",ru:"Панель администратора",de:"Administrationsbereich",fr:"Panneau d’administration",es:"Panel de administración"},
    "پەڕەی سەرەکی":{en:"Home",ar:"الرئيسية",tr:"Ana sayfa",fa:"صفحه اصلی",az:"Əsas səhifə",ru:"Главная",de:"Startseite",fr:"Accueil",es:"Inicio"},
    "ناڤیگەیشنی گرنگ":{en:"Main navigation",ar:"التنقل الرئيسي",tr:"Ana gezinme",fa:"ناوبری اصلی",az:"Əsas naviqasiya",ru:"Главная навигация",de:"Hauptnavigation",fr:"Navigation principale",es:"Navegación principal"},
    "پەڕەی تایبەتی خوێندکار":{en:"Student area",ar:"مساحة الطالب",tr:"Öğrenci alanı",fa:"بخش دانشجو",az:"Tələbə bölməsi",ru:"Раздел студента",de:"Studentenbereich",fr:"Espace étudiant",es:"Área del estudiante"},
    "چوونەژوورەوە و هەژمار":{en:"Sign-in and account",ar:"تسجيل الدخول والحساب",tr:"Giriş ve hesap",fa:"ورود و حساب",az:"Giriş və hesab",ru:"Вход и аккаунт",de:"Anmeldung und Konto",fr:"Connexion et compte",es:"Inicio de sesión y cuenta"},
    "زانیاری و سیاسەتەکان":{en:"Information and policies",ar:"المعلومات والسياسات",tr:"Bilgi ve politikalar",fa:"اطلاعات و سیاست‌ها",az:"Məlumat və siyasətlər",ru:"Информация и правила",de:"Informationen und Richtlinien",fr:"Informations et politiques",es:"Información y políticas"},
    "سیاسەتی پاراستنی نهێنی":{en:"Privacy policy",ar:"سياسة الخصوصية",tr:"Gizlilik politikası",fa:"سیاست حریم خصوصی",az:"Məxfilik siyasəti",ru:"Политика конфиденциальности",de:"Datenschutzerklärung",fr:"Politique de confidentialité",es:"Política de privacidad"},
    "مەرج و یاساکانی بەکارهێنان":{en:"Terms of use",ar:"شروط الاستخدام",tr:"Kullanım koşulları",fa:"شرایط استفاده",az:"İstifadə şərtləri",ru:"Условия использования",de:"Nutzungsbedingungen",fr:"Conditions d’utilisation",es:"Términos de uso"},
    "دەستگەیشتنی دیجیتاڵ":{en:"Digital accessibility",ar:"إمكانية الوصول الرقمي",tr:"Dijital erişilebilirlik",fa:"دسترس‌پذیری دیجیتال",az:"Rəqəmsal əlçatanlıq",ru:"Цифровая доступность",de:"Digitale Barrierefreiheit",fr:"Accessibilité numérique",es:"Accesibilidad digital"},
    "ئیمەیڵ":{en:"Email",ar:"البريد الإلكتروني",tr:"E-posta",fa:"ایمیل",az:"E-poçt",ru:"Электронная почта",de:"E-Mail",fr:"E-mail",es:"Correo electrónico"},
    "وشەی نهێنی":{en:"Password",ar:"كلمة المرور",tr:"Şifre",fa:"گذرواژه",az:"Şifrə",ru:"Пароль",de:"Passwort",fr:"Mot de passe",es:"Contraseña"},
    "ناوی تەواو":{en:"Full name",ar:"الاسم الكامل",tr:"Ad soyad",fa:"نام کامل",az:"Tam ad",ru:"Полное имя",de:"Vollständiger Name",fr:"Nom complet",es:"Nombre completo"},
    "تۆمارکردن":{en:"Register",ar:"إنشاء حساب",tr:"Kayıt ol",fa:"ثبت‌نام",az:"Qeydiyyat",ru:"Регистрация",de:"Registrieren",fr:"S’inscrire",es:"Registrarse"},
    "چوونە نێو پەنێڵی خوێندکار ←":{en:"Open student dashboard ←",ar:"فتح لوحة الطالب ←",tr:"Öğrenci panelini aç ←",fa:"ورود به پنل دانشجو ←",az:"Tələbə panelini aç ←",ru:"Открыть панель студента ←",de:"Studentenbereich öffnen ←",fr:"Ouvrir l’espace étudiant ←",es:"Abrir panel del estudiante ←"},
    "بینینی کۆرس":{en:"View course",ar:"عرض الدورة",tr:"Kursu görüntüle",fa:"مشاهده دوره",az:"Kursa bax",ru:"Посмотреть курс",de:"Kurs ansehen",fr:"Voir le cours",es:"Ver curso"},
    "خۆتۆمارکردن لە کۆرس":{en:"Enroll in course",ar:"التسجيل في الدورة",tr:"Kursa kaydol",fa:"ثبت‌نام در دوره",az:"Kursa yazıl",ru:"Записаться на курс",de:"Für den Kurs anmelden",fr:"S’inscrire au cours",es:"Inscribirse en el curso"},
    "پڕۆفایل":{en:"Profile",ar:"الملف الشخصي",tr:"Profil",fa:"نمایه",az:"Profil",ru:"Профиль",de:"Profil",fr:"Profil",es:"Perfil"},
    "پاشەکەوتکردنی پڕۆفایل":{en:"Save profile",ar:"حفظ الملف الشخصي",tr:"Profili kaydet",fa:"ذخیره نمایه",az:"Profili saxla",ru:"Сохранить профиль",de:"Profil speichern",fr:"Enregistrer le profil",es:"Guardar perfil"},
    "کۆرسەکانم":{en:"My courses",ar:"دوراتي",tr:"Kurslarım",fa:"دوره‌های من",az:"Kurslarım",ru:"Мои курсы",de:"Meine Kurse",fr:"Mes cours",es:"Mis cursos"},
    "ناردنەوەی ئیمەیڵی پشت‌ڕاست‌کردنەوە":{en:"Resend verification email",ar:"إعادة إرسال رسالة التحقق",tr:"Doğrulama e-postasını yeniden gönder",fa:"ارسال دوباره ایمیل تأیید",az:"Təsdiq e-poçtunu yenidən göndər",ru:"Повторно отправить письмо подтверждения",de:"Bestätigungs-E-Mail erneut senden",fr:"Renvoyer l’e-mail de vérification",es:"Reenviar correo de verificación"},
    "چۆن دەست بە خوێندن بکەیت؟":{en:"How to start learning",ar:"كيف تبدأ التعلّم",tr:"Öğrenmeye nasıl başlanır",fa:"چگونه یادگیری را آغاز کنید",az:"Öyrənməyə necə başlamaq olar",ru:"Как начать обучение",de:"So beginnen Sie mit dem Lernen",fr:"Comment commencer à apprendre",es:"Cómo empezar a aprender"},
"ئێرە تەنیا وانە نیە.":{en:"More than lessons.",ar:"أكثر من مجرد دروس.",tr:"Burada yalnızca dersler yok.",fa:"اینجا فقط درس نیست.",az:"Burada yalnızca dərslər yoxdur.",ru:"Здесь не только уроки.",de:"Mehr als nur Lektionen.",fr:"Bien plus que des leçons.",es:"Más que lecciones."},
    "هەمو شتێک لە یەک چوارچێوە":{en:"Everything in one learning space",ar:"كل شيء في مساحة واحدة",tr:"Her şey tek bir öğrenme alanında",fa:"همه‌چیز در یک فضای یادگیری",az:"Hər şey bir öyrənmə məkanında",ru:"Всё в одном учебном пространстве",de:"Alles in einem Lernbereich",fr:"Tout dans un espace d’apprentissage",es:"Todo en un espacio de aprendizaje"},
    "شوێنی خۆت هەڵ‌بژێرە":{en:"Choose your path",ar:"اختر مسارك",tr:"Yolunu seç",fa:"مسیر خود را انتخاب کنید",az:"Öz yolunu seç",ru:"Выберите свой путь",de:"Wählen Sie Ihren Weg",fr:"Choisissez votre parcours",es:"Elige tu ruta"},
    "بینینی وانەکان":{en:"View lessons",ar:"عرض الدروس",tr:"Dersleri görüntüle",fa:"مشاهده درس‌ها",az:"Dərslərə bax",ru:"Смотреть уроки",de:"Lektionen ansehen",fr:"Voir les leçons",es:"Ver lecciones"},
    "کردنەوەی کتێبخانە ←":{en:"Open the library ←",ar:"فتح المكتبة ←",tr:"Kütüphaneyi aç ←",fa:"بازکردن کتابخانه ←",az:"Kitabxananı aç ←",ru:"Открыть библиотеку ←",de:"Bibliothek öffnen ←",fr:"Ouvrir la bibliothèque ←",es:"Abrir la biblioteca ←"},
    "پێناسە و ڕێنمایی دەستە ←":{en:"Team profile and guide ←",ar:"تعريف الفريق والدليل ←",tr:"Ekip tanıtımı ve rehber ←",fa:"معرفی و راهنمای گروه ←",az:"Komanda profili və bələdçi ←",ru:"О команде и руководство ←",de:"Teamprofil und Leitfaden ←",fr:"Présentation de l’équipe et guide ←",es:"Perfil del equipo y guía ←"},
    "سەرنوسەر و دەستەی ئەکادێمی":{en:"Editor and academic team",ar:"المحرر والفريق الأكاديمي",tr:"Editör ve akademik ekip",fa:"سردبیر و گروه علمی",az:"Redaktor və akademik heyət",ru:"Редактор и академическая команда",de:"Redaktion und akademisches Team",fr:"Rédaction et équipe académique",es:"Editor y equipo académico"},
    "خاوەن‌ماڵپەڕ و بەڕێوەبەری پلاتفۆرم":{en:"Site owner and platform administrator",ar:"مالك الموقع ومدير المنصة",tr:"Site sahibi ve platform yöneticisi",fa:"مالک وب‌سایت و مدیر پلتفرم",az:"Sayt sahibi və platform rəhbəri",ru:"Владелец сайта и администратор платформы",de:"Websiteinhaber und Plattformadministrator",fr:"Propriétaire du site et administrateur",es:"Propietario del sitio y administrador de la plataforma"},
    "پاڵ‌پشتیەکی دڵ‌خوازانە":{en:"Voluntary support",ar:"دعم تطوعي",tr:"Gönüllü destek",fa:"پشتیبانی داوطلبانه",az:"Könüllü dəstək",ru:"Добровольная поддержка",de:"Freiwillige Unterstützung",fr:"Soutien volontaire",es:"Apoyo voluntario"},
    "پاڵ‌پشتی لە ڕێگەی هەژماری بانکی":{en:"Support via bank transfer",ar:"الدعم عبر التحويل المصرفي",tr:"Banka havalesiyle destek",fa:"حمایت از طریق انتقال بانکی",az:"Bank köçürməsi ilə dəstək",ru:"Поддержка банковским переводом",de:"Unterstützung per Banküberweisung",fr:"Soutenir par virement bancaire",es:"Apoyar mediante transferencia bancaria"},
    "بۆچوونت لەبارەی زانستی کورد":{en:"Your feedback on Zanst Kurd",ar:"رأيك حول زانستي كورد",tr:"Zanst Kurd hakkında görüşünüz",fa:"نظر شما درباره زانستی کورد",az:"Zanst Kurd haqqında fikriniz",ru:"Ваш отзыв о Zanst Kurd",de:"Ihr Feedback zu Zanst Kurd",fr:"Votre avis sur Zanst Kurd",es:"Tu opinión sobre Zanst Kurd"},
    "کۆمێنتە پەسەندکراوەکان":{en:"Approved comments",ar:"التعليقات المعتمدة",tr:"Onaylanan yorumlar",fa:"دیدگاه‌های تأییدشده",az:"Təsdiqlənmiş şərhlər",ru:"Одобренные комментарии",de:"Freigegebene Kommentare",fr:"Commentaires approuvés",es:"Comentarios aprobados"},
    "کۆمێنت و بۆچوون بنوسە":{en:"Write a comment or review",ar:"اكتب تعليقًا أو مراجعة",tr:"Yorum veya değerlendirme yazın",fa:"دیدگاه یا نظر بنویسید",az:"Şərh və rəy yazın",ru:"Напишите комментарий или отзыв",de:"Kommentar oder Bewertung schreiben",fr:"Écrire un commentaire ou un avis",es:"Escribe un comentario o una reseña"},
    "خاڵەکەت (١ تا ٥ ستێرە)":{en:"Your rating (1–5 stars)",ar:"تقييمك (من ١ إلى ٥ نجوم)",tr:"Puanınız (1–5 yıldız)",fa:"امتیاز شما (۱ تا ۵ ستاره)",az:"Qiymətiniz (1–5 ulduz)",ru:"Ваша оценка (1–5 звёзд)",de:"Ihre Bewertung (1–5 Sterne)",fr:"Votre note (1 à 5 étoiles)",es:"Tu valoración (1–5 estrellas)"},
    "ناو (ئارەزومەندانە)":{en:"Name (optional)",ar:"الاسم (اختياري)",tr:"Ad (isteğe bağlı)",fa:"نام (اختیاری)",az:"Ad (istəyə bağlı)",ru:"Имя (необязательно)",de:"Name (optional)",fr:"Nom (facultatif)",es:"Nombre (opcional)"},
    "کۆمێنت (ئارەزومەندانە)":{en:"Comment (optional)",ar:"التعليق (اختياري)",tr:"Yorum (isteğe bağlı)",fa:"دیدگاه (اختیاری)",az:"Şərh (istəyə bağlı)",ru:"Комментарий (необязательно)",de:"Kommentar (optional)",fr:"Commentaire (facultatif)",es:"Comentario (opcional)"},
    "ناردنی خاڵ و بۆچوون":{en:"Submit rating and feedback",ar:"إرسال التقييم والرأي",tr:"Puanı ve görüşü gönder",fa:"ارسال امتیاز و نظر",az:"Qiymət və rəyi göndər",ru:"Отправить оценку и отзыв",de:"Bewertung und Feedback senden",fr:"Envoyer la note et l’avis",es:"Enviar valoración y opinión"},
    "ڕۆژمێری سێ‌زمانە":{en:"Three-language calendar",ar:"تقويم بثلاث لغات",tr:"Üç dilli takvim",fa:"تقویم سه‌زبانه",az:"Üçdilli təqvim",ru:"Трёхъязычный календарь",de:"Dreisprachiger Kalender",fr:"Calendrier trilingue",es:"Calendario trilingüe"},
    "ژمارەی مۆبایل":{en:"Mobile number",ar:"رقم الهاتف المحمول",tr:"Cep telefonu numarası",fa:"شماره تلفن همراه",az:"Mobil nömrə",ru:"Номер мобильного телефона",de:"Mobilnummer",fr:"Numéro de téléphone portable",es:"Número de móvil"},
    "وشەی نهێنیت لەبیر کردوە؟":{en:"Forgot your password?",ar:"هل نسيت كلمة المرور؟",tr:"Şifrenizi mi unuttunuz?",fa:"گذرواژه را فراموش کرده‌اید؟",az:"Şifrənizi unutmusunuz?",ru:"Забыли пароль?",de:"Passwort vergessen?",fr:"Mot de passe oublié ?",es:"¿Olvidaste tu contraseña?"},
    "دووبارەکردنەوەی وشەی نهێنی":{en:"Confirm password",ar:"تأكيد كلمة المرور",tr:"Şifreyi doğrula",fa:"تکرار گذرواژه",az:"Şifrəni təsdiqlə",ru:"Подтвердите пароль",de:"Passwort bestätigen",fr:"Confirmer le mot de passe",es:"Confirmar contraseña"},
    "پشتڕاستکردنەوەی ژمارەی مۆبایل":{en:"Verify mobile number",ar:"التحقق من رقم الهاتف",tr:"Telefon numarasını doğrula",fa:"تأیید شماره تلفن",az:"Mobil nömrəni təsdiqlə",ru:"Подтвердить номер телефона",de:"Mobilnummer bestätigen",fr:"Vérifier le numéro mobile",es:"Verificar número móvil"},
    "کۆدی پشتڕاستکردنەوە":{en:"Verification code",ar:"رمز التحقق",tr:"Doğrulama kodu",fa:"کد تأیید",az:"Təsdiq kodu",ru:"Код подтверждения",de:"Bestätigungscode",fr:"Code de vérification",es:"Código de verificación"},
    "پشتڕاستکردنەوە و بەردەوامبوون":{en:"Verify and continue",ar:"تحقق وتابع",tr:"Doğrula ve devam et",fa:"تأیید و ادامه",az:"Təsdiqlə və davam et",ru:"Подтвердить и продолжить",de:"Bestätigen und fortfahren",fr:"Vérifier et continuer",es:"Verificar y continuar"},
    "گۆڕینی وشەی نهێنی":{en:"Change password",ar:"تغيير كلمة المرور",tr:"Şifreyi değiştir",fa:"تغییر گذرواژه",az:"Şifrəni dəyiş",ru:"Изменить пароль",de:"Passwort ändern",fr:"Changer le mot de passe",es:"Cambiar contraseña"},
    "وشەی نهێنیی نوێ":{en:"New password",ar:"كلمة المرور الجديدة",tr:"Yeni şifre",fa:"گذرواژه جدید",az:"Yeni şifrə",ru:"Новый пароль",de:"Neues Passwort",fr:"Nouveau mot de passe",es:"Nueva contraseña"},
    "نوێکردنەوەی وشەی نهێنی":{en:"Update password",ar:"تحديث كلمة المرور",tr:"Şifreyi güncelle",fa:"به‌روزرسانی گذرواژه",az:"Şifrəni yenilə",ru:"Обновить пароль",de:"Passwort aktualisieren",fr:"Mettre à jour le mot de passe",es:"Actualizar contraseña"},
    "ژمارەی خوێندکار":{en:"Student number",ar:"رقم الطالب",tr:"Öğrenci numarası",fa:"شماره دانشجو",az:"Tələbə nömrəsi",ru:"Номер студента",de:"Studierendennummer",fr:"Numéro étudiant",es:"Número de estudiante"},
    "دۆخی هەژمار":{en:"Account status",ar:"حالة الحساب",tr:"Hesap durumu",fa:"وضعیت حساب",az:"Hesabın vəziyyəti",ru:"Статус аккаунта",de:"Kontostatus",fr:"État du compte",es:"Estado de la cuenta"},
    "چالاک‌کردنی هەژمار پێویستە":{en:"Account activation required",ar:"يلزم تفعيل الحساب",tr:"Hesap etkinleştirmesi gerekli",fa:"فعال‌سازی حساب لازم است",az:"Hesabın aktivləşdirilməsi tələb olunur",ru:"Требуется активация аккаунта",de:"Kontoaktivierung erforderlich",fr:"Activation du compte requise",es:"Se requiere activar la cuenta"},
    "پوختەی بەشداربون":{en:"Enrollment summary",ar:"ملخص التسجيل",tr:"Kayıt özeti",fa:"خلاصه ثبت‌نام",az:"Qeydiyyat xülasəsi",ru:"Сводка о зачислении",de:"Anmeldeübersicht",fr:"Résumé d’inscription",es:"Resumen de inscripción"},
    "بابەتە سەرەکیەکان":{en:"Main topics",ar:"الموضوعات الرئيسية",tr:"Ana konular",fa:"موضوعات اصلی",az:"Əsas mövzular",ru:"Основные темы",de:"Hauptthemen",fr:"Sujets principaux",es:"Temas principales"},
    "گەڕان بە ناو بابەتەکاندا":{en:"Search topics",ar:"البحث في الموضوعات",tr:"Konularda ara",fa:"جست‌وجو در موضوعات",az:"Mövzularda axtar",ru:"Поиск по темам",de:"Themen durchsuchen",fr:"Rechercher des sujets",es:"Buscar temas"},
    "ڕێزمان":{en:"Grammar",ar:"النحو",tr:"Dil bilgisi",fa:"دستور زبان",az:"Qrammatika",ru:"Грамматика",de:"Grammatik",fr:"Grammaire",es:"Gramática"},
    "مۆرفۆلۆژی":{en:"Morphology",ar:"الصرف",tr:"Biçimbilim",fa:"واژه‌شناسی",az:"Morfologiya",ru:"Морфология",de:"Morphologie",fr:"Morphologie",es:"Morfología"},
    "فۆنەتیک و فۆنۆلۆژی":{en:"Phonetics and phonology",ar:"الصوتيات وعلم الأصوات الوظيفي",tr:"Fonetik ve fonoloji",fa:"آواشناسی و واج‌شناسی",az:"Fonetika və fonologiya",ru:"Фонетика и фонология",de:"Phonetik und Phonologie",fr:"Phonétique et phonologie",es:"Fonética y fonología"},
    "سینتاکس و توێژینەوە":{en:"Syntax and research",ar:"التركيب والبحث",tr:"Sözdizimi ve araştırma",fa:"نحو و پژوهش",az:"Sintaksis və tədqiqat",ru:"Синтаксис и исследования",de:"Syntax und Forschung",fr:"Syntaxe et recherche",es:"Sintaxis e investigación"},
    "فێربونی زمانی کوردی":{en:"Learning Kurdish",ar:"تعلّم الكردية",tr:"Kürtçe öğrenme",fa:"یادگیری کردی",az:"Kürd dilini öyrənmək",ru:"Изучение курдского",de:"Kurdisch lernen",fr:"Apprendre le kurde",es:"Aprender kurdo"},
    "کتێبەکان":{en:"Books",ar:"الكتب",tr:"Kitaplar",fa:"کتاب‌ها",az:"Kitablar",ru:"Книги",de:"Bücher",fr:"Livres",es:"Libros"},
    "ئامانجەکان":{en:"Objectives",ar:"الأهداف",tr:"Hedefler",fa:"هدف‌ها",az:"Məqsədlər",ru:"Цели",de:"Ziele",fr:"Objectifs",es:"Objetivos"},
    "چەمکەکان":{en:"Concepts",ar:"المفاهيم",tr:"Kavramlar",fa:"مفاهیم",az:"Anlayışlar",ru:"Понятия",de:"Begriffe",fr:"Concepts",es:"Conceptos"},
    "پۆلێن‌کردن":{en:"Classification",ar:"التصنيف",tr:"Sınıflandırma",fa:"طبقه‌بندی",az:"Təsnifat",ru:"Классификация",de:"Klassifikation",fr:"Classification",es:"Clasificación"},
    "بازنەکان":{en:"Regions",ar:"المناطق",tr:"Bölgeler",fa:"ناحیه‌ها",az:"Bölgələr",ru:"Регионы",de:"Regionen",fr:"Régions",es:"Regiones"},
    "ناونان و ڕەخنە":{en:"Naming and critique",ar:"التسمية والنقد",tr:"Adlandırma ve eleştiri",fa:"نام‌گذاری و نقد",az:"Adlandırma və tənqid",ru:"Наименование и критика",de:"Benennung und Kritik",fr:"Dénomination et critique",es:"Denominación y crítica"},
    "مێتۆدی توێژینەوە":{en:"Research method",ar:"منهج البحث",tr:"Araştırma yöntemi",fa:"روش پژوهش",az:"Tədqiqat metodu",ru:"Метод исследования",de:"Forschungsmethode",fr:"Méthode de recherche",es:"Método de investigación"},
    "هەڵسەنگاندن":{en:"Assessment",ar:"التقييم",tr:"Değerlendirme",fa:"ارزیابی",az:"Qiymətləndirmə",ru:"Оценка",de:"Bewertung",fr:"Évaluation",es:"Evaluación"},
    "ڕاپۆرتی ئەدا و پێشکەوتن":{en:"Performance and progress report",ar:"تقرير الأداء والتقدم",tr:"Performans ve ilerleme raporu",fa:"گزارش عملکرد و پیشرفت",az:"Performans və irəliləyiş hesabatı",ru:"Отчёт о результатах и прогрессе",de:"Leistungs- und Fortschrittsbericht",fr:"Rapport de performance et de progression",es:"Informe de rendimiento y progreso"},
    "چوون بۆ کاتەلۆگی ڕێڕەو":{en:"Go to learning-path catalog",ar:"الانتقال إلى فهرس مسارات التعلم",tr:"Öğrenme yolu kataloğuna git",fa:"رفتن به فهرست مسیرهای یادگیری",az:"Öyrənmə yolu kataloquna keç",ru:"Перейти к каталогу учебных маршрутов",de:"Zum Lernpfadkatalog",fr:"Aller au catalogue des parcours",es:"Ir al catálogo de rutas de aprendizaje"},
    "پەنێڵی تایبەتی خوێندکار":{en:"Student dashboard",ar:"لوحة الطالب",tr:"Öğrenci paneli",fa:"پنل دانشجو",az:"Tələbə paneli",ru:"Панель студента",de:"Studentenbereich",fr:"Espace étudiant",es:"Panel del estudiante"},
    "چوونەوە بۆ پەنێڵی خوێندکار ←":{en:"Return to student dashboard ←",ar:"العودة إلى لوحة الطالب ←",tr:"Öğrenci paneline dön ←",fa:"بازگشت به پنل دانشجو ←",az:"Tələbə panelinə qayıt ←",ru:"Вернуться в панель студента ←",de:"Zurück zum Studentenbereich ←",fr:"Retour à l’espace étudiant ←",es:"Volver al panel del estudiante ←"},
    "وانەکانت بە ڕێڕەوی خۆت هەڵ‌بژێرە":{en:"Choose lessons along your own path",ar:"اختر دروسك وفق مسارك",tr:"Dersleri kendi yoluna göre seç",fa:"درس‌ها را بر اساس مسیر خود انتخاب کنید",az:"Dərsləri öz yoluna uyğun seç",ru:"Выбирайте уроки по своему маршруту",de:"Wählen Sie Lektionen nach Ihrem Lernpfad",fr:"Choisissez les leçons selon votre parcours",es:"Elige lecciones según tu ruta"},
    "زوانەکان و ڕێڕەوەکانی وانە":{en:"Languages and lesson paths",ar:"اللغات ومسارات الدروس",tr:"Diller ve ders yolları",fa:"زبان‌ها و مسیرهای درس",az:"Dillər və dərs marşrutları",ru:"Языки и учебные маршруты",de:"Sprachen und Lernpfade",fr:"Langues et parcours de cours",es:"Idiomas y rutas de lecciones"},
    "بازنەی باکور":{en:"Northern region",ar:"المنطقة الشمالية",tr:"Kuzey bölgesi",fa:"ناحیه شمالی",az:"Şimal bölgəsi",ru:"Северный регион",de:"Nördliche Region",fr:"Région du Nord",es:"Región norte"},
    "بازنەی ناوەندی":{en:"Central region",ar:"المنطقة الوسطى",tr:"Merkez bölgesi",fa:"ناحیه مرکزی",az:"Mərkəzi bölgə",ru:"Центральный регион",de:"Zentrale Region",fr:"Région centrale",es:"Región central"},
    "بازنەی باشور":{en:"Southern region",ar:"المنطقة الجنوبية",tr:"Güney bölgesi",fa:"ناحیه جنوبی",az:"Cənub bölgəsi",ru:"Южный регион",de:"Südliche Region",fr:"Région du Sud",es:"Región sur"},
    "کورمانجی":{en:"Kurmanji",ar:"الكرمانجية",tr:"Kurmancî",fa:"کرمانجی",az:"Kurmanci",ru:"Курманджи",de:"Kurmandschi",fr:"Kurmancî",es:"Kurmanji"},
    "موکریانی و سلێمانی کۆرسی ١ · ٢٦ وانە":{en:"Mukriani and Slemani · Course 1 · 26 lessons",ar:"المكريانية والسليمانية · الدورة ١ · ٢٦ درسًا",tr:"Mukriani ve Süleymaniye · Kurs 1 · 26 ders",fa:"موکریانی و سلیمانی · دوره ۱ · ۲۶ درس",az:"Mukriani və Süleymani · Kurs 1 · 26 dərs",ru:"Мукриани и Сулеймани · Курс 1 · 26 уроков",de:"Mukriani und Slemani · Kurs 1 · 26 Lektionen",fr:"Mukriani et Slemani · Cours 1 · 26 leçons",es:"Mukriani y Slemani · Curso 1 · 26 lecciones"},
    "هەورامی":{en:"Hawrami",ar:"الهورامية",tr:"Hewramî",fa:"هورامی",az:"Həwrəmi",ru:"Хаврами",de:"Hawrami",fr:"Hawrami",es:"Hawrami"},
    "کەڵهوڕ":{en:"Kalhori",ar:"الكلورية",tr:"Kelhurî",fa:"کلهری",az:"Kəlhuri",ru:"Калхури",de:"Kalhori",fr:"Kalhori",es:"Kalhori"},
    "لەکی":{en:"Laki",ar:"اللكية",tr:"Lekî",fa:"لکی",az:"Ləki",ru:"Лаки",de:"Laki",fr:"Laki",es:"Laki"},
    "چوونە نێو کۆرس ←":{en:"Open course ←",ar:"فتح الدورة ←",tr:"Kursu aç ←",fa:"ورود به دوره ←",az:"Kursa daxil ol ←",ru:"Открыть курс ←",de:"Kurs öffnen ←",fr:"Ouvrir le cours ←",es:"Abrir curso ←"},
    "ڕێڕەوی فەرمی دەورەکان":{en:"Official course paths",ar:"مسارات الدورات الرسمية",tr:"Resmî kurs yolları",fa:"مسیرهای رسمی دوره‌ها",az:"Rəsmi kurs marşrutları",ru:"Официальные учебные маршруты",de:"Offizielle Kurswege",fr:"Parcours officiels des cours",es:"Rutas oficiales de cursos"},
    "پەڕەی دەورەی ١ ←":{en:"Course 1 page ←",ar:"صفحة الدورة ١ ←",tr:"1. kurs sayfası ←",fa:"صفحه دوره ۱ ←",az:"Kurs 1 səhifəsi ←",ru:"Страница курса 1 ←",de:"Seite von Kurs 1 ←",fr:"Page du cours 1 ←",es:"Página del curso 1 ←"},
    "ناسینی دەورەی ٢ ←":{en:"Explore Course 2 ←",ar:"استكشف الدورة ٢ ←",tr:"2. kursu keşfet ←",fa:"آشنایی با دوره ۲ ←",az:"Kurs 2 ilə tanış ol ←",ru:"Познакомиться с курсом 2 ←",de:"Kurs 2 entdecken ←",fr:"Découvrir le cours 2 ←",es:"Explorar el curso 2 ←"},
    "کۆرسی زانستی و ئەکادێمیکی ڕێنوسی زوانی کوردیک":{en:"Academic Kurdish orthography course",ar:"دورة أكاديمية في إملاء اللغة الكردية",tr:"Akademik Kürtçe yazım kursu",fa:"دوره علمی و دانشگاهی املای زبان کردی",az:"Kürd dilinin akademik orfoqrafiya kursu",ru:"Академический курс курдской орфографии",de:"Akademischer Kurs zur kurdischen Orthografie",fr:"Cours académique d’orthographe kurde",es:"Curso académico de ortografía kurda"},
    "کۆرسی ئەکادێمیک و زانستی فۆنێتیک و فۆنۆلۆجی زوانی کوردیک":{en:"Academic Kurdish phonetics and phonology course",ar:"دورة أكاديمية في صوتيات وفونولوجيا الكردية",tr:"Akademik Kürtçe fonetik ve fonoloji kursu",fa:"دوره علمی آواشناسی و واج‌شناسی زبان کردی",az:"Kürd dilinin akademik fonetika və fonologiya kursu",ru:"Академический курс фонетики и фонологии курдского языка",de:"Akademischer Kurs zur kurdischen Phonetik und Phonologie",fr:"Cours académique de phonétique et phonologie kurdes",es:"Curso académico de fonética y fonología kurdas"},
        "هەڵبژاردنی زمانی ماڵپەڕ":{en:"Choose site language",ar:"اختيار لغة الموقع",tr:"Site dilini seç",fa:"انتخاب زبان وب‌سایت",az:"Sayt dilini seç",ru:"Выбрать язык сайта",de:"Seitensprache wählen",fr:"Choisir la langue du site",es:"Elegir idioma del sitio"}
  };
  const originals=new WeakMap();
  const attributeOriginals=new WeakMap();
  let activeLanguage="ckb";
  let observer=null;
  const uiSelector='a,button,label,summary,[role="button"],[role="menuitem"],.chip,.v2-footer-social,h1,h2,h3,h4';
  const ignoredSelector='.lesson-content,article,.article-body,.lesson-body,.topic-content,.book-content,[data-no-translate],script,style,textarea,input,select,option,code,pre,.notranslate';
  function isUiNode(node){
    const p=node&&node.parentElement;
    return !!(p && !p.closest(ignoredSelector) && p.closest(uiSelector));
  }
  function remember(node){if(node&&!originals.has(node))originals.set(node,node.nodeValue);}
  function applyNode(node,code){
    if(!node||!node.isConnected||!isUiNode(node))return;
    remember(node);
    const original=originals.get(node);
    const trimmed=String(original||"").trim();
    const leading=(String(original||"").match(/^\s*/)||[""])[0];
    const trailing=(String(original||"").match(/\s*$/)||[""])[0];
    const translated=LABELS[trimmed]&&LABELS[trimmed][code];
    const nextValue=code==="ckb"?original:(translated?leading+translated+trailing:original);
    if(node.nodeValue!==nextValue)node.nodeValue=nextValue;
  }
  function applyUiAttributes(root,code){
    if(!root||root.nodeType!==Node.ELEMENT_NODE)return;
    const selector='[placeholder],[title],[aria-label],[alt]';
    const elements=[];
    if(root.matches?.(selector))elements.push(root);
    if(root.querySelectorAll)elements.push(...root.querySelectorAll(selector));
    const ignored='.lesson-content,article,.article-body,.lesson-body,.topic-content,.book-content,[data-no-translate],script,style,textarea,code,pre,.notranslate';
    for(const el of elements){
      if(el.closest(ignored))continue;
      let originalsForElement=attributeOriginals.get(el);
      if(!originalsForElement){originalsForElement=new Map();attributeOriginals.set(el,originalsForElement);}
      for(const attr of ['placeholder','title','aria-label','alt']){
        if(!el.hasAttribute(attr))continue;
        if(!originalsForElement.has(attr))originalsForElement.set(attr,el.getAttribute(attr));
        const original=originalsForElement.get(attr)||'';
        const translated=LABELS[original.trim()]&&LABELS[original.trim()][code];
        const nextValue=code==='ckb'?original:(translated||original);
        if(el.getAttribute(attr)!==nextValue)el.setAttribute(attr,nextValue);
      }
    }
  }
  const dynamicTranslationOriginals=new Map();
  const dynamicTranslationCache=new Map();
  let translationRunId=0;
  function translationIgnored(node){
    const parent=node&&node.parentElement;
    if(!parent || parent.closest('.lesson-content,article,.lesson-body,.book-content,.article-body,.topic-content,[data-no-translate],script,style,textarea,input,select,option,code,pre,svg,.notranslate'))return true;
    if(isUiNode(node)){
      const original=originals.has(node)?originals.get(node):node.nodeValue;
      const known=LABELS[String(original||"").trim()];
      return !!(known && known[activeLanguage]);
    }
    return false;
  }
  function collectPageTextNodes(){
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    const nodes=[];
    while(walker.nextNode()){
      const node=walker.currentNode;
      if(translationIgnored(node))continue;
      const original=dynamicTranslationOriginals.has(node)?dynamicTranslationOriginals.get(node):node.nodeValue;
      const trimmed=String(original||"").trim();
      if(trimmed.length<2 || !/[\p{L}]/u.test(trimmed))continue;
      if(!dynamicTranslationOriginals.has(node))dynamicTranslationOriginals.set(node,node.nodeValue);
      nodes.push({node,text:original});
    }
    return nodes;
  }
  function splitTranslationText(text,maxLength=620){
    const parts=[];
    let rest=String(text||"");
    while(rest.length>maxLength){
      let cut=rest.lastIndexOf(" ",maxLength);
      if(cut<Math.floor(maxLength*0.55))cut=maxLength;
      parts.push(rest.slice(0,cut));
      rest=rest.slice(cut);
    }
    if(rest)parts.push(rest);
    return parts;
  }
  function translationWait(ms){return new Promise(resolve=>setTimeout(resolve,ms));}
  async function translatePageContent(code){
    const runId=++translationRunId;
    const nodes=collectPageTextNodes();
    if(code==="ckb"){
      for(const [node,original] of dynamicTranslationOriginals){
        if(node.isConnected && node.nodeValue!==original)node.nodeValue=original;
      }
      return;
    }
    if(!nodes.length)return;
    showStatus("وەرگێڕانی ناوەڕۆکی گشتی دەستی پێکرد...");
    let config=window.ZANSTI_SUPABASE;
    if(!config?.url || !config?.publishableKey){
      try{
        await new Promise((resolve,reject)=>{
          const existing=document.getElementById("avasin-translation-config");
          if(existing){existing.addEventListener("load",resolve,{once:true});existing.addEventListener("error",reject,{once:true});return;}
          const loader=document.createElement("script");
          loader.id="avasin-translation-config";
          loader.src=(location.pathname.includes("/lessons/")?"../supabase-config.js":"supabase-config.js")+"?v=20261017-translation";
          loader.onload=resolve;loader.onerror=reject;document.head.appendChild(loader);
        });
        config=window.ZANSTI_SUPABASE;
      }catch(_){}
    }
    if(!config?.url || !config?.publishableKey){
      showStatus("پەیوەندیی وەرگێڕان ئامادە نییە؛ تکایە دواتر هەوڵ بدەوە.");
      return;
    }
    const endpoint=config.url.replace(/\/$/,"")+"/functions/v1/translate-page";
    const units=[];
    for(const item of nodes){
      const pieces=splitTranslationText(item.text);
      units.push({node:item.node,original:item.text,pieces,translated:new Array(pieces.length),failed:false});
    }
    const requests=[];
    for(const unit of units){
      unit.pieces.forEach((piece,index)=>{
        const key=code+"\u0000"+piece;
        let cached=dynamicTranslationCache.get(key);
        if(cached===undefined){try{cached=sessionStorage.getItem("avasin-translation:"+key)??undefined;}catch(_){}}
        if(cached!==undefined){
          dynamicTranslationCache.set(key,cached);
          unit.translated[index]=cached;
        }else requests.push({unit,index,text:piece,key});
      });
    }
    let failed=false,translatedCount=0;
    for(let i=0;i<requests.length;i+=8){
      if(runId!==translationRunId || activeLanguage!==code)return;
      const batch=requests.slice(i,i+8);
      try{
        const response=await fetch(endpoint,{
          method:"POST",
          headers:{"Content-Type":"application/json","apikey":config.publishableKey},
          body:JSON.stringify({target:code,texts:batch.map(item=>item.text)})
        });
        if(!response.ok)throw new Error("HTTP "+response.status);
        const payload=await response.json();
        if(!Array.isArray(payload.translations)||payload.translations.length!==batch.length)throw new Error("Invalid translation response");
        payload.translations.forEach((value,j)=>{
          const request=batch[j];
          if(typeof value!=="string"||!value.trim()){request.unit.failed=true;failed=true;return;}
          request.unit.translated[request.index]=value;
          dynamicTranslationCache.set(request.key,value);
          try{sessionStorage.setItem("avasin-translation:"+request.key,value);}catch(_){}
        });
      }catch(error){
        failed=true;
        batch.forEach(item=>item.unit.failed=true);
        console.warn("[Avasin translation]",error);
      }
      if(i+8<requests.length)await translationWait(700);
    }
    if(runId!==translationRunId || activeLanguage!==code)return;
    for(const unit of units){
      if(unit.failed || unit.translated.some(part=>typeof part!=="string"))continue;
      if(unit.node.isConnected)unit.node.nodeValue=unit.translated.join("");
      translatedCount++;
    }
    if(failed)showStatus("بەشێک لە دەقەکان وەرنەگێڕدرا؛ خزمەتگوزاریی وەرگێڕان سنووردارە. دەتوانیت دواتر هەوڵ بدەیتەوە.");
    else showStatus("وەرگێڕانی "+translatedCount+" بەشی دەق تەواو بوو.");
  }
  function localizeUi(code,notify=true){
    activeLanguage=code;
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    const nodes=[];while(walker.nextNode())if(isUiNode(walker.currentNode))nodes.push(walker.currentNode);
    nodes.forEach(n=>applyNode(n,code));
    applyUiAttributes(document.body,code);
    const lang=LANGUAGES.find(x=>x.code===code)||LANGUAGES[0];
    document.documentElement.lang=code;
    const panel=document.getElementById("avasin-global-language")||document.querySelector(".avasin-language-mini");
    if(panel){
      const label=panel.querySelector(".avasin-language-current");
      if(label){label.textContent=lang.initial;label.setAttribute("aria-label","زمانی هەڵبژێردراو: "+lang.name);}
      const list=panel.querySelector(".avasin-language-options");
      list?.querySelectorAll(".avasin-language-option").forEach(button=>{
        const active=button.dataset.lang===code;
        button.classList.toggle("is-active",active);
        button.setAttribute("aria-selected",active?"true":"false");
      });
      const caption=panel.querySelector(".avasin-language-panel-caption");
      if(caption)caption.textContent=(LABELS["زمانی ماڵپەڕ"][code]||"زمانی ماڵپەڕ");
      const summary=panel.querySelector("summary");
      if(summary)summary.setAttribute("aria-label",LABELS["هەڵبژاردنی زمانی ماڵپەڕ"][code]||"هەڵبژاردنی زمانی ماڵپەڕ");
    }
    try{localStorage.setItem("avasin-site-language",code);}catch(_){}
    if(notify){
      if(code!=="ckb"){
        showStatus("ڕووکاری ماڵپەڕ گۆڕدرا؛ وەرگێڕانی بەشە گشتییەکان دەستی پێکرد.");
      }else{
        showStatus("زمانی ڕووکاری ماڵپەڕ گەڕایەوە بۆ کوردیی سۆرانی.");
      }
    }
    void translatePageContent(code);
  }
  function showStatus(message){
    let status=document.getElementById("avasin-translation-status");
    if(!status){status=document.createElement("div");status.id="avasin-translation-status";status.setAttribute("role","status");status.style.cssText="position:fixed;bottom:12px;left:12px;z-index:99999;max-width:min(360px,90vw);padding:.65rem .9rem;border-radius:10px;background:#173f32;color:#f6e8c4;font:14px/1.5 sans-serif;box-shadow:0 4px 18px #0003";document.body.appendChild(status);}
    status.textContent=message;
    clearTimeout(status._hideTimer);
    status._hideTimer=setTimeout(()=>status.remove(),6500);
  }
  function setup(){
    let panel=document.getElementById("avasin-global-language")||document.querySelector(".avasin-language-mini");
    if(!panel){
      panel=document.createElement("details");panel.className="avasin-language-mini";panel.id="avasin-global-language";
      panel.innerHTML='<summary aria-label="گۆڕینی زمانی ماڵپەڕ"><span class="avasin-language-current">ک</span><span class="avasin-language-chevron" aria-hidden="true">⌄</span></summary><div class="avasin-language-mini-panel"><div class="avasin-language-panel-caption">زمانی ماڵپەڕ</div><div class="avasin-language-options" role="listbox" aria-label="هەڵبژاردنی زمانی ماڵپەڕ"></div></div>';
      document.body.appendChild(panel);
    }
    const inner=panel.querySelector(".avasin-language-mini-panel");if(!inner)return;
    let list=panel.querySelector(".avasin-language-options");
    if(!list){list=document.createElement("div");list.className="avasin-language-options";inner.appendChild(list);}
    const label=panel.querySelector(".avasin-language-current");
    if(!list.dataset.built){
      LANGUAGES.forEach((lang,index)=>{
        const button=document.createElement("button");button.type="button";
        button.className="avasin-language-option avasin-language-option-style-"+(index%8);
        button.dataset.lang=lang.code;button.setAttribute("role","option");button.setAttribute("aria-label",lang.name);
        button.innerHTML='<span class="avasin-language-option-initial" aria-hidden="true"></span><span class="avasin-language-option-name"></span><span class="avasin-language-option-mark" aria-hidden="true">✓</span>';
        button.querySelector(".avasin-language-option-initial").textContent=lang.initial;
        button.querySelector(".avasin-language-option-name").textContent=lang.name;
        button.addEventListener("click",()=>{panel.open=false;localizeUi(lang.code,true);});
        list.appendChild(button);
      });
      list.dataset.built="true";
    }
    let saved="ckb";try{const s=localStorage.getItem("avasin-site-language");if(LANGUAGES.some(x=>x.code===s))saved=s;}catch(_){}
    rememberUi();
    const observerFn=()=>{if(activeLanguage==="ckb")return;rememberUi();};
    observer=new MutationObserver(records=>{
      if(activeLanguage==="ckb")return;
      records.forEach(record=>{
        if(record.type==="characterData"){
          applyNode(record.target,activeLanguage);
        }else if(record.type==="childList"){
          record.addedNodes.forEach(node=>{
            if(node.nodeType===Node.TEXT_NODE)applyNode(node,activeLanguage);
            else if(node.nodeType===Node.ELEMENT_NODE){
              const walker=document.createTreeWalker(node,NodeFilter.SHOW_TEXT);
              const added=[];while(walker.nextNode())if(isUiNode(walker.currentNode))added.push(walker.currentNode);
              added.forEach(n=>applyNode(n,activeLanguage));
              applyUiAttributes(node,activeLanguage);
            }
          });
        }
      });
    });
    function startObserver(){observer.observe(document.body,{subtree:true,childList:true,characterData:true});}
    function rememberUi(){
      const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
      while(walker.nextNode())if(isUiNode(walker.currentNode))remember(walker.currentNode);
    }
    localizeUi(saved,false);
    startObserver();
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",setup,{once:true});
  else setup();
})();
/* ===== Kurmanji sequential completion gate ===== */
(function(){
  const COURSES={
    "kurmanji-course-1":{
      id:"kurmanji-course-1",
      files:Array.from({length:26},(_,i)=>"kurmanji-course-1-lesson-"+String(i+1).padStart(2,"0")+".html"),
      storage:"avasin_kurmanji_course1_completed_v1"
    },
    "kurmanji-course-2":{
      id:"kurmanji-course-2",
      files:Array.from({length:12},(_,i)=>"kurmanji-course-2-lesson-"+String(i+1).padStart(2,"0")+".html"),
      storage:"avasin_kurmanji_course2_completed_v1"
    }
  };
  const path=(location.pathname.split("/").pop()||"").toLowerCase();
  const course=Object.values(COURSES).find(c=>c.files.includes(path));
  if(!course)return;
  const current=course.files.indexOf(path);

  function done(){
    try{return new Set(JSON.parse(localStorage.getItem(course.storage)||"[]").map(Number));}
    catch(e){return new Set();}
  }
  function save(values){
    localStorage.setItem(course.storage,JSON.stringify([...values].sort((a,b)=>a-b)));
  }
  function firstIncomplete(){
    const values=done();
    for(let i=0;i<course.files.length;i++)if(!values.has(i))return i;
    return course.files.length;
  }
  function addStyles(){
    if(document.getElementById("kurmanji-completion-styles"))return;
    const style=document.createElement("style");
    style.id="kurmanji-completion-styles";
    style.textContent=".kurmanji-completion-gate{margin:20px 0;padding:20px;border:1px solid #273d3226;border-right:4px solid #b38a58;border-radius:14px;background:#f7f6f0}.kurmanji-completion-gate h3{margin:0 0 8px;color:#26372f;font-size:1.1rem}.kurmanji-completion-gate p{margin:0 0 14px;line-height:1.9;color:#66716b}.kurmanji-complete-btn{border:0;border-radius:10px;padding:11px 18px;background:#273f34;color:#fff;font-weight:800;cursor:pointer}.kurmanji-complete-btn:disabled{opacity:.6;cursor:not-allowed}";
    document.head.appendChild(style);
  }
  async function setup(){
    const isOwner=await window.ZANSTI_OWNER_CHECK;
    addStyles();
    await window.ZANSTI_SYNC_PROGRESS(course.id,course.files,course.storage,isOwner===true);
    const completed=done(),first=firstIncomplete();
    if(!isOwner&&current>first){
      location.replace(course.files[first]||course.files[0]);
      return;
    }
    const actions=document.querySelector(".klesson-actions");
    if(!actions||actions.parentElement.querySelector(".kurmanji-completion-gate"))return;
    const already=completed.has(current);
    const next=current+1<course.files.length?current+1:null;
    const gate=document.createElement("section");
    gate.className="kurmanji-completion-gate";
    gate.innerHTML="<h3>"+(already?"ئەم وانە پێشتر تەواوکراوە.":"کۆتایی وانە")+"</h3><p>"+(already?"پێشکەوتنی ئەم وانەیە لە سیستەمدا پاشەکەوت کراوە.":"دوای خوێندنەوەی تەواوی وانە، دوگمەی خوارەوە هەڵ‌بژێرە بۆ پاشەکەوتکردنی تەواوبون و کردنەوەی وانەی دواتر.")+"</p><button class=\"kurmanji-complete-btn\" type=\"button\" "+(already?"disabled":"")+">"+(already?"✓ تەواوکراوە":"✓ نیشان‌دان وەک تەواوکراو")+"</button>";
    actions.parentElement.insertBefore(gate,actions);
    gate.querySelector("button").addEventListener("click",async function(){
      const button=this;
      button.disabled=true;
      button.textContent="لە سیستەمدا پاشەکەوت دەکرێت...";
      const result=await markLessonComplete(course.id,path);
      if(!result.ok){
        button.disabled=false;
        button.textContent="✓ نیشان‌دان وەک تەواوکراو";
        gate.querySelector("p").textContent="پاشەکەوتکردن سەرکەوتوو نەبوو. پشتڕاستی هەژمار و تۆماربوون لە کۆرسەکە بپشکنە و دووبارە هەوڵ بدەوە.";
        return;
      }
      const latest=done();
      latest.add(current);
      save(latest);
      button.textContent="✓ تەواوکراوە";
      gate.querySelector("h3").textContent="وانەکە بە سەرکەوتوویی تەواو کرا.";
      gate.querySelector("p").textContent=next!==null?"وانەی دواتر ئێستا کراوەتەوە.":"هەموو وانەکانی ئەم کۆرسە تەواو کراون.";
      button.disabled=true;
      if(next!==null)setTimeout(()=>location.href=course.files[next],650);
    });
  }
  function guardForwardNavigation(){
    document.addEventListener("click",function(event){
      const link=event.target.closest&&event.target.closest("a[href]");
      if(!link)return;
      const target=(link.getAttribute("href")||"").split("?")[0].split("#")[0].split("/").pop().toLowerCase();
      const targetIndex=course.files.indexOf(target);
      if(targetIndex<=current)return;
      if(done().has(current))return;
      event.preventDefault();
      event.stopImmediatePropagation();
      document.querySelector(".kurmanji-completion-gate")?.scrollIntoView({behavior:"smooth",block:"center"});
    },true);
  }
  guardForwardNavigation();
  setup();
})();

/* Avasin social links: ensure the network section is present across site pages */
(function(){
  "use strict";
  const telegramUrl = "https://t.me/zimannasi";
  const telegramMarkup = '<a class="v2-footer-social-link v2-telegram-link" title="تەلەگرام" href="' + telegramUrl + '" target="_blank" rel="noopener noreferrer" aria-label="کەناڵی تەلەگرامی زمان‌ناسی"><span class="v2-telegram-mark" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M21.5 3.6 18.3 20c-.2 1.1-.8 1.4-1.7.9l-4.8-3.6-2.3 2.2c-.3.3-.5.5-1 .5l.4-4.9 9-8.1c.4-.4-.1-.6-.6-.2L6.2 13.7l-4.7-1.5c-1-.3-1-1 .2-1.5L20 3.1c.9-.3 1.7.2 1.5.5Z"/></svg></span><span class="v2-social-link-copy"><strong>تەلەگرام · @zimannasi</strong><small>پەیوەندی و نوێکارییەکان</small></span><span class="v2-social-external" aria-hidden="true">↗</span></a>';
  const youtubeMarkup = '<a class="v2-footer-social-link v2-youtube-link" title="یوتیوب" href="https://www.youtube.com/@zimannas3366" target="_blank" rel="noopener noreferrer" aria-label="کەناڵی یوتیوبی زانستی کورد"><span aria-hidden="true" class="v2-youtube-mark"><svg viewBox="0 0 24 24" focusable="false"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z"/></svg></span><span class="v2-social-link-copy"><strong>کەناڵی یوتیوب</strong><small>ڤیدیۆ و ناوەڕۆکی زانستی</small></span><span class="v2-social-external" aria-hidden="true">↗</span></a>';
  function addSection(footer){
    const grid=footer.querySelector(".v2-footer-grid")||footer;
    let section=grid.querySelector(".v2-footer-social");
    if(!section){
      section=document.createElement("div");
      section.className="v2-footer-social";
      grid.appendChild(section);
    }
    /* Rebuild the contents so legacy text links become clean, icon-only buttons. */
    section.innerHTML='<h4>تۆڕەکانی ئێمە</h4>'+youtubeMarkup+telegramMarkup;
  }
  function setupSocialLinks(){
    const modernFooters=Array.from(document.querySelectorAll("footer.v2-footer"));
    if(modernFooters.length){modernFooters.forEach(addSection);return;}
    document.querySelectorAll("footer.footer, footer[role='contentinfo']").forEach(addSection);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",setupSocialLinks,{once:true});
  else setupSocialLinks();
})();