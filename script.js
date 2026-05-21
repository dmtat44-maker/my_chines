
const storageKey = "chineseQuestMvp.v14";
let state = {
  profile:null,
  currentDay:1,
  completedDays:[],
  dayData:{}
};

const heroMap = {
  football:{name:"футболист", place:"китайская футбольная академия", goal:"попасть в команду и сыграть первый матч", skill:"футбольный навык"},
  magic:{name:"маг", place:"школа дракона", goal:"открыть ворота магической школы", skill:"магический навык"},
  archaeology:{name:"археолог", place:"лагерь экспедиции", goal:"найти древнюю карту и расшифровать знаки", skill:"навык исследователя"},
  robot:{name:"робот", place:"город умных машин", goal:"научиться понимать людей и команды", skill:"навык понимания"},
  cosmos:{name:"космонавт", place:"китайская космическая станция", goal:"стать частью экипажа", skill:"космический навык"}
};
const companionMap = {panda:"панда", dragon:"дракон", robot:"робот", phoenix:"феникс", compass:"говорящий компас"};

const toneRows = [
  { tone:"1-й", sound:"ровно и высоко", example:"mā", hint:"«ма-а» ровно" },
  { tone:"2-й", sound:"вверх, как вопрос", example:"má", hint:"«ма?»" },
  { tone:"3-й", sound:"вниз-вверх", example:"mǎ", hint:"«ма-а?» с провалом" },
  { tone:"4-й", sound:"резко вниз", example:"mà", hint:"«ма!» резко" },
  { tone:"лёгкий", sound:"коротко, слабо", example:"ma", hint:"очень коротко" }
];

const baseDays = [
  {
    theme:"Знакомство",
    focus:"познакомиться с первым китайским другом",
    target:{hanzi:"你好，我是朋友。", pinyin:"Nǐ hǎo, wǒ shì péngyou.", ru:"Привет, я друг.", audio:"你好，我是朋友。"},
    words:[
      {hanzi:"你好",pinyin:"nǐ hǎo",ru:"привет",tone:"nǐ — 3-й тон, hǎo — 3-й тон",hint:"вниз-вверх, как маленькая волна"},
      {hanzi:"我",pinyin:"wǒ",ru:"я",tone:"3-й тон",hint:"голос вниз-вверх"},
      {hanzi:"是",pinyin:"shì",ru:"быть / являться",tone:"4-й тон",hint:"резко вниз"},
      {hanzi:"朋友",pinyin:"péngyou",ru:"друг",tone:"péng — 2-й, you — лёгкий",hint:"пэн? + коротко йоу"},
      {hanzi:"谢谢",pinyin:"xièxie",ru:"спасибо",tone:"xiè — 4-й, xie — лёгкий",hint:"сье! + коротко се"}
    ]
  },
  {
    theme:"Команда и числа",
    focus:"попасть в команду и посчитать игроков",
    target:{hanzi:"我们有三个朋友。", pinyin:"Wǒmen yǒu sān ge péngyou.", ru:"У нас есть три друга.", audio:"我们有三个朋友。"},
    words:[
      {hanzi:"一",pinyin:"yī",ru:"один",tone:"1-й тон",hint:"ровно высоко"},
      {hanzi:"二",pinyin:"èr",ru:"два",tone:"4-й тон",hint:"резко вниз"},
      {hanzi:"三",pinyin:"sān",ru:"три",tone:"1-й тон",hint:"ровно"},
      {hanzi:"我们",pinyin:"wǒmen",ru:"мы",tone:"wǒ — 3-й, men — лёгкий",hint:"во-а + коротко мэн"},
      {hanzi:"队",pinyin:"duì",ru:"команда",tone:"4-й тон",hint:"дуэй!"}
    ]
  },
  {
    theme:"Цвета",
    focus:"выбрать цвет формы, кристалла или отметки на карте",
    target:{hanzi:"我喜欢蓝色。", pinyin:"Wǒ xǐhuan lánsè.", ru:"Мне нравится синий цвет.", audio:"我喜欢蓝色。"},
    words:[
      {hanzi:"红色",pinyin:"hóngsè",ru:"красный",tone:"2-й + 4-й",hint:"вверх + резко вниз"},
      {hanzi:"蓝色",pinyin:"lánsè",ru:"синий",tone:"2-й + 4-й",hint:"вверх + резко вниз"},
      {hanzi:"白色",pinyin:"báisè",ru:"белый",tone:"2-й + 4-й",hint:"вверх + резко вниз"},
      {hanzi:"黑色",pinyin:"hēisè",ru:"чёрный",tone:"1-й + 4-й",hint:"ровно + резко вниз"},
      {hanzi:"颜色",pinyin:"yánsè",ru:"цвет",tone:"2-й + 4-й",hint:"вверх + резко вниз"}
    ]
  },
  {
    theme:"Действия",
    focus:"сделать действие в мире героя",
    target:{hanzi:"我去看朋友。", pinyin:"Wǒ qù kàn péngyou.", ru:"Я иду посмотреть друга.", audio:"我去看朋友。"},
    words:[
      {hanzi:"去",pinyin:"qù",ru:"идти",tone:"4-й тон",hint:"резко вниз"},
      {hanzi:"看",pinyin:"kàn",ru:"смотреть",tone:"4-й тон",hint:"резко вниз"},
      {hanzi:"跑",pinyin:"pǎo",ru:"бежать",tone:"3-й тон",hint:"вниз-вверх"},
      {hanzi:"学",pinyin:"xué",ru:"учить",tone:"2-й тон",hint:"вверх, как вопрос"},
      {hanzi:"说",pinyin:"shuō",ru:"говорить",tone:"1-й тон",hint:"ровно"}
    ]
  },
  {
    theme:"Вода после тренировки",
    focus:"попить воды после тренировки",
    target:{hanzi:"训练以后，我喝水。", pinyin:"Xùnliàn yǐhòu, wǒ hē shuǐ.", ru:"После тренировки я пью воду.", audio:"训练以后，我喝水。"},
    words:[
      {hanzi:"训练",pinyin:"xùnliàn",ru:"тренировка",tone:"4-й + 4-й",hint:"два резких падения"},
      {hanzi:"以后",pinyin:"yǐhòu",ru:"после",tone:"3-й + 4-й",hint:"вниз-вверх + резко вниз"},
      {hanzi:"喝",pinyin:"hē",ru:"пить",tone:"1-й тон",hint:"ровно"},
      {hanzi:"水",pinyin:"shuǐ",ru:"вода",tone:"3-й тон",hint:"вниз-вверх"},
      {hanzi:"休息",pinyin:"xiūxi",ru:"отдыхать",tone:"1-й + лёгкий",hint:"ровно + коротко"}
    ]
  },
  {
    theme:"Вопросы",
    focus:"понять вопрос китайского друга",
    target:{hanzi:"你在哪里？", pinyin:"Nǐ zài nǎli?", ru:"Где ты?", audio:"你在哪里？"},
    words:[
      {hanzi:"谁",pinyin:"shéi",ru:"кто",tone:"2-й тон",hint:"вверх"},
      {hanzi:"什么",pinyin:"shénme",ru:"что",tone:"2-й + лёгкий",hint:"вверх + коротко"},
      {hanzi:"哪里",pinyin:"nǎli",ru:"где",tone:"3-й + лёгкий",hint:"вниз-вверх + коротко"},
      {hanzi:"吗",pinyin:"ma",ru:"вопросительная частица",tone:"лёгкий",hint:"коротко"},
      {hanzi:"在",pinyin:"zài",ru:"находиться / быть где-то",tone:"4-й тон",hint:"резко вниз"}
    ]
  },
  {
    theme:"Семья и рассказ о себе",
    focus:"рассказать другу о себе и семье",
    target:{hanzi:"我喜欢中文。", pinyin:"Wǒ xǐhuan Zhōngwén.", ru:"Мне нравится китайский язык.", audio:"我喜欢中文。"},
    words:[
      {hanzi:"爸爸",pinyin:"bàba",ru:"папа",tone:"4-й + лёгкий",hint:"ба! + коротко"},
      {hanzi:"妈妈",pinyin:"māma",ru:"мама",tone:"1-й + лёгкий",hint:"ровно + коротко"},
      {hanzi:"家",pinyin:"jiā",ru:"дом/семья",tone:"1-й тон",hint:"ровно"},
      {hanzi:"喜欢",pinyin:"xǐhuan",ru:"нравится",tone:"3-й + лёгкий",hint:"вниз-вверх + коротко"},
      {hanzi:"中文",pinyin:"Zhōngwén",ru:"китайский язык",tone:"1-й + 2-й",hint:"ровно + вверх"}
    ]
  },
  {
    theme:"Предметы мира",
    focus:"найти ключ, карту или важный предмет",
    target:{hanzi:"我有地图和钥匙。", pinyin:"Wǒ yǒu dìtú hé yàoshi.", ru:"У меня есть карта и ключ.", audio:"我有地图和钥匙。"},
    words:[
      {hanzi:"球",pinyin:"qiú",ru:"мяч/шар",tone:"2-й тон",hint:"вверх"},
      {hanzi:"书",pinyin:"shū",ru:"книга",tone:"1-й тон",hint:"ровно"},
      {hanzi:"地图",pinyin:"dìtú",ru:"карта",tone:"4-й + 2-й",hint:"резко вниз + вверх"},
      {hanzi:"门",pinyin:"mén",ru:"дверь/ворота",tone:"2-й тон",hint:"вверх"},
      {hanzi:"钥匙",pinyin:"yàoshi",ru:"ключ",tone:"4-й + лёгкий",hint:"резко вниз + коротко"}
    ]
  },
  {
    theme:"Мини-диалог",
    focus:"сказать первую короткую фразу другу",
    target:{hanzi:"你是我的朋友。", pinyin:"Nǐ shì wǒ de péngyou.", ru:"Ты мой друг.", audio:"你是我的朋友。"},
    words:[
      {hanzi:"我是",pinyin:"wǒ shì",ru:"я являюсь / я —",tone:"3-й + 4-й",hint:"вниз-вверх + резко вниз"},
      {hanzi:"你是",pinyin:"nǐ shì",ru:"ты являешься / ты —",tone:"3-й + 4-й",hint:"вниз-вверх + резко вниз"},
      {hanzi:"我的",pinyin:"wǒ de",ru:"мой / моя",tone:"3-й + лёгкий",hint:"вниз-вверх + коротко"},
      {hanzi:"再见",pinyin:"zàijiàn",ru:"пока",tone:"4-й + 4-й",hint:"два резких падения"},
      {hanzi:"明天",pinyin:"míngtiān",ru:"завтра",tone:"2-й + 1-й",hint:"вверх + ровно"}
    ]
  },
  {
    theme:"Первое испытание",
    focus:"подтвердить, что герой готов продолжать путь",
    target:{hanzi:"今天开始，加油！", pinyin:"Jīntiān kāishǐ, jiāyóu!", ru:"Сегодня начинаем, вперёд!", audio:"今天开始，加油！"},
    words:[
      {hanzi:"开始",pinyin:"kāishǐ",ru:"начать",tone:"1-й + 3-й",hint:"ровно + вниз-вверх"},
      {hanzi:"成功",pinyin:"chénggōng",ru:"успех",tone:"2-й + 1-й",hint:"вверх + ровно"},
      {hanzi:"加油",pinyin:"jiāyóu",ru:"давай! вперёд!",tone:"1-й + 2-й",hint:"ровно + вверх"},
      {hanzi:"今天",pinyin:"jīntiān",ru:"сегодня",tone:"1-й + 1-й",hint:"ровно"},
      {hanzi:"明白",pinyin:"míngbai",ru:"понятно",tone:"2-й + лёгкий",hint:"вверх + коротко"}
    ]
  }
];

