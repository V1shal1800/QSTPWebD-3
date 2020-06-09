const form ={};

form.text = document.querySelector('#input_text');
form.translateButton = document.querySelector('#TButton');

const TranslatedText = document.querySelector('#TranslatedText');
const TargetArea = document.querySelector('#TargetArea');

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }

function Translate(){
    let text = escapeHtml(form.text.value);
    TargetArea.innerHTML = "";

    fetch("https://api.funtranslations.com/translate/pirate.json", {
        body: `text=${text}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST"
    })
    .then(response => {
        return response.json();
    }).then(data =>{
        TargetArea.innerHTML = data.contents.translated;
        TranslatedText.style = "display:block";
    })
    .catch(err => {
        console.log(err);
        alert("Request Limit Exceeded Or Server Side Error!!")
    });

    form.text.value = "";
}


form.translateButton.addEventListener('click', (e)=>{
    e.preventDefault();
    if (form.text.value != '') {
        Translate();
      }
    else{
        alert('Field cannot be empty');
      }
})
