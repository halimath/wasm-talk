import * as wecco from "@weccoframework/core"
import JsWorker from "./js_worker?worker"
import WasmWorker from "./wasm_worker?worker"

class Result {
    constructor (start, end) {
        this.start = start
        this.end = end
    }

    get duration() {        
        return this.end?.getTime() - this.start?.getTime()
    }

    get complete() {
        return !!this.end
    }
}

class Model {
    constructor (inputNumber, js, wasm) {
        this.inputNumber = inputNumber
        this.js = js
        this.wasm = wasm
    }
}

function view({model, emit}) {
    return wecco.html`
    <div class="grid-x grid-margin-x">
        <div class="medium-4 cell">
            <label class="medium-8" for="number">Size of the array to generate randomly</label>
            <input class="medium-4" id="number" type="number" placeholder="10" min="1" max="50" value=${model.inputNumber} @change=${evt => emit({action: "updateInput", value: evt.target.value})}>
            <button class="button" @click=${emit.bind(null, { action: "sort" })}>Sort</button>
        </div>
        
        <div class="medium-4 cell">
            <h3>JavaScript</h3>
            ${resultView(model.js)}
        </div>
        
        <div class="medium-4 cell">
            <h3>WebAssembly</h3>
            ${resultView(model.wasm)}
        </div>
    </div>
    `
}

function resultView(result) {
    if (!result?.start) {
        return null
    }

    if (!result.complete) {
        return "Running..."
    }

    return wecco.html`
        <p>Complete. Took <span class="stat">${result.duration / 1000}s</span>.</p>
    `
}

document.addEventListener("DOMContentLoaded", () => {
    const jsWorker = new JsWorker()
    const wasmWorker = new WasmWorker()

    function update({model, message, emit}) {
        switch (message.action) {
            case "updateInput":
                return new Model(parseInt(message.value))
            
            case "sort":
                const randomData = []
                for (let i = 0; i < model.inputNumber; i++) {
                    randomData.push(Math.floor(Math.random() * 100_000))
                }

                jsWorker.postMessage(randomData)
                wasmWorker.postMessage(randomData)
    
                return new Model(model.inputNumber, new Result(new Date()), new Result(new Date()))
    
            case "result":   
                return new Model(model.inputNumber, 
                    message.source === "js" ? message.result : model.js,
                    message.source === "wasm" ? message.result : model.wasm,
                )
        }

        console.error(`unhandled message: ${message}`)
        return model
    }

    const app = wecco.createApp(() => new Model(10_000_000), update, view)
        .mount("#app")

    jsWorker.onmessage = e => {
        app.emit({ action: "result", source: "js", result: new Result(e.data.start, e.data.end, e.data.number)})
    }

    wasmWorker.onmessage = e => {
        app.emit({ action: "result", source: "wasm", result: new Result(e.data.start, e.data.end, e.data.number)})
    }
})