function h(x){return String(x??"").replace(/[&<>"']/g, m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]));}
function go(id){document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));document.getElementById(id).classList.add("active");window.scrollTo(0,0);}
function toggleCustom(type){
  const sel=document.getElementById(type+"Select");
  const box=document.getElementById(type+"CustomBox");
  box.style.display=sel.value==="custom"?"block":"none";
}
function getHero(){
  const value=document.getElementById("heroSelect").value;
  if(value==="custom"){
    const custom=document.getElementById("heroCustom").value.trim();
    return {key:"custom",name:custom||"свой герой",place:"личный мир героя",goal:"пройти своё первое испытание",skill:"личный навык"};
  }
  return {key:value,...heroMap[value]};
}
function getCompanion(){
  const value=document.getElementById("companionSelect").value;
  if(value==="custom"){
    return document.getElementById("companionCustom").value.trim() || "свой напарник";
  }
  return companionMap[value];
}
function saveProfile(){
  const child=document.getElementById("childName").value.trim();
  const parent=document.getElementById("parentName").value.trim();
  const hero=getHero();
  const companion=getCompanion();
  if(!child){document.getElementById("profileError").textContent="Введите имя ребёнка.";return;}
  if(hero.key==="custom" && !document.getElementById("heroCustom").value.trim()){document.getElementById("profileError").textContent="Напишите своего героя.";return;}
  state.profile={child,parent,hero,companion,avatar:getChildAvatar(),interest:document.getElementById("heroInterest").value.trim(),aiUrl:document.getElementById("aiUrl").value.trim()};
  state.currentDay=1; state.completedDays=[]; state.dayData={};
  localStorage.setItem(storageKey,JSON.stringify(state));
  renderWorld();
  go("world");
}
function loadSaved(){
  const saved=localStorage.getItem(storageKey);
  if(!saved){go("profile");return;}
  state=JSON.parse(saved);
  if(state.profile && !state.profile.avatar) state.profile.avatar='boy';
  renderWorld(); go("world");
}
function save(){localStorage.setItem(storageKey,JSON.stringify(state));}
function resetAll(){if(confirm("Сбросить прохождение MVP v14?")){localStorage.removeItem(storageKey);state={profile:null,currentDay:1,completedDays:[],dayData:{}};go("start");}}
function speak(text){
  if(!("speechSynthesis" in window)){alert("Браузер не поддерживает озвучку.");return;}
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text); u.lang="zh-CN"; u.rate=.78; speechSynthesis.speak(u);
}
function roleSentence(day){
  const p=state.profile, h=p.hero.name, c=p.companion;
  const variants=[
    `Сегодня ${p.child} как ${h} впервые встречает китайского друга, а ${c} помогает сказать 你好.`,
    `На 2-й день ${c} напоминает: без слов прошлого дня нельзя попасть дальше. ${h} готовится к новой мини-миссии.`,
    `Мир уже запомнил выбор: ${p.child} — ${h}. Новая задача связана с цветами и предметами его роли.`,
    `${c} зовёт героя двигаться дальше. Чтобы сделать действие в мире, нужно понять китайские глаголы.`,
    `У героя появляются силы: вода, еда и короткий разговор с другом.`,
    `Друг начинает задавать вопросы. Теперь важно не только помнить слова, но и понимать вопрос.`,
    `Ребёнок рассказывает о себе и семье. Родительская линия усиливается: китайский становится семейной привычкой.`,
    `В мире появляются предметы: ключ, ворота, карта, мяч или книга — всё зависит от роли героя.`,
    `Появляется первый настоящий мини-диалог. ${c} помогает отвечать не кнопкой, а фразой.`,
    `Первое испытание: герой доказывает, что готов продолжать 10-дневный путь.`
  ];
  return variants[day-1] || variants[0];
}
function cloneDay(obj){
  return JSON.parse(JSON.stringify(obj));
}

function capFirst(text){
  text = String(text || "");
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : text;
}

function normalizeText(text){
  return String(text || "").toLowerCase().trim();
}

function getChildAvatar(){
  return document.getElementById("childAvatar")?.value || state.profile?.avatar || "boy";
}

function avatarEmoji(kind){
  return kind === "girl" ? "👧" : "👦";
}

function avatarLabel(kind){
  return kind === "girl" ? "девочка" : "мальчик";
}

