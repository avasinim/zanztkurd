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
  input.value="";input.placeholder="بە سەرکەوتوویی تۆمار کرا ✓";
});

const placeholderInfo = {
  "هەموو کتێبەکان ←":["کتێبخانە","لە وەشانی داهاتوو هەموو کتێبەکان لەگەڵ زانیاریی نووسەر، بابەت، نرخ و شێوازی بەدەستهێنان لێرە دەردەکەون."],
  "دەستپێکردن ←":["کوردی بۆ سەرەتاییان","ڕێڕەوێکی سەرەتایی بۆ ئەلفوبێ، وشەکانی ڕۆژانە و دروستکردنی ڕستە."],
  "بینینی ڕێڕەو ←":["ڕێڕەوی فێربوون","ڕێڕەوی هەڵبژێردراو بۆ فێربوونی زمانی کوردی و زمانەوانی."],
  "پرسیارە باوەکان":["پرسیارە باوەکان","زانیارییە باوەکان لەسەر فێربوون و بەکارهێنانی ئاڤاشین لەم بەشەدا کۆدەکرێنەوە."],
  "پەیوەندی":["پەیوەندی","بەشی پەیوەندیکردن لە وەشانی داهاتوو بە زانیاریی پەیوەندیی تەواو زیاد دەکرێت."],
  "مەرجەکان":["مەرجەکان","مەرج و یاساکانی بەکارهێنانی پلاتفۆرم لە وەشانی داهاتوو بە شێوەی تەواو دادەنرێن."]
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
  if(label==="دەستپێکردن" || label==="چوونەژوورەوە"){
    btn.addEventListener("click",()=>{
      openInfo(label, label==="دەستپێکردن"
        ? "لە ئێستادا دەتوانیت وانەکان ببینیت و بەشەکانی سایت بپشکنیت. سیستەمی هەژمار لە قۆناغی داهاتوودا زیاد دەکرێت."
        : "سیستەمی چوونەژوورەوە لە قۆناغی داهاتوودا زیاد دەکرێت.");
    });
  }
});

const lessonData = {
  "1": {"title":"مۆرفۆلۆژی کوردی: بنەماکان","topic":"مۆرفۆلۆژی","level":"ناوەندی","duration":"٣٠ خولەک","description":"وشەسازی، بنچینە و پێکهاتەی وشە لە زمانی کوردیدا.","detail":"لە ئەم وانەیەدا دەست بە تێگەیشتن لە مۆرفیم، ڕەگ و پاشگرەکان دەکەین و نموونەی کوردی بەکار دەهێنین."},
  "2": {"title":"فۆنەتیکی زمانی کوردی","topic":"فۆنەتیک","level":"سەرەتایی","duration":"٢٥ خولەک","description":"دەنگەکان، جیاوازییە فۆنەتیکییەکان و شێوازی دروستکردنیان.","detail":"دەنگی مرۆڤ، جۆرەکانی دەنگ و جیاوازیی نێوان فۆن و وشە بە شێوەیەکی سادە دەخوێنین."},
  "3": {"title":"ڕێزمان و سینتاکسی کوردی","topic":"ڕێزمان","level":"پێشکەوتوو","duration":"٤٥ خولەک","description":"پەیوەندی وشەکان و پێکهاتەی ڕستە لە دیدی زمانەوانییەوە.","detail":"پێکهاتەی ڕستە، ڕۆڵی وشەکان و هەندێک بنەمای سینتاکسیی کوردی بە نموونە دەبینین."},
  "4": {"title":"زمان و مێشک","topic":"زانست","level":"ناوەندی","duration":"٣٥ خولەک","description":"دەستپێکی زمانەوانیی دەروونی و چۆنیەتی کارکردنی زمان لە مێشک.","detail":"ئەم وانەیە پەیوەندی نێوان زمان، بیرکردنەوە و پرۆسەکردنی زمان لە مێشک دەخاتەڕوو."},
  "5": {"title":"بنەمای ڕێزمانی کوردی","topic":"ڕێزمان","level":"سەرەتایی","duration":"٢٠ خولەک","description":"ناو، کردار، هاوەڵناو و بنەما سەرەتاییەکانی ڕستە.","detail":"ئەگەر لە ڕێزمانی کوردی دەستپێدەکەیت، ئەم وانەیە بنەما سەرەتاییەکانت بە هێواشی ڕوون دەکات."},
  "6": {"title":"زمانەوانیی کۆمەڵایەتی","topic":"زانست","level":"پێشکەوتوو","duration":"٥٠ خولەک","description":"زمان و کۆمەڵگا، گۆڕانی زمان و ناسنامەی زمانەوانی.","detail":"لە پەیوەندیی نێوان زمان و کۆمەڵگا دەڕوانین و چۆنیەتی گۆڕانی زمان لە کۆنتێکستی کۆمەڵایەتی دەخوێنین."}
};

