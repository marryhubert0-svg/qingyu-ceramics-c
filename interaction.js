'use strict';
(() => {
  // A/B preview: original behavior remains available on the same seven pages.
  if(new URLSearchParams(location.search).get('feedback')==='off'){
    document.querySelector('link[href="interaction.css"]')?.remove();
    document.querySelectorAll('a[href]').forEach(a=>{
      const u=new URL(a.href);if(u.origin!==location.origin)return;
      u.searchParams.set('feedback','off');a.href=u.href;
    });
    // Baseline filter handlers in site.js preserve these complete hrefs.
    return;
  }
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const records=[];
  document.querySelectorAll('.faq-list details').forEach((details,index)=>{
    const summary=details.querySelector('summary');
    const content=document.createElement('div');content.className='faq-content';content.id=`faq-answer-${index+1}`;
    const inner=document.createElement('div');inner.className='faq-content-inner';
    [...details.childNodes].filter(n=>n!==summary).forEach(n=>inner.append(n));content.append(inner);details.append(content);
    summary.setAttribute('aria-controls',content.id);
    const state={details,summary,content,inner,expanded:details.open,animating:false,frame:0,timer:0,version:0};records.push(state);
    function communicate(){details.dataset.expanded=String(state.expanded);summary.setAttribute('aria-expanded',String(state.expanded));content.inert=!state.expanded;content.setAttribute('aria-hidden',String(!state.expanded));}
    function settle(){cancelAnimationFrame(state.frame);clearTimeout(state.timer);state.version++;state.animating=false;details.open=state.expanded;content.style.height='';content.style.opacity='';content.style.transition='';communicate();}
    state.settle=settle;
    function change(expanded,animate){
      const currentHeight=content.getBoundingClientRect().height;
      const currentOpacity=getComputedStyle(content).opacity;
      cancelAnimationFrame(state.frame);clearTimeout(state.timer);const version=++state.version;
      state.expanded=expanded;details.dataset.instant=String(!animate||reduced.matches);
      if(!expanded&&content.contains(document.activeElement))summary.focus();
      communicate();
      if(!animate||reduced.matches){settle();return;}
      state.animating=true;details.open=true;
      content.style.transition='none';content.style.height=`${currentHeight}px`;content.style.opacity=currentOpacity;
      content.getBoundingClientRect();
      state.frame=requestAnimationFrame(()=>{
        if(version!==state.version)return;
        content.style.transition='';content.style.height=expanded?`${inner.getBoundingClientRect().height}px`:'0px';content.style.opacity=expanded?'1':'0';
        state.timer=setTimeout(()=>{if(version===state.version)settle();},230);
      });
    }
    // Native summary activation supplies Enter/Space semantics. Keyboard input
    // switches immediately; pointer input gets a short, reversible transition.
    summary.addEventListener('click',e=>{e.preventDefault();change(!state.expanded,e.detail!==0);});
    details.addEventListener('toggle',()=>{if(!state.animating&&details.open!==state.expanded){state.expanded=details.open;settle();}});
    if(typeof ResizeObserver==='function')new ResizeObserver(()=>{if(state.animating&&state.expanded)content.style.height=`${inner.getBoundingClientRect().height}px`;}).observe(inner);
    settle();
  });
  reduced.addEventListener('change',()=>records.forEach(s=>s.settle()));
})();