function roleProfile(){
  const p = state.profile || {};
  const key = p.hero?.key || "custom";
  const name = normalizeText(p.hero?.name || "");

  if(key === "football"){
    return {
      key:"football",
      label:"футболист",
      place:"китайская футбольная академия",
      friendRole:"тренер",
      group:"команда",
      object:"мяч",
      objectHanzi:"球",
      objectPinyin:"qiú",
      objectRu:"мяч",
      clothing:"футбольная форма",
      clothingHanzi:"球衣",
      clothingPinyin:"qiúyī",
      colorPhraseHanzi:"我喜欢蓝色球衣。",
      colorPhrasePinyin:"Wǒ xǐhuan lánsè qiúyī.",
      colorPhraseRu:"Мне нравится синяя футбольная форма.",
      activity:"тренировка",
      activityHanzi:"训练",
      activityPinyin:"xùnliàn",
      afterPhraseHanzi:"训练以后，我喝水。",
      afterPhrasePinyin:"Xùnliàn yǐhòu, wǒ hē shuǐ.",
      afterPhraseRu:"После тренировки я пью воду.",
      action:"бежать",
      actionHanzi:"跑",
      actionPinyin:"pǎo",
      actionRu:"бежать",
      location:"футбольное поле",
      locationHanzi:"球场",
      locationPinyin:"qiúchǎng",
      locationRu:"футбольное поле",
      finale:"первое учебное испытание на поле"
    };
  }

  if(key === "magic"){
    return {
      key:"magic",
      label:"маг",
      place:"школа дракона",
      friendRole:"хранитель",
      group:"магический круг",
      object:"кристалл",
      objectHanzi:"水晶",
      objectPinyin:"shuǐjīng",
      objectRu:"кристалл",
      clothing:"магический плащ",
      clothingHanzi:"披风",
      clothingPinyin:"pīfēng",
      colorPhraseHanzi:"我喜欢蓝色水晶。",
      colorPhrasePinyin:"Wǒ xǐhuan lánsè shuǐjīng.",
      colorPhraseRu:"Мне нравится синий кристалл.",
      activity:"практика заклинаний",
      activityHanzi:"练习",
      activityPinyin:"liànxí",
      afterPhraseHanzi:"练习以后，我喝水。",
      afterPhrasePinyin:"Liànxí yǐhòu, wǒ hē shuǐ.",
      afterPhraseRu:"После практики я пью воду.",
      action:"учить",
      actionHanzi:"学",
      actionPinyin:"xué",
      actionRu:"учить",
      location:"башня",
      locationHanzi:"塔",
      locationPinyin:"tǎ",
      locationRu:"башня",
      finale:"испытание дракона"
    };
  }

  if(key === "archaeology"){
    return {
      key:"archaeology",
      label:"археолог",
      place:"лагерь экспедиции",
      friendRole:"проводник",
      group:"экспедиция",
      object:"карта",
      objectHanzi:"地图",
      objectPinyin:"dìtú",
      objectRu:"карта",
      clothing:"полевая куртка",
      clothingHanzi:"衣服",
      clothingPinyin:"yīfu",
      colorPhraseHanzi:"我喜欢蓝色地图。",
      colorPhrasePinyin:"Wǒ xǐhuan lánsè dìtú.",
      colorPhraseRu:"Мне нравится синяя карта.",
      activity:"экспедиция",
      activityHanzi:"探险",
      activityPinyin:"tànxiǎn",
      afterPhraseHanzi:"探险以后，我喝水。",
      afterPhrasePinyin:"Tànxiǎn yǐhòu, wǒ hē shuǐ.",
      afterPhraseRu:"После экспедиции я пью воду.",
      action:"смотреть",
      actionHanzi:"看",
      actionPinyin:"kàn",
      actionRu:"смотреть",
      location:"древние ворота",
      locationHanzi:"门",
      locationPinyin:"mén",
      locationRu:"ворота",
      finale:"открытие древнего сундука"
    };
  }

  // Свой герой: гонщица / гонщик / автогонки.
  if(name.includes("гонщ") || name.includes("пилот") || name.includes("машин") || name.includes("авто") || name.includes("ралли")){
    return {
      key:"racer",
      label:p.hero?.name || "гонщица",
      place:"китайская гоночная школа",
      friendRole:"механик",
      group:"гоночная команда",
      object:"машина",
      objectHanzi:"赛车",
      objectPinyin:"sàichē",
      objectRu:"гоночная машина",
      clothing:"гоночный костюм",
      clothingHanzi:"赛车服",
      clothingPinyin:"sàichēfú",
      colorPhraseHanzi:"我喜欢蓝色赛车服。",
      colorPhrasePinyin:"Wǒ xǐhuan lánsè sàichēfú.",
      colorPhraseRu:"Мне нравится синий гоночный костюм.",
      activity:"гонка",
      activityHanzi:"比赛",
      activityPinyin:"bǐsài",
      afterPhraseHanzi:"比赛以后，我喝水。",
      afterPhrasePinyin:"Bǐsài yǐhòu, wǒ hē shuǐ.",
      afterPhraseRu:"После гонки я пью воду.",
      action:"ехать",
      actionHanzi:"开车",
      actionPinyin:"kāichē",
      actionRu:"ехать на машине",
      location:"трасса",
      locationHanzi:"赛道",
      locationPinyin:"sàidào",
      locationRu:"гоночная трасса",
      finale:"первый учебный заезд"
    };
  }

  // Свой герой: космонавт / астронавт / космос.
  if(name.includes("космон") || name.includes("астро") || name.includes("космос") || name.includes("ракета")){
    return {
      key:"astronaut",
      label:p.hero?.name || "космонавт",
      place:"китайская космическая станция",
      friendRole:"командир экипажа",
      group:"экипаж",
      object:"ракета",
      objectHanzi:"火箭",
      objectPinyin:"huǒjiàn",
      objectRu:"ракета",
      clothing:"скафандр",
      clothingHanzi:"航天服",
      clothingPinyin:"hángtiānfú",
      colorPhraseHanzi:"我喜欢蓝色航天服。",
      colorPhrasePinyin:"Wǒ xǐhuan lánsè hángtiānfú.",
      colorPhraseRu:"Мне нравится синий скафандр.",
      activity:"выход в космос",
      activityHanzi:"太空行走",
      activityPinyin:"tàikōng xíngzǒu",
      afterPhraseHanzi:"太空行走以后，我喝水。",
      afterPhrasePinyin:"Tàikōng xíngzǒu yǐhòu, wǒ hē shuǐ.",
      afterPhraseRu:"После выхода в космос я пью воду.",
      action:"лететь",
      actionHanzi:"飞",
      actionPinyin:"fēi",
      actionRu:"лететь",
      location:"космическая станция",
      locationHanzi:"空间站",
      locationPinyin:"kōngjiānzhàn",
      locationRu:"космическая станция",
      finale:"первое задание экипажа"
    };
  }

  // Свой герой: зоолог / животные / питомцы.
  if(name.includes("зоолог") || name.includes("живот") || name.includes("питом") || name.includes("ветерин")){
    return {
      key:"zoologist",
      label:p.hero?.name || "зоолог",
      place:"китайский парк животных",
      friendRole:"смотритель",
      group:"команда зоологов",
      object:"животное",
      objectHanzi:"动物",
      objectPinyin:"dòngwù",
      objectRu:"животное",
      clothing:"форма смотрителя",
      clothingHanzi:"制服",
      clothingPinyin:"zhìfú",
      colorPhraseHanzi:"我喜欢蓝色制服。",
      colorPhrasePinyin:"Wǒ xǐhuan lánsè zhìfú.",
      colorPhraseRu:"Мне нравится синяя форма смотрителя.",
      activity:"обход питомцев",
      activityHanzi:"看动物",
      activityPinyin:"kàn dòngwù",
      afterPhraseHanzi:"看动物以后，我喝水。",
      afterPhrasePinyin:"Kàn dòngwù yǐhòu, wǒ hē shuǐ.",
      afterPhraseRu:"После обхода животных я пью воду.",
      action:"наблюдать",
      actionHanzi:"观察",
      actionPinyin:"guānchá",
      actionRu:"наблюдать",
      location:"парк животных",
      locationHanzi:"动物园",
      locationPinyin:"dòngwùyuán",
      locationRu:"зоопарк / парк животных",
      finale:"первый обход редких животных"
    };
  }

  // Свой герой: отдельная ветка для балерины/балета/танцев.
  if(name.includes("балерин") || name.includes("балет") || name.includes("танц")){
    return {
      key:"ballet",
      label:p.hero?.name || "балерина",
      place:"китайская балетная студия",
      friendRole:"партнёр по танцу",
      group:"танцевальная группа",
      object:"сцена",
      objectHanzi:"舞台",
      objectPinyin:"wǔtái",
      objectRu:"сцена",
      clothing:"танцевальный костюм",
      clothingHanzi:"舞衣",
      clothingPinyin:"wǔyī",
      colorPhraseHanzi:"我喜欢蓝色舞衣。",
      colorPhrasePinyin:"Wǒ xǐhuan lánsè wǔyī.",
      colorPhraseRu:"Мне нравится синий танцевальный костюм.",
      activity:"репетиция",
      activityHanzi:"练习",
      activityPinyin:"liànxí",
      afterPhraseHanzi:"练习以后，我喝水。",
      afterPhrasePinyin:"Liànxí yǐhòu, wǒ hē shuǐ.",
      afterPhraseRu:"После репетиции я пью воду.",
      action:"танцевать",
      actionHanzi:"跳舞",
      actionPinyin:"tiàowǔ",
      actionRu:"танцевать",
      location:"сцена",
      locationHanzi:"舞台",
      locationPinyin:"wǔtái",
      locationRu:"сцена",
      finale:"первое выступление на сцене"
    };
  }

  // Нейтральная ветка для любого своего героя, пока не подключён ИИ.
  return {
    key:"custom",
    label:p.hero?.name || "свой герой",
    place:`личный мир героя “${p.hero?.name || "свой герой"}”`,
    friendRole:"помощник",
    group:"отряд",
    object:"предмет",
    objectHanzi:"东西",
    objectPinyin:"dōngxi",
    objectRu:"предмет",
    clothing:"костюм героя",
    clothingHanzi:"衣服",
    clothingPinyin:"yīfu",
    colorPhraseHanzi:"我喜欢蓝色衣服。",
    colorPhrasePinyin:"Wǒ xǐhuan lánsè yīfu.",
    colorPhraseRu:"Мне нравится синяя одежда.",
    activity:"задание",
    activityHanzi:"任务",
    activityPinyin:"rènwu",
    afterPhraseHanzi:"任务以后，我喝水。",
    afterPhrasePinyin:"Rènwu yǐhòu, wǒ hē shuǐ.",
    afterPhraseRu:"После задания я пью воду.",
    action:"идти",
    actionHanzi:"去",
    actionPinyin:"qù",
    actionRu:"идти",
    location:"место задания",
    locationHanzi:"地方",
    locationPinyin:"dìfang",
    locationRu:"место",
    finale:"первое испытание героя"
  };
}

