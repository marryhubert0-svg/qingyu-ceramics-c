'use strict';
const design = document.body.dataset.design;

let category = '全部';
const baseProducts = Object.freeze([
  {id:'cup', category:'茶杯', name:'青釉日常杯', price:128, size:'260 ml', spec:'容量', image:'cup.png', description:'给温茶与咖啡一个舒服的落点。圆润的杯口，和恰好握住的把手。'},
  {id:'plate', category:'餐盘', name:'米白浅餐盘', price:168, size:'21 cm', spec:'直径', image:'plate.png', description:'早餐、点心，或一顿认真做的晚饭。浅浅的盘沿，把日常安稳接住。'},
  {id:'vase', category:'花器', name:'雾青小花器', price:228, size:'18 cm', spec:'高度', image:'vase.png', description:'一两枝花就很好。不喧哗的釉色，让桌边多一点自然的生气。'}
]);
const copy = Object.freeze({title:'每天用得上的手作器物。',intro:'从一杯温茶，到一束刚剪的花。让朴素的器物，陪你把日子过得具体。',story:'我们喜欢釉色里的细小差异，也在意握在手里的重量，和摆在桌边的比例。不必隆重，普通时刻用着顺手，就是好器物。'});
const esc = (value) => String(value).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icon = (name) => `<img class="icon" src="${name}.svg" alt="" aria-hidden="true" width="20" height="20">`;
const formatPrice = value => new Intl.NumberFormat('zh-CN',{style:'currency',currency:'CNY',maximumFractionDigits:0}).format(value);
function productsForMode(){return baseProducts.map(p=>({...p}));}
const heroText = `<div class="hero-copy"><h1><span>每天用得上的</span><span>手作器物。</span></h1><p>${copy.intro}</p><div class="hero-actions"><a class="primary" href="#products">查看器物 <span>${icon('arrow-up-right')}</span></a><a class="secondary" href="#about">了解青屿</a></div></div>`;
const heroPhoto = `<figure class="hero-photo"><img src="cup.png" alt="青釉日常杯置于石面与亚麻布上，杯中盛着温茶" width="1254" height="1254" fetchpriority="high"><figcaption>青釉日常杯 <span>260 ml</span></figcaption></figure>`;
const heroes = {
  a:`<section class="hero hero-a" aria-label="青屿品牌介绍">${heroText}${heroPhoto}<div class="hero-foot"><span>把日子，过得具体。</span><a href="#products" aria-label="向下查看器物">${icon('arrow-down')}</a></div></section>`,
  b:`<section class="hero hero-b" aria-label="青屿品牌介绍">${heroText}${heroPhoto}</section>`,
  c:`<section class="hero hero-c" aria-label="青屿品牌介绍">${heroText}<div class="hero-bezel">${heroPhoto}</div></section>`
};
document.getElementById('app').innerHTML = `
  <a class="skip" href="#products">跳到器物列表</a>
  <header class="site-header" id="top"><a class="brand" href="#top" aria-label="青屿首页"><strong>青屿</strong><span>QINGYU</span></a><nav class="desktop-nav" aria-label="主导航"><a href="#products">器物</a><a href="#about">关于青屿</a><a href="#care">使用与照料</a></nav><button class="menu-button" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="打开导航">${icon('list')}</button><span class="header-note">手作器物 · 日常相伴</span></header>
  <nav id="mobile-nav" class="mobile-nav" aria-label="手机导航" hidden><a href="#products">器物</a><a href="#about">关于青屿</a><a href="#care">使用与照料</a></nav>
  <main>${heroes[design]}
    <section class="products-section container" id="products" aria-labelledby="products-title"><div class="section-heading"><h2 id="products-title">选择适合你的那件。</h2><p>茶杯、餐盘、花器。<br>从每天用得上的开始。</p></div><div class="product-tools"><div class="filters" role="group" aria-label="按产品类别筛选">${['全部','茶杯','餐盘','花器'].map(x=>`<button type="button" data-category="${x}" aria-pressed="${x==='全部'}">${x}</button>`).join('')}</div><span id="result-count" role="status" aria-live="polite"></span></div><div class="product-grid" id="product-grid"></div></section>
    <section class="story container" id="about" aria-labelledby="story-title"><div class="story-image"><img src="vase.png" alt="雾青小花器里插着两枝白色小花" width="1254" height="1254" loading="lazy"></div><div class="story-copy"><h2 id="story-title">不必隆重，<br>也值得认真。</h2><p>${copy.story}</p><a class="text-link" href="#products">找到你的日常器物 ${icon('arrow-right')}</a></div></section>
    <section class="care container" id="care" aria-labelledby="care-title"><h2 id="care-title">慢慢用，好好照料。</h2><div class="care-list"><details><summary>日常如何清洗？</summary><p>用柔软海绵轻轻清洗，晾干后收纳。避免骤冷骤热，让器物保持舒服的状态。</p></details><details><summary>每件器物都一样吗？</summary><p>手作与烧成会留下细小差异。尺寸与釉色可能略有区别，请以实物为准。</p></details></div></section>
  </main><footer class="site-footer container"><a class="brand" href="#top"><strong>青屿</strong><span>QINGYU</span></a><span>每天用得上的手作器物。</span><a href="#top" class="text-link">回到顶部 ${icon('arrow-up-right')}</a><small>青屿为虚构品牌，产品、价格及摄影仅用于设计演示。</small></footer>
  <dialog id="product-dialog" aria-labelledby="detail-title"><button class="dialog-close" type="button" aria-label="关闭产品详情">${icon('x')}</button><div class="detail-layout"><div id="detail-image"></div><div class="detail-copy"><span id="detail-category"></span><h2 id="detail-title"></h2><p id="detail-description"></p><dl><div><dt id="detail-spec"></dt><dd id="detail-size"></dd></div><div><dt>展示价格</dt><dd id="detail-price"></dd></div></dl><p class="detail-note">每件都有自己的烧成纹理。这里是产品展示演示，暂不提供购买。</p><button class="primary dialog-back" type="button">返回器物列表 ${icon('arrow-right')}</button></div></div></dialog>`;

