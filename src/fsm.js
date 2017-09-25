class FSM {

    constructor(config) {
        this.config = config;
        this.state = this.config.initial;
        this.history = [];
        this.i = 0;
    }

    
    getState() {
        return this.state;
    }

    
    changeState(state) {
        if (state in this.config.states){
            this.history.push(this.state);
            this.i++;
            this.state = state;
            this.history.length = this.i;
        }
        else throw new Error();
    }

    trigger(event) {
        var flag = false;
        for (var key in this.config.states[this.state].transitions)
            if (key == event)
                flag = true;
        if((this.state == "initial" && event == "study") || flag == true){
            this.history.push(this.state);
            this.i++;
            this.history.length = this.i;
            this.state = this.config.states[this.state].transitions[event];
            return this.state;
        }
        else throw new Error();
    }

    reset() {
        this.history.push(this.state);
        this.i++;
        this.state = this.config.initial;
    }

    getStates(event) {
        var states = [];
        for (var key in this.config.states){
            if (arguments.length == 0)
                 states.push(key);
             else if (event in this.config.states[key].transitions)
                states.push(key);
        }
        return states;
    }

        undo() {
        if(this.i == 0)
            return false;
        else{
            this.history[this.i]=this.state;
            this.state = this.history[this.i-1];
            this.i--;
            return true;
        }
    }

    redo() {
        if(this.history[this.i+1] === undefined)
            return false;
        else{

            this.state = this.history[this.i+1];
            this.i++;
            return true;
        }
    }

    clearHistory() {
        this.history = [];
        this.i = 0;
    }
}


module.exports = FSM;

/** @Created by Uladzimir Halushka **/