function toneInfoFor(hanzi){
  const map = {
    "球": {tone:"2-й тон", hint:"голос идёт вверх, как вопрос"},
    "球衣": {tone:"2-й + 1-й", hint:"qiú — вверх, yī — ровно и высоко"},
    "训练": {tone:"4-й + 4-й", hint:"оба слога резко вниз"},
    "跑": {tone:"3-й тон", hint:"голос вниз-вверх, с провалом"},
    "球场": {tone:"2-й + 3-й", hint:"qiú — вверх, chǎng — вниз-вверх"},

    "水晶": {tone:"3-й + 1-й", hint:"shuǐ — вниз-вверх, jīng — ровно"},
    "披风": {tone:"1-й + 1-й", hint:"оба слога ровно и высоко"},
    "练习": {tone:"4-й + 2-й", hint:"liàn — резко вниз, xí — вверх"},
    "学": {tone:"2-й тон", hint:"голос идёт вверх, как вопрос"},
    "塔": {tone:"3-й тон", hint:"вниз-вверх, с провалом"},

    "地图": {tone:"4-й + 2-й", hint:"dì — резко вниз, tú — вверх"},
    "衣服": {tone:"1-й + лёгкий", hint:"yī — ровно, fu — коротко и слабо"},
    "探险": {tone:"4-й + 3-й", hint:"tàn — резко вниз, xiǎn — вниз-вверх"},
    "看": {tone:"4-й тон", hint:"резко вниз"},
    "门": {tone:"2-й тон", hint:"голос идёт вверх"},

    "舞台": {tone:"3-й + 2-й", hint:"wǔ — вниз-вверх, tái — вверх"},
    "舞衣": {tone:"3-й + 1-й", hint:"wǔ — вниз-вверх, yī — ровно"},
    "跳舞": {tone:"4-й + 3-й", hint:"tiào — резко вниз, wǔ — вниз-вверх"},

    "东西": {tone:"1-й + лёгкий", hint:"dōng — ровно, xi — коротко и слабо"},
    "任务": {tone:"4-й + лёгкий", hint:"rèn — резко вниз, wu — коротко и слабо"},
    "去": {tone:"4-й тон", hint:"резко вниз"},
    "地方": {tone:"4-й + лёгкий", hint:"dì — резко вниз, fang — коротко"},
    "赛车": {tone:"4-й + 1-й", hint:"sài — резко вниз, chē — ровно"},
    "赛车服": {tone:"4-й + 1-й + 2-й", hint:"sài — вниз, chē — ровно, fú — вверх"},
    "比赛": {tone:"3-й + 4-й", hint:"bǐ — вниз-вверх, sài — резко вниз"},
    "开车": {tone:"1-й + 1-й", hint:"оба слога ровно и высоко"},
    "赛道": {tone:"4-й + 4-й", hint:"оба слога резко вниз"},

    "火箭": {tone:"3-й + 4-й", hint:"huǒ — вниз-вверх, jiàn — резко вниз"},
    "航天服": {tone:"2-й + 1-й + 2-й", hint:"háng — вверх, tiān — ровно, fú — вверх"},
    "太空行走": {tone:"4-й + 1-й + 2-й + 3-й", hint:"tàikōng — космос, xíngzǒu — идти/ходить"},
    "飞": {tone:"1-й тон", hint:"ровно и высоко"},
    "空间站": {tone:"1-й + 1-й + 4-й", hint:"kōng, jiān — ровно, zhàn — вниз"},

    "动物": {tone:"4-й + 4-й", hint:"оба слога резко вниз"},
    "制服": {tone:"4-й + 2-й", hint:"zhì — резко вниз, fú — вверх"},
    "看动物": {tone:"4-й + 4-й + 4-й", hint:"все основные слоги резко вниз"},
    "观察": {tone:"1-й + 2-й", hint:"guān — ровно, chá — вверх"},
    "动物园": {tone:"4-й + 4-й + 2-й", hint:"dòngwù — вниз, yuán — вверх"}
  };
  return map[hanzi] || {tone:"см. pinyin", hint:"произнеси по знакам тона в pinyin"};
}

function wordWithTone(hanzi, pinyin, ru, fallbackHint){
  const info = toneInfoFor(hanzi);
  return {
    hanzi,
    pinyin,
    ru,
    tone: info.tone,
    hint: fallbackHint || info.hint
  };
}

function uniqueWords(words){
  const seen = new Set();
  return words.filter(w => {
    if(!w || !w.hanzi) return false;
    if(seen.has(w.hanzi)) return false;
    seen.add(w.hanzi);
    return true;
  });
}

function fillToFive(words){
  const fillers = [
    {hanzi:"去",pinyin:"qù",ru:"идти",tone:"4-й тон",hint:"резко вниз"},
    {hanzi:"看",pinyin:"kàn",ru:"смотреть",tone:"4-й тон",hint:"резко вниз"},
    {hanzi:"学",pinyin:"xué",ru:"учить",tone:"2-й тон",hint:"вверх, как вопрос"},
    {hanzi:"说",pinyin:"shuō",ru:"говорить",tone:"1-й тон",hint:"ровно"},
    {hanzi:"朋友",pinyin:"péngyou",ru:"друг",tone:"2-й + лёгкий",hint:"вверх + коротко"}
  ];
  const list = uniqueWords(words);
  for(const f of fillers){
    if(list.length >= 5) break;
    if(!list.some(w => w.hanzi === f.hanzi)) list.push(f);
  }
  return list.slice(0, 5);
}


