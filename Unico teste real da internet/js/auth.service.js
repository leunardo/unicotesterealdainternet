app.service('authService', authService);

function authService(usuarioService) {           

    return {
        isLogado: () =>  !!localStorage.getItem('usuario'),        
        signIn: signIn,
        signOut: signOut,      
    } 

    function isUsuarioCadastrado(){
        let id = JSON.parse(localStorage.usuario).id;
        return usuarioService.getUsuarioPorId(id);
    }

    function signOut() {
        let googleAuth = gapi.auth2.getAuthInstance();
        googleAuth.disconnect();
        localStorage.removeItem('usuario');        
    }

    function signIn(atualizar) {
        let googleAuth = gapi.auth2.getAuthInstance();
        googleAuth.signIn().then(() => {
            let googleUser = googleAuth.currentUser.get();
            let profile = googleUser.getBasicProfile();
            let id = profile.getId();
            if(!usuarioService.getUsuarioPorId(id))
                localStorage.usuario = JSON.stringify({
                    'nome': profile.getName(),
                    'email': profile.getEmail(),
                    'foto': profile.getImageUrl(),
                    'id': profile.getId(),
                });
            else{
                usuarioService.getUsuarioPorId(id).then(c => {
                    localStorage.usuario = JSON.stringify(c.data);
                }
                );

            }
            atualizar();

            isUsuarioCadastrado().then(response => {
                return;
            }, fail => {
                let usuario = JSON.parse(localStorage.usuario);
                usuarioService.criarUsuario(usuario);
            });                       
        });
    }
}