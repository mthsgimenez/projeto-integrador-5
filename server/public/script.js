// Client-side auth for header
(function(){
  function escapeHtml(str){
    return String(str).replace(/[&<>"'`]/g, function(s){
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','`':'&#96;'})[s];
    });
  }

  document.addEventListener('DOMContentLoaded', async function(){
    const authArea = document.getElementById('auth-area');
    if(!authArea) return;

    let currentUser = JSON.parse(localStorage.getItem('user') || 'null');
    let token = localStorage.getItem('token') || null;

    function authFetch(url, opts = {}){
      opts.headers = opts.headers || {};
      if(token) opts.headers['Authorization'] = 'Bearer ' + token;
      return fetch(url, opts);
    }
    window.authFetch = authFetch;

    async function ensureUserName(){
      if(!currentUser || currentUser.nome) return;
      if(!token || !currentUser._id) return;
      try{
        const res = await authFetch('/api/users/' + encodeURIComponent(currentUser._id));
        if(!res.ok) return;
        const full = await res.json();
        if(full && full.nome){
          currentUser.nome = full.nome;
          localStorage.setItem('user', JSON.stringify(currentUser));
        }
      }catch(e){ /* ignore */ }
    }

    async function render(){
      await ensureUserName();

      if(currentUser){
        const displayName = currentUser.nome || currentUser.email || (currentUser._id ? currentUser._id.substring(0,6) : 'Usuário');
        authArea.innerHTML = ` <span style="margin-right:10px;">Olá, ${escapeHtml(displayName)}</span> <button id="logoutBtn">Sair</button>`;
        document.getElementById('logoutBtn').addEventListener('click', function(){
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          currentUser = null; token = null;
          render();
        });
      } else {
        authArea.innerHTML = `
          <input id="email" placeholder="Email" style="margin-right:8px; padding:6px;"> 
          <input id="senha" type="password" placeholder="Senha" style="margin-right:8px; padding:6px;"> 
          <button id="loginBtn">Entrar</button>
        `;

        document.getElementById('loginBtn').addEventListener('click', async function(){
          const email = document.getElementById('email').value;
          const senha = document.getElementById('senha').value;
          try{
            const res = await fetch('/api/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, senha })
            });
            if(!res.ok){
              const err = await res.json().catch(()=>({erro:'Erro no login'}));
              alert(err.erro || 'Falha no login');
              return;
            }
            const data = await res.json();
            const user = data.user || data;
            const t = data.token;
            // store minimal user info
            const stored = { _id: user._id, nome: user.nome, email: user.email };
            localStorage.setItem('user', JSON.stringify(stored));
            if(t){ localStorage.setItem('token', t); token = t; }
            currentUser = stored;
            render();
          } catch(e){
            alert('Erro de rede ao tentar logar');
          }
        });
      }
    }

    render();
  });
})();
