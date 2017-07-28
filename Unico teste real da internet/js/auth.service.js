app.service('authService', authService);

function authService(usuarioService) {           

    return {
        isLogado: () =>  !!localStorage.getItem('usuario'),        
        signIn: signIn,
        signOut: signOut,      
    } 

    function isUsuarioCadastrado(){
        let id;
        if(localStorage.usuario)
            id = JSON.parse(localStorage.usuario).id;

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

            usuarioService.getUsuarioPorId(id).then(response => {
                localStorage.usuario = JSON.stringify(response.data);
            }, fail => {

                localStorage.usuario = JSON.stringify({
                    'nome': profile.getName(),
                    'email': profile.getEmail(),
                    'foto': profile.getImageUrl(),
                    'id': profile.getId(),
                });

                let usuario = JSON.parse(localStorage.usuario);
                usuarioService.criarUsuario(usuario);
            }).finally(atualizar);                                       
        });
    }
}