const lessonModal=document.getElementById("lessonModal");
const lessonTitle=document.getElementById("lessonModalTitle");
const lessonTopic=document.getElementById("lessonModalTopic");
const lessonLevel=document.getElementById("lessonModalLevel");
const lessonDuration=document.getElementById("lessonModalDuration");
const lessonDescription=document.getElementById("lessonModalDescription");
const lessonDetail=document.getElementById("lessonModalDetail");
const startLessonBtn=document.getElementById("startLessonBtn");

function openLesson(id){
  const item=lessonData[id];
  if(!item||!lessonModal) return;
  lessonTitle.textContent=item.title;
  lessonTopic.textContent=item.topic;
  lessonLevel.textContent=item.level;
  lessonDuration.textContent=item.duration;
  lessonDescription.textContent=item.description;
  lessonDetail.textContent=item.detail;
  if(startLessonBtn) startLessonBtn.dataset.lesson=id;
  lessonModal.classList.add("open");
  lessonModal.setAttribute("aria-hidden","false");
  document.body.classList.add("modal-open");
}
function closeLesson(){
  if(!lessonModal) return;
  lessonModal.classList.remove("open");
  lessonModal.setAttribute("aria-hidden","true");
  document.body.classList.remove("modal-open");
}
document.querySelectorAll(".learn-btn").forEach(btn=>{
  btn.addEventListener("click",()=>openLesson(btn.dataset.lesson));
});
lessonModal?.querySelectorAll("[data-close-lesson]").forEach(el=>el.addEventListener("click",closeLesson));
document.addEventListener("keydown",e=>{if(e.key==="Escape" && lessonModal?.classList.contains("open")) closeLesson();});
startLessonBtn?.addEventListener("click",()=>{
  const id=startLessonBtn.dataset.lesson;
  const note=document.getElementById("lessonNote");
  note.textContent="وانەکە هەڵبژێردرا ✓ بەشی خوێندنەوەی تەواو لە هەنگاوی داهاتوودا زیاد دەکرێت.";
  startLessonBtn.textContent="هەڵبژێردرا ✓";
  startLessonBtn.disabled=true;
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
    ["کتێبەکانی ئاڤاشین","ئەم بەشە بۆ ناساندن و پێشاندانی کتێبە پەیوەندیدارەکان بە زمانی کوردییە. لینک و زانیاریی وردی هەر کتێب لە وەشانی داهاتوو زیاد دەکرێت.","کتێب"],
    ["کتێبی ڕێزمانی کوردی","پێشکەشکردنی زانیاریی کتێب، نووسەر، بابەت و شێوازی بەدەستهێنانی کتێب لەم شوێنەدا دەبێت.","کتێب"],
    ["سەرچاوەکانی زمانەوانی","کۆمەڵێک سەرچاوە و کتێبی زمانەوانی بۆ خوێندکاران و خوێنەران.","کتێب"]
  ];
  const item=books[Math.min(i,books.length-1)];
  btn.addEventListener("click",()=>openInfo(item[0],item[1],item[2]));
});

document.querySelectorAll('a[href="#"]').forEach(a=>{
  a.addEventListener("click",e=>{
    e.preventDefault();
    const label=(a.textContent||"").trim();
    if(label) openInfo(label,"ئەم بەشە هێشتا لە قۆناغی پەرەپێدانە. لە وەشانی داهاتوودا بە ناوەڕۆکی تەواو پڕ دەکرێت.");
  });
});

// ڕێگاکردنی وانەکانی سیستەمی نوێ بۆ پەڕەی واقعیی وانە.
// هەموو کارتی کۆن هێشتا دەتوانێت مۆداڵی پێشوو پیشان بدات، بەڵام ئەو وانەیەی
// کە لە سیستەمی نوێدا هەیە ڕاستەوخۆ دەچێتە lesson.html.
const lessonRoutes={
  "1":"phonetics-section-06-lesson-001"
};

document.querySelectorAll(".learn-btn").forEach(btn=>{
  const route=lessonRoutes[String(btn.dataset.lesson||"")];
  if(!route) return;
  btn.addEventListener("click",()=>{
    window.location.href=`lesson.html?id=${encodeURIComponent(route)}`;
  });
});

// ئەگەر بە لینکێکی ڕاستەوخۆی وانە هاتین، هیچ پێویستی بە مۆداڵ نییە.
if(window.location.pathname.endsWith("/lesson.html") || window.location.pathname.endsWith("lesson.html")){
  document.body.classList.add("lesson-route-page");
}
