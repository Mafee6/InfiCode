let charHeap = [];
let paused = false;
const output = document.querySelector(".output");

let i = 33;
setInterval(() => {
    if(paused) return null;
    charHeap.push({char: String.fromCharCode(i), id: i});
    i++;
});

const render = () => {
    if(paused) return null;
    output.innerHTML = "";
    charHeap.map(({char, id}) => {
        const div = document.createElement("div");
        div.className = "char";
        div.innerHTML = `
            <div">
                <h>${char}</h>
                <p>${id}</p>
            </div>
        `;

        output.appendChild(div);
        div.title = `Click to copy '${char}' of the ID: '${id}'. Double click to search on compart.com, Right Click for Code`;
        div.addEventListener("click", () => {
            if (!navigator.clipboard) {alert("Copying to the clipboard is not supported!"); return null}
            navigator.clipboard.writeText(char);
            div.originalHTML = div.innerHTML;
            div.innerHTML = "Copied!";
            div.style.setProperty("color", "rgb(94, 255, 94)");
            setTimeout(() => {
                div.innerHTML = div.originalHTML;
                div.style.setProperty("color", "white");
            }, 1500);
        });

        div.addEventListener("dblclick", () => {
            location.href = `https://www.compart.com/en/unicode/search?q=${char}`;
        });

        div.addEventListener("contextmenu", () => {
            if (!navigator.clipboard) {alert("Copying to the clipboard is not supported!"); return null}
            navigator.clipboard.writeText(id);
            div.originalHTML = div.innerHTML;
            div.innerHTML = "Copied ID!";
            div.style.setProperty("color", "rgb(94, 255, 94)");
            setTimeout(() => {
                div.innerHTML = div.originalHTML;
                div.style.setProperty("color", "white");
            }, 1500);
        })
    });

    output.parentElement.scrollTo(output.scrollWidth, 0);

};

const pause = document.querySelector(".pause");
pause.addEventListener("click", () => {
    if(!paused) {
        paused = true;
        pause.textContent = "Paused";
    } else {
        paused = false;
        pause.textContent = "Pause";
    }
})

setInterval(render, 2500);