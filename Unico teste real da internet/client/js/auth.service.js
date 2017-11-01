app.service('authService', authService);

function authService(usuarioService, $http) {           

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
            console.log('sera q existo? '+ profile.getId());
            var usuario = usuarioService.usuarioJaCadastrado(profile.getId());
            console.log(usuario);
            if(usuario!='undefined'&&usuario!=null){
                console.log('ou eu sou cadastrado')
                localStorage.usuario = JSON.stringify(usuario);
            }else{
                console.log('ainda n sou cadastrado')
                usuarioService.criarUsuario({
                    'id_google': profile.getId(),
                    'nome': profile.getName(),
                    'descricao': '',
                    'url_foto': profile.getImageUrl(),
                    'pontuacao': 0
                }).then((user)=>{
                    localStorage.usuario = JSON.stringifu(user.data);
                })
            }
            atualizar;                                       
        });
    }
}