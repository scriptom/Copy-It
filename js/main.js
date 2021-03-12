document.getElementById("formFile").addEventListener("change", function () {
    imagenUpload(this);
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

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("cpit-sw.js");
}
