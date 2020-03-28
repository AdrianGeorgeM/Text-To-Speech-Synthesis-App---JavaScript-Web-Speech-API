//init SpeechSynth API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

//init voices array
let voices = [];
const getVoices = () => {
    voices = synth.getVoices();
    //LOOP THROUGH VOICES and create an option for each one
    voices.forEach(voice => {
        //create option element
        const option = document.createElement("option");
        //Fill option with voice and language
        option.textContent = voice.name + " (" + voice.lang + ") ";

        //set needed option atributtes
        option.setAttribute("data-lang", voice.lang);
        option.setAttribute("data-name", voice.name);

        voiceSelect.appendChild(option);

    });
};
getVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

// Speak
const speak = () => {
    //check if speaking
    if (synth.speaking) {
        console.error("Already speaking...");
        return;

    }
    if (textInput.value !== "") {
        //Get Speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        //SpeaK End
        speakText.onend = e => {
            console.log("Done speaking...");
        }

        //speak error
        speakText.onerror = e => {
            console.error("Something went wrong");
        }

        //Select voice
        const selected = voiceSelect.selectedOptions[0].getAttribute("data-name");

        //loop throught voices
        voices.forEach(voice => {
            if (voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        });
          
        //set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch= pitch.value;

        //speak
        synth.speak(speakText);


    }

};

//eEvent Listeners

//Text form submit
textForm.addEventListener("submit", e =>{
    e.preventDefault();
    speak();
    textInput.blur();
});

//Rate value change 
rate.addEventListener("change",e => rateValue.textContent = rate.value);

//Pitch value change 
pitch.addEventListener("change",e => pitchValue.textContent = pitch.value);


//Voice select change
voiceSelect.addEventListener("change",e => speak);

