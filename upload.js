const importModel = document.querySelector('.import-model');

importModel.onclick = () => {
    var files = document.querySelector('#select-model').files;
    console.log(files);
    if (files.length <= 0) {
        return false;
    }

    const fr = new FileReader();

    fr.onload =  (e) => {
        console.log(e);
        const result = JSON.parse(e.target.result);
        localStorage.setItem(model, result);
        const formatted = JSON.stringify(result, null, 2);
        const modelReader = document.querySelector('#model-view');
        modelReader.value = formatted;
        modelReader.className = "visible model"
    }

    fr.readAsText(files.item(0));
};