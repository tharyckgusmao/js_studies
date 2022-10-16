//Single once class instantiated ,- Antipattern

let counter = 0;
let instance;
class Counter {
    constructor(){
        if(instance){
            throw new Error("You can only create one instance!")
        }
        instance = this
    }
    getInstace(){
        return this
    }
    getCount(){
        return counter
    }
    increment(){
        return ++ counter
    }
    decrement(){
        return --counter
    }
}


const c = new Counter();
console.log(c)