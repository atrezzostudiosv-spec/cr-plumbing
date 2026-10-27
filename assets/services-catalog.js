/* Atrezzo: searchable service index; all verified links remain normal HTML links. */
(()=>{
 const input=document.querySelector('#cr-catalog-query');
 const result=document.querySelector('#cr-catalog-result');
 const areas=[...document.querySelectorAll('.cr-catalog-area')];
 if(!input||!result||!areas.length)return;
 const norm=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
 function render(){
   const q=norm(input.value);
   let total=0;
   for(const area of areas){
     const category=norm(area.dataset.category||'');
     const matchCat=!!q&&category.includes(q);
     let visible=0;
     const root=area.querySelector('.cr-catalog-areahead a');
     const rootMatch=!q||matchCat||norm(root.textContent).includes(q);
     root.hidden=!rootMatch;
     if(rootMatch){visible++;total++}
     for(const group of area.querySelectorAll('.cr-catalog-sub')){
       const groupMatch=!!q&&norm(group.dataset.group).includes(q);
       let count=0;
       for(const a of group.querySelectorAll('a')){
         const show=!q||matchCat||groupMatch||norm(a.textContent).includes(q);
         a.hidden=!show;
         if(show){count++;total++}
       }
       group.hidden=count===0;
       visible+=count;
     }
     area.hidden=visible===0;
   }
   result.textContent=q?(total?total+' matching service page'+(total===1?'':'s')+'.':'No matching services. Try another search.'):'66 service pages across four categories.';
 }
 input.addEventListener('input',render);
})();
