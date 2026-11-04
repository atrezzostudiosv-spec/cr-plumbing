/* Design-preview request review. Delivery is connected after client approval. */
(() => {
  'use strict';
  const selector='form.service-form,form.cr-modal__form';
  const queryCity=new URLSearchParams(location.search).get('city');
  if(queryCity)document.querySelectorAll('.service-form [name="city"]').forEach(input=>{input.value=queryCity.slice(0,90)});

  function review(form){
    if(!form.reportValidity())return;
    const feedback=form.querySelector('.form-feedback,.cr-modal__result');
    if(!feedback)return;
    const values=[...new FormData(form)].filter(([key,value])=>!key.startsWith('_')&&String(value).trim());
    const summary=['CR Plumbing, Air & Electric — Service request',...values.map(([key,value])=>key.replace(/-/g,' ')+': '+value)].join('\n');
    feedback.hidden=false;feedback.classList.add('show');feedback.dataset.state='preview';feedback.replaceChildren();
    const explanation=document.createElement('p');
    explanation.textContent='Review your request below. Online delivery will be connected after design approval. Nothing has been sent or booked.';
    const details=document.createElement('pre');details.textContent=summary;
    const copy=document.createElement('button');copy.type='button';copy.className='cr-request-copy';copy.textContent='Copy request details';
    const status=document.createElement('p');status.setAttribute('role','status');
    copy.addEventListener('click',async()=>{
      try{await navigator.clipboard.writeText(summary);status.textContent='Request details copied. Nothing has been sent.';}
      catch{status.textContent='Select and copy the details above. Nothing has been sent.';}
    });
    feedback.append(explanation,details,copy,status);feedback.focus();
  }
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-cr-review]');
    if(!button)return;
    const form=button.closest(selector);if(!form)return;
    event.preventDefault();review(form);
  });
  document.addEventListener('submit',event=>{
    if(!event.target.matches(selector))return;
    event.preventDefault();review(event.target);
  });
})();
