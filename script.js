async function cariLokasi() {
    const lokasi = document.getElementById('inputLokasi').value;
    const errorText = document.getElementById('pesanError');
    const boxHasil = document.getElementById('boxHasil');
    
    // GANTI INI DENGAN API KEY KAMU
    const apiKey = '6XIQF6FxZxm9lFtsVXfY'; 

    if(lokasi === "") {
        errorText.innerText = "Eh, ketik dulu nama lokasinya dong!";
        boxHasil.style.display = "none";
        return;
    }

    errorText.innerText = "Mencari data...";

    try {
        const url = `https://api.maptiler.com/geocoding/${lokasi}.json?key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if(data.features && data.features.length > 0) {
            const hasil = data.features[0];
            
            document.getElementById('lon').innerText = hasil.center[0];
            document.getElementById('lat').innerText = hasil.center[1];
            document.getElementById('kecamatan').innerText = hasil.text;

            let provinsi = "Tidak diketahui";
            let negara = "Tidak diketahui";

            hasil.context.forEach(ctx => {
                if(ctx.id.includes("region") || ctx.id.includes("province")) {
                    provinsi = ctx.text;
                }
                if(ctx.id.includes("country")) {
                    negara = ctx.text;
                }
            });

            document.getElementById('provinsi').innerText = provinsi;
            document.getElementById('negara').innerText = negara;

            boxHasil.style.display = "block";
            errorText.innerText = "";
        } else {
            errorText.innerText = "Yah, lokasinya tidak ditemukan.";
            boxHasil.style.display = "none";
        }
    } catch (error) {
        errorText.innerText = "Gagal mengambil data dari API.";
        boxHasil.style.display = "none";
    }
}