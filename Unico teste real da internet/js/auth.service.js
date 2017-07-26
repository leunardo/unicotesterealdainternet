app.service('authService', authService);

function authService($location, $timeout) {
    let isLogado;
    $timeout(atualizarEstado, 300);    

    return {
        isLogado: () =>  isLogado,        
        signIn: signIn,
        signOut: signOut,
    } 

    function atualizarEstado() {
        let googleAuth = gapi.auth2.getAuthInstance();
        googleAuth.isSignedIn.listen(atualizar);
    }

    function atualizar(status) {
        $timeout(() => { isLogado = status }, 200);
    }

    function signOut() {
        let googleAuth = gapi.auth2.getAuthInstance();
        googleAuth.signOut();
        localStorage.usuario = '';        
    }

    function signIn() {
        let googleAuth = gapi.auth2.getAuthInstance();
        googleAuth.signIn().then(() => {
            let googleUser = googleAuth.currentUser.get();
            let profile = googleUser.getBasicProfile();
            localStorage.usuario = JSON.stringify({
                'nome': profile.getName(),
                'email': profile.getEmail(),
                'foto': profile.getImageUrl(),
            });            
        });
    }
}