function adaptDayToRole(base, day){
  const p = state.profile || {};
  const rp = roleProfile();
  const d = cloneDay(base);
  const companion = capFirst(p.companion || "напарник");

  if(day === 1){
    d.theme = rp.key === "football" ? "Приветствие на футбольном поле" : "Знакомство";
    d.focus = rp.key === "football"
      ? "поздороваться с тренером и командой перед первой тренировкой"
      : `познакомиться с другом в мире “${rp.label}”`;
    d.target = {hanzi:"你好，我是朋友。", pinyin:"Nǐ hǎo, wǒ shì péngyou.", ru:"Привет, я друг.", audio:"你好，我是朋友。"};
    d.roleMission = rp.key === "football"
      ? `${p.child || "Герой"} выходит на поле в китайской футбольной академии. Тренер ждёт приветствие 你好, и только после языкового пароля начнётся тренировка.`
      : `${p.child || "Герой"} приходит в ${rp.place}. ${companion} помогает познакомиться с первым китайским другом.`;
    d.words = [
      {hanzi:"你好",pinyin:"nǐ hǎo",ru:"привет",tone:"nǐ — 3-й тон, hǎo — 3-й тон",hint:"вниз-вверх, как маленькая волна"},
      {hanzi:"我",pinyin:"wǒ",ru:"я",tone:"3-й тон",hint:"голос вниз-вверх"},
      {hanzi:"是",pinyin:"shì",ru:"быть / являться",tone:"4-й тон",hint:"резко вниз"},
      {hanzi:"朋友",pinyin:"péngyou",ru:"друг",tone:"péng — 2-й, you — лёгкий",hint:"пэн? + коротко йоу"},
      {hanzi:"再见",pinyin:"zàijiàn",ru:"до свидания / пока",tone:"4-й + 4-й",hint:"два резких падения голоса"}
    ];
  }

  if(day === 2){
    d.theme = `${capFirst(rp.group)} и числа`;
    d.focus = `посчитать участников: один, два, три`;
    d.target = {hanzi:"我们有三个朋友。", pinyin:"Wǒmen yǒu sān ge péngyou.", ru:"У нас есть три друга.", audio:"我们有三个朋友。"};
    d.roleMission = `${capFirst(rp.friendRole)} просит посчитать, сколько друзей пришли в ${rp.place}.`;
    d.words = [
      {hanzi:"一",pinyin:"yī",ru:"один",tone:"1-й тон",hint:"ровно высоко"},
      {hanzi:"二",pinyin:"èr",ru:"два",tone:"4-й тон",hint:"резко вниз"},
      {hanzi:"三",pinyin:"sān",ru:"три",tone:"1-й тон",hint:"ровно"},
      {hanzi:"我们",pinyin:"wǒmen",ru:"мы",tone:"wǒ — 3-й, men — лёгкий",hint:"во-а + коротко мэн"},
      {hanzi:"朋友",pinyin:"péngyou",ru:"друг",tone:"2-й + лёгкий",hint:"вверх + коротко"}
    ];
  }

  if(day === 3){
    d.theme = `Цвет: ${rp.clothing}`;
    d.focus = `выбрать синий вариант: ${rp.clothing}`;
    d.target = {hanzi:rp.colorPhraseHanzi, pinyin:rp.colorPhrasePinyin, ru:rp.colorPhraseRu, audio:rp.colorPhraseHanzi};
    d.roleMission = `${p.child || "Герой"} выбирает цвет для “${rp.clothing}”, чтобы продолжить путь “${rp.label}”.`;
    d.words = [
      {hanzi:"蓝色",pinyin:"lánsè",ru:"синий цвет",tone:"2-й + 4-й",hint:"вверх + резко вниз"},
      {hanzi:"红色",pinyin:"hóngsè",ru:"красный цвет",tone:"2-й + 4-й",hint:"вверх + резко вниз"},
      {hanzi:"白色",pinyin:"báisè",ru:"белый цвет",tone:"2-й + 4-й",hint:"вверх + резко вниз"},
      wordWithTone(rp.clothingHanzi, rp.clothingPinyin, rp.clothing, "слово связано с выбранной ролью"),
      {hanzi:"颜色",pinyin:"yánsè",ru:"цвет",tone:"2-й + 4-й",hint:"вверх + резко вниз"}
    ];
  }

  if(day === 4){
    d.theme = `Действие героя: ${rp.action}`;
    d.focus = `сделать действие “${rp.action}” в мире “${rp.label}”`;
    d.target = {hanzi:`我${rp.actionHanzi}。`, pinyin:`Wǒ ${rp.actionPinyin}.`, ru:`Я ${rp.actionRu}.`, audio:`我${rp.actionHanzi}。`};
    d.roleMission = `${companion} зовёт героя выполнить действие: ${rp.actionRu}.`;
    d.words = fillToFive([
      wordWithTone(rp.actionHanzi, rp.actionPinyin, rp.actionRu, "слово действия"),
      {hanzi:"去",pinyin:"qù",ru:"идти",tone:"4-й тон",hint:"резко вниз"},
      {hanzi:"看",pinyin:"kàn",ru:"смотреть",tone:"4-й тон",hint:"резко вниз"},
      {hanzi:"学",pinyin:"xué",ru:"учить",tone:"2-й тон",hint:"вверх, как вопрос"},
      {hanzi:"说",pinyin:"shuō",ru:"говорить",tone:"1-й тон",hint:"ровно"},
      {hanzi:"朋友",pinyin:"péngyou",ru:"друг",tone:"2-й + лёгкий",hint:"вверх + коротко"}
    ]);
  }

  if(day === 5){
    d.theme = `Вода после: ${rp.activity}`;
    d.focus = `попить воды после: ${rp.activity}`;
    d.target = {hanzi:rp.afterPhraseHanzi, pinyin:rp.afterPhrasePinyin, ru:rp.afterPhraseRu, audio:rp.afterPhraseHanzi};
    d.roleMission = `После “${rp.activity}” герой должен восстановить силы и сказать фразу дня.`;
    d.words = fillToFive([
      wordWithTone(rp.activityHanzi, rp.activityPinyin, rp.activity, "связано с выбранной ролью"),
      {hanzi:"以后",pinyin:"yǐhòu",ru:"после",tone:"3-й + 4-й",hint:"вниз-вверх + резко вниз"},
      {hanzi:"喝",pinyin:"hē",ru:"пить",tone:"1-й тон",hint:"ровно"},
      {hanzi:"水",pinyin:"shuǐ",ru:"вода",tone:"3-й тон",hint:"вниз-вверх"},
      {hanzi:"休息",pinyin:"xiūxi",ru:"отдыхать",tone:"1-й + лёгкий",hint:"ровно + коротко"}
    ]);
  }

  if(day === 6){
    d.theme = "Вопрос: где ты?";
    d.focus = `ответить другу, где герой находится: ${rp.location}`;
    d.target = {hanzi:"你在哪里？", pinyin:"Nǐ zài nǎli?", ru:"Где ты?", audio:"你在哪里？"};
    d.roleMission = `Китайский друг ищет героя в локации “${rp.location}” и задаёт первый вопрос.`;
    d.words = [
      {hanzi:"谁",pinyin:"shéi",ru:"кто",tone:"2-й тон",hint:"вверх"},
      {hanzi:"什么",pinyin:"shénme",ru:"что",tone:"2-й + лёгкий",hint:"вверх + коротко"},
      {hanzi:"哪里",pinyin:"nǎli",ru:"где",tone:"3-й + лёгкий",hint:"вниз-вверх + коротко"},
      {hanzi:"在",pinyin:"zài",ru:"находиться / быть где-то",tone:"4-й тон",hint:"резко вниз"},
      wordWithTone(rp.locationHanzi, rp.locationPinyin, rp.locationRu, "место из выбранного мира")
    ];
  }

  if(day === 7){
    d.theme = "Рассказ о себе";
    d.focus = `сказать, что нравится китайский и путь “${rp.label}”`;
    d.target = {hanzi:"我喜欢中文。", pinyin:"Wǒ xǐhuan Zhōngwén.", ru:"Мне нравится китайский язык.", audio:"我喜欢中文。"};
    d.roleMission = `${capFirst(rp.friendRole)} просит героя рассказать о себе и своём интересе.`;
    d.words = [
      {hanzi:"爸爸",pinyin:"bàba",ru:"папа",tone:"4-й + лёгкий",hint:"ба! + коротко"},
      {hanzi:"妈妈",pinyin:"māma",ru:"мама",tone:"1-й + лёгкий",hint:"ровно + коротко"},
      {hanzi:"家",pinyin:"jiā",ru:"дом/семья",tone:"1-й тон",hint:"ровно"},
      {hanzi:"喜欢",pinyin:"xǐhuan",ru:"нравится",tone:"3-й + лёгкий",hint:"вниз-вверх + коротко"},
      {hanzi:"中文",pinyin:"Zhōngwén",ru:"китайский язык",tone:"1-й + 2-й",hint:"ровно + вверх"}
    ];
  }

  if(day === 8){
    d.theme = `Предмет мира: ${rp.object}`;
    d.focus = `найти важный предмет: ${rp.object}`;
    d.target = {hanzi:`我有${rp.objectHanzi}。`, pinyin:`Wǒ yǒu ${rp.objectPinyin}.`, ru:`У меня есть ${rp.objectRu}.`, audio:`我有${rp.objectHanzi}。`};
    d.roleMission = `В мире “${rp.label}” появляется важный предмет: ${rp.object}.`;
    d.words = fillToFive([
      wordWithTone(rp.objectHanzi, rp.objectPinyin, rp.objectRu, "важный предмет выбранной роли"),
      {hanzi:"书",pinyin:"shū",ru:"книга",tone:"1-й тон",hint:"ровно"},
      {hanzi:"地图",pinyin:"dìtú",ru:"карта",tone:"4-й + 2-й",hint:"резко вниз + вверх"},
      {hanzi:"门",pinyin:"mén",ru:"дверь/ворота",tone:"2-й тон",hint:"вверх"},
      {hanzi:"钥匙",pinyin:"yàoshi",ru:"ключ",tone:"4-й + лёгкий",hint:"резко вниз + коротко"},
      {hanzi:"朋友",pinyin:"péngyou",ru:"друг",tone:"2-й + лёгкий",hint:"вверх + коротко"}
    ]);
  }

  if(day === 9){
    d.theme = "Мини-диалог с другом";
    d.focus = `сказать другу, что он часть твоей истории`;
    d.target = {hanzi:"你是我的朋友。", pinyin:"Nǐ shì wǒ de péngyou.", ru:"Ты мой друг.", audio:"你是我的朋友。"};
    d.roleMission = `${companion} и китайский друг готовят короткий диалог перед следующим испытанием.`;
    d.words = [
      {hanzi:"我是",pinyin:"wǒ shì",ru:"я являюсь / я —",tone:"3-й + 4-й",hint:"вниз-вверх + резко вниз"},
      {hanzi:"你是",pinyin:"nǐ shì",ru:"ты являешься / ты —",tone:"3-й + 4-й",hint:"вниз-вверх + резко вниз"},
      {hanzi:"我的",pinyin:"wǒ de",ru:"мой / моя",tone:"3-й + лёгкий",hint:"вниз-вверх + коротко"},
      {hanzi:"朋友",pinyin:"péngyou",ru:"друг",tone:"2-й + лёгкий",hint:"вверх + коротко"},
      {hanzi:"再见",pinyin:"zàijiàn",ru:"пока",tone:"4-й + 4-й",hint:"два резких падения"}
    ];
  }

  if(day === 10){
    d.theme = `Первое испытание: ${rp.finale}`;
    d.focus = `пройти итоговое событие роли “${rp.label}”`;
    d.target = {hanzi:"今天开始，加油！", pinyin:"Jīntiān kāishǐ, jiāyóu!", ru:"Сегодня начинаем, вперёд!", audio:"今天开始，加油！"};
    d.roleMission = `Герой готов к событию: ${rp.finale}. Китайский друг говорит: 加油!`;
    d.words = [
      {hanzi:"开始",pinyin:"kāishǐ",ru:"начать",tone:"1-й + 3-й",hint:"ровно + вниз-вверх"},
      {hanzi:"成功",pinyin:"chénggōng",ru:"успех",tone:"2-й + 1-й",hint:"вверх + ровно"},
      {hanzi:"加油",pinyin:"jiāyóu",ru:"давай! вперёд!",tone:"1-й + 2-й",hint:"ровно + вверх"},
      {hanzi:"今天",pinyin:"jīntiān",ru:"сегодня",tone:"1-й + 1-й",hint:"ровно"},
      {hanzi:"明白",pinyin:"míngbai",ru:"понятно",tone:"2-й + лёгкий",hint:"вверх + коротко"}
    ];
  }

  return d;
}

