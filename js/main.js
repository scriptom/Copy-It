document.getElementById("formFile").addEventListener("change", function () {
    imagenUpload(this);
    OnClickGa("imgLoaded", "InputFile");
});

function imagenUpload(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById("preview-img").src = e.target.result;

            //Auto copiado
            navigator.permissions.query({ name: "clipboard-write" }).then(() => {
                setCanvasImage(e.target.result, (imgBlob) => {
                    navigator.clipboard
                        .write([new ClipboardItem({ "image/png": imgBlob })])
                        .then((e) => {
                            console.log("Copiado!");
                        })
                        .catch((e) => {
                            console.log(e);
                        });
                });
            });

            //Mostrar imagen
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

//Copy
const img = new Image();
const c = document.createElement("canvas");
const ctx = c.getContext("2d");

function setCanvasImage(path, func) {
    img.onload = function () {
        c.width = this.naturalWidth;
        c.height = this.naturalHeight;
        ctx.drawImage(this, 0, 0);
        c.toBlob((blob) => {
            func(blob);
        }, "image/png");
    };
    img.src = path;
}
