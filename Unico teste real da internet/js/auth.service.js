app.service('authService', authService);

function authService($location, $timeout) {
    let isLogado;
    $timeout(atualizarEstado, 1000);    

    return {
        isLogado: () =>  isLogado,
        atualizarEstado: atualizarEstado,
        signIn: signIn,
        signOut: signOut,
    } 
    
    function atualizarEstado() {
        let googleAuth = gapi.auth2.getAuthInstance();
        isLogado = googleAuth.isSignedIn.get();
    }

    function signOut() {
        let googleAuth = gapi.auth2.getAuthInstance();
        googleAuth.signOut();
        localStorage.usuario = '';
        isLogado = false;
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
            $timeout(() => { isLogado = true }, 100);
        });
    }
}