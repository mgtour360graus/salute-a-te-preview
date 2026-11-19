/* Salute a Te | ponte de estudo para Main Viewer > On Initialization.
 * Copie mg-tour-skin ao lado do index exportado. Não substitua o index do 3DVista.
 * Antes de executar, mapeie cada nativeIndex em config.js à playlist REAL.
 * A API mainPlayList foi observada em amostra: validar na versão/projeto reais.
 * GENERAL e MOBILE podem usar esta mesma ponte idempotente.
 */
(function(tour){
 'use strict';
 const key='__saluteATeBridge';
 if(window[key]){window[key].attach(tour);return;}
 let currentTour=tour,timer=null,stopped=false,last=-2,listeners=[];
 const base=new URL('./mg-tour-skin/',document.baseURI).href;
 const bridge={attach:t=>{currentTour=t}};window[key]=bridge;
 const load=file=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=new URL(file,base);s.onload=resolve;s.onerror=()=>reject(new Error('Falha ao carregar '+file));document.head.appendChild(s)});
 const playlist=()=>{if(!currentTour?.mainPlayList)throw Error('mainPlayList indisponível. Confira o contexto do Main Viewer.');return currentTour.mainPlayList};
 const read=()=>{const nativeIndex=Number(playlist().get('selectedIndex'));return{mode:'3dvista',nativeIndex,index:window.MGTourSkinConfig.scenes.findIndex(s=>s.nativeIndex===nativeIndex)}};
 const engine={getState:read,navigate:i=>{const scene=window.MGTourSkinConfig.scenes[i];if(!scene||!Number.isInteger(scene.nativeIndex)||scene.nativeIndex<0)throw Error('Mapeamento de cena não configurado.');playlist().set('selectedIndex',scene.nativeIndex)},subscribe:fn=>{listeners.push(fn);return()=>{listeners=listeners.filter(f=>f!==fn)}}};
 function poll(){if(stopped)return;try{const state=read();if(state.index!==last){last=state.index;listeners.slice().forEach(fn=>fn(state))}}catch(error){console.warn('[Salute a Te]',error.message)}timer=setTimeout(poll,400)}
 function pause(){stopped=true;clearTimeout(timer)}function resume(){if(stopped){stopped=false;poll()}}
 addEventListener('pagehide',pause);addEventListener('pageshow',resume);
 bridge.dispose=()=>{pause();listeners=[];removeEventListener('pagehide',pause);removeEventListener('pageshow',resume);window.MGTourSkin?.dispose?.();delete window[key]};
 Promise.resolve().then(()=>window.MGTourSkinConfig?null:load('config.js')).then(()=>{
 const scenes=window.MGTourSkinConfig.scenes;
 if(scenes.some(s=>!Number.isInteger(s.nativeIndex)||s.nativeIndex<0))throw Error('Configure os nativeIndex com a ordem real dos panoramas. Valores ainda aguardam o projeto.');
 if(new Set(scenes.map(s=>s.nativeIndex)).size!==scenes.length)throw Error('Há índices repetidos na configuração.');
 return window.MGTourSkin?null:load('skin.js');
 }).then(()=>{playlist();window.MGTourSkin.mount(engine,window.MGTourSkinConfig);poll();console.info('[Salute a Te] Skin montada. Testar sincronização e navegação no projeto real.')}).catch(error=>{bridge.dispose();console.error('[Salute a Te]',error.message)});
})(this);