function generatedMission(day){
  const base = adaptDayToRole(baseDays[day-1], day);
  return base.roleMission || base.focus || "пройти задание дня";
}

function seededRandom(seed){
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function shuffleStable(arr, seed){
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(seededRandom(seed + i*17) * (i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

function makeContextQuiz(base, day){
  const rp = roleProfile();
  const makeOptions=(correct, wrongs, seed)=>shuffleStable([correct,...wrongs.filter(x=>x!==correct).slice(0,2)], seed);

  const byDay = {
    1: [
      {q:"Что значит 你好?", correct:"привет", wrongs:["спасибо","пока","я"]},
      {q:"Как читается 再见?", correct:"zàijiàn", wrongs:["nǐ hǎo","wǒ","shì"]}
    ],
    2: [
      {q:"Как по-китайски сказать “три”?", correct:"三", wrongs:["一","二","朋友"]},
      {q:"Какое слово значит “мы”?", correct:"我们", wrongs:["朋友","三","二"]}
    ],
    3: [
      {q:`Как сказать “синий / синяя” для предмета “${rp.clothing}”?`, correct:"蓝色", wrongs:["红色","白色","颜色"]},
      {q:`Как по-китайски сказать “${rp.clothing}”?`, correct:rp.clothingHanzi, wrongs:["蓝色","红色","颜色"]}
    ],
    4: [
      {q:`Как по-китайски сказать “${rp.actionRu}”?`, correct:rp.actionHanzi, wrongs:["去","看","说"]},
      {q:"Как по-китайски сказать “говорить”?", correct:"说", wrongs:["看","去",rp.actionHanzi]}
    ],
    5: [
      {q:`Какие два слова нужны для фразы “пью воду” после события “${rp.activity}”?`, correct:"喝 + 水", wrongs:["以后 + 水","休息 + 水",`${rp.activityHanzi} + 水`]},
      {q:`Как по-китайски сказать “${rp.activity}”?`, correct:rp.activityHanzi, wrongs:["以后","喝","休息"]}
    ],
    6: [
      {q:"Какое слово задаёт вопрос “где”?", correct:"哪里", wrongs:["谁","什么","吗"]},
      {q:`Как по-китайски сказать место “${rp.locationRu}”?`, correct:rp.locationHanzi, wrongs:["在","哪里","什么"]}
    ],
    7: [
      {q:"Как сказать “китайский язык”?", correct:"中文", wrongs:["家","爸爸","妈妈"]},
      {q:"Как сказать “нравится”?", correct:"喜欢", wrongs:["中文","家","妈妈"]}
    ],
    8: [
      {q:`Как по-китайски сказать предмет роли “${rp.objectRu}”?`, correct:rp.objectHanzi, wrongs:["书","地图","钥匙"]},
      {q:"Как сказать “ключ”?", correct:"钥匙", wrongs:["地图","书",rp.objectHanzi]}
    ],
    9: [
      {q:"Как сказать “мой / моя”?", correct:"我的", wrongs:["我是","你是","再见"]},
      {q:"Как сказать “друг”?", correct:"朋友", wrongs:["明天","我的","你是"]}
    ],
    10: [
      {q:"Как сказать “давай! вперёд!”?", correct:"加油", wrongs:["成功","开始","明白"]},
      {q:"Как сказать “сегодня”?", correct:"今天", wrongs:["开始","成功","明白"]}
    ]
  };

  const daySpecific = byDay[day];

  return [
    {
      q:`Что означает фраза дня: ${base.target.hanzi}?`,
      options:makeOptions(base.target.ru, ["Я иду домой.", "Ты мой учитель.", "До завтра."], day*100+1),
      answer:base.target.ru
    },
    {
      q:daySpecific[0].q,
      options:makeOptions(daySpecific[0].correct, daySpecific[0].wrongs, day*100+2),
      answer:daySpecific[0].correct
    },
    {
      q:daySpecific[1].q,
      options:makeOptions(daySpecific[1].correct, daySpecific[1].wrongs, day*100+3),
      answer:daySpecific[1].correct
    }
  ];
}


function storyForDay(day, base){
  const p = state.profile || {};
  const rp = roleProfile();
  const child = p.child || "Герой";
  const companion = capFirst(p.companion || "напарник");

  if(day === 1 && rp.key === "football"){
    return {
      title:"Футбольное приветствие",
      setup:"Это не просто карточка. Это мини-сцена: китайское приветствие запускает тренировку.",
      scenes:[
        "Герой выходит на поле китайской футбольной академии. У тренера в руках мяч, команда ждёт начало тренировки.",
        "Китайский друг улыбается и говорит: 你好. Герой понимает: сначала нужно поздороваться.",
        "Герой собирает фразу: 你好，我是朋友。 — Привет, я друг.",
        "Перед уходом с поля герой запоминает 再见 — до свидания / пока."
      ],
      correctAction:"Верно: тренер улыбается, команда отдаёт пас, ворота тренировки открываются.",
      finalScene:`${child} проходит первый языковой пароль. ${companion} говорит: “Теперь ты в команде!”`,
      exampleLine:"Футболист говорит команде: 你好!"
    };
  }

  return {
    title:"Сюжетная сцена",
    setup:"Китайское слово нужно герою, чтобы продолжить действие в своём мире.",
    scenes:[
      `${child} входит в локацию: ${rp.place}.`,
      `${companion} напоминает: сначала нужен языковой пароль.`,
      `Герой слушает фразу дня: ${base.target.hanzi}.`,
      "После правильного ответа сюжет продолжается."
    ],
    correctAction:`Верно: действие роли “${rp.label}” продолжается.`,
    finalScene:`${child} завершает сцену и открывает следующий день.`,
    exampleLine:`${child} использует китайскую фразу в роли “${rp.label}”.`
  };
}

function storyStageHtml(data, done){
  const story = data.story;
  if(!story) return "";
  return `
    <div class="story-stage">
      <h3>${h(story.title)}</h3>
      <p>${h(story.setup)}</p>
      <div class="story-scenes">
        ${story.scenes.map((s,i)=>`<div class="story-scene"><div class="story-num">${i+1}</div><div>${h(s)}</div></div>`).join("")}
      </div>
      ${done ? `<div class="story-result"><b>Сцена открыта:</b> ${h(story.correctAction)}<br>${h(story.finalScene)}</div>` : `<div class="story-result"><b>Цель:</b> пройти языковой пароль, чтобы увидеть действие героя.</div>`}
    </div>`;
}


function interactiveSceneConfig(day, rp){
  const place = rp.key === "football" ? "на поле" : `в мире роли “${rp.label}”`;
  const configs = {
    1:{title:"Интерактивная сцена: приветствие", intro:"Герой здоровается с командой, проходит языковой пароль и открывает тренировку.", zone:"старт тренировки", labels:["1. Поздороваться: 你好","2. Понять фразу: 我是朋友","3. Открыть тренировку"], speeches:["Скажи 你好, чтобы выйти на поле.","Хорошо! Теперь пойми, кто такой 朋友.","Остался последний шаг — и сцена откроется."], success:"Герой принят в команду: тренер улыбается, тренировка начинается."},
    2:{title:"Интерактивная сцена: счёт и передачи", intro:"Теперь герой считает передачи и входит в командный ритм.", zone:"серия передач", labels:["1. Найти число 三","2. Понять слово 我们","3. Закончить связку"], speeches:["Считаем передачи вместе.","Отлично! Теперь помни: 我们 — это “мы”.","Ещё один точный ответ — и серия передач завершена."], success:"Герой делает третью передачу и команда аплодирует."},
    3:{title:"Интерактивная сцена: форма команды", intro:"Герой выбирает цвет формы и понимает цвета по-китайски.", zone:"форма готова", labels:["1. Найти 蓝色","2. Узнать 球衣","3. Подтвердить форму"], speeches:["Выбери правильный цвет формы.","Теперь запомни слово 球衣.","Осталось подтвердить образ героя."], success:"Герой надевает правильную форму и выходит на разминку."},
    4:{title:"Интерактивная сцена: бег и движение", intro:"Китайские глаголы помогают герою добежать до нужной точки.", zone:"конус для бега", labels:["1. Найти 跑","2. Найти 说","3. Добежать до отметки"], speeches:["Пора двигаться вперёд.","Хорошо, герой уже ускоряется.","Последний ответ — и герой касается конуса."], success:"Герой добегает до конуса и получает похвалу тренера."},
    5:{title:"Интерактивная сцена: вода после тренировки", intro:"После нагрузки герой вспоминает полезные слова и делает паузу.", zone:"зона отдыха", labels:["1. Собрать 喝 + 水","2. Узнать 训练","3. Дойти до отдыха"], speeches:["После тренировки нужно восстановиться.","Верно, уже можно брать воду.","Последний шаг — и герой доходит до зоны отдыха."], success:"Герой пьёт воду и спокойно восстанавливается после тренировки."},
    6:{title:"Интерактивная сцена: ответы на вопрос", intro:"Теперь тренер задаёт вопрос, а герой ищет правильное место на поле.", zone:"нужная зона поля", labels:["1. Найти 哪里","2. Найти место","3. Ответить тренеру"], speeches:["Сначала пойми вопрос тренера.","Хорошо, теперь найди правильное место.","Остался один ответ, чтобы встать в нужную зону."], success:"Герой правильно понимает вопрос и занимает нужную позицию."},
    7:{title:"Интерактивная сцена: рассказ о себе", intro:"Герой делится коротким рассказом о семье и своих интересах.", zone:"командная скамейка", labels:["1. Найти 中文","2. Найти 喜欢","3. Сказать о себе"], speeches:["Пора рассказать о том, что нравится.","Отлично, герой уже увереннее говорит о себе.","Последний ответ — и мини-рассказ готов."], success:"Герой рассказывает о себе, а друг отвечает с интересом."},
    8:{title:"Интерактивная сцена: найти предмет", intro:"Герой ищет нужный предмет и двигается к шкафчику команды.", zone:"шкафчик открыт", labels:[`1. Найти ${rp.objectHanzi || '球'}`,"2. Найти 钥匙","3. Открыть шкафчик"], speeches:["Сначала найди предмет роли.","Отлично, теперь нужен ключ.","Последний ответ — и шкафчик откроется."], success:"Герой находит нужный предмет и открывает шкафчик команды."},
    9:{title:"Интерактивная сцена: мини-диалог", intro:"Перед короткой игрой герой говорит с другом полную фразу.", zone:"дружеский матч", labels:["1. Найти 我的","2. Найти 朋友","3. Завершить диалог"], speeches:["Пора сказать другу важную фразу.","Хорошо, осталось слово 朋友.","Остался один шаг — и мини-диалог завершён."], success:"Герой завершает диалог и выходит на дружеский матч."},
    10:{title:"Интерактивная сцена: финальное испытание", intro:"Финал 10-дневного пути: герой подтверждает, что готов идти дальше.", zone:"финиш открыт", labels:["1. Найти 加油","2. Найти 今天","3. Открыть финиш"], speeches:["Это финал — соберись!","Отлично, герой почти у цели.","Последний ответ — и путь первого блока завершён."], success:"Герой проходит финальное испытание, получает поздравление и завершает первый блок."}
  };
  return configs[day] || {title:`Интерактивная сцена: день ${day}`, intro:`Китайский язык открывает действие ${place}.`, zone:"сцена", labels:["1. Шаг 1","2. Шаг 2","3. Шаг 3"], speeches:["Начни с первого ответа.","Теперь второй шаг.","Остался последний шаг."], success:`Герой завершает интерактив ${place}.`};
}

function interactiveStageHtml(day, data, done){
  const rp = roleProfile();
  const config = interactiveSceneConfig(day, rp);
  const answers = data.quiz.map((q,idx)=>data.selected[idx]);
  const checks = data.quiz.map((q,idx)=>data.selected[idx] === q.answer);
  const wrong = data.quiz.map((q,idx)=>data.selected[idx] && data.selected[idx] !== q.answer);
  const correctCount = checks.filter(Boolean).length;
  const hasWrong = wrong.some(Boolean);
  const allCorrect = checks.every(Boolean);
  const avatar = avatarEmoji((state.profile||{}).avatar || 'boy');
  const child = state.profile?.child || 'Герой';
  const speech = allCorrect
    ? "太好了！Tài hǎo le! Сцена открыта!"
    : hasWrong
      ? "Почти получилось! Подсказка уже рядом."
      : correctCount === 0
        ? config.speeches[0]
        : correctCount === 1
          ? config.speeches[1]
          : config.speeches[2];
  return `
    <div class="mini-stage">
      <div class="mini-stage-head">
        <div>
          <h3>${h(config.title)}</h3>
          <p>${h(config.intro)}</p>
        </div>
        <div class="mini-stage-status">Прогресс сцены<br>${correctCount}/3</div>
      </div>
      <div class="field field-day-${day} stage-step-${correctCount}">
        <div class="midline"></div><div class="circle-line"></div>
        <div class="coach"><div><span>🧢</span>Тренер</div></div>
        <div class="speech">${h(speech)}</div>
        <div class="player" title="герой-ребёнок"><div class="player-emoji">${avatar}</div><div class="player-name">${h(child)}</div></div>
        <div class="head-token" title="голова ребёнка">${avatar}</div>
        <div class="goal ${allCorrect?'open':''}"></div>
        <div class="gate-label">${h(config.zone)}</div>
        <div class="field-tag">Аватар в сцене: ${h(avatarLabel((state.profile||{}).avatar || 'boy'))}</div>
      </div>
      <div class="stage-checks">
        ${config.labels.map((label,i)=>`<div class="stage-check ${checks[i]?'done':''} ${wrong[i]?'bad':''}">${checks[i]?'✓':wrong[i]?'×':'•'} ${h(label)}</div>`).join('')}
      </div>
      ${allCorrect ? `<div class="story-result"><b>Действие:</b> ${h(config.success)}</div>` : `<div class="story-wrong"><b>Что сделать:</b> ответь на вопросы в блоке “Языковой пароль”. После каждого правильного ответа голова ребёнка и сам герой продвинутся по сцене.</div>`}
    </div>`;
}

function getDayData(day){
  if(state.dayData[day]) return state.dayData[day];
  const rawBase=baseDays[day-1];
  const base=adaptDayToRole(rawBase, day);
  const p=state.profile;
  const data={
    day, theme:base.theme, words:base.words,
    scene:roleSentence(day),
    mission:generatedMission(day),
    story:storyForDay(day, base),
    friend: day<4 ? "小明 / Xiǎo Míng" : day<7 ? "小美 / Xiǎo Měi" : "老师 / Lǎoshī",
    dialogue:[
      {who:capFirst(p.companion), cls:"companion", text:`${p.child}, я помню твой путь: ты выбрал роль “${p.hero.name}”. Сегодня мир не начнётся без языкового пароля.`},
      {who:"Китайский друг", cls:"friend", text:`你好! Сегодня тема: ${base.theme}. Скажи или выбери правильные слова, и мы продолжим миссию.`},
      {who:"Миссия", cls:"", text:generatedMission(day)}
    ],
    target:base.target,
    focus:base.focus,
    quiz:makeContextQuiz(base, day),
    selected:{}
  };
  state.dayData[day]=data; save(); return data;
}
async function tryAiDay(day){
  const p=state.profile;
  if(!p.aiUrl){alert("AI backend URL не указан. Демо работает локально.");return;}
  const btn=document.getElementById("aiBtn");
  btn.disabled=true; btn.textContent="ИИ генерирует день...";
  try{
    const resp=await fetch(p.aiUrl.replace(/\/$/,"")+"/api/generate-day",{
      method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        day,
        childName:p.child,
        hero:p.hero.name,
        companion:p.companion,
        interest:p.interest,
        previousWords:day>1 ? getDayData(day-1).words.map(w=>w.hanzi+" "+w.pinyin+" "+w.ru) : []
      })
    });
    if(!resp.ok) throw new Error("HTTP "+resp.status);
    const data=await resp.json();
    state.dayData[day]={...getDayData(day),...data, aiGenerated:true};
    save(); renderWorld();
  }catch(e){
    alert("Не получилось получить день от ИИ: "+e.message+". Оставляем локальное демо.");
  }finally{
    btn.disabled=false; btn.textContent="Сгенерировать этот день через ИИ";
  }
}
function renderWorld(){
  if(!state.profile){go("profile");return;}
  const p=state.profile;
  document.getElementById("worldTitle").textContent=`${p.child}: путь “${p.hero.name}”`;
  document.getElementById("worldSub").textContent=`Локация: ${p.hero.place}. Напарник: ${p.companion}. Цель: ${p.hero.goal}.`;
  document.getElementById("profileChips").innerHTML=[
    `Роль: ${p.hero.name}`,`Аватар: ${avatarLabel(p.avatar || 'boy')}`,`Напарник: ${p.companion}`,`Навык: ${p.hero.skill}`,p.interest?`Интерес: ${p.interest}`:"интерес не указан"
  ].map(x=>`<span class="chip">${h(x)}</span>`).join("");
  const pct=Math.round((state.completedDays.length/10)*100);
  document.getElementById("progressBar").style.width=pct+"%";
  renderTimeline(); renderDay(state.currentDay); renderParent();
}
function renderTimeline(){
  const maxOpen=Math.min(10, Math.max(1, state.completedDays.length+1));
  document.getElementById("timeline").innerHTML=Array.from({length:10},(_,i)=>{
    const d=i+1, done=state.completedDays.includes(d), active=state.currentDay===d, locked=d>maxOpen;
    return `<div class="day ${done?'done':''} ${active?'active':''} ${locked?'locked':''}" onclick="${locked?'':'openDay('+d+')'}">День<br>${d}</div>`;
  }).join("");
}
function openDay(day){state.currentDay=day;save();renderWorld();}
function toneGuideHtml(){
  return `<div class="tone-guide"><div class="tone-row"><div>Тон</div><div>Как звучит</div><div>Пример</div><div>Подсказка</div></div>${toneRows.map(r=>`<div class="tone-row"><div><b>${h(r.tone)}</b></div><div>${h(r.sound)}</div><div>${h(r.example)}</div><div>${h(r.hint)}</div></div>`).join("")}</div>`;
}
function renderDay(day){
  const data=getDayData(day), p=state.profile;
  const done=state.completedDays.includes(day);
  document.getElementById("dayContent").innerHTML=`
    <div class="lesson">
      <div>
        <h2>День ${day}: ${h(data.theme)} ${data.aiGenerated?'<span class="pill">ИИ</span>':''}</h2>
        <p><span class="strong">Сцена:</span> ${h(data.scene)}</p>
        <p><span class="strong">Миссия:</span> ${h(data.mission)}</p>
        ${storyStageHtml(data, done)}
        ${interactiveStageHtml(day, data, done)}
        <div class="sentence-card">
          <div class="small">Сначала послушай фразу дня целиком. ${h(data.story?.exampleLine || '')}</div>
          <div class="sentence-main">${h(data.target.hanzi)}</div>
          <div class="pinyin">${h(data.target.pinyin)}</div>
          <div class="sentence-ru">${h(data.target.ru)}</div>
          <div class="btn-row">
            <button class="secondary" onclick="speak('${h(data.target.audio || data.target.hanzi)}')">▶ Прослушать фразу дня целиком</button>
          </div>
        </div>
        <div class="dialogue">
          ${data.dialogue.map(b=>`<div class="bubble ${h(b.cls)}"><b>${h(b.who)}</b>${h(b.text)}</div>`).join("")}
        </div>
        <div class="btn-row">
          <button class="secondary" onclick="speak('${h(data.target.audio || data.target.hanzi)}')">▶ Послушать фразу дня ещё раз</button>
        </div>
        <h3>Памятка тонов</h3>
        ${toneGuideHtml()}
      </div>
      <div>
        <h3>Слова дня</h3>
        <div class="word-list">
          ${data.words.map(w=>`<div class="word"><div class="hanzi">${h(w.hanzi)}</div><div class="pinyin">${h(w.pinyin)} — ${h(w.ru)}</div><div class="pronounce"><div class="syllable"><b>Тоны:</b> ${h(w.tone)}</div><div class="small">${h(w.hint)}</div></div><button class="secondary" style="margin-top:10px;padding:9px 12px" onclick="speak('${w.hanzi}')">слушать</button></div>`).join("")}
        </div>
        <h3>Языковой пароль</h3>
        <div class="quiz">
          ${data.quiz.map((q,idx)=>`
            <div class="word">
              <b>${h(q.q)}</b>
              <div class="btn-row">
                ${q.options.map(o=>`<button class="option ${data.selected[idx]===o?'selected':''}" onclick="selectAnswer(${day},${idx},'${h(o)}')">${h(o)}</button>`).join("")}
              </div>
            </div>`).join("")}
        </div>
        <h3>Перед продолжением сюжета</h3>
        <div class="small">Порядок этих кнопок фиксированный на каждом дне: они больше не прыгают местами.</div>
        <div class="fixed-actions">
          <button class="good" onclick="finishDay(${day})">${done ? (day < 10 ? '1. Перейти к дню ' + (day + 1) : '1. Путь завершён') : '1. Пройти пароль'}</button>
          <button class="secondary" onclick="speak('${h(data.target.audio || data.target.hanzi)}')">2. Повторить фразу</button>
          <button class="secondary" onclick="showHint(${day})">3. Подсказка</button>
          <button class="secondary" onclick="skipDay(${day})">4. Пропустить урок</button>
          <button class="secondary" onclick="closeApp()">5. Закрыть</button>
        </div>
        <div class="btn-row"><button class="secondary" onclick="go('parent')">Кабинет родителя</button></div>
        <div id="dayMsg"></div>
      </div>
    </div>`;
}
function selectAnswer(day,idx,opt){const data=getDayData(day);data.selected[idx]=opt;save();renderDay(day);}
function showHint(day){
  const data=getDayData(day);
  const first=data.words[0];
  const msg=document.getElementById("dayMsg");
  if(!msg) return;
  msg.innerHTML=`<div class="warning"><b>Подсказка:</b> начни с главного слова: ${h(first.hanzi)} — ${h(first.pinyin)} — ${h(first.ru)}. Потом найди перевод фразы дня: ${h(data.target.ru)}.</div>`;
}
function skipDay(day){
  if(!confirm("Пропустить урок? Прогресс будет засчитан, но ребёнок не увидит полную сцену.")) return;
  if(!state.completedDays.includes(day)) state.completedDays.push(day);
  state.completedDays.sort((a,b)=>a-b);
  state.currentDay=Math.min(10,day+1);
  save(); renderWorld();
}
function closeApp(){
  save();
  go("start");
}
function finishDay(day){
  const data=getDayData(day);
  if(state.completedDays.includes(day)){
    state.currentDay=Math.min(10,day+1);
    save(); renderWorld();
    return;
  }
  const all=data.quiz.every((q,idx)=>data.selected[idx]===q.answer);
  const msg=document.getElementById("dayMsg");
  if(!all){msg.innerHTML='<div class="toast">Не все ответы верные. Это нормально: тренер не ругает, а просит повторить языковой пароль.</div>';return;}
  state.completedDays.push(day);
  state.completedDays.sort((a,b)=>a-b);
  save(); renderWorld();
}
function renderParent(){
  if(!state.profile)return;
  const p=state.profile, done=state.completedDays.length;
  const day=state.currentDay || 1;
  const data=getDayData(day);
  const words=(data.words || []).map(w=>`${h(w.hanzi)} — ${h(w.pinyin)} — ${h(w.ru)}`).join("<br>");
  document.getElementById("parentSummary").innerHTML=`
    <div class="result">
      <b>Прогресс:</b> ${done}/10 дней<br>
      <b>Роль ребёнка:</b> ${h(p.hero.name)}<br>
      <b>Аватар в сцене:</b> ${h(avatarLabel(p.avatar || 'boy'))}<br>
      <b>Напарник:</b> ${h(p.companion)}<br>
      <b>Что уже доказано MVP:</b> ребёнок видит, что его выбор влияет на сюжет, слова и миссии.
    </div>
    <div class="lesson-goal" style="margin-top:14px">
      <b>Сегодня у ребёнка:</b> День ${day} — ${h(data.theme)}<br>
      <b>Что должен сделать:</b> ${h(data.focus || data.mission || '')}<br>
      <b>Главная фраза дня:</b> ${h(data.target?.hanzi || '')} — ${h(data.target?.pinyin || '')}<br>
      <b>Смысл фразы:</b> ${h(data.target?.ru || '')}
    </div>
    <div class="word" style="margin-top:12px">
      <b>Слова дня для родителя</b>
      <div class="small" style="margin-top:8px">${words}</div>
    </div>
    <div class="story-stage" style="margin-top:12px">
      <h3>Родительская подсказка</h3>
      <p>В детской ветке этот блок специально убран, чтобы не перегружать экран урока. Здесь родитель видит, какую фразу ребёнок сегодня собирает из слов урока и с каким действием героя это связано.</p>
      <div class="story-result"><b>Как проверить дома:</b> попросите ребёнка показать сцену и сказать главную фразу дня вслух.</div>
    </div>`;
}
