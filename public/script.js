// Client-side auth for header
(function(){
  function escapeHtml(str){
    return String(str).replace(/[&<>"'`]/g, function(s){
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','`':'&#96;'})[s];
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    const authArea = document.getElementById('auth-area');
    if(!authArea) return;

    let currentUser = JSON.parse(localStorage.getItem('user') || 'null');

    function render(){
      if(currentUser){
        authArea.innerHTML = ` <span style="margin-right:10px;">Olá, ${escapeHtml(currentUser.nome)}</span> <button id="logoutBtn">Sair</button>`;
        document.getElementById('logoutBtn').addEventListener('click', function(){
          localStorage.removeItem('user');
          currentUser = null;
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
            const user = await res.json();
            // store minimal user info
            const stored = { _id: user._id, nome: user.nome, email: user.email };
            localStorage.setItem('user', JSON.stringify(stored));
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