function bindFallbacks(scope){
  scope.querySelectorAll('img[data-product-image]').forEach(img=>img.addEventListener('error',()=>{
    const box=img.parentElement;
    box.classList.add('image-fallback');
    box.replaceChildren();
    const name=document.createElement('strong'); name.textContent=img.dataset.fallbackName;
    const note=document.createElement('span'); note.textContent='图片暂缺，器物详情仍可查看';
    box.append(name,note);
  },{once:true}));
}
function renderProducts(){
  const all=productsForMode(); const products=all.filter(p=>category==='全部'||p.category===category);
  document.getElementById('result-count').textContent=`${products.length} 件器物`;
  const grid=document.getElementById('product-grid');
  grid.innerHTML=products.length?products.map(p=>`<article class="product"><button type="button" class="product-open" data-product="${p.id}" aria-label="查看${esc(p.name)}详情"><div class="product-bezel"><div class="product-photo"><img data-product-image data-fallback-name="${esc(p.category)}" src="${esc(p.image)}" alt="${esc(p.name)}" width="1254" height="1254" loading="lazy"></div></div><div class="product-info"><div class="product-name-block"><span class="product-category">${p.category} · ${p.size}</span><h3>${esc(p.name)}</h3></div><span class="product-price">${formatPrice(p.price)}</span><span class="product-arrow">${icon('arrow-up-right')}</span></div></button></article>`).join(''):`<div class="empty-state"><h3>暂无器物</h3><p>看看其他类别，找到适合你的器物。</p><button class="primary" type="button" id="reset-products">查看全部器物 ${icon('arrow-right')}</button></div>`;
  bindFallbacks(grid);
  grid.querySelectorAll('[data-product]').forEach(button=>button.addEventListener('click',()=>openProduct(button.dataset.product)));
  grid.querySelector('#reset-products')?.addEventListener('click',()=>{category='全部';syncFilters();renderProducts();});
}
function syncFilters(){document.querySelectorAll('[data-category]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.category===category)));}
document.querySelectorAll('[data-category]').forEach(b=>b.addEventListener('click',()=>{category=b.dataset.category;syncFilters();renderProducts();}));
const dialog=document.getElementById('product-dialog');
function openProduct(id){
  const p=productsForMode().find(p=>p.id===id);if(!p)return;
  document.getElementById('detail-title').textContent=p.name;
  document.getElementById('detail-category').textContent=p.category;
  document.getElementById('detail-description').textContent=p.description;
  document.getElementById('detail-spec').textContent=p.spec;
  document.getElementById('detail-size').textContent=p.size;
  document.getElementById('detail-price').textContent=formatPrice(p.price);
  document.getElementById('detail-image').innerHTML=`<img data-product-image data-fallback-name="${p.category}" src="${esc(p.image)}" alt="${esc(p.name)}" width="1254" height="1254">`;
  document.getElementById('detail-image').className='';bindFallbacks(dialog);
  dialog.showModal();document.body.classList.add('modal-open');
}
function closeDialog(){dialog.close();document.body.classList.remove('modal-open');}
dialog.querySelectorAll('button').forEach(b=>b.addEventListener('click',closeDialog));
dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeDialog();}});
const menu=document.querySelector('.menu-button');const mobileNav=document.getElementById('mobile-nav');
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','打开导航');mobileNav.hidden=true;}
menu.addEventListener('click',()=>{const isOpen=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!isOpen));menu.setAttribute('aria-label',isOpen?'打开导航':'关闭导航');mobileNav.hidden=isOpen;});
mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
renderProducts();
