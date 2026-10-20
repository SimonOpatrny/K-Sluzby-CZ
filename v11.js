(()=>{
'use strict';
const root=document.querySelector('.gallery-v11');if(!root)return;
const cards=Array.from(root.querySelectorAll('.gallery-v11-card'));
const dialog=document.querySelector('.gallery-v11-lightbox');if(!dialog)return;
const photo=dialog.querySelector('.gallery-v11-stage img');
const position=dialog.querySelector('.gallery-v11-position');
const heading=dialog.querySelector('.gallery-v11-info h3');
const description=dialog.querySelector('.gallery-v11-info p');
const thumbs=dialog.querySelector('.gallery-v11-thumbs');
const count=root.querySelector('.gallery-v11-count');
const items=cards.map(card=>({card,category:card.dataset.category,title:card.querySelector('img').alt.replace(/ – ilustrační fotografie/g,''),src:card.querySelector('img').getAttribute('src')}));
let visible=items.map((_,i)=>i),current=0;
function show(n){if(!visible.length)return;current=(n+visible.length)%visible.length;const item=items[visible[current]];photo.src=item.src;photo.alt=item.title;heading.textContent=item.title;description.textContent=item.category+' · Ilustrační fotografie';position.textContent=String(current+1).padStart(2,'0')+' / '+String(visible.length).padStart(2,'0');thumbs.replaceChildren();visible.forEach((idx,j)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Fotografie '+(j+1));b.classList.toggle('active',j===current);const im=document.createElement('img');im.src=items[idx].src;im.alt='';b.appendChild(im);b.addEventListener('click',()=>show(j));thumbs.appendChild(b);});}
root.querySelectorAll('.gallery-v11-filter').forEach(btn=>btn.addEventListener('click',()=>{const category=btn.dataset.filter;root.querySelectorAll('.gallery-v11-filter').forEach(b=>{b.classList.toggle('is-active',b===btn);b.setAttribute('aria-pressed',String(b===btn));});visible=items.map((item,i)=>category==='Vše'||item.category===category?i:-1).filter(i=>i!==-1);items.forEach((item,i)=>{item.card.hidden=!visible.includes(i);});if(count)count.textContent=String(visible.length).padStart(2,'0')+' / FOTOGRAFIÍ';}));
items.forEach((item,i)=>item.card.addEventListener('click',()=>{const pos=visible.indexOf(i);if(pos<0)return;show(pos);if(typeof dialog.showModal==='function')dialog.showModal();else dialog.setAttribute('open','');}));
dialog.querySelector('.gallery-v11-close').addEventListener('click',()=>dialog.close());
dialog.querySelector('.gallery-v11-prev').addEventListener('click',()=>show(current-1));
dialog.querySelector('.gallery-v11-next').addEventListener('click',()=>show(current+1));
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
document.addEventListener('keydown',e=>{if(!dialog.open)return;if(e.key==='ArrowRight')show(current+1);if(e.key==='ArrowLeft')show(current-1);});
})();