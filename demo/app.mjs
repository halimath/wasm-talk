import * as wecco from "@weccoframework/core"
import JsWorker from "./js_worker?worker"
import WasmWorker from "./wasm_worker?worker"

class Result {
    constructor (start, end, number) {
        this.start = start
        this.end = end
        this.number = number
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
            <label class="medium-8" for="number">Fibonacci number to calculate</label>
            <input class="medium-4" id="number" type="number" placeholder="10" min="1" max="50" value={model.inputNumber} @change=${evt => emit({action: "updateInput", value: evt.target.value})}>
            <button class="button" @click=${emit.bind(null, { action: "calculate" })}>Calcuate</button>
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
        <p>Result is <code>${result.number}</code>. Took ${result.duration / 1000}s.</p>
    `
}

document.addEventListener("DOMContentLoaded", () => {
    const jsWorker = new JsWorker()
    const wasmWorker = new WasmWorker()

    function update({model, message, emit}) {
        switch (message.action) {
            case "updateInput":
                return new Model(parseInt(message.value))
            
            case "calculate":    
                jsWorker.postMessage(model.inputNumber)
                wasmWorker.postMessage(model.inputNumber)
    
                return new Model(model.inputNumber, new Result(new Date()), new Result(new Date()))
    
            case "result":   
                return new Model(model.inputNumber, 
                    message.source === "js" ? message.result : model.js,
                    message.source === "wasm" ? message.result : model.wasm,
                )
        }
    
        console.log(model)
        console.log(message)
        // TODO: Implement
        return new Model()
    }

    const app = wecco.createApp(() => new Model(), update, view)
        .mount("#app")

    jsWorker.onmessage = e => {
        app.emit({ action: "result", source: "js", result: new Result(e.data.start, e.data.end, e.data.number)})
    }

    wasmWorker.onmessage = e => {
        app.emit({ action: "result", source: "wasm", result: new Result(e.data.start, e.data.end, e.data.number)})
    }
})