document.getElementById("formFile").addEventListener("change", function () {
    imagenUpload(this);
    OnClickGa("imgLoaded", "InputFile");
});

function imagenUpload(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById("preview-img").src = e.target.result;

            showPreview();
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function showPreview() {
    document.getElementById("prew-img").classList.remove("d-none");
}

function OnClickGa(act, typeInter, lb) {
    //si existe etiqueta hacer:
    //console.log('LB', lb)
    if (lb) {
        //console.log('enter');
        gtag("event", act, {
            event_category: typeInter + "Interaccion",
            event_label: lb,
        });
    } else {
        //console.log('not enter');
        gtag("event", act, {
            event_category: typeInter + "Interaccion",
        });
    }
}

function transformToPng(url) {
    return new Promise((resolve, reject) => {
        const img = new Image;
        img.onload = function() {
            const c = document.createElement('canvas');
            const ctx = c.getContext('2d');
            c.width = this.naturalWidth;
            c.height = this.naturalHeight;
            ctx.drawImage(this, 0, 0);
            c.toBlob(blob => {
                resolve(blob);
            }, 'image/png');    
        }
        img.src = url;
    });
}

function copyImage() {
    const copyFromURL = url =>
    fetch(url).then(res => res.blob())
        .then(blob => 'image/png' === blob.type ? blob : transformToPng(src))
        .then(blob => clipboard.write([new ClipboardItem({[blob.type]: blob})]))
        .then(() => alert('Copied successfully!'), () => alert('Error copying data'));
    const {clipboard, permissions} = navigator;
    const {src} = document.querySelector('#preview-img');
    if (typeof permissions !== 'undefined') {
        permissions.query({name: 'clipboard-write'})
            .then(perm => {
                switch(perm.state) {
                    case 'denied': alert('denied');break;
                    case 'granted':
                    case 'prompt': 
                        copyFromURL(src);
                        break;
                }
            });
    }
}

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("cpit-sw.js");
}

//IG
var ua = navigator.userAgent || navigator.vendor || window.opera;
var isInstagram = ua.indexOf("Instagram") > -1 ? true : false;

if (document.documentElement.classList) {
    if (isInstagram) {
        console.log("IG NAVIGATOR");
        let igModal = new bootstrap.Modal(document.getElementById("igModal"));
        igModal.show();
    }
}
